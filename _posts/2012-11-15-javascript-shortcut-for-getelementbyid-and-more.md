---
id: 41
title: 'Javascript shortcut for getElementById and more'
date: '2012-11-15T13:00:00+00:00'
author: namanyayg
layout: post
guid: 'http://symmetrycode.com/?p=34'
permalink_old: /2012/11/15/javascript-shortcut-for-getelementbyid-and-more/
categories:
    - Uncategorized
tags:
    - Other
---

All of us who:

1. Program in Javascript
2. Manipulate the DOM

*Need* to use `document.getElementById` on a regular basis.

The sad thing is that it’s not really effective. Just look at it’s size! Typing it out again and again would be a big pain…

How would it be if you could do this instead?

```js
_.id("helloIAmAnIdWithA#");
```

Awesome, right? I call it a javascript shortcut. It’s better, smaller, easier to remember. Learn exactly how to do the above, and shorten other commonly used methods (I’m looking at you, `document.getElementByTagName`!)

## Starting with getElementById

The concept for this is simple — you make a function that *returns* the intended method, with the correct name.

Example:

```js
function iReturnIds(argument) {
  return document.iFetchIdsFromTheDom(argument);
}
```

Using this for `document.getElementById` gives us

```js
function id(el) {
  return document.getElementById(el);
}

// Usage

id("domElement");
```

Let’s see how it works.

The ‘id’ part is the function name.   
The ‘el’ is an argument supplied by the user.   
It returns document.getElementById(argumentByUser).

One of my friends [wrote about shortening](http://thezillion.wordpress.com/2012/07/24/shortening-document-getelementbyid/) too!

Simple enough? It works, and works well. But here, it’s *still* bad, to make Javascript better, there is still scope for…

## Improving the code

I’ve [outlined in a previous post that globals are bad](http://symmetrycode.com/konami-code-javascript-easter-eggs/) ([Here’s why](http://www.yuiblog.com/blog/2006/06/01/global-domination/)), but here, we’re using globals :/

A simple solution would be to make an object `_`, and place the shortcut as a method, like this.

```js
var _ = {
  id: function(el) {
    return document.getElementById(el);
  }
}

// Usage

_.id("domElement");
```

This would be an okay-ish solution, but a problem could arise if a library uses `_` for something else.

Then, the solution would be to wrap all of this in your main object (This somewhat uses the module pattern) and then call a function with arguments as the object.

Confused? Here’s an example.

```js
var MAINVARS = {
  _: {
    id: function(el) {
      return document.getElementById(el);
    }
  }
}

// Usage

(function(_) {
    _.id("domElement");
}(MAINVARS._));
```

This is some what of a complicated approach, as we’re using the [module pattern](http://addyosmani.com/resources/essentialjsdesignpatterns/book/#modulepatternjavascript) and [IIFEs](http://benalman.com/news/2010/11/immediately-invoked-function-expression/).

Basically, we create a main object (Why? To avoid global clashes) that stores all of our variables. In that, we make a sub-object as a property (Why? Just a personal preference; code looks organised) named \_.

\_ has the method of id.

Then, we invoke a function expression, which takes the argument `_`

We pass `MAINVARS.<em></em>` as the argument (Why? So we can use `` instead of `MAINVARS._`, which is considerably longer)

Hope you understood! 🙂

## Some of my favorite shortcuts

A loads of other things can be ‘shortened’, you just need an idea 🙂

Here are few of my favorites which I regularly use. I won’t be making the whole object here, that’s upto you 😉

### querySelector

[Document.querySelector](https://developer.mozilla.org/en-US/docs/DOM/Document.querySelector) returns the first element from the document from the selector given.

```js
function $(el) {
  return document.querySelector(el);
}

// Usage

$("#id");
```

### querySelectorAll

Similar to querySelector, but returns all of the matched elements. Useful for classes and tags, where there can be more than one results.

```js
function all(el) {
  return document.querySelectorAll(el);
}

// Usage

all("#id");
```

### setTimeout

```js
function t(toDo, time) {
    return setTimeout(toDo, time);
}

//Usage

t(function() {
  console.log(42);
}, 200);
```