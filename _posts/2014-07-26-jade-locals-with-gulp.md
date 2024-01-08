---
id: 51
title: 'Jade locals with Gulp'
date: '2014-07-26T08:57:16+00:00'
author: namanyayg
layout: post
guid: 'http://symmetrycode.com/?p=45'
permalink_old: /2014/07/26/jade-locals-with-gulp/
categories:
    - Uncategorized
---

One of the coolest features of Jade is the concept of `locals`: An object that can be passed to the compiler and used in the Jade code, allowing better separation of content and templates. Ideally, these locals are held in an external file.

After much tinkering, I figured something out:

```js
var fs = require('fs');  
...
.pipe( p.jade({ 
    pretty: uglyLevel,
    data: JSON.parse( fs.readFileSync('src/data.js', { encoding: 'utf8' }) )
}) )

```

## …What?

- [Gulp Jade’s docs](https://github.com/phated/gulp-jade#options) show that the `data` or `locals` option to could be used to pass in a single object holding all the external data.
- [File I/O](http://nodejs.org/api/fs.html), or `fs` is node’s way of reading files. Using [fs.readFileSync](http://nodejs.org/api/fs.html#fs_fs_readfilesync_filename_options), I used a `JSON` file to hold all the data.
- [JSON.parse()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse) is a native JS method to convert a string (The output of `fs.readFileSync` with `utf8` encoding) to JSON.

Combining the three resulted in the above one liner, allowing me to use a `data.js` file to host all raw data and use loops to better template the code within. Win!

PS: [If you’re wondering what the `uglyLevel` bit is…](https://nmn.gl/blog/debug-mode-in-gulp/)