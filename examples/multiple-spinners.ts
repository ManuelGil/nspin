// multiple-spinners.ts
import { Spinner } from 'nspin';

// Example with two spinners running concurrently, each with different frames.

// Spinner for Task 1: Dot pattern
const spinner1 = new Spinner({
  frames: ['.', 'o', 'O', 'o'],
  interval: 80,
  format: 'yellow',
}).start('Task 1: Downloading...');

// Spinner for Task 2: Braille pattern
const spinner2 = new Spinner({
  frames: ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'],
  interval: 100,
  format: 'cyan',
}).start('Task 2: Processing...');

setTimeout(() => {
  spinner1.stop('✅ Task 1 Complete!');
}, 4000);

setTimeout(() => {
  spinner2.stop('✅ Task 2 Complete!');
}, 5000);
