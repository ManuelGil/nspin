import type { FormatOptions } from './format-options';

/**
 * SpinnerOptions: The spinner options.
 * The spinner options are used to configure the spinner animation.
 *
 * @type {SpinnerOptions}
 * @public
 * @example
 * const spinnerOptions: SpinnerOptions = {
 *   frames: ['-', '\\', '|', '/'],
 *   interval: 80,
 *   format: 'cyan',
 * };
 *
 * @returns {SpinnerOptions} - The spinner options
 */
export interface SpinnerOptions {
  /**
   * Frames for the animation. It can be an array in memory.
   * The frames are displayed in sequence to create the spinner animation.
   *
   * @type {string[]}
   * @public
   * @export
   *
   * @returns {string[]} - Frames for the animation
   */
  frames: string[];

  /**
   * Animation interval in milliseconds. Default value: 80 ms.
   * The interval is the time between each frame of the spinner animation.
   *
   * @type {number}
   * @public
   * @export
   *
   * @returns {number} - Animation interval in milliseconds
   */
  interval: number;

  /**
   * Name of the color to apply to the spinner (e.g., 'cyan').
   * It can be a single color or an array of colors.
   *
   * @type {string | string[]}
   * @public
   * @export
   *
   * @returns {string | string[]} - Name of the color to apply to the spinner
   */
  format: FormatOptions;

  /**
   * The position of the spinner in relation to the text.
   * It can be 'left' or 'right'.
   *
   * @type {'left' | 'right'}
   * @public
   * @export
   *
   * @returns {'left' | 'right'} - The position of the spinner in relation to the text
   */
  position: 'left' | 'right';
}
