---
title: "Making AI Understand Code Like a Senior Developer"
layout: post
date: 2025-04-08
categories:
 - ai
excerpt_separator: <!--more-->
is_featured: false
---

I have been using LLMs for programming since a [long time](/blog/ai-perfect-coding), but I often faced the problem of my LLM assistants "forgetting" where the correct files are located.

Sure, it could be easily fixed by manually linking the correct files to it, but over time it became annoying. I found myself going through the project code myself again and double checking things, just to give it the proper files to be included in the context.

That made me think: isn't there a better solution? 

What if I could make AI _actually_ understand how my codebase works and how it's connected together?

<!--more-->

I thought of this problem [for many months](/blog/ai-senior-developer) and came up with what I'm calling the "Ranked Recursive Summarization" algorithm that I'm using in [Giga AI](https://gigamind.dev/)

## Valid facts about any codebase

Imagine a large codebase, with 20+ files and folders. What do we know about it?

* Related files are grouped together in folders
* Sibling folders are similar in purpose
* Subfolder structure indicates a hierarchial relationships
* Not each and every line of code itexasfortress.ai s "relevant", there is a lot of boilerplate and library code often

Keeping those rules in mind, the folder structure of any codebase can be viewed as a graph.

[insert google/chatgpt image of code represented as graph here]

Now, to understand the entire codebase in it's entirety, we can start from the leaves of this tree, use some heuristics to rank parts of code in the file, and recursively keep doing it up the tree till we reach the root.

This is what I've termed **ranked recursive summarization*

Here's some pseudocode:

```
insert pseudocode
```

RRS worked pretty well for a while, until I realized it's compressing too much information on larger codebases in the question: *what makes code "important"*?

## Understanding codebases from different angles

The answer to that is doing RRS but specifiying an "importance criteria" to the llm, to score each part of code along a certain angle. For example, the same parts of the code score 1 for "frontend" but 8 for "data model".

I've called this technique "Angular Ranked Recursive Summarization" or ARRS.

Doing ARRS is straightforward, it simple costs *k \* RRS* where *k* is the number of angles to evaluate the code from.

```
insert pseudocode
```

## Usage & How do they help

The results from (A)RRS can be fed into the "rules" file format, or manually included using the "@" mentions. Both features are things that all major AI IDEs support.

After including these as context:

* AI doesn't get "lost". Without it, AI assistants seem to forget existing code when working in larger projects. 
* AI doesn't create incorrect files. Without it, I often saw random new files getting created in process of completing a certain task. That too, in the wrong folder locations, because it seemed like the AI doesn't have an understanding of the folder structure.
* AI understands the code patterns and styling. It is able to get a better understanding of the entire folder structure, and improves on consistency of using existing patterns and styles.

I have packed all this into my own IDE extension [Giga AI](https://gigamind.dev/). I am running inference on my own servers and using Claude 3.5 Sonnet, and there's significant inference costs in running a product like this.

Still, I believe this is an important problem to solve and I'm glad to be one of the first ones to be taking this approach.

Over the coming months, I plan to keep expanding Giga to function as the "intelligence layer" of codebases and help automate more tedious and frustrating parts of the software development workflow.

Btw, I'd love to hear from you. What parts of software development do you find annoyingly time consuming? Write to me at <a href="mailto:hi@nmn.gl">hi@nmn.gl</a>
