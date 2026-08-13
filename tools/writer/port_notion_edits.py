"""
Port edits made on a Notion page back into the local markdown, keeping the
markup Notion cannot represent (Liquid, figures, links, italics, footnotes).

Alignment is done on plain text. Where a paragraph is unchanged we keep the
LOCAL line, so its markup survives; where Notion differs we take Notion's
wording. Local media/HTML lines are never dropped — Notion's copy of them is
lossy (it silently lost two images on this post).
"""
import json, os, re, sys, urllib.request, difflib

TOKEN = os.environ['NOTION_TOKEN']
PAGE = sys.argv[1]
LOCAL = sys.argv[2]


def api(url):
    r = urllib.request.Request(url, headers={'Authorization': 'Bearer ' + TOKEN,
                                             'Notion-Version': '2022-06-28'})
    return json.load(urllib.request.urlopen(r))


def rich_to_md(rich):
    out = []
    for x in rich or []:
        t = x['plain_text']
        a = x.get('annotations', {})
        if a.get('code'):
            t = f'`{t}`'
        if a.get('bold'):
            t = f'**{t}**'
        if a.get('italic'):
            t = f'_{t}_'
        href = x.get('href')
        if href:
            t = f'[{t}]({href})'
        out.append(t)
    return ''.join(out)


def notion_lines(page_id):
    lines, cursor = [], None
    while True:
        u = f'https://api.notion.com/v1/blocks/{page_id}/children?page_size=100'
        if cursor:
            u += f'&start_cursor={cursor}'
        d = api(u)
        for b in d['results']:
            t = b['type']
            body = b[t] if isinstance(b[t], dict) else {}
            rich = body.get('rich_text')
            md = rich_to_md(rich)
            if t in ('image', 'video'):
                lines.append(('media', ''))
            elif t == 'divider':
                lines.append(('divider', '<!--more-->'))
            elif t.startswith('heading_'):
                lines.append(('text', '#' * int(t[-1]) + ' ' + md))
            elif t == 'bulleted_list_item':
                lines.append(('text', '* ' + md))
            elif t == 'numbered_list_item':
                lines.append(('text', '1. ' + md))
            elif t == 'quote':
                lines.append(('text', '> ' + md))
            elif t == 'callout':
                continue                      # our own banner, not content
            else:
                if md.strip():
                    lines.append(('text', md))
        if not d.get('has_more'):
            break
        cursor = d['next_cursor']
    return lines


MEDIA_RE = re.compile(r'<img|<video|!\[')
HTMLISH = re.compile(r'^\s*</?(figure|div|p|video|img|source)\b|^\s*\{%')


def local_lines(path):
    raw = open(path, encoding='utf-8').read()
    head, _, body = raw.partition('\n---\n')
    fm = head + '\n---\n'
    out = []
    for line in body.lstrip('\n').split('\n'):
        s = line.rstrip()
        if not s.strip():
            continue
        if MEDIA_RE.search(s):
            out.append(('media', s))
        elif HTMLISH.match(s):
            out.append(('html', s))
        elif re.match(r'^<!--\s*more\s*-->$', s.strip()):
            out.append(('divider', s))
        else:
            out.append(('text', s))
    return fm, out


def plain(s):
    """Strip markup so local and Notion text compare fairly."""
    s = re.sub(r'\{%.*?%\}', ' ', s, flags=re.S)
    s = re.sub(r'\{\{.*?\}\}', ' ', s, flags=re.S)
    s = re.sub(r'<[^>]+>', ' ', s)
    s = re.sub(r'\[([^\]]*)\]\([^)]*\)', r'\1', s)
    s = re.sub(r'[*_`#>]+', '', s)
    s = re.sub(r'\s+', ' ', s)
    return s.strip().lower()


fm, loc = local_lines(LOCAL)
not_ = notion_lines(PAGE)

lkeys = [plain(t) if k in ('text', 'divider') else f'::{k}::' for k, t in loc]
nkeys = [plain(t) if k in ('text', 'divider') else f'::{k}::' for k, t in not_]

merged, report = [], []
sm = difflib.SequenceMatcher(None, lkeys, nkeys, autojunk=False)
for tag, i1, i2, j1, j2 in sm.get_opcodes():
    if tag == 'equal':
        merged.extend(loc[i1:i2])                       # local wins: keeps markup
    elif tag == 'delete':
        for k, t in loc[i1:i2]:
            if k in ('media', 'html'):
                merged.append((k, t))                   # never drop local markup
                report.append(('kept-markup', t[:70]))
            else:
                report.append(('removed-on-notion', t[:70]))
    elif tag == 'insert':
        for k, t in not_[j1:j2]:
            if k == 'media':
                continue                                # local media is authoritative
            merged.append((k, t))
            report.append(('added-on-notion', t[:70]))
    else:  # replace
        keep = [(k, t) for k, t in loc[i1:i2] if k in ('media', 'html')]
        merged.extend(keep)
        for k, t in keep:
            report.append(('kept-markup', t[:70]))
        for k, t in not_[j1:j2]:
            if k == 'media':
                continue
            merged.append((k, t))
            report.append(('edited-on-notion', t[:70]))
        for k, t in loc[i1:i2]:
            if k not in ('media', 'html'):
                report.append(('was-locally', t[:70]))

# Notion split the multi-line {% include %} into one block per line. Blank
# lines inside a Liquid tag break Jekyll, so stitch those runs back together.
stitched = []
for kind, t in merged:
    if stitched and '{%' in stitched[-1][1] and '%}' not in stitched[-1][1]:
        stitched[-1] = (stitched[-1][0], stitched[-1][1] + '\n' + t)
    else:
        stitched.append((kind, t))
merged = stitched

LIST = re.compile(r'^\s*([*+-]|\d+\.)\s')

# Adjacent list items must stay tight; a blank line between them makes kramdown
# render a loose list with <p> inside every <li>.
parts = []
for _, t in merged:
    if parts and LIST.match(t) and LIST.match(parts[-1].split('\n')[-1]):
        parts[-1] += '\n' + t
    else:
        parts.append(t)
body = '\n\n'.join(parts)
open(sys.argv[3], 'w', encoding='utf-8').write(fm + '\n' + body + '\n')

for kind, t in report:
    print(f'{kind:18} {t}')
print(f'\nlocal blocks {len(loc)} → merged {len(merged)}')
