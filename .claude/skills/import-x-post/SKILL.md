---
name: import-x-post
description: Import a post or Article from X (twitter) into _drafts/ with its images, frontmatter and figures. Use when given an x.com status URL to turn into a blog post.
user-invocable: true
---

# /import-x-post

Turn an x.com post into a draft in `_drafts/`, with the images downloaded into
`assets/<slug>/` and spliced into the body as real `<figure>` blocks.

```sh
node tools/writer/import.js <x-url> \
  --slug <slug> \
  --title "…" \
  --categories "startups,saas" \
  --tags "a,b,c" \
  --promotion giga-catalyst \
  [--text-file body.md] [--browser] [--images url,url] [--dry-run]
```

Always `--dry-run` first and show the user what it would write.

## Plain tweet vs Article

Check which one you have before promising anything — they behave differently:

| | plain tweet | X Article |
|---|---|---|
| body text | fetched automatically | **you must supply it** (`--text-file`) |
| images | fetched automatically | need `--browser` |

The public syndication endpoint (`cdn.syndication.twimg.com/tweet-result?id=…`)
gives title, real publish date, cover image, and a plain tweet's photos. For an
Article it gives the cover and a truncated `preview_text` and nothing else.

## Getting an Article's body

X serves an Article's body only to a logged-in session. There is no API for it:

- **X API v2 has no Articles endpoint** — a valid token does not help. Don't
  burn time re-authing `~/.hermes/.env` hoping it will.
- Firecrawl refuses x.com; bot user-agents get a 404.
- If the piece was also posted to Bookface, `yc tools run search --input
  '{"entity":"forum","ids":"<post_id>","extra_fields":"url"}'` returns the full
  body — useful for **verifying wording**, but it replaces every image with the
  literal string `uploaded image`, and the CLI's token is scoped `search:read`
  so `/posts/<id>.json` 401s.

So: ask the user to paste the body, save it to a file, pass `--text-file`.

## Image placeholders

X's copy-to-clipboard leaves a bare `Image` line where each inline image was.
The importer replaces those, in order, with figures. Keep those lines in the
pasted text — they are the positions. Bookface uses `uploaded image` for the
same thing; normalise it to `Image` before importing.

Sanity-check that the number of `Image` lines matches the number of images
fetched. The importer warns when they don't line up, and leaves unmatched
placeholders in place rather than guessing.

## `--browser`

Pulls inline Article images via `tools/writer/x-images.js`: it borrows the X
session cookies from Firefox (plain sqlite, no Keychain prompt), injects them
into a throwaway headless Chrome, scrolls the article to force lazy-loading and
reads the URLs off the DOM at `name=orig`. The profile is deleted on exit and
cookies never touch disk.

It needs a browser that is actually **logged in to x.com**. Check before
assuming — `auth_token` is the cookie that matters, and it may live in a
different browser than you expect. `node tools/writer/x-images.js <url>` prints
the URLs on their own if you want to look first.

If no session exists, pass the URLs directly with `--images`.

## Verify before reporting done

1. `bundle exec jekyll build --drafts` — must be green.
2. **Look at the images.** Read the downloaded files and confirm each one is in
   the slot its surrounding prose describes. Order from the page is usually
   right, but "usually" is not "checked".
3. Preview at `http://localhost:4000/blog/<slug>` — note the `/blog` baseurl;
   without it every URL 404s and looks like a broken build.

Pasted text is often garbled (mangled words, dropped spaces). Repair what is
clearly corrupt, and **tell the user every word you changed** so they can
confirm your guesses.

## Conventions

Set by the blog, not by you — match them:

- `image` + `twitter_image` + `twitter_card: summary_large_image` for the cover,
  which also becomes the post's opening figure.
- `<figure><img src="{{ '/assets/…' | relative_url }}" alt="…"></figure>`
- Files named after the section heading they sit under, `-2`/`-3` on repeats —
  the same naming the writer app uses for pasted images.
- Modern posts use `categories` (`ai`, `startups`, `saas`); `tags` is legacy
  from the 2012 WordPress import, where everything is tagged `Other`.
- Always em/rem, never px (see CLAUDE.md).

Related: [publish-post](../publish-post/SKILL.md), [syndicate-kit](../syndicate-kit/SKILL.md).
