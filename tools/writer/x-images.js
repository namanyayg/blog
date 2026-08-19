'use strict';

// List the images of an X post or Article, in document order.
//
// X serves an Article's body only to a logged-in session, and only as a SPA —
// there is no server-rendered HTML to scrape and no API that returns Article
// media (v2 has no Articles endpoint; the syndication endpoint gives the cover
// and nothing else). So the one honest way to see what the reader sees is to
// let a browser render it.
//
// This borrows the X session cookies from whichever browser on this machine is
// actually logged in, injects them into a headless Chrome, and reads the URLs
// off the rendered page. Nothing is written down: the cookies live in argv-free
// memory and the throwaway profile is deleted on exit.
//
// Stdlib only — Node 24's global WebSocket speaks CDP directly.

const { execFileSync, spawn } = require('child_process');
const fs = require('fs');
const http = require('http');
const os = require('os');
const path = require('path');

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// ---------------------------------------------------------------- cookies

// Firefox keeps cookies in plain sqlite; Chrome encrypts the values with a
// Keychain key, so Firefox is the one we can read without prompting. Copy the
// db first — the live one is locked while the browser runs.
function firefoxCookies(domainLike = ['%x.com', '%twitter.com']) {
  const base = path.join(os.homedir(), 'Library/Application Support/Firefox/Profiles');
  if (!fs.existsSync(base)) return [];
  for (const dir of fs.readdirSync(base)) {
    const db = path.join(base, dir, 'cookies.sqlite');
    if (!fs.existsSync(db)) continue;
    const tmp = path.join(os.tmpdir(), `cookies-${process.pid}.sqlite`);
    try {
      fs.copyFileSync(db, tmp);
      const where = domainLike.map((d) => `host like '${d}'`).join(' or ');
      const out = execFileSync('sqlite3', ['-json', tmp,
        `select name, value, host as domain, path, isSecure, isHttpOnly from moz_cookies where ${where}`,
      ], { encoding: 'utf8', maxBuffer: 32 * 1024 * 1024 });
      const rows = JSON.parse(out || '[]').map((r) => ({
        name: r.name, value: r.value, domain: r.domain, path: r.path || '/',
        secure: !!r.isSecure, httpOnly: !!r.isHttpOnly,
      }));
      // Only a profile that actually holds a session is useful.
      if (rows.some((r) => r.name === 'auth_token')) return rows;
    } catch { /* try the next profile */ } finally {
      fs.rmSync(tmp, { force: true });
    }
  }
  return [];
}

// ---------------------------------------------------------------- cdp

function cdpHttp(port, p, method = 'GET') {
  return new Promise((res, rej) => {
    const req = http.request({ host: '127.0.0.1', port, path: p, method }, (r) => {
      let d = '';
      r.on('data', (c) => (d += c));
      r.on('end', () => { try { res(JSON.parse(d)); } catch (e) { rej(new Error(d.slice(0, 200))); } });
    });
    req.on('error', rej);
    req.end();
  });
}

async function waitForPort(port, tries = 40) {
  for (let i = 0; i < tries; i++) {
    try { return await cdpHttp(port, '/json/version'); } catch { await sleep(300); }
  }
  throw new Error('headless Chrome never came up');
}

async function images(url, { cookies = [], settle = 9000, scrolls = 12 } = {}) {
  if (!fs.existsSync(CHROME)) throw new Error(`Chrome not found at ${CHROME}`);
  const port = 9300 + (process.pid % 400);
  const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'x-images-'));
  const chrome = spawn(CHROME, [
    `--user-data-dir=${profile}`, `--remote-debugging-port=${port}`,
    '--headless=new', '--no-first-run', '--no-default-browser-check',
    '--disable-extensions', '--mute-audio',
  ], { stdio: 'ignore' });

  // Chrome writes to its profile on the way out, so give it a moment before
  // removing the directory — and never let tidying up fail the import.
  const cleanup = async () => {
    try { chrome.kill(); } catch {}
    await sleep(1500);
    try { fs.rmSync(profile, { recursive: true, force: true, maxRetries: 5, retryDelay: 300 }); } catch {}
  };

  try {
    await waitForPort(port);
    const tab = await cdpHttp(port, '/json/new?' + encodeURIComponent(url), 'PUT');
    const ws = new WebSocket(tab.webSocketDebuggerUrl);
    let id = 0;
    const pending = new Map();
    const send = (method, params = {}) => new Promise((res) => {
      const n = ++id;
      pending.set(n, res);
      ws.send(JSON.stringify({ id: n, method, params }));
    });
    ws.addEventListener('message', (e) => {
      const m = JSON.parse(e.data);
      if (m.id && pending.has(m.id)) { pending.get(m.id)(m.result); pending.delete(m.id); }
    });
    await new Promise((r) => ws.addEventListener('open', r));

    await send('Page.enable');
    await send('Network.enable');
    if (cookies.length) {
      await send('Network.setCookies', { cookies });
      await send('Page.navigate', { url });   // reload now that we are somebody
    }
    await sleep(settle);

    // Articles lazy-load their figures; walk the whole page before reading.
    for (let i = 0; i < scrolls; i++) {
      await send('Runtime.evaluate', { expression: 'window.scrollBy(0, window.innerHeight * 0.8)' });
      await sleep(900);
    }
    await sleep(2500);

    const r = await send('Runtime.evaluate', {
      returnByValue: true,
      expression: `JSON.stringify({
        url: location.href,
        title: document.title,
        loggedOut: /doesn.t exist|Log in|Sign up/i.test(document.body.innerText.slice(0, 200)),
        imgs: [...document.querySelectorAll('img')]
          .map(i => ({ src: i.currentSrc || i.src, w: i.naturalWidth, h: i.naturalHeight }))
          .filter(i => /pbs\\.twimg\\.com\\/media\\//.test(i.src) && i.w > 200)
      })`,
    });
    ws.close();
    return JSON.parse(r.result.value);
  } finally {
    await cleanup();
  }
}

// pbs.twimg.com hands back a scaled copy unless you ask for the upload.
function orig(src) {
  const u = new URL(src);
  u.searchParams.set('name', 'orig');
  return u.href;
}

async function articleImages(url) {
  const cookies = firefoxCookies();
  if (!cookies.length) {
    throw new Error(
      'No logged-in X session found. Log in to x.com in Firefox (its cookie store is\n' +
      'readable without a Keychain prompt), or pass the image URLs to import.js --images.'
    );
  }
  const page = await images(url, { cookies });
  if (page.loggedOut) throw new Error(`X served a logged-out page for ${url} — the session may have expired.`);
  return page.imgs.map((i) => orig(i.src));
}

module.exports = { articleImages, images, firefoxCookies, orig };

if (require.main === module) {
  const url = process.argv[2];
  if (!url) {
    console.error('usage: node x-images.js <x-post-or-article-url>');
    process.exit(1);
  }
  articleImages(url)
    .then((urls) => urls.forEach((u) => console.log(u)))
    .catch((e) => { console.error(String(e.message || e)); process.exit(1); });
}
