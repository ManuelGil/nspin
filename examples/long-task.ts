// long-task.ts
import { Spinner } from 'nspin';

// Long task example demonstrating progress updates using a circular spinner.
const spinner = new Spinner({
  frames: ['◴', '◷', '◶', '◵'],
  interval: 100,
}).start('Long Task: Starting...');

let progress = 0;
const interval = setInterval(() => {
  progress += 10;
  spinner.updateText(`Long Task: Processing... ${progress}%`);

  if (progress >= 100) {
    clearInterval(interval);
    spinner.stop('✅ Long Task Completed!');
  }
}, 500);
