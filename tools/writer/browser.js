'use strict';

// Borrow a logged-in browser session and drive a real Chrome over CDP.
//
// Some sites only exist for a logged-in user and have no API that will hand
// over what the page shows. This is the honest fallback: use the session the
// user already has, in a real browser, and read what a reader would see.
//
// Two things learned the hard way:
//
//   * Firefox stores cookies in plain sqlite; Chrome encrypts the values
//     against a Keychain key. So Firefox is the profile we can read without
//     prompting — even when the site is also open in Chrome.
//   * `--headless=new` is detectable, and Reddit (among others) serves a
//     "blocked by network security" page to it. A real window positioned
//     off-screen passes where headless does not, so that is the default.
//
// Nothing is persisted: the profile is a temp dir removed on exit and the
// cookies stay in memory, never on disk or in argv.
//
// Stdlib only — Node's global WebSocket speaks CDP directly.

const { execFileSync, spawn } = require('child_process');
const fs = require('fs');
const http = require('http');
const os = require('os');
const path = require('path');

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// ---------------------------------------------------------------- cookies

// `domain` is a sqlite LIKE pattern, e.g. '%reddit.com'. `require` names a
// cookie that must be present for the profile to count as logged in — without
// it any profile that has merely *visited* the site would look like a session.
function cookies(domain, { require: required = null } = {}) {
  const base = path.join(os.homedir(), 'Library/Application Support/Firefox/Profiles');
  if (!fs.existsSync(base)) return [];
  for (const dir of fs.readdirSync(base)) {
    const db = path.join(base, dir, 'cookies.sqlite');
    if (!fs.existsSync(db)) continue;
    // The live db is locked while Firefox runs, so work on a copy.
    const tmp = path.join(os.tmpdir(), `cookies-${process.pid}-${dir}.sqlite`);
    try {
      fs.copyFileSync(db, tmp);
      const out = execFileSync('sqlite3', ['-json', tmp,
        `select name, value, host as domain, path, isSecure, isHttpOnly
           from moz_cookies where host like '${domain.replace(/'/g, '')}'`,
      ], { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });
      const rows = JSON.parse(out || '[]').map((r) => ({
        name: r.name, value: r.value, domain: r.domain, path: r.path || '/',
        secure: !!r.isSecure, httpOnly: !!r.isHttpOnly,
      }));
      if (!rows.length) continue;
      if (required && !rows.some((r) => r.name === required)) continue;
      return rows;
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
      r.on('end', () => { try { res(JSON.parse(d)); } catch { rej(new Error(d.slice(0, 200))); } });
    });
    req.on('error', rej);
    req.end();
  });
}

// Open `url` with `session` cookies installed and hand back a live handle:
// `send` speaks CDP, `evaluate` runs an expression, `type` types into whatever
// is focused, and `close` tears the browser down. `detach` walks away and
// leaves the window on screen — which is the point when a human is meant to
// finish the job by hand.
async function open(url, { session = [], settle = 9000, visible = false, port = 9300 + (process.pid % 400) } = {}) {
  if (!fs.existsSync(CHROME)) throw new Error(`Chrome not found at ${CHROME}`);
  const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'writer-browser-'));
  const args = [
    `--user-data-dir=${profile}`, `--remote-debugging-port=${port}`,
    '--no-first-run', '--no-default-browser-check', '--disable-extensions', '--mute-audio',
  ];
  if (visible) args.push('--window-size=1400,1000', '--window-position=60,60');
  else args.push('--window-position=-3000,-3000', '--window-size=1200,900');

  const chrome = spawn(CHROME, args, { stdio: 'ignore', detached: visible });

  let up = false;
  for (let i = 0; i < 40 && !up; i++) {
    try { await cdpHttp(port, '/json/version'); up = true; } catch { await sleep(300); }
  }
  if (!up) throw new Error('Chrome never came up on the debugging port');

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
  if (session.length) {
    await send('Network.setCookies', { cookies: session });
    await send('Page.navigate', { url });
  }
  await sleep(settle);

  const evaluate = async (expression) => {
    const r = await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
    if (r.exceptionDetails) throw new Error(`page threw: ${r.exceptionDetails.text}`);
    return r.result.value;
  };
  // Real keystrokes, so component frameworks see the same events a person makes.
  const type = (text) => send('Input.insertText', { text });

  return {
    send, evaluate, type, profile,
    async close() {
      try { ws.close(); } catch {}
      try { chrome.kill(); } catch {}
      await sleep(1200);
      try { fs.rmSync(profile, { recursive: true, force: true, maxRetries: 5, retryDelay: 300 }); } catch {}
    },
    // Leave the window up for the user. The temp profile stays until they quit
    // it; that is the price of handing over a live browser.
    detach() { try { ws.close(); } catch {}; chrome.unref(); },
  };
}

// Open `url` with `session` cookies installed, then run `evaluate` in the page
// and return its value. `evaluate` is a JS expression string; if it evaluates
// to a promise it is awaited.
async function visit(url, {
  session = [], evaluate = 'document.body.innerText',
  settle = 9000, scrolls = 0, headless = false, port = 9300 + (process.pid % 400),
} = {}) {
  if (!fs.existsSync(CHROME)) throw new Error(`Chrome not found at ${CHROME}`);
  const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'writer-browser-'));
  const args = [
    `--user-data-dir=${profile}`, `--remote-debugging-port=${port}`,
    '--no-first-run', '--no-default-browser-check', '--disable-extensions', '--mute-audio',
  ];
  // Off-screen rather than headless: see the note at the top of this file.
  if (headless) args.push('--headless=new');
  else args.push('--window-position=-3000,-3000', '--window-size=1200,900');

  const chrome = spawn(CHROME, args, { stdio: 'ignore' });
  const cleanup = async () => {
    try { chrome.kill(); } catch {}
    await sleep(1500);
    try { fs.rmSync(profile, { recursive: true, force: true, maxRetries: 5, retryDelay: 300 }); } catch {}
  };

  try {
    let up = false;
    for (let i = 0; i < 40 && !up; i++) {
      try { await cdpHttp(port, '/json/version'); up = true; } catch { await sleep(300); }
    }
    if (!up) throw new Error('Chrome never came up on the debugging port');

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
    if (session.length) {
      await send('Network.setCookies', { cookies: session });
      await send('Page.navigate', { url });   // reload now that we are somebody
    }
    await sleep(settle);
    for (let i = 0; i < scrolls; i++) {
      await send('Runtime.evaluate', { expression: 'window.scrollBy(0, window.innerHeight * 0.8)' });
      await sleep(900);
    }
    if (scrolls) await sleep(2000);

    const r = await send('Runtime.evaluate', { expression: evaluate, returnByValue: true, awaitPromise: true });
    ws.close();
    if (r.exceptionDetails) throw new Error(`page threw: ${r.exceptionDetails.text}`);
    return r.result.value;
  } finally {
    await cleanup();
  }
}

module.exports = { cookies, visit, open, CHROME };
