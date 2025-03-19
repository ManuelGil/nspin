# nspin

[![NPM Version](https://img.shields.io/npm/v/nspin?style=for-the-badge&logo=npm)](https://www.npmjs.com/package/nspin)
[![NPM Downloads](https://img.shields.io/npm/dt/nspin?style=for-the-badge&logo=npm)](https://www.npmjs.com/package/nspin)
[![GitHub Repo Stars](https://img.shields.io/github/stars/ManuelGil/nspin?style=for-the-badge&logo=github)](https://github.com/ManuelGil/nspin)
[![GitHub License](https://img.shields.io/github/license/ManuelGil/nspin?style=for-the-badge&logo=github)](https://github.com/ManuelGil/nspin/blob/main/LICENSE)

## Overview

**nspin** is a lightweight and efficient Node.js spinner package built entirely with native features for optimal performance. Designed with modern Node.js (v22+) in mind, **nspin** provides a simple, intuitive, and dependency-free API for creating and managing spinner animations in your applications.

![nspin](https://raw.githubusercontent.com/ManuelGil/nspin/main/assets/nspin.gif)

## Why Choose nspin?

- **Modern & Native:**
  Built using the latest native APIs (e.g., `styleText` from `node:util`, `performance.now`, and advanced console manipulation), **nspin** ensures maximum performance and reliability.

- **Requires Node.js 22+:**
  By leveraging Node.js v22+ features, **nspin** guarantees full compatibility with the most modern and performant versions of Node.js. This modern baseline also means fewer dependencies and a smaller footprint.

- **Zero Dependencies:**
  Unlike many spinner libraries that rely on external packages (like `chalk` or `ora`), **nspin** is completely dependency-free, ensuring a lightweight installation and reducing potential security vulnerabilities.

- **Clean & Modular API:**
  Following SOLID principles, **nspin** offers a chainable and easy-to-use API that simplifies spinner management, including support for multiple concurrent spinners.

## Requirements

**nspin** requires Node.js version **22 or higher**. This requirement ensures the use of modern APIs, such as:

- `styleText` from `node:util` for elegant text styling without manual ANSI escape codes.
- `performance.now()` for high-resolution timing.
- Native console methods for precise cursor control and output management.

## Features

- **Lightweight & Efficient:**
  Uses native Node.js features to deliver high performance with minimal overhead.

- **Native Styling:**
  Utilizes the modern `styleText` API from `node:util` for styling spinner frames, eliminating the need for manual ANSI escape codes.

- **Chainable API:**
  Methods like `start`, `updateText`, and `stop` return the spinner instance for a fluent coding experience.

- **Multiple Spinner Support:**
  Easily manage multiple concurrent spinners without interference.

- **Modular & Extensible:**
  Designed following SOLID principles for clean, maintainable, and extendable code.

## Installation

Install the package using npm:

```bash
npm install nspin
```

## Usage

Below are some examples to help you get started.

### Basic Usage

```typescript
import { Spinner } from 'nspin';

const spinner = new Spinner({
  frames: ['-', '\\', '|', '/'],
  interval: 100,
});

spinner.start('Processing...');

setTimeout(() => {
  spinner.stop('✅ Done!');
}, 3000);
```

### Custom Format

```typescript
import { Spinner } from 'nspin';

const spinner = new Spinner({
  frames: ['◐', '◓', '◑', '◒'],
  interval: 120,
  format: ['cyan', 'bold'],
});

spinner.start('Loading styled spinner...');

setTimeout(() => {
  spinner.stop('🎨 Styled complete!');
}, 4000);
```

### Multiple Spinners

```typescript
import { Spinner } from 'nspin';

const spinner1 = new Spinner({ frames: ['-', '\\', '|', '/'], interval: 100 });
const spinner2 = new Spinner({ frames: ['⠋', '⠙', '⠹', '⠸'], interval: 150 });

spinner1.start('Downloading file 1...');
spinner2.start('Downloading file 2...');

setTimeout(() => {
  spinner1.stop('✅ File 1 downloaded!');
}, 3000);

setTimeout(() => {
  spinner2.stop('✅ File 2 downloaded!');
}, 5000);
```

### Long Task with Updates

```typescript
import { Spinner } from 'nspin';

const spinner = new Spinner({ frames: ['◴', '◷', '◶', '◵'], interval: 100 });

spinner.start('Starting long task...');

let progress = 0;
const interval = setInterval(() => {
  progress += 10;
  spinner.updateText(`Processing... ${progress}%`);

  if (progress >= 100) {
    clearInterval(interval);
    spinner.stop('✅ Task completed!');
  }
}, 500);
```

## API Reference

### Spinner

- **`new Spinner(options: SpinnerOptions): Spinner`**
  Create a new spinner instance.

  - **options.frames:** Array of spinner frames (e.g., `['-', '\\', '|', '/']`).
  - **options.interval (optional):** Animation interval in milliseconds (default is 80).
  - **options.format (optional):** Format options passed to `styleText` for styling the spinner.

- **`start(text?: string): this`**
  Starts the spinner animation with an optional initial message.

- **`updateText(newText: string): this`**
  Updates the text displayed next to the spinner.

- **`stop(finalText?: string): this`**
  Stops the spinner and displays the final message.

For complete type details, see the [SpinnerOptions](./docs/SPINNER_OPTIONS.md) and [FormatOptions](./docs/FORMAT_OPTIONS.md).

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

We strive to create a welcoming and respectful community. Please review our [Code of Conduct](./docs/CODE_OF_CONDUCT.md) before contributing.

## Changelog

See the [CHANGELOG.md](./CHANGELOG.md) for a complete list of changes.

## License

This package is licensed under the [MIT License](https://opensource.org/licenses/MIT).
