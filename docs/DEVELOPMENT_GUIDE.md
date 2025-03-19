# DEVELOPMENT_GUIDE.md

Welcome to the **nspin** development guide. This document provides detailed instructions for setting up the development environment, building, testing, debugging, and contributing to the project.

---

## Index

- [DEVELOPMENT_GUIDE.md](#development_guidemd)
  - [Index](#index)
  - [Prerequisites](#prerequisites)
  - [Environment Setup](#environment-setup)
  - [Project Structure](#project-structure)
  - [Building the Project](#building-the-project)
  - [Running Tests](#running-tests)
  - [Debugging and Linting](#debugging-and-linting)
  - [Development Workflow](#development-workflow)
  - [Contributing Guidelines](#contributing-guidelines)
  - [Additional Resources](#additional-resources)

---

## Prerequisites

- **Node.js v22+**: The project leverages modern Node.js features, such as `styleText` from `node:util` and `performance.now()`, which require Node.js version 22 or later.
- **npm v9+**: Recommended for proper dependency handling.
- **Git**: For version control.
- **Code Editor**: Visual Studio Code or any preferred editor with TypeScript support.
- **Familiarity with TypeScript**: Since **nspin** is written in TypeScript.

---

## Environment Setup

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/ManuelGil/nspin.git
   cd nspin
   ```

2. **Install Dependencies:**

   ```bash
   npm install
   ```

3. **Configure Your Editor:**

   - For VSCode, ensure that the built-in TypeScript version is set to the workspace version.
   - Install recommended extensions like ESLint and Prettier for code formatting and linting.

---

## Project Structure

```plaintext
nspin/
├── examples/              # Example usage scripts
├── src/                   # Source code
│   ├── helpers/           # Utility functions (e.g., console handling)
│   ├── types/             # Type definitions (SpinnerOptions, FormatOptions, etc.)
│   └── index.ts           # Main entry point (Spinner class and exports)
├── test/                  # Unit tests
├── CHANGELOG.md           # Changelog file
├── README.md              # General project description
├── CONTRIBUTING.md        # Contribution guidelines
├── CODE_OF_CONDUCT.md     # Code of conduct
├── LICENSE                # License file
├── tsconfig.json          # TypeScript configuration
└── tsup.config.ts         # Build configuration
```

Review the [FOLDER_STRUCTURE.md](./FOLDER_STRUCTURE.md) for further details.

---

## Building the Project

To build the project, run:

```bash
npm run build
```

This command uses [tsup](https://tsup.egoist.dev/) to bundle the project in both ESM and CommonJS formats, generate type declarations, and create sourcemaps.

---

## Running Tests

The project uses Vitest for unit testing. To run the tests, execute:

```bash
npm run test
```

Ensure that all tests pass before creating a pull request.

---

## Debugging and Linting

- **Debugging:**

  - Use your IDE’s debugging tools (e.g., VSCode Debugger) to set breakpoints and inspect variables.
  - For command-line debugging, you can add `console.log` or `debugger` statements as needed.

- **Linting & Formatting:**

  - **Linting:** Run the linter with:

    ```bash
    npm run lint
    ```

  - **Formatting:** Format your code using Prettier:

    ```bash
    npm run format
    ```

---

## Development Workflow

- **Branching:**
  Create feature branches for new functionality or bug fixes.

- **Commits:**
  Follow Conventional Commits guidelines for clear, consistent commit messages.

- **Pull Requests:**
  Submit pull requests against the `develop` branch with detailed descriptions of your changes.

- **Code Reviews:**
  Expect constructive feedback; adhere to the [CONTRIBUTING.md](./CONTRIBUTING.md) guidelines.

---

## Contributing Guidelines

Before starting work, please read the [CONTRIBUTING.md](./CONTRIBUTING.md) for detailed instructions on how to contribute, report issues, and submit pull requests.

---

## Additional Resources

- **API Reference:** [API_REFERENCE.md](./API_REFERENCE.md)
- **Testing Guidelines:** [TESTING.md](./TESTING.md)
- **GitHub Issues:** [nspin Issues](https://github.com/ManuelGil/nspin/issues)

---

Happy coding and thank you for contributing to **nspin**!
