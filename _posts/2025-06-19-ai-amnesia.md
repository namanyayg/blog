---
title: "There's a Better Way to Code with AI"
layout: post
date: 2025-06-19
categories:
 - ai
 - startups
excerpt_separator: <!--more-->
post_promotion_type: hidden
is_featured: true
---

Every developer I know has the same frustrating ritual. Open Claude Code or Cursor and ask it to do a task. The AI gives you generic code, sometimes useful (but usually not). You correct it. It apologizes. You explain again, with additional context. 

Rinse, repeat, until you want to throw your laptop out the window.

[David Cramer from Sentry](https://x.com/zeeg/status/1935402230062190672) recently shared his AI workflow where he maintains manual rules files to give LLMs context. Solid approach, but it feels like too much copy-pasting. It's 2025, and machines can do a better job of remembering things.

It's funny how we've built the most powerful reasoning systems in human history, then lobotomized them by making them forget everything after each conversation. My question: is there a better way?

<!--more-->

## The Story

Until recently, my daily routine looked like this:

1. Open Claude Code/Cursor
2. Explain the task
3. It gives a wrong result on the first try
4. Retry, this time with more context
5. It gives a wrong result on the second try
6. Spend 30 minutes fixing it
7. Close the conversation in frustration
8. Repeat the next day

I was essentially training the same AI from scratch every single day. _The definition of insanity, right?_

That's when it hit me: The AI isn't the problem. The conversation model is.

## Building a Second Brain

I started thinking about how human teams actually work. Senior developers don't explain the entire codebase to new hires every morning. They build institutional knowledge. **They have coding standards, architectural decisions, and learned preferences that persist.**

So I built Giga — an AI memory system that learns from your conversations and builds a persistent knowledge base. **Not another rules file you maintain manually, but a system that watches how you code, what you prefer, and what decisions you make.**

I made a "reflect" command which allows the AI to look back on it's own conversation to identify patterns. While dogfooding it, I noticed something magical happening. Giga confidently identifies actual patterns, saves them as "neurons" in the second brain, and allows me to evoke them when I need them. 

My AI is finally able to remember my preferences, and it uses them to make better decisions.

## How to Fix Your AI Workflow

If you're tired of the hamster wheel, here's what actually works:

* Question the reset. Why are you starting fresh every time? Your conversation history is data. Your corrections are training examples. Your preferences are valuable.
* Build incremental context. Instead of massive context dumps, add one new piece of information per conversation. Let the AI learn gradually, like a human would.
* Think in systems, not conversations. Individual AI chats are tactics. Building persistent AI knowledge is strategy.

## The Path Forward

The future isn't necessarily more powerful models. It's AI that remembers, learns, and gets better over time — like a real team member.

We're at an inflection point. We can keep playing the role of human context providers, or we can build systems that actually learn and improve.

I'm betting on the latter.

The question isn't whether AI will get smarter. It's whether we'll get smarter about using it.

_Building Giga taught me that the best way forward with code generation AI isn't about better models — it's about better context and memory. Giga is in private beta and only available for select teams, but if you're interested in seeing how persistent AI knowledge works in practice, [shoot me an email](mailto:hello@gigamind.dev) and I'd love to show you a demo._