---
id: 19
title: 'Konami code javascript (and other easter eggs)'
date: '2012-11-02T13:00:00+00:00'
author: namanyayg
layout: post
guid: 'http://symmetrycode.com/?p=12'
permalink: /konami-code-javascript-easter-eggs
permalink_old: /2012/11/02/konami-code-javascript-and-other-easter-eggs/
categories:
    - Uncategorized
tags:
    - Other
---

Who doesn’t love easter eggs? You’ve got to admit, easter eggs are awesome!

One of my personal favorites for easter eggs is the Konami code.

Originally a cheat code, AKA Konami Command, it was popularized by the amazing game contra.

…And you can make a version to place it on your website as well, using a little bit of Javascript magic.

…And once you learn that, you can use any word as an easter egg!

### The logic

Here, we’ll have two strings. One for the code, and the other for what the user enters. The keys that the user enters will be combined to make a string, which will be then compared with the ‘code’ string to check if the user has entered the code.

If they have, then, we’ll add some HTML to an otherwise blank element, and add a class to it which makes it popup. We will then clear the user input.

[Final Result](http://demos.namanyayg.com/contraplayer)

### The HTML

The html is simple. Just add an empty class, with a somewhat cryptic/funny/weird id/class name. I usually add it in the end, just before I end body.

```html
<div class="eccentricaGallumbits"></div>
```

### The CSS

The CSS I write is for a modal box. Basically, after the code has been entered, the CSS class will be applied to the element using Javascript.

Here’s the CSS I wrote:

```css
.eroticonsix {
position: fixed;
padding: 2em;
box-sizing: border-box;
width: 50%;
height: auto;
margin: 0 auto;
top: 10%;
left: 25%;
background: #eee;
color: #666;
text-shadow: 1px 1px white;
border-radius: .75em;
border:1px solid #ddd;
box-shadow: 0 0 5000px 5000px rgba(0,0,0,.9);
}
```

Notice the exaggerated spread and blur of the drop shadow. This is to give a ‘background’ to the whole thing, which covers every content underneath the modal box with a layer of 90% opaque black color.

![Konami Code Javascript and other easter eggs - Modal Box](http://i.symmetrycode.com/2012/11/Konami-Code-Javascript-and-other-easter-eggs-Modal-Box.png "Konami Code Javascript and other easter eggs - Modal Box")

And finally…

### The Javascript

For this, a few variables need to be defined. I’ll keep all my variables in an object, to [avoid global variables](http://www.yuiblog.com/blog/2006/06/01/global-domination/). I’ll then call an [IIFE (Immediately invoked function expression)](http://benalman.com/news/2010/11/immediately-invoked-function-expression/), passing the object as a parameter, to have a simpler and shorter way to reference the variables.

It might sound tough to grasp, but here’s an example.

```js
var obj = {
    foo: "bar", //To access this, use obj.foo
    baz: 1 + 2 //To access this, use obj.baz
};

(function(v) {
console.log(v.foo); //Equals obj.foo, Equals "bar"
console.log(v.baz); //Equals three
})(obj);
```

This [amazing article about IIFE, by Ben Alman](http://benalman.com/news/2010/11/immediately-invoked-function-expression/) will help in a better understanding how it works and why.

**Setting the variables**

In a large project, it is better to make a main, variable object, and as it’s properties, add other objects, which divide it categorically. Although not required here, I’ll still do that, if the need arises to expand this project.

I’ll need the variables for the code, the user input, and the DOM element for the easter egg (which we obtain using `document.querySelector`). Here’s how the code looks.

```js
var vari = {
    easter: {
        code: "38 38 40 40 37 39 37 39 66 65 ",
//These are the keyCodes for up up down down left right
// left right B A. More explained later.
        userIn: "",
        easter: document.querySelector(".eccentricaGallumbits")
    }
//We don't place the properties here, as we might need to use
//Other, unrelated variables (perhaps for a slider) and that
//would seem disconnected and ugly.
};
```

All this, along with the remaining code, is wrapped in a [DOMContentLoaded](https://developer.mozilla.org/en-US/docs/DOM/DOM_event_reference/DOMContentLoaded) event listener. It isn’t compatible below IE9, so it’s better you use a [cross browser hack, which I found in an answer in stack overflow](http://stackoverflow.com/a/6352840). I don’t care if it works below IE9 or not, you can either use the stackoverflow solution, or simply use “load” instead of “DOMContentLoaded”.

```js
window.addEventListener("DOMContentLoaded", function() {…}, false)
```

**The function**

Now, we write the IIFE, which uses `vari.easter` as an parameter.

```js
(function(v) {…}(vari.easter));
```

![Konami Code Javascript and other easter eggs - Live Code](http://i.symmetrycode.com/2012/11/Konami-Code-Javascript-and-other-easter-eggs-Live-Code.png "Konami Code Javascript and other easter eggs - Live Code")

We place an event listener for a keydown. If there’s a keydown, we record it’s keyCode in a variable, like this.

```js
window.addEventListener("keydown", function(e) {
//Argument E passes the key pressed

var e = e.keyCode; //keyCode is a number for each key on the keyboard.
// That means, a and A have the same keyCode.
//This can be bad, but for our needs it is sufficient.
…
}, false)
```

Then, we keep adding the keyCode to the `userIn` string.

```js
v.userIn += e + " "; //Remember, we need to use v.variableName,
// As we passed vari.easter as a parameter, which equals v.
```

Finally, we check if they code is contained in the userIn string, using indexOf.

```js
if(v.userIn.indexOf(v.code) >= 0) {…}
//indexOf returns the position of the asked string
//in the given string.
//Here, it will return the position of v.code (Which, if you
//remember, is 38 38 40 40 37 39 37 39 66 65) in v.userIn.

//If v.userIn doesn't contain v.code, the result would be -1.
//If it does, the result would be a number greater than or equal to 0.
```

If it does, and our `if statement` works, we do the following things.

- Apply the modal box class to the element.
- Add some content to the element using innerHTML.
- Reset the v.userIn variable.

Here’s how I did that.

```js
v.easter.className += " eroticonsix"; //The class in which I put modal effects was eroticonsix.
//Bonus points if anyone gets what I mean by that.
v.easter.innerHTML = 'You found the easter egg! Thanks for reading <a href="https://nmn.gl/blog/konami-code-javascript-easter-eggs">my article!< \/a> :)'; //Add anything you wish! :) v.userIn = ""; // The 'reset'
```

…And you’re done with the konami code!

[Final Result](http://demos.namanyayg.com/contraplayer)

But hey, in the title, I promised that I’ll show other easter eggs!

### Making easter eggs with different codes!

Basically, you’ve learnt everything you need for a function that executes when specific keys are typed in a specific order.

The problem is, that you don’t know the keyCodes for each and every key (Nor are you expected to know them)

For this, I use a really simple solution. I add a statement to log userIn after each key down, type the required trigger string in the browser (Example, 42) and then I check the console for the keys. I then change the ‘code’ variable using those keys.

Here’s it in the JS.

```js
window.addEventListener("keydown", function(e) {
        var e = e.keyCode;
        v.userIn += e + " ";
        console.log(v.userIn);
}, false);
```

And then you just copy and paste the result from the console logs into the code variable, manually.

And you’re done! Now, you can make use any set combination of key presses to trigger an easter egg!