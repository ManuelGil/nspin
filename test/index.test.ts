import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
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
        .mockImplementation(() => true) as unknown as ReturnType<
        typeof vi.spyOn
      >;
    }
    if (typeof process.stdout.cursorTo === 'function') {
      cursorToSpy = vi
        .spyOn(process.stdout, 'cursorTo')
        .mockImplementation(() => true) as unknown as ReturnType<
        typeof vi.spyOn
      >;
    }
    writeSpy = vi
      .spyOn(process.stdout, 'write')
      .mockImplementation(() => true) as unknown as ReturnType<typeof vi.spyOn>;
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
    (
      process.stdout as unknown as {
        moveCursor?: typeof process.stdout.moveCursor;
      }
    ).moveCursor = undefined;
    (
      process.stdout as unknown as { cursorTo?: typeof process.stdout.cursorTo }
    ).cursorTo = undefined;

    // Spy on write to capture output.
    writeSpy = vi
      .spyOn(process.stdout, 'write')
      .mockImplementation(() => true) as unknown as ReturnType<typeof vi.spyOn>;
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
    // Allow at least one render cycle
    await new Promise((resolve) => setTimeout(resolve, 50));
    spinner.stop('Final Non-TTY');

    const calls = writeSpy.mock.calls;
    const finalCall = calls[calls.length - 1][0] as string;
    expect(finalCall).toContain('\n');
  });
});
