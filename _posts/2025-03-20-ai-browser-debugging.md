---
title: "I cut my browser debugging time in half using AI & MCP"
layout: post
date: 2025-03-20
categories:
 - ai
 - cursor
 - mcp
excerpt_separator: <!--more-->
# image: /assets/ai-and-learning-meta.jpg
# twitter_image: /assets/ai-and-learning-meta.jpg
# twitter_card: summary_large_image
# social_metrics:
  # views: "1,000,000"
  # reddit: "2,500+ votes"
  # hackernews: "100+ comments"
is_featured: false
---

In 12 years of my dev career, I've spent countless hours battling browser bugs. 

Recently, I discovered an MCP that's cut my debugging time in half.

MCP as a term is being overused too much, but just understand them as APIs that AI agents can use.

I found an MCP to let AI see and interact with your browser, called [BrowserTools](https://github.com/AgentDeskAI/browser-tools-mcp). Once you integrate it with Cursor, you can ask it see what's going on in your browser and the console.

<!--more-->

## The "aha" moment"

I recently faced issues in my payment flow, where the payment callback didn't seem to be working.

I simply typed: "Check what's happening when users click the pay button and fix any JavaScript errors."

Rather than me needing to do it manually, the AI was able to recognize the console logs, correlate them to the appropriate lines of code, and then fix it. All by itself.

## How it works

BrowserTools MCP consists of three components:

1. A Chrome extension that captures console logs, network activity, screenshots, and DOM elements
2. A Node server that processes this information locally on your machine
3. An MCP server that lets AI clients like Cursor interact with your browser data

Everything stays on your local machine — no data gets sent to external services.

## Ways you can use this

### 1. Console log analysis

Instead of scanning through hundreds of console messages, I ask: "Summarize the console logs and identify recurring errors."

Last week, the AI caught a memory leak causing performance issues that I would have missed. Fixed before deployment, saving both user frustration and future debugging time.

### 2. Network traffic debugging

Rather than clicking through dozens of network requests, I ask: "Which API calls are failing when users complete a payment?"

The AI immediately identified a mismatch in the authorization token, causing 401 errors. Pattern spotted and fixed in minutes.

### 3. DOM analysis

When facing layout issues, I say: "Why aren't these validation messages showing correctly?"

The AI examines DOM structure, CSS rules, and JavaScript interactions to find the exact problem. It once spotted I was appending error messages to elements without changing their visibility&mdash;fixing a UI animation bug.

## Getting started

There are detailed instructions in the [BrowserTools MCP installation docs](https://browsertools.agentdesk.ai/installation#installation), but a brief overview:

1. Install the Chrome extension using developer mode
1. Set up the Node server locally using `npx @agentdeskai/browser-tools-mcp@1.2.0`
1. Configure the MCP server in your IDE. Here are instructions for [Cursor](https://docs.cursor.com/context/model-context-protocol)

The 10-15 minute setup is worth every second. Start with simple prompts like:

"Show me all errors in the console"
"Check why this button click isn't working"
"Analyze network requests to the `/api/users` endpoint"

<!-- newsletter_widget -->

## The future

As a solo developer, browser debugging used to be one of my biggest time sinks. Now, I spend less time fixing bugs and more time building features that matter to users.

By embracing AI as a development partner and powering it up with MCP, I've been able to accomplish much more than I could alone.

Have you tried using AI for browser debugging? I'd love to hear your experiences on [Twitter](https://x.com/NamanyayG).
