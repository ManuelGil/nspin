// pause-resume.ts
import { Spinner } from 'nspin';

// Spinner that demonstrates pause and resume functionalities using a unique symbol pattern.
const spinner = new Spinner({
  frames: ['◜', '◝', '◞', '◟'],
  interval: 150,
}).start('Pause/Resume Task: Running...');

// Pause after 2 seconds
setTimeout(() => {
  spinner.pause();
  // Force a new line so the next console.log doesn't collide with spinner text
  process.stdout.write('\n');
  console.log('Spinner paused. Current frame:', spinner.getCurrentFrame());
}, 2000);

// Resume after 4 seconds
setTimeout(() => {
  // Again, force a new line before resuming
  process.stdout.write('\n');
  console.log('Spinner resumed.');
  spinner.resume();
}, 4000);

// Stop after 6 seconds
setTimeout(() => {
  spinner.stop('✅ Pause/Resume Task Complete!');
}, 6000);