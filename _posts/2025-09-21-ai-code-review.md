---
title: "Rethinking Code Reviews in an AI-first World"
layout: post
date: 2025-09-21
categories:
 - ai
 - startups
excerpt_separator: <!--more-->
# image: /assets/vibe-coding-gambling.png
# twitter_image: /assets/vibe-coding-gambling.png
# twitter_card: summary_large_image
# social_metrics:
  # views: "150,000+"
  # reddit: "400+ votes"
prevent_syndication: true
---

_My journey into new ways of writing code and new ways of ensuring code quality._

Last week I asked Claude Code to add user notifications to my app.

One prompt, few minutes of waiting, and it gave me a result. I tested it briefly and it seemed to work. Great!

But, diving deeper and reviewing the code, I noticed a glaring problem: Turns out, it completely bypassed my existing `User` service. Instead of using the existing utility modules, it wrote new database queries from scratch. 

The feature worked fine, but at the end of it, I had two different ways to look up users scattered across my codebase. <em>Thanks, I guess?</em>

This has happened to me a lot, from GPT 3.5 to Sonnet 4. So that's why, a few weeks ago, I decided to dive deeper and solve it for once and for all.

## The Problem

AI can write code faster than any human, which feels incredible at first. You're shipping features in hours instead of days.

But after a few months, you start noticing that simple changes start taking more time. What should be a quick fix, becomes an exercise in figuring out which of the different patterns this particular feature is using.

<figure>
  <img src="{{ '/assets/ai_vs_brain_speed.png' | relative_url }}" alt="AI vs Human: Speed" style="width: 100%; max-width: 20em;">
  <figcaption>AI makes generating code faster. But how much tech debt do we accumulate?</figcaption>
</figure>


With AI, I was promised that I'll move fast. Instead, I was often dealing with more cruft and technical debt than necessary.

## AI is Different

AI writes code that often misses existing patterns and conventions, which is completely different from how human developers work.

When a human developer adds user registration, they look around first. They see your existing User model, notice how you handle validation elsewhere, and follow those patterns. They ask questions if something seems unclear. They **rely on the conventions of the existing codebase before thinking to re-invent the wheel**.

AI also finds existing code, but it often misses the broader patterns and conventions. Ask it to add user registration and it might use your User model but completely ignore how you handle validation in the rest of your app. Or when you need to send an email, it might find your email service but implement error handling completely differently from everywhere else.

AI solves for immediate results without considering how it fits into your existing architecture. It optimizes for the specific request, rather than consistency across your codebase.

## A Slow Disaster

Here's what the AI journey looks like for a new builder: Month one feels incredible. You're shipping faster than ever. 

Month three, you start noticing weird inconsistencies. 

Month six, adding features becomes a nightmare. Every change requires understanding three different approaches to the same problem.


<figure>
  <img src="{{ '/assets/ai_vs_brain_complexity.png' | relative_url }}" alt="AI vs Human: Speed" style="width: 100%; max-width: 25em;">
  <figcaption>When humans write code, we naturally manage complexity. With AI and vibe coding, complexity is unbounded and tech debt accumulates.</figcaption>
</figure>

I've felt that myself -- on days when I'm <s><a href="/blog/vibe-coding-gambling">vibe coding</a></s> trusting the AI more than I should be, I usually end up making a mess of the codebase. Until I refactor, changing features begins to take much longer. Simple changes require debugging across multiple files.

## What Actually Works

I learned the hard way that you need completely different review processes.

1. Review constantly, not occasionally. AI generates too much code too fast for weekly reviews. You need to catch problems before they metastasize.

2. Focus on patterns, not bugs. Don't ask "does this work?" Ask "does this fit?" Does it use existing modules? Does it follow established conventions? Is it the simplest solution?

3. Make it automatic. Stopping to review breaks your flow. The review needs to happen in the background while you keep building.

This led me to build review systems that catch AI's pattern-breaking habits before they destroy your architecture.

## My Solution

Traditional code review assumes human development patterns—working on features for days, then submitting pull requests. Reviewers look for bugs and logic errors.

AI development is different. You generate hundreds of lines in minutes, multiple times daily. The mistakes aren't implementation errors; they're architectural. AI uses wrong modules, implements patterns inconsistently, or overcomplicates simple problems.

These patterns emerge over time across multiple AI features. You need frequent checks focused on consistency and architectural coherence, not just correctness.

That's why I've added a new "Review" feature in my product. It catches when AI reinvents existing functionality or overcomplicates solutions. Instead of reviewing after the fact, it flags problems as you build.

When you ask AI to add user notifications, Giga notices if it's bypassing your existing User service. When AI writes new database queries, it checks if similar functionality already exists. When patterns start diverging, you know immediately.

It builds on top of my existing "Giga Context" innovation, which uses a proprietary algorithm to help [AI understand your codebase like a senior developer does](https://nmn.gl/blog/ai-understand-senior-developer).

If you've been facing the problem of poor quality code, I invite you to check it out -- it's easy to get started and built for founders and engineers who want to move fast. [Learn more about Giga AI](https://gigamind.dev/).

## The Other Side

AI can write code faster than any human. But without proper review, it will build you a house of cards that looks beautiful until you try to change anything.

When you catch AI's mistakes early, everything changes.

Your codebase stays more consistent. New features don't require as much time figuring out which existing pattern to follow. Adding functionality becomes more straightforward because there's less cruft to work around.

You ship fast, and can keep shipping fast.
