---
title: "What 6 hours at HN #1 actually does to your traffic"
layout: post
date: 2025-01-06
categories:
  - ai
  - hackernews
excerpt_separator: <!--more-->
---

*"Every developer has that one post they almost didn't write..."*

For 2025, I decided to get back into technical writing. 

I've been obsessing over getting AI to actually *understand* production code. Not just generate it, but really grok what's happening in a mature codebase. 

After countless nights exploring this rabbit hole, I wrote about a breakthrough I had.

Sunday morning, I posted it on HackerNews. "Why not," I thought, "maybe someone will find it interesting."

Then I went back to my weekend.

<!--more-->

## The moment it hit #1

I was lazing around with my girlfriend when I pulled up HN, as one does every 27 minutes. My karma looked... different? 

Wait.

*Holy shit.*

The post was #1 on the front page.

<blockquote class="twitter-tweet" data-dnt="true" data-theme="light"><p lang="en" dir="ltr">...FINALLY <br><br>I&#39;ve had this dream since 14 years now <br><br>I AM RANK #1 on HACKERNEWS<br><br>!!! <br><br>(go check out my post folks!) <a href="https://t.co/fiFpqaD0iz">pic.twitter.com/fiFpqaD0iz</a></p>&mdash; nmn (@NamanyayG) <a href="https://twitter.com/NamanyayG/status/1875924361586295021?ref_src=twsrc%5Etfw">January 5, 2025</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

I literally jumped off the couch (my girlfriend still doesn't understand what HN is but she got hyped seeing me hyped). 

Then panic set in — *I don't even have analytics set up*. 

Quick dive into Google Analytics setup (yes yes, I know, I'll switch to something open source soon, I hate Google's invasive monopoly as much as you do). 

The numbers started flowing in. Hundreds of views per minute. Over half from the US.

<blockquote class="twitter-tweet" data-dnt="true" data-theme="light"><p lang="en" dir="ltr">THANK YOU HACKERNEWS 🫡 <a href="https://t.co/vcaqsIMwLL">pic.twitter.com/vcaqsIMwLL</a></p>&mdash; nmn (@NamanyayG) <a href="https://twitter.com/NamanyayG/status/1875930895112351769?ref_src=twsrc%5Etfw">January 5, 2025</a></blockquote>

Here's what those first crazy hours looked like. I was really surprised to see how much the US dominates the audience of HN, I thought it would be somewhat more equally distributed:

<figure>
<img src="assets/hn-1-traffic.png" />
<figcaption>New users by hour and country. Time is in IST, so 21:00 PM is 7:30 AM PST</figcaption>
</figure>

Another surprising fact was how much the traffic was from mobile. I thought it would be more desktop. However, this data point is skewed because of how most HNers would have ad blockers enabled on their desktop browsers:

<figure>
<img src="assets/hn-1-devices.png" />
<figcaption>Mobile vs Desktop traffic</figcaption>
</figure>

But the real gold wasn't in the traffic. It was in the *discussion*.

## How HN really feels about AI

Reading through 200+ comments was like watching a fascinating experiment unfold. The evolution of the discussion revealed deep insights about how we *really* think about AI.

### Phase 1: "Show me the code" (Hours 0-2)

The initial response was pure, unfiltered HN energy. Multiple users immediately pointed out that my implementation details were too vague:

> "This hard coded string is doing some very heavy lifting. This isn't anything special until this string is also generated accurately and consistently for any reasonable PR."

*Oof. Fair point.*

What's fascinating is how the early technical criticism followed a pattern:

* Request for implementation details
* Skepticism about real-world application
* Discussion about evaluation methods

But here's what I didn't expect: the harshest technical critics often became the most engaged participants. 

The technical scrutiny made the discussion *better*. People weren't just criticizing — they were sharing real solutions and experiences.

### Phase 2: "Let me tell you about my AI adventures" (Hours 2-5)

As the post gained traction, something shifted. The discussion evolved from "prove it works" to "here's what I've seen work".

Developers started sharing war stories that revealed a fascinating pattern: everyone's using AI, but nobody's quite sure if they're using it right.

> "Just the other day I used cursor and iteratively implemented stories for 70 .vue files in few hours... something that would've taken me at least few days if not a week."

The really interesting part? Almost everyone who shared a success story immediately followed it with a caveat. And everyone who shared a failure had a "but sometimes it's amazing" moment.

This phase had the most nuanced takes. No one was purely pro or anti AI — just developers sharing real experiences and trying to make sense of this new world.

### Phase 3: "But what does it all mean?" (After Hour 6)

As the comment section grew, the discussion took an interesting turn. Technical nitpicking gave way to broader discussions about AI tools in general.

The anthropomorphization debate kicked off when one user pointed out:

> "Another cherry-picked example of an LLM doing something amazing, written about with a heavy dose of anthropomorphism."

This sparked a fascinating thread about how we talk about AI. Another user defended the approach:

> "To me, articles like this are not so interesting for the results... The problem is that there is still mystery on how to use them effectively. Articles like that are great for learning new prompting tricks."

### What The Comments Actually Revealed

Looking at all the discussion, there's a clear pattern in how different groups approach AI tools. It's not about pro-AI vs anti-AI — it's about how much context you need before trusting the output.

Even the skeptics are using these tools — they're just very specific about where and how.

That's probably why the post resonated. We're all trying to figure out how to use these tools effectively without breaking production. Some are just more... vocal about it than others.

## The numbers behind the noise

The post stayed at #1 through Sunday morning. Here's what that looked like in cold, hard data:

<figure>
<img src="assets/hn-1-geo.png" />
</figure>

<figure>
<img src="assets/hn-1-cities.png" style="max-width: 100%; width: 20rem;" />
<figcaption>Top 10 cities by readers. And thanks for completely deleting #8, Google!</figcaption>
</figure>

The US dominated with 3.5k readers, followed by UK (600) and Germany (560). What's interesting is the city breakdown:

New York led with 355 readers, beating out Silicon Valley cities. This surprised me &mdash; I expected the bay area to dominate. The full top tech hub list:

* New York: 355
* London: 296
* San Jose: 222
* Seattle: 192
* San Francisco: 159
* Los Angeles: 144

Two things stand out:

* East Coast tech showed up strong (NYC readers > all Bay Area combined)
* European tech hubs made their presence known (London + Frankfurt + Berlin = 521 readers)

In total, 8,500+ people read the post. Not bad for a Sunday morning blog about AI understanding code.

## Critical questions we need to solve

Reading through the discussion threads revealed something fascinating: while every comment approached AI differently, they all circled around the same core problems.

The technical debates weren't really about my implementation — they were about fundamental challenges we're all facing:

First, there's the context problem. How much project context does AI need before it can make meaningful suggestions? More importantly, how do we provide that context efficiently? Several developers shared stories of AI seeming to understand their codebase, only to make changes that broke implicit patterns.

Then there's the evaluation challenge. We know how to measure if code works, but how do we measure if AI truly understands what it's modifying? The discussion showed that "working code" isn't enough — we need ways to evaluate understanding.

But perhaps the most interesting questions came from teams already using AI. They weren't asking if AI works, but how to work with it. When should AI suggest vs make changes? How do we maintain developer understanding when AI is modifying multiple files? What's the right feedback loop?

## What's next

This weekened discussion revealed something bigger than just AI and code. It showed how our relationship with development tools is evolving.

A year ago, AI coding discussions centered around replacement fears and capability debates. Now? We're deep in the trenches, figuring out integration patterns and evaluation frameworks. The question isn't whether to use AI — it's how to use it effectively.

That's probably why this resonated. We're all exploring this new territory, trying to find the right balance between automation and understanding, between efficiency and control.

The next few years will be fascinating. Not because AI will get better at coding (it will), but because we'll get better at working with AI. The tools will evolve, but more importantly, so will our understanding of how to use them.

I'm excited to keep exploring these questions, and based on this discussion, I'm not alone. If you're interested in this evolution of development, reach out (twitter  [@NamanyayG](https://x.com/NamanyayG) or email hi [at] nmn.gl). 

The problems are real, the concerns are valid, and the solutions aren't obvious. But fortunately, we're software developers. And we're used to solving problems.