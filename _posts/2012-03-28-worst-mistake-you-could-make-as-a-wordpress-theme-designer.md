---
id: 15
title: 'Worst mistake you could make as a WordPress Theme Designer'
date: '2012-03-28T13:00:00+00:00'
author: namanyayg
layout: post
guid: 'http://symmetrycode.com/?p=8'
permalink_old: /2012/03/28/worst-mistake-you-could-make-as-a-wordpress-theme-designer/
categories:
    - Uncategorized
tags:
    - Other
---

If you design wordpress themes, like me, you’ll sometimes start one of the default themes as a base. Editing a file of the theme would be okay, but would also wipe every change off once you update it. This is one of the worst mistakes you’ll make, and here is a way to prevent that as well.

My blog right here is a edit by me, of the theme Twenty Eleven by wordpressdotorg. The worst mistake I made while editing the theme is, to directly edit the CSS (and other) files.

Later, I learnt, that these changes would be lost once the theme is upgraded, which means all my hard work gone 🙁 I got a solution to that, though, I’ll have to code it again when it upgrades, but I’ll keep it in mind when I customize another theme.

The solution is **to use wordpress child themes.**

Child themes are the recommend way to edit functionality of a wordpress theme. WordPress defines it as –

> A WordPress child theme is a theme that inherits the functionality of another theme, called the parent theme, and allows you to modify, or add to, the functionality of that parent theme.

Creating a child theme may seem tough, but it is actually very easy. The only required file for a child theme is the style.css. Here’s how one should look –

```
/*
Theme Name: NamanyayG
Description: Child theme for the Twenty Eleven theme 
Author: Namanyay Goel Author 
URI: http: //www.namanyayg.com/ 
Template: twentyeleven 
*/   
@import url("../twentyeleven/style.css");
```

And that’s it! Actually, you only need the parts “Template :twentyeleven” and the “import”. Nothing else. Now go on, edit your wordpress themes in a safe and future secure way. Leave any questions in the comments.