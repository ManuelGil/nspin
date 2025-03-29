// basic.ts
import { Spinner } from 'nspin';

// Basic spinner using a simple rotation pattern.
const spinner = new Spinner({
  frames: ['-', '\\', '|', '/'],
  interval: 100,
}).start('Basic Task: Loading...');

setTimeout(() => {
  spinner.stop('✅ Basic Task Complete!');
}, 3000);
