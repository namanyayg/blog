---
title: "The future of UI is no UI"
layout: post
date: 2025-06-28
categories:
 - ai
excerpt_separator: <!--more-->
social_metrics:
is_featured: false
post_promotion_type: giga-reviewer
---

*people haven't realized this, but the humble chat box is going to completely upheave the world of apps and windows*

For the longest time, AI was _just_ text.

Type text in, get text out.

But what can you _really_ do with text? Read and learn things? Ew, [no one wants to do that](https://nmn.gl/blog/ai-and-learning).

OpenAI innovated with something called "tool calling" (a fancy way for AI to call functions), and Claude further innovated with MCPs (a fancier way for AI to call functions, in a standardized way).

What seems to have gone unnoticed is how _massive_ MCPs can be, in destroying the complete idea of "individual apps".

Don't believe me? Let me try to change your mind.

<!--more-->

## What are apps, really?

For 90% of users, apps are simple windows into _data_. 

The most common apps are question-answers (google/claude/chatgpt), communication (email/text/whatsapp), entertainment (tiktok/youtube). Most people don't use anything outside of these. For the purposes of this article, we are only focused on the average user and ignoring power users like programmers.

In all the apps above, do you _really_ think that UI is any distinguishing factor? It's all the same.

* Q-A: you enter a "query" and get some "results".
* Communication: you have an "inbox", you choose a "message thread", and you "compose" a reply. 
* Entertainment: all the algorithmic feeds look literally the same. You swipe and watch passive videos/images.

Forgetting the UI for a second, just focus on the _flow of data_. The heaviest flow of data is in communication, where you need to parse a dense inbox and select threads to interact inside.

For QA and entertainment, it's even easier. You barely require an input from the user, it is mostly passive consumption on their part.

The key insight is that _all of this is ripe to be disrupted by AI_.

My hot take is that the chat box is actually _superior_ to using multiple apps, because the convenience of being able to do all of the above in one place is highly preferable to switching back and forth between apps and managing their inconsistent UI.

Unified Q&A is already solved. Perplexity was one of the first to innovate on that, but their features have entirely been replicated in the latest versions of ChatGPT and Claude.

Unified communication and entertainment don't exist (yet), but it's easy to image a single AI app (which I'm calling the "Everything AI") that does:

Unified communication:

* Morning brew of incoming emails, texts, etc; sorted by priority: I want to see messages from my family and friends first, then work later.
* Quick reply (in my [tone](https://koomen.dev/essays/horseless-carriages/)) without sounding like a pompous robot.

Unified entertainment:

* Fetch data from Reddit, X, TikTok, etc (trivial)
* Filter according to MY preferences (NOT the preferences of the algorithm creators, who optimize for rage and engagement vs genuine user interest)
* Allow the user to consume in a simpler format: I don't really _need_ to know the social media it originated from, or the number of likes/shares, right? I just need the content.
* Learns from the user: apply the TikTok model to everything, let it actually learn from the user based on their reaction and engagement.

Most of it is already possible, it's just not implemented yet. (Maybe I should make it? [Tell me](https://x.com/NamanyayG) if you want me to)

The next unlock, to make it actually work seamlessly, will be MCPs + Generative UIs.

## MCP++: MCPs but with UI

Current MCPs define a JSON response for their data.

That's cool, but it misses a fundamental point that _humans can't read JSON_.

A big issue with current MCPs is that they just give the JSON results for the AI to handle how it wishes.

That's not right. For a truly optimize consumptive experience, _some_ styled layout needs to be there. Like, you can't really process an entire "inbox" of communications just as prose, it needs an inbox-like UI.

## The Future

What if... you could _specify a UI_ along with your MCP specification?

Like, providing a _suggested UI_ along with the JSON, and then the AI client renders it on the go?

Here's some examples of what this might look like:

## What's Next?

This was an experiment inspired from [Pete Koomen's](https://koomen.dev/essays/horseless-carriages/) recent post about AI being horseless carriages. I especially loved the interactive demos he included, which are a direct inspiration for the demos I added here.
