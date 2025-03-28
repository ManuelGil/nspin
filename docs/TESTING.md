# TESTING.md

This document provides detailed instructions on how to run, write, and troubleshoot tests for **nspin**.

---

## Index

- [TESTING.md](#testingmd)
  - [Index](#index)
  - [Testing Framework](#testing-framework)
  - [Running Tests](#running-tests)
  - [Writing Tests](#writing-tests)
  - [Test Structure](#test-structure)
  - [Debugging Tests](#debugging-tests)
  - [Best Practices](#best-practices)
  - [Troubleshooting Common Test Issues](#troubleshooting-common-test-issues)
    - [1. Functions Undefined in Non-TTY Environments](#1-functions-undefined-in-non-tty-environments)
    - [2. TypeScript Compilation Issues](#2-typescript-compilation-issues)
    - [3. Environment Mismatches](#3-environment-mismatches)

---

## Testing Framework

**nspin** uses [Vitest](https://vitest.dev/) as its testing framework. Vitest provides a fast, modern testing environment with TypeScript support, making it ideal for our project.

---

## Running Tests

To run all tests, execute the following command in the project root:

```bash
npm run test
```

This command runs Vitest, which will compile the TypeScript tests and execute them. If you wish to run tests in watch mode (automatically re-run tests on file changes), you can use:

```bash
npm run test:watch
```

Make sure your environment meets the required Node.js version (v22+) to ensure proper functioning of native APIs.

---

## Writing Tests

When writing tests for **nspin**, consider the following guidelines:

- **Location:**
  All test files should be placed in the `test/` directory. Files ending in `.test.ts` will be automatically picked up by Vitest.

- **Structure:**
  Use the `describe` and `it` blocks to organize tests. For example:

  ```typescript
  import { describe, it, expect } from 'vitest';
  import { Spinner } from 'nspin';

  describe('Spinner', () => {
    it('should allow method chaining', () => {
      const spinner = new Spinner({
        frames: ['-', '\\', '|', '/'],
        interval: 100,
        format: 'cyan',
      });
      const result = spinner
        .start('Test')
        .updateText('Updated')
        .stop('Finished');
      expect(result).toBeInstanceOf(Spinner);
    });
  });
  ```

- **Mocking and Spies:**
  If necessary, use Vitest's mocking features to spy on functions (e.g., `process.stdout` methods) or simulate environments where certain functions are not available.

- **Testing Asynchronous Code:**
  Use async/await or return a promise when testing asynchronous operations, such as long-running spinner updates.

---

## Test Structure

A typical test file might include:

- **Setup:**
  Import dependencies and initialize any necessary data.

- **Test Suites:**
  Group related tests using `describe` blocks.

- **Individual Tests:**
  Each test (inside an `it` block) should be independent and cover a specific functionality or edge case.

- **Teardown:**
  Clean up any global state or mocks to avoid interference with other tests.

---

## Debugging Tests

- **Verbose Output:**
  Run tests with the `--reporter verbose` flag to see detailed test output:

  ```bash
  npx vitest run --reporter verbose
  ```

- **Using Debuggers:**
  Insert `debugger` statements in your test files or run Vitest in debug mode:

  ```bash
  node --inspect-brk ./node_modules/.bin/vitest run
  ```

  Then, attach your debugger (e.g., VSCode) to the running process.

- **Logging:**
  Use `console.log` statements within tests to output intermediate values when diagnosing issues.

---

## Best Practices

- **Isolated Tests:**
  Ensure that each test is independent and does not rely on the side effects of another test.

- **Clear Assertions:**
  Use clear and descriptive assertions to verify expected outcomes.

- **Consistent Test Data:**
  Use consistent mock data to avoid flaky tests.

- **Performance:**
  While tests should run quickly, ensure that asynchronous tests have proper timeouts if needed.

---

## Troubleshooting Common Test Issues

### 1. Functions Undefined in Non-TTY Environments

Some tests might fail because functions such as `process.stdout.clearLine` or `cursorTo` are not available. Ensure your tests check for function existence or simulate a TTY environment when necessary.

### 2. TypeScript Compilation Issues

Ensure that your `tsconfig.json` is correctly configured and that Vitest is able to pick up your TypeScript configuration. Verify that `tsup` or your build tool isn't interfering with the test runner.

### 3. Environment Mismatches

Double-check that you're running tests with Node.js v22+ to leverage native APIs required by **nspin**.

---

This document should serve as a comprehensive guide to testing **nspin**. For additional questions or assistance, please refer to the [DEVELOPMENT_GUIDE.md](./DEVELOPMENT_GUIDE.md) or open an issue in the repository.
