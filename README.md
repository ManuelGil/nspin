# nspin

[![NPM Version](https://img.shields.io/npm/v/nspin?style=for-the-badge&logo=npm)](https://www.npmjs.com/package/nspin)
[![NPM Downloads](https://img.shields.io/npm/dt/nspin?style=for-the-badge&logo=npm)](https://www.npmjs.com/package/nspin)
[![GitHub Repo Stars](https://img.shields.io/github/stars/ManuelGil/nspin?style=for-the-badge&logo=github)](https://github.com/ManuelGil/nspin)
[![GitHub License](https://img.shields.io/github/license/ManuelGil/nspin?style=for-the-badge&logo=github)](https://github.com/ManuelGil/nspin/blob/main/LICENSE)

## Overview

**nspin** is a lightweight and efficient Node.js spinner package built entirely with native features for optimal performance. Designed with modern Node.js (v22+) in mind, **nspin** provides a simple, intuitive, and dependency-free API for creating and managing spinner animations in your applications.

![nspin](https://raw.githubusercontent.com/ManuelGil/nspin/main/assets/nspin.gif)

## Index

- [nspin](#nspin)
  - [Overview](#overview)
  - [Index](#index)
  - [Why Choose nspin?](#why-choose-nspin)
  - [Requirements](#requirements)
  - [Features](#features)
  - [Installation](#installation)
  - [Usage Examples](#usage-examples)
    - [Example 1: Simple Spinner Initialization](#example-1-simple-spinner-initialization)
    - [Example 2: Spinner with Dynamic Updates](#example-2-spinner-with-dynamic-updates)
    - [Example 3: Concurrent Spinners](#example-3-concurrent-spinners)
    - [Example 4: Degraded Output in Non-TTY Environments](#example-4-degraded-output-in-non-tty-environments)
  - [API Reference](#api-reference)
    - [Spinner Class](#spinner-class)
  - [Build \& Publication](#build--publication)
  - [Development](#development)
  - [Support](#support)
  - [Feedback](#feedback)
  - [Contributing](#contributing)
  - [Code of Conduct](#code-of-conduct)
  - [Changelog](#changelog)
  - [License](#license)

## Why Choose nspin?

- **Modern & Native:**
  Built using the latest Node.js APIs (e.g., `styleText` from `node:util`, `performance.now()`, and advanced console manipulation), **nspin** ensures high performance and reliability.

- **Requires Node.js 22+:**
  Leveraging Node.js v22+ features guarantees full compatibility with the most modern versions of Node.js, reducing external dependencies and the overall footprint.

- **Zero Dependencies:**
  Unlike many spinner libraries that rely on external packages (like `chalk` or `ora`), **nspin** is completely dependency-free, ensuring a lightweight installation and enhanced security.

- **Clean & Modular API:**
  Following SOLID principles, **nspin** offers a chainable API that simplifies spinner management and supports multiple concurrent spinners.

- **Adaptive Output:**
  Automatically adjusts for both TTY and non-TTY environments, ensuring clear output regardless of the terminal's capabilities.

## Requirements

**nspin** requires Node.js version **22 or higher**. This requirement ensures access to modern features such as:

- `styleText` from `node:util` for elegant text styling without manual ANSI escape codes.
- `performance.now()` for high-resolution timing.
- Native console methods for precise cursor control.

## Features

- **Lightweight & Efficient:**
  Uses native Node.js features to achieve high performance with minimal overhead.

- **Native Styling:**
  Leverages the modern `styleText` API for styling spinner frames, eliminating manual ANSI codes.

- **Chainable API:**
  Methods like `start`, `updateText`, and `stop` return the spinner instance for fluent usage.

- **Multiple Spinner Support:**
  Easily manage several concurrent spinners without interference.

- **Modular & Extensible:**
  Designed following SOLID principles for clean, maintainable, and extendable code.

## Installation

Install **nspin** via npm:

```bash
npm install nspin
```

## Usage Examples

Below are several examples demonstrating the functionality of **nspin**.

### Example 1: Simple Spinner Initialization

A basic example that shows how to initialize and run a spinner.

```typescript
import { Spinner } from "nspin";

const spinner = new Spinner({
  frames: ["-", "\\", "|", "/"],
  interval: 100
});

spinner.start("Loading...");
setTimeout(() => {
  spinner.stop("Done!");
}, 3000);
```

### Example 2: Spinner with Dynamic Updates

This example demonstrates how to update the spinner's message in real time.

```typescript
import { Spinner } from "nspin";

const spinner = new Spinner({
  frames: ["⠋", "⠙", "⠹", "⠸"],
  interval: 80,
  format: "green"
});

spinner.start("Initializing...");

let progress = 0;
const interval = setInterval(() => {
  progress += 20;
  spinner.updateText(`Progress: ${progress}%`);
  if (progress >= 100) {
    clearInterval(interval);
    spinner.stop("Task complete!");
  }
}, 1000);
```

### Example 3: Concurrent Spinners

This example shows how to run multiple spinners at the same time to simulate parallel tasks.

```typescript
import { Spinner } from "nspin";

const spinner1 = new Spinner({ frames: ["◐", "◓", "◑", "◒"], interval: 100, format: "blue" });
const spinner2 = new Spinner({ frames: ["-", "\\", "|", "/"], interval: 120, format: "magenta" });

spinner1.start("Task 1: Downloading...");
spinner2.start("Task 2: Processing...");

setTimeout(() => {
  spinner1.stop("Task 1 complete!");
}, 4000);

setTimeout(() => {
  spinner2.stop("Task 2 complete!");
}, 5000);
```

### Example 4: Degraded Output in Non-TTY Environments

This example demonstrates how **nspin** degrades gracefully when running in a non-TTY environment.

```typescript
import { Spinner } from "nspin";

// This check simulates a non-TTY environment for demonstration purposes.
if (!process.stdout.isTTY) {
  console.log("Non-TTY mode active.");
}

const spinner = new Spinner({
  frames: ["⠋", "⠙", "⠹", "⠸"],
  interval: 100,
  format: "yellow"
});

spinner.start("Running in non-TTY mode...");
setTimeout(() => {
  spinner.stop("Finished in non-TTY mode.");
}, 3000);
```

## API Reference

### Spinner Class

- **`new Spinner(options: SpinnerOptions): Spinner`**
  Creates a new spinner instance.

  **Options:**
  - `frames`: An array of spinner frames (e.g., `["-", "\\", "|", "/"]`).
  - `interval` (optional): Time between frames in milliseconds (default is 80).
  - `format` (optional): Format options for styling the spinner (passed to `styleText`).

- **`start(text?: string): this`**
  Starts the spinner with an optional initial message.

- **`updateText(newText: string): this`**
  Updates the spinner's message in real time.

- **`stop(finalText?: string): this`**
  Stops the spinner and displays the final message.

For detailed type definitions, please refer to [SpinnerOptions](./docs/SPINNER_OPTIONS.md) and [FormatOptions](./docs/FORMAT_OPTIONS.md).

## Build & Publication

**nspin** is built using standard Node.js tools and optimized for performance. Key commands include:

- **Build:**

  ```bash
  npm run build
  ```

- **Prepublish:**
  The `prepublishOnly` script ensures a production build is generated and compressed before publishing:

  ```bash
  npm run prepublishOnly
  ```

## Development

For development, use your preferred Node.js environment along with the provided build and test scripts. Recommended commands include:

- **Build:** `npm run build`
- **Test:** `npm run test`
- **Run:** `npm start`

## Support

If you encounter any issues or have suggestions for improvements, please [open an issue](https://github.com/ManuelGil/nspin/issues) on GitHub.

## Feedback

If you enjoy using **nspin**, please consider leaving a review on [GitHub](https://github.com/ManuelGil/nspin) or sharing your feedback.

## Contributing

Contributions are welcome! To contribute:

1. Fork the [repository](https://github.com/ManuelGil/nspin).
2. Create your feature branch (`git checkout -b feature/my-new-feature`).
3. Commit your changes (`git commit -am 'Add some feature'`).
4. Push to the branch (`git push origin feature/my-new-feature`).
5. Open a pull request.

Please refer to our [Contributing Guidelines](./docs/CONTRIBUTING.md) for more details.

## Code of Conduct

We strive to create a welcoming, inclusive, and respectful community. Please review our [Code of Conduct](./docs/CODE_OF_CONDUCT.md) before contributing.

## Changelog

For a complete list of changes, see the [CHANGELOG.md](./CHANGELOG.md).

## License

This package is licensed under the [MIT License](https://opensource.org/licenses/MIT).
