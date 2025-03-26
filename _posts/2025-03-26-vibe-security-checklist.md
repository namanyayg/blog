---
title: "Security Checklist and Prompt For Vibe Coders"
layout: post
date: 2025-03-26
categories:
 - ai
 - vibe-coding
excerpt_separator: <!--more-->
# image: /assets/ai-and-learning-meta.jpg
# twitter_image: /assets/ai-and-learning-meta.jpg
# twitter_card: summary_large_image
# social_metrics:
  # views: "1,000,000"
  # reddit: "2,500+ votes"
  # hackernews: "100+ comments"
is_featured: false
---

Two days ago, my friend Owen messaged me in a panic. He had built an impressive SaaS app using Bolt, but realized that his OpenAI API key was completely exposed. He was fortunate to have caught it early, but what if this had actually went into production?

[Owen isn't alone](/blog/ai-and-learning). Unfortunately, AI coding assistants often generate functional but insecure code unless explicitly prompted about security concerns.

After walking Owen through securing his application, I realized these lessons could help others. So I compiled this comprehensive security checklist for vibe coders &mdash; the same advice that saved Owen's project. 

I also wrote up a "vibe security prompt" at the bottom of the article. Give that to your AI of choice and secure your application!

<!--more-->

### Set Up Proper Logging

**What to do:** Ensure that all your code is logged consistently, including error cases. You can do that with simple `console.log` statements, or use structured logging with tools like Winston or Pino.

**Why it matters:** Good logging practices help identify security incidents and troubleshoot issues without exposing sensitive information.

**Implementation tips:**

- Use a consistent format, so you know where each log is originating from
- Use different log levels (error, warning, info)
- Never log sensitive data like passwords or tokens

### Protect Environment Variables

**What to do:** Add `.env.local` and similar files to your `.gitignore` immediately and manage sensitive information properly.

**Why it matters:** Exposed credentials are among the most common causes of security breaches. A single leaked API key can compromise your entire system or result in unexpected bills.

**Implementation tips:**

- Add sensitive files to `.gitignore` before your first commit
- Set up environment variables manually in deployment platforms like Vercel/Netlify
- Never hardcode credentials in your application code
- If you accidentally expose secrets, rotate them immediately

### Validate Inputs Server-Side

**What to do:** What if a malicious attacker tries to send improper data to your app, trying to break it? Client-side checks can easily be bypassed. Make sure to always implement comprehensive server-side validation. You can use libraries like Zod.

**Why it matters:** Client-side validation can be bypassed, making server-side validation essential for security.

**Implementation tips:**

- Validate data structure, types, and format
- Implement validation before processing any user input
- Handle validation errors gracefully without exposing system details

### Use Established Authentication Providers

**What to do:** Leverage authentication services like NextAuth, Clerk, or Supabase instead of building authentication from scratch.

**Why it matters:** Authentication is notoriously complex to implement securely. Small mistakes can lead to account takeovers and data breaches.

Just let someone else handle it. I usually go with Supabase Auth, but I've heard that Clerk is good as well.

### Use API Abstraction Layers Properly

**What to do:** Instead of allowing direct database calls from client code, establish server functions that handle data access.

**Why it matters:** Proper API abstraction prevents unauthorized data access and improves performance by centralizing business logic.

**Implementation tips:**

- Client-side code should only call API endpoints, never database functions directly
- Implement proper authentication and authorization checks in your API layer
- Structure API functions to return only necessary data

### Implement Rate Limiting

**What to do:** Add rate limiting to all public-facing endpoints, especially authentication routes.

**Why it matters:** Without rate limiting, attackers can perform brute force attacks or overwhelm your server with requests.

**Implementation tips:**

- Limit each user to a reasonable number of requests per minute/hour
- Set different limits for different endpoints based on sensitivity
- Limit by both IP and user ID to prevent bypass attempts

### Fix ALL Linter Errors

**What to do:** Resolve linter warnings and errors as they occur, don't save them for later.

**Why it matters:** Linters often flag potential security issues along with code quality problems.

**Implementation tips:**

- Configure your IDE to show linter errors in real-time
- Group errors by type and fix systematically
- Consider using AI assistants to help fix linter errors efficiently

## Making AI-Generated Code More Secure

The key to getting secure code from AI assistants is asking the right questions. Here are strategies I've found effective:

- Request security reviews — After generating functional code, ask the AI to audit it for security vulnerabilities
- Break down complex requests — Generate basic functionality first, then separately focus on securing it
- Be explicit about security concerns — Specifically mention authentication, data validation, and error handling
- Prompt for best practices — Ask for modern security standards for your specific framework or language

## Vibe Security Prompt

**How to use:** Copy and paste this prompt into Claude 3.7 Sonnet along with your github repository or a zip file containing all your code.

```markdown
Act as an expert security researcher conducting a thorough security audit of my codebase. Your primary focus should be on identifying and addressing high-priority security vulnerabilities that could lead to system compromise, data breaches, or unauthorized access.

Follow this structured approach:

1. ANALYSIS PHASE:
   - Review the entire codebase systematically
   - Focus on critical areas: authentication, data handling, API endpoints, environment variables
   - Document each security concern with specific file locations and line numbers
   - Prioritize issues based on potential impact and exploitation risk

2. PLANNING PHASE:
   - For each identified vulnerability:
     * Explain the exact nature of the security risk
     * Provide evidence of why it's a problem (e.g., potential attack vectors)
     * Outline specific steps needed to remediate the issue
     * Explain the security implications of the proposed changes

3. IMPLEMENTATION PHASE:
   - Only proceed with code modifications after completing analysis and planning
   - Make minimal necessary changes to address security issues
   - Document each change with before/after comparisons
   - Verify that changes don't introduce new vulnerabilities

Key Focus Areas:
- Exposed credentials and environment variables
- Insufficient input validation
- Authentication/authorization bypasses
- Insecure direct object references
- Missing rate limiting
- Inadequate error handling and logging
- Unsafe data exposure

DO NOT:
- Make cosmetic or performance-related changes
- Modify code unrelated to security concerns
- Proceed with changes without explaining the security implications
- Skip the analysis and planning phases

After each modification, explain:
1. What security vulnerability was addressed
2. Why the original code was unsafe
3. How the new code prevents the security issue
4. What additional security measures should be considered
```

<!-- newsletter_widget -->

## Final Thoughts

The democratization of software development through AI tools is revolutionary, allowing more people to bring their ideas to life. But with this power comes responsibility. Security can't be an afterthought — it must be integrated from the beginning.

The gap between "vibe coding" and production-ready applications isn't insurmountable, but it requires deliberate attention to security fundamentals. As I continue developing my own [AI code enhancement tool](https://gigamind.dev/), I'm focused on solving these security challenges for the next generation of developers.

By implementing these practices, you'll transform AI-generated code from a security liability into a solid foundation for your applications. 

Your users deserve it, and your future self will thank you.