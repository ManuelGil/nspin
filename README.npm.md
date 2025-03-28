# nspin

[![NPM Version](https://img.shields.io/npm/v/nspin?style=for-the-badge&logo=npm)](https://www.npmjs.com/package/nspin)
[![NPM Downloads](https://img.shields.io/npm/dt/nspin?style=for-the-badge&logo=npm)](https://www.npmjs.com/package/nspin)

## Overview

**nspin** is a lightweight and efficient Node.js spinner package built using native Node.js features for optimal performance. Designed for Node.js v22+ environments, it offers a simple, intuitive, and dependency-free API to create and manage spinner animations in your applications.

![nspin](https://raw.githubusercontent.com/ManuelGil/nspin/main/assets/nspin.gif)

## Requirements

- **Node.js 22+**: Leverages modern APIs such as `styleText` from `node:util` and `performance.now()`.
- No external dependencies, ensuring a minimal installation footprint.

## Key Features

- **Modern & Native**: Utilizes advanced Node.js features for high performance.
- **Chainable API**: Easily start, update, and stop the spinner with a fluent interface.
- **Dynamic Frames**: Change spinner animation frames on the fly using `updateFrames()`.
- **Multiple Spinner Support**: Run concurrent spinners without interference.
- **Adaptive Output**: Adjusts automatically for TTY and non-TTY environments.
- **Customizable Positioning**: Configure spinner placement (left or right of the message).

## Installation

Install **nspin** via npm:

```bash
npm install nspin
```

## Quick Usage

Below is a basic example that demonstrates spinner initialization, dynamic text updates, and stopping the spinner.

```typescript
import { Spinner } from "nspin";

// Define spinner frames (simple rotation)
const simpleRotation = ["|", "/", "-", "\\"];

// Initialize and start the spinner
const spinner = new Spinner({
  frames: simpleRotation,
  interval: 100
}).start("Loading...");

// Stop the spinner after 3 seconds with a final message
setTimeout(() => {
  spinner.stop("Done!");
}, 3000);
```

## API Overview

- **`new Spinner(options)`**
  Create a new spinner instance with options:
  - `frames`: Array of spinner frames (e.g., `["|", "/", "-", "\\"]`).
  - `interval`: Time between frames in milliseconds (default is 80).
  - `format`: Style options (passed to `styleText`).
  - `position`: Spinner position relative to the text (`'left'` or `'right'`).

- **Instance Methods**:
  - `start(text?: string)`: Starts the spinner with an optional initial message.
  - `updateText(newText: string)`: Updates the spinner’s message in real time.
  - `updateFrames(newFrames: string[])`: Dynamically updates the spinner frames.
  - `stop(finalText?: string)`: Stops the spinner and displays the final message.

## Additional Information

- **Error Handling & Non-TTY Environments**:
  **nspin** degrades gracefully in non-TTY environments. When running in such environments, the spinner will output plain text to ensure readability.

- **Performance Optimized**:
  Built with performance in mind, **nspin** minimizes overhead and maximizes responsiveness using native Node.js capabilities.

- **Extensibility & Maintenance**:
  The library is designed following SOLID principles, making it both easy to extend and maintain.

## Documentation & Support

For comprehensive documentation including detailed examples, API references, and contribution guidelines, please visit the [GitHub repository](https://github.com/ManuelGil/nspin).

If you encounter any issues or have suggestions, feel free to [open an issue](https://github.com/ManuelGil/nspin/issues) on GitHub.

---

*This README for npm is a simplified version. For the complete documentation, including all examples and in-depth API details, please refer to the full README on GitHub.*
