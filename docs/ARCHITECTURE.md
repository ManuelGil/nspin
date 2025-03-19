# ARCHITECTURE.md

**nspin** is a lightweight and efficient spinner library for Node.js built with modern native APIs and TypeScript. The project is designed to be modular, maintainable, and high-performing by leveraging Node.js v22+ features such as `styleText` from `node:util` and `performance.now()` from `perf_hooks`. Its output is bundled in both ESM and CommonJS formats for maximum compatibility.

---

## Index

- [ARCHITECTURE.md](#architecturemd)
  - [Index](#index)
  - [Core Components](#core-components)
    - [1. Spinner Core](#1-spinner-core)
    - [2. Types and Interfaces](#2-types-and-interfaces)
    - [3. Helpers](#3-helpers)
    - [4. Build and Bundling](#4-build-and-bundling)
    - [5. Testing](#5-testing)
  - [Design Principles](#design-principles)
  - [Data Flow and Control](#data-flow-and-control)
  - [Performance Considerations](#performance-considerations)
  - [Future Enhancements](#future-enhancements)

---

## Core Components

### 1. Spinner Core

- **Location:** `src/index.ts`
- **Description:**
  The `Spinner` class is the heart of nspin. It handles animation, text updates, and instance management.

- **Key Features:**
  - **Animation Loop:** Uses `setInterval` with high-resolution timing (`performance.now()`) to update spinner frames smoothly.
  - **Chainable API:** Methods such as `start()`, `updateText()`, and `stop()` return the instance, allowing fluent chaining.
  - **Instance Management:** Maintains an internal array of spinner instances to manage multiple concurrent spinners and proper cursor positioning.

### 2. Types and Interfaces

- **Location:** `src/types/`
- **Description:**
  All type definitions, including `SpinnerOptions` and `FormatOptions`, reside in this directory. These ensure type safety and provide clear documentation for the configuration options available to users.

- **Notable Types:**
  - **SpinnerOptions:** Defines the options required to configure a spinner instance (e.g., frames, interval, format).
  - **FormatOptions:** Specifies styling options (foreground/background colors and text modifiers) to be applied via `styleText`.

### 3. Helpers

- **Location:** `src/helpers/`
- **Description:**
  Utility functions to support core functionality. For example, the `clearLine` function safely clears the console line while checking for function availability in non-TTY environments.

### 4. Build and Bundling

- **Tool:** [tsup](https://tsup.egoist.dev/)
- **Description:**
  nspin uses tsup to bundle the project into both ESM and CommonJS modules, generate type declarations, and produce sourcemaps. This modern build system ensures that the package remains lean and easy to integrate.

### 5. Testing

- **Tool:** Vitest
- **Location:** `test/`
- **Description:**
  Unit tests cover the core functionality, including spinner behavior, chaining, and instance management. The testing framework is configured to work with the TypeScript source and output bundles.

---

## Design Principles

- **Modularity:**
  Code is organized into distinct modules (core, types, helpers) for clarity and ease of maintenance.

- **SOLID Principles:**

  - **Single Responsibility:** Each module/class has a clear, dedicated purpose.
  - **Open/Closed:** Components are designed to be extended without modifying existing code.
  - **Interface Segregation:** Well-defined type interfaces ensure consumers interact only with necessary parts.
  - **Dependency Inversion:** The design minimizes reliance on external libraries by leveraging native APIs.

- **Modern Node.js APIs:**
  Using features like `styleText` and `performance.now()`, nspin remains efficient and minimizes overhead by avoiding unnecessary dependencies.

---

## Data Flow and Control

1. **Initialization:**
   A new spinner is created by instantiating the `Spinner` class with user-defined options.

2. **Starting the Spinner:**
   Calling `start()` registers the spinner, writes an initial newline, and starts the animation loop.

3. **Rendering:**
   The private `render()` method updates the spinner frame and text, managing cursor movement to display the spinner correctly.

4. **Stopping the Spinner:**
   The `stop()` method clears the animation loop, unregisters the spinner, and displays the final message.

---

## Performance Considerations

- **Efficient Rendering:**
  High-resolution timing and conditional console manipulation ensure smooth animations with minimal CPU overhead.

- **Minimal Dependencies:**
  Relying exclusively on Node.js native APIs reduces external bloat and potential security vulnerabilities.

---

## Future Enhancements

- **Plugin Architecture:**
  Explore a plugin system to allow third-party extensions for additional spinner behaviors.

- **Extended Formatting Options:**
  Additional style customizations and dynamic theme support.

- **Improved TTY Detection:**
  Enhance handling for non-TTY environments to ensure consistent behavior across various platforms.

---

This document provides a comprehensive overview of the design and internal architecture of **nspin**, outlining its core components, design principles, d
