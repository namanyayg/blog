---
id: 37
title: 'Tips for getting perfect contrast in design'
date: '2012-05-13T13:00:00+00:00'
author: namanyayg
layout: post
guid: 'http://symmetrycode.com/?p=30'
permalink_old: /2012/05/13/tips-for-getting-perfect-contrast-in-design/
categories:
    - Uncategorized
tags:
    - Other
---

Maintaining right amount of contrast between a foreground element, and a background element is important. Contrast well done can improve the overall look to the website, and could also help to direct viewers eye path. Bad contrast on the other hand, makes the website look boring.

## What is contrast?

As wikipedia sums it up nicely,

> **Contrast** is the difference in [luminance](http://en.wikipedia.org/wiki/Luminance "Luminance") and/or [colour](http://en.wikipedia.org/wiki/Colour "Colour") that makes an object (or its representation in an image or display) distinguishable.”

A easier way to say this would be, “contrast makes objects easy to tell apart”.

Contrast in design is usually achieved by using borders.

## Contrast on text

To make text look better and legit, you have to add a shadow to the text, or, a thin line running along text.

It is prevalent on this website. You can see, a thin white line keeps along with text.

If you have a light background, then, a 30% opaque black line along text will make it look good. However, this can add the feeling that the text is popping out, that’s why, I usually add a pure white line along text on lighter backgrounds.

If the background is dark, a 70% white shadow along text would be sufficient.

### Contrasting text in Photoshop

Contrasting text in photoshop (or any other graphic editing software for that matter), is easy. All you have to do, is add a light/dark (depending on the background) drop shadow to the text.

### For The Web

You’ll have to use CSS for adding contrast to text for use on web. The property to use is “text-shadow”. Here is how text shadow is to be used.

`text-shadow:1px 1px 1px color;`

You could either put the color in hex values, OR, if you don’t bother looking for a suitable color, you can simply use rgba (red green blue alpha) like rgba(0,0,0,0.3); (which would mean 30% black)

If you’re using rgba, your code will look like

`text-shadow:1px 1px 1px rgba(0,0,0,0.3);`

*(Protip #1 – You can use negative values too, to get interesting effects.)*

##  Contrast on boxes

### In photoshop

Again, easy. Just add a 1px stroke to the element.

### For the Web

To add contrast to boxes for the web, just add –

`outline:1px solid color;`

As mentioned previously, you can use either hex, or rgba.

`outline:1px solid rgba(255,255,255,0.75);`

## Live Examples

The first is on my blog. If you look, you can see the text has a white shadow underneath (sorry IE users!)

![Contrast in Text on NamanyayG](http://i.symmetrycode.com/namanyaygTextContrast1.png "namanyaygTextContrast")

Another, is on a theme I designed, juicee. See the main content box, it has a clear outline, to distinguish it from the background.

![Contrast on Juicee](http://i.symmetrycode.com/DietMeContrast.gif "DietMeContrast")

*Further Reading :*

*[http://en.wikipedia.org/wiki/Contrast\_(vision)   ](http://en.wikipedia.org/wiki/Contrast_(vision))<http://www.webdesignerdepot.com/2010/09/fully-understanding-contrast-in-design/>*
