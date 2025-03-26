import { Spinner } from 'nspin';

const spinner = new Spinner({
  frames: ['◐', '◓', '◑', '◒'],
  interval: 120,
  format: ['cyan', 'underline'],
}).start('Loading styled spinner...');

setTimeout(() => {
  spinner.stop('🎨 Styled complete!');
}, 4000);
