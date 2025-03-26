import { Spinner } from 'nspin';

const spinner1 = new Spinner({
  frames: ['-', '\\', '|', '/'],
  interval: 100,
}).start('Downloading file 1...');

const spinner2 = new Spinner({
  frames: ['⠋', '⠙', '⠹', '⠸'],
  interval: 150,
}).start('Downloading file 2...');

setTimeout(() => {
  spinner1.stop('✅ File 1 downloaded!');
}, 3000);

setTimeout(() => {
  spinner2.stop('✅ File 2 downloaded!');
}, 5000);
