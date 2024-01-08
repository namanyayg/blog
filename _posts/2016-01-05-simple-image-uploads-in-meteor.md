---
id: 56
title: 'Simple image uploads in Meteor'
date: '2016-01-05T08:13:00+00:00'
author: namanyayg
layout: post
guid: 'http://symmetrycode.com/?p=52'
permalink_old: /2016/01/05/simple-image-uploads-in-meteor/
categories:
    - Uncategorized
tags:
    - meteor
    - personal-project
---

While working on a simple [online yearbook](http://yearbook.code-warriors.org/) for my high school class of &lsquo;16 in [Meteor](https://www.meteor.com/), I ran into the issue of uploading images to Meteor. Turns out, it’s not uncomplicated at all.

I messed around with [CollectionFS](https://github.com/CollectionFS/Meteor-CollectionFS), but unfortunately had the issue of images not loading and returning 503s, or taking a *long* while to load.

I decided to turn to the most popular and developer-friendly image host I know: [Imgur](http://imgur.com/).

- - - - - -

I used the [simple:imgur](https://atmospherejs.com/simple/imgur) package. The `upload()` function takes two arguments, `options` and `callback`.

The options require an `apiKey`, the Imgur Client ID and `image`, the base64-encoded image data string. The `callback` function receives two arguments, the first being a `Meteor.Error` object and the latter being an object containing the response from Imgur.

## `apiKey`: Registering an Imgur Application

The first step is to get an `apiKey` by registering your application at [Imgur’s OAuth 2 page](https://api.imgur.com/oauth2/addclient). We need to choose ‘OAuth 2 authorization without a callback URL’, and once done, get the client ID (You’ll get an email about it, too).

## `image`: Converting file to base 64

In the `submit` event of my upload form, I add a line to get the file that the user uploaded:

```js
var file = $form.find('input[type="file"]')[0].files[0]  
```

I also check if the file is an image or not:

```js
if ( file && !file.type.match('image.*') ) return alert('Upload must be an image')  
```

We’re now going to use the [`FileReader` API](https://developer.mozilla.org/en/docs/Web/API/FileReader) to get the base-64 representation of the image.

We’ll need to create a new reader and add a function to it’s `onload` event, where we handle the image upload logic.

```js
var reader = new FileReader()

reader.onload = function(e) {  
  // e.target.result holds the file's text
}
```

We’re going to convert the text into a `Uint8Array`, convert it to a string, and then finally use `btoa()` to convert the string to base-64 encoded ASCII string.

I directly do this in a convoluted one liner and a custom function inside an `options` object I created to call `Imgur.upload()`.

```js
var options = {  
  apiKey: 'XXXXXXXXXXXXXXX',
  image: btoa(uint8ToString(new Uint8Array(e.target.result)))
};
```

The `uint8ToString` function is simple: it converts the Unicode values we get from the `Uint8Array` representation of `e.target.result` into ASCII strings, which can be converted to base-64 easily.

```js
function uint8ToString(buffer) {  
  var length = buffer.length, str = ''

  for ( var i = 0; i < length; i++ ) {
    str += String.fromCharCode( buffer[i] )
  }

  return str
}
```

And with this, we’re able to create our `options` object easily.

## Uploading

I created a `data` object to handle all data entered in the form by our user. In the `Imgur.upload()` function, I add to it.

```js
Imgur.upload(options, function(errMsg, imgurData) {  
  if ( errMsg ) return alert('File upload failed. Please upload an image of a smaller file size')
    var imgData = {
      link: imgurData.link,
      deletehash: imgurData.deletehash
    }
    data.photo = imgData
  })
}
```

I only store the two important parts of the response: the `link` to the file and the `deletehash`. I can easily show the file by using `<img src="{{ currentUser.data.photo.link }}">`.

And we’re done!