---
title: 'Resumable Tests Save & Load State for Jest and NodeJS'
layout: post
---

At [Metric](https://metricbooks.in/), my latest accounting AI automation startup, we've built complex interconnected pipelines that query an LLM with multiple transactions and invoices.

Of course, the entire flow from beginning to end needs to be tested. Given the manual effort of uploading files and the long wait for LLM responses, we had to automate the entire test.

In the automation, I found many cases where an initial part of the test went correctly but a latter part got stuck and errored. Retrying from start would need at least ~1-2 minutes of waiting for all the initial cases to be processed, and I could not delete the initial cases either because the latter were connected with the response from the initial tests.

So I really had only one option &mdash; figure out how to save the state of a test frequently and allow resuming the test if there's a crash.

To code this out, I broke down the problem into 2 parts:

* Making generic methods to `load` and `save` state
* Saving the state at needed parts

## State methods to `load` and `save`

I like the pattern of [Factory Functions](https://transcoding.org/javascript/factory-functions/), so I created a `_stateManager` factory function.

It took a `testCode` paramter to indicate what test is running, and created a private variable `filePath` which was used to save the state of the test.

```js
const _stateManager = (testCode) => {
  const filePath = path.join(autosaveStateDirectory, `${testCode}-state.json`)

  return {
    load: async () => {
      // load only the steps that are before loading transactions
      // i.e. transactions must always be retested
      if (
        testsSteps.indexOf(testOutput.lastStepCompleted) >
        testsSteps.indexOf('UPLOAD_INITIAL_TRANSACTIONAL_DOCUMENTS')
      )
        return false
      try {
        const rawData = await fs.readFile(filePath, 'utf8')
        const data: TestOutput = JSON.parse(rawData)
        testOutput = data
        log(`Successfully loaded state! Last step completed: ${testOutput.lastStepCompleted}`)
        return true
      } catch (e) {
        console.error(e)
        return false
      }
    },
  }
}
```

The `save` function was easy: I just had to write the state to file.

```js
save: async () => {
  await fs.writeFile(filePath, JSON.stringify(testOutput, null, 2))
  log(`Saved state after completing ${testOutput.lastStepCompleted}`)
  return true
},
```

For the `load` function, I also had to check whether the file exists or not.

```js
load: async () => {
  try {
    const rawData = await fs.readFile(filePath, 'utf8')
    const data: TestOutput = JSON.parse(rawData)
    testOutput = data
    log(`Successfully loaded state! Last step completed: ${testOutput.lastStepCompleted}`)
    return true
  } catch (e) {
    console.error(e)
    return false
  }
  },
```


## Setting up test steps

My test has a few steps like logging in, uploading documents, uploading transactions, etc. I represented those in an array

```js
let testsSteps = [
  'LOGIN',
  'CREATE_PARTIES',
  'CREATE_RULES',
  'UPLOAD_INITIAL_TRANSACTIONAL_DOCUMENTS',
  'TRANSACTIONS',
  'UPLOAD_FINAL_TRANSACTIONAL_DOCUMENTS',
]
```

Before starting any test, I instantiated the factory into a variable `stateManager`

```js
const stateManager = _stateManager(testInput.testCode)
```

## Saving the state during test

I recorded all my state in a `testOutput` object, and stored the most recent completed step in `lastStepCompleted`.

At the start of each part, I updated `stepKey` which was the same as what I used in the `testsSteps` variable above.

```js
// during the test, keep updating `testOutput` with data from the API
testOutput.parties = ...

testOutput.lastStepCompleted = stepKey
await stateManager.save()
```

Now, all that is left is to check if the specific part of the test has already loaded or not. If it has been loaded, skip that step entirely. This code should be at the very start of the test step.

```js
const stepKey = 'CREATE_PARTIES'
if (testsSteps.indexOf(testOutput.lastStepCompleted) >= testsSteps.indexOf(stepKey)) {
  log('\tSkipping create parties due to loaded state')
  return false
}
```

Optionally, you might have to "rollback" your server to the most recent step as well. This completely depends on your server so I won't include code for that, but a rollback could be as easy as deleting a few rows in your DB.

## Conclusion

For good DX during long running tests, it's important to be able to save and resume state as needed.

I came up with my own way to load and resume state, I am sure different libraries could have their own ways. But, I usually prefer writing my own code in such easy cases rather than depending on any abstractions.

With a simple factory function and a few changed lines during the tests, we were able to write a simple and easy to reason about test state manager.
