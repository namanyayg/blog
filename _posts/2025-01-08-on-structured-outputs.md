---
title: "“Structured Outputs” are a false promise: Lessons about AI reliability"
layout: post
date: 2025-01-08
categories:
  - ai
  - dev
excerpt_separator: <!--more-->
---

Last week, my AI coding assistant confidently generated a perfectly-structured API response handler. The code was immaculate, following every best practice. It destructured the response object correctly, handled all the standard HTTP errors, and even included retry logic. 

There was just one problem: it was silently swallowing application-specific errors our team had carefully crafted, replacing them with generic error messages. The code was structurally perfect but fundamentally wrong about our application's error handling philosophy.

<!--more-->

## The Structured Output Trap

The current narrative around structured outputs is compelling. OpenAI, LlamaIndex, and others promote them as the solution to AI reliability. The pitch is seductive: Define a schema, get perfectly formatted responses, never worry about parsing again.

It sounds perfect. It's not.

Here's a recent example (simplified). The AI generated this perfectly-structured error handler:

```typescript
const handleApiResponse = async <T>(response: ApiResponse<T>) => {
  if (!response.success) {
    throw new Error(response.error?.message || 'Unknown error');
  }
  return response.data;
};
```

The code is beautiful. It's type-safe. It handles null checks. 

Can you find out the "mistake"?

The code is fundamentally wrong because it strips away all the domain-specific error context our application needs:

```typescript
// What we actually needed
const handleApiResponse = async <T>(response: ApiResponse<T>) => {
  if (!response.success) {
    // Preserve domain-specific error information
    throw new ApplicationError(
      response.error.code,
      response.error.message,
      response.error.context
    );
  }
  return response.data;
};
```

This isn't a parsing error or a hallucination in the traditional sense. The AI followed its output schema perfectly. It just made incorrect assumptions about our error handling requirements.

## The Real Problem

I've found that the real challenge lies in what happens before and after those perfectly formatted responses. Building AI tooling has taught me that we're optimizing for the wrong thing. While everyone focuses on making AI outputs more structured, the real challenges lie elsewhere:

1. **Context Quality**: The reliability of AI responses depends far more on the quality and structure of inputs than outputs. Sending normalized, validated context matters more than receiving structured responses.

2. **Reality Validation**: A perfectly structured response that contradicts project reality is worse than an unstructured response that gets the fundamentals right.

3. **Failure Patterns**: Most AI failures aren't structural - they're logical. The AI confidently produces well-structured responses that make incorrect assumptions about your codebase.

More importantly, structured outputs create a dangerous illusion of reliability. When you receive a perfect JSON response, you naturally tend to trust it more. This is exactly the wrong instinct.

## A Different Approach

The most reliable improvements in my extension came not from better output formatting, but from:

1. Rigorous input preparation that normalizes and validates code context before sending it to the AI
2. Post-processing validation that cross-references AI suggestions against project reality
3. Pattern matching against common AI failure modes

## The Future Implications

This points to a different future for AI tooling. Instead of obsessing about output structure, we need to focus on:

1. Better tools for preparing and validating AI inputs
2. More sophisticated reality-checking of AI suggestions
3. Explicit handling of AI failure modes that look structurally correct

## Conclusion

Yes, structured outputs are valuable. But they're also dangerous precisely because they're so convincing. A malformed JSON response is obvious. A perfectly structured response that subtly misunderstands your application's requirements is a time bomb.

For those building AI tools: Stop obsessing about output structure. Start obsessing about input quality and reality validation. Because in the real world, a perfectly formatted wrong answer is still wrong - it's just harder to spot.
