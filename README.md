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
    - [Example 2: Spinner with Dynamic Message Updates](#example-2-spinner-with-dynamic-message-updates)
    - [Example 3: Concurrent Spinners](#example-3-concurrent-spinners)
    - [Example 4: Dynamic Update of Spinner Frames](#example-4-dynamic-update-of-spinner-frames)
    - [Example 5: Configuring Spinner Position](#example-5-configuring-spinner-position)
    - [Example 6: Degraded Output in Non-TTY Environments](#example-6-degraded-output-in-non-tty-environments)
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

- **Dynamic Update of Frames:**
  Change the spinner animation frames on the fly using the `updateFrames(newFrames: string[])` method.

- **Position Configuration:**
  Configure the spinner to appear either on the left (default) or right of the text via the `position` option.

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
  Methods like `start`, `updateText`, `updateFrames`, and `stop` return the spinner instance for fluent usage.

- **Multiple Spinner Support:**
  Easily manage several concurrent spinners without interference.

- **Modular & Extensible:**
  Designed following SOLID principles for clean, maintainable, and extendable code.

- **Dynamic Update of Frames:**
  Change the spinner animation frames on the fly using `updateFrames(newFrames: string[])`.

- **Position Configuration:**
  Choose whether the spinner appears to the left or right of the message via the `position` option.

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

// Simple Rotation spinner frames
const simpleRotation = ["|", "/", "-", "\\"];

const spinner = new Spinner({
  frames: simpleRotation,
  interval: 100
});

spinner.start("Loading...");
setTimeout(() => {
  spinner.stop("Done!");
}, 3000);
```

### Example 2: Spinner with Dynamic Message Updates

This example demonstrates how to update the spinner's message in real time.

```typescript
import { Spinner } from "nspin";

// Blinking Dot spinner frames
const blinkingDot = ["   ", ".  ", ".. ", "...", " ..", "  ."];

const spinner = new Spinner({
  frames: blinkingDot,
  interval: 120,
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

// Moon Phases Spinner
export const moonPhasesSpinner = ["◐", "◓", "◑", "◒"];

// Parentheses Rotation spinner frames
const parenthesesRotation = ["(-)", "(\\)", "(|)", "(/)"];

const spinner1 = new Spinner({ frames: moonPhasesSpinner, interval: 100, format: "blue" });
const spinner2 = new Spinner({ frames: parenthesesRotation, interval: 120, format: "magenta" });

spinner1.start("Task 1: Downloading...");
spinner2.start("Task 2: Processing...");

setTimeout(() => {
  spinner1.stop("Task 1 complete!");
}, 4000);

setTimeout(() => {
  spinner2.stop("Task 2 complete!");
}, 5000);
```

### Example 4: Dynamic Update of Spinner Frames

In this example, we demonstrate how to change the spinner frames dynamically during runtime.

```typescript
import { Spinner } from "nspin";

// Bouncing Ball spinner frames
const bouncingBall = [
  "(o    )",
  "( o   )",
  "(  o  )",
  "(   o )",
  "(    o)",
  "(   o )",
  "(  o  )",
  "( o   )"
];

// Rotating Dot Spinner frames
const rotatingDotSpinner = [".", "o", "O", "o"];

const spinner = new Spinner({
  frames: bouncingBall,
  interval: 100
});
spinner.start("Task in progress...");

// Update spinner frames after 5 seconds
setTimeout(() => {
  spinner.updateFrames(rotatingDotSpinner);
  spinner.updateText("Now using a different spinner...");
}, 5000);

// Stop spinner after 10 seconds
setTimeout(() => spinner.stop("Done!"), 10000);
```

### Example 5: Configuring Spinner Position

This example shows how to configure the spinner's position relative to the text.

```typescript
import { Spinner } from "nspin";

// Progress Bar spinner frames
const progressBar = [
  "[    ]",
  "[=   ]",
  "[==  ]",
  "[=== ]",
  "[====]",
  "[ ===]",
  "[  ==]",
  "[   =]"
];

// Spinner with left alignment (default)
const spinnerLeft = new Spinner({
  frames: progressBar,
  interval: 100,
  position: 'left'
});
spinnerLeft.start("Left aligned spinner");

// Spinner with right alignment
const spinnerRight = new Spinner({
  frames: progressBar,
  interval: 100,
  position: 'right'
});
spinnerRight.start("Right aligned spinner");

// Stop both spinners after 8 seconds
setTimeout(() => {
  spinnerLeft.stop("Left spinner done");
  spinnerRight.stop("Right spinner done");
}, 8000);
```

### Example 6: Degraded Output in Non-TTY Environments

This example demonstrates how **nspin** degrades gracefully when running in a non-TTY environment.

```typescript
import { Spinner } from "nspin";

// Crosshair Spinner
const crosshairSpinner = [
  "[+]",
  "[x]",
  "[-]",
  "[x]"
];

// Simulate non-TTY mode for demonstration (in practice, this is determined by process.stdout.isTTY)
if (!process.stdout.isTTY) {
  console.log("Non-TTY mode active.");
}

const spinner = new Spinner({
  frames: parenthesesRotation,
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
  - `position` (optional): Position of the spinner relative to the text. Accepted values are `'left'` (default) or `'right'`.

- **`start(text?: string): this`**
  Starts the spinner with an optional initial message.

- **`updateText(newText: string): this`**
  Updates the spinner's message in real time.

- **`updateFrames(newFrames: string[]): this`**
  Dynamically updates the spinner frames and resets the frame counter.

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
