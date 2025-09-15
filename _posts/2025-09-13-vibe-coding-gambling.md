---
title: "Vibe Coding Is Making Us All Dumber"
layout: post
date: 2025-09-13
categories:
 - ai
 - startups
excerpt_separator: <!--more-->
# image: /assets/knowledge-is-music.png
# twitter_image: /assets/knowledge-is-music.png
# twitter_card: summary_large_image
# social_metrics:
#   views: "500,000+"
#   reddit: "3000+ votes"
# prevent_syndication: true
---

Confession: I've been using Claude Code to write all my code for me. And I think it's making me worse at the thing I've loved doing for twelve years.

I can clearly see how AI coding is rewiring our brains -- it makes developers crave instant gratification instead of deep understanding, and reduces us to  **gamblers** who pull levers for the next _hit_ of working code.

If this is happening to me, someone who learned to code in the pre-AI era, **what's it doing to junior developers who've never known anything else?**

<!--more-->

## Solving Hard Problems

At the age of 16, alone in my room in New Delhi, I was completely obsessed with this problem. Want to try solving this with me?

<figure>
  <img src="{{ '/assets/euler-lattice-paths.png' | relative_url }}" alt="Project Euler 'Lattice Paths' problem" style="max-width: 30em">
</figure>


It's from the site called ["Project Euler"](https://projecteuler.net/), one of the greatest resource for programming challenges that combine math with your data structures and algorithms knowledge. This particular one is Problem 15 "Lattice Paths." Like all Project Euler problems, it can be stated simply enough.

The problem already shows us how it looks like for 2x2, and you can sketch out 3x3 easily as well (try it out, that was the first thing I did). But, the challenge actually comes when you try to visualize the scale -- can you imagine how large the result must be for a 20x20 grid?

I spent _weeks_ on this thing -- scratching diagrams on every piece of paper I could find, bothering my math teachers until they avoided me, and even dreaming about algorithms on a few nights.

Can you imagine spending _weeks_ on a single problem today? Just thinking, failing, thinking more?

I tried everything. Brute force. Recursion. Drawing grids until my fingers cramped. Nothing worked.

Then one fine afternoon on the bus back from school, it struck me. _This wasn't about pathfinding at all._ 

It was **combinations.** To reach the bottom-right, you need exactly 20 right moves and 20 down moves. The question can be rephrased: how many ways can you arrange those moves, or how many ways can you choose 20 moves out of 40? And that gives us the answer, `C(40,20)`.

I had a mini eureka moment that kept me giddy till I reached home. I booted up my PC and coded the solution in ten minutes. I got the answer: `137846528820`. I hit submit and was greeted with the success screen on Project Euler, and the pure gratification of weeks of effort culminating on this one glorious moment.

But here's the thing — the actual _number_ didn't matter. What mattered was that moment when everything clicked. When weeks of confusion suddenly made perfect sense. That [flow state](https://en.wikipedia.org/wiki/Flow_(psychology)) of complete immersion and understanding. 

I wouldn't have felt like this if I had not spend all that time thinking about the question, or if I had cheated and looked up the answer online.

But I didn't, and the rush I got was _pure magic._ I was in love.

## AI Addiction

A few months ago I was dealing with some gnarly state management bug. Of course, debugging React state is the bottom of the totem pole for enjoyability, just slightly better trying to browse the internet on a slow connection with packet loss, so I (lazily) pasted the entire problem into Claude to let it do it.

Then (and this is the part where it starts to go wrong) _I alt-tab to Twitter while it thinks._

<figure>
  <img src="{{ '/assets/xkcd-ai-generating.webp' | relative_url }}" alt="XKCD `AI Generating`" style="max-width: 30em">
  <figcaption>
    There's always a relevant XKCD... but this is a revision of 
    <a href="https://xkcd.com/303/" target="_blank">Compiling</a>, 
    made by a 
    <a href="https://www.reddit.com/r/xkcd/comments/1ks4r58/ai_programming/" target="_blank">clever redditor</a>
  </figcaption>
</figure>

But, my mind just went _"oh, cool"._ I felt... nothing.

Well, that's not true. 

I felt something -- a hollow satisfaction that my code now works. It felt like the same feeling when doom scrolling through TikTok or when completing another level on a mobile game. That cheap hit of "something happened."

If you've been coding with AI, this might seem relatable:

I feed in a prompt, with the best of my _vibes_. The AI says it's "thinking" (even though everyone knows that an AI doesn't actually _think_, they're blatantly lying to our faces. But I smile at the illusion, maybe even slightly believe it.) 

I know that it's gonna take a minute or so before I get the answer. What am I supposed to do in the meanwhile, _think_? The AI is already going to do that for me, much faster, and will give me the correct result (probably.)

I check back. It's done. There's a brief hit of dopamine when I see that it's completed. Cool.

I check the code (_I lied, I just read through what it tells me it's written and not the actual code_). It's good enough, but of course the AI has made some wrong assumptions so there's some mistakes. 

I give the AI another prompt to fix this, and we repeat our little dance.

_Put in a prompt, get code._

_Pull the lever, get a reward._

No struggle, no insight, [no growth](/blog/dangers-vibe-coding){:target="_blank"}.

## The Brain on AI

Here's what's happening inside your head when you ["vibe code"](/blog/vibe-coding-fantasy){:target="_blank"} and rely completely on AI: you get [dopamine](https://en.wikipedia.org/wiki/Dopamine) from the **wrong source.**

Before AI, programming gave me two _dopamine hits_: figuring things out AND getting them to work. The breakthrough moment when you understand why your algorithm failed. The satisfaction of architecting something elegant. The joy of working code after hours of debugging.

Now, the AI does all the figuring out. You're left with just a shallow pleasure.

If you think about it, that 30-second wait for AI responses can be seen as a [variable ratio schedule](https://en.wikipedia.org/wiki/Reinforcement_schedule) — Random rewards delivered at unpredictable intervals — the same psychological pattern that makes slot machines, social media, and mobile games addictive.

If this is happening to me — imagine what it's doing to [the developers](/blog/ai-and-programmers){:target="_blank"} who've never known anything else.

We're creating a generation of developers who can ship code but _[can't reason about systems](/blog/ai-illiterate-programmers){:target="_blank"}_.

We are creating a generation of _human merge buttons_ who approve AI commits without understanding what they're deploying.

They'll never experience that _Project Euler_ moment. That weeks-long struggle that teaches a new programmer how to think, not just [how to copy-paste](/blog/ai-and-learning){:target="_blank"}. They're skipping the very challenges that would make them great.

## The Illusion

The worst part is that it feels amazing and does actually work (usually.) AI makes me feel productive and features ship faster. The GitHub graph blazes green.


<figure>
  <img src="{{ '/assets/giga-usage.png' | relative_url }}" alt="My weekly AI usage">
  <figcaption>
    My AI usage last week. Is this too much? (Screenshot from <a href="https://gigamind.dev/?utm_source=blog&utm_content=vibe-coding-gambling-stats-image" target="_blank">my app, my own brainchild</a>.)
  </figcaption>
</figure>

But velocity isn't competency. When you outsource thinking, you don't just lose practice — you lose confidence. That voice that used to whisper "I can figure this out" gets quieter every time you reach for AI instead.

## How to Use AI (Without Losing Your Soul)

I'm not saying abandon AI — these tools have quickly become too powerful to ignore. But we need to be intentional about how we use them.

1. Force yourself to understand the generated code before accepting it. If you can't explain what it does and why, don't merge it. This seems obvious, but you'll be shocked how often new developers skip this step.

2. Practice problems without AI regularly. I've started doing Project Euler again. This is [deliberate practice](https://en.wikipedia.org/wiki/Deliberate_practice) for programming. My problem-solving muscles were rustier than I expected, but they're coming back.

3. Use AI waiting time for something productive. Instead of scrolling Twitter or Reddit, you can think about the architecture for your next task while the AI handles implementation details. (Use social media blocking apps if you need to. I use Opal on my phone for this.)

4. Most importantly — remember why you we write code. It's to create something from nothing, to solve problems that seemed impossible, and build things that matter. Don't forget the _why._

## The Future 

<!-- newsletter_widget -->

Even when AI will have permeated all parts of the software development lifecycle, the best developers will continue to be the ones can think deeply about complex problems.

I'm bullish on AI for coding. It's revolutionary technology that's making me more productive than ever. _But productivity without understanding is just elaborate copy-pasting._

AI should amplify your intelligence, not replace it. Use it to tackle bigger challenges, not to avoid thinking altogether.

Because the day we stop struggling with hard problems is the day we stop being programmers, and become something else entirely.