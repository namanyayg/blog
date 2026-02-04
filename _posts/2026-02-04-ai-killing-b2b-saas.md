---
title: "AI is Killing B2B SaaS"
layout: post
date: 2026-02-04
categories:
 - saas
 - ai
excerpt_separator: <!--more-->
---

SaaS is the most profitable business model on Earth.[^1] It's easy to understand why: build once, sell the same thing again ad infinitum, and don't suffer any marginal costs on more sales.

I have been writing software for more than half my life. In the last year itself, I've talked to hundreds of founders and operators in SF, from preseed to Series E companies. 

And everyone is constantly talking about the threat looming over the industry, that has changed how our entire industry thinks an operates: agentic AI a.k.a. your very own overzelous intern that always listens to you, available almost as cheaply as drinking water from a tap[^2]

This is bringing an existential threat to a lot of B2B SaaS executives: How to keep asking customers for renewal, when every customer _feels_ they can get something better built with vibe-coded AI products?

## Wait, can users actually vibe code a B2B SaaS?

Short answer: Not really -- but that doesn't matter in this case.

The actual problem is that customers can get _something_ working with vibe coding. There are tens of vibe coding "internal tool" services that promise to connect to every integration in the world to pump out CRUD and workflow apps.

Whatever they build _simply works_. It takes some wrangling to get there (one Series C VP listed **11 different** vibe coding tools they've tried and the pros and cons between each on a phone call once), but productivity gains are immediate. 

And vibe coding is fun. Whatever anyone says about AI code generation, it's an unparalleled experience to vibe code your first tool and start using it in your own company. You feel like a mad wizard using the right incantation [^3] to get this magical new silicon intelligence to do exactly what you want. It looks and feel exactly like you want it to.

But there's some incomplete knowledge about building reliable software: They don't know what actually goes into making data models and systems that work reliably for all scenarios. And that _incomplete knowledge_ is a bit dangerous. 

A poorly architected system will fail, eventually. Some patching will work, but anyone who's got experience with maintaining their own custom Linux installation in the 2010s knows how painful it is to maintain and debug software that you rely on day-to-day as it gets more complex and interconnected. As every senior programmer (eventually) understands, our job is complex because we have to understand the relationships in the real world, the processes involved, and the workflows needed, and representing it in a robust way to create a stable system. AI can't do that.

Non-programmers don't know that, though. One Series E CEO told me that they're re-evaluating the quarterly renewal of their engineering productivity software because they along with an engineer reimplemented something using Github and Notion APIs. They were paying $X0,000 to a popular tool[^4] **and they were not going to renew anymore.**

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

Usage for that account was under 35%, and is now over 70%. They are now working closely with me to vibe code new "micro-apps" that works according to all of their customer workflows and to do exactly what they need. And the best part? This is all on top of their existing SaaS which works as a system of record and handles security, authentication, and supports lock-in by being a data and a UI moat.

**This basically guarantees renewal and expansion**, because no other SaaS was able to offer the customer this level of flexibility.My customers tell me that letting their users vibe code is the best way to increase retention, usage, and expansion in 2026. <a href="#" onclick="showDemoPopup()">If you are interested in giving your end-users a way to do that on top of your platform, let's chat</a>. 



<!--more-->

### Market/Stock Analysis

- **Bloomberg - "No Reasons to Own" Software Stocks**
  https://www.bloomberg.com/news/articles/2026-01-18/-no-reasons-to-own-software-stocks-sink-on-fear-of-new-ai-tool
  Software stocks sinking on AI disruption fears. Morgan Stanley's SaaS basket lagged Nasdaq by 40 points since December. HubSpot and Klaviyo down ~30%.

- **Reuters - Sector-Wide Selloff**
  https://www.reuters.com/business/us-software-stocks-slide-after-sap-servicenow-results-fuel-ai-disruption-fears-2026-01-29/
  US software stocks slide after SAP/ServiceNow results fuel AI disruption fears. Market repricing the entire SaaS category.

- **Finimize - 2026 Hard Year for Software**
  https://finimize.com/content/investors-have-been-kicking-saas-and-taking-names
  "2026 is shaping up to be a hard year for software." Investors dumping SaaS stocks.

### AI Coding / Build vs Buy

- **Business Insider - AI Coding Tools Shift Economics**
  https://www.businessinsider.com/ai-coding-tools-buy-versus-build-software-saas-netlify-bolt-2025-6
  AI coding tools shifting the build vs buy economics. Tasks that needed engineering teams now take an afternoon.

- **Business Insider - OpenAI Chair on Vibe Coding**
  https://www.businessinsider.com/openai-chair-vibe-coding-not-endgame-bret-taylor-2026-1
  Bret Taylor (OpenAI chair) acknowledges "vibe coding" is legitimate now. Not the endgame, but a real development approach.

- **Martin Alderson - AI Agents Eating SaaS (Inspiration)**
  https://martinalderson.com/posts/ai-agents-are-starting-to-eat-saas/
  Hit HN article. Observer tone, personal examples, hedged claims. Finance team built their own reporting, accountant used Claude for QuickBooks workaround.

### SaaS Data / Trends

- **Zylo - 2025 SaaS Management Index**
  https://zylo.com/reports/2025-saas-management-index/
  Enterprises manage 275 SaaS apps at $49M annual spend. Spending up 9.3% while portfolios grew only 2.2%. Vendors raised prices 4x faster than companies added tools.

- **McKinsey - NRR Advantage in B2B Tech**
  https://www.mckinsey.com/industries/technology-media-and-telecommunications/our-insights/the-net-revenue-retention-advantage-driving-success-in-b2b-tech
  B2B buyers increasingly demand performance guarantees and outcome-based pricing. Done paying for unused "powerful platforms."

- **Gartner - Low-Code/No-Code Prediction**
  https://www.gartner.com/en/newsroom/press-releases/2021-11-10-gartner-says-cloud-will-be-the-centerpiece-of-new-digital-experiences
  Predicted 70% of new apps would use low-code/no-code by 2025. They were right.

### Platform Strategy (Survivors)

- **ServiceNow - Creator Workflows**
  https://www.servicenow.com/workflows/creator-workflows.html
  Lets customers build custom apps on ServiceNow platform. "Become the platform they build on, not just the product they use."

- **Salesforce - Agentforce Launch**
  https://www.itpro.com/business/business-strategy/salesforce-announces-huge-partner-program-revamp-with-agentforce-360-launch
  Partners can build custom agents. Enabling "build it yourself" instead of fighting it.

- **Salesforce - Ecosystem Value**
  https://www.salesforce.com/blog/salesforce-ecosystem-explained/
  Ecosystem generates value beyond core product. When customers build on your platform, they're invested—not evaluating competitors every renewal.



---

[^1]: Whenever I bring a new friend to the Salesforce Park, they are in absolute awe. And, the meme remains true that no one even knows what Salesforce does. Whatever they're doing, they're clearly earning enough revenue to purchase multiple blocks in SF.

[^2]: if you're a tech company in SF, that is

[^3]: a.k.a. "prompt engineering" which is not engineering at all but that's a different blog post.

[^4]: I won't name any names, but the company's named after an invertebrate animal that a certain fictional sponge likes to catch.

[^5]: And who can blame them -- I still feel a pang of anxiety when I look at my sales CRM. 