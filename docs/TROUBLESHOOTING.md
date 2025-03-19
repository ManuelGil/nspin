# TROUBLESHOOTING.md

This guide aims to help you diagnose and resolve common issues encountered when using **nspin**. Below, you'll find troubleshooting tips for various scenarios, including environment issues, API-related problems, and test failures.

---

## Index

- [TROUBLESHOOTING.md](#troubleshootingmd)
  - [Index](#index)
  - [Non-TTY Environments](#non-tty-environments)
    - [Problem:](#problem)
    - [Cause:](#cause)
    - [Solution:](#solution)
  - [Console Function Issues](#console-function-issues)
    - [Problem:](#problem-1)
    - [Cause:](#cause-1)
    - [Solution:](#solution-1)
  - [TypeScript and Build Issues](#typescript-and-build-issues)
    - [Problem:](#problem-2)
    - [Cause:](#cause-2)
    - [Solution:](#solution-2)
  - [Test Failures](#test-failures)
    - [Problem:](#problem-3)
    - [Cause:](#cause-3)
    - [Solution:](#solution-3)
  - [Performance Issues](#performance-issues)
    - [Problem:](#problem-4)
    - [Cause:](#cause-4)
    - [Solution:](#solution-4)
  - [General Debugging Tips](#general-debugging-tips)
  - [Reporting Issues](#reporting-issues)

---

## Non-TTY Environments

### Problem:

Spinner animations or cursor manipulation functions (e.g., `process.stdout.clearLine`, `cursorTo`, or `moveCursor`) are not working as expected.

### Cause:

These functions are designed for TTY (interactive terminal) environments. When running in non-TTY environments (such as CI pipelines, redirected outputs, or some testing frameworks), these functions may not be available or may behave unexpectedly.

### Solution:

- **Check for TTY:**
  Ensure you run **nspin** in a terminal that supports TTY.
- **Conditional Checks:**
  The library includes checks to ensure that these functions exist before calling them. If issues persist, you can simulate a TTY environment in tests or consider using a compatible terminal.

---

## Console Function Issues

### Problem:

Errors such as `process.stdout.clearLine is not a function` or similar appear.

### Cause:

In some testing or non-interactive environments, methods like `clearLine`, `cursorTo`, or `moveCursor` may be undefined.

### Solution:

- Update your helper functions (if modifying the library) to perform conditional checks:

  ```typescript
  export function clearLine(): void {
    if (
      typeof process.stdout.clearLine === 'function' &&
      typeof process.stdout.cursorTo === 'function'
    ) {
      process.stdout.clearLine(0);
      process.stdout.cursorTo(0);
    }
  }
  ```

- For testing purposes, you can mock these functions using your test framework (e.g., Vitest) to ensure that tests do not fail due to missing console methods.

---

## TypeScript and Build Issues

### Problem:

Compilation errors or issues with module resolution, especially when using TS loaders or bundlers.

### Cause:

Misconfiguration in the `tsconfig.json` or conflicts between build tools (like `tsup`) and test runners.

### Solution:

- **Check `tsconfig.json`:**
  Ensure that your `tsconfig.json` is correctly configured for modern ES modules and that `noEmit` is used only for development.
- **Build with tsup:**
  Use the provided `tsup.config.ts` to bundle the project, ensuring both ESM and CJS outputs are generated.
- **Test Runner Compatibility:**
  If using `ts-node` or a similar tool, run with the appropriate loader:

  ```bash
  node --loader ts-node/esm examples/basic.ts
  ```

---

## Test Failures

### Problem:

Unit tests fail unexpectedly, especially those involving spinner methods or console output.

### Cause:

- Environment differences (non-TTY issues as mentioned above).
- Timing issues in asynchronous tests.
- Side effects from global state, such as the spinner instance array.

### Solution:

- **Mock Console Functions:**
  Use spies or mocks in your test framework (e.g., Vitest) to simulate `process.stdout` methods.
- **Isolate Tests:**
  Reset global state (e.g., the spinner instance array) between tests to avoid interference.
- **Increase Timeouts:**
  For asynchronous tests, ensure that the timeout is sufficient to account for animation intervals.

---

## Performance Issues

### Problem:

Spinner animations may appear choppy or cause high CPU usage in certain environments.

### Cause:

- High animation intervals may lead to rapid updates.
- Non-optimal timing calculations.

### Solution:

- **Adjust Interval:**
  Experiment with different `interval` values to balance performance and smoothness.
- **Profile the Application:**
  Use Node.js performance tools (e.g., built-in profiler) to diagnose and optimize any performance bottlenecks.

---

## General Debugging Tips

- **Verbose Logging:**
  Add additional logging in your application to monitor spinner behavior and internal state.
- **Interactive Debugging:**
  Use debugging tools (e.g., VSCode debugger) to step through the code.
- **Documentation:**
  Refer to the [DEVELOPMENT_GUIDE.md](./DEVELOPMENT_GUIDE.md) for setup and debugging tips.

---

## Reporting Issues

If you cannot resolve your issue using this guide, please consider reporting it:

- **GitHub Issues:**
  Open an issue in the [nspin GitHub repository](https://github.com/ManuelGil/nspin/issues) with detailed information about your environment, error messages, and steps to reproduce the issue.
- **Provide Logs:**
  Include console logs or stack traces to help diagnose the problem.

---

This troubleshooting guide should help you address most common issues with **nspin**. For further assistance, please consult the project's documentation or contact the maintainers.
