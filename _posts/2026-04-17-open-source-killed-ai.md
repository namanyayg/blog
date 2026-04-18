---
title: "Open Source SaaS is Dead, AI Killed It"
layout: post
date: 2026-02-17
categories:
 - saas
 - ai
excerpt_separator: <!--more-->
post_promotion_type: giga-catalyst
twitter_card: summary_large_image
---

Today, I find myself as a Y Combinator backed B2B SaaS founder, stuff that used to be the dream for a 12-year-old me, fangirling to Zuck.

But to run a business, you have to use B2B software tools. And I don't know if you've noticed, but there's something very wrong with the Salesforces, SAPs, and Jiras of this world. I set all of them up for my business, but I dreaded using them so much that I figured out a new way forward for myself.

On the same day that a popular tech YouTuber Theo published a video about how "open source is the future for tech companies", Cal.com, one of the most impressive open source projects, just went closed source. 

I'm a fan of Cal.com (and in case you didn't know it, Cal.com's founder literally lives on a farm away from any civilization, and he's still able to build a $100M business) and I use it every day. Them closing their source code was a bit... sudden and shocking for a lot of people.

But I've been deep in the AI trenches for over a year now, and while neither of them is fully wrong, I think they are missing a nuance. I'm pointing out a new forward that Theo and Cal.com might find more agreeable: **Open Interface.**

<figure>
    <img src="{{ '/assets/open-source-killed-ai/theo-vs-bailey.png' | relative_url }}"/>
    <figcaption>Two popular figures in the tech community behaving like polar opposites</figcaption>
</figure>

<!--more-->

## Theo & Cal.com's Arguments

Theo says that all products should allow everyone's AI agents can build personal tools on top of them, and the only way forward to do that is by open sourcing all the code. 

Cal.com, on the other hand, was one of the larger open source repository that thousands of developers have learned a lot from, but they had to end up closing the source because of the bullshit issues and pull requests being hammered on to their repo every single minute.

Cal.com was forced into this move because the cost of creating a pull request has become so much lower than the cost of reviewing one. [Vibe coding has created a generation of illiterate developers](/blog/ai-illiterate-programmers), and now any person with a laptop and a $20/month subscription thinks that they can open a pull request and waste time for senior engineers.

And as models like Claude Mythos come up, cyber attacks become a game of spending tokens to find security vulnerabilities (sort of like how I used to run through tall grass to find the rarest Pokemon.) For any software business with fininte resources it becomes more impossible every day to beat the cat and mouse race of exploits, because the odds are stacked against them now.

As a business owner, I agree with Cal.com's stance of prioritization and security, and as a user, I agree with Theo's position of extensibility.

But I use more software than I build, and so I have to side with Theo. Because honestly, who wants to wake up, open up their laptop, and look at Salesforce™ to start their day? 


## The Dream of the Open Interface

I've been thinking for years for this new way forward wih the advantages like Theo pointed out, which is allowing the AI agents to do whatever and everything on top of a given product, while preventing the downsides of open sourcing as faced by Cal.com, which was maintainer overload and security difficulties.

It's this new term that I'm coining, called *Open Interface.* Put simply, software is not restricted to a UIs now, and we need to rebuild to not to be just used by a user tapping mouse and buttons on a screen. 

It needs to embrace the reality of AI: any AI agent, be a chat agent or a vibe coding tool, should be able to develop and build on top of your SaaS. That should be the new table stakes for 2026 and forward.

## Open Interface in Action

One of the best examples for this is a CRM. 

I don't think anyone enjoys using a CRM. But every B2B company ends up needing one.

If you look at screenshots of any average CRM, it is just the most mind-numbing, dreadful  experience ever. It looks like the detention of software, the polar opposite to the design taste of Apple, somehow worse than staring at spreadsheets. If you think Windows is poorly designed, just look up the screenshots for any popular crm.

That's why the one I ended up using after a lot of experimentation was Attio. And I don't even _look_ at Attio. Literally the only reason I'm using it is because it was the first CRM I found that touted being MCP-first. Now I know MCP has been an overhyped concept as well, but it can be incredibly powerful.

<figure>
    <img src="{{ '/assets/open-source-killed-ai/scotty-mr-computer.jpg' | relative_url }}"/>
    <figcaption>I often feel like Mr. Scotty from Star Trek: The Voyage Home</figcaption>
</figure>

So even though I've got hundreds, if not thousands, of activities and contacts and companies in my CRM, I haven't opened their app in weeks. I just ask my LLM in my terminal and it does what I need (my comfort zone is the zsh shell, yours could be anything from Ollama to ChatGPT to Cursor.) I just *talk to my computer* to get me the the information I need and write the data that I tell it to.

And this is powerful for a couple of reasons:

### I get to input any unstructured data that I want.

I can Wisprflow, I can drop a voice note, I can take a screenshot of an email that I sent, or I can just refer to some company with spelling mistakes or acronyms, and my *LLM does the job of figuring it out*. 

It's actually empowering. 

For example, very recently I sent out 15 emails and just took a screenshot of all the activities and pasted it into my terminal and told it to save it into CRM. It automatically understood the content, matched it to the correct companies and people, and updated it in my CRM while I alt-tabbed and Slacked around.

### I can view data in however way I want

Any average CRM looks like a boring data table with lots of dropdowns (yuck.) 

I don't want to click through your app, I don't want your annoying Kanban UI, and I am definitely not going to join your conference or look at your help tooltips just to access the data I fed in yesterday.

Continuing my CRM example, what I care most about is just follow-up reminders. So I just tell my terminal to get what I need.

These are the positive sides of being a partially Open Interface platform with MCP. Some of the downsides that I'm still missing with just an MCP are, however:

* **Saving my views:** For example, if I like a particular view or a data query, then it's not that trivial to save it, because every time I run it, the MCP will make the same request again.
* **Sharing and access control:** Sharing with my team is non-trivial. How do I manage proper role based access control for MCP, and the data I'm pulling for it? Literally no MCP is doing it correctly right now.
* **I can't easily connect it with other data:** The setup I use is a bunch of MCPs connecting all of the sales tools that I use, combined with a bunch of markdown files to store all that data. There is no relational data modelling, nor any enforcing of a schema. It works, but it is not an ideal system.

##  The Future of Software Businesses

Even though everyone is hating AI and how it changes our society and makes us work harder while promising "efficiency"; the cat is out of the bag; the genie is out of the bottle, and there is simply no way to go back. 

It is the most valuable (in terms of valuation) that has existed. You might not agree with every claim that the CEOs make (I definitely don't) but you have to agree that it makes a lot of things faster and it changes the way software is thought about. 

So Theo and Cal.com, you are both right and a little wrong. It's not open source versus closed source. There is a completely new paradigm available to us with AI.

I haven't opened my CRM in weeks, but I use it every day: Because I can use **my** data, **my** workflows, in the interface that **I** like.

That might be uncomfortable to hear if you are a SaaS company. Your customers want your domain model and your reliability, but they are not going to accept the same old trite UI anymore.

You have, optimistically, maybe 12 months before your customers start asking if they can build on top of you - if they aren't already. [AI has created an existential threat to B2B SaaS](/blog/ai-killing-b2b-saas), and the companies that survive won't be the ones with the best UIs—they'll be the ones with the best interfaces.

Open source is dead, and closed off traditional SaaS isn't meeting the bar for customers of the future. Just [adding random AI features to your SaaS](https://gigacatalyst.com/blog/three-levels-of-adding-ai-to-your-saas){:target="_blank"} won't cut it either.

Open Interface is the business model that survives.

---

**I'm letting B2B software companies customize their software for every user** with an AI.

I've been told that this is the **best way to support retention, engagement, and expansion** in 2026. If this sounds interesting to you or someone you know, <a href="javascript:void(0)" onclick="showDemoPopup()">I can reach out with a custom demo</a> or you can <a target="_blank" href="https://gigacatalyst.com">learn more about Gigacatalyst</a>.
