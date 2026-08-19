---
name: syndicate-kit
description: Syndicate a published post to Kit (ConvertKit) as a broadcast draft. Use when asked to email a post to the newsletter list or create a Kit broadcast.
user-invocable: true
---

# /syndicate-kit

Create a Kit broadcast from a post in `_posts/`.

```sh
node tools/writer/kit.js _posts/<file>.md \
  --subject "…" [--preview "…"] [--blurb "…"] [--ask "…"] [--from addr] [--full]
```

## The broadcast is never sent

The tool sets no `send_at`, so Kit holds it as a draft for the user to review
and send at <https://app.kit.com/broadcasts>.

**Keep it that way.** Do not add `send_at`, and do not call the Kit API to send,
schedule, or publish a broadcast unless the user asks for that in so many words
— it mails thousands of people and cannot be recalled. Creating the draft is the
whole job; sending is theirs.

After creating, read the broadcast back and confirm `status: draft` and
`send_at: null` before telling the user it is done.

## Publish the post first

The email links to `https://nmn.gl/blog/<slug>` and its thumbnail points at
`https://nmn.gl/assets/…`. Both 404 until the post is committed and pushed, so
run [publish-post](../publish-post/SKILL.md) first. This matters more with
`--full`, where every inlined image is an absolute nmn.gl URL.

## House style

Read off every previous broadcast on the account — match it rather than
inventing a format:

- Subjects are lowercase and curiosity-driven: *"AI is killing SaaS"*,
  *"why traditional BI is dead (& what replaces it)"*,
  *"unlock $200+ from your $20 Cursor subscription"*.
- The body is a **short letter that teases the piece and links to it**, not a
  copy of the article. The post is where the images and the CTA live; the
  email's job is to get people there. `--full` inlines the whole body instead —
  only on request.
- Opens `Hey,`, closes `Keep shipping,` / `Namanyay`.
- Template "N Text" (`4173676`), flat `<p class="">` paragraphs in a table
  wrapper. Kit round-trips only `p`, `strong`, `em`, `a.ck-link` cleanly.

The default teaser is built from the paragraphs above the post's `<!--more-->`
cut, which is exactly the hook the post leads with. **Show the user the rendered
content before creating the broadcast** — `kit.teaser(...)` can be called
directly for a preview.

The two lines the tool supplies itself stay deliberately topic-neutral
(*"I wrote the whole thing up here:"*, *"What do you think? Hit reply"*), because
the letter is assembled from whatever post you point it at. Write something
better for the piece and pass it:

- `--blurb` — the sentence introducing the link.
- `--ask` — the question that invites replies.

Never edit those defaults to suit one post; that is how a reusable tool quietly
becomes a single-use one. Pass the copy in instead.

## API notes

- Auth is `X-Kit-Api-Key`, key in `tools/writer/.env` (gitignored — this repo is
  public). Never print it or commit it.
- On create, `subscriber_filter` accepts only `segment` or `tag` filters.
  Omitting it entirely is what sends to the whole list, which then reads back as
  `all_subscribers`. Passing `all_subscribers` is a 422.
- Re-running for the same post **updates** the existing broadcast rather than
  creating a duplicate; the mapping lives in `tools/writer/.kit.json`
  (gitignored, per-machine bookkeeping).
- Sending addresses on the account: `mail@namanyayg.com` (default),
  `hello@gigamind.dev`, `n@usegigamind.com`.

## Not the same as `prevent_syndication`

That frontmatter flag only controls whether a post appears in `feed.xml`. It has
nothing to do with Kit. Don't set one expecting the other.

Related: [publish-post](../publish-post/SKILL.md), [import-x-post](../import-x-post/SKILL.md).
