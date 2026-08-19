'use strict';

// Syndicate a post to Kit (ConvertKit) as a broadcast.
//
// A broadcast created here is always a DRAFT: no `send_at`, so Kit holds it for
// you to review and send by hand. Nothing in this file can mail your list —
// sending stays a deliberate click in Kit, because it is the one step you
// cannot take back.
//
// The house style, read off every previous broadcast on the account: a short
// letter that teases the piece and links to it, not a copy of the article.
// The post lives on nmn.gl (where the CTA and images are); the email's job is
// to get people there. `--full` overrides that and inlines the whole body.
//
// Stdlib only, like the rest of the writer.

const fs = require('fs');
const path = require('path');
const https = require('https');

const ROOT = process.env.WRITER_ROOT
  ? path.resolve(process.env.WRITER_ROOT)
  : path.resolve(__dirname, '..', '..');

const API = 'https://api.kit.com/v4';

// Matches the account's existing broadcasts so a syndicated post looks like
// every other letter the list has had.
const TEMPLATE_ID = 4173676;          // "N Text"
const SITE = 'https://nmn.gl/blog';

// ---------------------------------------------------------------- env / state

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

// Which post became which broadcast — per-machine bookkeeping, never committed.
function store(dir) {
  const file = path.join(dir, '.kit.json');
  const read = () => {
    try { return JSON.parse(fs.readFileSync(file, 'utf8')); } catch { return { broadcasts: {} }; }
  };
  return { read, write(next) { fs.writeFileSync(file, JSON.stringify(next, null, 2)); return next; } };
}

function apiKey(dir = __dirname) {
  const key = process.env.KIT_API_KEY || loadEnv(dir).KIT_API_KEY;
  if (!key) throw new Error('No KIT_API_KEY. Put it in tools/writer/.env (gitignored).');
  return key;
}

// ---------------------------------------------------------------- transport

function request(method, url, key, body) {
  return new Promise((resolve, reject) => {
    const payload = body ? JSON.stringify(body) : null;
    const u = new URL(url);
    const req = https.request({
      method,
      hostname: u.hostname,
      path: u.pathname + u.search,
      headers: {
        'X-Kit-Api-Key': key,
        'content-type': 'application/json',
        ...(payload ? { 'content-length': Buffer.byteLength(payload) } : {}),
      },
    }, (res) => {
      let d = '';
      res.on('data', (c) => (d += c));
      res.on('end', () => {
        let parsed = null;
        try { parsed = JSON.parse(d); } catch { /* non-JSON error page */ }
        if (res.statusCode >= 400) {
          const detail = parsed ? JSON.stringify(parsed.errors || parsed) : d.slice(0, 300);
          return reject(new Error(`Kit ${method} ${u.pathname} → ${res.statusCode}: ${detail}`));
        }
        resolve(parsed);
      });
    });
    req.on('error', reject);
    if (payload) req.write(payload);
    req.end();
  });
}

// ---------------------------------------------------------------- post → email

function parsePost(abs) {
  const raw = fs.readFileSync(abs, 'utf8');
  const m = /^---\n([\s\S]*?)\n---\n?/.exec(raw);
  const front = {};
  if (m) {
    for (const line of m[1].split('\n')) {
      const f = /^([a-z_]+):\s*(.*)$/.exec(line);
      if (f && f[2]) front[f[1]] = f[2].replace(/^["']|["']$/g, '');
    }
  }
  const name = path.basename(abs).replace(/\.md$/, '').replace(/^\d{4}-\d{2}-\d{2}-/, '');
  return { front, body: m ? raw.slice(m[0].length) : raw, slug: front.permalink || name };
}

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#x27;');

// Kit's editor emits a flat run of <p class="">; anything richer round-trips
// badly, so keep to the subset it actually round-trips: p, strong, em, a.
function inline(md) {
  let s = esc(md);
  s = s.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_, t, href) =>
    `<a href="${href}" target="_blank" class="ck-link" rel="noopener noreferrer">${t}</a>`);
  s = s.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  s = s.replace(/(^|[^*])\*([^*]+)\*/g, '$1<em>$2</em>');
  s = s.replace(/`([^`]+)`/g, '<code>$1</code>');
  return s;
}

function wrap(paragraphs) {
  return '<table cellPadding="0" cellSpacing="0" style="width:100%;margin:0 auto"><tbody><tr><td>'
    + paragraphs.map((p) => `<p class="">${p}</p>`).join('')
    + '</td></tr></tbody></table>';
}

// Everything before the <!--more--> cut is the hook the post itself leads with,
// which is exactly what the email should tease.
function teaser({ body, title, url, blurb }) {
  const above = body.split('<!--more-->')[0];
  const paras = above
    .split('\n\n')
    .map((p) => p.trim())
    .filter((p) => p && !p.startsWith('<figure') && !p.startsWith('#') && !p.startsWith('---'))
    .slice(0, 3)
    .map(inline);

  return wrap([
    'Hey,',
    ...paras,
    blurb ? inline(blurb) : `I wrote up the whole playbook — the list, the messages, and the tooling I use to run it: <a href="${url}" target="_blank" class="ck-link" rel="noopener noreferrer">${url}</a>.`,
    'Has LinkedIn worked for you, or have you written it off? Hit reply — I read everything.',
    'Keep shipping,',
    'Namanyay',
  ]);
}

// `--full` inlines the article. Images point at nmn.gl, so the post has to be
// live before this is worth sending.
function fullBody({ body, url }) {
  const out = [];
  for (const block of body.split('\n\n')) {
    const p = block.trim();
    if (!p || p === '<!--more-->') continue;
    const fig = /<img\s+src="\{\{\s*'([^']+)'\s*\|\s*relative_url\s*\}\}"[^>]*alt="([^"]*)"/.exec(p);
    if (fig) {
      out.push(`<img src="https://nmn.gl${fig[1]}" alt="${esc(fig[2])}" style="max-width:100%;height:auto" />`);
      continue;
    }
    if (p.startsWith('<')) continue;
    const h = /^#{1,6}\s+(.*)$/.exec(p);
    out.push(h ? `<strong>${inline(h[1])}</strong>` : inline(p));
  }
  out.push(`Originally posted at <a href="${url}" target="_blank" class="ck-link" rel="noopener noreferrer">${url}</a>.`,
    'Keep shipping,', 'Namanyay');
  return wrap(out);
}

// ---------------------------------------------------------------- api

async function syndicate({
  relPath, subject, previewText = '', from = '', full = false, blurb = '',
  dir = __dirname, root = ROOT,
} = {}) {
  const key = apiKey(dir);
  const abs = path.join(root, relPath);
  if (!fs.existsSync(abs)) throw new Error(`No such post: ${relPath}`);

  const { front, body, slug } = parsePost(abs);
  const url = `${SITE}/${slug}`;
  const title = front.title || slug;
  const content = full ? fullBody({ body, url }) : teaser({ body, title, url, blurb });

  const payload = {
    email_template_id: TEMPLATE_ID,
    subject: subject || title,
    content,
    description: `Syndicated from ${url}`,
    public: false,
    // No send_at, deliberately: Kit keeps it as a draft for you to send.
    // No subscriber_filter either — the API only accepts `segment`/`tag` here,
    // and omitting it is what gives you the whole list (what it reads back as
    // `all_subscribers`). Set one in Kit if this should go to a segment.
  };
  if (previewText) payload.preview_text = previewText;
  if (from) payload.email_address = from;
  if (front.image) payload.thumbnail_url = `https://nmn.gl${front.image}`;
  if (front.image) payload.thumbnail_alt = title;

  const st = store(dir);
  const cfg = st.read();
  const existing = cfg.broadcasts && cfg.broadcasts[relPath];

  let res;
  if (existing) {
    res = await request('PUT', `${API}/broadcasts/${existing}`, key, payload);
  } else {
    res = await request('POST', `${API}/broadcasts`, key, payload);
  }
  const b = res.broadcast;

  cfg.broadcasts = cfg.broadcasts || {};
  cfg.broadcasts[relPath] = b.id;
  st.write(cfg);

  return { id: b.id, subject: b.subject, status: b.status, publicUrl: b.public_url, updated: !!existing, url };
}

module.exports = { syndicate, loadEnv, store, apiKey, request, teaser, fullBody, parsePost, API };

// ---------------------------------------------------------------- cli

if (require.main === module) {
  const argv = process.argv.slice(2);
  const opt = (n, d = '') => {
    const i = argv.indexOf(`--${n}`);
    return i === -1 ? d : argv[i + 1];
  };
  const relPath = argv.find((a) => !a.startsWith('--') && a.endsWith('.md'));
  if (!relPath) {
    console.error('usage: node kit.js _posts/<file>.md --subject "…" [--preview "…"] [--from addr] [--full]');
    process.exit(1);
  }
  syndicate({
    relPath,
    subject: opt('subject'),
    previewText: opt('preview'),
    from: opt('from'),
    blurb: opt('blurb'),
    full: argv.includes('--full'),
  })
    .then((r) => {
      console.log(`${r.updated ? 'updated' : 'created'} broadcast ${r.id} — DRAFT, not sent`);
      console.log(`  subject  ${r.subject}`);
      console.log(`  status   ${r.status}`);
      console.log(`  post     ${r.url}`);
      console.log('  review and send it from https://app.kit.com/broadcasts');
    })
    .catch((e) => { console.error(String(e.message || e)); process.exit(1); });
}
