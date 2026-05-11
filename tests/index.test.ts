import { performance } from 'node:perf_hooks';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { Spinner } from '../src/index.js';

interface MutableStdout extends NodeJS.WriteStream {
  moveCursor?: typeof process.stdout.moveCursor;
  cursorTo?: typeof process.stdout.cursorTo;
}

describe('Spinner - TTY Environment', () => {
  let originalIsTTY: boolean | undefined;

  let moveCursorSpy: ReturnType<typeof vi.spyOn> | undefined;

  let cursorToSpy: ReturnType<typeof vi.spyOn> | undefined;

  let writeSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    originalIsTTY = process.stdout.isTTY;

    process.stdout.isTTY = true;

    if (typeof process.stdout.moveCursor === 'function') {
      moveCursorSpy = vi
        .spyOn(process.stdout, 'moveCursor')
        .mockImplementation(() => true);
    }

    if (typeof process.stdout.cursorTo === 'function') {
      cursorToSpy = vi
        .spyOn(process.stdout, 'cursorTo')
        .mockImplementation(() => true);
    }

    writeSpy = vi.spyOn(process.stdout, 'write').mockImplementation(() => true);
  });

  afterEach(() => {
    process.stdout.isTTY = originalIsTTY ?? false;

    vi.restoreAllMocks();

    vi.useRealTimers();
  });

  it('should allow method chaining and manage spinner instances', () => {
    const spinner = new Spinner({
      frames: ['-', '\\', '|', '/'],
      interval: 10,
      format: 'cyan',
    });

    const result = spinner
      .start('TTY Test')
      .updateText('Updated')
      .stop('Final TTY');

    expect(result).toBeInstanceOf(Spinner);

    if (moveCursorSpy) {
      expect(moveCursorSpy).toHaveBeenCalled();
    }

    if (cursorToSpy) {
      expect(cursorToSpy).toHaveBeenCalled();
    }
  });
});

describe('Spinner - Non-TTY Environment', () => {
  let originalIsTTY: boolean | undefined;

  let originalMoveCursor: typeof process.stdout.moveCursor | undefined;

  let originalCursorTo: typeof process.stdout.cursorTo | undefined;

  let writeSpy: ReturnType<typeof vi.spyOn>;

  let output: string[];

  beforeEach(() => {
    originalIsTTY = process.stdout.isTTY;

    process.stdout.isTTY = false;

    const stdout = process.stdout as MutableStdout;

    originalMoveCursor = stdout.moveCursor;

    originalCursorTo = stdout.cursorTo;

    stdout.moveCursor = undefined;

    stdout.cursorTo = undefined;

    output = [];

    writeSpy = vi.spyOn(process.stdout, 'write').mockImplementation((chunk) => {
      output.push(String(chunk));

      return true;
    });
  });

  afterEach(() => {
    process.stdout.isTTY = originalIsTTY ?? false;

    const stdout = process.stdout as MutableStdout;

    stdout.moveCursor = originalMoveCursor;

    stdout.cursorTo = originalCursorTo;

    vi.restoreAllMocks();

    vi.useRealTimers();
  });

  it('should print output with newlines in non-TTY environments', async () => {
    const spinner = new Spinner({
      frames: ['-', '\\', '|', '/'],
      interval: 10,
      format: 'green',
    });

    spinner.start('Non-TTY Test');

    await new Promise((resolve) => setTimeout(resolve, 50));

    spinner.stop('Final Non-TTY');

    const renderedOutput = output.join('');

    expect(renderedOutput).toContain('Final Non-TTY');

    expect(renderedOutput).toContain('\n');
  });

  it('should not throw when cursor methods are unavailable', () => {
    const spinner = new Spinner({
      interval: 10,
    });

    expect(() => {
      spinner.start('Cursorless');
      spinner.stop('Done');
    }).not.toThrow();
  });
});

describe('Spinner - Additional Methods', () => {
  let originalIsTTY: boolean | undefined;

  let writeSpy: ReturnType<typeof vi.spyOn>;

  let performanceNowSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    originalIsTTY = process.stdout.isTTY;

    process.stdout.isTTY = true;

    writeSpy = vi.spyOn(process.stdout, 'write').mockImplementation(() => true);

    vi.useFakeTimers();

    performanceNowSpy = vi
      .spyOn(performance, 'now')
      .mockImplementation(() => Date.now());
  });

  afterEach(() => {
    process.stdout.isTTY = originalIsTTY ?? true;

    vi.restoreAllMocks();

    vi.useRealTimers();
  });

  it('should pause and resume the spinner correctly', () => {
    const spinner = new Spinner({
      interval: 50,
    });

    spinner.start('Testing pause/resume');

    vi.advanceTimersByTime(100);

    spinner.pause();

    expect(spinner.isPaused()).toBe(true);

    expect(spinner.getTimerId()).toBeNull();

    spinner.resume();

    expect(spinner.isPaused()).toBe(false);

    expect(spinner.getTimerId()).not.toBeNull();

    spinner.stop();
  });

  it('should update and return the interval correctly', () => {
    const spinner = new Spinner({
      interval: 80,
    });

    spinner.start('Testing interval update');

    expect(spinner.getInterval()).toBe(80);

    spinner.setInterval(100);

    expect(spinner.getInterval()).toBe(100);

    expect(spinner.getTimerId()).not.toBeNull();

    spinner.stop();
  });

  it('should expose the internal state via getter methods', () => {
    const spinner = new Spinner({
      interval: 50,
    });

    spinner.start('Testing state');

    expect(spinner.getCurrentFrame()).toBe(0);

    vi.advanceTimersByTime(60);

    expect(spinner.getCurrentFrame()).toBeGreaterThan(0);

    vi.advanceTimersByTime(100);

    expect(spinner.getElapsedTime()).toBeGreaterThanOrEqual(100);

    expect(spinner.getTimerId()).not.toBeNull();

    spinner.stop();
  });

  it('should restart the spinner without losing configuration', () => {
    const initialTime = Date.now();

    vi.setSystemTime(initialTime);

    const spinner = new Spinner({
      interval: 50,
    });

    spinner.start('Restart Test');

    vi.advanceTimersByTime(100);

    const elapsedBeforeRestart = spinner.getElapsedTime();

    expect(elapsedBeforeRestart).toBeGreaterThan(0);

    spinner.restart();

    const elapsedAfterRestart = spinner.getElapsedTime();

    expect(elapsedAfterRestart).toBeLessThan(elapsedBeforeRestart);

    expect(spinner.getCurrentFrame()).toBe(0);

    expect(spinner.getTimerId()).not.toBeNull();

    spinner.stop();
  });

  it('should safely handle multiple stop calls', () => {
    const spinner = new Spinner({
      interval: 10,
    });

    spinner.start('Multiple stop test');

    expect(() => {
      spinner.stop('Done');
      spinner.stop('Done again');
    }).not.toThrow();
  });

  it('should safely stop an inactive spinner', () => {
    const spinner = new Spinner({
      interval: 10,
    });

    expect(() => {
      spinner.stop('Inactive');
    }).not.toThrow();
  });
});
