import path from "node:path";

import { defineConfig } from "vite";

export default defineConfig({
  build: {
    target: "node22",
    outDir: "dist",
    emptyOutDir: true,
    sourcemap: true,
    lib: {
      entry: path.resolve("src/index.ts"),
      name: "nspin",
      formats: ["es", "cjs"],
      fileName: (format) => (format === "es" ? "index.js" : "index.cjs"),
    },
    rollupOptions: {
      external: ["node:util", "node:perf_hooks"],
      output: {
        exports: "named",
      },
    },
  },
});
