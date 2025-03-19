import { Spinner } from 'nspin';

const spinner = new Spinner();

spinner.start('Processing...');

setTimeout(() => {
  spinner.stop('✅ Done!');
}, 3000);
