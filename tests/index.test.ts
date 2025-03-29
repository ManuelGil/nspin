import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { performance } from 'node:perf_hooks';
import { Spinner } from '../src/index';

describe('Spinner - TTY Environment', () => {
  let originalIsTTY: boolean | undefined;
  let moveCursorSpy: ReturnType<typeof vi.spyOn> | undefined;
  let cursorToSpy: ReturnType<typeof vi.spyOn> | undefined;
  let writeSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    // Simulate a TTY environment
    originalIsTTY = process.stdout.isTTY;
    process.stdout.isTTY = true;

    // Create spies only if the functions exist
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
    if (moveCursorSpy) moveCursorSpy.mockRestore();
    if (cursorToSpy) cursorToSpy.mockRestore();
    writeSpy.mockRestore();
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

    // If moveCursor and cursorTo spies exist, verify they were called.
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

  beforeEach(() => {
    // Simulate a non-TTY environment.
    originalIsTTY = process.stdout.isTTY;
    process.stdout.isTTY = false;

    // Remove cursor manipulation functions.
    originalMoveCursor = process.stdout.moveCursor;
    originalCursorTo = process.stdout.cursorTo;
    (process.stdout as any).moveCursor = undefined;
    (process.stdout as any).cursorTo = undefined;

    // Spy on write to capture output.
    writeSpy = vi.spyOn(process.stdout, 'write').mockImplementation(() => true);
  });

  afterEach(() => {
    process.stdout.isTTY = originalIsTTY ?? false;
    if (originalMoveCursor) {
      process.stdout.moveCursor = originalMoveCursor;
    }
    if (originalCursorTo) {
      process.stdout.cursorTo = originalCursorTo;
    }
    writeSpy.mockRestore();
  });

  it('should print output with newlines in non-TTY environments', async () => {
    const spinner = new Spinner({
      frames: ['-', '\\', '|', '/'],
      interval: 10,
      format: 'green',
    });

    spinner.start('Non-TTY Test');
    // Allow at least one render cycle.
    await new Promise((resolve) => setTimeout(resolve, 50));
    spinner.stop('Final Non-TTY');

    const calls = writeSpy.mock.calls;
    const finalCall = calls[calls.length - 1][0] as string;
    expect(finalCall).toContain('\n');
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
    // Use fake timers and patch performance.now() to use Date.now()
    vi.useFakeTimers();
    performanceNowSpy = vi
      .spyOn(performance, 'now')
      .mockImplementation(() => Date.now());
  });

  afterEach(() => {
    process.stdout.isTTY = originalIsTTY ?? true;
    writeSpy.mockRestore();
    performanceNowSpy.mockRestore();
    vi.useRealTimers();
  });

  it('should pause and resume the spinner correctly', () => {
    const spinner = new Spinner({ interval: 50 });
    spinner.start('Testing pause/resume');

    // Simulate time passing for at least one render cycle.
    vi.advanceTimersByTime(100);

    // Pause the spinner.
    spinner.pause();
    const spinnerAny = spinner as any; // Access protected properties for testing
    expect(spinnerAny.timer).toBeNull();
    expect(spinnerAny.paused).toBe(true);

    // Resume the spinner.
    spinner.resume();
    expect(spinnerAny.timer).not.toBeNull();
    expect(spinnerAny.paused).toBe(false);
  });

  it('should update and return the interval correctly', () => {
    const spinner = new Spinner({ interval: 80 });
    spinner.start('Testing interval update');

    // Verify the default interval.
    expect(spinner.getInterval()).toBe(80);

    // Update the interval and verify that the new value is returned.
    spinner.setInterval(100);
    expect(spinner.getInterval()).toBe(100);

    // Verify that if the spinner is active, the timer is reset.
    const spinnerAny = spinner as any;
    expect(spinnerAny.timer).not.toBeNull();
  });

  it('should expose the internal state via getter methods', () => {
    const spinner = new Spinner({ interval: 50 });
    spinner.start('Testing state');

    // Immediately after start, currentFrame should be 0.
    expect(spinner.getCurrentFrame()).toBe(0);

    // Simulate a render cycle.
    vi.advanceTimersByTime(60);
    expect(spinner.getCurrentFrame()).toBeGreaterThan(0);

    // Advance time so elapsed time becomes >= 100ms.
    vi.advanceTimersByTime(100);
    expect(spinner.getElapsedTime()).toBeGreaterThanOrEqual(100);

    // Timer should be active.
    expect(spinner.getTimerId()).not.toBeNull();
  });

  it('should restart the spinner without losing configuration', () => {
    // Set an initial fake system time.
    const initialTime = Date.now();
    vi.setSystemTime(initialTime);

    const spinner = new Spinner({ interval: 50 });
    spinner.start('Restart Test');

    // Advance time so that some time has elapsed.
    vi.advanceTimersByTime(100);
    const elapsedBeforeRestart = spinner.getElapsedTime();
    expect(elapsedBeforeRestart).toBeGreaterThan(0);

    // Restart the spinner.
    spinner.restart();

    // After restart, elapsed time should be reset (i.e. less than elapsedBeforeRestart)
    const elapsedAfterRestart = spinner.getElapsedTime();
    expect(elapsedAfterRestart).toBeLessThan(elapsedBeforeRestart);
    // currentFrame should be reset to 0.
    expect(spinner.getCurrentFrame()).toBe(0);
    expect(spinner.getTimerId()).not.toBeNull();
  });
});
