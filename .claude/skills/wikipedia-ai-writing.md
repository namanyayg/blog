# Wikipedia: Signs of AI Writing

**Reference Guide - Avoid These Patterns**

*Source: Wikipedia:Signs of AI writing (WP:AISIGNS)*

This is a list of writing and formatting conventions typical of AI chatbots such as ChatGPT. Not all text featuring these indicators is AI-generated, but they are strong signals worth checking.

**Important:** The patterns here are potential signs of a problem, not the problem itself. Don't just fix surface issues—look for deeper content problems like unsourced claims, exaggeration, or lack of specificity.

---

## Content Issues

### Undue Emphasis on Significance and Legacy

**Words to watch:** stands/serves as, is a testament/reminder, a vital/significant/crucial/pivotal/key role/moment, underscores/highlights its importance/significance, reflects broader, symbolizing its ongoing/enduring/lasting, contributing to the, setting the stage for, marking/shaping the, represents/marks a shift, key turning point, evolving landscape, focal point, indelible mark, deeply rooted

LLM writing often puffs up the importance of the subject matter by adding statements about how arbitrary aspects represent or contribute to a broader topic.

**Examples:**
- "marking a pivotal moment in the evolution of..."
- "This initiative was part of a broader movement..."
- "helped solidify its role as a regional hub"
- "highlights the enduring legacy of..."
- "contributes to the broader history of..."

### Undue Emphasis on Notability and Attribution

**Words to watch:** independent coverage, local/regional/national media outlets, profiled in, written by a leading expert, active social media presence

LLMs act as if the best way to prove a subject is notable is to hit readers over the head with claims of notability, often by listing sources without context about what those sources actually said.

**Examples:**
- "She spoke about AI on CNN, and was featured in Vogue, Wired..."
- "maintains a strong digital presence, particularly on Instagram"
- "has been cited in The New York Times, BBC, Financial Times..."

### Generic "Importance" Statements

LLMs add hedging preambles acknowledging that a subject is relatively unimportant, before talking about its importance anyway.

### Over-emphasis on Ecosystem/Environment (Biology)

When discussing species, LLMs tend to over-emphasize connections to the broader ecosystem, even when those connections are tenuous or generic. They also belabor conservation status even if unknown.

---

## Language and Grammar

### Thesaurus Syndrome ("Elegant Variation")

**Words to watch:** unveiled, delve/delving, serves, shed light on, embarked, underscore, notably, harnessing, notably, realm

AIs rotate synonyms to avoid repeating words, even when repetition would be clearer. They also use fancier verbs to avoid simple "is" or "has."

**Examples:**
- Using "unveiled," "revealed," "showcased," and "introduced" in the same paragraph instead of just "announced"
- "serves as" instead of "is"
- "embarked on" instead of "started"

### Vague or Hedging Language

**Phrases to watch:**
- "While specific details are limited based on available information..."
- "As of my last update..."
- "I don't have access to real-time data..."
- "to date, no editor has identified..."

These are model limitations leaking into prose.

### Flowery or Overly Formal Language

**Examples:**
- "nestled in" instead of "located in"
- "boasts" instead of "has"
- "renowned" overused
- "multifaceted"
- "underscores the importance"

### Passive Voice Overuse

LLMs tend to use passive constructions more than necessary.

---

## Style Issues

### Em Dashes and Parenthetical Asides

Excessive use of em dashes (—) or parenthetical clauses that could be rewritten as separate sentences.

### Bulleted Lists for Prose Content

AIs create bulleted lists where prose would be more natural.

### Repetitive Sentence Structure

Uniform sentence length and structure. Each paragraph roughly the same size.

### "Not only... but also" Construction

Overused comparative structure.

### Bolding Key Terms

Excessive bold formatting, especially in the opening paragraph or throughout body text.

---

## Communication Artifacts

### Collaborative Communication

**Words to watch:** I hope this helps, Of course!, Certainly!, You're absolutely right!, Would you like..., is there anything else, let me know, more detailed breakdown, here is a...

Text that was meant as correspondence rather than article content.

**Examples:**
- "In this section, we will discuss..."
- "If you plan to add this information..."
- "ensure that the content is presented in a neutral tone"

### Subject Lines

User messages that begin with text intended for an email Subject field.

**Example:** "Subject: Request for Permission to Edit Wikipedia Article"

### Meta-commentary

References to the writing process itself:
- "Let me elaborate on..."
- "It's worth noting that..."
- "To provide context..."

---

## Markup and Formatting

### Markdown Instead of Wiki Markup

**Common patterns:**
- Italic: `*text*` or `_text_` instead of `''text''`
- Bold: `**text**` or `__text__` instead of `'''text'''`
- Links: `[text](url)` instead of `[[article|text]]`
- Headers: `# Header` instead of `== Header ==`

### Curly Quotation Marks

ChatGPT typically uses curly quotes ("...") instead of straight quotes ("..."), and curly apostrophes (') instead of straight (').

*Note: This alone doesn't prove LLM use—Microsoft Word and macOS do this by default.*

### Skipping Heading Levels

AI chatbots tend to skip level 2 headings (==) and start from level 3 (===).

### Thematic Breaks Before Headings

Including `----` before each heading (common in Markdown output).

### Unusual Use of Tables

Creating unnecessary small tables that could be better represented as prose.

---

## Citation Issues

### Bare URLs

Using raw URLs like `https://example.com` instead of formatted citations.

### Incorrect Citation Formats

- Duplicate parameters (`|url=` appears twice)
- Wrong templates (using `{{cite web}}` for books)
- Unnecessary parameters (`|format=HTML` for web pages)
- Made-up parameters (`|section=`, `|pdf-url=`)

### Hallucinated Citations

Citations that look plausible but don't exist, or that link to unrelated content.

---

## Miscellaneous

### JSON or Code Blocks in Text

Accidentally including JSON formatting, code syntax, or other structured data formats in prose.

### Overuse of Qualifiers

- "relatively"
- "somewhat"
- "fairly"
- "quite"
- "rather"

### Lists of Three

Compulsive groupings of exactly three items (rule of three).

### Novelty Inflation

Treating established concepts as if the speaker invented them:
- "He introduced a term..."
- "She coined the phrase..."
- "a concept nobody's naming..."
- "a failure mode nobody talks about"

---

## Signs of Human Writing (False Positives)

These are **not** reliable indicators of AI:

- Typos and spelling errors (LLMs make these too)
- Simple grammar mistakes (LLMs make these)
- Short or stub articles
- Poor writing quality
- Use of British vs. American English
- Informal tone
- First-person perspective (LLMs can use "I")

---

## Key Takeaways

1. **Look for patterns, not individual words.** One "pivotal moment" doesn't mean AI. Five in three paragraphs does.

2. **Check for substance.** AI-generated content tends to be generic, vague, and could apply to many topics. Human writing is specific and detailed.

3. **Statistical regression to the mean.** LLMs omit specific, unusual facts and replace them with generic, positive descriptions.

4. **Thesaurus abuse.** Forced synonym variation instead of clear repetition of the right word.

5. **Significance inflation.** Making mundane subjects sound historically important.

6. **Surface vs. deeper problems.** Fixing formatting doesn't fix unsourced claims, exaggeration, or lack of specificity.

---

## When Applying This Guide

- Not every indicator means AI was used
- Look for **clusters** of indicators
- Focus on deeper content issues, not just surface formatting
- Be specific about what's wrong beyond "sounds like AI"
- Verify facts and sources—that's often the real problem
