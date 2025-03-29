import { styleText } from 'node:util';
import { performance } from 'node:perf_hooks';

import { clearLine } from './helpers/console';
import type { FormatOptions, SpinnerOptions } from './types';

/**
 * Spinner: The spinner class.
 * This class is used to display a spinner animation in the console.
 *
 * @public
 * @example
 * const spinner = new Spinner();
 * spinner.start('Loading...');
 * spinner.stop('Done!');
 *
 * @returns {Spinner} - The spinner instance
 */
export class Spinner {
  // --------------------------------------------------
  // Properties
  // --------------------------------------------------

  // Protected properties

  /**
   * frames: The frames for the spinner animation.
   * The frames are displayed in sequence to create the spinner animation.
   *
   * @type {string[]}
   * @protected
   * @example
   * console.log(spinner.frames);
   *
   * @returns {string} - The frames for the spinner animation
   */
  protected frames: string[];

  /**
   * interval: The interval for the spinner animation.
   * The interval is the time between each frame of the spinner animation.
   *
   * @type {number}
   * @protected
   * @example
   * console.log(spinner.interval);
   *
   * @returns {number} - The interval for the spinner animation
   */
  protected interval: number;

  /**
   * format: The format for the spinner animation.
   * The format is used to change the style of the text in the console.
   *
   * @type {FormatOptions}
   * @protected
   * @example
   * console.log(spinner.format);
   *
   * @returns {FormatOptions} - The format for the spinner animation
   */
  protected format: FormatOptions;

  /**
   * timer: The timer for the spinner animation.
   * The timer is used to control the spinner animation.
   *
   * @type {ReturnType<typeof setInterval> | null}
   * @protected
   * @example
   * console.log(spinner.timer);
   *
   * @returns {ReturnType<typeof setInterval> | null} - The timer for the spinner animation
   */
  protected timer: ReturnType<typeof setInterval> | null = null;

  /**
   * currentFrame: The current frame for the spinner animation.
   * The current frame is used to display the spinner animation.
   *
   * @type {number}
   * @protected
   * @example
   * console.log(spinner.currentFrame);
   *
   * @returns {number} - The current frame for the spinner animation
   */
  protected currentFrame: number = 0;

  /**
   * text: The text for the spinner animation.
   * The text is displayed alongside the spinner animation.
   *
   * @type {string}
   * @protected
   * @example
   * console.log(spinner.text);
   *
   * @returns {string} - The text for the spinner animation
   */
  protected text: string = '';

  /**
   * startTime: The start time for the spinner animation.
   * The start time is used to calculate the elapsed time of the spinner animation.
   *
   * @type {number}
   * @protected
   * @example
   * console.log(spinner.startTime);
   *
   * @returns {number} - The start time for the spinner animation
   */
  protected startTime: number = 0;

  /**
   * position: The position of the spinner animation.
   * The position is used to determine where the spinner animation is displayed in the console.
   *
   * @type {'left' | 'right'}
   * @protected
   * @example
   * console.log(spinner.position);
   *
   * @returns {'left' | 'right'} - The position of the spinner animation
   */
  protected position: 'left' | 'right' = 'left';

  /**
   * paused: The paused state of the spinner animation.
   * The paused state is used to determine if the spinner animation is paused.
   *
   * @type {boolean}
   * @protected
   * @example
   * console.log(spinner.paused);
   *
   * @returns {boolean} - The paused state of the spinner animation
   */
  protected paused: boolean = false;

  /**
   * spinnerInstances: The spinner instances.
   * The spinner instances are used to manage multiple spinner animations concurrently.
   *
   * @type {Spinner[]}
   * @protected
   * @example
   * console.log(Spinner.spinnerInstances);
   *
   * @returns {Spinner[]} - The spinner instances
   */
  protected static spinnerInstances: Spinner[] = [];

  // --------------------------------------------------
  // Constructor
  // --------------------------------------------------

  /**
   * Creates an instance of Spinner.
   * The constructor is used to initialize the spinner animation.
   *
   * @constructor
   * @public
   * @example
   * const spinner = new Spinner();
   * spinner.start('Loading...');
   * spinner.stop('Done!');
   *
   * @param {SpinnerOptions} options The options to customize the spinner animation.
   *
   * @returns {Spinner} - The spinner instance
   */
  constructor(options?: {
    frames: string[];
    interval?: number;
    format?: string | string[];
    position?: 'left' | 'right';
  }) {
    const {
      frames = ['-', '\\', '|', '/'],
      interval = 80,
      format,
      position = 'left',
    }: SpinnerOptions = (options as SpinnerOptions) ?? {};

    this.frames = frames;
    this.interval = interval;
    this.format = format;

    // Check if the position is valid
    if (position !== 'left' && position !== 'right') {
      this.position = 'left';
    } else {
      this.position = position;
    }
  }

  // -----------------------------------------------------------------
  // Methods
  // -----------------------------------------------------------------

  // Public methods

  /**
   * Starts the spinner animation with an initial message.
   * The spinner animation is displayed in the console.
   *
   * @public
   * @example
   * spinner.start('Loading...');
   *
   * @param {string} text Message to display alongside the spinner.
   *
   * @returns The Spinner instance for chaining.
   */
  public start(text: string = ''): this {
    this.text = text;
    this.startTime = performance.now();

    // Register this instance for concurrent management.
    Spinner.spinnerInstances.push(this);

    // Print a new line to assign its position in the console.
    process.stdout.write('\n');

    this.timer = setInterval(() => this.render(), this.interval);

    process.on('exit', this.cleanup);

    return this;
  }

  /**
   * Pauses the spinner animation without resetting its state.
   * It clears the current timer and marks the spinner as paused.
   *
   * @public
   * @example
   * spinner.pause();
   *
   * @returns The Spinner instance for chaining.
   */
  public pause(): this {
    if (!this.paused && this.timer) {
      clearInterval(this.timer);
      this.timer = null;
      this.paused = true;
    }

    return this;
  }

  /**
   * Resumes the spinner animation if it was paused.
   * It restarts the interval using the preserved state.
   *
   * @public
   * @example
   * spinner.resume();
   *
   * @returns The Spinner instance for chaining.
   */
  public resume(): this {
    if (this.paused) {
      // Restart the render interval without modifying currentFrame or startTime.
      this.timer = setInterval(() => this.render(), this.interval);
      this.paused = false;
    }

    return this;
  }

  /**
   * Restarts the spinner animation using the current configuration.
   * It stops the current animation and starts a new one with the same text.
   *
   * @public
   * @example
   * spinner.restart();
   *
   * @returns The Spinner instance for chaining.
   */
  public restart(): this {
    this.stop();

    // Reset currentFrame to ensure restart from the beginning.
    this.currentFrame = 0;

    return this.start(this.text);
  }

  /**
   * Dynamically updates the spinner frames and resets the frame counter.
   * The new frames are used for the spinner animation.
   *
   * @public
   * @example
   * spinner.updateFrames(['-', '\\', '|', '/']);
   *
   * @param {string[]} newFrames An array of new frames to use for the spinner animation.

  * @returns The Spinner instance for chaining.
   */
  public updateFrames(newFrames: string[]): this {
    // Update the spinner frames with the new array
    this.frames = newFrames;
    // Reset currentFrame index to 0 so the new frames start from the beginning
    this.currentFrame = 0;
    return this;
  }

  /**
   * Updates the text displayed next to the spinner.
   * The new message is displayed alongside the spinner animation.
   *
   * @public
   * @example
   * spinner.updateText('Loading...');
   *
   * @param {string} newText The new message to display.
   *
   * @returns The Spinner instance for chaining.
   */
  public updateText(newText: string): this {
    this.text = newText;

    return this;
  }

  /**
   * Stops the spinner animation and displays the final message.
   * The final message is displayed in the console.
   *
   * @public
   * @example
   * spinner.stop('Done!');
   *
   * @param {string} finalText Final message to display.
   *
   * @returns The Spinner instance for chaining.
   */
  public stop(finalText: string = ''): this {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }

    // Check if the environment is TTY
    if (process.stdout.isTTY) {
      this.render(finalText);
      // Clear the current line after rendering in TTY
      clearLine();
    } else {
      // In non-TTY, simply print the final message with a new line.
      process.stdout.write(finalText + '\n');
    }

    // Remove this instance from the active spinners array.
    Spinner.spinnerInstances = Spinner.spinnerInstances.filter(
      (s) => s !== this,
    );

    process.off('exit', this.cleanup);

    return this;
  }

  /**
   * Returns the current interval (in milliseconds) of the spinner.
   * This method is used to retrieve the interval set for the spinner animation.
   *
   * @public
   * @example
   * const interval = spinner.getInterval();
   *
   * @returns {number} The current interval in milliseconds.
   */
  public getInterval(): number {
    return this.interval;
  }

  /**
   * Gets the index of the current frame.
   * This method is used to retrieve the current frame index of the spinner animation.
   *
   * @public
   * @example
   * const currentFrame = spinner.getCurrentFrame();
   *
   * @returns The current frame index.
   */
  public getCurrentFrame(): number {
    return this.currentFrame;
  }

  /**
   * Sets a new interval for the spinner and resets the timer if active.
   * This method is used to change the interval of the spinner animation.
   *
   * @public
   * @example
   * spinner.setInterval(100);
   *
   * @param newInterval The new interval in milliseconds.
   *
   * @returns The Spinner instance for chaining.
   */
  public setInterval(newInterval: number): this {
    this.interval = newInterval;

    if (this.timer) {
      clearInterval(this.timer);
      this.timer = setInterval(() => this.render(), this.interval);
    }

    return this;
  }

  /**
   * Gets the elapsed time since the spinner started.
   * This method is used to retrieve the elapsed time of the spinner animation.
   *
   * @public
   * @example
   * const elapsedTime = spinner.getElapsedTime();
   *
   * @returns The elapsed time in milliseconds.
   */
  public getElapsedTime(): number {
    return Math.floor(performance.now() - this.startTime);
  }

  /**
   * Gets the identifier of the current timer interval.
   * This method is used to retrieve the timer identifier of the spinner animation.
   *
   * @public
   * @example
   * const timerId = spinner.getTimerId();
   *
   * @returns The timer identifier or null if not active.
   */
  public getTimerId(): ReturnType<typeof setInterval> | null {
    return this.timer;
  }

  // protected methods

  /**
   * Renders the spinner line at its designated position.
   * The spinner line is displayed in the console.
   *
   * @protected
   * @example
   * spinner.render();
   *
   * @param {string} [finalText] If provided, displays this text instead of the animated spinner.
   *
   * @returns void - Nothing
   */
  protected render(finalText?: string): void {
    // For non-TTY environments, output degrades gracefully.
    if (!process.stdout.isTTY) {
      if (finalText !== undefined) {
        process.stdout.write(finalText + '\n');
      } else {
        const frame = this.frames[this.currentFrame];

        this.currentFrame = (this.currentFrame + 1) % this.frames.length;

        const elapsed = Math.floor(performance.now() - this.startTime);
        // In non-TTY, simply output text then frame
        process.stdout.write(`${this.text} ${frame} (${elapsed}ms)\n`);
      }
      return;
    }

    const index = Spinner.spinnerInstances.indexOf(this);

    if (index === -1) return;

    // Cache stdout methods to reduce repeated lookups
    const moveCursor = process.stdout.moveCursor;

    if (typeof moveCursor === 'function') {
      moveCursor.call(
        process.stdout,
        0,
        -(Spinner.spinnerInstances.length - index),
      );
    }

    if (typeof process.stdout.cursorTo === 'function') {
      process.stdout.cursorTo(0);
    }

    clearLine();

    let output: string;

    if (finalText !== undefined) {
      output = finalText;
    } else {
      let frame = this.frames[this.currentFrame];

      this.currentFrame = (this.currentFrame + 1) % this.frames.length;

      if (this.format) {
        frame = styleText(this.format, frame);
      }

      // Compute elapsed time only once
      const elapsed = Math.floor(performance.now() - this.startTime);

      // Modify output based on position: 'right' shows text first, then spinner frame.
      output =
        this.position === 'right'
          ? `${this.text} ${frame} (${elapsed}ms)`
          : `${frame} ${this.text} (${elapsed}ms)`;
    }

    process.stdout.write(output);

    // Restore the cursor position using the cached method.
    if (typeof moveCursor === 'function') {
      moveCursor.call(
        process.stdout,
        0,
        Spinner.spinnerInstances.length - index,
      );
    }
  }

  /**
   * Cleanup function to clear the spinner on process exit.
   * The cleanup function is used to remove the spinner animation from the console.
   *
   * @protected
   * @example
   * spinner.cleanup();
   *
   * @returns void - Nothing
   */
  protected cleanup = (): void => {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }

    clearLine();
  };
}
