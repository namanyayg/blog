---
title: "Why Good Programmers Use Bad AI"
layout: post
date: 2025-05-17
categories:
 - ai
excerpt_separator: <!--more-->
post_promotion_type: hidden
---

*AI code generation is error-prone. Why, then, are programmers still using it?*

Everyone from YC partners to Fiverr's CEO has been proclaiming that "90% of code is AI-generated" or that they're becoming "AI-first" companies. 

The subtext they're forcing on us is clear: _programmers who don't embrace AI will be left behind._

But after two years of daily AI coding — from the earliest Cursor version to the latest agentic tools — I've uncovered the truth: AI coding tools are simultaneously terrible _and_ necessary.

<!--more-->

## Harsh Economies of Code

The industry's embrace of AI makes perfect sense when you follow the money.

I learned this lesson from my former engineering manager. We were celebrating after a product launch, and I was complaining about some tech debt.

_"You know what?"_ he said. _"I've never once heard the CEO care about our code quality. The only thing that matters is if we can deliver before deadlines or not. Nobody's getting promoted for clean code if the feature ships late."_

It was disappointing, but also... _enlightening_?

<figure>
  <img src="{{ '/assets/devs-vs-businesses-art-vs-deadlines.png' | relative_url }}" alt="Devs vs Businesses" style="max-width: 30em">
  <figcaption>What devs prioritize vs what businesses prioritize</figcaption>
</figure>


As a programmer, since I live _inside_ my codebase, I want to make it perfect exactly the way I want.

But from the perspective of a business, my code is merely a _tool_ to generate revenue.

And this is cold reality pushing AI adoption: businesses don't care if the code is AI-generated or handcrafted _as long as it works and ships quickly._

## What AI Is Actually Good For

After two years of using AI coding tools extensively, I've found some areas where it truly shines. Here's what I find most useful with AI:

- **Understanding documentation:** I often have to use libraries that are poorly documented. Last sprint I had to use a Python library with the worst imaginable docs: poorly structured and broken search. I pasted that link into Cursor, let it index the docs, and I was able to find precisely what I needed and ask questions around it within seconds. It would've taken hours of trial and error otherwise.
- **Boilerplate code:** I don't know about you, but writing repetitive framework code feels like the worst kind of drudgery to me. I know why GraphQL resolvers are needed, or how each component needs loading, error, and success states; but I really don't like writing such code myself. Now I let an agentic AI do the grunt work for me, so I can focus on the fun parts.
- **Error debugging:** In the past, [the only way to debug](/blog/ai-and-learning) was to search the error string, find information across multiple stackoverflow results, and condense it to a useable answer yourself. Now, the AI can do the search _much quicker_ and write customized solutions by understanding our code. Why not enjoy that?

## What AI fails at

Even though the AI fanboys might come for me, there are some universally agreed upon issues with AI:

**Any non-mainstream tech stack.** AI performs decently with React, but try something else, and the quality plummets. 

Last month I used AI to help with a WebGL project, and it generated code that looked plausible, but simply didn't work, because it hallucinated so many API calls.

**Complex business logic.** Last week, I asked AI to refactor a function. The AI happily returned a 'solution' with unnecessary duplication.

The code _worked_, but the AI completely lacked the ability to identify the actual problem and implement an elegant solution.

**The debugging overhead is real.** Sometimes fixing AI's "solution" takes longer than writing it yourself.

**Security** is another weak spot. I've had AI confidently [suggest storing API keys in local storage](/blog/dangers-vibe-coding) — essentially leaving my application open for exploits.


## The Correct Way to Use AI

This reality taught me to [combine AI’s speed with my personal quality](/blog/cursor-guide) standards:

- I let AI draft the first version.
- I carve out dedicated review time to catch its blunders.
- I write tests around every AI-generated module.

## How to Thrive (Not Just Survive)

If you’re still on the fence, here’s the exact playbook I’ve honed:

* Build your verification instincts. When AI outputs code, I learned to spot the red flags: incorrect library usage, not using existing functions or patterns, incorrect domain knowledge.
* Operate at the edge of your abilities. Use AI for the mundane stuff (config, boilerplate, standard patterns, typical integrations), then [apply your creativity to the novel problems](/blog/ai-illiterate-programmers) AI can't handle yet.
* Ask delibrately. Instead of "implement this feature," I break problems into smaller chunks: "Create the data model for this entity," then "Write the validation logic for these fields," and so on.
* Deep dive when things break. The best learning happens at failure points. When AI-generated code breaks, that's your cue to really understand the underlying system. Add logs, use the debugger, manually go through each part of the code flow.
* Keep a "WTF AI" journal. Document every spectacular fail—hallucinated API calls, misnamed types, security oversights. Those failures become your internal library of “don’t let it do that again.” It's therapeutic and surprisingly educational.

## Next Steps

The uncomfortable truth is that AI coding tools aren't optional anymore. The developers who adjust to this new reality fastest will have the most leverage, because they'll solve higher-level problems while AI handles the mundane.

I don't particularly like this reality. There's something unsettling about watching an AI generate in seconds what would have taken me an hour. But pretending this shift isn't happening won't change its trajectory.

Perhaps in five years, we'll look back on this transition period with nostalgia. Another tool that felt threatening until it became indispensable. Or maybe we won't. 

Either way, I'll be using AI tomorrow morning, cursing its limitations, and shipping more code than I did yesterday.

_Thanks to [John](https://www.linkedin.com/in/jmontroy90/), [Cyrene](https://cysabi.github.io/), and [Mikhail](https://www.linkedin.com/in/mikkqu/) for helping me think deeper about these ideas and for sharing feedback on my drafts_