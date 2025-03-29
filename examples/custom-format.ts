// custom-format.ts
import { Spinner } from 'nspin';

// Spinner with custom format (e.g., using a color/style) and unique frames.
const spinner = new Spinner({
  frames: ['◰', '◳', '◲', '◱'],
  interval: 120,
  format: 'magenta', // Custom style
}).start('Custom Format Task: Processing...');

setTimeout(() => {
  spinner.stop('✅ Custom Format Complete!');
}, 3000);
