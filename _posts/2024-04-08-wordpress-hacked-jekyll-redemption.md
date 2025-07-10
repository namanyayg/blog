---
title: 'Hacked WordPress, Lost Rankings: My Jekyll Redemption Story'
layout: post
excerpt_separator: <!--more-->
---

I've been running multiple WordPress blogs for my friends and family on my own VPS since ~2012. I didn't bother checking them for updates, and _surprise surprise_ they all got hacked.

This is my journey of how I fixed it and how the latest version of my blog was born.

<figure class="medium">
<img src="assets/wp-hacked-directory.png" />
<figcaption>Hmm, this is not what WordPress is supposed to look like is it?</figcaption>
</figure>

<!--more-->

## 0. Initial Discovery

I woke up one day to a notice from DigitalOcean claiming "intrusion" originating from my VPS' IP.

<figure class="medium">
<img src="assets/digitalocean-abuse-ticket.png" />
<figcaption>Oh no!</figcaption>
</figure>

Well, _of course_ my VPS couldn't be at fault and this was a false alarm _(classic denial)_.

...But when I noticed the path containing `/wp-content/plugins/wp-striplple/`, I could guess what has happened.

## 1. Confirmation & Anger

Could it really be that my multiple WordPress installs, many that I have not updated since many years, could have been hacked?

I read about this all the time, but certainly a hacked WordPress was something that happened to other people and not me!

Oh well.

As soon as I SSH'd into my server and opened my WP directory, I knew something was off. I had a lot of extra files present that I'm sure were not supposed to exist.

I deleted those which I could easily see, but then I checked all the WP sites that I was hosting. Seemed like most of them weren't updated in years, so I had the easy option of shutting them down.

However, the site that was most impacted was my personal blog "Symmetrycode". I had been blogging there since ~6 years. Now, the real posts on my blog were interspersed with articles with affiliate links. And worst of all, **when I googled any article, my blog didn't show up.** I was deranked from Google for hosting malicious files.

At that point, I knew the Symmetrycode domain was dead. And I also knew that one day I'll revive it.

Till then, I basically turned off each and every WP site I had installed by:

```bash
chown newuser:newuser -R . # giving ownership of all files to a new user without any rights
chmod 600 -R . # make it only accessible by current user, not anyone else
```

Now, the malware and all my sites were completely dead and inert. Phew?

## 2. Rebirth

At this point, I have lost faith in any system with a backend.

_The best way to prevent a hack is to not have anything hackable at all._

And you know what's something that has powered the internet since it's inception and cannot be hacked? Plain ol' HTML and CSS.

So, I decided to move all my work from the past and in the future to static site hosting by moving to Github Pages.

I started off with my homepage, which is [now happily on Github](https://github.com/namanyayg/namanyayg.github.io/).

Then, I created a new Jekyll site for this blog. To move my old content, I followed these steps:

1. Take a dump of all db data using `mysqldump`
2. Import it into a local WordPress install on XAMPP
3. Install the WordPress Jekyll Exporter plugin

I got all my old posts in a friendly and beautiful markdown format.

I made myself a new Jekyll theme called "Pyaar2", after the original WordPress theme I created for Symmetrycode [7 years ago](https://github.com/namanyayg/pyaar).

I finally was able to restore all posts and launch this blog around Christmas, as a small gift to myself.

## Conclusion

It's heartbreaking to lose my old domain and rankings, but I'm sure I can figure out how to fix them. I have it in my todo list to add redirects, Lessons learned:

* _Every_ piece of code needs maintenance and upgrades. So minimize writing code and avoid hosting yourself.
* Avoid hosting anything with a backend, especially if you want it to last decades and want no maintenance hassle.
* Storage and CDNs are cheap as dirt. Don't pay for a VPS. Try to make everything into a static site, build locally, and then use Github Pages or Cloudflare to host the built files.


