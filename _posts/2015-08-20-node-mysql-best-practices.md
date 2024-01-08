---
id: 52
title: 'Two really cool Node MySQL tips'
date: '2015-08-20T05:54:17+00:00'
author: namanyayg
layout: post
guid: 'http://symmetrycode.com/?p=47'
permalink_old: /2015/08/20/node-mysql-best-practices/
categories:
    - Uncategorized
tags:
    - mysql
    - node
    - tips
---

Node MySQL is a great traditional alternative to mongo and all the jazz youngins are using. One important advice – **never use `+` to concatenate queries unless you know what you’re doing.**

## 1. Always escape using `?` as placeholders

Queries are usually written as:

```js
connection.query('SELECT * FROM foo WHERE bar = baz', function(err, results) {  
    // ...
});

```

If you want to check against a custom property, **don’t do this.**

```js
connection.query('SELECT * FROM foo WHERE bar = ' + someVariable, function(err, results) {  
    // ...
});

```

Instead,

```js
connection.query('SELECT * FROM foo WHERE bar = ?', [someVariable], function(err, results) {  
    // ...
});

```

You can use multiple `?` like so:

```js
connection.query('SELECT * FROM foo WHERE ? = ?', [someProperty, someValue], function(err, results) {  
    // ...
});

```

## 2. Use the `SET ?` syntax

Node MySQL converts objects from `{ a: 'b' }` to `a = 'b'` when escaped. Insertions with objects is thus easy:

```js
var user = { id: 42, name: "Namanyay Goel" };  
connection.query('INSERT INTO users SET ?`, user, function(err, result) {  
    // ... 
}); 

```

[Then you never have to do this](http://stackoverflow.com/questions/30147983/separate-keys-and-values-from-object)...

- - - - - -

[Learn more about Node MySQL’s escaping](https://github.com/felixge/node-mysql/#escaping-query-values)