/**
 * Clears the current line in the console.
 * This function is useful to overwrite the current line with new content.
 *
 * @public
 * @export
 * @example
 * clearLine();
 *
 * @returns {void} Clears the current line in the console.
 */
export function clearLine(): void {
  if (
    typeof process.stdout.clearLine === 'function' &&
    typeof process.stdout.cursorTo === 'function'
  ) {
    process.stdout.clearLine(0);
    process.stdout.cursorTo(0);
  }
}
