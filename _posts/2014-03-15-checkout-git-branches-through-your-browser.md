---
id: 49
title: 'Checkout git branches through your browser'
date: '2014-03-15T08:50:00+00:00'
author: namanyayg
layout: post
guid: 'http://symmetrycode.com/?p=42'
permalink_old: /2014/03/15/checkout-git-branches-through-your-browser/
categories:
    - Uncategorized
tags:
    - Coding
    - Coding
    - Git
    - Git
    - Tutorial
    - Tutorial
    - Workflow
    - Workflow
---

Most git workflows involve use of multiple branches for different sub-tasks, example, a new branch for an alternative layout for the homepage. However, managing braches on the server quicky gets tedious – SSHing in, navigation to the correct directory, then running `git checkout <branch>` – is tiring for all, right?.

That’s why I came up with a simple solution that used PHP and GET requests to checkout different branches on the server through the browser.

## The Concept

What we’re trying to achieve here is:

1. An easy way to pass a branch name to a script.
2. That script uses that branch name to run a checkout in the correct directory.
3. The output of the command is presented to us, to tell if it ran correctly or not.

Doing this with a small, but powerful, PHP script is our challenge.

## The Code

### GET Request

We’ll be passing variables as GET requests, because:

1. It’s easy.
2. It’s lazy.

So just make a variable holding the GET variable in your PHP

```php
$branchname = $_GET['branch'];
```

We’ll also need to check if the user has actually supplied a request, if not, echo a helpful message and stop the script from executing further.

```php
if (!$branchname) {  
  echo "Please enter a branchname, ?branch=<name>";
  return false;
}
```

### Executing the command

We need to `cd` into the correct directory and run `git checkout $branchname`. We do that using `shell_exec()`.

```php
$command = 'cd <directory> && git checkout ' . $branchname;
$output = shell_exec($command . ' 2>&1');
```

You might not need to change directory, so feel free to remove `cd <directory>`. The rest is essential. [`2>&1`](http://stackoverflow.com/questions/818255/in-the-shell-what-is-21) directs `stderr` to `stdout` (Or put simply, outputs the result of the command).

Printing the output would be extremely helpful as well:

```php
echo 'Checking out ' . $branchname . '&hellip;<br>';  
echo $output . '<br>';  
```

And we’re done. Upload it to your server with a filename like `checkout-git-branch.php`, and try it out!

### Final code

```php
<?php

$branchname = $_GET['branch'];

if (!$branchname) {  
  echo "Please enter a branchname, ?branch=<name>";
  return false;
}

$command = 'cd <directory> && git checkout ' . $branchname;
$output = shell_exec($command . ' 2>&1');

echo 'Checking out ' . $branchname . '&hellip;<br>';  
echo $output . '<br>';  
?>
```