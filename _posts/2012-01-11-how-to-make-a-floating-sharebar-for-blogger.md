---
id: 114
title: '[How-To] make a Floating Sharebar for Blogger!'
date: '2012-01-11T15:58:00+00:00'
author: namanyayg
layout: post
guid: 'http://localhost/symmetrycode/2012/01/11/how-to-make-a-floating-sharebar-for-blogger-2/'
permalink_old: /2012/01/11/how-to-make-a-floating-sharebar-for-blogger-2/
blogger_blog:
    - create-n.blogspot.com
blogger_author:
    - Namanyay
blogger_permalink:
    - /2012/01/how-to-make-floating-sharebar-for.html
blogger_internal:
    - /feeds/4552098295357212299/posts/default/4925869879148750303
categories:
    - Blogger
    - CSS
    - Customization
    - How-to
    - HTML
    - 'Tips and Tricks'
    - tutorial
    - 'Web Designing'
    - Widgets
---

One of the issues that bloggers face is that the publicity of the blog through social media. They may feel that the share buttons they have placed are easily ignored, therefore very less reach to users. Or they may feel that they have too many share buttons. 

### The Solution – Floating Sharebar for Blogger

A **floating sharebar** always stays at the left (or right side, depending on how you coded it) and so is easy for the users to click on. It also doesn’t make your blog look cluttered, but gives a clean feel.

**Here is the code.**  

[![](http://2.bp.blogspot.com/-2hHzl5eSIC8/Tw2xY_xSIkI/AAAAAAAAAi4/BlVWpax_kR0/s1600/sharebar_for_blogger.png)](http://2.bp.blogspot.com/-2hHzl5eSIC8/Tw2xY_xSIkI/AAAAAAAAAi4/BlVWpax_kR0/s1600/sharebar_for_blogger.png)

```
<!-- FLOATING SHAREBAR //-->
<style>
#Namanyay-Sharebar {
position: fixed;
top: 30%;
right:95%;
background-color:white;
padding:5px;
border-radius:10px;
-moz-border-radius:10px;
-webkit-border-radius:10px;
-o-border-radius:10px;
border:1px solid #ccc;
}

#Namanyay-Sharebar .fb {  
margin-left:5px;  
}
</style>

<div id='Namanyay-Sharebar'>  
<center>  
<!-- Floating sharebar for Blogger by Namanyay Goel http://create-n.blogspot.com/ /-->  
<a class='twitter-share-button' data-count='none' data-via='Imrockinboy' href='https://twitter.com/share'>Tweet</a>  
<script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)\[0\];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src="//platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");</script>  


<div class='fb'>  
<fb:like action='like' colorscheme='light' expr:href='data:post.url' font='trebuchet' layout='box\_count' send='false' show\_faces='false'/>  
</div>  

<g:plusone size='tall'/>   


<su:badge layout='5'/>  


<!-- AddThis Button BEGIN -->  
<div class='addthis\_toolbox addthis\_default\_style ' style='margin-left:5px;'>  
<a class='addthis\_counter'/>  
</div>  
<script src='http://s7.addthis.com/js/300/addthis\_widget.js#pubid=xa-4f00184e4a453716' type='text/javascript'/>  
<!-- AddThis Button END -->



<a href='http://feeds.feedburner.com/Create-n'><img height='48px' src='https://lh6.googleusercontent.com/-B412gEouDvM/TvyImCWVLKI/AAAAAAAAAhA/dnmHpTKmhE4/h120/RSS-Button.jpg' width='48px'/></a>  

<a href='http://create-n.blogspot.com/'>Get This!</a>  
</center>  
</div>

<!-- FLOATING SHAREBAR END //-->
```

How To Use it?

Just place the above code in a HTML widget, and you’re good to go! Alternatively, search for

`<post.body></post.body>`

and paste it before/after that.


Customize it!

**To place it on the right.** 

Find "right:95%;" (Press CTRL+F) and then replace right with left or change the value (*tip:you can also use a negative value example -50% etc)*  


**Change Background Color.** 

Find "background-color:white;" and change white with any other color. (*Tip: You can use Hex Codes as well too!)*

That’s it! If you need any help, don’t hesitate to comment! Do [link to me](http://create-n.blogspot.com/p/link.html) if this post helped!
