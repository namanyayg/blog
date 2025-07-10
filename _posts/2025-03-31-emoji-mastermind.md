---
title: "Making an emoji terminal game in an hour"
layout: post
date: 2025-03-31
categories:
 - recurse
excerpt_separator: <!--more-->
is_featured: false
---

I recently moved to NYC since I was accepted by the [Recurse Center](https://recurse.com/), and today was my first day at their hub.

The day started by nerding out on the retro computers, hardware labs, and 3d printers they have; followed by the first breakfast bagel of my life. I feel incredibly fortunate to be surrounded out by so many talented programmers and am looking forward to the next three months with my new friends! 

<!--more-->

As part of our first day, we had a workshop about pair programming. For those who don't know, pair programming involves two people working together on one computer, helping accomplish a specified programming goal and sharing ideas and approaches with each other. It's one of the best ways to connect with fellow programmers, you learn a lot about each other.

[Presley](https://github.com/durumu) and I were paired together and tasked to build a "Mastermind" game in an hour using Python. Mastermind is basically Wordle's predecessor but uses colors instead of letters. I don't know idomatic Python, but fortunately Presley is extremely knowledgeable so we were a quite capable team.

We built out a basic TUI Mastermind implementation in around 45 minutes. We originally planned to convert it to a full GUI at the end, but we were pragmatic and realized that we weren't going to be able to do that in the remaining time.

Instead, we decided to go in a slightly different direction: **why not emojis?**

We finalized our entire theme around the concept of emojis, making the final version called "Emoji Mastermind". Instead of colors, you use emojis. Instead of 'pegs', you get hearts. A fun twist on the classic game. We demonstrated to our peers to much applause!

<figure>
  <img src="{{ '/assets/emoji-mastermind.png' | relative_url }}" alt="Emoji Mastermind" />
  <figcaption>Emoji Mastermind in action</figcaption>
</figure>

Check out [Emoji Mastermind on Github](https://github.com/namanyayg/emoji-mastermind), I'd love to have you try it out!

<!-- newsletter_widget -->

By the way, if you're interested in taking your programming skills to the next level, check out the [Recurse Center](https://recurse.com/) and consider applying!