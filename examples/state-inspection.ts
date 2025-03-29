// state-inspection.ts
import { Spinner } from 'nspin';

// Spinner demonstrating advanced state inspection with directional arrow frames.
const spinner = new Spinner({
  frames: ['▲', '▶', '▼', '◀'],
  interval: 100,
}).start('State Inspection Task: Running...');

// Log spinner state every second, up to three times.
let inspectionCount = 0;
const inspectionInterval = setInterval(() => {
  // Force a newline so the logs don't collide with the spinner output
  process.stdout.write('\n');

  console.log('Checking spinner state...');
  console.log(' - Current Frame:', spinner.getCurrentFrame());
  console.log(' - Elapsed Time:', spinner.getElapsedTime(), 'ms');

  process.stdout.write('\n\n');

  inspectionCount++;
  if (inspectionCount >= 3) {
    clearInterval(inspectionInterval);
  }
}, 1000);

// Stop the spinner after 5 seconds
setTimeout(() => {
  spinner.stop('✅ State Inspection Task Complete!');
}, 5000);
