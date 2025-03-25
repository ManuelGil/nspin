// vite.config.ts
import { defineConfig } from 'vite';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Rollup plugins for module resolution and code transformations
import replace from '@rollup/plugin-replace';
import json from '@rollup/plugin-json';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import swc from '@rollup/plugin-swc';

// Plugin to resolve paths defined in tsconfig.json
import viteTsconfigPaths from 'vite-tsconfig-paths';
// Externalize peer dependencies automatically from package.json
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
// Plugin to visualize the bundle (optional)
import { visualizer } from 'rollup-plugin-visualizer';
// Plugin to compress assets (Brotli)
import viteCompression from 'vite-plugin-compression';

import pkg from './package.json';

// Convert import.meta.url to __dirname for Windows compatibility
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Determine if we are in production mode
const isProduction = process.env.NODE_ENV === 'production';
// Enable sourcemaps only in development
const sourcemapOption = !isProduction;

// Base plugins shared across builds
const basePlugins = [
  viteTsconfigPaths(), // Automatically resolve tsconfig paths
  peerDepsExternal(), // Exclude peerDependencies from bundle
  nodeResolve({ extensions: ['.ts', '.js', '.json'], preferBuiltins: true }),
  commonjs(), // Convert CommonJS modules to ES modules
  json(), // Enable importing JSON files
  replace({
    // Replace process.env.NODE_ENV for proper tree-shaking
    'process.env.NODE_ENV': JSON.stringify(
      process.env.NODE_ENV || 'development',
    ),
    preventAssignment: true,
  }),
  swc({
    swc: {
      jsc: {
        parser: { syntax: 'typescript', tsx: false },
        target: 'es2022', // Target modern JS for Node 22
      },
      module: { type: 'commonjs' },
      // Minify code when in production mode
      minify: isProduction,
    },
  }),
].filter(Boolean);

// Optional visualizer plugin: activated when ANALYZE env variable is set
const analyzePlugin = process.env.ANALYZE
  ? visualizer({
      open: true, // Automatically open the bundle report in the browser
      filename: path.resolve(__dirname, 'stats.html'),
      gzipSize: true,
      brotliSize: true,
    })
  : null;

export default defineConfig({
  build: {
    // Generate sourcemaps only in development
    sourcemap: sourcemapOption,
    // Use Terser for production minification for maximum size reduction
    minify: isProduction ? 'terser' : false,
    terserOptions: {},
    // Configure library mode for our package
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'nspin',
      formats: ['cjs', 'es'],
      // Define file naming for different formats
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      output: {
        // Asset naming convention
        assetFileNames: 'assets/[name].[hash].[ext]',
        // Manual chunking: split vendor modules for better caching and tree shaking
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0];
          }
        },
      },
      // Externalize dependencies from package.json to avoid bundling them
      external: (id: string) =>
        Object.keys(pkg.devDependencies || {}).some(
          (dep) => id === dep || id.startsWith(`${dep}/`),
        ),
    },
  },
  plugins: [
    ...basePlugins,
    // Compress assets using Brotli (can also add gzip if needed)
    viteCompression({
      algorithm: 'brotliCompress',
      ext: '.br',
      threshold: 10240, // Compress files larger than 10KB
    }),
    analyzePlugin,
  ].filter(Boolean),
});
