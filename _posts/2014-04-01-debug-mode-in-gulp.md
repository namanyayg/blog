---
id: 30
title: 'Debug mode in gulp'
date: '2014-04-01T05:18:00+00:00'
author: namanyayg
layout: post
guid: 'http://symmetrycode.com/?p=23'
permalink_old: /2014/04/01/debug-mode-in-gulp/
categories:
    - Uncategorized
tags:
    - Coding
    - Coding
    - gulp
    - gulp
    - Tutorial
    - Tutorial
    - Workflow
    - Workflow
---

I’ve been using gulp a lot lately (as you can see from my posts).

To the uninitiated, [gulp](http://gulpjs.com/) is the hottest, sleekest and newest build system in town. Which I’m in love with and use [almost everywhere](https://nmn.gl/blog/using-gulp-at-makeuseof/) now. Yup, it’s that awesome.

However, I had been having troubles with debugging while using gulp. It’s not exactly easy to debug one-line CSS or mangled JS now, is it?

So I came up with a solution, creating a switch variable and a new task, `debug`.

## The debug variable

Everything will be controlled by a single variable, which I call `debug`. Set `debug` to be `false` at the start of your `gulpfile.js`.

```js
var debug = false;  
```

In the default task, write a line:

```js
gulp.task('default', function() {  
  debug = debug || false;
  ...
}
```

Why? So we can easily switch the variable from other tasks, and this change is passed to the default task.

## The debug task

We need to now create a task that achieves three things:

1. Sets `debug` to be true.
2. Logs that gulp is running on ‘debug mode’.
3. Set easy-debugging configuration options in all tasks.

```js
gulp.task('debug', function() {  
  debug = true;
  gutil.log( gutil.colors.green('RUNNING IN DEBUG MODE') );
  gulp.start('default');
});
```

That’s my `debug` task. Here, `gutil = require(gulp-util);`. This logs a helpful message, and switches the debug variable to be true.

We can now use this information to make debug changes in our existing tasks.

## Debug configuration in tasks

I’ve added a simple variable at the top of each task – `uglyLevel`. Depending on the task, `uglyLevel` can be true/false, or ‘compress’/’expanded’. The values are toggled using a simple ternary operator.

```js
  var uglyLevel = debug ? true : false;
```

Then, these are passed on as values depending on the plugin. For example, with `gulp-jade`, `uglyLevel` must be a boolean value and will be used like so:

```js
.pipe( p.jade({ pretty: uglyLevel }) )
```

`gulp-uglify` is similar:

```js
.pipe( p.uglify({ compress: uglyLevel }) )
```

However, for `gulp-stylus`, `uglyLevel` is either ‘compress’ or ‘expanded’.

```js
var uglyLevel = debug ? 'expanded' : 'compress';

gulp.src( src )  
  .pipe( p.stylus({ set: [uglyLevel] }) )
```

You can also try toggling sourcemaps if you’re using SASS, unfortunately the option isn’t available in Stylus yet. Many different ways to solve the same problem.

## Usage

Simply run `gulp debug` in the command line instead of `gulp`. Done! Since debug task runs the default task, all additonal tasks like `watch` or [`connect`](https://nmn.gl/super-simple-static-server-in-gulp/) will run automatically.

And there you have it, an easy and quick debug method for gulp.