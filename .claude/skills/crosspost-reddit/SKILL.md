---
name: crosspost-reddit
description: Turn a blog post into a Reddit self-post and open it in Reddit's composer, reusing images from an earlier crosspost. Use when asked to post to a subreddit or crosspost an article to Reddit.
user-invocable: true
---

# /crosspost-reddit

```sh
# read an existing post (and harvest its image URLs)
node tools/writer/reddit.js from-reddit <reddit-post-url>

# build the markdown for a new subreddit
node tools/writer/reddit.js from-post _posts/<file>.md --subreddit <name> \
  [--title "…"] [--reuse <reddit-post-url>] [--images url,url] \
  [--with-cover] [--out file.md] [--open]
```

`--open` fills Reddit's real composer and hands you the window. **Nothing is
ever submitted** — you review, set flair, and click Post or Save Draft.

## Images are the whole problem

Reddit will not render an image you merely link to from elsewhere. An inline
image has to be hosted by Reddit, which happens when it is uploaded through the
composer.

The useful consequence: **once a post exists anywhere, its images live at
permanent `preview.redd.it` URLs.** So the first crosspost costs you a manual
upload and every one after that is free:

1. `from-post … --subreddit first` → markdown with `[IMAGE n — upload here]` slots
2. paste it in, upload the images by hand, post
3. `from-post … --subreddit second --reuse <url-from-2>` → images already filled

`from-reddit` on its own prints an existing post plus its image URLs in
document order, which is what `--reuse` consumes.

**Still unverified:** whether a `preview.redd.it` URL carried into a *new* post
gets rendered inline, or shows as a bare link. Reddit builds `media_metadata`
at upload time and it is not certain it does so for a reused URL. Check the
first crosspost after posting; if the images come through as links, upload them
in the composer instead (the toolbar's image button) and the prose is still
done for you.

## The cover image

The blog opens every post with its frontmatter `image:` as a figure. Reddit
posts don't repeat it, so it is **skipped by default** — `--with-cover` keeps
it. This matters more than it looks: leaving it in adds a slot, and every
reused image then lands one position early, silently. Always check that each
image sits under the prose that describes it.

## Formatting differences

- The blog's `##` becomes Reddit's `#` (that is what the account's existing
  Reddit posts use; `##` renders small there).
- HTML is dropped — a `<figure>` is not an image on Reddit, it is nothing. The
  figure becomes a bare image URL on its own line, its `<figcaption>` the
  paragraph under it.
- Liquid is meaningless: `{{ '/assets/…' | relative_url }}` is expanded to the
  full `https://nmn.gl/blog/…` URL, and `{% … %}` tags are stripped.
- Footnotes have no Reddit equivalent and are removed.

## Composer notes

- **New Reddit ignores `?title=`/`?text=`** — verified, the fields come up
  empty. Only `old.reddit.com/r/<sub>/submit?title=…&text=…` prefills by URL,
  which is what `composeUrl()` returns as a fallback.
- `--open` therefore drives the new composer directly: Chrome with the user's
  Reddit session, fields filled via real keystrokes. It already opens in
  **Markdown Editor** mode (its toggle offers to switch *to* rich text).
- Every field is inside nested shadow roots — a plain `querySelector` finds
  nothing. Walk `shadowRoot` recursively.
- The composer has Reddit's own **Save Draft** button. That is the real draft:
  point the user at it rather than inventing a draft mechanism.
- `--headless=new` is blocked by Reddit ("blocked by network security"). Use a
  real window; off-screen is fine for reads.

## Read the subreddit's rules first

They are in the composer's sidebar — read them and tell the user what applies
**before** they post, not after a removal. Recurring traps for these posts:

- **Self-promotion rules.** A post carrying a product link often has to go in a
  weekly thread instead, or is banned outright.
- **Flair may be required** (the composer marks it with a red asterisk).
- Rules like "no AI slop" or "project posts must be educational" shape whether
  the piece fits at all.

Tailor the title and opening to the subreddit rather than reusing the blog's —
the existing r/vibecoding post opens by addressing vibe coders directly, which
the blog version does not.

Related: [publish-post](../publish-post/SKILL.md), [syndicate-kit](../syndicate-kit/SKILL.md).
