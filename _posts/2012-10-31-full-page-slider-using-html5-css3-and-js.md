---
id: 44
title: 'Full page slider using HTML5, CSS3, and JS'
date: '2012-10-31T13:00:00+00:00'
author: namanyayg
layout: post
guid: 'http://symmetrycode.com/?p=37'
permalink_old: /2012/10/31/full-page-slider-using-html5-css3-and-js/
categories:
    - Uncategorized
tags:
    - Other
---

Sliders are the latest craze in the web dev and design world. In this tutorial, I’ll teach you how to make a beautiful, full page slider, which can be used for promotional work, using HTML5, CSS3, and Javascript. We’ll learn how to use event listeners, a bit of object oriented JS, and how to minimize repetitions using functions effectively.

[Final Preview](http://demos.namanyayg.com/gtavfullpage)

### Setting the base

Firstly, download some images. I downladed three, large size images from [GTA V](http://gtav.com/). Also, make three files, style.css, index.htm, and script.js

In the index file, we’ll start with the header information. We’ll link the stylesheet, and the javascript. I’m also importing two of my favorite fonts, Cabin Condensed, and Open Sans, from [Google Web Fonts](http://google.com/webfonts)

Here’s what it looks like.

```html
<head>
    <meta charset="utf-8">
    <title>Making a full page slider using HTML5, CSS3, and JS with an easter egg!</title>
    <link rel="stylesheet" href="layout.css">
    <script src="script.js"></script>
    <link href='http://fonts.googleapis.com/css?family=Cabin+Condensed:400,700|Open+Sans:400italic,700italic,400,700' rel='stylesheet' type='text/css'>
</head>
```

Then, we’ll write down the HTML for the slider.

The slider works in an easy way. The parent div, #slider, contains all divs. It’s width is 100%, and is set to overflow:hidden. It acts as a mask.

Inside it, there’s #slider-content. It’s width is 100% times the number of slides. It contains all the slides (&lt;section&gt; tags), which are set to float:left. Their width is calculated through javascript.

To animate the slider, we use Javascript, and move the margin-left back by 100% after a set delay. But all that later, here’s the base HTML

```html
<section id="slider">
	<div id="slider-content">
		<section>
			<img src="../media/slider-image01.jpg" alt="Making a full page slider with HTML5, CSS3, and JS" />

			<div class="text">
				<h3>The most awaited game of 2012</h3>
				<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
				<a href="#"> <button class="cta">Buy Now!</button></a>
			</div>
		</section>
		<!--SLIDE 1-->

		<section>
			<img src="../media/slider-image02.jpg" alt="Making a full page slider with HTML5, CSS3, and JS" />

			<div class="text">
				<h3>What you've been waiting for all year</h3>
				<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
				<a href="#"> <button class="cta">Buy Now!</button></a>
			</div>
		</section>
		<!--SLIDE 2-->

		<section>
			<img src="../media/slider-image03.jpg" alt="Making a full page slider with HTML5, CSS3, and JS" />

			<div class="text">
				<h3>The final part to the epic series</h3>
				<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
				<a href="#"> <button class="cta">Buy Now!</button></a>
			</div>
		</section>
		<!--SLIDE 3-->
	</div>
</section>

```

As you can see, each slide contains one image, and one div, which is for the text and the CTA. The CTA is a simple button, which we’ll style using CSS. The aim is to provide well crafted headlines to catch the user’s attention, so we’ll avoid keeping too much text in the paragraph tags.

*Tip: To get ‘Lorem Ipsum’ filler text in sublime text 2, write ‘lorem’ and press the tab key.*

### Writing the CSS

Once we’re done with the HTML, we now have to write the CSS. We don’t worry much about the widths now, as all that would be calculated using Javascript on runtime.

Firstly, I set the font-size to be 1em, with a line height of 1.5. I chose the body font to be Open Sans, which we imported earlier. I also changed the font-family of all headings to Cabin Condensed.

```css
body {
    font: 1em/1.5 'open sans';
}

h1, h3, h3, h4, h5, h6 {
    font-family:'Cabin Condensed';
}
```

I then add overflow:hidden to the #slider, as to not display a scrollbar. I add some transitions to #slider-content, so that the animation appears smooth

The sections inside slider-content (the individual slides) are set to position:relative, as we’re going to position text in accordance with them. We also float them left, so they are in a straight line horizontally once we get done with the widths.

Those four things were the important parts. Rest, all the CSS is decorational, and will not impact functionality of the slider. Here’s the important CSS

```css
#slider {
    overflow:hidden;
}

#slider-content section > img {
    width:100%;
}

#slider-content {
    -webkit-transition: margin-left 1s ease;
    -moz-transition: margin-left 1s ease;
    -ms-transition: margin-left 1s ease;
    -o-transition: margin-left 1s ease;
    transition: margin-left 1s ease;
}

#slider-content section {
    position:relative;
    float:left;
}

```

Remember the text class we applied to a div? We’re going to style that now. I made the headings really big, for emphasis, set their position, changed the color to white, and added a text shadow on the text for increased visibility. Here’s all I wrote-

```css
.text {
    position:absolute;
    top:3em;
    margin:0;
    left:3em;
    color:white;
    width:22.5em;
    text-shadow:1px 1px black;
}

.text h3 {
    font-size:3em;
    line-height: 1;
    margin: 0 0 1em 0;
    text-shadow: 1px 1px 2px black;
}
```

I then styled the CTA button. The style was simple, a neutral grey (which, admittedly, could be more effective, but for the sake of this demo we’re going to keep this short and simple)

```css
.cta {
    border:none;
    outline:none;
    border-radius:.5em;
    padding:.5em 1em;
    font-size:1.5em;
    line-height:1em;
    background: #eee;
    border:1px solid #ddd;
    border-bottom:4px solid #bbb;
    box-shadow: 0 0 5px rgba(0, 0, 0, .9);
    color:#666;
    text-shadow:1px 1px white;
    margin-top:2em;
    cursor: pointer;
    -webkit-transition: all .5s ease;
    -moz-transition: all .5s ease;
    -ms-transition: all .5s ease;
    -o-transition: all .5s ease;
    transition: all .5s ease;
}

.cta:hover {
    margin-left:.75em;
}
```

As you can see, I added transitions here too.

Here’s what it looks like after we’re completed with the HTML and CSS

![Full Page Slider using HTML5, CSS3, and JS-After CSS](http://i.symmetrycode.com/2012/11/afterCss.png "Full Page Slider using HTML5, CSS3, and JS-After CSS")

### Writing Javascript and understanding the logic

I’ve explained the logic above, so it should be clear to you by now. Basically, the slider is 100% of the page, and it’s overflow is set to hidden, so we don’t see anything except the slider. Behind it, there’s the slider-content. The slider content has three slides. Each slide takes up 100% of the page. By changing the margin-left of slider-content by multiples of hundred, we can control which slide we display

Following? Good.

### The basic javascript

I wrap everything in a winow.onload, so things are loaded only when the elements of the page are loaded.

I also shorted `document.querySelector`, using a simple function as below.

*Note: [Document querySelector](https://developer.mozilla.org/en-US/docs/DOM/Document.querySelector) doesn’t work on IE 7 and below. You’re better off using document.getElementById, if you want to support IE7*

```js
function $(el) {
        return document.querySelector(el);
    }
```

I then declare a few variables.

```js
var slider = $('#slider'), //To change properties of the slider element
        sliderContent = $('#slider-content'), //To change properties of the slider-content element.
        slides = sliderContent.getElementsByTagName('#section'), //The result is an array. These are all the slides.
        slideCount = slides.length, //The number of slides.
        slideWidth = (100 / slideCount), //Simple math to get the width of each slide. If there are three sides, will output 33.33333333%
        control, n = 0, move; //Undefined variables to be used later on.
```

### Calculating the dimensions

I wrapped this whole part into a function, called ‘init’. This function defined the width for the slider-content, as well as for the individual slides.

The width of slider-content can be obtained by multiplying the number of slides by 100, and adding the percentage sign. Here’s what I did.

```js
function init() {
        sliderContent.style.width = slideCount + "00%";
```

For the slides, I used a simple for loop. The control variable could not exceed the number of slides.

```js
        for(var i = 0; i < slideCount; i++) {
            slides[i].style.width = slideWidth;
        }
    }
```

### Sliding!

Remember the undefined variable 'control' we declared previously? I defined it as an object, and it contains (you guessed it right) all the controls for the animation. Forward, previous, and slide. For now, we'll focus on the slide function

The slide function will only have a setInterval, which we defined as 'move'(This isn't really required, we can simply have a setInterval just like that, but if, in the future we'd like to add more controls, this offers future proofing).

Inside the setInterval, we use the previously declared variable, n. The default value of n is equal to 0. Try and think of the setInterval as a loop, you'll have a much better grip on it.

At every stage, we check if n is lesser than the number of slides - 1. If it is, we increase the value of n by 1. If not, n is reset to 0. I've used a ternary operator here, but you can use an if else statement if you're comfortable.

We then use the n to define the marginLeft of the slider-content. I've written a simple function to control the margin of slider-content.

```js
margin: function(n) {
    sliderContent.style.marginLeft = '-'+n+'00%';
},

slide: function() {
    move = setInterval(function(){
        (n < slideCount - 1) ? n++ : n = 0;
        control.margin(n);
    }, 4000)
}
```

Finally, we set a reasonable interval on the timer. I've used 4000ms = 4s here, feel free to mess around.

### Previous and Next using arrow keys

We add two more things to the control object, prev and next. Remember to keep them at the top of the object, before slide, as these will change the value of n.

The prev function checks if n is equal to 0. If it is zero, then it can't be possible be subtracted, right? So, if it is we set the value of n to be the number of slides - 1. If not, we simply subtract n by 1.

Afterwards, we set the margin-left n, using our margin function.

```js
prev: function() {
    (n === 0) ? n = (slideCount - 1) : n--;
    control.margin(n);
},
```

The ‘next’ function will be quite similar, except, the ternary operator will be different. It will be the exact same as the one in slide

```js
next: function() {
    (n < slideCount - 1) ? n++ : n = 0;
    control.margin(n);
},
```

Finally, we call those functions whenever we detect a keyup.

We need to translate the key pressed to it's keycode, and tally it against what we know. 37 is for left, and 39 is for right. Here's how I checked the key code

I'm using [Event Listeners](https://developer.mozilla.org/en-US/docs/DOM/element.addEventListener) for the call.

*Note: Event Listeners are not supported by IE 8 and below(Again). However, there are a [few tricks](http://stackoverflow.com/questions/1695376/msie-and-addeventlistener-problem-in-javascript) to ensure it works on IE*

```js
 window.addEventListener("keyup", function(evt) {
        evt = evt.keycode; //evt.keycode is a unique number for each key.
        if(evt === 37) // 37 is the keycode for the left arrow key.
            control.prev(); // If left arrow key is pressed, run the prev function.
        if(evt === 39) // 39 is the keycode for the right arrow key.
            control.next(); // If the right arrow key is pressed, run the next function.
}, false);
```

[Final Preview](http://demos.namanyayg.com/gtavfullpage)

### What we learnt

- Thinking different.
- Using CSS transitions with JS
- Using JS in different ways.
- Thinking of parents as childs like masks and layers.
- Using setInterval.
- Learning key events in Javascript.