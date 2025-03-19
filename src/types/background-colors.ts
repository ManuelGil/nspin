/**
 * BackgroundColors: The background colors.
 * The background colors are used to change the background color of the text in the console.
 *
 * @type {string}
 * @public
 * @export
 * @example
 * const color: BackgroundColors = 'bgBlack';
 * console.log(color);
 *
 * @returns {string} - The background color
 *
 * @see {@link https://nodejs.org/docs/latest/api/util.html#background-colors|Background colors}
 */
export type BackgroundColors =
  | 'bgBlack'
  | 'bgBlackBright'
  | 'bgBlue'
  | 'bgBlueBright'
  | 'bgCyan'
  | 'bgCyanBright'
  | 'bgGray'
  | 'bgGreen'
  | 'bgGreenBright'
  | 'bgGrey'
  | 'bgMagenta'
  | 'bgMagentaBright'
  | 'bgRed'
  | 'bgRedBright'
  | 'bgWhite'
  | 'bgWhiteBright'
  | 'bgYellow'
  | 'bgYellowBright';
