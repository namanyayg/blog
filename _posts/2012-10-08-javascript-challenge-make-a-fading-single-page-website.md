---
id: 20
title: 'Javascript Challenge: Make a fading, single page website'
date: '2012-10-08T13:00:00+00:00'
author: namanyayg
layout: post
guid: 'http://symmetrycode.com/?p=13'
permalink: /javascript-challenge-fading-single-page-website
permalink_old: /2012/10/08/javascript-challenge-make-a-fading-single-page-website/
categories:
    - Uncategorized
tags:
    - Other
---

*This is the first of a new series, Javascript Challenges, where I try and complete set challenges in the shortest time possible.*

**The Challenge:**

- Single page.
- Navigation done using Javascript. Not standard navigation.
- To be made under 1 hour.
- **No Javascript library to be used.**
- Crisp design.
- Unobtrusive Javascript.
- Required use of Javascript, CSS3, HTML5.
- Three pages. Two content pages, and one contact page.

So well, after getting this challenge, I had a brief idea in my mind on what to do. The site had to be simple, with a title, a small navigation menu underneath, mock content, and a brief footer. Along with that, there had to be a form. I chose a light blue color for emphasis, and an overall grey, clean, modern design.

[Final Result](http://demos.namanyayg.com/clas/)

Play around a bit. We’ll create the above, in under an hour. Sounds fun?

### Starting with HTML.

As any web project should be handled, I started writing HTML first.

The HTML was pretty basic. Wrapper, header, content, footer, all of the usual. The important part was that there was a navigation, with 3 links. Each had an ID, which was same as the page it was going to (Example: The about page had an id `toAbout`) I made three pages, about, motive *(I know, makes no sense)* and Contact.

Then, I started with the primary content. It was divided using three `article` tags, each corresponding to the page, and having the same ID (Example: The about page had an ID `about`)

At the start of the div was an H2 tag, having the name of the page *(for separation purposes)*

That was pretty much the HTML. I advise you to draft your own using the above information, but you can ‘cheat’ from here

```html
<html>
  <head>
    <title>Clas - A web design project by Namanyay Goel</title>

    <link rel="stylesheet" href="css/style.css" />
    <script src="js/script.js"></script>
    <link href="http://fonts.googleapis.com/css?family=PT+Sans:400,700,400italic|PT+Serif:400,700" rel="stylesheet" type="text/css" />
  </head>
  <body>
    <div class="wrapper">
      <header class="branding">
        <div class="logo">
          <h1 class="giga">Clas</h1>
        </div>
        <!--LOGO -->
        <nav class="main-menu">
          <ul>
            <li><a href="#" id="toAbout">About</a></li>
            <li><a href="#" id="toMotive">Motive</a></li>
            <li><a href="#" id="toContact">Contact</a></li>
          </ul>
        </nav>
        <!-- NAV -->
      </header>
      <!-- HEADER -->

      <div class="main-content">
        <article class="primary">
          <article id="about">
            <h2>About</h2>
            …Lipsum…
          </article>

          <article id="motive">
            <h2>Motive</h2>
            …Lipsum…
          </article>

          <article id="contact">
            <h2>Contact</h2>
            <form>
              <input type="text" placeholder="Name" name="name" />
              <input type="email" placeholder="Email" name="email" />
              <textarea noresize></textarea>
              <button type="submit" name="submit">Send</button>
            </form>
          </article>
        </article>
        <!-- PRIMARY -->
      </div>
      <!-- MAIN-CONTENT -->

      <footer class="colophon">
        <div class="milli">Designed by <a href="http://namanyayg.com/">Namanyay Goel</a></div>
      </footer>
      <!-- FOOTER -->
    </div>
  </body>
</html>
```

As you can see, I have a call for the fonts PT Sans and PT Serif. These will be explained more in the CSS.

### Designing using CSS

I believe that the [web is 95% typography](http://informationarchitects.net/blog/the-web-is-all-about-typography-period/). Keeping that in mind, I choose a [beautiful, legible, serif](http://www.google.com/webfonts/specimen/PT+Serif) for body text, and a [complementing sans serif](http://www.google.com/webfonts/specimen/PT+Sans) for the headings. I kept the [font-size large enough (100%)](http://informationarchitects.net/blog/100e2r/), and designed keeping vertical rhythm in mind. Here’s what the CSS was for my heading tags –

```css
h1, h2, h3, h4, h5, h6 {
  font-family: 'PT Sans', 'Verdana', 'Helvetica', Arial;
  font-weight:inherit;
}

h1,.alpha {
  font-size:2em;      /* 32px */
  line-height:1.5;    /* 48px */
}
h2 {
  font-size:1.5em;    /* 24px */
  line-height:1;      /* 24px */
}
h3 {
  font-size:1.25em;   /* 20px */
  line-height:1.2;    /* 24px */
}
h4 {
  font-size:1.125em;    /* 18px */
  line-height:1.333;    /* 24px */
}
h5 {
  font-weight:bold;
}
h5,
h6 {
  font-size:1em;      /* 16px */
  line-height:1.5;    /* 24px */
}

.giga {
  font-size:3em;
  line-height:1em;
  text-align:center;
  font-family:PT Serif;
}
```

The above was somewhat ‘inspired’ by a [wonderful article on CSS Wizardry](http://csswizardry.com/2012/02/pragmatic-practical-font-sizing-in-css/).

I also favored [normalize.css](http://necolas.github.com/normalize.css/) over the multitude of resets found. If you want, you can use [a CDN](http://css.cdn.tl/normalize.css) for it.

Then, for the form elements, I set a generous border-radius, and changed their default look. The ‘submit’ was made to imitate the look of the menu.

I modified the native `:focus` pseudo-class, removing the ugly outline (`outline:none;`) and adding a beautiful blue border instead.

Now, apart from the aesthetics, here are two things which are **necessary for the working of Javascript.**

One, in the main content section (which I call `primary`, inspired from WordPress) there has to be `overflow:hidden;` and `position:relative;` set. Secondly, all articles inside `primary` had to have [transitions for opacity](http://www.css3.info/preview/css3-transitions/).

```css
#about, #motive, #contact {
  -webkit-transition:opacity 1s ease;
  -moz-transition:opacity 1s ease;
  -o-transition:opacity 1s ease;
  -ms-transition:opacity 1s ease;
  transition:opacity 1s ease;
}
```

The reason why these are important will be explained in the third part which explains Javascript.

The rest, I recommend you to invent the rest yourself, but if you’re having problems, you can check out the [actual CSS](http://demos.namanyayg.com/clas/css/style.css) used.

### Interactivity with Javascript

Here, I’m going to explain more of the logic to you, and less of the code.

Basically, there will be two important functions. One, to hide other pages, and the other to show them. Both were parts of an object (a feeble attempt for [OO JS](https://developer.mozilla.org/en-US/docs/JavaScript/Introduction_to_Object-Oriented_JavaScript))

It also used a [nifty trick to shorten the way to get an element using it’s ID](http://thezillion.wordpress.com/2012/07/24/shortening-document-getelementbyid/) (But instead of `getId`, I used `e`)

I then used [closures](http://jibbering.com/faq/notes/closures/) for each page, aptly named `onlyAbout`, `onlyMotive` and `onlyContact`.

All of the above was wrapped in a `window.onload` call.

Now, here are the ‘two important functions’ in detail. They both were inside an object I named `control`. The one which was used to show only the required page was called `rise` and the one which hid the remaining pages called `silence`

**Elaborating ‘rise’**

The rise function took an argument, the page to show. It did three things. It brought the opacity up to 1, it changed `position` to `static` (instead of the previously set `absolute`) and it brought the z-index (or `zIndex` in Javascript) to 1.

Here’s the code for that.

```javascript
rise: function rise(pg) {
  pg.style.opacity = 1;
  pg.style.zIndex = 1;
  pg.style.position = 'static';
}
```

*Remember, it was inside an object, hence* `rise: function…`

**Elaborating ‘silence’**

Silence was the opposite of rise. It took two arguments, which were the pages to be hidden, and turned their opacity down to 0, set their position back to absolute, and brought the z-index to -2. It had two `if` statements, which checked if the opacity of the page to be hidden was zero. If it was, it did none of the above.

Here’s the code for `silence`

```javascript
silence: function (pg1, pg2) {
    if (pg1.style.opacity !== 0) {
        pg1.style.opacity = 0;
        pg1.style.zIndex = -2;
        pg1.style.position = 'absolute';
    }

    if (pg2.style.opacity !== 0) {
        pg2.style.opacity = 0;
        pg2.style.zIndex = -2;
        pg2.style.position = 'absolute';
    }
}
```

Now you might have understood why I set opacity transitions in the CSS. It was to give a smooth effect whenever this action occurred.

As for keeping the `position:absolute;`, it made sure that the hidden pages did not take up any space. I could’ve done it with `display:none` too, but it messed up with the transition.

**Using Closures**

Allow me to start by saying, [Closures are awesome.](http://jibbering.com/faq/notes/closures/)

Now that’s decided, I’ll explain why I used them.

I wouldn’t have used closures if they weren’t required. The problem is, that in an onclick, we **cannot pass any arguments**. What’s the solution? Closures.

As told above, I made three closures.

`onlyAbout` ran `control.control.silence(motive, contact);` (motive and contact, the remaining two pages, were arguments) and `control.rise(about);` here, the page itself being arguments.

Similarly, the rest were written.

In the end, I set that so onclick of `toAbout` will show the about page, and so on.

I concluded that with a call for `onlyAbout`, it being the first page of the site.

### Bonus:

Not enough of a challenge for you? Add these things to the list.


- Site should be fully functional without use of Javascript.
- Should be responsive.

*(Note: I wrote a [tutorial on completing the bonuses](https://nmn.gl/blog/bonus-making-clas-compatible-responsive/))*


### What we learnt

- Using CSS and Javascript together
- Manipulating DOM using Javascript
- A few javascript tips.
- Advanced typography tips.
- usage of closures
- Much, much more.

### Your turn

This is pretty much how every challenge post is going to be. Got an idea, some feedback, or have a challenge for me? (Please give something easy! :P). Did you make something? Let me know how this is, and if you would like this to be continued in the comments below.

*Wondering how much time it took me? 55 minutes 🙂*
