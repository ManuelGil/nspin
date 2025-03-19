# SpinnerOptions Documentation

The `SpinnerOptions` interface defines the configuration options required to create and control a spinner instance.

## Properties

- **frames**: `string[]`
  An array of strings representing the frames of the spinner animation. Each element corresponds to a different frame that will be rendered sequentially to produce the animation effect.

- **interval**: `number`
  The time interval (in milliseconds) between frame updates. This value determines the speed at which the spinner animates.

- **format**: `FormatOptions`
  Formatting options applied to the spinner frame. These options are passed to Node.js's `styleText` function and can include a single formatting option or an array of options. This allows you to customize the appearance of the spinner (e.g., setting foreground colors, background colors, or text modifiers).

## Example

```typescript
import type { SpinnerOptions } from 'nspin';

const options: SpinnerOptions = {
  frames: ['-', '\\', '|', '/'],
  interval: 100,
  format: 'cyan', // Alternatively, use an array or other supported format options.
};
```

## Usage in Spinner

These options are used when creating a new `Spinner` instance:

```typescript
import { Spinner } from 'nspin';

const spinner = new Spinner(options);
spinner.start('Loading...');
```
