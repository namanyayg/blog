---
title: "AI is Killing B2B SaaS"
layout: post
date: 2026-02-04
categories:
 - saas
 - ai
excerpt_separator: <!--more-->
post_promotion_type: giga-catalyst
image: /assets/saas-stocks.png
twitter_image: /assets/saas-stocks.png
twitter_card: summary_large_image
social_metrics:
  hackernews: "40+ votes"
---

SaaS is the most profitable business model on Earth.[^1] It's easy to understand why: build once, sell the same thing again ad infinitum, and don't suffer any marginal costs on more sales.

I have been writing software for more than half my life. In the last year itself, I've talked to hundreds of founders and operators in SF, from preseed to Series E companies. 

And everyone is constantly talking about the threat looming over the industry, that has changed how our entire industry thinks an operates: agentic AI a.k.a. your very own overzealous intern that always listens to you, available almost as cheaply as drinking water from a tap[^2]

This isn't just talk -- the market is pricing it in. Morgan Stanley's SaaS basket has [lagged the Nasdaq by 40 points](https://www.bloomberg.com/news/articles/2026-01-18/-no-reasons-to-own-software-stocks-sink-on-fear-of-new-ai-tool) since December. HubSpot and Klaviyo are down ~30%. Analysts are writing notes titled "No Reasons to Own" software stocks.

This is bringing an existential threat to a lot of B2B SaaS executives: How to keep asking customers for renewal, when every customer _feels_ they can get something better built with vibe-coded AI products?

<figure>
  <img src="{{ '/assets/saas-stocks.png' | relative_url }}">
  <figcaption>The market is reflecting our new reality (Source: Bloomberg)</figcaption>
</figure>

<!--more-->

## Wait, can users actually vibe code a B2B SaaS?

Short answer: Not really -- but that doesn't matter in this case.

The actual problem is that customers can get _something_ working with vibe coding. There are tens of vibe coding "internal tool" services that promise to connect to every integration in the world to pump out CRUD and workflow apps.

Whatever they build _simply works_. It takes some wrangling to get there (one Series C VP listed **eleven different** vibe coding tools they've tried and the pros and cons between each on a phone call once), but productivity gains are immediate. 

And vibe coding is fun. Whatever anyone says about AI code generation, it's an unparalleled experience to vibe code your first tool and start using it in your own company. You feel like a mad wizard using the right incantation [^3] to get this magical new silicon intelligence to do exactly what you want. It looks and feel exactly like you want it to.

There's also some incomplete knowledge about building reliable software: They don't know what actually goes into making data models and systems that work reliably for all scenarios. And that _incomplete knowledge_ is a bit dangerous. 

A poorly architected system will fail, eventually. Some patching will work, but anyone who's got experience with maintaining their own custom Linux installation in the 2010s knows how painful it is to maintain and debug software that you rely on day-to-day as it gets more complex and interconnected. As every senior programmer (eventually) understands, our job is complex because we have to understand the relationships in the real world, the processes involved, and the workflows needed, and representing it in a robust way to create a stable system. AI can't do that.

Non-programmers don't know any of this nuance, though. One Series E CEO told me that they're re-evaluating the quarterly renewal of their engineering productivity software because they along with an engineer reimplemented something using Github and Notion APIs. They were paying $X0,000 to a popular tool[^4] **and they were not going to renew anymore.**

## How does it impact B2B sales?

If customers feel like they aren't being served exactly like they want to, they are more likely to churn. The reason behind all this is that customers are demanding more from their B2B vendors, because they know what's possible. 

Previously, you would change _your company_ to fit what your ERP and pay them hundreds of thousands of dollars. Now, everyone can see that agentic coding makes an unprecedented level of flexibility possible. And customers are demanding that flexibility, and if they don't get it, they'll leave.

This week itself I was on a phone call with a Series B AE talk about how they're potentially losing an $X00,000 account just because the customer can't use a specific failure reporting workflow in the SaaS. They're now working with me to build what the customer needs and retain them.

## How to survive

### 1. Be a System of Record, not just a Wrapper&trade;

If the entire company's workflows operates on your platform, i.e. you're a line-of-business SaaS, you are integrated into their existing team already. They know your UI and rely on you on the day to day. 

This is compared to a simpler wrapper product. Now, to create a data visualization I won't seek any SaaS but I'll just code one myself using many of the popular vibe coding tools (my team actually did that and it's vastly more flexible than what we'd get off-the-shelf).

Being a "System of Record" means you're embedded so deeply that there's no choice but to win. My prediction is that we'll see more SaaS companies go from the application layer to offering their robust SoR as their primary selling point.


### 2. Security, authentication, and robustness

These are the hard parts of getting software that works right. Unfortunately, the customers don't know it yet. This needs to be communicated to continue retention, while also working on #1 and #2 so customers have no reason to start thinking about switching.

### 3. Adapt to the customer, not the other way around

The times of asking customers to change how they work are gone. Now, SaaS vendors that differentiate by being ultra customizable win the hearts of customers.

How? It's the most powerful secret to increase usage. We've all heard the classic SaaS problem where the software is sold at the beginning of the year, but no one actually ends up using it because of how inflexible it is and the amount of training needed. 

And if a SaaS is underutilized, it gets noticed. And that leads to churn.

This is the case with one of my customers, they have a complex SaaS for maintenance operations. But turns out, this was not being used at the technician level because they found the UI too complex[^5]. 

How I'm solving this is essentially a whitelabelled vibe-coding platform with in-built distribution and secure deployments. When they heard of my solution they were immediately onboard. Their customer success teams quickly coded a very specific mobile webapp for the technicians to use and deployed it in a few days.

Now, the IC technician is exposed to just those parts of the SaaS that they care about i.e. creating maintenance work orders. The executives get what they want too, vibe coding custom reports exactly the way they want vs going through complicated BI config. They are able to build exactly what they want and feel like digital gods while doing it.

Usage for that account was under 35%, and is now over 70%. They are now working closely with me to vibe code new "micro-apps" that work according to all of their customer workflows. And the best part? This is all on top of their existing SaaS which works as a system of record and handles security, authentication, and supports lock-in by being a data and a UI moat.

This is exactly what I'm building: a way for SaaS companies to let their end-users vibe code on top of their platform. My customers tell me it's the best thing they've done for retention, engagement, and expansion in 2026 -- because when your users are building on your platform, they're not evaluating your competitors. (Self-plug: I'm working on solving exactly this problem. If you want to see how it works, <a href="#" onclick="showDemoPopup(event)">click here and share your details and I'll show you what I've made)</a>.

## The Real Shift

Here's what I've realized after hundreds of conversations with founders and operators: AI isn't killing B2B SaaS. It's killing B2B SaaS **that refuses to evolve**.

The SaaS model was built on a simple premise: we build it once, you pay forever. That worked when building software was hard. But now your customers have tasted what's possible. They've seen their finance team whip up a custom dashboard in an afternoon. They've watched a non-technical PM build an internal tool that actually fits their workflow.

You can't unsee that. You can't go back to paying $X0,000/year for software that almost does what you need.

The survivors won't be the SaaS companies with the best features. They'll be the ones who become platforms -- who let customers build _on top of_ them instead of _instead of_ them. When I showed a well-known VC what I was building to help SaaS companies do exactly this, he said: "This is the future of marketplaces and software companies."

Maybe. Or maybe this is just another cycle and traditional SaaS will adapt like it always has. But I know this: the companies I'm talking to aren't waiting around to find out. They're already rebuilding their relationship with customers from "use our product" to "build on our platform."

The question isn't whether AI will eat your SaaS. It's whether you'll be the one holding the fork. 

Self-plug: **I'm solving exactly this problem with a whitelabelled vibe coding platform for B2B SaaS companies**, so your customers can create customized workflows on top of their existing system of record. 

My customers tell me this is the **best way to support retention, engagement, and expansion** in 2026. If this sounds interesting to you or someone you know, write to me on <a href="mailto:hi@nmn.gl">hi@nmn.gl</a> or click here to <a href="https://gigamind.dev/catalyst">learn more about Giga Catalyst</a>.

---

[^1]: Whenever I bring a new friend to the Salesforce Park, they are in absolute awe. And, the meme remains true that no one even knows what Salesforce does. Whatever they're doing, they're clearly earning enough revenue to purchase multiple blocks in SF.

[^2]: if you're a tech company in SF, that is

[^3]: a.k.a. "prompt engineering" which is not engineering at all but that's a different blog post.

[^4]: I won't name any names, but the company's named after an invertebrate animal that a certain fictional sponge likes to catch.

[^5]: And who can blame them -- I still feel a pang of anxiety when I look at my sales CRM. 