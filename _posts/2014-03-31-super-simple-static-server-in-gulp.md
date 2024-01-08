---
id: 33
title: 'Super simple static server in gulp'
date: '2014-03-31T02:58:00+00:00'
author: namanyayg
layout: post
guid: 'http://symmetrycode.com/?p=26'
permalink_old: /2014/03/31/super-simple-static-server-in-gulp/
categories:
    - Uncategorized
tags:
    - Coding
    - Coding
    - gulp
    - gulp
    - Tutorials
    - Work
    - Workflow
    - Workflow
---

I recently spent a *lot* of time looking for a decent way to:

1. Set up livereload on gulp
2. Set up a static server.

Here are my findings.

First, I tried using `gulp-livereload` and `gulp-embedlr`. Using them together was decent and they were pretty fast, however, they were too complex for my simple goal.

Everything changed <del>when the fire nation attacked</del> once I stumbled upon `gulp-connect`.

## Using gulp-connect

This plugin is *extremely simple* to use, I set up a server in literally 5 lines of code:

```js
gulp.task('connect', p.connect.server({  
  root: ['_public'],
  port: 4242,
  livereload: true
}));
```

…

Yup, that’s it!   
*(`p.connect = require('gulp-connect')`, btw).*

### Live Reload

Now, to actually *reaload* the page on changes to tasks, we need to pipe `p.connect.reload()` on each task.

I’ve found that piping it after `gulp.dest()` is the fastest, so add

```js
.pipe( gulp.dest( dest ) )
.pipe( p.connect.reload() );
```

At the end of each task.   
*(Where `dest` refers to the destination path).*

### Proper watching

I include all ‘partials’ in a subfolder, and all files that are to be compiled in the root folder.

*e.g.,* Jade’s partials/templates go into folders `jade/layouts` or `jade/partials`, while main that are to be compiled, like, `index.jade` or `about.jade` go in the `jade` folder.

Therefore, I just run tasks on the *root* folders, not any of the subfolders.

This creates a problem with live reloading. It would only reload if any of the files from the root folder is changed, but not if the subfolder files are changed.

To fix this, here’s what I changed my `watch` task to:

```js
gulp.task('watch', ['connect'], function() {  
  gulp.watch( `src/styl/*.styl`, `src/styl/**/*.styl`, ['styles'] );
  ...
});
```

This runs the `styles` task, compiles properly, and livereloads on every file changed.