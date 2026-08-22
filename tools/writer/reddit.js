'use strict';

// Turn a blog post into a Reddit self-post, and reuse images across subreddits.
//
// The annoying part of cross-posting is never the prose — it is that Reddit
// will not render an image you merely link to. An inline image has to be
// hosted by Reddit, and it gets there by being uploaded through the composer.
//
// The useful consequence: once a post has been made anywhere, its images live
// at permanent `preview.redd.it` URLs that work in *any* subreddit. So the
// second and third crosspost need no uploads at all — pull the URLs off the
// first post and drop them into the new body.
//
//   1. node reddit.js from-post _posts/x.md --subreddit foo   → markdown, image slots empty
//   2. paste it into Reddit once, upload the images by hand, post it
//   3. node reddit.js from-post _posts/x.md --subreddit bar --reuse <url-of-1>
//      → the same markdown with the images already filled in
//
// Stdlib only, like the rest of the writer.

const fs = require('fs');
const path = require('path');
const browser = require('./browser');

const ROOT = process.env.WRITER_ROOT
  ? path.resolve(process.env.WRITER_ROOT)
  : path.resolve(__dirname, '..', '..');

const SITE = 'https://nmn.gl/blog';

// ---------------------------------------------------------------- read a post

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

// ---------------------------------------------------------------- convert

// Reddit's flavour is close to the blog's but not identical:
//   * `##` renders small; the account's existing posts use `#` for sections.
//   * HTML is dropped — a <figure> is not an image on Reddit, it is nothing.
//   * Liquid means nothing here, so `{{ … | relative_url }}` has to go.
//   * A bare image URL on its own line is what Reddit expands inline.
//   * Footnotes have no equivalent, and are dropped along with their markers.
//
// This works line by line rather than paragraph by paragraph. Posts do not
// reliably leave a blank line after a heading or around a <figure>, and a
// paragraph-based pass silently leaves those headings at `##` and spills the
// raw <figure> HTML into the post as text.
//
// `cover` is the frontmatter `image:` path. The blog opens a post with its
// cover figure; Reddit posts don't repeat it (the subreddit shows a thumbnail
// already), and leaving it in shifts every later image into the wrong slot when
// reusing URLs from an earlier crosspost. Skipped unless asked for.
function toReddit({ body, images = [], cover = '', withCover = false }) {
  const out = [];
  let para = [];
  let used = 0;

  const flush = () => {
    if (!para.length) return;
    const text = inline(para.join('\n'));
    if (text) out.push(text);
    para = [];
  };

  for (const line of body.split('\n')) {
    const t = line.trim();

    if (!t || t === '<!--more-->') { flush(); continue; }

    const h = /^(#{1,6})\s+(.*)$/.exec(t);
    if (h) { flush(); out.push(`# ${h[2].trim()}`); continue; }

    if (/^<figure/.test(t) || /^<img/.test(t)) {
      flush();
      if (!withCover && cover && t.includes(cover)) continue;
      out.push(images[used] || `[IMAGE ${used + 1} — upload here]`);
      used += 1;
      const cap = /<figcaption[^>]*>([\s\S]*?)<\/figcaption>/.exec(t);
      if (cap) out.push(stripTags(cap[1]).trim());
      continue;
    }

    // A footnote definition owns its whole line; drop it.
    if (/^\[\^\d+\]:/.test(t)) { flush(); continue; }

    if (/^<\/?[a-z]/i.test(t)) { flush(); continue; }   // any other raw HTML

    para.push(t);
  }
  flush();

  return {
    markdown: out.join('\n\n').trim() + '\n',
    slots: used,
    filled: Math.min(used, images.length),
  };
}

const stripTags = (s) => s.replace(/<[^>]+>/g, '');

function inline(s) {
  return s
    .replace(/\{\{\s*'([^']+)'\s*\|\s*relative_url\s*\}\}/g, `${SITE}$1`)   // liquid → real URL
    .replace(/\{%[^%]*%\}/g, '')                                            // liquid tags
    .replace(/\[\^\d+\]/g, '')                                                // footnote markers
    .trim();
}


// ---------------------------------------------------------------- reddit reads

// Reddit serves JSON at <permalink>.json, but only to something that looks like
// a browser with a session — plain requests get a 403 interstitial.
async function fetchPost(url) {
  const clean = url.split('?')[0].replace(/\/$/, '');
  const session = browser.cookies('%reddit.com', { require: 'reddit_session' });
  if (!session.length) {
    throw new Error('No logged-in Reddit session found in Firefox. Log in there, or pass --images.');
  }
  const text = await browser.visit(`${clean}.json`, {
    session,
    evaluate: 'document.body.innerText',
    settle: 8000,
  });
  let data;
  try { data = JSON.parse(text); } catch {
    throw new Error(`Reddit did not return JSON (likely a bot-check page): ${String(text).slice(0, 120)}`);
  }
  const p = data[0].data.children[0].data;
  return {
    subreddit: p.subreddit,
    title: p.title,
    selftext: p.selftext || '',
    // Order matters and media_metadata is unordered, so take the order the
    // images actually appear in the body.
    images: [...(p.selftext || '').matchAll(/https:\/\/preview\.redd\.it\/[^\s)\]]+/g)]
      .map((m) => m[0].replace(/&amp;/g, '&')),
  };
}

// ---------------------------------------------------------------- compose

// The "draft" is the real composer, opened with everything already in it: you
// review, add flair, and click post yourself. Nothing is ever submitted from
// here.
//
// It has to be **old.reddit.com**. New Reddit ignores ?title=/?text= entirely
// (verified: the fields come up empty), while old Reddit fills both — and its
// composer is markdown-native, which is what we are producing anyway. The post
// itself looks identical on new Reddit once submitted.
function composeUrl({ subreddit, title, markdown }) {
  const q = new URLSearchParams({ title, text: markdown });
  return `https://old.reddit.com/r/${subreddit}/submit?${q}`;
}

async function build({
  postPath, subreddit, title, reuse = '', images = [], withCover = false, root = ROOT,
} = {}) {
  const abs = path.join(root, postPath);
  if (!fs.existsSync(abs)) throw new Error(`No such post: ${postPath}`);
  const { front, body, slug } = parsePost(abs);

  let pool = images;
  let source = images.length ? 'given on the command line' : '';
  if (!pool.length && reuse) {
    const prior = await fetchPost(reuse);
    pool = prior.images;
    source = `reused from r/${prior.subreddit}`;
  }

  const { markdown, slots, filled } = toReddit({
    body, images: pool, cover: front.image || '', withCover,
  });
  const notes = [];
  if (slots > filled) {
    notes.push(`${slots - filled} image slot(s) left as [IMAGE n — upload here]: upload them in the composer, ` +
      `or pass --reuse <url of a Reddit post that already has them>.`);
  }
  if (pool.length > slots) notes.push(`${pool.length - slots} supplied image(s) had nowhere to go.`);

  return {
    subreddit,
    title: title || front.title || slug,
    markdown,
    slots,
    filled,
    source,
    notes,
    postUrl: `${SITE}/${slug}`,
    composeUrl: subreddit ? composeUrl({ subreddit, title: title || front.title || slug, markdown }) : '',
  };
}

// Everything in the composer lives inside nested shadow roots, so a plain
// querySelector finds nothing. This walks through them.
const DEEP = `(sel) => {
  const walk = (root, acc) => {
    for (const el of root.querySelectorAll('*')) { acc.push(el); if (el.shadowRoot) walk(el.shadowRoot, acc); }
    return acc;
  };
  return walk(document, []).filter(sel);
}`;

// Fill the new composer and hand the window over. Nothing is submitted: the
// user reviews, sets flair, and clicks Post themselves.
//
// The new composer already opens in markdown mode for this account (its toggle
// offers to switch *to* rich text), which is what we want — the body we
// generate is markdown, and pasting it in keeps every heading and image line.
async function compose({ subreddit, title, markdown, settle = 15000 }) {
  const session = browser.cookies('%reddit.com', { require: 'reddit_session' });
  if (!session.length) throw new Error('No logged-in Reddit session found in Firefox.');

  const url = `https://www.reddit.com/r/${subreddit}/submit?type=TEXT`;
  const page = await browser.open(url, { session, settle, visible: true });

  const focus = async (what) => page.evaluate(
    `(() => { const deep = ${DEEP};
      const el = deep(${what})[0];
      if (!el) return false;
      el.focus(); el.click(); el.focus();
      return true; })()`
  );

  const okTitle = await focus(`e => e.tagName === 'TEXTAREA' && e.name === 'title'`);
  if (!okTitle) { page.detach(); throw new Error('Could not find the title field — the composer may have changed.'); }
  await page.type(title);

  const okBody = await focus(
    `e => e.tagName === 'TEXTAREA' && e.closest && e.getRootNode().host
          && e.getRootNode().host.tagName === 'SHREDDIT-MARKDOWN-COMPOSER'`
  );
  if (!okBody) { page.detach(); throw new Error('Could not find the markdown body field — is the composer in rich-text mode?'); }
  await page.type(markdown);

  const check = await page.evaluate(
    `(() => { const deep = ${DEEP};
      const t = deep(e => e.tagName === 'TEXTAREA' && e.name === 'title')[0];
      const b = deep(e => e.tagName === 'TEXTAREA' && e.getRootNode().host
                && e.getRootNode().host.tagName === 'SHREDDIT-MARKDOWN-COMPOSER')[0];
      return JSON.stringify({ title: (t && t.value || '').length, body: (b && b.value || '').length }); })()`
  );
  page.detach();
  return JSON.parse(check);
}

module.exports = { build, toReddit, fetchPost, parsePost, composeUrl, compose };

// ---------------------------------------------------------------- cli

if (require.main === module) {
  const argv = process.argv.slice(2);
  const cmd = argv[0];
  const opt = (n, d = '') => {
    const i = argv.indexOf(`--${n}`);
    return i === -1 ? d : argv[i + 1];
  };

  const usage = () => {
    console.error(`usage:
  node reddit.js from-post <_posts/file.md> --subreddit <name> [--title "…"]
                 [--reuse <reddit-post-url>] [--images url,url,…] [--with-cover]
                 [--out file.md] [--open]
  node reddit.js from-reddit <reddit-post-url>        # dump an existing post + its image URLs

  --open opens the real Reddit composer, filled in, and leaves it for you to
  review and post. Nothing is ever submitted by this tool.`);
    process.exit(1);
  };

  if (cmd === 'from-reddit') {
    const url = argv[1];
    if (!url) usage();
    fetchPost(url)
      .then((p) => {
        console.error(`r/${p.subreddit} — ${p.title}`);
        console.error(`${p.images.length} image(s):`);
        p.images.forEach((u) => console.error('  ' + u.split('?')[0]));
        console.log(p.selftext);
      })
      .catch((e) => { console.error(String(e.message || e)); process.exit(1); });
  } else if (cmd === 'from-post') {
    const postPath = argv[1];
    if (!postPath) usage();
    build({
      postPath,
      subreddit: opt('subreddit'),
      title: opt('title'),
      reuse: opt('reuse'),
      images: opt('images') ? opt('images').split(',').map((s) => s.trim()).filter(Boolean) : [],
      withCover: argv.includes('--with-cover'),
    })
      .then((r) => {
        const out = opt('out');
        if (out) fs.writeFileSync(out, r.markdown);
        else console.log(r.markdown);

        console.error(`\n— r/${r.subreddit || '?'} — ${r.title}`);
        console.error(`  images   ${r.filled}/${r.slots}${r.source ? ' (' + r.source + ')' : ''}`);
        if (out) console.error(`  written  ${out}`);
        for (const n of r.notes) console.error(`  ! ${n}`);
        if (argv.includes('--open')) {
          if (!r.subreddit) { console.error('  ! --open needs --subreddit'); return; }
          return compose({ subreddit: r.subreddit, title: r.title, markdown: r.markdown })
            .then((f) => {
              console.error(`\n  composer open at r/${r.subreddit} — title ${f.title} chars, body ${f.body} chars`);
              console.error('  review it, set a flair, and post it yourself. Nothing was submitted.');
            });
        }
        if (r.composeUrl) {
          console.error(`\n  old-Reddit composer, prefilled (nothing is posted until you click):`);
          console.error(`  ${r.composeUrl}`);
        }
      })
      .catch((e) => { console.error(String(e.message || e)); process.exit(1); });
  } else usage();
}
