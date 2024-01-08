---
id: 60
title: 'Setting Up a Local Shopify Theme Development Environment in Seconds'
date: '2017-04-07T13:01:34+00:00'
author: namanyayg
layout: post
guid: 'http://symmetrycode.com/?p=56'
permalink_old: /2017/04/07/setting-up-a-shopify-theme-development-environment-in-seconds-2/
categories:
    - Uncategorized
---

A quick way to get a local shopify dev environment going:

## Installation and Setting Up

The first step is to [install ThemeKit](https://shopify.github.io/themekit/).

Then, from your Shopify admin, Apps &gt; ‘View Private Apps’ &gt; Generate API Credentials with “Theme Templates and Theme Assets” to “Read and write” (doesn’t matter what the rest are) &gt; Save &gt; Copy the ‘password’ and store it.

## The Environment

If you want a new theme, then:

```bash
theme bootstrap --password=[password] --store=[yourstore.myshopify.com]  
```

If you want to use an existing theme, get the theme ID from the shopify admin. Go to Online Store &gt; Themes and select “Edit HTML/CSS” on the theme you want a local environment of. Copy the digits at the end of the URL — this is your theme ID.

Then, configure and download with:

```
theme configure --password=[password] --store=[youstore.myshopify.com] --themeid=[your-theme-id]  
theme download  
```

## Running

Use `theme watch` to run with a watcher on all the theme files and live-upload to the site.