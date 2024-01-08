---
id: 73
title: 'Bye Ghost, hello again WordPress!'
date: '2017-08-28T09:51:34+00:00'
author: namanyayg
layout: post
guid: 'http://symmetrycode.com/?p=73'
permalink_old: /2017/08/28/bye-ghost-hello-again-wordpress/
categories:
    - Uncategorized
---

Ghost… I tried. Trust me, I really did. I [stuck with you for over 3 years](http://symmetrycode.com/images-and-excerpts-a-few-practical-problems-with-ghost/), developed a custom theme on you, hacked around any shortcomings you had. But yesterday, I had to give up. Trying to upgrade from 0.11.x to 1.x had to be one of the most annoying experiences I’ve had recently and enough is enough. It’s not me, it’s you.

…

So I login to `/ghost` to pen a [new post](http://symmetrycode.com/instant-real-time-rss-to-email/) and I’m greeted with *2 bars at the top asking me to upgrade*. I agree and check out that Ghost is finally version 1, woohoo! Then I check out the [migration guide](https://docs.ghost.org/v1.0.0/docs/migrating-to-ghost-1-0-0)…

*Prepare your theme in advance*

*Backup your content using the JSON exporter*

*Create a brand new Ghost v1.0.0 site following our install guide*

*Use Ghost v1.0.0 Importer to import existing content*

*Copy your images to your new site.*

*Upload your theme – your theme will not be uploaded from the importer*

Alright then — I start by preparing my custom theme. Upload it to [gscan](https://themes.ghost.org/docs/gscan) and do a few find and replaces and I’m good. The backup is pretty quick, too. I then get to the part where everything got stuck — [installing Ghost CLI](https://docs.ghost.org/v1.0.0/docs/install).

## Ghost CLI is opinionated and broken

Ghost CLI seems to be focused more to make Ghost Pro easier to maintain for the team, simply because of how opinionated it is. Support only for Ubuntu + Nginx? Node v6 (I’ve read [the reasons](https://docs.ghost.org/v1.0.0/docs/supported-node-versions#section-why-follow-lts-) and it seems like laziness, but I understand that they’re a business and need to be pragmatic with priorities)? I hit `n install lts` to downgrade to Node 6 from v8.4.0 and try to `npm i -g ghost-cli.`

All’s good. I do `ghost install` in my ghost directory and everything breaks. I’m [greeted with 3 screens of error logging](https://github.com/TryGhost/Ghost-CLI/issues/407) and so I browse around a couple of Github issues to make sense of it. I double, then triple, check MySQL and my MySQL credentials. I create a new user and new database to check if it helps. Nothing. After spending an hour here and growing tired of the fact that Ghost, in fact, didn’t make my writing any easier or faster; I give up on upgrading, go write and publish my post, and figure out how to move to WordPress.

## We meet again, WordPress

WordPress might be old, clunky, and PHP (heh) — but it works, has basically the largest ecosystem with amazing plugins, and it makes it easier to work with pages *and* posts. I use the \_s base theme, add a way to work with browser-sync and Stylus files, and whip up the [pyaar theme](http://github.com/namanyayg/pyaar) (with lots of code copied from the last design). Turns out that WP and Ghost have pretty similar template hierarchies, just add a class with “entry” changed to “post” wherever you see it (*e.g.,* add `.post-content` to `.entry-content`) and you’ll get the theme more or less working.

Used [Ghost to WP XML converter](http://ahmed.amayem.com/ghost-json-export-file-to-wordpress-xml-import-file-converter/) to transfer all content from posts, moved `/content/images` to `/wp-content/uploads` and added an `.htaccess` 301 Redirect.

I’ve yet to test the theme properly ([let me know if you see anything broken](mailto:mail@namanyayg.com)) and have a lot more content planned that I need to integrate before I can make Symmetrycode what I envision it to be. I’m slightly sad that I lost Ghost, but I guess it made me appreciate WP’s stability a lot more. And it’s good to be back.