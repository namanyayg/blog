---
id: 48
title: 'My workflow for designing websites in the browser'
date: '2013-05-28T13:00:00+00:00'
author: namanyayg
layout: post
guid: 'http://symmetrycode.com/?p=41'
permalink_old: /2013/05/28/my-workflow-for-designing-websites-in-the-browser/
categories:
    - Uncategorized
tags:
    - Other
---

[“Kill Photoshop!” the people say](http://blog.teamtreehouse.com/responsive-web-design-in-the-browser-part-1-kill-photoshop). There are many reasons to stop using Photoshop and start working the browser instead—a few great ones listed in [this webdesign tuts+ article, tips for designing in the browser](http://webdesign.tutsplus.com/articles/workflow/tips-for-designing-in-the-browser/) (Especially the ‘Work Gets Repeated’ and ‘Can be time consuming’ part).

However, many designers don’t know how to start designing websites in the browser—It’s a problem of habit. They’re simply used to Photoshop.

I fortunately started when Photoshop’s influence was less, than say, 5 years ago. Due to that, it was easy and quick for me to make the jump to designing in the browser. Here, I’ll detail how I design sites, for myself and my clients.

## Defining colors, typography and more

Based on the mood and requirements of the site, I decide on typefaces and colors to use. I use [Google Fonts](http://www.google.com/fonts) for fonts, while I make color palettes myself (Or use [Kuler](http://kuler.adobe.com/)).

I then start by making a [Webstile](http://webstiles.namanyayg.com/) (Webstiles is a template that I created myself, to quickly set typography, choose colors, etc. [Webstiles’ Demo](http://webstiles.namanyayg.com/demo)). I find making a Webstile important, since it clears my mind about the design, and acts as a reference which I can visit whenever I stumble on a problem.

Doing this well is definitely important—here, the foundation of the whole site is defined. It’s important that you work patiently and thoughtfully.

## Making a basic site

Next, I pull up a grid (You can use any grid, I personally use one I created myself), and populate it with the content. A content-first approach to web design is simply essential. As Josh Long says in the article about [Killing Photoshop](http://blog.teamtreehouse.com/responsive-web-design-in-the-browser-part-1-kill-photoshop):

> Content out or the content first approach to design isn’t just a fad, it’s gospel

Once I have content ready, I split the content into easily readable chunks and organize them into areas along the grid, to unify similar content and separate different ones. The content is then typeset with proper heading and paragraph tags. The only colors used at this step are shades of grey—it’s necessary to have a clear visual hierarchy defined, even without colors.

## Finalizing the site

Finally, I add colors, textures, images, etc. The site is fully completed by this stage. I ensure that assets are properly gzipped and compressed, and compress the images (Basically, all of the pre-deployment stuff).

In the technical side of things, I use Git throughout all projects, so I committed changes after each major feature addition.

I use YUI compressor as a build script for sublime text, to compress scripts and styles. My server’s htaccess (most of which is based on [H5BP’s htaccess](https://github.com/h5bp/html5boilerplate.com/blob/master/src/.htaccess)) sets caching and gzipping for various assets. On some projects, I use [picturefill](https://github.com/scottjehl/picturefill) or [retina.js](http://retinajs.com/) for retina graphics.

Finally, all is uploaded through good ol’ FTP or SFTP.

<footer class="further-reading" markdown="1">

### Further Reading

- [Tips for designing in the browser - Webdesigntuts+](http://webdesign.tutsplus.com/articles/workflow/tips-for-designing-in-the-browser/)
- [Designing in the browser (Not Photoshop) for a better UX - Tnooz](http://www.tnooz.com/2013/04/29/news/designing-in-the-browser-not-photoshop-for-a-better-user-experience/)
- [Responsive web design in the browser part 1: Kill Photoshop - Team Treehouse Blog](http://blog.teamtreehouse.com/responsive-web-design-in-the-browser-part-1-kill-photoshop)
- [Responsive web design in the browser part 2: The Tools - Team Treehouse Blog](http://blog.teamtreehouse.com/responsive-web-design-in-the-browser-part-2-the-tools)

</footer>