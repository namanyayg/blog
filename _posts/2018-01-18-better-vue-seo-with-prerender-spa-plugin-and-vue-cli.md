---
id: 81
title: 'Better Vue SEO with Prerender SPA Plugin and vue-cli'
date: '2018-01-18T21:41:03+00:00'
author: namanyayg
layout: post
guid: 'http://symmetrycode.com/?p=81'
permalink_old: /2018/01/18/better-vue-seo-with-prerender-spa-plugin-and-vue-cli/
categories:
    - Uncategorized
---

Vue loads content asynchronously, which means that Google’s crawlers won’t pick up your site for indexing. That is, until you give them a *rendered* version to see. We’re going to discuss a common way to serve content properly for crawlers here, called “Prerendering”.

One of the existing, common solutions is Server-side Rendering or SSR. They render all content on your server and then send it to the client along with JS for interaction. There’s even a new wave of easy to use SSR-compatible tooling, like [Nuxt.js](https://nuxtjs.org/) (Vue) and [Next.js](https://github.com/zeit/next.js/) (React). However, SSR does have downsides — it moves rendering load from client to server, and requires a node backend to be running.

A solid middle option is occupied by what’s called *Prerendering*, where you run a headless browser (either locally or on the server) to cache some of your site’s pages to disk. The [Prerender SPA Plugin](https://github.com/chrisvfritz/prerender-spa-plugin) for Webpack makes it extremely easy to do all this.

## Installation

*(I’m assuming you’re using the Webpack template for `vue-cli`, where all your configuration files are in the `./build` and you compile the final files to `./dist`.)*

We’re going to create a new Webpack configuration file for the prerendering. We’ll also add a `script` to our `package.json` as an alias.

First, install and save by running `npm i prerender-spa-plugin` or `yarn add prerender-spa-plugin`. Then create a new file under `./build` named `webpack.prerender.conf.js`.

We can only prerender once we have a built `index.html` for us in the `./dist/` folder, so we need to run the existing build script to ensure we have that done correctly. Do so by requiring `path`, `merge`, and the production webpack config like so:

```js
const path = require('path')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.prod.conf')
const PrerenderSpaPlugin = require('prerender-spa-plugin')

const webpackConfig = merge(baseWebpackConfig, {
```

[Drew Lustro](https://github.com/drewlustro) and [Chris Fritz](https://github.com/chrisvfritz) have done a great job abstracting away the difficult work of prerendering, and so we simply add and configure their plugin like so:

```js
const webpackConfig = merge(baseWebpackConfig, {
  plugins: [
    // prerender the important pages
    new PrerenderSpaPlugin(
      path.join(__dirname, '../dist'),
      ['/', '/about', '/faq' /* and others... */],
      {
        /**
          * A dirty hack: setting a very specific viewport size 
          * makes it very easy to check for the prerenderer in Vue's
          * `created()' via `window.innerWidth' and `window.innerHeight',
          * giving a way to server custom content for search engines
          */ 
        phantomPageViewportSize: {
          width: 1242,
          height: 742
        },
        postProcessHtml: function (context) {
          // `context.html' will contain the HTML returned by the
          // headless browser, and `context.route' will be the path
          // use this place to replace or fix the contents.
        }
      }
    )
  ]
})

module.exports = webpackConfig
```

I’m using some of the plugins `options` since fine-tuning prerendering is often needed, but only the first two arguments are actually required — the path to `./dist` and an array of the routes you wish to prerender. Try to pick only routes that don’t change often to minimize time spent running the prerendering script.

The little hack I’ve added allows us to detect the viewport size can then be used in JS or CSS (via media queries) and then present a slightly different version of the page for crawlers. Setting a viewport size is needed if you’ve got responsive website anyway, to choose the version you wish to use for prerendering.

I’ve also needed to strip away all `<style>` tags from the page for a project since there was CSS from rarely-used third party modules being included in the pages that didn’t even use the modules. If you wish to do so too, use this one-liner in `postProcessHtml` which uses a simple RegEx:

`return context.html.replace(/<style type="text\/css">[\s\S]*?<\/style>/gi, '')`

To make things easier, I copied the `./build/build.js` file to `./build/build.prerender.js` and made a few changes to get a pretty spinner when I prerender:

```js
'use strict'
require('./check-versions')()

process.env.NODE_ENV = 'production'

const ora = require('ora')
const chalk = require('chalk')
const webpack = require('webpack')
const webpackConfig = require('./webpack.prerender.conf')

const spinner = ora('building for production...')
spinner.start()

webpack(webpackConfig, (err, stats) => {
  spinner.stop()
  if (err) throw err
  process.stdout.write(stats.toString({
    colors: true,
    modules: false,
    children: false, // If you are using ts-loader, setting this to true will make TypeScript errors show up during build.
    chunks: false,
    chunkModules: false
  }) + '\n\n')

  if (stats.hasErrors()) {
    console.log(chalk.red('  Build failed with errors.\n'))
    process.exit(1)
  }

  console.log(chalk.cyan('  Build complete.\n'))
  console.log(chalk.yellow(
    '  Tip: built files are meant to be served over an HTTP server.\n' +
    '  Opening index.html over file:// won\'t work.\n'
  ))
})
```

Finally, the following line in your `package.json` under `scripts` will give you an easy way to run the prerender from the command line: `"prerender": "node build/build.prerender.js"`

Run the prerender using `npm run prerender`. See files generated in `./dist`. It’s like magic.

## Testing for Google

To check all the pages, make sure you run a local server for `dist` and browse every pre-rendered page with JavaScript turned off (Chrome: Inspector &gt; Settings &gt; “Disable Javascript” under Debugger). Things don’t always work the way you want them to, especially when you’re dealing with headless browsers.

Once you’ve gotten things looking visually perfect, do inspect the generated HTML for excess code that you could trim away to further decrease your filesize.

Finally, once you push and run the prerender on server, use the Google Webmaster’s Console to see if everything is working well; since your ultimate reason for prerendering is probably proper SEO anyway. Click “Request Indexing” under “Fetch as Google” to then get your app to show up on Google.

## Further Reading

- [Prerender SPA Plugin Github](https://github.com/chrisvfritz/prerender-spa-plugin)
- [VueJSDeveloper’s Demo](https://vuejsdevelopers.com/2017/04/01/vue-js-prerendering-node-laravel/)