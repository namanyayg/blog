---
title: "Is AI ready to be a mid-level engineer?"
layout: post
date: 2025-01-13
categories:
  - ai
  - dev
excerpt_separator: <!--more-->
---

Mark Zuckerberg recently claimed AI will replace mid-level engineers by 2025. 

As someone building AI developer tools and studying their real-world implementation, I believe this fundamentally misunderstands both the current state of AI and the role of mid-level engineers.

Here's what Meta is missing.

<!--more-->

## The Current Reality

Current AI coding assistants excel at specific tasks: generating boilerplate, explaining code, and helping with routine programming tasks.

But there's a crucial gap between writing isolated functions and understanding complex systems. In our testing, even the most advanced AI tools consistently fail when dealing with interconnected systems. They'll generate syntactically perfect code that introduces subtle runtime errors by missing critical system dependencies.

Look, AI coding tools are already impressive. Companies like Lovable and Bolt (both $4M+ ARR) are showing real value. But they're thriving in a completely different space: helping indie developers build from scratch, assisting with smaller projects, turning non-developers into casual coders.

That's valuable! But it's not exactly the same as maintaining Meta's massive codebase.

## The Problems

In building our own AI developer tools (and surveying 87 developers about their experiences), I've identified three fundamental challenges that separate AI from mid-level engineers:

1. **Context:**
   Mid-level engineers maintain a comprehensive mental model of the system architecture. They understand service boundaries, data flows, and system dependencies. 
   
   Current AI tools are unable to keep large codebases in context, making it impossible to reason about system-wide impacts.

2. **Memory:**
   Engineers retain crucial historical context about the codebase. 
   
   They understand why certain architectural decisions were made, which optimization attempts failed, and what edge cases led to current implementations. 
   
   AI tools lack this persistent understanding, treating each interaction as a new problem.

3. **Systems Thinking:**
   Engineers excel at understanding cross-system interactions. They can identify potential performance bottlenecks, predict cascading effects of changes, and spot hidden dependencies. 
   
   Current AI tools lack this capability for higher-level system analysis.

## The Future

The path to truly effective AI development tools requires solving several fundamental technical challenges:

### Advanced code understanding

We need AI systems that can maintain persistent models of entire codebases.

This includes understanding architectural patterns, coding conventions, and system dependencies. 

Current research in program analysis and semantic code understanding shows promise, but we're still far from production-ready solutions, because of the context problem.

### Temporal codebase analysis

Future systems will need to understand code evolution over time. 

This means tracking architectural decisions, failed approaches, and the reasoning behind current implementations through git history, PRs, and documentation. 

This requires advances in both retrieval systems and causal reasoning about code changes.

### Multi-agent development

The complexity of software development suggests a multi-agent approach. Here's what this could look like:

  - A planning agent that breaks down high-level requirements into specific technical tasks. This requires knowledge of system architecture, technical constraints, and development patterns. Our experiments show this agent needs to maintain a graph of system dependencies and understand technical debt implications.
  - Implementation agents specialized by domain (frontend, backend, infrastructure) that understand specific ecosystem best practices. These need to coordinate on interface contracts and maintain consistency across boundaries.
  - A testing agent that combines property-based testing approaches with historical bug patterns to generate comprehensive test suites. This agent would need access to production monitoring data to prioritize high-risk scenarios.
  - A review agent that checks for architectural consistency, performance implications, and security considerations. This requires understanding of both local code changes and system-wide impacts.

Could we build this by 2025? 

Maybe. 

The building blocks are there: large language models, graph databases for code understanding, advanced retrieval systems. 

But we're not just teaching AI to write code&mdash;we're teaching it to think about code the way experienced developers do.

## The Evolution of Software Engineering

The real transformation won't be replacement, but evolution. We're seeing the emergence of two distinct specializations:

**Traditional Software Engineers** will increasingly focus on high-level system design, architectural decisions, and complex business logic. 

   Rather than being replaced, they'll be elevated. 
   
   The mundane parts of their job - boilerplate code, routine debugging, basic feature implementation - will be handled by AI. This lets them focus on what humans do best: understanding business context, making architectural decisions, and solving novel problems.

**AI Engineering Specialists** will emerge as a new role, focusing on building and maintaining AI-enhanced development environments. This involves:

  - Designing prompt architectures for different development scenarios
  - Building and maintaining custom training sets from company codebases
  - Developing tools for AI/human collaboration in development workflows
  - Optimizing AI system performance and resource usage

Both roles will require strong software engineering fundamentals, but with different specializations. Traditional engineers will need to understand AI capabilities and limitations to effectively collaborate with AI tools. AI specialists will need deep understanding of development workflows to build effective AI systems.

## A New Reality

The future I see isn't about AI replacing developers&mdash;it's about fundamentally transforming how we build software. Imagine:

- Engineers spending 80% of their time on creative problem-solving instead of routine implementation
- Development velocity increasing by an order of magnitude while maintaining quality
- Systems that catch subtle bugs before they reach production by understanding entire codebases
- Teams focusing on innovation while AI handles the implementation details

Developers who successfully integrated AI tools report spending significantly more time on system design and creative problem-solving. They're not being replaced&mdash;they're being augmented in ways that make their work more impactful.

The key isn't to resist this change, but to shape it. We have the opportunity to create development environments that combine human creativity and insight with AI's speed and precision.

*Want to be part of building this future? I'm working on these exact problems at the intersection of AI and development tooling. Reach out at [hi@nmn.gl](mailto:hi@nmn.gl) - let's make software development more powerful, more creative, and more human.*