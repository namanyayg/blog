---
title: "LLM “Structured Outputs” are Missing the Point"
layout: post
date: 2025-01-07
categories:
  - ai
  - dev
excerpt_separator: <!--more-->
---

Last week, my AI coding assistant generated a perfectly-structured code review suggestion. 

The format was immaculate - every field properly typed, every attribute carefully specified, the suggestion clear and actionable. 

There was just one problem: it fundamentally misunderstood how our authentication system worked.

<!--more-->

## The Structured Output Trap

The current narrative around structured outputs is compelling. OpenAI, LlamaIndex, and others promote them as the solution to AI reliability. The pitch is seductive: Define a schema, get perfectly formatted responses, never worry about parsing again.

It sounds perfect. It's not.

Here's a real example from my extension. Using function calling, I defined a schema for code review suggestions:

```typescript
type CodeReviewSuggestion = {
  severity: 'critical' | 'warning' | 'info';
  category: 'security' | 'performance' | 'maintainability';
  location: {
    file: string;
    startLine: number,
    endLine: number
  };
  suggestion: string;
  impact: string;
  fix: {
    before: string;
    after: string;
    rationale: string;
  };
}
```

The AI generated this perfectly-structured response:

```json
{
  "severity": "critical",
  "category": "security",
  "location": {
    "file": "src/auth/session.ts",
    "startLine": 45,
    "endLine": 52
  },
  "suggestion": "Move token validation before user data access",
  "impact": "Potential unauthorized data access",
  "fix": {
    "before": "const userData = await getUser(token); validateToken(token);",
    "after": "validateToken(token); const userData = await getUser(token);",
    "rationale": "Ensure token is valid before accessing user data"
  }
}
```

The response was perfectly structured. Every field was correctly typed. The suggestion seemed logical. There was just one critical problem: `getUser()` is idempotent and caches results, while `validateToken()` has side effects that refresh the token. The suggested reordering would break our token refresh mechanism.

This isn't a parsing error or a hallucination in the traditional sense. The AI followed its output schema perfectly. It just made incorrect assumptions about our codebase's behavior.

## The Real Problem

I've found that the real challenge lies in what happens before and after those perfectly formatted responses. Building AI tooling has taught me that we're optimizing for the wrong thing. While everyone focuses on making AI outputs more structured, the real challenges lie elsewhere:

1. **Context Quality**: The reliability of AI responses depends far more on the quality and structure of inputs than outputs. Sending normalized, validated context matters more than receiving structured responses.
2. **Reality Validation**: A perfectly structured response that contradicts project reality is worse than an unstructured response that gets the fundamentals right.
3. **Failure Patterns**: Most AI failures aren't structural - they're logical. The AI confidently produces well-structured responses that make incorrect assumptions about your codebase.

More importantly, structured outputs create a dangerous illusion of reliability. When you receive a perfect JSON response, you naturally tend to trust it more. This is exactly the wrong instinct.

## A Different Approach

In my experience building an AI coding assistant, the most significant reliability gains came from what we did before and after the AI interaction, not from output formatting.

This points to a different future for AI tooling. Instead of obsessing about output structure, we need to focus on:

1. Better tools for preparing and validating AI inputs
2. More sophisticated reality-checking of AI suggestions
3. Explicit handling of AI failure modes that look structurally correct

## Conclusion

Yes, structured outputs are valuable. But they're also dangerous precisely because they're so convincing. A malformed JSON response is obvious. A perfectly structured response that subtly misunderstands your application's requirements is a time bomb.

For those building AI tools: Stop obsessing about output structure. Start obsessing about input quality and reality validation. Because in the real world, a perfectly formatted wrong answer is still wrong &mdash; it's just harder to spot.
