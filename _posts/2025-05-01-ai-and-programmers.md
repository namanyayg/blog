---
title: "New Programmers Don't Really Have a Choice About AI"
layout: post
date: 2025-04-30
categories:
 - ai
excerpt_separator: <!--more-->
post_promotion_type: giga-reviewer
---

Every day I see another heartfelt post on Reddit about "resisting AI use" or "keeping the craft pure." 

Those posts remind me of myself. If you met me two years ago, you'd see me tastefully craft each line and function of the code I write. 

Fast forward to today, and I've let go of control and I let the AI handle a lot of my codebase. Not because I necessarily want to, but because I've realized that programmers _simply don't have a choice anymore._ 

The industry has already decided, and it's not [waiting for any of us to catch up](/blog/ai-and-learning).

<!--more-->

## When `react` was a new thing

In 2016, I had a couple of years experience as a developer and was making sites serving millions of users with _pure_ HTML, CSS, JS, and a little bit of jQuery.

Around that time, I was seeing React gain popularity&mdash; and I wasn't a fan at all.

SPA frameworks increased load times (remember waiting 10 seconds for a simple landing page?), were worse for SEO (Google was terrible at indexing JS-rendered content back then), and downright bad for accessibility. I was confident that the trend would die out.

And I wasn't alone. There were a lot of people like me on Reddit, as evidenced by Mr. `[deleted]`'s rant:

<figure>
  <img src="{{ '/assets/framework-hate.png' | relative_url }}" alt="">
  <figcaption>My kind of people</figcaption>
</figure>

Convinced, I doubled down on using plain old JS, no framework. I was writing _pure_ code. I was crafting "elegant" solutions. And I knew that the world would eventually see reason, and return to simpler approaches.

_Want to guess how that turned out?_

**Spoiler alert:** no one cared about my "pure" code. What actually happened was:

* Developers who embraced React shipped more applications faster. 
* Companies that adopted it could iterate quicker and push features that users actually noticed. 
* Meanwhile, my "elegant" vanilla JS solutions took three times as long to build.

The industry had simply moved on, while I was busy being "right".

## Economies of Code

Let's take some time to think about _why_ so much code exists in the first place.

Code written for businesses allows executing repeatable processes that increase profits and/or save time. It is a means of delivering specific business objectives, not an "art."

Put another way, when was the last time your manager celebrated your beautiful code architecture? Or, when did your CEO personally thank you for following perfect design patterns?

Never, right? Because from a business perspective, **code is a liability, not an asset**.

The cold, hard truth is that companies don't _want_ more code. The only thing that matters is **results**.

I learned this lesson from my former engineering manager. We were celebrating after a product launch, and I was complaining about some tech debt we'd accumulated.

_"You know what?"_ he said. _"I've never once heard the CEO care about our code quality. The only thing that matters is if we can deliver before deadlines or not. Nobody's getting promoted for clean code if the feature ships late."_

<figure>
  <img src="{{ '/assets/devs-vs-businesses-art-vs-deadlines.png' | relative_url }}" alt="Devs vs Businesses" style="max-width: 30em">
  <figcaption>What devs prioritize vs what businesses prioritize</figcaption>
</figure>

It was disappointing, but also... _enlightening_?

As a programmer, since I live _inside_ my codebase, I want to make it perfect exactly the way I want. I still get a dopamine hit when I refactor a messy function into something elegant.

But if I think about this from the perspective of a business, my code is merely a _tool_ to earn profits.

And that's why I feel that we really don't have any choice about using AI. The painful reality is that someone using AI will outpace someone who is not, not by a small margin, but by orders of magnitude. 

And what employer wants to hire the slower programmer?

## Changing definitions of a "Good Programmer"

Remember what defined a good programmer a few years ago?

Back when I first started, being "senior" meant you had encyclopedic knowledge of your stack. I paired with a guy recently who could recite the exact syntax for obscure Python functions from memory. Like a programming savant.

You were expected to know your framework's internals so well that you could debug issues without even looking at logs. _"Oh, you're getting that error? That's a known issue with how React handles nested Suspense components."_

And let's not forget the badge of honor that came with using APIs and libraries without needing to look at docs, because you already remember it. 

With AI, that definition needs to be updated. Much of the lower levels of programming is handled by an AI, the developer's role is more of a "orchestrator."

Now, a good programmer needs totally different skills:

1. Translating business needs into technical specifications that AI understands
1. Then, using [AI to get results quickly](/blog/building-with-ai)
1. And finally, being an expert at reading and validating code. 

## How to Keep Up

It's a completely different mental process to be programming with AI. I've been experimenting with ways to get comfortable with it. Here's what's actually working:

* Ask better questions. This seems obvious, but there's an art to it. The quality of your AI output directly corresponds to your prompt skills. I keep a list of [effective prompts for different situations](/blog/ai-prompt-engineering).
* Build your verification instincts. AI will [confidently generate complete nonsense](/blog/dangers-vibe-coding). Getting good at identifying it quickly is a superpower.
* Operate at the edge of your abilities. Use AI for the mundane stuff (boilerplate, standard patterns, typical integrations), then apply your creativity to the novel problems AI can't handle yet.
* Deep dive when things break. The best learning happens at failure points. When AI-generated code breaks, that's your cue to really understand the underlying system. Add logs, use the debugger, manually go through each part of the code flow.

I went through the five stages of grief about these changes. I was angry _(these tools are stealing our jobs)_, in denial _(they'll never replace real programming skill)_, tried to bargain _(maybe I'll just use it for documentation)_. 

But eventually, I accepted it: programming as I knew it is dying. Something new is being born.

And in some ways, it's more interesting than what came before.


The programmers who will survive this transition are the ones who will understand and use AI as the powerful tool that it is.

* They're the ones who can identify what AI is terrible at. And trust me, despite all the hype, there are still [plenty of things AI sucks at](/blog/ai-understand-senior-developer).
* They're the ones who know when to trust and when to verify. (My rule of thumb: trust AI for anything that has clear correctness criteria and standard patterns. Be skeptical of anything security-related, performance-critical, or novel.)
* Most importantly, they're the ones who focus their limited mental energy on truly novel problems. The parts of programming that require creativity, deep understanding of user needs, or complex system design.


With AI, I'm spending less time googling errors and more time thinking about the actual problems I'm trying to solve. I don't need to go through pages of docs to implement third party code. My PRs are bigger, my features ship faster, and honestly? The code quality is often better because I'm less fatigued from writing boilerplate.

Here's how I see productivity of programmers using AI vs those who are not:

<figure>
  <img src="{{ '/assets/time-with-and-without-ai.png' | relative_url }}" alt="With and Without AI">
</figure>

AI makes you better at boilerplate and third party code, but QA takes more time. Still, this is just the start. Over time, this graph will get better in favor of those using AI.

## What Happens Next

The uncomfortable truth is that AI is not optional for programmers anymore. Just like frameworks, high-level languages, and Stack Overflow before it, AI is now part of the workflow.

Those who adapt will thrive. Those who resist will find themselves slowly lose out.

Is that _fair_? No. 

Is it _reality_? Absolutely.

The developers who adjust to this new reality fastest will have the most interesting careers over the next decade. They'll be working on problems that push the boundaries of what's possible. Think about what you could be building if you weren't wasting time on tasks AI can handle. 

The future belongs to the developers who see AI not as a threat to their craft, but as the key that finally lets them build what they've always imagined, but never had the time to create. 

_Thanks to [John](https://www.linkedin.com/in/jmontroy90/), [Cyrene](https://cysabi.github.io/), and [Mikhail](https://www.linkedin.com/in/mikkqu/) for helping me think deeper about these ideas and for sharing feedback on my drafts_