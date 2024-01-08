---
id: 65
title: 'Instant, real-time, RSS to email'
date: '2017-08-27T14:24:09+00:00'
author: namanyayg
layout: post
guid: 'http://symmetrycode.com/?p=62'
permalink_old: /2017/08/27/instant-real-time-rss-to-email/
categories:
    - Uncategorized
---

I’ve been looking for a free option for instant RSS to email subscriptions, and while Zapier comes close; the free tier does not support the volume *or* speed that I require.

That’s why I mocked up [Sangh](https://github.com/namanyayg/sangh). Using Sangh with Gmail’s Filters allows you to have a powerful and well-regulated inbox with a real-time subscription to whatever feeds you want to follow.

## 1. Formatting RSS

The [`rss-parser`](https://www.npmjs.com/package/rss-parser) looks to be a solid bet in terms of simplicity.

I grab the 3 latest entries from the feed and pass them to the parsing function which returns content in an object that can be consumed by `nodemailer` that we’ll set up later. The `formatEntry` function is where you’ll make changes and perform string interpolation to fit your content.

```javascript
const formatEntry = entry => ({  
  to: TO_EMAIL,
  subject: `${ entry.title }`,
  html: `${ entry.content }`
})

parser.parseURL(RSS_URL, (err, parsed) => {  
  let entries = parsed.feed.entries.splice(0, 3) // only latest 3

  for (entry of entries) {
    sendEmail(formatEntry(entry))
  }
})
```

## 2. Configuring `sendmail`

I’m hosting things on a $5 DO droplet [which I’ve configured with Postfix](https://www.digitalocean.com/community/tutorials/how-to-install-and-configure-postfix-as-a-send-only-smtp-server-on-ubuntu-16-04) and can use `sendmail` on, which makes it really easy to use [Nodemailer](https://nodemailer.com/about/)‘s [sendmail transport](https://nodemailer.com/transports/sendmail/).

```javascript
const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({  
  sendmail: true,
  newline: 'windows',
  path: '/usr/sbin/sendmail'
})
```

## 3. Preventing repeats

Now here’s the challenge — *we need to ensure that no repeat emails are sent to us in case the RSS feed doesn’t actually update*. I solved this with a simple sqlite database that records RSS item’s ID and doesn’t send out the email if it’s already sent.

I use `Sequelize` + `sqlite` here. An ORM just makes simple read/write operations easier, and `sqlite`‘s flat file datbase is perfect for this approach.

Initialize the database like so:

```javascript
const Sequelize = require('sequelize')

const sequelize = new Sequelize({  
  host: 'localhost',
  dialect: 'sqlite',
  storage: './posts.sqlite'
})

const Post = sequelize.define('post', {  
  id: {
    type: Sequelize.STRING,
    notNull: true,
    primaryKey: true
  }
}, {
  timestamps: false
})

Post.sync()  
```

We then need to modify our ‘parser’ function to check if post already exists in the DB or not.

```javascript
parser.parseURL(RSS_URL, async (err, parsed) => {  
  let entries = parsed.feed.entries.splice(0, 3)

  for (entry of entries) {
    await Post.findOrCreate({
      where: { id: entry.id }
    }).spread((_, created) => {
      if (created) {
        // if a new entry had to be created, send an email
        sendEmail(formatEntry(entry))
      }
    })
  }
})
```

Note my use of `async` and `await` here. This is for performance reasons, since it’s better for `sqlite` to run synchronous create operations rather than async ones, it often breaks on async operations. `await`ing the `findOrCreate` promise makes the loop run synchronously, which is exactly what we want.

## 4. Run it every minute

I use `cron` to run the node script every minute to check for updates. Check your node install location by running `which node` (mine is `/usr/local/bin/node`) and run `crontab -e` to open the crontab editor.

Add the line `* * * * * /usr/local/bin/node /path/to/your/script/index.js` to check and email updates every minute. And you’re done!

## Wrapping up

A quick, small project highlighted the importance of using various tools in modular ways to come up with something great. `sqlite` is perfect for such applications, and ‘offloading’ the actual checks to `cron` is much better and optimized than running a node script via `forever`/`pm2` etc. [Get the final version of Sangh at Github](https://github.com/namanyayg/sangh).