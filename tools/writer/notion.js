/**
 * One-way sync of a post to Notion, so people can read and comment on it.
 *
 * Deliberately push-only and on demand: Notion anchors comments to blocks, so
 * rewriting a page's blocks destroys the feedback attached to them. Pushing is
 * something you choose to do between review rounds, never something that
 * happens behind your back on save.
 */

const fs = require('fs');
const path = require('path');

const API = 'https://api.notion.com/v1';
const VERSION = '2022-06-28';

/* --------------------------------------------------------------------- config */

// Secrets live in tools/writer/.env, which is gitignored — the blog repo is public.
function loadEnv(dir) {
  const file = path.join(dir, '.env');
  if (!fs.existsSync(file)) return {};
  const out = {};
  for (const line of fs.readFileSync(file, 'utf8').split('\n')) {
    const m = /^\s*([A-Z0-9_]+)\s*=\s*(.*)$/.exec(line);
    if (m) out[m[1]] = m[2].trim().replace(/^["']|["']$/g, '');
  }
  return out;
}

// The page-id map also stays out of git: it is per-machine bookkeeping, not content.
function store(dir) {
  const file = path.join(dir, '.notion.json');
  const read = () => {
    try { return JSON.parse(fs.readFileSync(file, 'utf8')); } catch { return { pages: {} }; }
  };
  return {
    read,
    write(next) { fs.writeFileSync(file, JSON.stringify(next, null, 2)); return next; },
  };
}

/* ------------------------------------------------------------------- transport */

async function notion(token, method, endpoint, body, extraHeaders) {
  const res = await fetch(API + endpoint, {
    method,
    headers: {
      authorization: 'Bearer ' + token,
      'Notion-Version': VERSION,
      ...(body ? { 'content-type': 'application/json' } : {}),
      ...extraHeaders,
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(`notion ${res.status}: ${data.message || data.code || 'request failed'}`);
  return data;
}

const pageIdFromUrl = (s) => {
  const m = /([0-9a-f]{32})|([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})/i.exec(String(s));
  if (!m) throw new Error('could not find a page id in that URL');
  return m[0];
};

/* ------------------------------------------------------- markdown → notion blocks */

const INLINE = /(\[\^[^\]\s]+\])(?!:)|(!?\[)([^\]]*)\]\(([^)]*)\)|(\*\*|__)([^]+?)\5|(\*|_)([^*_\n]+?)\7|`([^`]+)`/g;

// Notion rich text: annotations only, no nesting — good enough for prose.
function richText(s) {
  const out = [];
  const push = (content, annotations, link) => {
    if (!content) return;
    for (let i = 0; i < content.length; i += 2000) {
      out.push({
        type: 'text',
        text: { content: content.slice(i, i + 2000), link: link ? { url: link } : null },
        annotations,
      });
    }
  };
  let i = 0, m;
  INLINE.lastIndex = 0;
  while ((m = INLINE.exec(s))) {
    push(s.slice(i, m.index));
    if (m[1]) push(m[1], { code: true });                       // footnote marker
    else if (m[2] !== undefined) push(m[3] || m[4], {}, /^https?:/.test(m[4]) ? m[4] : null);
    else if (m[5]) push(m[6], { bold: true });
    else if (m[7]) push(m[8], { italic: true });
    else if (m[9]) push(m[9], { code: true });
    i = INLINE.lastIndex;
  }
  push(s.slice(i));
  return out;
}

const block = (type, extra) => ({ object: 'block', type, [type]: extra });

// Pull the asset path out of a markdown image, an <img>, or a <video>.
function mediaPath(line) {
  const m =
    /!\[[^\]]*\]\(\s*(?:\{\{\s*'([^']+)'[^}]*\}\}|([^)\s]+))/.exec(line) ||
    /<(?:img|video|source)[^>]*\ssrc\s*=\s*["']\s*(?:\{\{\s*'([^']+)'[^}]*\}\}|([^"'\s]+))/.exec(line);
  if (!m) return null;
  const url = (m[1] || m[2] || '').replace(/^\/blog/, '');
  return url.startsWith('/assets/') ? url : null;
}

/**
 * Convert post markdown to Notion blocks. Lossy on purpose: Notion has no
 * footnote primitive (they become code-styled markers plus a list at the end)
 * and no Liquid, so figures become plain image blocks.
 */
function toBlocks(markdown, uploadFor) {
  const lines = markdown.split('\n');
  const blocks = [];
  const media = [];
  let fence = null;

  for (let i = 0; i < lines.length; i++) {
    const raw = lines[i];

    if (fence !== null) {
      if (/^\s*```/.test(raw)) {
        blocks.push(block('code', { rich_text: richText(fence.join('\n')), language: fence.lang || 'plain text' }));
        fence = null;
      } else fence.push(raw);
      continue;
    }
    if (/^\s*```/.test(raw)) {
      fence = [];
      fence.lang = raw.replace(/^\s*```/, '').trim() || 'plain text';
      continue;
    }

    const asset = mediaPath(raw);
    if (asset) {
      const placeholder = block('paragraph', { rich_text: [] });
      blocks.push(placeholder);
      media.push({ index: blocks.length - 1, asset });
      continue;
    }

    if (!raw.trim()) continue;
    if (/^<!--\s*more\s*-->/.test(raw.trim())) { blocks.push(block('divider', {})); continue; }
    if (/^\s*<\/?[A-Za-z!]/.test(raw)) continue;              // stray html wrapper lines

    const h = /^(#{1,6})\s+(.*)$/.exec(raw);
    if (h) {
      const level = Math.min(h[1].length, 3);
      blocks.push(block('heading_' + level, { rich_text: richText(h[2]) }));
      continue;
    }
    const quote = /^\s*>\s?(.*)$/.exec(raw);
    if (quote) { blocks.push(block('quote', { rich_text: richText(quote[1]) })); continue; }

    const bullet = /^\s*[-*+]\s+(.*)$/.exec(raw);
    if (bullet) { blocks.push(block('bulleted_list_item', { rich_text: richText(bullet[1]) })); continue; }

    const numbered = /^\s*\d+\.\s+(.*)$/.exec(raw);
    if (numbered) { blocks.push(block('numbered_list_item', { rich_text: richText(numbered[1]) })); continue; }

    blocks.push(block('paragraph', { rich_text: richText(raw) }));
  }

  return { blocks, media };
}

/* ------------------------------------------------------------------ file upload */

async function uploadImage(token, absPath) {
  const name = path.basename(absPath);
  const ext = path.extname(name).toLowerCase();
  const types = {
    '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.gif': 'image/gif',
    '.webp': 'image/webp', '.svg': 'image/svg+xml', '.avif': 'image/avif',
    '.mp4': 'video/mp4', '.webm': 'video/webm', '.mov': 'video/quicktime',
  };
  const contentType = types[ext];
  if (!contentType) throw new Error('unsupported media type ' + ext);

  const created = await notion(token, 'POST', '/file_uploads', { filename: name, content_type: contentType });

  const form = new FormData();
  form.append('file', new Blob([fs.readFileSync(absPath)], { type: contentType }), name);
  const res = await fetch(created.upload_url, {
    method: 'POST',
    headers: { authorization: 'Bearer ' + token, 'Notion-Version': VERSION },
    body: form,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(`upload ${res.status}: ${data.message || 'failed'}`);

  return { id: created.id, kind: contentType.startsWith('video/') ? 'video' : 'image' };
}

/* ----------------------------------------------------------------------- board */

const BOARD_PROPERTIES = {
  Name: { title: {} },
  Status: {
    select: {
      options: [
        { name: 'Draft', color: 'gray' },
        { name: 'In review', color: 'yellow' },
        { name: 'Published', color: 'green' },
      ],
    },
  },
  Slug: { rich_text: {} },
  File: { rich_text: {} },
  'Last synced': { date: {} },
};

async function createBoard(token, parentPageUrl, title = 'Blog Drafts') {
  const db = await notion(token, 'POST', '/databases', {
    parent: { type: 'page_id', page_id: pageIdFromUrl(parentPageUrl) },
    title: [{ type: 'text', text: { content: title } }],
    properties: BOARD_PROPERTIES,
  });
  return { id: db.id, url: db.url, title };
}

/* ------------------------------------------------------------------------ push */

const chunk = (arr, n) => Array.from({ length: Math.ceil(arr.length / n) }, (_, i) => arr.slice(i * n, i * n + n));

async function clearPage(token, pageId) {
  let cursor;
  const ids = [];
  do {
    const res = await notion(token, 'GET', `/blocks/${pageId}/children?page_size=100` + (cursor ? `&start_cursor=${cursor}` : ''));
    ids.push(...res.results.map((b) => b.id));
    cursor = res.has_more ? res.next_cursor : null;
  } while (cursor);
  for (const id of ids) await notion(token, 'DELETE', `/blocks/${id}`);
  return ids.length;
}

async function push({ token, dir, root, relPath, title, slug, body, status }) {
  const db = store(dir).read();
  if (!db.databaseId) throw new Error('no Notion board configured yet');

  const { blocks, media } = toBlocks(body);

  // Upload assets and swap them in for their placeholders.
  for (const item of media) {
    const abs = path.join(root, item.asset.replace(/^\//, ''));
    if (!fs.existsSync(abs)) {
      // Say so rather than dropping it: a silent gap reads as "there was no image".
      blocks[item.index] = block('callout', {
        icon: { type: 'emoji', emoji: '⚠️' },
        rich_text: richText(`missing file: ${item.asset}`),
      });
      continue;
    }
    try {
      const file = await uploadImage(token, abs);
      blocks[item.index] = block(file.kind, { type: 'file_upload', file_upload: { id: file.id } });
    } catch (err) {
      blocks[item.index] = block('paragraph', {
        rich_text: richText(`[${path.basename(item.asset)} — ${err.message}]`),
      });
    }
  }

  const props = {
    Name: { title: [{ type: 'text', text: { content: title || 'Untitled' } }] },
    Status: { select: { name: status || 'In review' } },
    Slug: { rich_text: [{ type: 'text', text: { content: slug || '' } }] },
    File: { rich_text: [{ type: 'text', text: { content: relPath } }] },
    'Last synced': { date: { start: new Date().toISOString() } },
  };

  // The remembered page may have been deleted or moved to the trash in Notion.
  // Writing into a trashed page "succeeds" and vanishes, so check before reusing.
  const known = db.pages[relPath];
  let reuse = null;
  if (known) {
    try {
      const existing = await notion(token, 'GET', `/pages/${known.id}`);
      if (!existing.archived && !existing.in_trash) reuse = known;
    } catch { /* gone entirely */ }
  }

  let page, replaced = 0, recreated = false;
  if (reuse) {
    page = await notion(token, 'PATCH', `/pages/${reuse.id}`, { properties: props });
    replaced = await clearPage(token, reuse.id);
  } else {
    recreated = Boolean(known);
    page = await notion(token, 'POST', '/pages', { parent: { database_id: db.databaseId }, properties: props });
  }

  for (const part of chunk(blocks, 100)) {
    await notion(token, 'PATCH', `/blocks/${page.id}/children`, { children: part });
  }

  // Re-read before writing: two pushes racing must not lose each other's ids.
  const latest = store(dir).read();
  latest.pages = latest.pages || {};
  latest.pages[relPath] = { id: page.id, url: page.url, syncedAt: new Date().toISOString() };
  store(dir).write(latest);
  return { url: page.url, id: page.id, blocks: blocks.length, replaced, recreated };
}

// One push at a time per file — a double click used to create two board rows.
const inFlight = new Map();
function pushOnce(args) {
  const key = args.relPath;
  if (inFlight.has(key)) return inFlight.get(key);
  const job = push(args).finally(() => inFlight.delete(key));
  inFlight.set(key, job);
  return job;
}

/* -------------------------------------------------------------------- comments */

const plain = (rich) => (rich || []).map((r) => r.plain_text).join('');

// Comments hang off individual blocks, so finding them means asking per block.
async function comments({ token, dir, relPath, onProgress }) {
  const db = store(dir).read();
  const known = db.pages[relPath];
  if (!known) throw new Error('this post has not been sent to Notion yet');

  const found = [];
  let pageLevel;
  try {
    pageLevel = await notion(token, 'GET', `/comments?block_id=${known.id}&page_size=100`);
  } catch (err) {
    if (/403|permission/i.test(err.message)) {
      throw new Error(
        'The Notion integration cannot read comments.\n\n' +
        'Turn it on at notion.so/profile/integrations → your integration →\n' +
        'Capabilities → tick "Read comments", then Save.'
      );
    }
    throw err;
  }
  for (const c of pageLevel.results) {
    found.push({ on: '(whole page)', by: c.created_by && c.created_by.id, at: c.created_time, text: plain(c.rich_text) });
  }

  let cursor, children = [];
  do {
    const res = await notion(token, 'GET', `/blocks/${known.id}/children?page_size=100` + (cursor ? `&start_cursor=${cursor}` : ''));
    children.push(...res.results);
    cursor = res.has_more ? res.next_cursor : null;
  } while (cursor);

  for (let i = 0; i < children.length; i++) {
    const b = children[i];
    if (onProgress) onProgress(i + 1, children.length);
    const rich = b[b.type] && b[b.type].rich_text;
    let res;
    try {
      res = await notion(token, 'GET', `/comments?block_id=${b.id}&page_size=100`);
    } catch { continue; }
    for (const c of res.results) {
      found.push({
        on: plain(rich).slice(0, 90) || `(${b.type})`,
        by: c.created_by && c.created_by.id,
        at: c.created_time,
        text: plain(c.rich_text),
      });
    }
  }

  return { url: known.url, comments: found };
}

module.exports = { loadEnv, store, notion, createBoard, push: pushOnce, comments, toBlocks, pageIdFromUrl };
