---
title: What do the 12,000 lines per day I write actually do
layout: post
date: 2026-08-10
categories:
 - saas
 - ai
excerpt_separator: <!--more-->
post_promotion_type: giga-catalyst
twitter_card: summary_large_image
# social_metrics:
#   hackernews: "XXX+ votes"
#   views: "XXX"
---

[^6]<figure><img src="{{ '/assets/how-i-actually-write-10000-lines/what-do-the-13-000-lines.png' | relative_url }}" alt="What do the 13,000 lines per day I write actually do" class="img-medium"></figure>

pg recently [retweeted](https://xcancel.com/paulg/status/2086976755718664253) this from when he posted this last year, which made me check out how much lines of code I ship. Here it is below:

To be honest, I focus on growth as a CEO, so this isn't something I'd consider very high. But I still got a chuckle out of seeing 12,000/day. 

Only a couple of years ago this would’ve been a good LoC count for a month!

<figure><img src="{{ '/assets/how-i-actually-write-10000-lines/what-do-the-13-000-lines-3.png' | relative_url }}" alt="What do the 13,000 lines per day I write actually do" class="img-medium"></figure>

Of course, shipping tens of thousands of lines of code is considered the "new normal" these days. But I notice a lot of discourse on HackerNews about this, so I'll tell you a little bit about what I actually ship in a day.

<!--more-->

## Tooling

I usually have 3 or 4 sessions of Codex in the ChatGPT app, and 4 terminals of Claude on Ghostty.

I don't use an orchestrator, I tried some of them last year and they left a sour taste in my mouth because they were so buggy and slow.

We also use Devin because it has the best browser automation, so the AI is able to do UI work and testing on the cloud.

Using AI as an effective tool for code generation vs blindly vibing means you have to pay close attention to context and testing harnesses. That’s where I invest ~10% of my development time and have countless skills and scripts built over the last year.

## Product Work

I've been working on an AI agent embedded inside SaaS software. Our customers are SaaS companies, who use us to allow their customers to build [dashboards](https://gigacatalyst.com/dashboard-analytics-bi) and apps.

These days, I'm taking the time to think from first principles and really improve the architecture and data model, making our platform much more configurable and easier to self-serve.

<figure><img src="{{ '/assets/how-i-actually-write-10000-lines/product-work-2.png' | relative_url }}" alt="What do the 13,000 lines per day I write actually do" class="img-medium"></figure>

If you're a programmer, you know how it works: you create the MVP product with some assumptions, but when your users actually use it, you realize that there are so many things you misunderstood.

For us, since we have real customers, we were able to generate a lot of synthetic test cases and scenarios modeled after the real world. Using that as a reference, I was able to get AI to generate reliable code. With the correct restraints and plans, it's really impressive to fire off agents overnight and see them come up with working solutions!

So while this month has been about a refactor, I think I'm really seeing [Jevons paradox](https://en.wikipedia.org/wiki/Jevons_paradox)[^2] play out in action. We'd probably would've chugged along for longer in our old codebase without AI -- but because we can write more code with confidence, we are braving a refactor.

## GTM Engineering

This, probably, has been the most unexpected type of engineering that I've been doing a lot recently. [^3]

As our GTM motion has matured, I have figured out some key things that work and don't work, and I've set out to create a tool that does these really well. 

I've been using it internally for the couple of weeks and have doubled my reply rates!

It all starts by finding the correct people who want what I've built[^4]. Using Sales Navigator, LinkedIn Search, and data from my past sales, the AI finds more people with similar titles. It favors people that are closer connections or the company they work at are similar to the existing customers I have.

<figure><img src="{{ '/assets/how-i-actually-write-10000-lines/gtm-engineering-3.png' | relative_url }}" alt="What do the 13,000 lines per day I write actually do" class="img-medium"></figure>

It then performs multi-day sequences on LinkedIn: sending a connection request, liking, messaging, etc.

It actually tests these out, and identifies statistically significant results based on reply rates and meetings booked.

<figure><img src="{{ '/assets/how-i-actually-write-10000-lines/gtm-engineering-5.png' | relative_url }}" alt="What do the 13,000 lines per day I write actually do" class="img-medium"></figure>

It also automatically identifies my competitors, and follows their posts to find people who engaged with it and runs a different sequence on them.

<figure><img src="{{ '/assets/how-i-actually-write-10000-lines/gtm-engineering-4.png' | relative_url }}" alt="What do the 13,000 lines per day I write actually do" class="img-medium"></figure>

Whenever someone replies, it pings me on Slack and automatically drafts a reply for me.

<figure><img src="{{ '/assets/how-i-actually-write-10000-lines/gtm-engineering.png' | relative_url }}" alt="What do the 13,000 lines per day I write actually do" class="img-medium"></figure>

<figure><img src="{{ '/assets/how-i-actually-write-10000-lines/gtm-engineering-2.png' | relative_url }}" alt="What do the 13,000 lines per day I write actually do" class="img-medium"></figure>

I approached it differently than what you'd expect most "vibe coded" projects to be like -- I spent careful time designing the architecture, data model, and observability -- because I was my own user and the better software I built the more valuable it is for me!

{% include catalyst_lead_form.html
   form_name="blog-10k-lines-multiplier"
   form_id="lead-10k-lines"
   heading="This GTM system is a product now"
   blurb="Multiplier runs the whole loop I just described — find buyers, test messages, ping you on Slack when someone replies. Leave your work email and I'll show you how it'd work for you." %}

## Customer-Specific Work

As part of selling to larger customers, we have to do a lot of work integrating with their authentication and API systems.

It's complex work. It involves digging through legacy codebases and esoteric data sources, but that's essentially what the larger businesses pay us for.

In the last couple of weeks, we have:

* Resolved an issue where different customer deployments used different authentication secrets -- but they look very similar so no one really got to know till we deployed and broke stuff
* Added support for snowflake database connections with different schemas per-tenant that actually mean the same thing
* Integrated authentication where one administrator token is used to get specific privileges for user sub-accounts.

etc etc.

Although mundane, this work is rewarding because of how it encompasses problems around data modelling, performance, quality tradeoffs, which excite the engineer in me.

This work often requires going through a lot of documentation and writing rigorous API tests to prevent regressions, and is something that humans hate to do. This unique combination makes it apt for AI.

## So... Is 10,000 lines like a lot?

_TL;DR It is, but for some type of companies, it's not._

In almost all of the cases where you're seeing people write tens of thousands of lines, it is going to be new code and greenfield projects. 

It probably will have something to do with third-party integrations and most likely to be something that is easy to test and verify quickly.

AI still creates a lot of opportunities to lose your brain to psychosis, where the sycophancy convinces you that every new feature you build is world-changing. So whether the generated code will be _valuable_ or create _outcomes_ is still uncertain.

If you're an experienced programmer in a larger company, it is probably a very bad idea to ship 10,000 lines of code. Your job mostly depends on not breaking things for the thousands of customers you have.

A few hundred lines of code can deliver thousands of dollars in additional revenue for an established company, so a senior developer is slow[^6]. 

On the other hand, the young founder is desperate and no users, so they can Move Really Fast And Break Things™

So what about you, where do you stand? How many lines of (effective) code are you able to write, and how much of that changed with AI?

[^2]: which out to really be called Jevons law tbh

[^3]: I think [Clay](https://www.clay.com/blog/gtm-engineering) invented the term a few years ago. But it is much more advanced now!

[^4]: a.k.a. "leads" in marketing-speak, but I never really liked that word

[^5]: yes, I cringed as I wrote this out myself, but I sorta think it's real.

[^6]: unless you're working in a company where millions of lines of code can result in millions of additional revenue e.g. Anthropic

