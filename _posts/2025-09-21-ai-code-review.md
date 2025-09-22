---
title: "AI Makes You Code Faster, But Ship Slower"
layout: post
date: 2025-09-21
categories:
 - ai
 - startups
excerpt_separator: <!--more-->
image: /assets/ai-code-structure.png
twitter_image: /assets/ai-code-structure.png
twitter_card: summary_large_image
# social_metrics:
  # views: "150,000+"
  # reddit: "400+ votes"
---

_AI coding tools are creating a productivity paradox that nobody wants to admit._

I've been using AI to build my startup for a while now. The promise is simple—ship features faster, focus on the big picture, let AI handle the grunt work. And for the first few weeks, it felt magical. One prompt, few minutes of waiting, and suddenly I had working features.

But, on the longer term, I'm not sure how true that is. **AI is making us worse developers**, and we're too addicted to the dopamine hit of instant code to notice.

<!--more-->

## New Quirks

Last week I asked Claude Code to add user notifications to my app. One prompt, few minutes of waiting, and it gave me a result. I tested it briefly and it seemed to work. Great!

But diving deeper into the code, I noticed something unfortunate. It had completely bypassed my existing `User` service. Instead of using existing utility modules, it wrote new database queries from scratch.

The feature worked fine, but I now had two completely different ways to look up users scattered across my codebase. Thanks, I guess?

What's worse is that this wasn't a one-off.

From GPT 3.5 to Sonnet 4, I've watched AI consistently choose the path of _maximum immediate results_ with zero regard for long-term maintainability.

## Eventual Disaster

Here's how the AI development journey feels like for new developers:

Month one feels incredible. You're shipping faster than you've ever shipped in your life. Features that used to take days are done in hours.

Month three, you start noticing weird inconsistencies. Why do I have three different ways to handle errors? When did validation logic get scattered across seven files?

Month six becomes a nightmare. Adding what should be a simple feature requires understanding a complicated mess of your existing codebase.

**You spend more time trying to figure out the existing code than actually building anything new.**

I've lived this cycle. On days when I'm <s><a href="/blog/vibe-coding-gambling?utm_source=blog&utm_medium=ai-code-review&utm_campaign=internal-link&utm_content=vibe-coding-reference">vibe coding</a></s> trusting the AI more than my own judgment, I consistently generate worse code. Simple changes start requiring changes across multiple files.

## Why AI Fails

Human developers naturally manage complexity because we have to live with our decisions. When I need to add user registration, I look around first. I see the existing `User` model, notice how validation is handled elsewhere, and follow those patterns. I ask questions if something seems unclear. I default to existing conventions before thinking to reinvent the wheel.

AI finds existing code too, but it fundamentally misses the broader patterns and conventions. Ask it to add user registration and it might use your `User` model but completely ignore how you handle validation everywhere else. Or when you need email functionality, it might find your email service but implement error handling in a completely different way from the rest of your app.

AI optimizes for the immediate request, _not consistency across your codebase_. 

## AI's Complexity Tax

The real problem isn't that AI writes bad code—it's that **AI writes code that accumulates complexity faster than you can manage it.** 

Human developers naturally create abstractions and reuse patterns because _thinking is expensive_. 

AI doesn't have that constraint, so it _happily_ generates new solutions to similar problems all day long.

Every AI-generated feature adds not just functionality, but architectural entropy. Your codebase slowly transforms from a cohesive system into a collection of loosely related components that happen to run in the same process.

**The productivity gains you feel in month one are borrowed from your future self** who will have to maintain this mess.

## What Actually Works

I learned this the hard way, and if you're serious about AI-assisted development, you need completely different processes:

- **Review constantly, not occasionally.** AI generates too much code too fast for weekly reviews. You need to catch pattern-breaking before it metastasizes across your entire codebase.
- **Focus on consistency, not just correctness.** Don't ask "does this work?" Ask "does this fit?" Does it use existing modules? Does it follow established conventions? Is it the simplest solution given what already exists?
- **Make it automatic.** Stopping to manually review breaks your flow. The review needs to happen in the background while you keep building, flagging problems before they become architectural disasters.

Traditional code review assumes human development patterns—working on features for days, then submitting pull requests where reviewers look for bugs and logic errors. AI development is completely different. You generate hundreds of lines in minutes, multiple times daily. The mistakes aren't implementation errors; they're architectural. AI uses wrong modules, implements patterns inconsistently, or overcomplicates problems that already have simple solutions.

These patterns only become visible over time, across multiple AI-generated features. You need frequent checks focused on architectural coherence, not just correctness.

After months of fighting this problem, I ended up building review systems directly into my development workflow. This led me to create a new "Review" feature in my AI tool that catches when AI reinvents existing functionality or overcomplicates solutions. Instead of reviewing after the fact, it flags problems as you build.

It builds on my previous work helping [AI understand codebases](https://nmn.gl/blog/ai-understand-senior-developer?utm_source=blog&utm_medium=ai-code-review&utm_campaign=ai-code-review&utm_content=inline) at a deeper level -- with context across the codebase, the review stage is massively improved.

When you ask AI to add user notifications, it notices if AI is bypassing your existing `User` service. When AI writes new database queries, it checks if similar functionality already exists. **When patterns start diverging, you know immediately.**

It's also tuned to focus specifically on the kind of mistakes that AI generated code makes: issues of repetition, misusing existing code, and architectural problems. Here's an example of what that looks like:


<figure>
  <img src="{{ '/assets/giga-review.png' | relative_url }}" alt="Giga IDE Review" style="max-width: 30em; width: 100%;">
  <figcaption>
    With Giga, it's easy to review AI generated code right inside your IDE.
  </figcaption>
</figure>

If you've been facing this same problem of AI-generated tech debt, you might like what I made—[Learn more about Giga&nbsp;AI](https://gigamind.dev/?utm_source=blog&utm_medium=ai-code-review&utm_campaign=ai-code-review&utm_content=inline).

## The Other Side

When you get this right, your codebase stays consistent. New features don't require much time to figure out existing patterns. Adding functionality becomes straightforward because there's less cruft to work around.

Most importantly, you maintain that _initial velocity_. Month six doesn't become a nightmare of debugging across multiple files.

Simple changes stay simple. You get the best of both worlds—**AI's speed with human-level architectural thinking**.

You ship fast, and you can _keep shipping fast_.

## The Future

Most new developers using AI right now are creating technical debt faster than they realize. We're all optimizing for the _dopamine hit_ of working features while ignoring the mounting **complexity tax**.

But this doesn't have to be the future. AI can absolutely make us better developers—if we're willing to admit that _speed without sustainability_ is just a different kind of slowness.



