---
title: "I built an AI Trend Analyzer to stop myself from doomscrolling"
layout: post
date: 2025-01-14
categories:
 - ai
 - dev
 - side-project
excerpt_separator: <!--more-->
---

As a content creator in the tech space, I found myself caught in an all-too-familiar trap: endless hours of doomscrolling through social media and news aggregators, trying to stay on top of the latest trends.

The signal-to-noise ratio was abysmal&mdash;for every meaningful tech development, I had to wade through countless memes, heated arguments, and clickbait. I knew there had to be a better way.

<!--more-->

## The Birth of an Idea

That's when I decided to build my own solution: an AI-powered trend analyzer that could do the heavy lifting for me. 

The goal was simple: automatically extract meaningful tech discussions, analyze them for trends, and generate content ideas&mdash;all without getting lost in the noise.

## How It Works

First, we need a source of information to understand trends. 

And the obvious choice is right in front of us&mdash;Reddit.

I used an LLM to pick news-worthy subreddits from the list of top 250 subreddits, to allow anyone to find trends from a niche of their choice. I also asked the LLM to choose an emoji and color scheme for each subreddit. The result is something like this:

```
technology: {
  url: "https://redlib.catsarch.com/r/technology/top?t=day",
  name: "Technology",
  emoji: "💻",
  color: {
    gradient: "from-blue-500 to-indigo-600",
    accentLight: "bg-blue-50 text-blue-600",
    accentDark: "bg-blue-500 text-white"
  },
  description: "General technology news and discussions",
  category: "technology"
},
programming: {
  url: "https://redlib.catsarch.com/r/programming/top?t=day",
  name: "Programming",
  emoji: "👨‍💻",
  color: {
    gradient: "from-purple-500 to-indigo-600",
    accentLight: "bg-purple-50 text-purple-600",
    accentDark: "bg-purple-500 text-white"
  },
  description: "Software development and programming",
  category: "technology"
},
```

To find the most recent trends, I chose the "top of the day" links from each subreddit. You'll note that I'm using an alternative Reddit API, this is to get a cleaner HTML that can be scraped easily.

Then, the system works in two main stages:

### 1. Data collection with Firecrawl Extract

The foundation of this system is built on Firecrawl's powerful "extract" endpoint&mdash;an AI powered feature that goes beyond simple web scraping. 

Instead of just pulling raw HTML and requiring complex parsing logic, the extract endpoint allows you to define a schema and get structured data back directly:

```typescript
const schema = z.object({
  links: z.array(z.object({
    linkId: z.string(),
    title: z.string(),
    number_of_upvotes: z.number(),
    number_of_comments: z.number(),
    website_domain: z.string(),
    topics: z.array(z.string()),
    companies_mentioned: z.array(z.string()),
    linkHref: z.string()
  }))
});
```

What makes this particularly powerful is that Firecrawl uses AI to understand and extract exactly what you need. You just define the shape of the data you want, and it handles all the complexity of finding and structuring that information.

### 2. Trend analysis with Claude

Next, Claude 3.5 Sonnet analyzes the collected data. 

I spent considerable time crafting a prompt that generates structured, actionable insights. For each trend, it provides:

* A viral score based on engagement metrics
* A clear trend title and overview
* Source links for reference
* Three detailed content suggestions with viral hooks and narrative angles

What makes this particularly powerful is how Claude contextualizes the information. It doesn't just list facts – it understands the broader implications and suggests multiple angles for content creation.

## Future Enhancements

I'm already using it to find and analyze trends. I usually don't bother with news and I don't find most of it interesting, but this works for me to summarize discussions and find new topics. Till now, it has helped me [ideate my last blog post](https://nmn.gl/blog/ai-midlevel-engineer), and we'll see how much it helps me in the future.

On a technical level, I'm excited about several potential improvements:

* Adding more data sources beyond the current set
* Creating an API for other creators to build upon
* Adding customizable topic filters
* Generating automatic tweet threads and article outlines

It's all open source so I'll be more than happy if there's any contributions!

## Try It Yourself

GitHub Repository: [namanyayg/trends-ai](https://github.com/namanyayg/trends-ai)

Live Demo: [trends.nmn.gl](https://trends.nmn.gl)