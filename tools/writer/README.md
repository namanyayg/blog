# Writer

A small local writing app for this blog. No dependencies, no build step.

```sh
node tools/writer/server.js      # → http://localhost:4321
```

It reads and writes `_drafts/` and `_posts/` directly — the files on disk stay the
source of truth, so git, Jekyll and your editor all keep working as before.

## What it does

- **Sidebar** — every draft and post, newest first. `⌘K` to search titles/categories.
- **Editor** — title + body in New York (Apple's serif), one column, no chrome.
- **Details panel** (`⌘I`) — slug, date, layout, categories, tags, header image,
  promotion type, excerpt cut, permalink. Anything else already in a post's
  frontmatter (`guid`, `blogger_*`, commented-out blocks…) is preserved verbatim
  in the *Advanced → Other frontmatter* box.
- **Save** (`⌘S`) writes the file where it already lives — a draft stays a draft,
  a post stays a post. It's the only button you need while writing.
- **Publish…** is the single "put it on nmn.gl" action: it moves a draft into
  `_posts/` if needed, commits, and pushes. The panel spells out each step
  before you confirm. The reverse lives in *Details ▸ Advanced ▸ Move back to
  drafts*.
- The **pill** tells you where the file actually stands: `draft`,
  `not live yet` (in `_posts/` but uncommitted or unpushed), or `live`
  (deployed). Sitting in `_posts/` is not the same as being on the internet.
- Saving never renames a file unless you changed the slug or the date yourself,
  so a filename whose date deliberately differs from the frontmatter `date:`
  stays put.
- The **draft / published pill** in the top-left is the two-way switch: click it
  to publish a draft, or to move a post back to `_drafts/`.
- Where you were — which post, how far down, the search box, the Details panel —
  comes back on reload.
- **New draft** — `⌘N`. The slug follows the title until you edit it yourself.

## The editor

It shows the markdown formatted *and* raw at the same time: headings get real
heading type, bold/italic/code/links/quotes/footnotes are styled — but every
syntax marker stays in the text, just dimmed. What you edit is byte-for-byte
what lands in the `.md` file; the formatting is only paint.

Lists continue on Enter (and an empty bullet ends the list). `⌘Z` / `⇧⌘Z` undo
and redo. Pasted text always arrives as plain text.

`--` stays `--`. macOS smart-dash substitution is detected and undone as it
happens, in the title as well as the body; an em dash you type yourself is left
alone. Smart quotes are not touched — turn those off in Chrome under
*Edit ▸ Substitutions* if you don't want them.

## Images and video

Paste a screenshot or an mp4 straight into the body, or drag a file onto the
window. It is written to `assets/<post-slug>/<name>.<ext>` and the matching
snippet is inserted at the cursor:

```html
<figure><img src="{{ '/assets/my-post/my-post.png' | relative_url }}" alt="…" class="img-medium"></figure>
<figure><video src="{{ '/assets/my-post/demo.mp4' | relative_url }}" class="img-medium" style="display: block; margin: 0 auto;" controls muted loop playsinline></video></figure>
```

The preview renders underneath the line — the actual image, or a playable video
with controls — so you can see what you pasted while the source stays visible.
Previews are painted into reserved space, never inserted into the text.

### Naming

A pasted file is named after the section it lands in — paste under
`## Making Something` and you get `making-something.png`, then
`making-something-2.png`. With no heading above it, the post title is used.
Dragged files keep their own name, slugified.

The moment a file lands, a **name box** opens prefilled and selected: type a
better name and press `↩`, or `esc` to keep the suggestion. To rename later,
hover any preview and click the **Rename file** chip (or click the preview
itself). Renaming moves
the file on disk and rewrites every reference in the open post; if another post
also references it, you get a warning listing which ones before anything moves.

`alt` defaults to the post title — worth editing. Supported: png, jpg, gif,
webp, avif, svg, heic, mp4, webm, mov, m4v.

## Footnotes

`⌘⇧F` (or the *Footnote* button) inserts `[^n]` at the cursor, appends
`[^n]: ` at the bottom of the post, and puts you there to write the note.
`Esc` — or `⌘⇧F` again — jumps back to exactly where you left off. Clicking any
`[^n]` in the prose jumps to its definition. Numbering picks the next free
number automatically.

## Preview and deploy

**Preview** runs Jekyll's own unpublished-content mode:

```sh
bundle exec jekyll serve --drafts --unpublished
```

on port 4000, and opens the current post or draft at its real URL. That is the
only way to see a draft rendered — drafts have no URL on the live site, and
`_drafts/` is gitignored, so they never leave this machine. To share a piece,
publish it and deploy. If the build fails, the reason is shown instead of the
button spinning.

**Deploy** stages `_posts/` and `assets/` only, commits with the message you
type, and pushes. GitHub Pages builds `master`, so a push *is* the deploy —
there is no build step and no `package.json` in this repo. The panel lists
exactly what will be committed and what is being left out.

## Sharing for feedback (Notion)

**Share** sends the post to a Notion board so people can read it and comment.
It is one-way and on demand, deliberately: Notion anchors comments to blocks, so
re-sending replaces the blocks and takes any inline comments with them. Send
once per review round, not on every save.

Press **f** in that panel to pull the comments back down, listed against the
text they were left on, so you can edit here instead of tab-hopping.

Sharing needs nothing but a file on disk — it saves for you first. No commit, no
publish, nothing goes live. If the Notion page has been deleted or trashed since
the last send, a fresh one is created rather than writing into the trash.

Setup, once:

1. `NOTION_TOKEN=…` in `tools/writer/.env` (gitignored — this repo is public).
2. On the integration at notion.so/profile/integrations, tick **Read comments**
   under Capabilities, or the Feedback button gets a 403.
3. Hit Share and paste the URL of the Notion page the board should live under.
   Internal integrations cannot create pages at the top level, so it needs a
   parent. The board and each post's page id are remembered in
   `tools/writer/.notion.json`, also gitignored — nothing about Notion is ever
   committed.

Images and clips are uploaded to Notion as real files, so reviewers see them.
Conversion is lossy in the ways Notion is: no footnotes (markers become inline
code, definitions become paragraphs), no Liquid, no HTML wrappers. A referenced
file that is missing on disk becomes a ⚠️ callout rather than vanishing.

## If you edited on Notion by mistake

Notion is a one-way copy, so edits made there are not picked up. If you edit
there anyway, port the changes back instead of retyping them:

```sh
NOTION_TOKEN=$(grep NOTION_TOKEN tools/writer/.env | cut -d= -f2) \
  python3 tools/writer/port_notion_edits.py <notion-page-id> <local.md> /tmp/merged.md
diff -u <local.md> /tmp/merged.md      # read it before trusting it
cp /tmp/merged.md <local.md>
```

It aligns the two versions paragraph by paragraph: unchanged paragraphs keep
the **local** line (so links, italics, footnotes and Liquid survive), changed
ones take Notion's wording, and local `<figure>`/HTML lines are never dropped —
Notion's copy of them is lossy. It also stitches multi-line `{% include %}`
tags back together and keeps lists tight. Page ids are in `.notion.json`.

## Backups

Every save copies the previous contents to `tools/writer/.backups/`
(gitignored), keeping the last 20 per post. That is the undo of last resort for
a bad merge or a stray paste.

## Notes

- Setting a header image also fills `twitter_image` and `twitter_card`.
- Renaming the slug (or publishing) moves the file; the old one is removed.
- The server only ever writes inside `_posts/`, `_drafts/` and `assets/`, and only
  listens on `127.0.0.1`.
- `PORT=5000 node tools/writer/server.js` to use a different port.
