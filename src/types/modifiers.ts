/**
 * Modifiers: The modifiers.
 * The modifiers are used to change the style of the text in the console.
 *
 * @type {string}
 * @public
 * @example
 * const color: Modifiers = 'bold';
 * console.log(color);
 *
 * @returns {string} - The modifier
 *
 * @see {@link https://nodejs.org/docs/latest/api/util.html#modifiers|Modifiers}
 */
export type Modifiers =
  | 'blink'
  | 'bold'
  | 'dim'
  | 'doubleunderline'
  | 'framed'
  | 'hidden'
  | 'inverse'
  | 'italic'
  | 'overlined'
  | 'reset'
  | 'strikethrough'
  | 'underline';
