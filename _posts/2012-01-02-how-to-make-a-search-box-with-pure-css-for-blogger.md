---
id: 119
title: '[How-To] Make a search box with Pure CSS for blogger!'
date: '2012-01-02T05:00:00+00:00'
author: namanyayg
layout: post
guid: 'http://localhost/symmetrycode/2012/01/02/how-to-make-a-search-box-with-pure-css-for-blogger/'
permalink_old: /2012/01/02/how-to-make-a-search-box-with-pure-css-for-blogger/
blogger_blog:
    - create-n.blogspot.com
blogger_author:
    - Namanyay
blogger_permalink:
    - /2012/01/how-to-make-search-box-with-pure-css.html
blogger_internal:
    - /feeds/4552098295357212299/posts/default/1375935542935310462
categories:
    - Blogger
    - Create-ioNs
    - CSS
    - Customization
    - Feature
    - How-to
    - HTML
    - Info
    - 'Tips and Tricks'
    - tutorials
    - 'Web Designing'
    - Widgets
---

If you are blogging, your blog is not complete without a search box. A search bar allows visitors to easily search content on your blog, and is certainly necessary. In this tutorial, I will teach you how to make a custom search bar for your site with pure CSS. ###  The Code


```
<style>
#namanyay-search-btn {
    background:#0099ff;
    color:white;
    font: 'trebuchet ms', trebuchet;
    padding:10px 20px;
    border-radius:0 10px 10px 0; 
    -moz-border-radius:0 10px 10px 0;
    -webkit-border-radius:0 10px 10px 0;
    -o-border-radius:0 10px 10px 0;
    border:0 none;
    font-weight:bold;
}
 
#namanyay-search-box {
    background: #eee;
    padding:10px;
     border-radius:10px 0 0 10px; 
    -moz-border-radius:10px 0 0 10px;
    -webkit-border-radius:10px 0 0 10px;
    -o-border-radius:10px 0 0 10px;
    border:0 none;
    width:160px;
 }
</style>
<form id="searchthis" action="/search" style="display:inline;" method="get">
<!-- Search box for blogger by Namanyay Goel //-->
<input id="namanyay-search-box" name="q" size="40" type="text" placeholder="  Type! :D"/>
<input id="namanyay-search-btn" value="Search" type="submit"/>
</form>
<br></br>
<a href="http://4.bp.blogspot.com/-IAWSCakWlX0/TwArQea3B5I/AAAAAAAAAhk/mxar9J4elyA/s1600/sidebar-layout.png" style="clear: right; float: right; margin-bottom: 1em; margin-left: 1em;"><img border="0" decoding="async" height="320" loading="lazy" src="http://4.bp.blogspot.com/-IAWSCakWlX0/TwArQea3B5I/AAAAAAAAAhk/mxar9J4elyA/s320/sidebar-layout.png" width="101"></img></a>
```


###  How To use it

You have two ways of using this code.You can either paste this code where you want in edit html. Or, you can paste this code in a HTML/TEXT widget. I have used the second way, and that is recommended. To do that –

1. Click on ‘Layout’ tab.
2. Add a gadget in the sidebar or any other place.
3. Paste all the code.
4. Save, you are done.

Tip: It is recommended that you save it without a title, it will look better that way.###  Customize!

It is quite easy to customize the code. I will be listing different ways you can, and how to. 

**Customize colors**

To change the colors of the search button, press Ctrl+f and type “background:#0099ff;” and replace the hex code (#0099ff) with a color of your choice. To change the colors of the search box, press Ctrl+f to search, and type “background: #eee;” and replace the hex code (#eee) with a color of your choice.

**Change font**

To change the button font, press ctrl+f to search, and type “font” and then replace the fonts after it (trebuchet ms, trebuchet). If you replace with a font like times new roman, remember to enclose times new roman in single quotes (‘).

**Change search box default text**

To change the default text, search for “placeholder=” Type! :D”/&gt;” and replace the text after placeholder= with your choice. It is recommended that you leave some spaces before the word, like I have done.

**Change search box width**

Just search for “width:160px;” and edit the number after width: , with the width of your choice. Remember, it is in pixels.

If you need anymore help, don’t hesitate to drop a comment. I will surely help you.Also, if you liked it, please include a link to my blog in your blogroll. [I will surely link back](http://create-n.blogspot.com/p/link.html) 😀