import type { BackgroundColors, ForegroundColors, Modifiers } from './index.js';

/**
 * FormatOptions: The format options.
 * The format options are used to change the style of the text in the console.
 *
 * @type {string}
 * @public
 * @example
 * const color: FormatOptions = 'bold';
 * console.log(color);
 *
 * @returns {string} - The format option
 */
export type FormatOptions =
  | ForegroundColors
  | BackgroundColors
  | Modifiers
  | Array<ForegroundColors | BackgroundColors | Modifiers>;
