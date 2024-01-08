---
id: 46
title: 'CSS Layouts – Making an effective grid system'
date: '2012-11-12T13:00:00+00:00'
author: namanyayg
layout: post
guid: 'http://symmetrycode.com/?p=39'
permalink_old: /2012/11/12/css-layouts-making-an-effective-grid-system/
categories:
    - Uncategorized
tags:
    - Other
---

Grid systems are seen on every website (one of my personal favorite is the grid on Apple’s site). An effective grid system with a good CSS layout not only looks good and professional, it gives a sense of uniformity.

But before making an effective grid system, we’ll need to learn what it is. Here I’ve defined a few points which I feel a good CSS layout should have:

- Uniform margins.
- Sleek code.
- Can mix and match different grid widths (example, I can use a half, and two quarter grids if I want to).
- The grids don’t interact with other elements.

Making a grid might seem intimidating, as Math is required (and there’s a high chance of screwing up) but here I’ll walk you through each step 🙂

## 1. Define what you need

You’ll see loads of (useless, IMO) grids that boast upto 12, or even 18 column grids. Here, you have to ask yourself, how many columns do you actually need?

Your answer would be less than four. Four is a good average, you can get a decent amount of information in, and it doesn’t feel too cramp, too!

## 2. Check out a few grids

Just go and check out a few grids, to see how they work. Here are some of my favorites:

- [1140 CSS Grid](http://cssgrid.net/)
- [960gs](http://960.gs/)
- [Sympl](https://github.com/namanyayg/sympl)[(Demo)](http://namanyayg.com/sympl/)

You’ll note one thing in common. To fulfill the third condition, that is, that grids of different widths can work together, they define individual grid widths same floats and margins, so that they work together.

My initial approach wasn’t the same, I was thinking of having a `grid-n` class, and there could be only n number of columns.

Since then, I’ve learnt, and implemented my idea in my own little framework, [Sympl](https://github.com/namanyayg/sympl).

## 3. Find a good margin

Depending upon the number of columns, you’ll need to figure out the margin between columns (Also called ‘gutter’)

Let’s say you want CSS layouts that give you up to 5 columns (That would be one unique grid!).

5 columns will have 4 spaces in between.

Thus, you’ll need to find a number, that when multiplied by 4 and subtracted from 100, gives you a number easily divisible by 5.

Confused? Here’s a simple formula, letting x be the gutter, and n being the max number of columns.

```
(100 - (n-1)x)/n = number with max three decimal places.
```

This, of course, isn’t a hard and fast rule. You can morph it as you wish, but I recommend keeping the number of decimals to a bare minimum.

You’ll notice that I supplied you with only one statement, so the answers can be infinite. Therefore, another thing to keep in mind is that n should be less than 6, ideally between 2 and 5.

But here’s something we missed. **It should go the same with each number after**. So, changing our equation,

```
(100 - (n-1)x)/n = 3 decimal number AND
(100 - (n-2)x)/n-1 = 3 decimal number
...
(100 - x)/2 = 3 decimal number.
```

Got tougher, right?

I use up to 4 columns *(yet)* and have found a good number to use as gutter—3.5%.

Here’s it in work.

```
(100 - 3 * 3.5) / 4 = 22.375
(100 - 2 * 3.5) / 3 = 31
(100 - 1 * 3.5) / 2 = 48.25
```

You’ll notice that I kept the margin as such, so when divided by three, it gives a whole number. In such odd (pun not intended) numbers like 3, getting the result as a whole number is a good thing.

Once you figure out the gutter and the number of columns, and you’re done with the theory part! Here’s what you get once you put everything in the HTML (And set the fonts)

![CSS layouts - Making an effective grid system - In action Sympl](http://i.symmetrycode.com/2012/11/CSS-layouts-Making-an-effective-grid-system-In-action-Sympl.png "CSS layouts - Making an effective grid system - In action Sympl")

## 4. In code

I use pretty defining and to-the-point names as my classes. Simple, easy, memorable classes is my thing. For the column that spans one fourth of the page, the class is `.quarter`, and for one third, `.onethird`. Nothing too complex 🙂

I also have two other elements, one, the wrapper, `.row`, and the other, a class to clear out the right margin in the last element, `.last`

As you might have guessed, the selector `.last` has a right margin of 0.

The selector `.row` has it’s overflow set to hidden ([To clear floats](http://www.impressivewebs.com/clearing-floats-why-necessary/)), clear set to both, and a bottom margin of `1.5em` (Change it to match with your baseline).

As for the HTML, I keep `.row` in a `div` tag, while the columns are attached to `section` tags (Semantics :D). The last column has the class of last.

With this, you’re finished with making your own 4 column grid! 🙂

## In action

I used pretty similar ‘steps’ to come up for the grid styles in my own framework, [Sympl](https://github.com/namanyayg/sympl). Check out [Sympl’s demo](http://sympl.namanyayg.com/) for a preview of it’s grid!