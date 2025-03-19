# FormatOptions Documentation

The `FormatOptions` type defines the allowed formatting options for styling spinner frames using Node.js's `styleText` function. It enables you to apply colors and text modifiers to enhance the visual appearance of your spinner. The type is defined as a union of:

- **ForegroundColors**
- **BackgroundColors**
- **Modifiers**
- Or an array containing any combination of the above

This design provides flexibility, allowing you to specify a single formatting option or multiple options at once.

## Available Options

### Foreground Colors

These options allow you to set the text (foreground) color. The available foreground colors are:

- `black`
- `blackBright`
- `blue`
- `blueBright`
- `cyan`
- `cyanBright`
- `gray`
- `green`
- `greenBright`
- `grey`
- `magenta`
- `magentaBright`
- `red`
- `redBright`
- `white`
- `whiteBright`
- `yellow`
- `yellowBright`

### Background Colors

These options allow you to set the background color of the text. The available background colors are:

- `bgBlack`
- `bgBlackBright`
- `bgBlue`
- `bgBlueBright`
- `bgCyan`
- `bgCyanBright`
- `bgGray`
- `bgGreen`
- `bgGreenBright`
- `bgGrey`
- `bgMagenta`
- `bgMagentaBright`
- `bgRed`
- `bgRedBright`
- `bgWhite`
- `bgWhiteBright`
- `bgYellow`
- `bgYellowBright`

### Modifiers

Modifiers provide additional styling effects such as emphasis or decoration. The available modifiers are:

- `blink`
- `bold`
- `dim`
- `doubleunderline`
- `framed`
- `hidden`
- `inverse`
- `italic`
- `overlined`
- `reset`
- `strikethrough`
- `underline`

## Usage Examples

### Single Option

You can pass a single formatting option as a string:

```typescript
import type { FormatOptions } from 'nspin';

const singleOption: FormatOptions = 'cyan'; // Applies a cyan foreground color.
```

### Multiple Options

You can also pass multiple formatting options as an array to combine different styles:

```typescript
import type { FormatOptions } from 'nspin';

const multipleOptions: FormatOptions = ['bold', 'bgBlue']; // Applies bold text with a blue background.
```

## Integration in Spinner

The `format` property of the `SpinnerOptions` interface accepts a `FormatOptions` value. This allows you to customize the appearance of the spinner frames:

```typescript
import { Spinner } from 'nspin';

const spinner = new Spinner({
  frames: ['◐', '◓', '◑', '◒'],
  interval: 100,
  format: ['italic', 'magentaBright'], // Combines italic style with a bright magenta foreground.
});

spinner.start('Loading styled spinner...');
```
