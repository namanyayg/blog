---
id: 62
title: 'Super easy image uploads with Multer and Express'
date: '2017-05-18T01:07:09+00:00'
author: namanyayg
layout: post
guid: 'http://symmetrycode.com/?p=59'
permalink_old: /2017/05/18/super-easy-image-uploads-with-multer-and-express/
categories:
    - Uncategorized
tags:
    - express
    - node
    - tutorial
---

[Multer](https://github.com/expressjs/multer) makes file uploads via `<form enctype="multipart/form-data"></form>` really simple. If you’re looking to host user images on your filesystem and are wondering about the best practices involved, here’s what works for me.

## 1. The form

For the purposes of the article, I’m going to have a really simple form that submits a `POST` request to our endpoint and has a single `<input type="file">` field.

```jade
form(method="post" action="/img" enctype="multipart/form-data")  
  input(type="file" name="photo")
```

## 2. The endpoint

Since I want to show this works with the default Express boilerplate, we’re going to put our routing in the default `routes/index.js` file.

First, we need to include `multer`.

```javascript
const multer = require('multer')  
const upload = multer({  
  dest: './public/images/users',
  limits: {
    fileSize: 10000000
  }
})
```

I recommend uploading the images to a subfolder of `./public/images`, in this case `users`, because this is the default directory where you’ll be storing all your images anyway. Note that the path described in `dest` is relative to the project directory (i.e. where your `app.js` is stored). I’ve also set a limit of `10mb` but that’s optional.

I’ve got a simple set up going on with `passport` for user logins and `sequelize` as my ORM. Using either, however, is optional — you can handle image submissions without any logins at all and can use `mongoose` or some other DB system for storing the data.

Using `upload.single('<name of input>')` middleware adds `req.file` to the `req` object which contains metadata about the file.

```javascript
router.post('/img',  
  upload.single('photo'), 
  (req, res) => {

  // Return user if they're not logged in
  if (!req.isAuthenticated()) {
    return res.redirect('/')
  }

  // Just a safety check
  if (!req.file) {
    return res.redirect('/')
  }

  // Your filename is stored in `req.file.filename`, which then goes
  // to your database

  const newUserData = {
    photo: req.file.filename,
  }
})
```

### What does this code do?

You should now see files with 16 letter hex filenames being stored to your `public/images/users` directory. [Multer does not add any file extensions](https://github.com/expressjs/multer/issues/170) as a safety precaution, and we now need to write some simple code to send the files with the appropriate mime-type so they’re served appropriately.

## 3. Serving Files

We’re going to use `read-chunk` and `image-type` modules to check the actual format of the file and serve it with the correct mime type. Install them with `npm --save read-chunk image-type` and include them in your `routes/index.js` as so. We also need `path` and `fs` default modules.

```javascript
const readChunk = require('read-chunk')  
const imageType = require('image-type')  
const path = require('path')  
const fs = require('fs')  
```

Now here’s the clever part — we’re going to detect what file type the image is by reading their [‘magic bytes’](https://en.wikipedia.org/wiki/List_of_file_signatures) and allow only `png`, `jpg`, or `jpeg` formats.

We’re using [Express’ route parameters](https://expressjs.com/en/guide/routing.html#route-parameters) so we get the filename dynamically. Then, we store the `UPLOAD_PATH` and `FILE_PATH` for the image in appropriate constants.

Using the `read-chunk` and `image-type` modules, we read the first 12 bytes of the file and see what file format do they correspond to. We then check for the file formats we’re allowing and serve a default image (that is actually a 1×1 transparent png that I’ve put in the folder) that is sent over if the file is anything fishy.

Otherwise, we set the appropriate mime type and pipe a stream of file data through `res` via the `fs.createReadStream()` method.

```javascript
router.get('/images/users/:img', (req, res) => {  
  const UPLOAD_PATH = './public/images/users/'
  const FILE_PATH = path.join(UPLOAD_PATH, req.params.img)

  let imageData = imageType(readChunk.sync(FILE_PATH, 0, 12))

  if (!(imageData.ext == 'png' 
    || imageData.ext == 'jpg' 
    || imageData.ext == 'jpeg')) fs.createReadStream(path.join(UPLOAD_PATH, 'default.png')).pipe(res)

  res.set('Content-Type', imageData.mime)
  fs.createReadStream(FILE_PATH).pipe(res)
})
```

## Wrapping up

Express makes image uploads slightly complicated, but once you understand the philosophy behind their approach you can get it going really fast and easily. Multer is a very extensible library, even having modules for memory and Amazon S3 storage, among others. The `router.get` approach makes our application extremely robust and secure against any attacks that are usually otherwise missed.