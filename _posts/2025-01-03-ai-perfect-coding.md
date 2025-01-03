---
title: "AI can write perfect code that's perfectly wrong - Here's why"
layout: post
date: 2025-01-03
categories:
  - ai
  - dev
  - giga
excerpt_separator: <!--more-->
---

Last month, I asked Claude to help refactor a React component. The code it wrote was beautiful - clean, well-documented, following all the best practices. 

It also quietly broke our error tracking system, removed a crucial race condition check (that admittedly looked like a bug), and duplicated three utility functions with slightly different implementations.

Sound familiar?

The AI coding space is exploding right now. Cursor hit $50M ARR, Lovable.ai reached $4M in 4 weeks, and every day there's a new "AI-powered IDE" on Product Hunt. Clearly, developers want AI assistance.

Yet despite these impressive numbers, I believe current AI coding tools are fundamentally solving the wrong problem. That's why I'm building another one.

<!--more-->

## The Problem Isn't Code Generation

I've spent countless hours with current AI coding tools. The code generation is mind-blowing. The autocomplete feels magical. But there's a deeper issue that becomes apparent only when you use these tools on real projects.

A Reddit comment perfectly captured it (sic): "Have AI agent fix what I ask for and on the way break 2-25 other things is the usual timesink where 95% of my time spent with agents goes to."

This resonated deeply with me. Why? Because it's not about the AI writing bad code - the code is usually quite good! It's about the AI not understanding the hidden complexity and implicit patterns in our codebases.

I recently asked AI to add error handling to a component. The code it generated was clean and followed best practices. It also:
- Added try-catch blocks that swallowed errors we specifically want to bubble up
- Created new utility functions that slightly differed from our existing ones
- Removed what looked like duplicate checks but were actually handling edge cases we discovered months ago

All technically correct code... that subtly broke our established patterns.

## The Missing Piece: Project Context + Memory

When a senior dev joins your team, they don't immediately start rewriting components. They take time to understand the invisible things:
- Why that weird-looking useEffect is actually handling a crucial race condition
- Why we're using a specific pattern for error handling
- Which parts of the "messy" code are actually addressing important edge cases

Yet somehow, we expect AI to skip this crucial step and generate code in a vacuum.

I surveyed 33 developers about their AI tool usage. 76% use AI for code generation, but 85% reported spending significant time fixing AI-generated inconsistencies. Not because the code was bad, but because it didn't align with their project's reality.

## A Different Approach

This is why I'm building a new AI coding IDE extension that prioritizes understanding over generation. Instead of seeing each request in isolation, it maintains project memory through git history, commit messages, and codebase patterns.

The technical challenges are significant. But based on the conversations I've had, this project understanding is the missing piece in current AI coding tools. Line-by-line code generation is incredibly powerful, but without project context, it's like having a brilliant programmer with severe short-term memory loss.

I'm building this in public and would love to hear your thoughts. How do you currently maintain project knowledge with AI tools? What aspects of project context do you find most important?

*P.S.:* The project is in early development, with the first feature (project context management) already available. If you're interested or want to know more, DM me on X ([@namanyayg](https://x.com/namanyayg)) or email me (hi [at] nmn.gl).