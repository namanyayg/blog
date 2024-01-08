---
id: 31
title: 'Images and excerpts – A few practical problems with Ghost'
date: '2014-05-28T02:32:00+00:00'
author: namanyayg
layout: post
guid: 'http://symmetrycode.com/?p=24'
permalink_old: /2014/05/28/images-and-excerpts-a-few-practical-problems-with-ghost/
categories:
    - Uncategorized
tags:
    - blogging
    - ghost
---

Ghost is awesome, it really is! I’ve just started using and developing on it, but I love it already. It’s simple, smooth, and *fast*. You can *feel* the speed when you compare it to traditional CMS’ like WordPress or static generators like Jekyll – I find it to triumph both.

Development is pretty damn easy too. Installing Ghost on Windows was a breeze, and starting development even easier. I fired up Prepros, creating a `SCSS` file for better CSS, and started coding!

Ghost’s writer is it’s biggest advantage, though. Markdown is great to write, and the side-by-side compilation makes writing so much more fun.

However, there are indeed a few practical problems with Ghost that you may encounter soon in one of your projects. I’m going to talk about these here, along with some hacky solutions for them.

- Images can’t use figure/figcaption: Currently, images on Ghost are simple `<img>` tags in paragraphs. I was looking around for image captioning and using figure/figcaption there, but with little results. A [workaround by Lee Lam](https://ghost.org/forum/bugs-suggestions/601-suggestion-image-video-captioning/) could be a quick solution, though.

This is a problem both of Markdown (Which does not seem to support two types of captions, *i.e.* one for the `alt` attribute and other a standard caption) and Ghost.

The [issue](https://github.com/TryGhost/Ghost/issues/985) is set to **won’t fix** until the [Haunted Markdown parser](https://github.com/TryGhost/Ghost/wiki/Haunted-Markdown) is implemented.

- No support for advanced excerpts: With WordPress, you could simple add a `<!-- more -->` somewhere and it handled excerpts with read more for you. Unfortuantely, this isn’t the case with Ghost and by default you see a paragraph of plaintext with a trailing …. Not something particularly beautiful.

[Kraftner on Ghost Forums](https://ghost.org/forum/using-ghost/1287-controlling-excerpts/4/) gives a great solution to that problem. Using `{% raw %}{{ content }}{% endraw %}` instead of `{% raw %}{{ excerpt }}{% endraw %}` allows you to output HTML instead of plaintext, and combining that with some clever CSS rules displays only one paragraph. I use a similar trick at [TLDRtech](http://tldrte.ch/) where all `ul`s are hidden in the ‘excerpt’.

My goal with the post was to highlight some of the common issues, and give <del>hacky</del> solutions for them. That said, I do love Ghost for many, many reasons

- Ghost is fast. You literally feel the difference on the admin panel of Ghost compared to WordPress’
- Installing Ghost is a breeze. It took me less than 2 minutes to install Ghost on my Windows computer. Granted, installing it on Apache is a bit more difficult, but [there are good guides for that](http://www.tfq.me/how-to-host-multiple-ghost-blogs-on-ubuntu-12-04-using-apache/).
- Theme development on Ghost is fun. Handlebars is fun to write, and I’ve set up SCSS compilation with Prepos as well.