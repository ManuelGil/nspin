import { Spinner } from 'nspin';

const spinner = new Spinner({ frames: ['◴', '◷', '◶', '◵'], interval: 100 });

spinner.start('Starting long task...');

let progress = 0;
const interval = setInterval(() => {
  progress += 10;
  spinner.updateText(`Processing... ${progress}%`);

  if (progress >= 100) {
    clearInterval(interval);
    spinner.stop('✅ Task completed!');
  }
}, 500);
