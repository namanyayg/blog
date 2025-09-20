---
title: "Rethinking Code Reviews in an AI-first World"
layout: post
date: 2025-09-25
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
# prevent_syndication: true
---

Code reviews tradtionally happen during the "pull request" stage, which is a culmination of an individual developer's work over multiple days and sometimes weeks.

But with AI writing 90%+ code, does the traditional code review process even make sense anymore?

There needs to be a new way to review AI generated code, which has quite fundamentally different requirements to the traditional way of coding.

## Traditional code review 

_screenshot of me showing an old code review_

If you notice this code review, you'll see it's code written over multiple commits with multiple rounds of feedback from my reviewer.

The way it worked is a "maintainer" enforced a certain code guide, and was the person with a full domain knowledge of the project, to guide a junior developer (me) to ensure code meets the quality standards, but more importantly, doesn't contain any mistakes or obvious pitfalls that can cause regressions or bugs before the code goes to production.

Fundamentally, the code review stage has been a time where domain-specific knowledge is transferred from a senior developer who understands the entire codebase, to a junior developer who has incomplete knowledge of the code and the organisation's practices.

## Thinking about AI generated code

AI generated code follows similar patterns -- where the human developer is the "senior" and the AI is the "junior". But with some fundamental differences:

- A human developer clarifies the spec to their best of the ability, before writing any code
- A human developer validates, tests, and runs the actual code with various edge cases to confirm it matches the original requirements
- A human developer does their best to understand the existing code conventions before writing new code
- **A human developer learns from their mistakes**

This is in complete contrast to AI generated code, which:

- **Always** generates a lot of code -- often without understanding complete requirements
- **Does not** test code -- AI will happily say that code is working, without testing or running it. Even it has the ability to test the code, it often mocks the test to make them pass rather than actually ensuring it works as expected.

And of course, the biggest difference is the **quantity** -- AI can easily generate 1000s of lines of codes in minutes.

So, how do we think about code reviews in a world where AI is generating code for us that has 100x the speed of any normal human and dubious quality? I'll focus the rest of the article thinking about these two axes.

  