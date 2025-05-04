---
title: "I tried resisting AI. Then I tried using it. Both were painful."
layout: post
date: 2025-05-03
categories:
 - ai
excerpt_separator: <!--more-->
post_promotion_type: giga-reviewer
---

Every day I see another heartfelt post about "resisting AI use" or "keeping the craft pure." 

Those posts remind me of myself. If you met me two years ago, you'd see me tastefully craft each line and function of the code I write. 

Fast forward to today, and I've let go of control and I let the AI handle a lot of my codebase. Not because I necessarily want to, but because I feel like we programmers _don't have a choice anymore?_ 

The uncomfortable truth is that AI is changing our work whether we like it or not. And spoiler alert: it's not all productive.

<!--more-->

## When I thought I knew everything

In 2016, I had a couple of years experience as a developer and was making sites serving millions of users with _pure_ HTML, CSS, JS, and a little bit of jQuery.

Around that time, I was seeing React gain popularity&mdash; and I wasn't a fan at all.

SPA frameworks increased load times (remember waiting 10 seconds for a simple landing page?), were worse for SEO (Google was terrible at indexing JS-rendered content back then), and downright bad for accessibility. I was confident that the trend would die out.

And I wasn't alone. There were a lot of people like me on Reddit, as evidenced by Mr. `[deleted]`'s rant:

<figure>
  <img src="{{ '/assets/framework-hate.png' | relative_url }}" alt="">
  <figcaption>My kind of people</figcaption>
</figure>

Convinced, I doubled down on using plain old JS, no framework. I was writing _pure_ code. I was crafting "elegant" solutions. And I knew that the world would eventually see reason, and return to simpler approaches.

## Want to guess how that turned out?

Here's what actually happened:

* Developers who embraced React shipped more applications faster. 
* Companies that adopted it could iterate quicker and push features that users actually noticed. 
* Meanwhile, my "elegant" vanilla JS solutions took three times as long to build.

The industry had simply moved on, while I was busy being "right".

## Hard truth about businesses

Let's take some time to think about _why_ so much code exists in the first place.

I learned this lesson from my former engineering manager. We were celebrating after a product launch, and I was complaining about some tech debt we'd accumulated.

_"You know what?"_ he said. _"I've never once heard the CEO care about our code quality. The only thing that matters is if we can deliver before deadlines or not. Nobody's getting promoted for clean code if the feature ships late."_

It was disappointing, but also... _enlightening_?

Code written for businesses allows executing repeatable processes that increase profits and/or save time. It is a means of delivering specific business objectives, not an "art."

<figure>
  <img src="{{ '/assets/devs-vs-businesses-art-vs-deadlines.png' | relative_url }}" alt="Devs vs Businesses" style="max-width: 30em">
  <figcaption>What devs prioritize vs what businesses prioritize</figcaption>
</figure>


As a programmer, since I live _inside_ my codebase, I want to make it perfect exactly the way I want. I still get a dopamine hit when I refactor a messy function into something elegant.

But if I think about this from the perspective of a business, my code is merely a _tool_ to earn profits.

## AI is not your savior

So, I started using AI _heavily_ to get results quicker. After 6 months of daily AI coding, some facts:

* **It confidently [generates absolute garbage.](/blog/dangers-vibe-coding)** Just last week, it gave me a security vulnerability disguised as a best practice. _Thanks, AI!_
* **The debugging overhead is real.** Sometimes fixing AI's "solution" takes longer than writing it yourself.
* **It can't understand complex business logic.** Ask it to implement a multi-tenant authorization system, and watch it fall apart.

But here's the thing&mdash;and this is important&mdash;despite all these frustrations, I keep using it.

## Why I (still) use AI

The painful reality is that someone using AI will outpace someone who is not.

Not because AI is perfect, but because:

* The mundane stuff is automated. Writing boilerplate, setting up API endpoints, implementing standard patterns&mdash;AI handles these faster than I can type.
* The frustration is worth it. Even with the debugging overhead, I'm still faster overall.
* My PRs are bigger, my features ship faster. The code quality is actually often better because I'm less fatigued from writing repetitive code.

## What a "Good Programmer" means now

Remember what defined a good programmer a few years ago? Back when I first started, being "senior" meant you had encyclopedic knowledge of your stack.

With AI, that definition is outdated. Now, a good programmer needs different skills:

* Prompt engineering. This seems obvious, but there's an art to it. The quality of your AI output directly corresponds to your prompt skills. I keep a list of [effective prompts for different situations](/blog/ai-prompt-engineering).
* Code reviewing. AI will confidently generate nonsense. Getting good at identifying it quickly is necessary now
* Architecture thinking. AI handles the implementation; you focus on the design.
* Business translation. Converting vague requirements into precise technical specs that AI can execute.

## How to Keep Up

It's a completely different mental process to be programming with AI. I've been experimenting with ways to get comfortable with it. Here's what's actually working:

* Build your verification instincts. When AI outputs code, I learned to spot the red flags: incorrect library usage, not using existing functions or patterns, incorrect domain knowledge.
* Operate at the edge of your abilities. Use AI for the mundane stuff (boilerplate, standard patterns, typical integrations), then [apply your creativity to the novel problems](/blog/ai-and-learning) AI can't handle yet.
* Deep dive when things break. The best learning happens at failure points. When AI-generated code breaks, that's your cue to really understand the underlying system. Add logs, use the debugger, manually go through each part of the code flow.
* Keep a "WTF AI" journal. Document the spectacular failures. It's therapeutic and surprisingly educational.

## The Uncomfortable Truth

AI is not optional for programmers anymore. Just like frameworks, high-level languages, and Stack Overflow before it, AI is now part of the workflow.

The developers who adjust to this new reality fastest will have the most interesting careers over the next decade.

But let's be real&mdash;it's not all productivity gains. It's frustration, debugging, and occasionally questioning your life choices. AI is a powerful but flawed tool&mdash;one that needs constant supervision, but ultimately lets you build things you never had time to before.

Maybe, just maybe, we'll look back at this era the same way we look at the framework debates. Another tool that felt threatening until it became indispensable.

Time will tell.

_Thanks to [John](https://www.linkedin.com/in/jmontroy90/), [Cyrene](https://cysabi.github.io/), and [Mikhail](https://www.linkedin.com/in/mikkqu/) for helping me think deeper about these ideas and for sharing feedback on my drafts_