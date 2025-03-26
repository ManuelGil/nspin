import path from 'node:path';
import { fileURLToPath } from 'node:url';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import swc from '@rollup/plugin-swc';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig } from 'vite';
import viteCompression from 'vite-plugin-compression';
import dts from 'vite-plugin-dts';
import viteTsconfigPaths from 'vite-tsconfig-paths';
import pkg from './package.json';

// Resolve __dirname in ESM context
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Determine production mode and disable sourcemaps in production
const isProduction = process.env.NODE_ENV === 'production';
const sourcemapOption = isProduction ? false : true;

// Base plugins for build optimization
const basePlugins = [
  // Automatically resolve paths defined in tsconfig.json
  viteTsconfigPaths(),
  // Automatically externalize peerDependencies
  peerDepsExternal(),
  // Resolve Node modules (prefer built-ins for CLI)
  nodeResolve({
    extensions: ['.ts', '.js', '.json'],
    preferBuiltins: true,
  }),
  // Convert CommonJS modules to ES modules
  commonjs(),
  // Allow JSON imports
  json(),
  // Replace process.env.NODE_ENV for proper tree-shaking
  replace({
    'process.env.NODE_ENV': JSON.stringify(
      process.env.NODE_ENV || 'development',
    ),
    preventAssignment: true,
  }),
  // Use SWC for TypeScript transformation and minification
  swc({
    swc: {
      jsc: {
        parser: { syntax: 'typescript', tsx: false },
        target: 'es2022',
        minify: isProduction ? { compress: true, mangle: true } : undefined,
      },
      // Output as ES6 modules to allow proper Rollup inlining
      module: { type: 'es6' },
    },
  }),
].filter(Boolean);

// Optional plugin: Visualizer to analyze bundle size (enabled via ANALYZE env variable)
const analyzePlugin = process.env.ANALYZE
  ? visualizer({
      open: true,
      filename: path.resolve(__dirname, 'stats.html'),
      gzipSize: true,
      brotliSize: true,
    })
  : null;

export default defineConfig({
  build: {
    // Enable SSR mode to bundle Node built-in modules properly for CLI usage
    ssr: true,
    target: 'node22',
    sourcemap: sourcemapOption,
    // Use SWC as the minifier in production for maximum size reduction
    minify: isProduction ? 'terser' : false,
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'nspin',
      formats: ['cjs', 'es'],
      // Output filenames: "index.js" for CJS and "index.mjs" for ESM
      fileName: (format) => (format === 'cjs' ? 'index.js' : 'index.mjs'),
    },
    rollupOptions: {
      output: {
        // Inline dynamic imports to simplify the output for CLI
        inlineDynamicImports: true,
        assetFileNames: 'assets/[name].[hash].[ext]',
      },
      // Externalize only peerDependencies to keep native Node modules bundled
      external: (id: string) =>
        Object.keys(pkg.peerDependencies || {}).some(
          (dep) => id === dep || id.startsWith(`${dep}/`),
        ),
    },
  },
  // SSR configuration: Ensure that native modules are not externalized
  ssr: {
    noExternal: ['util', 'perf_hooks'],
  },
  resolve: {
    alias: {
      // Map Node built-in modules using node: prefix to their native counterparts
      'node:util': 'util',
      'node:perf_hooks': 'perf_hooks',
    },
  },
  plugins: [
    ...basePlugins,
    // Compress assets larger than 10KB with Brotli
    viteCompression({
      algorithm: 'brotliCompress',
      ext: '.br',
      threshold: 10240,
    }),
    analyzePlugin,
    // Generate TypeScript declaration files (.d.ts) in the "dist" folder
    dts({
      outDir: 'dist',
      insertTypesEntry: true,
      rollupTypes: true,
    }),
  ].filter(Boolean),
});
