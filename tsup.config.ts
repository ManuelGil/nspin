import { defineConfig } from 'tsup';

const isProduction = process.env.NODE_ENV === 'production';

export default defineConfig({
  entryPoints: ['src/index.ts'],
  outDir: 'dist',
  clean: true,
  format: ['esm', 'cjs'],
  target: 'node22',
  dts: true,
  minify: isProduction,
  sourcemap: !isProduction,
  splitting: false,
  treeshake: true,
  esbuildOptions(options) {
    if (isProduction) {
      options.minifyIdentifiers = true;
      options.minifySyntax = true;
      options.drop = ['console'];
    }
  },
});
