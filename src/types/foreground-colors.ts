/**
 * ForegroundColors: The foreground colors.
 * The foreground colors are used to change the text color in the console.
 *
 * @type {string}
 * @public
 * @example
 * const color: ForegroundColors = 'black';
 * console.log(color);
 *
 * @returns {string} - The foreground color
 *
 * @see {@link https://nodejs.org/docs/latest/api/util.html#foreground-colors|Foreground colors}
 */
export type ForegroundColors =
  | 'black'
  | 'blackBright'
  | 'blue'
  | 'blueBright'
  | 'cyan'
  | 'cyanBright'
  | 'gray'
  | 'green'
  | 'greenBright'
  | 'grey'
  | 'magenta'
  | 'magentaBright'
  | 'red'
  | 'redBright'
  | 'white'
  | 'whiteBright'
  | 'yellow'
  | 'yellowBright';
