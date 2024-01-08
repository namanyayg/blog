---
id: 47
title: 'Analyzing Nokia’s new responsive website'
date: '2012-11-28T13:00:00+00:00'
author: namanyayg
layout: post
guid: 'http://symmetrycode.com/?p=40'
permalink_old: /2012/11/28/analyzing-nokia-s-new-responsive-website/
categories:
    - Uncategorized
tags:
    - Other
---

*Note: This post is simply about the design of the new website, more accurately, is an analysis. Here, you won’t find who did what, statements from people responsible and CEOs, thoughts of their staff on this, etc — you’ll find an honest and detailed analysis of their design.*

And Nokia, like many others, [goes responsive](http://www.nokia.com/global/). This post will detail the things that I like, I dislike, and what we could learn from this redesign.

Using a simple, minimal design, with a grid layout *(which we could claim is inspired from Modern UI)*, Nokia has truly come up with something new, original, and pleasing to the eyes.

### A Brief Overview

As I said above, Nokia’s new site is new and original above as not to alienate, but at the same time, to not look ripped off.

They use the acclaimed, multilingual typeface, [Nokia Pure](http://www.theregister.co.uk/2012/04/26/pure_award/), throughout the website.

A clean, eye pleasing, information first layout is presented to the viewer.

The call to action is the big image + caption, which calls enough attention to itself but doesn’t overpower other elements. Currently, it’s towards their latest phone, Lumia 920.

### The typography

Nokia pure, as the main font choice, is decent. It fits with the company image perfectly (*well, obviously*) to be simple and approachable. Of course, having all phones run this makes the branding more powerful.

But what impresses me the most is that the site looks **great** when on Segoe UI (The second choice in the CSS). I thought that Segoe UI would make it look like a rip-off of the Microsoft website, *but I was wrong*, the site still looked unique!

One minor CSS ‘mistake’ is present. They placed Arial before Helvetica in the CSS.

Arial is installed on pretty much all computers, and compared to Helvetica, is a worse font choice. Helvetica, on the other hand, is a better font choice but is found mostly on Macs. It is rare for Helvetica to be on windows.

I believe that putting Arial before Helvetica was done because on Windows, Helvetica renders poorly. So instead of looking bad on a small percentage of the majority OS, they decided it could look bad on the majority of a minor OS.

Anyway, really low chances are that someone can’t import the first two fonts, and has to fall back on Arial/Helvetica.

The headings all use the same font, Nokia Pure, just in uppercase. Again, great for branding, but adding a little spice by using a different font wouldn’t be a bad idea. However, it looks great as is, so this is not really a big deal.

### The layout

As I’ve been saying, the layout is arguably similar to Modern UI’s. *The wireframes would probably look similar.*

However, I feel that Nokia has done a great job on adding other elements, I find that the finished design doesn’t look like Modern UI at all!

While Modern UI uses different rectangles and squares in their layout (to add variety and an ‘interesting’ factor, I presume), Nokia goes the simpler way — All of the ‘tiles’ are square.

<figure class="align-none" id="post-1140 media-1140">![Modern UI Compared To Nokia](http://i.symmetrycode.com/2012/11/Modern-UI-Compared-To-Nokias-Site.png)<figcaption>Left: Rectangles + Squares. Right: Squares</figcaption></figure>### The Menu

Out of *every* thing, I simply **love** the menu. Just love it. The hover items are clean and crispy, and the search bar is clean and gives a great impression. The logo feels like it’s home.

Talking about responsiveness, Nokia has taken the modern approach of presenting menu items in a dropdown accessible by a click *(yes, it’s icon is a stack of three horizontal lines)* and again, a dropdown for the search as well.

Unfortunately, the dropdown menu looks weird. There is no clear divider between the actual menu and the navigation, nor between individual anchors, and the hover style is *extremely* bad.

The dropdown search feels like I’m using Modern UI.

Overall though, even though a few details were missed, the desktop version of the menu looks great.

### Responsiveness

The responsiveness is another thing I love. Nokia has done a great job at making everything perfect *(well, near perfect)* at all displays.

There are a good amount of breakpoints and the flow is natural; both the most important parts of responsive design.

One thing I really like is that the font sizes start changing once it reaches a set width. After the width, the font-sizes shrink along with the browser window. Real good design.

### As a whole

As a whole, bad things start coming up.

Firstly, why is the background so flat, 2D, and boring? Adding a simple noise texture, or a slight gradient, wouldn’t hurt, and would make the site look loads better.

Secondly, the tiles and all look good, but having two tiles *that keep flipping* is totally annoying. I mean, why!? The tiles seem to be randomly placed, which further aggravates the motion! Those two tiles just break the whole mood of the whole site; something random and unpredictable isn’t supposed to be seen near something calm and organized!

<figure class="align-none" id="post-1141 media-1141">![Nokia](http://i.symmetrycode.com/2012/11/Nokias-sites-fllpping-tiles.-WHY.png)<figcaption>Tiles, what r u doing? TILES, STAHP.</figcaption></figure>Thirdly, I find the contrast between the tiles and the background a bit too low. That, however, is a minor problem, but could be easily solved as well (just add `border: 1px solid #ccc` in the CSS of the tiles). Here’s one place I find Nokia blindly following trends.

FINALLY, the colors. The hover color just looks odd placed with the primary color. However, it does the job of immediately focusing the user, so again, it might be considered okay.

Now, as not to end things on a negative note, there are a some remaining things that I find good as well!

The site looks great, as a thought, as abstract. The layout and font work harmoniously, and there is one, single mood throughout the website (which I believe to be ‘simple and nice’).

They’ve managed to make something original and new, kudos to that. The responsiveness receives a perfect 10/10.

### TL;DR

Nokia shows a new site design, which is responsive, simple, and nice.