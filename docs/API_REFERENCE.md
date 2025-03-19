# API_REFERENCE.md

This document provides a comprehensive overview of the public API of **nspin**, detailing the available classes, methods, and types. Use this reference as a guide when integrating **nspin** into your projects.

---

## Index

- [API_REFERENCE.md](#api_referencemd)
  - [Index](#index)
  - [Spinner Class](#spinner-class)
    - [Constructor](#constructor)
      - [Parameters:](#parameters)
      - [Example:](#example)
    - [Public Methods](#public-methods)
      - [start(text?: string): this](#starttext-string-this)
      - [Example:](#example-1)
      - [updateText(newText: string): this](#updatetextnewtext-string-this)
      - [Example:](#example-2)
      - [stop(finalText?: string): this](#stopfinaltext-string-this)
      - [Example:](#example-3)
  - [Types and Interfaces](#types-and-interfaces)
    - [SpinnerOptions](#spinneroptions)
    - [FormatOptions](#formatoptions)
  - [Usage Examples](#usage-examples)
    - [Basic Example](#basic-example)
    - [Custom Formatting Example](#custom-formatting-example)
    - [Long Task with Updates](#long-task-with-updates)

---

## Spinner Class

The `Spinner` class is the core of **nspin**. It allows you to create and manage a console spinner animation with a chainable API. It leverages modern Node.js features, such as `styleText` from `node:util` and high-resolution timing with `performance.now()`, to provide smooth and customizable animations.

### Constructor

```typescript
new Spinner(options: SpinnerOptions)
```

#### Parameters:

- **options: SpinnerOptions**
  An object that specifies the configuration of the spinner. It includes:
  - **frames:** `string[]` – An array of strings representing each frame of the spinner animation.
  - **interval:** `number` – The time interval (in milliseconds) between frame updates.
  - **format:** `FormatOptions` – Optional formatting options to style the spinner frame. These options are passed to `styleText` for styling purposes.

#### Example:

```typescript
import { Spinner } from 'nspin';

const spinner = new Spinner({
  frames: ['-', '\\', '|', '/'],
  interval: 100,
  format: 'cyan',
});
```

---

### Public Methods

#### start(text?: string): this

Starts the spinner animation with an optional initial message.

- **Parameters:**
  - **text (optional):** `string` – A message to display alongside the spinner.
- **Returns:** The `Spinner` instance (chainable).

#### Example:

```typescript
spinner.start('Processing...');
```

#### updateText(newText: string): this

Updates the text displayed next to the spinner while it is running.

- **Parameters:**
  - **newText:** `string` – The updated message to display.
- **Returns:** The `Spinner` instance (chainable).

#### Example:

```typescript
spinner.updateText('Still processing...');
```

#### stop(finalText?: string): this

Stops the spinner animation and displays a final message. This method halts the internal animation loop, unregisters the spinner, and clears the console line before outputting the final text.

- **Parameters:**
  - **finalText (optional):** `string` – The final message to display after stopping the spinner.
- **Returns:** The `Spinner` instance (chainable).

#### Example:

```typescript
spinner.stop('✅ Done!');
```

---

## Types and Interfaces

### SpinnerOptions

The `SpinnerOptions` interface defines the configuration settings for a spinner instance.

```typescript
export interface SpinnerOptions {
  frames: string[]; // Array of spinner frames
  interval: number; // Time between frame updates in milliseconds
  format: FormatOptions; // Formatting options for styling spinner frames
}
```

For more details on formatting options, see the [FormatOptions Documentation](./FORMAT_OPTIONS.md).

### FormatOptions

The `FormatOptions` type specifies the allowed formatting settings for spinner frames. This type supports:

- Foreground colors
- Background colors
- Text modifiers (e.g., bold, italic)

It can be a single formatting option or an array of options.

```typescript
export type FormatOptions =
  | ForegroundColors
  | BackgroundColors
  | Modifiers
  | Array<ForegroundColors | BackgroundColors | Modifiers>;
```

For available options, refer to the separate documentation files for foreground colors, background colors, and modifiers.

---

## Usage Examples

Below are some examples that demonstrate how to use the **nspin** API.

### Basic Example

```typescript
import { Spinner } from 'nspin';

const spinner = new Spinner({
  frames: ['-', '\\', '|', '/'],
  interval: 100,
  format: 'green',
});

spinner.start('Loading...');
setTimeout(() => {
  spinner.stop('✅ Finished!');
}, 3000);
```

### Custom Formatting Example

```typescript
import { Spinner } from 'nspin';

const spinner = new Spinner({
  frames: ['◐', '◓', '◑', '◒'],
  interval: 120,
  format: ['bold', 'blueBright'],
});

spinner.start('Custom formatting...');
setTimeout(() => {
  spinner.stop('🎨 Styled Complete!');
}, 4000);
```

### Long Task with Updates

```typescript
import { Spinner } from 'nspin';

const spinner = new Spinner({
  frames: ['◴', '◷', '◶', '◵'],
  interval: 100,
  format: 'cyan',
});

spinner.start('Starting long task...');
let progress = 0;
const interval = setInterval(() => {
  progress += 10;
  spinner.updateText(`Progress: ${progress}%`);
  if (progress >= 100) {
    clearInterval(interval);
    spinner.stop('✅ Task completed!');
  }
}, 500);
```

---

This API reference should serve as a comprehensive guide for developers integrating **nspin** into their applications. For more detailed type information, please refer to the corresponding type documentation files.
