---
id: 34
title: 'Using gulp at MakeUseOf'
date: '2014-03-14T04:13:00+00:00'
author: namanyayg
layout: post
guid: 'http://symmetrycode.com/?p=27'
permalink_old: /2014/03/14/using-gulp-at-makeuseof/
categories:
    - Uncategorized
tags:
    - Coding
    - Coding
    - gulp
    - gulp
    - MakeUseOf
    - Work
    - Workflow
    - Workflow
---

At MakeUseOf, since the start of the new theme, we simply wrote plain ‘ol CSS and normal JS. No cool stuff like concatenation of compression or minification. Plain code, edited and uploaded through Filezilla.

Now we’ve moved on to a better workflow – Using gulp, Vagrant, git &amp; Github. Here I’ll talk about how we set up and use [gulp](https://github.com/gulpjs/gulp).

## Setting up gulp

Setting up gulp was *surprisingly* extremely easy. I just ran these two commands:

```sh
$ npm init
$ npm install gulp -g
$ npm install gulp --save-dev
```

And gulp was ready to go. To avoid syncing useless stuff, I added `node_modules` to `.gitignore` (And [James](https://twitter.com/w0lfiesmith) reminded me to add `.sass-cache` as well).

## The Gulpfile

We have two main requirements for scripts and styles currently:

- Processing, minifying, and prefixing SASS and Compass.
- Minifying and using includes on JS.

Multiple plugins are used to achieve this:

- [gulp-load-plugins](http://www.npmjs.org/package/gulp-load-plugins)
- [gulp-concat](http://www.npmjs.org/package/gulp-concat)
- [gulp-uglify](http://www.npmjs.org/package/gulp-uglify)
- [gulp-autoprefixer](http://www.npmjs.org/package/gulp-autoprefixer)
- [gulp-minify-css](http://www.npmjs.org/package/gulp-minify-css)
- [gulp-include](http://www.npmjs.org/package/gulp-include)
- [gulp-clean](http://www.npmjs.org/package/gulp-clean)
- [gulp-compass](http://www.npmjs.org/package/gulp-compass)

I’ve set up three tasks for gulp (including the `watch` task).

### Loading Plugins

As you can see above, I’m using `gulp-load-plugins` here. This adds a global object that has all the plugins, and so I don’t need to manually add each plugin on install.

```js
var gulp = require("gulp");  
var p = require("gulp-load-plugins")();  
```

Plugins can then be accessed through `p.pluginName()`, like, `p.minifyCss()`.

### Paths

MakeUseOf is a large site and gulp’s installed in the `wp-content` folder. Managing paths can get ugly, easily, hence I’ve made an object, `paths`, which has file paths to all used locations.

Javascript resides in `js/src` and `js/src/plugins` folders, which is compiled to `js`, and SCSS is in `styles` folder, which is compiled to `style.css` (Since we use WordPress).

```js
var paths = {  
  m2014: {
    scripts: {
      src: 'themes/makeuseof2014/js/src/*.js',
      dest: 'themes/makeuseof2014/js'
    },
    styles: {
      src: 'themes/makeuseof2014/styles/*.scss',
      dest: 'themes/makeuseof2014'
    }
  }
}
var m2014 = paths.m2014;  
```

`m2014` here refers to the theme name, so the script can easily be modified for other themes as needed.

### Styles

The `styles` task is responsible for doing three things:

- Converting SASS to CSS.
- Prefixing CSS.
- Minifying CSS.

It’s a pretty straight-forward task

```js
gulp.task('styles', function() {

  var src = m2014.styles.src;
  var dest = m2014.styles.dest

  // Compiles sass, autoprefixes, and compiles files
  gulp.src( src )
  .pipe( p.compass({
    css: 'themes/makeuseof2014',
    sass: 'themes/makeuseof2014/styles',
    style: 'compressed',
    comments: 'false'
  }) )
  .pipe( p.autoprefixer() )
  .pipe( p.minifyCss() )
  .pipe( gulp.dest( dest ) )
});
```

The `src` and `dest` variables are set so that I can easily use either in the main function.

`gulp` works through piping files (Can be in an array, can use the wildcard, etc) through a series of plugins. Each plugin can have specific settings with it, passed as arguments. If you’re familiar with jQuery, gulp should be pretty easy to understand and write.

### Scripts

Our goal with scripts was simply – Compressing them, and allowing use of `includes`.

```js
gulp.task('scripts', function() {

  var src = m2014.scripts.src;
  var dest = m2014.scripts.dest

  gulp.src( dest + '*.js', { read: false } ).pipe( p.clean() );
  // Clean old files

  // Uglifies files from src folder -> main folder
  gulp.src( src )
  .pipe( p.include() ) // JS Includes
  .pipe( p.uglify() ) // Compresses JS
  .pipe( gulp.dest( dest ) );
});
```

Here’s how the `scripts` task looked.

Note the ‘clean’ thing – It deletes all compressed JS files from the `js` folder. `dest + *.js` deletes only the Javascript files in `js` folder, not in it’s subfolders. (Learnt this the hard way…)

Done using `gulp-clean`, This is important because we *might* delete source scripts some times, and in that case, the compiled script will still remain in the `js` folder.

Setting `read` to `false` will prevent node from reading the files, and will decrease time taken.

### Watch

The `watch` tasks calls the above tasks whenever there’s a change in the files in the `styles` folder or in the `js/src` folders.

```js
gulp.task('watch', function() {  
  gulp.watch(m2014.scripts.src, ['scripts']);
  gulp.watch([m2014.styles.src, m2014.styles.dest + '/**/*.scss'], ['styles']);
});
```

`m2014.styles.dest + '/**/*.scss'` checks for `scss` files in subfolders of `style`, otherwise it won’t run if a file in one of the subfolders was edited.

### The default task

```js
gulp.task('default', function() {  
  gulp.start('scripts', 'styles', 'watch');
});
```

Just runs the three tasks that we defined above.

## Syncing files

At MakeUseOf we use a Vagrant set up and a git repo set up at the `wp-content` folder.

Gulp-related files that are synced are `package.json` and `gulpfile.js`. Others are added to `.gitignore`, and can be installed on each computer seperately (Through `npm install`, basically).

## Further Reading

- [gulp.js](http://gulpjs.com/).
- [gulp docs – Getting Started](https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md#getting-started).
- [Getting started with gulp](http://markgoodyear.com/2014/01/getting-started-with-gulp/).