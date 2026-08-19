'use strict';

// Import a post from X (twitter) into _drafts/ with its images.
//
// Stdlib only, like the rest of the writer. Two sources of truth:
//
//   * the public syndication endpoint, which needs no auth and gives us the
//     title, date, cover image and (for plain tweets) every attached photo;
//   * the rendered article page (see x-images.js), which needs a logged-in
//     session and is the only place the *inline* images of an X Article exist —
//     X has no API that returns them.
//
// Neither can give us an Article's body text — X does not serve it to anything
// unauthenticated — so a body can also be handed in verbatim (`--text`). Lines
// that are just `Image` are the placeholders X's own copy-to-clipboard leaves
// behind; each one is replaced with a real <figure> in order.

const fs = require('fs');
const path = require('path');
const https = require('https');

const ROOT = process.env.WRITER_ROOT
  ? path.resolve(process.env.WRITER_ROOT)
  : path.resolve(__dirname, '..', '..');
const DRAFTS = path.join(ROOT, '_drafts');
const ASSETS = path.join(ROOT, 'assets');

const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36';

// ---------------------------------------------------------------- fetching

function get(url, { headers = {}, binary = false } = {}) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, { headers: { 'user-agent': UA, ...headers } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        res.resume();
        return resolve(get(new URL(res.headers.location, url).href, { headers, binary }));
      }
      const chunks = [];
      res.on('data', (c) => chunks.push(c));
      res.on('end', () => {
        const buf = Buffer.concat(chunks);
        if (res.statusCode !== 200) {
          return reject(new Error(`HTTP ${res.statusCode} for ${url}\n${buf.toString('utf8').slice(0, 300)}`));
        }
        resolve(binary ? buf : buf.toString('utf8'));
      });
    });
    req.on('error', reject);
    req.setTimeout(20000, () => req.destroy(new Error(`timed out: ${url}`)));
  });
}

function statusId(input) {
  const m = String(input).match(/(?:status|statuses)\/(\d+)/) || String(input).match(/^(\d{5,25})$/);
  if (!m) throw new Error(`not an x.com status URL or id: ${input}`);
  return m[1];
}

// The token is a checksum X computes from the id; any value works, but it has
// to be present and it has to be short.
async function fetchTweet(id) {
  const url = `https://cdn.syndication.twimg.com/tweet-result?id=${id}&lang=en&token=a`;
  return JSON.parse(await get(url));
}

// ---------------------------------------------------------------- media

// pbs.twimg.com serves a scaled copy by default; `name=orig` is the upload.
function origUrl(u) {
  const url = new URL(u);
  url.searchParams.set('name', 'orig');
  return url.href;
}

function extOf(u) {
  const m = new URL(u).pathname.match(/\.(png|jpe?g|gif|webp|avif)$/i);
  const fmt = new URL(u).searchParams.get('format');
  return (m ? m[1] : fmt || 'jpg').toLowerCase().replace('jpeg', 'jpg');
}

// Every image the unauthenticated endpoint knows about: an Article's cover,
// plus the photos attached to a plain tweet.
function mediaFrom(tweet) {
  const out = [];
  const cover = tweet.article && tweet.article.cover_media;
  if (cover && cover.media_info && cover.media_info.original_img_url) {
    out.push({ url: cover.media_info.original_img_url, cover: true });
  }
  for (const m of tweet.mediaDetails || []) {
    if (m.type === 'photo' && m.media_url_https) out.push({ url: m.media_url_https });
  }
  return out;
}

// Inline Article images come from a real rendered page — see x-images.js for
// why nothing cheaper works.
const xImages = require('./x-images');

// pbs.twimg.com spells the same upload two ways — `…/HQCinp0awAAoZNZ.jpg` from
// the syndication endpoint and `…/HQCinp0awAAoZNZ?format=jpg` from the rendered
// page — so identity is the media key, not the URL.
function mediaKey(u) {
  return new URL(u).pathname.replace(/^.*\//, '').replace(/\.[a-z0-9]+$/i, '');
}

async function download(url, abs) {
  fs.mkdirSync(path.dirname(abs), { recursive: true });
  fs.writeFileSync(abs, await get(origUrl(url), { binary: true }));
  return abs;
}

// ---------------------------------------------------------------- naming

function slugify(s) {
  return String(s)
    .toLowerCase()
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60) || 'untitled';
}

// The writer names a pasted file after the section it lands in — mirror that
// so an imported post is indistinguishable from a hand-written one.
function namer(slug) {
  const used = new Map();
  return (heading) => {
    const base = slugify(heading || slug);
    const n = (used.get(base) || 0) + 1;
    used.set(base, n);
    return n === 1 ? base : `${base}-${n}`;
  };
}

// ---------------------------------------------------------------- body

function figure(rel, alt) {
  return `<figure><img src="{{ '${rel}' | relative_url }}" alt="${alt.replace(/"/g, '&quot;')}"></figure>`;
}

// X's copy-to-clipboard leaves a bare `Image` line where each inline image
// was, and often a caption on the line after it. Swap in real figures, in
// order, and keep the caption as a <figcaption>-ish italic line the way the
// blog already does it.
function spliceImages(body, files, alt) {
  const lines = body.split('\n');
  const out = [];
  let i = 0;
  for (const line of lines) {
    if (/^\s*Image\s*$/.test(line)) {
      const f = files[i++];
      out.push(f ? figure(f.rel, f.caption || alt) : line);
    } else {
      out.push(line);
    }
  }
  return { body: out.join('\n'), used: i };
}

// Which heading is this placeholder sitting under? Used to name the file.
function headingsForPlaceholders(body) {
  const found = [];
  let heading = null;
  for (const line of body.split('\n')) {
    const h = line.match(/^#{1,6}\s+(.*)$/);
    if (h) heading = h[1].trim();
    else if (/^\s*Image\s*$/.test(line)) found.push(heading);
  }
  return found;
}

// A bare tweet has no markdown of its own: expand the t.co links and keep it.
function tweetBody(tweet) {
  let text = tweet.text || '';
  for (const u of (tweet.entities && tweet.entities.urls) || []) {
    text = text.split(u.url).join(u.expanded_url);
  }
  for (const m of tweet.mediaDetails || []) {
    if (m.url) text = text.split(m.url).join('');
  }
  return text.trim();
}

// ---------------------------------------------------------------- frontmatter

function frontmatter({ title, date, categories, tags, cover, promotion }) {
  const l = ['---', `title: ${/[:#]/.test(title) ? JSON.stringify(title) : title}`, 'layout: post', `date: ${date}`];
  if (categories.length) {
    l.push('categories:');
    for (const c of categories) l.push(` - ${c}`);
  }
  if (tags.length) {
    l.push('tags:');
    for (const t of tags) l.push(` - ${t}`);
  }
  l.push('excerpt_separator: <!--more-->');
  if (promotion) l.push(`post_promotion_type: ${promotion}`);
  if (cover) {
    l.push(`image: ${cover}`, `twitter_image: ${cover}`, 'twitter_card: summary_large_image');
  }
  l.push('---', '', '');
  return l.join('\n');
}

// ---------------------------------------------------------------- main

async function importPost({
  url,
  slug: slugIn,
  title: titleIn = '',
  text = '',
  categories = [],
  tags = [],
  images = [],
  browser = false,
  promotion = '',
  write = true,
} = {}) {
  const id = statusId(url);
  const tweet = await fetchTweet(id);
  const article = tweet.article || null;

  const title = (titleIn || (article ? article.title : tweetBody(tweet).split('\n')[0]) || 'Untitled').trim();
  const slug = slugIn || slugify(title);
  const date = (tweet.created_at || new Date().toISOString()).slice(0, 10);
  const body = (text || (article ? article.preview_text : tweetBody(tweet)) || '').trim();

  // Cover first, then inline. Inline only exist for an Article, and only with
  // a cookie — say so rather than silently importing a post full of holes.
  let media = mediaFrom(tweet);
  const placeholders = headingsForPlaceholders(body);
  const notes = [];

  if (placeholders.length) {
    let inline = images.map((u) => ({ url: u }));
    if (!inline.length && browser) {
      const have = new Set(media.map((m) => mediaKey(m.url)));
      inline = (await xImages.articleImages(url))
        .filter((u) => !have.has(mediaKey(u)))
        .map((u) => ({ url: u }));
    }
    if (inline.length) media = media.concat(inline);
    else {
      notes.push(
        `${placeholders.length} inline image${placeholders.length === 1 ? '' : 's'} left as \`Image\` placeholders: ` +
        `X only serves an Article's body to a logged-in session. Re-run with --browser, ` +
        `or pass --images <url,url,…>.`
      );
    }
  }

  const name = namer(slug);
  const files = [];
  for (const m of media) {
    const heading = m.cover ? slug : placeholders[files.length - (media[0] && media[0].cover ? 1 : 0)];
    const file = `${name(heading)}.${extOf(m.url)}`;
    const rel = `/assets/${slug}/${file}`;
    if (write) await download(m.url, path.join(ASSETS, slug, file));
    files.push({ ...m, file, rel });
  }

  const cover = files.find((f) => f.cover);
  const inlineFiles = files.filter((f) => !f.cover);
  const spliced = spliceImages(body, inlineFiles, title);

  // The cover doubles as the post's opening figure, the way the blog does it.
  const md =
    frontmatter({ title, date, categories, tags, cover: cover ? cover.rel : '', promotion }) +
    (cover ? figure(cover.rel, title) + '\n\n' : '') +
    spliced.body +
    '\n';

  const rel = path.join('_drafts', `${slug}.md`);
  if (write) {
    fs.mkdirSync(DRAFTS, { recursive: true });
    fs.writeFileSync(path.join(ROOT, rel), md);
  }

  if (spliced.used < inlineFiles.length) {
    notes.push(`${inlineFiles.length - spliced.used} downloaded image(s) had no \`Image\` placeholder to land in.`);
  }

  return { path: rel, slug, title, date, isArticle: !!article, files, notes, markdown: md };
}

module.exports = { importPost, statusId, fetchTweet };

// ---------------------------------------------------------------- cli

if (require.main === module) {
  const argv = process.argv.slice(2);
  const opt = (n, d = '') => {
    const i = argv.indexOf(`--${n}`);
    return i === -1 ? d : argv[i + 1];
  };
  const url = argv.find((a) => !a.startsWith('--') && argv[argv.indexOf(a) - 1] !== `--${opt.name}`) || argv[0];
  const textFile = opt('text-file');

  importPost({
    url: opt('url') || url,
    slug: opt('slug'),
    title: opt('title'),
    text: textFile ? fs.readFileSync(textFile, 'utf8') : opt('text'),
    categories: opt('categories') ? opt('categories').split(',').map((s) => s.trim()) : [],
    tags: opt('tags') ? opt('tags').split(',').map((s) => s.trim()) : [],
    images: opt('images') ? opt('images').split(',').map((s) => s.trim()).filter(Boolean) : [],
    browser: argv.includes('--browser'),
    promotion: opt('promotion'),
    write: !argv.includes('--dry-run'),
  })
    .then((r) => {
      console.log(`${argv.includes('--dry-run') ? 'would write' : 'wrote'} ${r.path}`);
      console.log(`  title    ${r.title}`);
      console.log(`  date     ${r.date}  (${r.isArticle ? 'X Article' : 'tweet'})`);
      for (const f of r.files) console.log(`  image    assets/${r.slug}/${f.file}${f.cover ? '  (cover)' : ''}`);
      for (const n of r.notes) console.log(`  ! ${n}`);
    })
    .catch((e) => {
      console.error(String(e.message || e));
      process.exit(1);
    });
}
