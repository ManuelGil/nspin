import { performance } from 'node:perf_hooks';
import { styleText } from 'node:util';

import { clearLine } from './helpers/console.js';
import type { FormatOptions, SpinnerOptions } from './types/index.js';

/**
 * Spinner: Class to display a spinner animation in the console.
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
   * Array of frames used for the spinner animation.
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
   * Interval (in ms) between each frame.
   * This controls the speed of the spinner animation.
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
   * Format options for styling the spinner output.
   * This can be a string or an array of strings.
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
   * Timer handle returned by setInterval.
   * This is used to control the spinner animation.
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
   * Index of the current frame in the frames array.
   * This is used to keep track of which frame to display next.
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
   * Text displayed alongside the spinner.
   * This can be a message or status update.
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
   * Timestamp when the spinner was started.
   * This is used to calculate elapsed time.
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
   * Position of the spinner relative to the text ('left' or 'right').
   * This determines where the spinner appears in relation to the text.
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
   * Flag indicating whether the spinner is paused.
   * This is used to control the spinner state.
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
   * Array that holds all active Spinner instances for global management.
   * This is used to manage multiple spinner instances and ensure proper cleanup.
   *
   * @type {Spinner[]}
   * @protected
   * @example
   * console.log(Spinner.spinnerInstances);
   *
   * @returns {Spinner[]} - The spinner instances
   */
  protected static spinnerInstances: Spinner[] = [];

  /**
   * Flag to ensure the exit listener is registered only once.
   * This prevents multiple registrations of the same listener.
   *
   * @type {boolean}
   * @protected
   * @example
   * console.log(Spinner.exitListenerRegistered);
   *
   * @returns {boolean} - The exit listener registration state
   */
  protected static exitListenerRegistered: boolean = false;

  // --------------------------------------------------
  // Constructor
  // --------------------------------------------------

  /**
   * Creates an instance of Spinner.
   * This constructor initializes the spinner with default or user-defined options.
   *
   * @constructor
   * @public
   * @example
   * const spinner = new Spinner({});
   * spinner.start('Loading...');
   * spinner.stop('Done!');
   *
   * @param {object} [options] Spinner options.
   * @param {string[]} [options.frames] Array of frames for the spinner animation.
   * @param {number} [options.interval] Interval between frames in milliseconds.
   * @param {string | string[]} [options.format] Format options for styling.
   * @param {'left' | 'right'} [options.position] Position of spinner relative to text.
   *
   * @returns {Spinner} - The spinner instance
   */
  constructor(options?: {
    frames?: string[];
    interval?: number;
    format?: string | string[];
    position?: 'left' | 'right';
  }) {
    // Validate and normalize options using a centralized method.
    const normalizedOptions = Spinner.normalizeOptions(
      options as SpinnerOptions,
    );
    const { frames, interval, format, position } = normalizedOptions;

    this.frames = frames;
    this.interval = interval;
    this.format = format;
    this.position = position;
  }

  // --------------------------------------------------
  // Methods
  // --------------------------------------------------

  /**
   * Starts the spinner animation with an initial message.
   * This method initializes the spinner and begins the animation.
   *
   * @public
   * @example
   * spinner.start('Loading...');
   *
   * @param {string} [text=''] Message to display alongside the spinner.
   *
   * @returns {Spinner} The spinner instance for chaining.
   */
  public start(text: string = ''): this {
    // If already started, just update the text and return.
    if (this.timer) {
      this.text = text;
      this.paused = false;
      return this;
    }

    this.text = text;
    this.startTime = performance.now();

    // Add this spinner instance to the global list.
    Spinner.spinnerInstances.push(this);

    // Write a new line to ensure proper position in the console.
    process.stdout.write('\n');

    // Start the render loop using setInterval.
    this.timer = setInterval(() => this.render(), this.interval);

    // Register the global exit listener once.
    if (!Spinner.exitListenerRegistered) {
      process.on('exit', Spinner.globalCleanup);
      Spinner.exitListenerRegistered = true;
    }

    this.paused = false;

    return this;
  }

  /**
   * Pauses the spinner animation without resetting its state.
   * This method stops the animation but retains the current frame and text.
   *
   * @public
   * @example
   * spinner.pause();
   *
   * @returns {Spinner} The spinner instance for chaining.
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
   * This method restarts the animation from the current frame.
   *
   * @public
   * @example
   * spinner.resume();
   *
   * @returns {Spinner} The spinner instance for chaining.
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
   * This method stops the current animation and starts a new one.
   *
   * @public
   * @example
   * spinner.restart();
   *
   * @returns {Spinner} The spinner instance for chaining.
   */
  public restart(): this {
    this.stop();
    // Reset frame counter to start from the beginning.
    this.currentFrame = 0;

    return this.start(this.text);
  }

  /**
   * Updates the spinner frames and resets the frame counter.
   * This method allows dynamic changes to the spinner animation.
   *
   * @public
   * @example
   * spinner.updateFrames(['|', '/', '-', '\\']);
   *
   * @param {string[]} newFrames Array of new frames for the spinner.
   *
   * @returns {Spinner} The spinner instance for chaining.
   */
  public updateFrames(newFrames: string[]): this {
    // Update the spinner frames with the new array
    this.frames = newFrames;
    // Reset currentFrame index to 0 so the new frames start from the beginning
    this.currentFrame = 0;

    return this;
  }

  /**
   * Updates the text displayed alongside the spinner.
   * This method allows dynamic changes to the message.
   *
   * @public
   * @example
   * spinner.updateText('New message');
   *
   * @param {string} newText New text message.
   *
   * @returns {Spinner} The spinner instance for chaining.
   */
  public updateText(newText: string): this {
    this.text = newText;

    return this;
  }

  /**
   * Stops the spinner animation and displays the final message.
   * This method clears the spinner and shows the final output.
   *
   * @public
   * @example
   * spinner.stop('Done!');
   *
   * @param {string} [finalText=''] Final text to display.
   *
   * @returns {Spinner} The spinner instance for chaining.
   */
  public stop(finalText: string = ''): this {
    try {
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      }

      // For TTY environments, render final output and clear the line.
      if (process.stdout.isTTY) {
        this.render(finalText);
        clearLine();
      } else {
        // For non-TTY, simply write the final message.
        process.stdout.write(finalText + '\n');
      }

      // Remove this spinner instance from the global list.
      Spinner.spinnerInstances = Spinner.spinnerInstances.filter(
        (s) => s !== this,
      );
    } catch (error) {
      console.error('Error in stop():', error);
    } finally {
      // If there are no more spinner instances, remove the global exit
      // listener to avoid leaving an attached handler.
      if (
        Spinner.spinnerInstances.length === 0 &&
        Spinner.exitListenerRegistered
      ) {
        process.off('exit', Spinner.globalCleanup);
        Spinner.exitListenerRegistered = false;
      }
    }

    return this;
  }

  /**
   * Returns the current interval (in milliseconds) of the spinner.
   * This method allows querying the current speed of the spinner animation.
   *
   * @public
   * @example
   * console.log(spinner.getInterval());
   *
   * @returns {number} The current interval.
   */
  public getInterval(): number {
    return this.interval;
  }

  /**
   * Returns the index of the current frame.
   * This method allows querying the current frame being displayed.
   *
   * @public
   * @example
   * console.log(spinner.getCurrentFrame());
   *
   * @returns {number} The current frame index.
   */
  public getCurrentFrame(): number {
    return this.currentFrame;
  }

  /**
   * Returns the timestamp when the spinner was started.
   * This method allows querying the start time of the spinner.
   *
   * @public
   * @example
   * console.log(spinner.getStartTime());
   *
   * @returns {number} The start timestamp.
   */
  public getStartTime(): number {
    return this.startTime;
  }

  /**
   * Returns the text currently assigned to the spinner.
   * This method allows querying the message displayed alongside the spinner.
   *
   * @public
   * @example
   * console.log(spinner.getCurrentText());
   *
   * @returns {string} The current text.
   */
  public getCurrentText(): string {
    return this.text;
  }

  /**
   * Sets a new interval for the spinner and resets the timer if active.
   * This method allows dynamic changes to the speed of the spinner animation.
   *
   * @public
   * @example
   * spinner.setInterval(100);
   *
   * @param {number} newInterval The new interval in milliseconds.
   *
   * @returns {Spinner} The spinner instance for chaining.
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
   * Returns the elapsed time (in milliseconds) since the spinner was started.
   * This method allows querying the duration of the spinner animation.
   *
   * @public
   * @example
   * console.log(spinner.getElapsedTime());
   *
   * @returns {number} The elapsed time.
   */
  public getElapsedTime(): number {
    return Math.floor(performance.now() - this.startTime);
  }

  /**
   * Returns the timer identifier or null if inactive.
   * This method allows querying the current state of the spinner.
   *
   * @public
   * @example
   * console.log(spinner.getTimerId());
   *
   * @returns {ReturnType<typeof setInterval> | null} The timer identifier.
   */
  public getTimerId(): ReturnType<typeof setInterval> | null {
    return this.timer;
  }

  /**
   * Returns whether the spinner is currently paused.
   * This method allows querying the paused state of the spinner.
   *
   * @public
   * @example
   * console.log(spinner.isPaused());
   *
   * @returns {boolean} True if paused, false otherwise.
   */
  public isPaused(): boolean {
    return this.paused;
  }

  // Protected methods

  /**
   * Generates the spinner's output string.
   * This method can be overridden by subclasses to modify the rendering behavior.
   *
   * @protected
   * @example
   * console.log(spinner.getRenderOutput());
   *
   * @param {string} [finalText] Optional final text to display.
   *
   * @returns {string} The output string for the spinner.
   */
  protected getRenderOutput(finalText?: string): string {
    if (finalText !== undefined) {
      return finalText;
    } else {
      let frame = this.frames[this.currentFrame] ?? '';
      // Update the frame index in a circular fashion.
      this.currentFrame = (this.currentFrame + 1) % this.frames.length;

      // Apply styling if format is provided.
      if (this.format) {
        frame = styleText(this.format, frame);
      }

      const elapsed = Math.floor(performance.now() - this.startTime);

      return this.position === 'right'
        ? `${this.text} ${frame} (${elapsed}ms)`
        : `${frame} ${this.text} (${elapsed}ms)`;
    }
  }

  /**
   * Renders the spinner output to the console.
   * Error handling is implemented via try/catch to ensure robust execution.
   *
   * @protected
   * @example
   * console.log(spinner.render());
   *
   * @param {string} [finalText] Optional final text to display.
   */
  protected render(finalText?: string): void {
    try {
      // Non-TTY environments: print each update on a new line.
      if (!process.stdout.isTTY) {
        if (finalText !== undefined) {
          process.stdout.write(finalText + '\n');
        } else {
          const frame = this.frames[this.currentFrame] ?? '';
          this.currentFrame = (this.currentFrame + 1) % this.frames.length;
          const elapsed = Math.floor(performance.now() - this.startTime);
          process.stdout.write(`${this.text} ${frame} (${elapsed}ms)\n`);
        }
        return;
      }

      // Get the current index of this spinner instance for positioning.
      const index = Spinner.spinnerInstances.indexOf(this);
      if (index === -1) return;

      // Move the cursor to the correct line for overwriting.
      if (typeof process.stdout.moveCursor === 'function') {
        process.stdout.moveCursor.call(
          process.stdout,
          0,
          -(Spinner.spinnerInstances.length - index),
        );
      }
      if (typeof process.stdout.cursorTo === 'function') {
        process.stdout.cursorTo(0);
      }

      // Clear the current line.
      clearLine();

      // Generate the output using the helper method.
      const output = this.getRenderOutput(finalText);
      process.stdout.write(output);

      // Restore the cursor position.
      if (typeof process.stdout.moveCursor === 'function') {
        process.stdout.moveCursor.call(
          process.stdout,
          0,
          Spinner.spinnerInstances.length - index,
        );
      }
    } catch (error) {
      console.error('Error in render():', error);
    }
  }

  /**
   * Cleanup method to clear the spinner in case of process exit.
   * This method is called when the process exits to ensure all spinners are cleared.
   *
   * @protected
   * @example
   * spinner.cleanup();
   *
   * @returns void - Nothing
   */
  protected cleanup = (): void => {
    try {
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      }
      clearLine();
    } catch (error) {
      console.error('Error in cleanup():', error);
    }
  };

  // Private methods

  /**
   * Normalizes and validates spinner options.
   * This method ensures that the options provided are in the correct format and type.
   *
   * @private
   * @example
   * console.log(Spinner.normalizeOptions({ frames: ['|', '/', '-'] }));
   *
   * @param {SpinnerOptions} [options] Spinner options.
   *
   * @returns {SpinnerOptions} Normalized spinner options.
   */
  private static normalizeOptions(options?: SpinnerOptions): SpinnerOptions {
    const defaultFrames = ['-', '\\', '|', '/'];
    const defaultInterval = 80;
    const defaultPosition: 'left' | 'right' = 'left';

    const {
      frames = defaultFrames,
      interval = defaultInterval,
      format = 'white', // Provide a default value for format
      position = defaultPosition,
    } = options ?? {};

    const normalizedPosition =
      position === 'left' || position === 'right' ? position : defaultPosition;

    return {
      frames,
      interval,
      format: format as FormatOptions,
      position: normalizedPosition,
    };
  }

  /**
   * Global cleanup method called on process exit to clean all spinner instances.
   * This method ensures that all active spinners are cleared and cleaned up.
   *
   * @private
   * @example
   * console.log(Spinner.globalCleanup());
   *
   * @returns void - Nothing
   */
  private static globalCleanup = (): void => {
    Spinner.spinnerInstances.forEach((spinner) => {
      try {
        if (spinner.timer) {
          clearInterval(spinner.timer);
          spinner.timer = null;
        }
        clearLine();
      } catch (error) {
        console.error('Error in globalCleanup():', error);
      }
    });

    Spinner.spinnerInstances = [];
  };
}
