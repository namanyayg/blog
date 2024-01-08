---
id: 103
title: 'Simple “Search” with LIKE in MySQL Sequelize'
date: '2018-10-13T06:07:37+00:00'
author: namanyayg
layout: post
guid: 'http://symmetrycode.com/?p=103'
permalink_old: /2018/10/13/simple-search-with-like-in-mysql-sequelize/
categories:
    - Code
    - JavaScript
tags:
    - javascript
---

A simple way to implement a “search” feature into your node app is using the database engine to check for presence of tokenized search query. In my case, I’m using MySQL with the Sequelize ORM and needed to add a e-commerce like search form with product results for a client.

```js
  // sanitize plain text query to only keep alphanumeric lowercase
  const sanitizedQuery = query.trim().toLowerCase().replace(/[\W_]+/, '')
  // split by space as basic tokenization
  const queryTokens = sanitizedQuery.split(/\s+/)

  const options = {
    where: {
      [Op.and]: queryTokens.map(token =>
        // check for presence of each token in lowercased product `title`
        Sequelize.where(Sequelize.fn('lower', Sequelize.col('title')), 'LIKE', `%${token}%`)
      )
    }
  }
  const results = await db.Product.FindAll(options)
```

The main `cleverness` of this snippet is in mapping the `queryTokens` to generate `Sequelize.where()` queries that compare the lowercased title with our token. Sequelize has some powerful features to interact with the database at a low-level, and this is a great example of that used in a real-world project