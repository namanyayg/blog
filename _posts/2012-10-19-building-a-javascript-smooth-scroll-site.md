---
id: 43
title: 'Building a javascript smooth scroll site'
date: '2012-10-19T13:00:00+00:00'
author: namanyayg
layout: post
guid: 'http://symmetrycode.com/?p=36'
permalink_old: /2012/10/19/building-a-javascript-smooth-scroll-site/
categories:
    - Uncategorized
tags:
    - Other
---

You must have seen smooth scroll websites. I mean, javascript smooth scroll websites are seen almost every where! This tutorial will show you how you can make a simple javascript smooth scroll website.

This is a part of the series of the design and development of furious nerds, following [Setting the base](https://nmn.gl/blog/setting-base-making-minimal-website) and [Pure CSS image carousel](http://namanyayg.com/weblog/?p=820). However, for this tutorial, it is not required that you read previous posts.

As for the [demo](http://demos.namanyayg.com/furiousnerds/), visit the demo site, and click on any navigation. Notice how it smoothly moves to the corresponding parts. Today, we’re going to learn how to do exactly that. Don’t be intimidated! 🙂 😛

*Revision: Included more detailed explanation of Javascript.*

### Understanding the Logic

Smooth scroll might look easy, but the script has a quite complex logic behind it. First, the script fetches the element to be scrolled to from the anchor tag. Then, it finds the element’s y-coordinate position. It divides the position into a number of ‘steps’ or ‘increments’ (as they’re commonly called) and scrolls by that amount after x milliseconds (X is usually a small number, less than 10).

*(Like what I write? [Show your love on Facebook!](https://www.facebook.com/symmetrycode))*

We’ll learn about each in steps.

### The base

I added a function to shorten the length of `getElementsByTagName` and `getElementById`. Here’s the code-

```js
function e(eel) {
    return document.getElementById(eel);
    // Using e('elementName') will give us document.getElementById('elementName');
}

function t(tel) {
    return document.getElementsByTagName(tel);
    // Same as above. The result, however, is an array here.
}
```

In functions like these, I value brevity over sense, hence the weird names.

I then declared two variables—`links` and `linksCount`

```js
var links = t('a'), //As told above. This will fetch all the anchor tags on the page.
    linkCount = links.length; //This will give us the number of anchor tags.
```

Then, near the bottom, I added a `for` loop to run the smooth scroll functions everytime someone clicks on a anchor tag. Here’s what it looked like –

```js
for(var i = 0; i < linkCount; i++) { // For each and every anchor tag...
    links[i].onclick = smooth.find; // links[i], first iteration, equals links[0],
    // which gives us the first element
    // Smooth.find is a function that will be explained soon.
}
```

I also placed everything into a `window.onload` function.

```js
window.onload = function() {

// All Javascript code

}
```

### The Find function—Fetching the element, and finding it’s y position.

I made a new object, `smooth` and I put two functions in it. The first, I called `find`, which found the information about the element, and called the actual smooth-scroll function.

I made a variable called `toAnchor`, whose value was `this.href`. Whenever the find function was called, with an anchor tag passed as it’s parameter, `toAnchor` would get what was in it’s href.

*Not following? Further explanation below.*

I then had to filter the correct tags, to separate the ones that point to a external link from those that point to an internal one. I checked for # in the `indexOf` the href. Here’s how I did it-

```js
if(toAnchor.indexOf('#') !== -1 ) // Basically, checks if there is a
// # in the string.
```

This checked if the index of # in the href was NOT equal to one. If it WASN’T, then it executed other code, if it WAS, then it left the anchor alone.

After I checked whether there was a hash or not, I had to separate the parts before and after the hash, and use the ‘after’ part.

Here’s how I did it-

```js
var anchor= e(toAnchor.split('#')[1]);
// Takes the part after the hash in the link
```

What the code did was to

1. Split the href into two parts, and convert it into an array. *(split(‘#’))*
2. Pick out the second part of the array *(\[1\])*
3. Run `document.getElementById` on what’s left. *(e(‘…’)*

If I did `console.log(anchor)`, I would get a listing of each element that is linked in the page.

Javascript provides an easy way to find the y-coordinate or offset of an image. We just use the method `offsetTop`. I defined a variable, anchorTop, whose value was `toAnchor.offsetTop - 10`. I added the -10, just because I thought it looked better.

In the end of the function, I put `scrollTop(0,0)` so that any existing scroll values are wiped out, called my next function, `smooth.scroll()` with the argument `anchorTop` and finally, put a `return false;` statement so that clicking the link doesn’t do anything in HTML.

Here’s all of the code –

```js
smooth = {
find: function () {
    var toAnchor = this.href; //'This' here means the current anchor tag.

    if(toAnchor.indexOf('#') !== -1 ) { //If there is an # symbol in the URL...
    var anchor= e(toAnchor.split('#')[1]), //Do this.
    anchorTop = anchor.offsetTop - 10; // anchorTop is equal to the distance of the anchor in question, minus -10

    scrollTo(0,0); //To reset the scroll
    smooth.scroll(anchorTop); // Execute smooth scroll
    return false; // So that the link doesn't do it's default action
    }

},
```

### The Scroll function—the actual javscript smooth scroll

Now here we’re going to use the logic that I explained earlier.

First, we divide stuff into increments, declare a `soFar` variable, whose value is zero, and declare a variable smoothscroll.

```js
scroll: function(top) {
// increment = amt; //Linear
// increment = top * (Math.pow(amt, 3)); // EaseIn Cubic
// increment = top * (1 - Math.pow(1 - (amt), 3)); // EaseOut Cubic

if (time < top/2) {
    increment = top * (Math.pow(amt, 3)); // EaseIn Cubic
} else {
    increment = top * (1 - Math.pow(1 - (amt), 3)); // EaseOut Cubic
}
```

The above might be tough to understand, but it's some math to have better easing in and out functions in the page. It just makes the animation look better, we could've simply used increment=amt (as stated in the first line)

If you don't understand it, don't worry, I'll be writing a tutorial on this too, soon!

We give the value of `smoothscroll` as a setInterval. The setInterval does the following things.

1. Check if `soFar < top`.
2. If it is, then it scrolls the window by the increment amount.
3. It also adds the increment to soFar.
4. If it is not, then it clears the setInterval.

Understood the logic? We'll be using `scrollBy(x,y)` to iterate scroll. Here's what it looks like-

```js
    smoothscroll = setInterval(function() {
        if(sofar < top) {
            window.scrollBy(0, increments);
            sofar += increments;
        } else {
            clearInterval(smoothscroll);
        }
    }, 1);
```

Notice the small timer. Only 1 millisecond. I advice you to keep the number small, as it increase the smoothness of the animation.

With this, we're successfully made a javascript smooth scroll site. Go and test it out!

### What we learnt

- Using methods.
- Using scroll events
- Understanding setInterval and clearInterval

### Conclusion

As always, I won't be presenting the complete code to you, as I want you to learn. If you're stuck, you can refer to the [actual website built](http://demos.namanyayg.com/furiousnerds), and can check out it's [javascript](http://demos.namanyayg.com/furiousnerds/js/script.js).

Now, the only part remaining is the fixed navigation. To do so, we'll use scrollTo and others again, but that's for the next time.

Let me know what you thought of the tutorial in comments.