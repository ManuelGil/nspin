// restart.ts
import { Spinner } from 'nspin';

// Spinner demonstrating the restart functionality with a unique bar pattern.
const spinner = new Spinner({
  frames: ['▁', '▂', '▃', '▄', '▅', '▆', '▇', '█'],
  interval: 120,
}).start('Restart Task: Running...');

// Restart the spinner after 3 seconds
setTimeout(() => {
  spinner.restart();
  console.log('Spinner restarted.');
}, 3000);

// Stop the spinner after 5 seconds
setTimeout(() => {
  spinner.stop('✅ Restart Task Complete!');
}, 5000);
