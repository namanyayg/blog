---
title: "Don’t Repeat Mistakes, Teach AI to Remember Every Code Review Instead"
layout: post
date: 2025-06-14
categories:
 - ai
 - startups
 - ai-in-sf
excerpt_separator: <!--more-->
image: /assets/ai-review-rules.jpg?v=2
twitter_image: /assets/ai-review-rules.jpg?v=2
twitter_card: summary_large_image
sharer_type: text-and-buttons
---

*This is part of my "AI in SF" series, where I share real AI engineering workflows from San Francisco startups. I recently interviewed engineers from Parabola (they’re hiring btw, more on that at the end). Here’s a technique to teach AI to learn from your mistakes.*

You know that feeling when you leave the same code review comment for the third time this month? "Hey, we use relative imports here, not absolute ones." Or "Remember to handle both null and empty string cases." Or "This should use our ORM helper, not raw SQL."

Your team agrees it's important. People follow it for some time. But three weeks later, nothing's changed, and you're still leaving the same comments.

I recently interviewed [C.J.](https://www.linkedin.com/in/cjcjameson/) and [Zach](https://www.linkedin.com/in/zach-m-1000000000/) from Parabola (a Series B data automation company) about how they use AI in their engineering workflow. They shared a simple approach that's replaced most of their linter rules: **teaching Cursor to remember code review feedback permanently**.

<!--more-->

## The Problem with Traditional Linting

Traditional linting can’t catch the nuanced "we don't do it that way here" patterns that come up in code reviews.

On the other hand, LLMs are perfect for this use case. Cursor rules are similar to “system prompts” for cursor, or extra instructions you provide to direct how it behaves. Here's how Parabola uses them: every time they spot a pattern in code review that should be avoided, they write a Cursor rule. After a PR review, they ask "how could we teach the AI to avoid this class of error in the future?"

<figure>
  <img src="{{ '/assets/ai-review-rules.jpg' | relative_url }}" alt="AI Review Rules" />
</figure>

Some examples that might come up in code reviews but ESLint can't catch:

```markdown
Comment Rules: when doing a large change or refactoring, try to retain comments, possibly revising them, or matching the same level of commentary to describe the new systems you're building
It's especially common that extra comments means that the previous/existing code has something weird going on. So either ask the human what to do and raise it before making a change, or think extra about what to do.

Package Usage: If you're adding a new package, think to yourself, "can I reuse an existing package instead"
(Especially if it's for testing, or internal-only purposes)
```

## Implementation Guide

* Start small — Pick the most common code review comment your team makes
* Write conversationally — Explain the rule like you're talking to a junior engineer
* Include examples — Show what to do and what not to do
* Be specific about scope — When should this rule apply?
* Commit to your repo — Make it part of your codebase so everyone benefits

## Reality Check

There are some caveats, namely:

* It's a 90% solution, not 100%. Their rules work most of the time, but stuff still slips through. You're not eliminating code review. 
* Different IDEs, different “rules” file conventions. Windsurf has .windsurfrules. Copilot has copilot-instructions.md. You need to understand and note the differences.
* Rules can get messy fast. Without some discipline, you'll end up with conflicting rules or overly broad ones that trigger when they shouldn't. You have to review your rules regularly, what made sense six months ago might not make sense now.

<!-- newsletter_widget -->

## When to Use

Use Cursor rules for:

* Team conventions that are hard to express in code
* Patterns that emerged from production incidents
* Style preferences that don't warrant build failures
* Complex logic patterns that would be tedious to lint

Keep traditional linters for:

* Security-critical patterns
* Industry-standard formatting
* Syntax errors that should break builds
* Rules that need to run in CI/CD

## The Compound Effect

After ~10 PRs, you'll have a collection of rules that represent your team's collective wisdom. New AI-generated code automatically follows patterns that used to require manual review cycles.

The beauty is that knowledge doesn't walk out the door when people leave. It gets encoded into how your AI writes code.

## Getting Started Today

Create a .cursorrules file in your project root. Add one rule based on the most recent code review comment you've made. Test it by asking Cursor to write code that would normally trigger that comment.

You'll be surprised how quickly this becomes valuable.

*Parabola is hiring senior engineers who think deeply about user experience and building tools that work for both technical and non-technical users. They're looking for people who care about ergonomics for different types of users — from someone automating one simple process to someone building complex, reusable data workflows. If building customer-centric data tools sounds interesting, they'd love to hear from you. Check out their [Parabola careers](https://parabola.io/careers).*

## Further Reading

* [My Cursor AI Workflow That Actually Works in Production](/blog/cursor-guide?utm_source=blog&utm_medium=ai-review-rules&utm_campaign=ai-review-rules)
* [Cursor AI Gold Standard Files Workflow](/blog/cursor-ai-gold-files?utm_source=blog&utm_medium=ai-review-rules&utm_campaign=ai-review-rules)
* [Context, Structure, Organization: Framework for AI-powered Development](/blog/ai-dev-tips?utm_source=blog&utm_medium=ai-review-rules&utm_campaign=ai-review-rules)
* [The day I taught AI to think like a Senior Developer](/blog/ai-understand-senior-developer?utm_source=blog&utm_medium=ai-review-rules&utm_campaign=ai-review-rules)
* [AI Prompt Playbook (Prompts that Work in Production)](/blog/ai-prompt-engineering?utm_source=blog&utm_medium=ai-review-rules&utm_campaign=ai-review-rules)