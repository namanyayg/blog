---
title: "Programmers Don't Really Have a Choice About AI"
layout: post
date: 2045-05-01
categories:
 - ai
excerpt_separator: <!--more-->
post_promotion_type: giga-reviewer
---

Every day I see another heartfelt post on Reddit and Twitter about "resisting AI use" or "keeping the craft pure." 

Those posts remind me of myself. If you met me two years ago, you'd see me tastefully craft each line, each function of my software. 

Fast forward to today, and I realize that I've changed my stance. These days, I've let go of control and I let the AI handle a lot of my codebase.

Not because I necessarily want to, but because I've realized that programmers _simply don't have a choice anymore._ The industry has already decided, and it's not [waiting for any of us to catch up](/blog/ai-and-learning).

<!--more-->

## When `react` was a new thing

In 2016, I had a couple of years experience as a developer and was making sites serving millions of users with _pure_ HTML, CSS, JS, and a little bit of jQuery.

Around that time, I was seeing React gain popularity&mdash; and I wasn't a fan at all.

SPA frameworks increased load times, were worse for SEO, and downright bad for accessibility. Angular was a big thing before React and nobody liked it. Similarly, I was confident that nobody's going to use React and the trend would die out.

And I wasn't alone. There were a lot of people like me on Reddit, as evidenced by Mr. `[deleted]`'s rant:

<figure>
  <img src="{{ '/assets/framework-hate.png' | relative_url }}" alt="">
  <figcaption>My kind of people</figcaption>
</figure>

Convinced, I doubled down on using plain old JS, no framework. I was writing _pure_ code. I was crafting "elegant" solutions. And I was knew that the world would eventually see reason, and return to simpler approaches.

_Want to guess how that turned out?_

**Spoiler alert:** no one cared about my "pure" code. What actually happened was:

* Developers who embraced React shipped more applications faster. 
* Companies that adopted it could iterate quicker and push features that users actually noticed. 
* Meanwhile, my "elegant" vanilla JS solutions took three times as long to build.

The industry had simply moved on, while I was busy being "right".

## Economies of Code

Let's take some time to think about _why_ so much code exists in the first place.

Code written for businesses allows executing repeatable processes that increase profits and/or save time. It is a means of a delivering specific business objectives, not an "art."

Put another way, when was the last time your manager celebrated your beautiful code architecture? Or, when did your CEO personally thank you for following perfect design patterns?

Never, right? Because from a business perspective, **code is a liability, not an asset**.

The cold, hard truth is that companies don't _want_ more code. The only thing that matters is **results**.

I learned this lesson from my former engineering manager. We were celebrating after a product launch, and I was complaining about some tech debt we'd accumulated.

_"You know what?"_ he said. _"I've never once heard the CEO care about our code quality. The only thing that matters is if we can deliver before deadlines or not."_

<figure>
  <img src="{{ '/assets/devs-vs-businesses-art-vs-deadlines.png' | relative_url }}" alt="Devs vs Businesses" style="max-width: 30em">
  <figcaption>What devs prioritize vs what businesses prioritize</figcaption>
</figure>

It was disappointing, but also... _enlightening_?

As a programmer, since I live _inside_ my codebase, I want to make it perfect exactly the way I want.

But if I think about this from the perspective of a business, my code is merely a _tool_ to earn profits.

And that's why I feel that we really don't have any choice about using AI. The painful reality is that someone using AI will outpace someone who is not, not by a small margin, but by orders of magnitude. 

Programmers who don't use AI will be significantly slower compared to AI assisted programmers. And which employer wants to hire a slow worker?

## Changing definitions of a "Good Programmer"

Remember what defined a "good programmer" a few years ago?

- Complete understanding from the highest to lowest level of their stack
- Encyclopedic knowledge of syntax & frameworks
- Using APIs and libraries without needing docs

With AI, that definition needs to be updated. Much of the lower levels of programming is handled by an AI, the developer's role is more of a "orchestrator."

Now, a _good programmer_ also needs:

1. Translating business needs into technical specifications that AI understands
3. Using [AI to get results quickly](/blog/building-with-ai)
4. Reviewing and verifying generated code to ensure usability

If they have been progrmaming for a long time, they'll have both sets of skills. 

But as time goes on, developers [will start losing the previous set of skills](/blog/ai-illiterate-programmers).

## How to Keep Up

I've been experimenting with ways to stay relevant in this new reality. Here's what's actually working:

* Ask better questions. The quality of your AI output directly corresponds to your prompt skills. I keep a list of effective prompts for different situations.
* Build your verification instincts. AI will [confidently generate complete nonsense](/blog/dangers-vibe-coding). Getting good at identifying it quickly is a superpower.
* Operate at the edge of your abilities. Use AI for the mundane stuff, then apply your creativity to the novel problems AI can't handle yet.
* Deep dive when things break. The best learning happens at failure points. When AI-generated code breaks, that's your cue to really understand the underlying system.

## Getting Comfortable With The Uncomfortable

The programmers who will survive this transition are:

They're the ones who can:

- Understand and use AI as the powerful tool that it is.
- Identify what AI is missing
- Know when to trust and when to verify
- Focus their limited mental energy on truly novel problems

I went through the five stages of grief about this. I was angry, in denial, tried to bargain. But eventually, I accepted it: programming as I knew it is dying. Something new is being born.

And fortunately, in some ways, it's more interesting than what came before.

I'm spending less time googling errors and more time thinking about the actual problems I'm trying to solve. I don't need to go through pages of docs to implement third party code.

## What Happens Next

The uncomfortable truth is that AI is not optional for programmers anymore. Just like frameworks, high-level languages, and Stack Overflow before it, AI is now part of the workflow.

Those who adapt will thrive. Those who resist will find themselves slowly lose out.

Is that _fair_? No. 

Is it _reality_? Absolutely.
