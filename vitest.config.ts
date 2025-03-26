// vitest.config.ts
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    globals: true,
    deps: { interopDefault: true },
    testTransformMode: { web: ['\\.[tj]s$'] },
  },
});
