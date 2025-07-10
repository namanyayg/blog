---
title: "MCP Getting Started: Model Context Protocol on Windows"
layout: post
date: 2025-04-25
categories:
 - ai
 - mcp
excerpt_separator: <!--more-->
is_featured: false
post_promotion_type: giga-reviewer
---

MCPs are a way for AIs to interact with the outside world. An MCP can allow AI to read emails, post tweets, message your friends, and much more.

We are used to interacting with the digital world via apps and windows&mdash;but MCPs enable an AI to do everything that humans do, without using any apps. 

Here's a quick guide on setting up and using your first MCPs in Windows.

<!--more-->

## Choose your AI

To interact with any MCPs, you first need an app that allows you to interact with an AI.

This is referred to as a "client". The top option is [Claude Desktop](https://claude.ai/download), but you can also use Cursor or Windsurf.

<img src="{{ '/assets/claude-desktop.jpg' | relative_url }}" alt="Claude Desktop MCP Client">

For this guide, we'll be using Claude Desktop, so install it to follow along.

## Configuring MCPs

All MCP configurations follow a generic format, which is something like:

```js
{
  "mcpServers": {
    "mcp-name": {
      "command": "npx", // or uvx
      "args": [
        "-y",
        "mcp-package-name", // on the package registry
        // any other args
      ],
      "env": {
        // e.g. provide API keys here
      }
    }
  }
}
```

For Claude Desktop, the file you add this config is `%APPDATA%\Claude\claude_desktop_config.json`

## Your first MCP

The easiest (and one of the most useful) MCPs to start with is the "filesystem" MCP.

This allows Claude Desktop to read/write any files.

Here's what you need to add in `mcpServers` in your `claude_desktop_config.json` file:

```js
"filesystem": {
  "command": "npx",
  "args": [
    "-y",
    "@modelcontextprotocol/server-filesystem",
    // list of folders you want Claude to be able to access
    "C:\\Users\\username\\Desktop"
    // I let it access the Claude folder itself, so Claude
    // can modify the `claude_desktop_config.json` file by itself
    // to add/remove any MCP servers I want
    "C:\\Users\\username\\AppData\\Roaming\\Claude"
  ],
  "env": {
    "DEBUG": "*"
  }
},
```

After setting up any MCP, you will need to quit and restart Claude from the Task Manager for it to refresh your config.

But once that's done, Claude will be able to read/edit any of your files. This is what it looks like:

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">working! claude can now add it&#39;s own MCPs via an MCP :)<br><br>now to get the Twitter MCP to work: I need to get my Twitter API keys <a href="https://t.co/rajLZ6cLkN">https://t.co/rajLZ6cLkN</a> <a href="https://t.co/6wQ3H5a1ri">pic.twitter.com/6wQ3H5a1ri</a></p>&mdash; neo (@NamanyayG) <a href="https://twitter.com/NamanyayG/status/1915807186254496220?ref_src=twsrc%5Etfw">April 25, 2025</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script> 

## What's next?

I am experimenting with MCPs, with my eventual goal being to complete all of my regular tasks (reading/writing emails, tweets, reddit, etc.) through an AI. Stay tuned for more posts about interesting things you can do with MCPs! 

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">i slept on MCPs... but they are pure DISRUPTION<br><br>the world of apps/windows/websites is DEAD <br><br>(people just don&#39;t know it yet)<br><br>So, I&#39;m starting something to show everyone how powerful this can be<br><br>&amp; ofc building in public + open source<br><br>MY GOAL: eliminate ALL windows, apps,… <a href="https://t.co/4bpwCRScop">pic.twitter.com/4bpwCRScop</a></p>&mdash; neo (@NamanyayG) <a href="https://twitter.com/NamanyayG/status/1915796892409045351?ref_src=twsrc%5Etfw">April 25, 2025</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script> 

## Further Reading

* [My MCP experiment](https://x.com/NamanyayG/status/1915796892409045351)
* [Setting up MCPs on Windows](https://gist.github.com/feveromo/7a340d7795fca1ccd535a5802b976e1f)
* [Official MCP Docs](https://modelcontextprotocol.io/quickstart/user)
* [List of interesting MCP servers](https://modelcontextprotocol.io/quickstart/user)