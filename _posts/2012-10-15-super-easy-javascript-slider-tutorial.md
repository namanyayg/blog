---
id: 21
title: 'Super easy javascript slider – Tutorial'
date: '2012-10-15T13:00:00+00:00'
author: namanyayg
layout: post
guid: 'http://symmetrycode.com/?p=14'
permalink_old: /2012/10/15/super-easy-javascript-slider-tutorial/
categories:
    - Uncategorized
tags:
    - Other
---

Javascript sliders are rising in popularity—they’re seen almost everywhere! This tutorial will show you how to make a super easy Javascript slider, using CSS transition, and some clever javascript.

This awesome slider will also *pause* when you hover over it!

As you know, my [last tutorial was for a concept site, furious nerds](http://nmn.gl/blog/setting-base-making-minimal-website/). Reading the previous tutorial isn’t really necessary, but the previous tutorial has a awesome way to get an image to fade from grayscale to color, so you might want to read it.

As the site’s theme is football, go and find more images. I took 3 images from [Stock.XCHNG](http://sxc.hu)

Here’s what the final product will look like   
![Super easy javascript slider - Tutorial](http://i.symmetrycode.com/Making-a-pure-CSS-image-slider-or-carousel.png "Super easy javascript slider - Tutorial")

*Like my articles? [Follow me on Twitter](http://twitter.com/namanyayg) if you want to receive updates as soon as the next part goes live!*

### Understanding the logic

The logic behind the javascript slider is that there should be a mask, who’s height and width are normal, as the top-most layer. Beneath it, a lengthy layer, which will have images floated left to get them in a horizontal line. These images will then move using transitions and javascript.

Here’s the HTML for the actual base. Observe that we have a mask div, and inside it, a length div.

```html
<div id="slider">
<div id="slider-content">
<div class="pause-button">&#9612;&#9612;</div>
<img src="images/football1.jpg" alt="Football!">
<img src="images/football2.jpg" alt="Football!">
<img src="images/football3.jpg" alt="Football!">
</div>
</div>
```

### Writing the basic javascript

As I do with each and every [javascript tutorial](http://nmn.gl/blog/category/javascript/), I wrapped everything in a window.onload, like this. Using window.onload ensures that the javascript is loaded only when the rest of the files, images, html, etc is loaded.

```js
window.onload = function() {
//All code
}
```

I also wrote a function to shorten `document.getElementById`. As you can guess, document.getElementById is used to fetch HTML elements using their IDs. As you can realize, this is used quite commonly.

```js
function e(eel) { //eel = element in question when someone uses e('ElementName'). You can use anything here
    return document.getElementById(eel); //The above e can be changed too, maybe to a dollar sign?
}
```

I then defined the following variables.

```js
var slider = e('slider'), //#slider
    sliderImages = slider.getElementsByTagName('img'), //This is an array. Instead of document,
            //we use slider, as to get all child images of the slider.
    noOfImages = sliderImages.length, //No of items in the above array
    wheee, n = 0, //Whee is currently undefined. We'll define it later.
    sliderContent = e('slider-content'), //#slider-content
    move, //Currently undefined, will define later. As it's used for setInterval,
            //it's better if it's a global var
    imgWidth = (100 / noOfImages) + "%"; //Some math to get width of one image.
```

### Calculating the heights and widths using Javascript

I wrote a very simple and short function, `sliderInit`, to calculate the value of the slider, and each image.

For the slider, I used the formula `(noOfImages * 100) + "%"`…

%hellip;and for the images, I used the variable imgWidth, as declared above.

Here’s the whole function.

```js
function sliderInit() {
    sliderContent.style.width = (noOfImages * 100) + "%"; //Adds 'width' using inline CSS.
    for (var i = 0; i < noOfImages; i++) { // Loops through all available images
        sliderImages[i].style.width = imgWidth; // Sets imgWidth as the width of each image in the slider
    }
}
```

### Using transitions to animate

Firstly, we’ll add a transitions to the slider-content div. Here’s what I used

```css
  -webkit-transition:all 1s ease-in-out;
  -moz-transition:all 1s ease-in-out;
  -ms-transition:all 1s ease-in-out;
  -o-transition:all 1s ease-in-out;
  transition:all 1s ease-in-out;
```

As you might know, transitions give us slower, smoother movement. The `-webkit-` and others are called prefixes, and are required for cross browser compatibility.

Then, we’ll just use some javascript to animate it.

I created an object, `wheee` (:P) which had two methods: Slide, and stop. We’re going to do the slide here.

Remember the undefined variable I declared above? We’re going to use it now, for a setInterval which happens every 3000ms.

The setInterval will be really simple too. The first line would check whether if the number of images – 1 (-1 because it’s an array) is greater than n. If it is, n++.

Else, n = 0.

Following that, I changed the margin-left of the `sliderContent` to `"-"+n + "00%"`. So, if n = 1, then margin-left of sliderContent = -100%.

Easy, right? Here’s the whole method.

```js
slide: function() { //Part of the object 'wheee'
move = setInterval(function() { //Starting a setInterval. Syntax - setInterval(functionName(), timeInMs)
if (n < (noOfImages-1)) n++; //Checks if n is lesser than no of images. If it gets greater,
// then margin would exceed,
// and nothing will be seen.
else n = 0; //If it is, n is reverted back to 0.
sliderContent.style.marginLeft = "-"+n+"00%"; // Ex: if n is one, slider-content has a margin-left
// of -100%;
}, 3000); //It takes 3000 ms, 3 seconds, for this thing to repeat
},
```

### Pausing on hover, and the pause button.

The slightly tougher part is to make the pause character appear.

For the pause icon, I won’t be using any graphic nor I will import any font. I’ll just use a unicode character twice, called [‘left half block’](http://www.fileformat.info/info/unicode/char/258c/index.htm). The HTML entity for this character is `&#9612;`

Using it twice in succession will give us a pause button, without any extra files, to prevent load.

In the HTML, add a div with the class, `pause-button`which contains the entity, twice.

```html
<div id="slider">
<div class="slider-content">
<div class="pause-button">&#9612;&#9612;</div>
<img src="images/football1.jpg" alt="Football!">
<img src="images/football2.jpg" alt="Football!">
<img src="images/football3.jpg" alt="Football!">
</div>
</div>
```

This is to be set to `position:absolute`, so it stays at one place, it should have a high z-index, and it’s font-size should be bigger than regular. Here’s how my CSS looks.

```css
.pause-button {
  position:absolute;
  top:0;
  left:10px;
  color:white;
  font-size:2em;
  z-index:300;

  opacity:0;
}
```

Then, we add `position:relative` to the `#slider`, so that the pause button has a reference.

Then we’ll use javascript to pause the animation if someone hovers over the slider, and resume it again when someone moves there mouse out.

For this, I created another method in wheee, called stop.

Stop simply did a clearInterval on move.

```js
stop: function() { //Again, part of 'wheee' object.
    window.clearInterval(move); //Clears the animation 'move';
}
```

Then, we’ll use CSS to display the actual pause button when someone hovers over slider-content.

```css
.slider-content:hover .pause-button {
opacity:1;
}
```

And that’s it!

[Here’s the final site](http://demos.namanyayg.com/furiousnerds)

### What we learnt

- Using methods for setInterval and clearInterval
- Using global variables for setIntervals
- Finding and using characters already available to us, instead of loading extra files.
- Thinking masks and layers in CSS

### Conclusion

We still have three pats of the tutorial series left. As of now, we made considerable progress, and learnt a lot of new and different things.

Let me know what you think of these tutorial series, and what you would like more. If you made anything, link to it too!

Edit: This implementation of a slider uses relatively new CSS and JS properties – Which means that older versions of IE won’t be able to function well. It is suggested that you use jQuery, and use an appropriate plugin for your sliding needs.