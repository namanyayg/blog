---
id: 23
title: 'Super easy deployment with Git and Bitbucket'
date: '2014-03-06T03:59:00+00:00'
author: namanyayg
layout: post
guid: 'http://symmetrycode.com/?p=16'
permalink_old: /2014/03/06/super-easy-deployment-with-git-and-bitbucket/
categories:
    - Uncategorized
tags:
    - Coding
    - Git
    - Tutorial
    - Workflow
---

Git is the one of the best version control system around, and bitbucket offers unlimited free private repos. What’s left is a *simple* way to deploy to your server every push.

The solution? BitBucket hooks.

## Introduction to BitBucket hooks

[BitBucket Hooks](https://confluence.atlassian.com/display/BITBUCKET/Manage+Bitbucket+hooks) allow an easy way to trigger scripts after each push . The one we’re looking for today is a [POST hook](https://confluence.atlassian.com/display/BITBUCKET/POST+hook+management).

A POST hook sends a ‘payload’ of information related to the repository and the git commit, formatted in JSON, as a POST request to a URL we supply. ([Instructions for setting up and example payload data by BitBucket](https://confluence.atlassian.com/display/BITBUCKET/POST+hook+management)).

So, go on and create a script with an obscure and un-guessable name *(security through obscurity)*, for example, `deploy-correcthorsebatterystapler.php`. Next, make a POST hook on the repo of your choice to call said php script.

## What does the deploy script do?

Our script will do four things:

1. Parse the payload sent by Bitbucket servers.
2. Check the payload data.
3. Pull from the remote repository.
4. Log results.

*Note step 3* – Pulling from the remote repository. For that, we’ll need to create a SSH key so that our *PHP user* can access and modify the remote repo without a password.

## Setting up SSH

### Who am I?

First, we need to find out who the PHP user is. We could do that through a PHP script that executes `whoami` in the shell. Run this:

```php
<?php echo exec('whoami'); ?>  
```

Depending on the configuration, you could get `apache`, `www-data`, or any other. My PHP user is `www-data`, and since I’m lazy, I’ll write the post using `www-data`.

### Creating keys for www-data

For creating the keys, we basically need to:

1. Access the shell as the `www-data` *(Requires sudo)*.
2. Create keys.
3. Add BitBucket.org as host for that key in the config file.

To give commands as any other user, we do `sudo -u <username> <command>`. So in this case, we’ll do `sudo -u www-data`.

The first step is to create a SSH key pair. Run `sudo -u www-data ssh-keygen -t rsa`. That would show the directory where SSH keys are stored for `www-data`, and, create a key pair. You’ll be prompted for the name and password of the key. I set the name to `id_rsa-git`, feel free to name it anything; but the password should be *blank*.

Now, we need to create a config file in `www-data`‘s SSH directory. A config file tells which host uses what key for SSH access. `cd` to the SSH directory (mine was `/var/www/.ssh`) and create file `config` in that folder.

*(You may need to change permissions of `.ssh` to 0700 for `cd`ing in, do that by running `sudo chmod 0700 /var/www/.ssh`.)*

The `config` file requires two lines:

```bash
Host bitbucket.org <more hosts, space separated>  
    IdentityFile <keyname>
```

My `config` file looks like

```bash
Host bitbucket.org github.com  
    IdentityFile /var/www/.ssh/id_rsa-git
```

…and you’re done here. Give yourself a pat on the back.

## Back to the deploy script

### Parsing and verifying the payload

The payload is in JSON, and to use it as a PHP object, we have to decode it.

```php
<?php  
    $payload = '';
    if ( isset($_POST['payload']) ){
        $payload = json_decode($_POST['payload']);
    } else {
        return false;
    }
    $repo = $payload->repository
?>
```

The above snippet checks if the payload exists, and if it does, sets `$payload` variable to data from BitBucket. Also set `$repo` to `repository` in `payload`.

### Pull from the remote repo

This is simple – we need to run init, then add an origin, and then pull from the origin repo.

To enter a bash command in PHP, we need to use [`exec()`](http://in3.php.net/function.exec).

```php
<?php  
exec('git init && git remote add origin git@bitbucket.org:' . $repo->absolute_url . '.git . && git pull origin master');  
?>
```

### Logging runs

This is the easiest part. Using `file_put_contents`, we create a log file where times when the script was run are added.

```php
<?php  
file_put_contents('bitbucket-deployment.log', 'Last run on: ' . date('m/d/Y h:i:s a'), FILE_APPEND);  
?>
```

…and you’re done. Congrats! Read further if you want to add more stuff to your script and want to get tips for debugging.

**The final deploy script:**

```php
<?php

  $payload = '';
  if ( isset($_POST['payload']) ){
    $payload = json_decode($_POST['payload']);
  } else {
    return false;
  }

  $repo = $payload->repository;

  exec('git init && git remote add origin git@bitbucket.org:' . $repo->absolute_url . '.git . && git pull origin master');

  file_put_contents('bitbucket-deployment.log', 'Last run on: ' . date('m/d/Y h:i:s a'), FILE_APPEND);

?>
```

## Debugging

Echoing the output of shell commands and using demo payload data are two easy ways we can debug.

**Demo payload data**

```php
<?php  
    $payload = '';
    if ( isset($_POST['payload']) ){
        $payload = json_decode($_POST['payload']);
        file_put_contents('payload.log', $_POST['payload']);
    } else {
        $payload = json_decode(file_get_contents('payload.log'))
        return false;
    }
    $repo = $payload->repository
?>
```

Put the output of `$_POST['payload']` to `payload.log`, and run a testing push. A new file, `payload.log`, will be created and you’ll find demo data. Visiting the URL from your web browsers will let you retain and test with actual payload data. You can the use `echo`s for testing, instead of the complicated `file_put_contents()`. Pretty cool, right?

**Output shell command results to the browser**

Changing the execution line to this

```php
<?php  
echo exec('git init 2>&1 && git remote add origin git@bitbucket.org:' . $repo->absolute_url . '.git . 2>&1  && git pull origin master 2>&1');  
?>

```

Will `echo` the outputs of each command.

[2&gt;&amp;1 redirects stderr to stdout](http://stackoverflow.com/questions/818255/in-the-shell-what-is-21), while the `echo` before `exec(...)` will print `stdout` in the browser.

### Further reading

- [Automated git deployments from Bitbucket](http://f6design.com/journal/2013/11/19/automated-git-deployments-from-bitbucket/)
- [Using Bitbucket for Automated Deployments](http://brandonsummers.name/blog/2012/02/10/using-bitbucket-for-automated-deployments/)