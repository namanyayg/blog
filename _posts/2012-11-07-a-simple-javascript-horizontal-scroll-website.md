---
id: 45
title: 'A simple javascript horizontal scroll website'
date: '2012-11-07T13:00:00+00:00'
author: namanyayg
layout: post
guid: 'http://symmetrycode.com/?p=38'
permalink_old: /2012/11/07/a-simple-javascript-horizontal-scroll-website/
categories:
    - Uncategorized
tags:
    - Other
---

Horizontal scrolling websites—although not the norm (nor very usable) sure look very amazing.

In this tutorial, we’re going to create an amazing, simple, javascript horizontal scroll website, for a fictional group of musicians who live on Mars.

Focus will be on the code, colors, and fonts. The overall ‘theme’ for the site would be fun and wacky.

## The Markup

We’re going to have a simple, tri-page layout.

We’ll divide the pages into Home, About, and Contact. Each will be wrapped in a section, that will have the class `pageN`, where N is the page number *(ie, Home = 1, About = 2..)* and the id corresponding to the page name *(ie, Home will have an id of “home”)*.

Inside the section, there will be a wrapper division, to set widths for elements.

At the bottom, there would be a menu bar. Three items, corresponding to each page. They’ll be linking internally *(ie, the menu item Home will link to ‘#home’)*.

Also, in the head, we’ll call for the fonts [PT Sans](http://www.google.com/webfonts/specimen/PT+Sans) and [Shadows into Light](http://www.google.com/webfonts/specimen/Shadows+Into+Light), apart from our stylesheet and script.

## The styling

As with I do with **all** my projects, I placed [Normalize.css](https://github.com/necolas/normalize.css) at the top of my CSS. ([Here’s what I usually start with](https://github.com/namanyayg/sympl)) All the heading tags were set to the font “Shadows into light”, while `body`had a font size of 100%, line-height 1.5, and font PT Sans.

### The Menu

The menu had a width of 100%, and position fixed, with bottom, left, and right being 0. Font size was 2em, line-height 1.5, and the font set to be Shadows Into Light. The individual list elements had 33.333333% width, and were floated left. The list-style was set to none, so no bullets appear.

```css
.main {
  width:100%;
  position:fixed;
  bottom:0;left:0;right:0;
  font: 2em/1.5 Shadows Into Light;
}

.main ul {
  padding:0;
}

.main li {
  list-style:none;
  width:33.333333333333333333333%;
  float:left;
}
```

Finally, all the styles were applied to the anchor tags. I firstly changed their box-sizing to border-box *(WITH browser prefixes)*, so that it includes padding and borders. I added a few styles for decoration (Which you can see below)

```css
.main a {
  list-style:none;
  float:left;
  text-align:center;
  padding: .25em 0;
  border:1px solid rgba(0,0,0,.3);
  text-decoration:none;
  color:white;
  text-shadow: 1px 1px black;
  width:100%;height:100%;
  border-top:none;border-bottom:none;

  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  -ms-box-sizing: border-box;
  -o-box-sizing: border-box;
  box-sizing: border-box;
}
```

Then, I used [nth-child](http://css-tricks.com/how-nth-child-works/) to declare different background colors and borders for each part.

```css
.main li:nth-child(1) a {
  background:#02d7ca;
  border-left:none;
}

.main li:nth-child(2) a {
  background:#d84c00;
}

.main li:nth-child(3) a {
  background:#fff880;
  border-right:none;
}

.main a:hover {
  color:white;
}
```

As you can see, I also declared the hover state, through which the text changes color to white on hover.

### The Content

I wanted to keep the content area simple, design wise. Each ‘page’ had single blocks of color as background, a big heading, and 2-3 paragraphs. Here’s the CSS

```css
.page1, .page2, .page3 {
  background: #02d7ca;
  float:left;
  min-height:100vh;
  width:100%;
  color:white;
  overflow:hidden;

  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  -o-box-sizing: border-box;
  -ms-box-sizing: border-box;
  box-sizing: border-box;
}

.page2 {
  background:#d84c00;
}

.page3 {
  background:#fff880;
  color:#666;
}
```

![Javascript Horizontal Scroll Site Preview](http://i.symmetrycode.com/2012/11/Javascript-Horizontal-Scroll-Site-Preview.png "Javascript Horizontal Scroll Site Preview")

Note that I used `100vh`. VH is a unit of measure of length, denoted 1/100 of the height of the viewport. It’s a totally responsive unit, however, isn’t backward compatible. If you want backward compatibility, add:

```css
html, body, wrapper,  {
height: 100%;
}
```

This is because [percentage values need to refer to their parent.](http://stackoverflow.com/questions/4789835/css-100-height-doesnt-work) I added a “smooth” class, which had transitions. This will be used by JS.

```css
.smooth {
  -webkit-transition: all 1s ease;
  -moz-transition: all 1s ease;
  -o-transition: all 1s ease;
  -ms-transition: all 1s ease;
  transition: all 1s ease;
}
```

### The Contact Form

The only thing I feel worth detailing here is the button for the contact form. Here’s the CSS which we’ll study in detail.

```css
button {
  width:50%;
  text-align:center;
  font: 2em/1.5 shadows into light;
  padding:.5em;
  margin: 0 auto;
  border:none;
  outline:none;
  display:block !important;
  background:#d84c00;
  border-radius:.5em;
  border:1px solid rgba(0,0,0,.2);
  border-bottom:.25em solid rgba(0,0,0,.1);
  border-right:.25em solid rgba(0,0,0,.2);
  color:white;
  text-shadow: 1px 1px black;
  margin-top:0;
}
```

The important parts here are the borders. Note how I have a lighter color border. Coupled with the border-radius, this gives us a nice 3D effect. Apart from that, other things were miscellaneous and you can do without them. Check out [my CSS](http://demos.namanyayg.com/musicose/css/style.css) if you have any problems.

![Javascript Horizontal Scroll Site Contact Form](http://i.symmetrycode.com/2012/11/Javascript-Horizontal-Scroll-Site-Contact-Form.png "Javascript Horizontal Scroll Site Contact Form")

## The Javascript

There are mainly 3 challenges to tackle to obtain desired functionality.

- Change pages with transition if using arrow keys.
- Change pages with transition if someone clicks an internal link pointing to a page.
- Change the title of the page after each change.

We’ll tackle each in steps.

…but, before that, here’s what I put in my file.

**Used a modified version of smallest domready ever**

```js
function checkIfReady(fn) {
    /in/.test(document.readyState)?setTimeout(function(){checkIfReady(fn)}, 9):fn()
}

checkIfReady(function (){...});
```

This is to load the javascript as soon as the DOM elements are loaded (basically, asking it not to wait for media like audio, images, etc). Modified off [Smallest domready ever](http://www.dustindiaz.com/smallest-domready-ever)

**Shortened commonly used things**

```js
function $(el) {
    return document.querySelector(el);
}

function tag(el) {
    return document.getElementsByTagName(el);
}
```

Basically, now I can use $(‘.nameOfClass’); to refer to a class and put document.querySelector on it, and similar for the second one.

### The logic

As seen in the HTML and CSS, we have a class called `page-container` which acts as a mask for the pages underneath. If we decrease it’s left margin by 100, then the next page shows up. Using this, we can change what page shows and when.

### The Initialization

```js
var pages = [$('.page1'), $('.page2'), $('.page3')], //Got each page.
    pageContainer = $('.pages-container'), // Got pages-container class.
    pageWidth = (100/pages.length) + '%', // Set length of pages. If 3 pages, then, = 100/3 = 33%
    anchors = tag('a'), n = 0, isSmooth = false, // Anchors = all anchors on page. N and isSmooth used later.
    titles = ["MusiCode - Home", "MusiCode - Our Work", "MusiCode - Contact Us"]; //Titles for each page.

(function() {
    pageContainer.style.width = pages.length + '00%'; // Set pageContainer's width.
    for (var i = 0, page; page = pages[i]; i++) {
        page.style.width = pageWidth;
        page.style.float = "left";
    } // Sets width of individual pages.
}()); // An IIFE.
```

At the start, I declared a few variables. I also wrote an [IIFE](http://benalman.com/news/2010/11/immediately-invoked-function-expression/), which set widths for page container and pages.

### Changing pages with arrow keys

First off, we’ll detect which keys are being pressed by the user.

```js
window.addEventListener("keydown", function(evt) { // Runs as function on each key press by user.
    evt = evt.keyCode || window.event.keyCode; // Sets variable evt to be the keyCode of the pressed key.

    if (evt == 37) {...} // 37 = Left arrow key. If left arrow key is pressed, do this.

    if (evt == 39) {...} // 39 = Right arrow key.
}, false)
```

We have a control variable n, which we defined previously.

If we press the left arrow key, the control variable is deducted. However, if the control variable is already 0, then it will be the number of pages, ie, 3.

If we press the right arrow key, the control variable is increased. However, if the control variable is max, ie, 3, then it will be reduced to 0.

This is quite similar to the movement I described in one of my previous posts, which involved [making a full page slider](http://symmetrycode.com/full-page-slider-html5-css3-js/).

```js
window.addEventListener("keydown", function(evt) {
    evt = evt.keyCode || window.event.keyCode;

    if (evt == 37) {
       (n === 0) ? n = 2 : n--; //Checks if n is 0.
       // If it is, then it changes to 2.
       // If not, then it is reduced by 1.
       checkAndMove(n);
    }

    if (evt == 39) {
       (n === 2) ? n = 0 : n++; // Checks if n is 2.
        // If it is, then it changes to 0.
        // Else, it is increased by 1.
        checkAndMove(n);
    }
}, false)
```

You’ll see that I called a function, called checkAndMove. What the function does is:

- Checks if the smooth class is applied or not.
- Changes the page margin according to n.
- Changes the title of the page according to n.

```js
function checkIfSmooth() {
  if (!isSmooth) {
  // The isSmooth variable, which we declared on start, had a value of false.
  // This checks if isSmooth is NOT true.
      pageContainer.className += " smooth"; // Adds class.
      isSmooth = true; // Changes to true, so class isn't added again.
  }
}

function checkAndMove(n) {
    pageContainer.style.marginLeft = '-'+n+'00%';
// Example, if n = 1, then left margin of container is -100%.
    checkIfSmooth();
    document.title = titles[n];
}
```

### Setting internal links

The logic here is that the code first checks all the links, whether or not they have a ‘hash’, to identify a potential internal link.

If it has, then, it splits the link into two parts—before and after the hash.

The after the has part is then compared to the pages. If it is any of the pages, then, a function is called that moves the current page location and sets the title.

```js
for (var i = 0, anchor; anchor = anchors[i]; i++) {
    anchor.addEventListener("click", setNavigation, false);
}
```

To call it on all anchors, I used the above code.

`anchor = anchors[i]` is a confusing part. i is always increasing. If i gets larger than the number of items in the array, then, anchor = anchors\[i\] will turn out to be false, and the if statement will stop.

Here’s how I checked it’s an internal link, matching with a page name, and then executed the function.

```js
function setNavigation(e) {
    var anchor = this,
        href = anchor.href; // Gets the href attribute of the link.

        if (href.indexOf('#') !== -1) { //Checks if there is a hash in the url.
            href = href.split("#")[1]; // Splits into two, selects the second part.

            if(href === "home" || href === "work" || href === "contact") { e.preventDefault(); checkIfSmooth(); }
// If matches with any of the navigational links, then, stop the default action and check if the class smooth is applied.
            if(href === "home") { controlAnchorMovement(0); }
            if (href === "work") { controlAnchorMovement(1); }
            if (href === "contact") { controlAnchorMovement(2); }

        }
}
```

Now, what the `controlAnchorMovement` function does is:

- Changes the margin of pageContainer.
- Changes the title of the page.
- Updates the control variable n.

```js
function controlAnchorMovement(x) {
    pageContainer.style.marginLeft = "-" + x + "00%"; // Changes margin.
    document.title = titles[x]; // Sets title.
    n = x; // Changes n, for future references.
}
```

And, you’re done!

[Final site](http://demos.namanyayg.com/musicose/)