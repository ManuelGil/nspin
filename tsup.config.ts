import { defineConfig } from 'tsup';

export default defineConfig({
  entryPoints: ['src/index.ts'],
  outDir: 'dist',
  clean: true,
  format: ['esm', 'cjs'],
  target: 'esnext',
  dts: true,
  minify: true,
  sourcemap: true,
  splitting: false, // desactiva el splitting para generar un único archivo
});
