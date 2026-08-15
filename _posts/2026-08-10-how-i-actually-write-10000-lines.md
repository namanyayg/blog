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

<figure><img src="{{ '/assets/how-i-actually-write-10000-lines/what-do-the-12-000-lines.png' | relative_url }}" alt="What do the 12,000 lines per day I write actually do"></figure>

pg recently [retweeted](https://xcancel.com/paulg/status/2086976755718664253) this from when he posted this last year, which made me check out how much lines of code I ship. 

I've attached a picture below. Only a couple of years ago this would’ve been a good LoC count for a month!

<figure><img src="{{ '/assets/how-i-actually-write-10000-lines/what-do-the-12-000-lines-3.png' | relative_url }}" alt="What do the 12,000 lines per day I write actually do"></figure>

Of course, shipping tens of thousands of lines of code is considered the "new normal" these days. I focus on growth as a CEO, so this isn't something I'd consider very high now. But I still got a chuckle out of seeing 12,000/day.

I notice a lot of people on HackerNews being skeptical (rightfully so), so I'll tell you a little bit about what I actually ship in a day.

<!--more-->

## Tooling

Using AI as an effective tool for code generation vs blindly vibing means you have to pay close attention to context and testing harnesses. That’s why I have countless skills and scripts that I've been honing over the last year.

I usually have 3 or 4 sessions of Codex in the ChatGPT app, and 4 terminals of Claude on Ghostty.

I don't use an orchestrator, I tried some of them last year and they were buggy and slow. That entire category left a sour taste in my mouth.

We also use Devin because it has great browser automation with cloud agents, so the AI is able to do UI work and testing on the cloud.

## Product Work

I've been working on an AI agent embedded inside SaaS software. Our customers are SaaS companies, who use us to allow their customers to build [dashboards](https://gigacatalyst.com/dashboard-analytics-bi) and apps.

<figure><img src="{{ '/assets/how-i-actually-write-10000-lines/product-work-2.png' | relative_url }}" alt="What do the 12,000 lines per day I write actually do"></figure>

These days, I'm taking the time to think from first principles and really improve the architecture and data model, making our platform much more configurable and easier to self-serve.

If you're a programmer, you know how it works: you create the MVP product with some assumptions, but when your users actually use it, you realize that there are so many things you misunderstood while designing the original architecture.

Since we have real customers, we are able to generate a lot of synthetic test cases and scenarios modeled from our real-world usage. Using that as a reference and strict testing, we are able to get AI to generate reliable code. With the correct restraints and plans, it's really impressive to fire off agents overnight and still see them come up with working solutions!

I'm really seeing [Jevons paradox](https://en.wikipedia.org/wiki/Jevons_paradox)[^1] play out in action. This refactor wouldn't exist in a pre-AI world. We'd probably would've chugged along for longer in our old codebase without AI -- but because we can write more code with confidence, we are braving a refactor.

## GTM Engineering

This, probably, has been the most unexpected type of engineering that I've been doing a lot recently. [^2]

As our GTM motion has matured, I have figured out some key things that work and don't work, and I've set out to create a tool that does these really well. I've been using it internally for the couple of weeks and have doubled my reply rates! I won't go into too much detail, but here's a brief overview of what I built so you can see the engineering effort behind it.

It all starts by finding people who I think want what I've built[^3]. Using Sales Navigator, LinkedIn Search, and data from my past sales, the AI finds similar people. This involved a lot of queuing work, because there's various states a lead can be in and sources it can come from.

<figure><img src="{{ '/assets/how-i-actually-write-10000-lines/gtm-engineering-3.png' | relative_url }}" alt="What do the 12,000 lines per day I write actually do"></figure>

It then automates my LinkedIn to run multi-day sequences: sending a connection request, liking, messaging, and so on. This was a very complicated state machine -- from the outside it looks to have only a few states, but really there are many more failure states to accommodate. 

It rigorously tests each sequence out, and tries to find statistically significant results from reply rates and meetings booked.

<figure><img src="{{ '/assets/how-i-actually-write-10000-lines/gtm-engineering-5.png' | relative_url }}" alt="What do the 12,000 lines per day I write actually do"></figure>

It also automatically identifies my competitors, follows their posts, finds people who engaged with it, filters them for relevancy, and sends them sequences.

<figure><img src="{{ '/assets/how-i-actually-write-10000-lines/gtm-engineering-4.png' | relative_url }}" alt="What do the 12,000 lines per day I write actually do"></figure>

And the best part -- whenever someone replies, it pings me on Slack and automatically drafts a reply for me.
<figure><img src="{{ '/assets/how-i-actually-write-10000-lines/gtm-engineering-2.png' | relative_url }}" alt="What do the 12,000 lines per day I write actually do"></figure>

I spent careful time designing the architecture, data model, and observability -- because I was my own user. This means that despite using a lot of AI, I built it differently than what you'd expect most "vibe coded" projects to be like. [I've been letting a few friends try it and it's gotten amazing reactions!](#lead-10k-lines)

{% include catalyst_lead_form.html
   form_name="blog-10k-lines-multiplier"
   form_id="lead-10k-lines"
   modal=true
   heading="psst... sneak peek"
   blurb="If you're interested in the loop I described and want find buyers, test messages, and get pinged on Slack when someone replies -- Leave your work email or phone and I'll show you how it'd work for you." %}

## Customer-Specific Work

As part of selling to larger customers, we have to do a lot of work integrating with their authentication and APIs.

It's complex work. It involves digging through legacy codebases and esoteric data sources. That's essentially what the larger businesses pay us for.

In just the last couple of weeks, we have:

* Resolved an issue where different customer deployments used different authentication secrets -- but they look very similar and the original dev who wrote that code was long gone so no one really got to know till we broke stuff
* Added support for snowflake database connections with different schemas per tenant
* Integrated authentication where one administrator token is used to get specific privileges for user sub-accounts
* Set up a brand new caching system because one customer had static files in the 50mb range that our old cache wasn't handling well.

...and much more.

Although mundane, this work is rewarding because of how it encompasses problems around data modelling, performance, quality tradeoffs, which excite the engineer in me.

Because it often requires going through a lot of documentation, discovering undocumented code by trial and error, and writing rigorous API tests to prevent regressions; this unique combination makes it apt for AI, which is why we've been able to accelerate a lot here as well.

## So... Is 10,000 lines like a lot?

In almost all of the cases where you're seeing people write tens of thousands of lines, it is going to be new code and greenfield projects. 

It probably will have something to do with third-party integrations and most likely to be something that is easy to test and verify quickly.

Whether the generated code will be _valuable_ or create _outcomes_ is still uncertain: AI still creates a lot of opportunities to lose your brain to psychosis, where the sycophancy convinces you that every new feature you build is world-changing. 

But that's fine for some people. The young founder is desperate and has no paying customers, so they can Move Fast And Really Break Things™.

Of course, if you're an experienced programmer in a larger company, a critical part of your job is to not break things for the thousands of customers you have. So for you, it is probably a very bad idea to ship 10,000 lines of code. 

What about you, my dear reader, where do you stand? How many lines of (effective) code do you to write, and how has that changed with AI?

[^1]: which out to really be called Jevons law tbh

[^2]: I think [Clay](https://www.clay.com/blog/gtm-engineering) invented the term a few years ago. But it is much more advanced now!

[^3]: a.k.a. "leads" in marketing-speak, but I never really liked that word





