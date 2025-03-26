import { Spinner } from 'nspin';

const spinner = new Spinner({}).start('Processing...');

setTimeout(() => {
  spinner.stop('✅ Done!');
}, 3000);
