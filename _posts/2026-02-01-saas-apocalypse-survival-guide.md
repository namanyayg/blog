---
title: "The SaaS-pocalypse is Here. Here's How to Survive It."
layout: post
date: 2026-02-01
categories:
 - saas
 - ai
excerpt_separator: <!--more-->
# image: /assets/saas-apocalypse.png
# twitter_image: /assets/saas-apocalypse.png
# twitter_card: summary_large_image
---

Three times this month, I've been in calls where customers asked the same question: "Could we just build this ourselves?"

A year ago, that was a joke. Engineering would laugh, explain the complexity, and everyone would renew. Now? Engineering is building POCs with Claude Code, and the laughter has stopped.

<!--more-->

## The Pattern I'm Seeing

The first time it happened, I thought it was an outlier. A particularly technical customer, frustrated with slow feature delivery, decided to spin up their own dashboard. Saved them $50K annually on a reporting tool. No big deal.

The second time was more concerning. A mid-market company replaced their entire approval workflow system. Not with another SaaS product—with a weekend project their senior engineer built using AI assistance. The system works. It's not pretty, but it matches their exact workflow in ways the $200K/year SaaS product never did.

The third time, I realized this wasn't random. It's a pattern.

[Bloomberg called software stocks](https://www.bloomberg.com/news/articles/2026-01-18/-no-reasons-to-own-software-stocks-sink-on-fear-of-new-ai-tool) "'No Reasons to Own'" in January. Morgan Stanley's SaaS basket lagged the Nasdaq by 40 percentage points since December. HubSpot and Klaviyo are both down roughly 30% this month.

The market sees something most SaaS vendors don't want to admit: **the build vs buy calculus just changed.**

## What's Actually Happening

[AI coding tools shifted the economics](https://www.businessinsider.com/ai-coding-tools-buy-versus-build-software-saas-netlify-bolt-2025-6). Tasks that needed engineering teams now take an afternoon. [Even OpenAI's chair acknowledged](https://www.businessinsider.com/openai-chair-vibe-coding-not-endgame-bret-taylor-2026-1) that "vibe coding"[^1] is legitimate now.

I'm seeing renewal conversations that didn't exist before:

"You want to raise our price by 15%? Let me ask engineering how long it would take to build what we actually use."

"We only use 30% of your features, and they don't match our workflow anyway. Why not build the 30% we need?"

"Your roadmap timeline is 9 months. Our engineer said he can have a working version in two weeks."

These aren't hypotheticals anymore. They're real conversations happening right now.

## The Economics Problem

[Reuters reports](https://www.reuters.com/business/us-software-stocks-slide-after-sap-servicenow-results-fuel-ai-disruption-fears-2026-01-29/) this is a sector-wide selloff, not isolated companies missing earnings. The market is repricing the entire category.

Here's why: SaaS valuations are built on two assumptions—fast growth and high net revenue retention (NRR). Both are breaking.

New customer growth is slowing because prospects can build alternatives. That's a problem, but it's not the fatal one.

The fatal one is NRR erosion. Existing customers are the profit engine of SaaS. They expand into higher tiers, add more seats, drive margin. When they start replacing parts of your platform with internal tools, your NRR drops below 100%. When NRR drops, your valuation model collapses.

I've watched this happen twice this quarter. Not companies churning completely—just migrating 80% of their users off the platform but keeping the core data. They're still technically customers, but they went from $200K/year to $30K/year.

The SaaS company lost the revenue but still has to maintain the account. That's not consolidation—it's slow death.

## What Actually Has a Moat

Not everything is vulnerable. Some categories are genuinely hard to replace:

Anything requiring serious uptime and SLAs. Getting to four or five 9s is hard. You're not replacing Stripe with an agent and a spare afternoon.

High-volume systems and data infrastructure. Building distributed systems that handle millions of requests isn't trivial. The specialized knowledge required is scarce.

Strong network effects. You're not replacing Slack when everyone external to your org is already on it. Communication platforms with broad adoption are safe.

Proprietary datasets. If you have unique data that can't be replicated, you're protected. Financial data, sales intelligence, industry-specific datasets—these stay valuable.

Regulation and compliance. Industries with serious regulatory requirements aren't moving fast. The compliance overhead protects incumbents.

What's vulnerable? Back-office tools that are basically CRUD operations on the customer's own data. Simple dashboards. Workflow tools that don't quite match how anyone actually works.

If your product is "a SQL wrapper with a billing system," you now have thousands of competitors: every engineer at every customer with an AI agent and a Friday afternoon.

## The Pattern Among Survivors

I'm watching a different pattern among SaaS companies that aren't panicking:

[ServiceNow built Creator Workflows](https://www.servicenow.com/workflows/creator-workflows.html) so customers can build custom apps on their platform. [Salesforce opened Agentforce](https://www.itpro.com/business/business-strategy/salesforce-announces-huge-partner-program-revamp-with-agentforce-360-launch) to let partners build custom agents. [Gartner predicted](https://www.gartner.com/en/newsroom/press-releases/2021-11-10-gartner-says-cloud-will-be-the-centerpiece-of-new-digital-experiences) 70% of new apps would use low-code/no-code by 2025—turns out they were right.

The insight: instead of fighting "we'll build it ourselves," they're enabling it.

When a customer says "we can build this with AI now," the response isn't "but our product is better." It's "build it on our platform—we'll give you the tools, security, compliance, and integrations. Build exactly what you need."

You're not competing with their AI-built tools. You're the foundation they build on.

[Salesforce's ecosystem generates economic value](https://www.salesforce.com/blog/salesforce-ecosystem-explained/) far beyond core product revenue. When customers build on your platform, they're invested. They're not evaluating competitors every renewal—they've built their workflows on top of you.

That's not vendor lock-in. That's value alignment.

## The AI-Native Approach

Low-code platforms solved the technical barrier but created complexity. You still need to learn proprietary tooling, understand data models, maintain custom code.

AI eliminates that friction. Instead of "learn our platform," it's "describe what you need." Instead of "understand our schema," it's "the AI figures it out." Instead of "maintain custom code," it's "refactors automatically when things change."

I've seen this work: customer-facing teams (CS, Sales, Implementation) building functional apps through AI assistance, governed by the platform's constraints. Not shadow IT—officially supported customization without engineering bottlenecks.

An Implementation team discovers 30 customers need similar approval workflows. They build a template using AI-assisted tools. Deploy across all 30 customers in a week. Each customizes to their needs. Adoption improves. Expansion starts.

A Sales Engineer faces custom requirements in a deal. Instead of "we'll build that in Q3," they prototype it during the POC using AI. Customer sees it matches their workflow. Deal closes. Pattern gets reused for the next 50 deals.

This isn't theoretical. <a href="#" onclick="showDemoPopup(); return false;">I've been building this</a>.

## The Maintenance Question

The obvious objection: "Who maintains these apps?"

Which is valid. Software has bugs, security issues, scale problems.

But consider what maintenance looks like now. Most SaaS is poorly maintained—expensive platforms with stale UIs, slow support, security incidents. The attack surface often comes from external third parties accessing internal data. Moving everything behind your existing security layer reduces risk.

AI also lowers maintenance cost dramatically. Library deprecation, API changes, code updates—tasks that used to require deep knowledge are now significantly easier, especially with typed languages. The biggest fear—one person knowing everything, then leaving—doesn't apply. AI doesn't leave. With good documentation, anyone can understand and maintain the codebase.

SaaS has maintenance problems too. I watched a friend deal with a vendor deprecating their API and moving to new endpoints that don't have feature parity. Essential system, huge disruption, enormous resource drain. That's maintenance overhead too.

## What This Means

I'm not suggesting every company is about to replace their entire SaaS stack. That's not happening.

What I am seeing: companies with some technical capability are scrutinizing their SaaS spend more critically. The math changed. The "it would cost more to build" argument isn't as clear anymore.

When renewal comes and the price increased 15%, and you only use 40% of the features, and they don't quite match your workflow anyway, and your engineering team could build what you need in two weeks—the conversation is different now.

The market has priced this in. Software stocks are down. [Finimize says](https://finimize.com/content/investors-have-been-kicking-saas-and-taking-names) "2026 is shaping up to be a hard year for software."

The survivors will be platforms customers build on, not just use. The ones who embrace "build on our platform" instead of fighting "we'll build it ourselves."

The market made its bet. The question is whether SaaS companies are paying attention.

---

[^1]: Yes, "vibe coding" is now a technical term that OpenAI's chairman uses with a straight face. We've officially entered the timeline where describing software development with the word "vibes" is considered serious business discourse. What a time to be alive.
