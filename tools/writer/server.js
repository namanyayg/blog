#!/usr/bin/env node
/**
 * Minimal local writing app for this Jekyll blog.
 *
 *   node tools/writer/server.js       →  http://localhost:4321
 *
 * No dependencies. Reads and writes _posts/ and _drafts/ directly.
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const { spawn, execFile } = require('child_process');
const notionSync = require('./notion');

const ROOT = process.env.WRITER_ROOT ? path.resolve(process.env.WRITER_ROOT) : path.resolve(__dirname, '..', '..');
const POSTS = path.join(ROOT, '_posts');
const DRAFTS = path.join(ROOT, '_drafts');
const ASSETS = path.join(ROOT, 'assets');
const PORT = Number(process.env.PORT || 4321);

/* ---------------------------------------------------------------- frontmatter */

// Fields the UI knows how to edit. Everything else round-trips verbatim.
const KNOWN = [
  'title',
  'layout',
  'date',
  'categories',
  'tags',
  'permalink',
  'excerpt_separator',
  'post_promotion_type',
  'image',
  'twitter_image',
  'twitter_card',
  'is_featured',
  'prevent_syndication',
  'author',
];
const LIST_FIELDS = new Set(['categories', 'tags']);

function unquote(s) {
  const t = s.trim();
  if (t.length >= 2 && ((t[0] === '"' && t.endsWith('"')) || (t[0] === "'" && t.endsWith("'")))) {
    const inner = t.slice(1, -1);
    return t[0] === '"' ? inner.replace(/\\"/g, '"') : inner.replace(/''/g, "'");
  }
  return t;
}

function quote(s) {
  const v = String(s);
  if (v === '') return '""';
  if (/^[-?:,[\]{}#&*!|>'"%@`]/.test(v) || /: /.test(v) || /\s#/.test(v) || /\n/.test(v)) {
    return '"' + v.replace(/\\/g, '\\\\').replace(/"/g, '\\"') + '"';
  }
  return v;
}

function parseFile(raw) {
  const known = {};
  // Some posts are CRLF. Parse in LF and remember, so saving writes it back the
  // way it came. (JS's `.` never matches \r, so a stray \r breaks every regex.)
  const crlf = raw.includes('\r\n');
  const text = crlf ? raw.replace(/\r\n/g, '\n') : raw;
  if (!text.startsWith('---')) return { known, extra: '', body: text, crlf };

  const lines = text.split('\n');
  let end = -1;
  for (let i = 1; i < lines.length; i++) {
    if (lines[i].trim() === '---') { end = i; break; }
  }
  if (end === -1) return { known, extra: '', body: text, crlf };

  const body = lines.slice(end + 1).join('\n').replace(/^\n/, '');

  // Group frontmatter into entries: a `key:` line plus any continuation lines.
  const entries = [];
  let cur = null;
  for (const line of lines.slice(1, end)) {
    const m = /^([A-Za-z0-9_-]+):(.*)$/.exec(line);
    if (m) {
      cur = { key: m[1], inline: m[2].trim(), raw: [line] };
      entries.push(cur);
    } else if (/^\s*#/.test(line) || line.trim() === '') {
      entries.push({ key: null, raw: [line] });
      cur = null;
    } else if (cur) {
      cur.raw.push(line);
    } else {
      entries.push({ key: null, raw: [line] });
    }
  }

  const extra = [];
  for (const e of entries) {
    if (e.key && KNOWN.includes(e.key)) {
      const items = e.raw
        .slice(1)
        .map((s) => s.trim())
        .filter((s) => s.startsWith('- '))
        .map((s) => unquote(s.slice(2)));
      if (LIST_FIELDS.has(e.key)) {
        known[e.key] = items.length ? items : e.inline ? [unquote(e.inline)] : [];
      } else {
        known[e.key] = unquote(e.inline);
      }
    } else {
      extra.push(e.raw.join('\n'));
    }
  }

  return { known, extra: extra.join('\n').replace(/\n+$/, ''), body, crlf };
}

function serialize({ known, extra, body, crlf }) {
  const out = ['---'];
  for (const key of KNOWN) {
    const v = known[key];
    if (v === undefined || v === null || v === '') continue;
    if (LIST_FIELDS.has(key)) {
      if (!v.length) continue;
      out.push(key + ':');
      for (const item of v) out.push(' - ' + quote(item));
    } else {
      out.push(key + ': ' + (key === 'date' ? v : quote(v)));
    }
  }
  if (extra && extra.trim()) out.push(extra.replace(/\n+$/, ''));
  out.push('---', '', '');
  const text = out.join('\n') + body.replace(/^\n+/, '') + '\n';
  return crlf ? text.replace(/\n/g, '\r\n') : text;
}

/* ---------------------------------------------------------------------- files */

const DATE_PREFIX = /^(\d{4}-\d{2}-\d{2})-/;

function slugify(s) {
  return String(s)
    .toLowerCase()
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80) || 'untitled';
}

function listDir(dir, type) {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => /\.(md|markdown|html)$/i.test(f))
    .map((f) => {
      const rel = path.join(path.basename(dir), f);
      const { known } = parseFile(fs.readFileSync(path.join(dir, f), 'utf8'));
      const m = DATE_PREFIX.exec(f);
      return {
        path: rel,
        type,
        name: f,
        title: known.title || f.replace(/\.[^.]+$/, ''),
        date: (known.date || (m ? m[1] : '')).slice(0, 10),
        categories: known.categories || [],
      };
    })
    .sort((a, b) => (b.date || '').localeCompare(a.date || '') || a.name.localeCompare(b.name));
}

const BACKUPS = path.join(__dirname, '.backups');
const KEEP_BACKUPS = 20;

// Copy the previous contents aside before every write. Gitignored, local only —
// cheap insurance against a bad merge, a stray paste, or a wrong Save.
function backup(abs) {
  if (!fs.existsSync(abs)) return;
  fs.mkdirSync(BACKUPS, { recursive: true });
  const base = path.basename(abs, path.extname(abs));
  const stamp = new Date().toISOString().replace(/[-:]/g, '').replace(/\..+/, '');
  fs.copyFileSync(abs, path.join(BACKUPS, `${base}.${stamp}.md`));

  const mine = fs.readdirSync(BACKUPS).filter((f) => f.startsWith(base + '.')).sort();
  for (const old of mine.slice(0, Math.max(0, mine.length - KEEP_BACKUPS))) {
    fs.unlinkSync(path.join(BACKUPS, old));
  }
}

// Resolve a client-supplied relative path, refusing anything outside _posts/_drafts.
function safePath(rel) {
  const abs = path.resolve(ROOT, rel);
  if (abs !== POSTS && abs !== DRAFTS && !abs.startsWith(POSTS + path.sep) && !abs.startsWith(DRAFTS + path.sep)) {
    throw new Error('path outside content directories: ' + rel);
  }
  return abs;
}

function today() {
  const d = new Date();
  return [d.getFullYear(), String(d.getMonth() + 1).padStart(2, '0'), String(d.getDate()).padStart(2, '0')].join('-');
}

function targetPath({ type, slug, date }) {
  const clean = slugify(slug);
  if (type === 'post') {
    const d = (date || '').slice(0, 10) || today();
    return path.join('_posts', `${d}-${clean.replace(DATE_PREFIX, '')}.md`);
  }
  return path.join('_drafts', `${clean}.md`);
}

/* --------------------------------------------------------------------- assets */

const EXT_BY_MIME = {
  'image/png': '.png',
  'image/jpeg': '.jpg',
  'image/jpg': '.jpg',
  'image/gif': '.gif',
  'image/webp': '.webp',
  'image/avif': '.avif',
  'image/svg+xml': '.svg',
  'image/heic': '.heic',
  'video/mp4': '.mp4',
  'video/webm': '.webm',
  'video/quicktime': '.mov',
  'video/x-m4v': '.m4v',
};
const MIME_BY_EXT = Object.fromEntries(Object.entries(EXT_BY_MIME).map(([m, e]) => [e, m]));

// Saves a pasted/dropped image or clip into assets/<post-slug>/ and returns its site path.
function saveMedia({ slug, name, mime, dataBase64 }) {
  const ext = EXT_BY_MIME[mime] || path.extname(name || '').toLowerCase() || '.png';
  if (!MIME_BY_EXT[ext]) throw new Error('unsupported media type: ' + (mime || ext));

  const folder = slugify(slug || 'inline').replace(DATE_PREFIX, '');
  const dir = path.join(ASSETS, folder);
  fs.mkdirSync(dir, { recursive: true });

  // A pasted screenshot arrives nameless: name it after the post it lands in.
  const base = name ? slugify(name.replace(/\.[^.]+$/, '')) : folder;
  let file = base + ext;
  for (let i = 2; fs.existsSync(path.join(dir, file)); i++) file = `${base}-${i}${ext}`;

  fs.writeFileSync(path.join(dir, file), Buffer.from(dataBase64, 'base64'));
  return {
    url: `/assets/${folder}/${file}`,
    bytes: fs.statSync(path.join(dir, file)).size,
    kind: mime.startsWith('video/') || /\.(mp4|webm|mov|m4v)$/.test(ext) ? 'video' : 'image',
  };
}

function safeAsset(rel) {
  const abs = path.resolve(ROOT, '.' + decodeURIComponent(rel.replace(/^\/blog/, '')));
  if (!abs.startsWith(ASSETS + path.sep)) throw new Error('path outside assets: ' + rel);
  return abs;
}

// Which posts/drafts mention this asset — renaming would break them.
function referencesTo(url, exceptPath) {
  const base = path.basename(url);
  const hits = [];
  for (const dir of [POSTS, DRAFTS]) {
    if (!fs.existsSync(dir)) continue;
    for (const f of fs.readdirSync(dir)) {
      const rel = path.join(path.basename(dir), f);
      if (rel === exceptPath || !/\.(md|markdown|html)$/i.test(f)) continue;
      if (fs.readFileSync(path.join(dir, f), 'utf8').includes(base)) hits.push(rel);
    }
  }
  return hits;
}

function renameAsset({ from, to, exceptPath, force }) {
  const src = safeAsset(from);
  if (!fs.existsSync(src)) throw new Error('no such file: ' + from);

  const ext = path.extname(src);
  const base = slugify(String(to || '').replace(/\.[^.]+$/, ''));
  if (!base) throw new Error('name cannot be empty');
  const dir = path.dirname(src);
  const dest = path.join(dir, base + ext);
  if (dest === src) return { url: from, unchanged: true };
  if (fs.existsSync(dest)) throw new Error(base + ext + ' already exists');

  const refs = referencesTo(from, exceptPath);
  if (refs.length && !force) return { needsConfirm: true, refs };

  fs.renameSync(src, dest);
  return { url: '/assets/' + path.relative(ASSETS, dest).split(path.sep).join('/'), refs };
}

/* ------------------------------------------------------- preview (jekyll serve) */

const PREVIEW_PORT = Number(process.env.PREVIEW_PORT || 4000);
let jekyll = null;
let jekyllLog = [];
let jekyllError = null;

// Jekyll writes its fatal reason across a few lines; keep the useful part.
function buildError(lines) {
  const hit = lines.find((l) => /Invalid date|Error:|ERROR:|Liquid Exception|cannot load|not have a valid date/i.test(l));
  if (!hit) return lines.slice(-6).join('\n') || 'jekyll exited';
  return lines
    .filter((l) => /Error|ERROR|Invalid|Exception/i.test(l))
    .map((l) => l.replace(/\[\d+m/g, '').replace(/\s+/g, ' ').trim())
    .filter((l) => l && !/^-+$/.test(l) && !/YOUR SITE COULD NOT BE BUILT/i.test(l))
    .slice(0, 3)
    .join('\n');
}

// `jekyll serve --drafts --unpublished` is Jekyll's own way to see unpublished
// work: it builds _drafts/ and any `published: false` post into the local site.
function startPreview() {
  if (jekyll) return false;
  jekyllLog = [];
  jekyllError = null;
  jekyll = spawn(
    'bundle',
    ['exec', 'jekyll', 'serve', '--drafts', '--unpublished', '--host', '127.0.0.1', '--port', String(PREVIEW_PORT)],
    { cwd: ROOT }
  );
  const collect = (d) => {
    process.stdout.write('[jekyll] ' + d);
    jekyllLog.push(...String(d).split('\n').filter(Boolean));
    if (jekyllLog.length > 200) jekyllLog = jekyllLog.slice(-200);
  };
  jekyll.stdout.on('data', collect);
  jekyll.stderr.on('data', collect);
  jekyll.on('error', (err) => { jekyllError = 'could not run bundle: ' + err.message; jekyll = null; });
  jekyll.on('exit', (code) => {
    if (code) jekyllError = buildError(jekyllLog);
    jekyll = null;
  });
  return true;
}

function previewUp() {
  return new Promise((resolve) => {
    const req = http.request(
      { host: '127.0.0.1', port: PREVIEW_PORT, path: '/', method: 'HEAD', timeout: 800 },
      () => resolve(true)
    );
    req.on('error', () => resolve(false));
    req.on('timeout', () => { req.destroy(); resolve(false); });
    req.end();
  });
}

// Never orphan the preview server when the writer stops.
process.on('exit', () => { if (jekyll) jekyll.kill(); });
for (const sig of ['SIGINT', 'SIGTERM', 'SIGHUP']) {
  process.on(sig, () => { if (jekyll) jekyll.kill(); process.exit(0); });
}

/* --------------------------------------------------------------- build check */

// `jekyll build` is the same thing GitHub Pages runs. Failing here means the
// site would break once pushed — worth the wait before a deploy.
function buildSite() {
  return new Promise((resolve) => {
    execFile('bundle', ['exec', 'jekyll', 'build', '--drafts'], { cwd: ROOT, maxBuffer: 1e7 },
      (err, stdout, stderr) => {
        const output = String(stdout || '') + String(stderr || '');
        const lines = output.split('\n').filter(Boolean);
        resolve(err ? { ok: false, error: buildError(lines), output: lines.slice(-25).join('\n') }
                    : { ok: true, output: lines.slice(-6).join('\n') });
      });
  });
}

/* ------------------------------------------------------------- deploy (git) */

// raw: keep leading whitespace — porcelain status lines start with a space.
function git(args, { raw = false } = {}) {
  return new Promise((resolve, reject) => {
    execFile('git', args, { cwd: ROOT, maxBuffer: 1e7 }, (err, stdout, stderr) => {
      if (err) return reject(new Error(((stderr || '') + (stdout || '') || err.message).trim()));
      resolve(raw ? (stdout || '').replace(/\n$/, '') : (stdout || '').trim());
    });
  });
}

// Only content is ever staged. _drafts/ is gitignored, so drafts never leave
// this machine — that is also why a draft has no shareable URL.
const DEPLOY_PATHS = ['_posts', 'assets'];

async function gitStatus() {
  const branch = await git(['rev-parse', '--abbrev-ref', 'HEAD']);
  const parse = (out) =>
    out.split('\n').filter(Boolean).map((l) => ({ status: l.slice(0, 2).trim(), path: l.slice(3) }));
  const content = parse(await git(['status', '--porcelain', '--', ...DEPLOY_PATHS], { raw: true }));
  const all = parse(await git(['status', '--porcelain'], { raw: true }));
  const other = all.filter((f) => !content.some((c) => c.path === f.path));
  let ahead = 0;
  try {
    ahead = Number(await git(['rev-list', '--count', '@{upstream}..HEAD'])) || 0;
  } catch { /* no upstream configured */ }
  return { branch, files: content, other, ahead };
}

async function deploy({ message }) {
  const before = await gitStatus();
  const log = [];
  if (before.files.length) {
    await git(['add', '--', ...DEPLOY_PATHS]);
    const staged = await git(['diff', '--cached', '--name-only']);
    if (staged) {
      log.push(await git(['commit', '-m', message || 'update posts']));
    }
  }
  const after = await gitStatus();
  if (!before.files.length && !after.ahead) {
    return { ok: true, committed: false, pushed: false, log: ['Nothing to deploy — no post or asset changes.'], status: after };
  }
  log.push(await git(['push']));
  return { ok: true, committed: Boolean(before.files.length), pushed: true, log, status: await gitStatus() };
}

/* -------------------------------------------------------------- notion (share) */

const env = notionSync.loadEnv(__dirname);

function notionToken() {
  const token = process.env.NOTION_TOKEN || env.NOTION_TOKEN;
  if (!token) throw new Error('no NOTION_TOKEN in tools/writer/.env');
  return token;
}

function notionState() {
  const cfg = notionSync.store(__dirname).read();
  return {
    hasToken: Boolean(process.env.NOTION_TOKEN || env.NOTION_TOKEN),
    board: cfg.databaseId ? { id: cfg.databaseId, url: cfg.boardUrl, title: cfg.boardTitle } : null,
    pages: cfg.pages || {},
  };
}

/* --------------------------------------------------------------------- server */

function json(res, code, data) {
  const buf = Buffer.from(JSON.stringify(data));
  res.writeHead(code, { 'content-type': 'application/json', 'content-length': buf.length });
  res.end(buf);
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let data = '';
    req.on('data', (c) => {
      data += c;
      if (data.length > 4e7) reject(new Error('body too large'));
    });
    req.on('end', () => {
      try { resolve(JSON.parse(data || '{}')); } catch (e) { reject(e); }
    });
  });
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, 'http://localhost');
  try {
    if (req.method === 'GET' && (url.pathname === '/' || url.pathname === '/index.html')) {
      const html = fs.readFileSync(path.join(__dirname, 'index.html'));
      res.writeHead(200, { 'content-type': 'text/html; charset=utf-8' });
      return res.end(html);
    }

    if (req.method === 'GET' && url.pathname === '/api/list') {
      return json(res, 200, {
        files: [...listDir(DRAFTS, 'draft'), ...listDir(POSTS, 'post')],
      });
    }

    if (req.method === 'GET' && url.pathname === '/api/file') {
      const rel = url.searchParams.get('path');
      const abs = safePath(rel);
      const parsed = parseFile(fs.readFileSync(abs, 'utf8'));
      const name = path.basename(abs).replace(/\.[^.]+$/, '');
      const type = abs.startsWith(POSTS) ? 'post' : 'draft';
      return json(res, 200, {
        path: rel,
        type,
        slug: type === 'post' ? name.replace(DATE_PREFIX, '') : name,
        ...parsed,
      });
    }

    if (req.method === 'POST' && url.pathname === '/api/save') {
      const doc = await readBody(req);
      const known = doc.known || {};
      if (!known.title) known.title = 'Untitled';
      if (doc.type === 'post') {
        known.layout = known.layout || 'post';
        known.date = known.date || today();
      }

      // Keep the filename you already have unless the slug, date or draft/post
      // state actually changed — some posts deliberately carry a filename date
      // that differs from the frontmatter date.
      const sameDir = doc.path && doc.path.startsWith(doc.type === 'post' ? '_posts' : '_drafts');
      const rel = doc.keepPath && sameDir
        ? doc.path
        : targetPath({ type: doc.type, slug: doc.slug || known.title, date: known.date });
      const abs = safePath(rel);
      fs.mkdirSync(path.dirname(abs), { recursive: true });
      backup(abs);
      fs.writeFileSync(abs, serialize({ known, extra: doc.extra || '', body: doc.body || '', crlf: !!doc.crlf }));

      // Renamed or moved between _drafts and _posts: drop the old file.
      if (doc.path && doc.path !== rel) {
        const old = safePath(doc.path);
        if (fs.existsSync(old)) fs.unlinkSync(old);
      }
      return json(res, 200, { path: rel, type: doc.type });
    }

    if (req.method === 'POST' && url.pathname === '/api/upload') {
      const b = await readBody(req);
      return json(res, 200, saveMedia(b));
    }

    if (url.pathname === '/api/preview') {
      if (req.method === 'POST') {
        const started = startPreview();
        return json(res, 200, { started, ready: await previewUp(), port: PREVIEW_PORT });
      }
      return json(res, 200, {
        ready: await previewUp(),
        running: Boolean(jekyll),
        buildError: jekyllError,
        port: PREVIEW_PORT,
      });
    }

    if (req.method === 'GET' && url.pathname === '/api/notion') {
      return json(res, 200, notionState());
    }

    if (req.method === 'POST' && url.pathname === '/api/notion/board') {
      const { parent, title } = await readBody(req);
      const board = await notionSync.createBoard(notionToken(), parent, title);
      const cfg = notionSync.store(__dirname).read();
      cfg.databaseId = board.id;
      cfg.boardUrl = board.url;
      cfg.boardTitle = board.title;
      cfg.pages = cfg.pages || {};
      notionSync.store(__dirname).write(cfg);
      return json(res, 200, board);
    }

    if (req.method === 'POST' && url.pathname === '/api/notion/push') {
      const b = await readBody(req);
      safePath(b.path);       // refuse anything outside _posts/_drafts
      const result = await notionSync.push({
        token: notionToken(),
        dir: __dirname,
        root: ROOT,
        relPath: b.path,
        title: b.title,
        slug: b.slug,
        body: b.body || '',
        status: b.status,
      });
      return json(res, 200, result);
    }

    if (req.method === 'GET' && url.pathname === '/api/notion/comments') {
      const rel = url.searchParams.get('path');
      safePath(rel);
      return json(res, 200, await notionSync.comments({ token: notionToken(), dir: __dirname, relPath: rel }));
    }

    if (req.method === 'GET' && url.pathname === '/api/git/status') {
      return json(res, 200, await gitStatus());
    }

    if (req.method === 'POST' && url.pathname === '/api/build') {
      return json(res, 200, await buildSite());
    }

    if (req.method === 'POST' && url.pathname === '/api/deploy') {
      const body = await readBody(req);
      // Never push a site that does not build.
      const build = await buildSite();
      if (!build.ok) return json(res, 200, { ok: false, build, log: ['Build failed — nothing was committed or pushed.'] });
      return json(res, 200, { ...(await deploy(body)), build });
    }

    if (req.method === 'POST' && url.pathname === '/api/rename-asset') {
      return json(res, 200, renameAsset(await readBody(req)));
    }

    // Read-only asset serving, so pasted media can be previewed in the editor.
    if (req.method === 'GET' && url.pathname.startsWith('/assets/')) {
      const abs = path.resolve(ROOT, '.' + decodeURIComponent(url.pathname));
      if (abs.startsWith(ASSETS + path.sep) && fs.existsSync(abs)) {
        const mime = MIME_BY_EXT[path.extname(abs).toLowerCase()] || 'application/octet-stream';
        const size = fs.statSync(abs).size;
        const range = /^bytes=(\d*)-(\d*)$/.exec(req.headers.range || '');
        if (range) {   // video scrubbing needs partial responses
          const start = range[1] ? Number(range[1]) : 0;
          const end = range[2] ? Number(range[2]) : size - 1;
          res.writeHead(206, {
            'content-type': mime,
            'content-range': `bytes ${start}-${end}/${size}`,
            'accept-ranges': 'bytes',
            'content-length': end - start + 1,
          });
          return fs.createReadStream(abs, { start, end }).pipe(res);
        }
        res.writeHead(200, { 'content-type': mime, 'content-length': size, 'accept-ranges': 'bytes' });
        return fs.createReadStream(abs).pipe(res);
      }
    }

    res.writeHead(404, { 'content-type': 'text/plain' });
    res.end('not found');
  } catch (err) {
    json(res, 500, { error: String(err.message || err) });
  }
});

server.listen(PORT, '127.0.0.1', () => {
  console.log(`✎  writing app  →  http://localhost:${PORT}`);
  console.log(`   posts: ${path.relative(process.cwd(), POSTS)}   drafts: ${path.relative(process.cwd(), DRAFTS)}`);
});
