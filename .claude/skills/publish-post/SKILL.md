---
name: publish-post
description: Publish a draft to the live blog — move it from _drafts/ to _posts/, verify the build, commit and push. Use when asked to publish, ship, or deploy a post.
user-invocable: true
---

# /publish-post

Move a draft into `_posts/` and put it on nmn.gl.

GitHub Pages builds `master`, so **the push is the deploy** — there is no CI, no
build step and no `package.json` in this repo. Once it is pushed it is live.

## Steps

1. **Move** — `_drafts/<slug>.md` → `_posts/<YYYY-MM-DD>-<slug>.md`, using the
   frontmatter `date`. Some posts deliberately carry a filename date that
   differs from `date:`; if one already exists, leave it alone.
2. **Build** — `bundle exec jekyll build` (no `--drafts`; the post must render
   as a real post now). Must be green, and `_site/<slug>.html` must exist.
   Permalink is `/:title`, baseurl `/blog`, so the live URL is
   `https://nmn.gl/blog/<slug>`.
3. **Look at it** — preview at `http://localhost:4000/blog/<slug>` and confirm
   the images actually render. Take the screenshot; don't infer from a green
   build. Note the `/blog` baseurl — without it every URL 404s.
4. **Commit** — stage `_posts/` and `assets/` only. `_drafts/` is gitignored
   and never leaves the machine.
5. **Push** — see below.

## Confirm before pushing

Moving into `_posts/` and committing are local and reversible. Pushing is not:
it publishes to a public site that gets syndicated and indexed.

Treat "move it to posts" as authorising steps 1–4. **Get explicit confirmation
before step 5** unless the user clearly asked to put it live — "publish it",
"ship it", "push it". When in doubt, stop with the commit made and say it is
staged and ready, rather than pushing and hoping.

If already on `master`, that is the deploy branch — commit there is normal for
this repo; don't branch.

## Before it goes out

Read the post once as a reader, and raise anything that reads wrong for a public
audience before pushing rather than after:

- **Dated claims.** "free for this week", "launching today" — fine in a tweet,
  wrong in an evergreen post. Ask whether it should be a standing offer.
- **Audience mismatch.** A piece adapted from somewhere private (Bookface, a
  Slack, an internal memo) may carry in-group wording or links that make no
  sense publicly, or reveal more than the user meant to.
- **Broken or private links**, and the excerpt cut — everything above
  `<!--more-->` is the front-page teaser, so it should stand alone.

Flag, then proceed. The call is theirs.

## Afterwards

The post is live but the newsletter has not gone out. Offer
[syndicate-kit](../syndicate-kit/SKILL.md) — it needs the post pushed first,
because the email links to `nmn.gl` and its thumbnail is an absolute URL.

Related: [import-x-post](../import-x-post/SKILL.md).
