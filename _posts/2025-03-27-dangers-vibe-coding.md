---
title: "Karpathy’s ‘Vibe Coding’ Movement Considered Harmful"
layout: post
date: 2025-03-27
categories:
 - ai
 - vibe-coding
excerpt_separator: <!--more-->
# image: /assets/ai-and-learning-meta.jpg
# twitter_image: /assets/ai-and-learning-meta.jpg
# twitter_card: summary_large_image
# social_metrics:
  # views: "1,000,000"
  # reddit: "2,500+ votes"
  # hackernews: "100+ comments"
is_featured: false
---

Last Tuesday at 1 AM, I was debugging a critical production issue in my AI dev tool. As I dug through layers of functions, I suddenly realized — unlike the new generation of developers, I was *grateful* that I could actually understand my codebase. That's when I started thinking more about Karpathy's recent statements on vibe coding.

For those who missed it, Andrej Karpathy recently shared his thoughts on what he calls "vibe coding" — essentially surrendering code comprehension to AI tools and hoping for the best. His exact words? *"I 'Accept All' always, I don't read the diffs anymore."* 

I have learnt a lot from Karpathy and use AI tools daily, but there's a world of difference between augmenting your capabilities and completely surrendering your understanding.

<!--more-->

## Hidden Costs of Vibing

Last month, I encountered a particularly annoying bug in my payment system. The code looked clean — (since ChatGPT had helped me write it). But when users started reporting random issues with their payments not being recognized, I couldn't just paste the error into an AI and pray. I had to understand the underlying payment management logic and the exact request flow to fix it.

This is where "vibe coding" falls apart. The real problem isn't just about reading code — it's about maintaining the intellectual ownership of our systems. When Karpathy says *"The code grows beyond my usual comprehension, I'd have to really read through it for a while,"* he's describing a [fundamental breakdown in engineering responsibility](/blog/ai-illiterate-programmers). 

## Exponential Technical Debt

Technical debt compounds **exponentially** when [you don't understand your code](/blog/ai-and-learning). Each "vibed" solution becomes a black box, and these black boxes multiply. Soon, you're building on top of foundations you don't comprehend.

A recent feature I implemented initially took this route. The AI-generated solution worked, but when I needed to optimize it for performance, I was stuck. I couldn't optimize what I didn't understand. I ended up rewriting it from scratch, this time ensuring I understood every line.

## Security Nightmares

The [security implications](/blog/vibe-coding-fantasy) of "vibe coding" are... unreal. When you don't understand your code, you can't properly assess its vulnerabilities.

Last week, I reviewed some AI-generated authentication code that looked perfectly fine at first glance. But upon closer inspection, the OpenAI API keys were exposed to anyone who knew how to inspect the network calls. This kind of oversight happens when we trust AI without understanding security best practices.

## A Better Path Forward

The real danger isn't in using AI — it's in surrendering our understanding to it. Vibe coding might work for a weekend project, but it's catastrophic for any serious software.

While coding my AI that makes [software development faster](https://gigamind.dev/), I've developed a comprehensive approach that balances AI assistance with engineering excellence:

1. When using AI tools, start with a clear architectural vision. Before generating any code, document your requirements, constraints, and expected behavior. This becomes your validation framework for any AI-generated code.

2. Instead of accepting entire functions or components from AI, break them down into smaller, understandable chunks. I've developed a three-step process:
  * Generate small, focused pieces of functionality
  * Review and understand each piece thoroughly
  * Integrate only after validation and testing

3. Make sure the [AI has a complete context about your project](https://gigamind.dev/). It should include:
  * Why the project exists
  * Business logic, explaining the "why" not just the "how"
  * How various subparts of the project interact with each other
  * Where and how are important third party dependencies used
  * Explanation of the data schema and model 

4. Develop a testing strategy that forces you to understand the code:
  * Write tests before accepting AI-generated code
  * Test edge cases explicitly
  * Implement integration tests that verify system behavior, or at least do that manually

5. Even as a solo developer, I maintain a strict code review process for AI-generated code:
  * Review all generated code as if it came from a junior developer
  * Verify security implications
  * Ensure proper error handling

<!-- newsletter_widget -->

## Looking Forward

We're at a crucial junction in software engineering. The path of "vibe coding" might seem appealing, offering quick solutions and temporary productivity boosts. 

But the real innovation, the sustainable progress, comes from maintaining deep understanding while embracing AI's capabilities.

The next time you're tempted to blindly accept AI-generated code, remember: true engineering excellence isn't about velocity — it's about building systems you can understand, maintain, and evolve. 

Now *that's* a vibe worth protecting.