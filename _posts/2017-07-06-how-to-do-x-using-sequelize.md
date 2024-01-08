---
id: 64
title: 'How to do X using Sequelize'
date: '2017-07-06T08:36:09+00:00'
author: namanyayg
layout: post
guid: 'http://symmetrycode.com/?p=61'
permalink_old: /2017/07/06/how-to-do-x-using-sequelize/
categories:
    - Uncategorized
---

I don’t know about you guys, but I always have an annoying time trying to figure out how to make Sequelize work — the documentation seems to have a dearth of examples. Here’s a few examples for “common” functionality.

**Get plain objects instead of Sequelize Instances after bulkCreate**

```javascript
models.Item.bulkCreate(values)  
.then(results => results.map(result => result.get({ plain: true }))) // Convert to plain
.then(items => console.log(items)) // Plain object array [{...}, {...}, ...]
```

Pretty easy, use `.get({ plain: true })` on any Sequelize instance to convert it to a plain JavaScript object.

**Sequelize bulkCreate but ignore any duplicates**

```javascript
models.Item.bulkCreate(values, {  
    ignoreDuplicates: true 
})
```

Just use the `ignoreDuplicates` option and pass it as the second argument.

**Deleting a row**

Delete is called `destroy`, use it as so:

```javascript
models.Items.destroy({  
    where: {
        id: 42
    }
})
```