import type { FormatOptions } from '.';

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
}
