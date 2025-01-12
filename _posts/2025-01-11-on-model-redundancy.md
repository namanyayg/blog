---
title: "Stop Using Just One AI Model in Production"
layout: post
date: 2025-01-11
categories:
  - ai
  - dev
excerpt_separator: <!--more-->
---

*Learning why model redundancy > optimization*

It started with a frustrating Thursday afternoon. Our code analysis service was hitting rate limits constantly, and I was doing what any reasonable engineer would do: optimizing our token usage, implementing better queuing, and trying to squeeze maximum performance from our chosen model.

Nothing worked. Or rather, everything worked a little bit, but not enough.

<!--more-->

## The Discovery

We were using Amazon Bedrock's Nova-Pro model for our code analysis service. It's a powerful model with a quota of 100,000 tokens per minute. Sounds good enough, right? That's what we thought too.

But here's the thing about analyzing code: it's bursty. A developer pushes 50 files, and suddenly you need to process everything now. Not in a nice, evenly distributed way that would make your rate limiter happy.

During one particularly frustrating debugging session, I temporarily switched to a "lesser" model (Llama-3) while debugging what I thought was an issue with Nova-Pro. And then something interesting happened: our overall throughput went up.

## The Math

My current quotas:

```
Nova-Pro: 100,000 tokens/minute
Llama-3: 60,000 tokens/minute
```

But it wasn't just about raw numbers. The real magic happened when we started treating these models as complementary resources rather than primary/backup options.


## The Conventional Wisdom (That We Ignored)

Traditional wisdom says:

1. Pick the best model for your use case
2. Optimize your usage of that model
3. Implement proper rate limiting
4. *Maybe* have a backup model for failover

We threw that out the window. Instead, we:

1. Use both models simultaneously
2. Route larger batches to Nova-Pro
3. Send smaller batches to Llama-3
4. Let them handle rate limits independently

## Why This Shouldn't Work (But Does)

The obvious objection is cost. Why pay for two models when you could optimize one? But here's where it gets interesting:

1. **Rate limits are not linear**: When you hit a rate limit, you don't just lose the excess capacity - you often lose entire batches of work that need to be retried.
2. **Context switching is expensive**: Every time you hit a rate limit and have to retry later, you're losing context. With two models, you maintain momentum.
3. **Different models, different strengths**: What we found was that Llama-3 actually performed better on smaller, simpler files, while Nova-Pro excelled at complex, interrelated code analysis.

## The Implementation

Here's the interesting part. Instead of complex rate limiting logic, we built a simple model alternation strategy:

1. Route larger batches to Nova-Pro
2. Send smaller batches to Llama-3
3. Let them handle rate limits independently

Here's some pseudocode to illustrate the idea:

```javascript
// Model-specific quotas and characteristics
const MODEL_QUOTAS = {
  'nova-pro': {
    tokensPerMinute: 100_000,
    maxKbPerBatch: 350,  // Conservative limit for large, complex batches
  },
  'llama-3': {
    tokensPerMinute: 60_000,
    maxKbPerBatch: 200,  // Better for smaller, simpler batches
  }
} as const;

/**
 * Pre-assigns models to groups based on their characteristics
 * Returns batches with their assigned models
 */
function createModelAwareBatches(fileGroups: FileGroup[]): { model: ModelId, batch: FileGroup[] }[] {
  // First, analyze and assign optimal models for each group
  const groupsWithModels = fileGroups.map(group => ({
    group,
    // Assign model based on group characteristics
    model: selectModelForGroup(group)
  }));

  // Create batches respecting each model's size limits
  const batches: { model: ModelId, batch: FileGroup[] }[] = [];
  let currentBatch: FileGroup[] = [];
  let currentModel: ModelId | null = null;
  let currentBatchSize = 0;

  groupsWithModels.forEach(({ group, model }) => {
    const groupSizeKb = group.totalSize / 1024;

    // Start new batch if:
    // 1. Is first batch
    // 2. Different model than current batch
    // 3. Would exceed model's size limit
    if (
      currentModel === null ||
      model !== currentModel ||
      currentBatchSize + groupSizeKb > MODEL_QUOTAS[model].maxKbPerBatch
    ) {
      if (currentBatch.length > 0) {
        batches.push({
          model: currentModel,
          batch: currentBatch
        });
      }
      currentBatch = [group];
      currentModel = model;
      currentBatchSize = groupSizeKb;
    } else {
      currentBatch.push(group);
      currentBatchSize += groupSizeKb;
    }
  });

  // Add the last batch
  if (currentBatch.length > 0 && currentModel) {
    batches.push({
      model: currentModel,
      batch: currentBatch
    });
  }

  return batches;
}

/**
 * Selects optimal model based on group characteristics
 * Complex groups -> Nova Pro
 * Simple groups -> Llama-3
 */
function selectModelForGroup(group: FileGroup): ModelId {
  // Complexity factors:
  // - Number of files in group
  // - Number of imports/dependencies
  // - Size of files
  // - Type of files (e.g., test files vs core logic)
  
  const COMPLEXITY_THRESHOLD = 0.7;  // Normalized complexity score threshold
  
  // Higher score = more complex
  const complexityScore = calculateComplexityScore(group);
  
  return complexityScore > COMPLEXITY_THRESHOLD ? 'nova-pro' : 'llama-3';
}

/**
 * Calculates normalized complexity score (0-1) based on group characteristics
 */
function calculateComplexityScore(group: FileGroup): number {
  // Size factor: Larger groups are more complex
  const sizeFactor = Math.min(group.totalSize / (20 * 1024), 1);  // Cap at 20KB
  
  // Dependency factor: More dependencies = more complex
  const dependencyFactor = group.complexity;  // Already normalized 0-1
  
  // File count factor: More files = more complex relationships
  const fileCountFactor = Math.min(group.files.length / 10, 1);  // Cap at 10 files
  
  // Weighted average of factors
  return (
    sizeFactor * 0.3 +
    dependencyFactor * 0.5 +
    fileCountFactor * 0.2
  );
}

/**
 * Process batches with assigned models, handling rate limits by switching models
 */
async function processBatches(batches: { model: ModelId, batch: FileGroup[] }[]): Promise<Result[]> {
  const results: Result[] = [];

  for (const { model, batch } of batches) {
    try {
      // Try with assigned model first
      const result = await processWithModel(batch, model);
      results.push(result);
    } catch (error) {
      if (isRateLimitError(error)) {
        // On rate limit, try alternate model
        const alternateModel: ModelId = model === 'nova-pro' ? 'llama-3' : 'nova-pro';
        try {
          const result = await processWithModel(batch, alternateModel);
          results.push(result);
        } catch (alternateError) {
          // If both models fail, let error handling middleware deal with it
          throw alternateError;
        }
      } else {
        throw error;  // Non-rate-limit errors are handled by middleware
      }
    }
  }

  return results;
}
```

The results were pretty good:

* ~1.8x throughput improvement
* 40% reduction in rate limit errors
* More consistent performance under load
* Most importantly, faster results == **happier developers**

## Why This Matters Now

As AI services become more central to our applications, we need to start thinking differently about capacity and redundancy. The old patterns of primary/backup and single-model optimization might not be the best approach anymore.

## The Trade-offs

Let's be honest about the downsides:

* Higher potential costs
* More complex routing logic
* Potentially inconsistent results between models
* Additional monitoring requirements

But in our case, the benefits far outweighed these costs.

## Looking Forward

This accidental discovery has changed how we think about AI service architecture. Instead of asking "which model is best?", we're now asking "how can different models work together?"

The future might not be about finding the perfect model, but about orchestrating multiple models effectively.

What do you think? Have you tried similar approaches? I'd love to hear about your experiences with AI service architecture.
