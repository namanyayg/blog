---
id: 18
title: 'Setting the base – Making a minimal website'
date: '2012-10-13T13:00:00+00:00'
author: namanyayg
layout: post
guid: 'http://symmetrycode.com/?p=11'
permalink: /setting-base-making-minimal-website
permalink_old: /2012/10/13/setting-the-base-making-a-minimal-website/
categories:
    - Uncategorized
tags:
    - Other
---

In this tutorial series, we’re going to build a minimal website for a fictional football club. The things which the website will have are

- Smooth Scroll
- [Image slider/carousel](http://nmn.gl/blog/super-easy-javascript-slider-tutorial/)
- Fixed Navigation

Each will be covered in a separate tutorial. The site will have a single page navigation (Like another [website I built and wrote about](http://nmn.gl/blog/javascript-challenge-fading-single-page-website/)) and will use no jQuery or any other Javascript library.

*You can even [subscribe through email](http://feeds.feedburner.com/mosletech) to get email updates as soon as I publish the next tutorial in the series!*

In this tutorial, we’re going to set up a base for the minimal website using HTML5 and CSS3. As of now, there will be no interactivity.

### Establishing the Core

The website, again, will have it’s focus on typography. I recommend a good serif for the body, and a condensed sans-serif to complement it.

For the serif, I chose [Buenard](http://www.google.com/webfonts/specimen/Buenard), and the complementary sans-serif was [Abel](http://www.google.com/webfonts/specimen/Abel)

I set the line-height to 1.5, and changed headers correspondingly.

The whole site is to be in a `wrapper` measuring 90%.

For the background, I chose a simple cross tile…

![Setting the Base - Making a Minimal Website](http://i.symmetrycode.com/Setting-the-Base-Making-a-Minimal-Website.png "Setting the Base - Making a Minimal Website")

…which I made at 15px\*15px, and saved it at 4% opacity, PNG.

I also added a transition of .5s to everything, using the wildcard symbol, as this site would be loaded with transitions.

```css
* {
  -webkit-transition:all .5s ease;
  -moz-transition:all .5s ease;
  -ms-transition:all .5s ease;
  -o-transition:all .5s ease;
  transition:all .5s ease;
}
```

Here’s what you get when you finish this tutorial, and the ones following it. [Furious Nerds—Football Club](http://demos.namanyayg.com/furiousnerds)

### Building the header

When I started the process of building the header, I thought of the name. I finalized the name as Furious Nerds. I quickly created a logo in Photoshop (which I should’ve done in Illustrator) and made

![furiousnerds-logo-small](http://i.symmetrycode.com/furiousnerds-logo-small.png "furiousnerds-logo-small")

Seems good?

I wanted the full header to have the logo, in a circle, on the left, and the menu on the right. Here’s what I came up with –

![Building the Header - Making a Minimal Website](http://i.symmetrycode.com/Building-the-Header-Making-a-Minimal-Website.png "Building the Header - Making a Minimal Website")

The header was enclosed in a class called `branding` which had `overflow:hidden` to [clear floats](http://www.quirksmode.org/css/clearing.html)

For the logo, I didn’t do anything else—the circle was made using CSS! A clever combination of `border-radius` and borders resulted in this. Here’s what my logo’s CSS looked like.

```css
.logo {
width:50px;
height:50px;
border-radius:100px;
border:5px solid #ccc;
float:left;
}

.logo img {
  opacity:.3;
  max-height:80%;
  margin-left:10%;
  margin-top:10%;
}

.logo img:hover {
  opacity:.5;
}

.logo:hover {
  border:5px solid #339900;
}
```

As you can see, I also added `:hover` pseudo class to both the logo, and it’s shell.

The menu was floated to the right, and I changed it’s font to Abel. On hover, the color changed to `#339900`, a beautiful green (which I’m using at other places too)

The menu items linked to corresponding pages, using internal links. Here’s it’s HTML

```html
<header class="branding">
<div class="logo">
<img src="images/logo.png" alt="Furious Nerds" title="Furious Nerds">
</div><!--LOGO -->
<nav class="main-menu">
    <ul>
    <li><a href="#home">Home</a>
    <li><a href="#about">About</a>
    <li><a href="#news">News</a>
    <li><a href="#contact">Contact</a>
    </ul>
</nav><!-- NAV -->
</header><!-- HEADER -->
```

### Defining the content

Again, like [Clas, this was to be divided into articles. This time, it was divided into 4 articles. Home, About, News, and Contact. ](http://nmn.gl/blog/javascript-challenge-fading-single-page-website/)

I filled Home with a stock image I found from [Stock.XCHNG](http://sxc.hu/), as there was going to be a image slider/carousel there later on. The image was in grayscale, but on hover, changed to color. I’ll explain how I achieved this later.

About and News were filled with filler text I got from [slipsum](http://slipsum.com/) \[NSFW\]

I put a form in contact.

Each article started with an `h2` tag, corresponding to the name of the section. In the CSS, I made each heading tag’s color to the previous green (`#390`) and their `font-weight` to inherit.

### Turning images from grayscale to color

The idea was simple. In the default state, the image was to be in grayscale. On hover, it would change to color with a transition.

Webkit browsers, and IE, have filters already. Sadly, on Firefox, I couldn’t find a proper, working way to turn image to grayscale (using an SVG resulted in glitches and bugs)

To use those filters, I put the following styles in the slider’s `img` tag.

```css
#slider img {
  width:100%;

  -webkit-filter: grayscale(1);
  filter:gray;
  -webkit-filter: grayscale(100%);
  -moz-filter: grayscale(100%);
  -o-filter: grayscale(100%);
  -ms-filter: grayscale(100%);
  filter: grayscale(100%);

  -webkit-transition:all 1s ease-in-out .5s;
  -moz-transition:all 1s ease-in-out .5s;
  -ms-transition:all 1s ease-in-out .5s;
  -o-transition:all 1s ease-in-out .5s;
  transition:all 1s ease-in-out .5s;
}
```

The width was 100% it doesn’t overflow it’s parent.

The different filters were needed for different browsers.

In the end, I changed the transition to 1 second, and added a delay of .5s, as it would lag on smooth scroll otherwise.

Now, to change the image to color on hover, I used the following code –

```css
#slider img:hover {
  filter:none;
  -webkit-filter: grayscale(0);
  -moz-filter: grayscale(0);
  -o-filter: grayscale(0);
  -ms-filter: grayscale(0);
  filter: grayscale(0);
}
```

Simple, right?

### Conclusion

So here’s a simple and minimal website, made using HTML5 and CSS3. In the following posts of this series, I’ll teach you to make smooth scroll, and add a image slider to the site.

Let me know what more you’d like to see.