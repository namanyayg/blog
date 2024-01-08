---
id: 35
title: 'Creative uses of hover and transition'
date: '2012-06-11T13:00:00+00:00'
author: namanyayg
layout: post
guid: 'http://symmetrycode.com/?p=28'
permalink_old: /2012/06/11/creative-uses-of-hover-and-transition/
categories:
    - Uncategorized
tags:
    - Other
---

Transition allows gradual change from one state to another state. It is used with the :hover state, which gives beautiful links, buttons, and headings. This article will list a few, creative uses of transitions, which could be used to make buttons, body text, or headings look better.

[(View Demo)](http://namanyayg.com/demos/transition/) [(Download the files)](http://namanyayg.com/demos/transition/transition-and-hovers)

### How to use Transition?

Transition is a simple property to use, but unfortunately, it requires vendor prefixes. The syntax for transition is –

```
transition: [property] [duration] [function] [delay];
```

**Property –** Which property is changing. Examples, height, width, padding, margin, etc. Can use ‘all’ for all properties.

**Duration –** The time the transition is carried out. Example, 5s, 0.5s 500ms.

**Function –** The way the transition is carried out. Examples, ease, ease-in-out, linear. *([More about transition functions](http://www.w3schools.com/cssref/css3_pr_transition-timing-function.asp))*

 **Delay –** Pretty obvious, the time after which the transition will start. Example 5s, 0.5s, 500ms.

A good example of transitions being used would be –

```
 transition: all .3s ease;
```

Using transitions removes the abrupt-ness of the hover , it makes it smooth and gradual. A real world example of transitions being used would be:

```
a {
transition: all .5s ease;
-webkit-transition: all .5s ease;
-moz-transition: all .5s ease;
-o-transition: all .5s ease;
-ms-transition: all .5s ease;
color:#666; }

a:hover {
color:#ffae00;}
```

*(Note that Delay isn’t being used. It proves useless most of the time. Also note that all properties will have transitions, instead of only ‘color’. This makes it easier if you have to add more changes later on.)*

### Transition for headings.

**1. Letter Spacing**

![](http://i.symmetrycode.com/alpha.png "CSS3 Transition Alpha")

Done by using negative letter spacing on the default state, then using the normal value on the hover state. Here’s the CSS.

```
.alpha h2 {
letter-spacing:-20px; /* Or experiment with other values, depending on the font */
transition: all .5s ease;
-webkit-transition: all 1s ease-in-out;
-moz-transition: all 1s ease-in-out;
-o-transition: all 1s ease-in-out;
-ms-transition: all 1s ease-in-out; }

.alpha h2:hover {
letter-spacing:normal;}
```

Alternatively, you can start with a high letter spacing at start, then bring it to normal, for a spring-y effect.

**2. Increasing size to give impression of a zoom in.**

![](http://i.symmetrycode.com/beta.png "CSS3 Transition Beta")

*(The bottom part is the default state, while the top is the hover state. Note how changing the origin changes the position of the hover.)*

This effect works by using scale and transform origin in the hover state. Can be used to make your Call to actions appealing.

```
```

```
.beta h2 {
transition: all .8s ease;
-webkit-transition: all .8s ease !important;
-moz-transition: all .8s ease;
-o-transition: all .8s ease;
-ms-transition: all .8s ease; }
```

```
.beta h2:first-child:hover {
transform:scale(1.2);
-webkit-transform:scale(1.2);
-webkit-transform-origin:50% 0%;
-moz-transform:scale(1.2);
-moz-transform-origin:50% 0%;
}
```

You can change the origin to obtain interesting effects. The syntax for transform-origin is –

```
transform-origin: (from left) (from bottom);
```

The code here is altered a bit (specifically, changed the origin) to change the transition.

```
.beta h2:last-child:hover {
transform:scale(1.2);
-webkit-transform:scale(1.2);
-webkit-transform-origin:0% 0%;
-moz-transform:scale(1.2);
-moz-transform-origin:0% 0%;
}
```

 **3. Using Rotation**

![](http://i.symmetrycode.com/gamma.png "CSS3 Transition Gamma")

Rotation is another effect which looks great on headings. It works using the the transform-rotate property. The only problem using rotation is, that it tends to be a bit buggy.

Here’s the CSS for that.

```
.gamma h2 {
transition: all .8s ease;
-webkit-transition: all .8s ease;
-moz-transition: all .8s ease;
-o-transition: all .8s ease;
-ms-transition: all .8s ease;
display:block;
}
```

```
.gamma h2:hover {
 transform:rotate(360deg);
 -webkit-transform:rotate(360deg);
}
```

We used rotate: (360deg), so that it returns to it’s original place. You can increase the degrees in multiples of 360, to increase the rotation cycles.

You can alter it using transform-origin, to give different effects.

### Transition for body text

Body text is usually small, thus increasing the size, or rotating the text isn’t practical for body text. Here are a few styles which *do* in fact look good on body text.

**1. Using border-bottom**

From the start of the internet, links are always underlined. The problem with links being underlined is that the underline is of the *same color as the text.* This may not look good all the time, but here’s a trick that will allow you to change the underline color. **You use border-bottom instead of text-decoration.**

Here’s the code for that.

```
.alpha a {
 color:#556665;
 border-bottom:1px solid #3bf; /*The other, prominent color in your website, or a bolder shade of it */
 text-decoration:none;
```

```
transition: all .3s ease;
-webkit-transition: all .3s ease;
-moz-transition: all .3s ease;
-o-transition: all .3s ease;
-ms-transition: all .3s ease;
```

```
}
```

Now, if you have to *remove* the border on hover, instead of using border-bottom:none; (which will make it sudden), you use RGBA and decrease opacity to remove the border.

We convert the hex to RGB, and use it. You can use [HEX2RGBA](http://hex2rgba.devoth.com/) for that.

```
.alpha a:hover {
border-bottom:1px solid rgba(51, 187, 255,0);
color:#3bf;
}
```

A stands for Alpha in RGBA, which is for opacity. Values range from 0 to 1. Making it zero will get the color to turn transparent gradually instead of vanishing suddenly.

**2. Using a CSS background**

We add a background to the link on hover. It gives a bold feel to the link. Here’s the CSS for that:

```
.beta a {
color:#3bf;
text-decoration:none;
```

```
transition: all .5s ease;
-webkit-transition: all .5s ease;
-moz-transition: all .5s ease;
-o-transition: all .5s ease;
-ms-transition: all .5s ease;
}
```

```
.beta a:hover {
background:#3bf;
color:white;
padding:0 2px;
}
```

We can still add to it, by using border-radius. A radius of 2-3px would be sufficient, but may require more, depending on the font size.   
*(Protip#1: You can use a [border-radius generator](http://border-radius.com/) for that)*

The finished code would look like this:

```
.beta a:hover {
background:#3bf;
color:white;
padding:0 2px;
```

```
-webkit-border-radius: 3px;
-moz-border-radius: 3px;
border-radius: 3px;
}
```

**3. Using Text Shadows**

Using text shadows makes the links pop out on hover. Here’s the CSS:

```
.gamma a {
 color:#3bf;
 text-decoration:none;
```

```
transition: all .5s ease;
-webkit-transition: all .5s ease;
-moz-transition: all .5s ease;
-o-transition: all .5s ease;
-ms-transition: all .5s ease;
}

.gamma a:hover {
text-shadow:1px 1px 0 rgba(0,0,0,.1);
}
```

The syntax for text-shadow is:

```
text-shadow: [x offset] [y offset] [spread] [color];
```

It looks better if the shadow is subtle, that’s why I’ve used RGBA here. I’ve added black shadows, but depending on your background and link color, you could do with white shadows.

### Transition on Buttons

Making buttons with CSS3 instead of using images is all the rage these days.

I’ll use the same button for all the styles, which is a simple button, without much details. Here’s the code:

```
.button {
 padding:.5em 1em;
 background-color:#3bf;
 border:1px solid #30a9e6;
 float:left;
 margin:1em 0;
 color:white;
```

```
transition: all .5s ease;
-webkit-transition: all .5s ease;
-moz-transition: all .5s ease;
-o-transition: all .5s ease;
-ms-transition: all .5s ease;
```

```
}
```

**1. Bounce Up**

I’m going to make the button bounce up using margins. Simple it might be, but gives a great effect.

As the existing margin-top was 1 em on the original button, and I’m going to bounce it up by .5em, I’ll have to subtract .5em from 1em. This will give me .5em, which is the new margin. (If your buttons doesn’t have any margins, you should use negative margins.)

```
.alpha .button:hover {
 margin-top:.5em;
}
```

For the button to be balanced, we need to increase the bottom margin as well. We increase the bottom margin with the same amount which we reduced.

```
.alpha .button:hover {
 margin-top:.5em;
 margin-bottom:1.5em;
}
```

**2. Shift to the right**

I’ll shift the button a bit to the right in this example. It comes especially handy when making “Continue Reading” or “More” buttons, as it gives the impression of motion. The code is pretty simple:

```
.beta .button:hover {
 margin-left:1em;
}
```

**3. Text bounce up**

In this case, I’m going to make the text bounce up, instead of the whole button. It’s pretty much similar to the first case, but I’ll alter the padding instead of the margin here.

The total padding was 1em in the default state, so I’ll have to keep the total same. Here’s the CSS for the third button.

```
.gamma .button:hover {
 padding: .2em 1em .8em 1em;
}
```

###  Conclusion

These are only few practical uses of transitions for everyday websites. There are more of creative uses for transition and hovers, and even more when we talk about artistic uses. Do tell me if you’ve found any creative uses for transitions and hovers.