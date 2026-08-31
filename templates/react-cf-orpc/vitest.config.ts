import { defineConfig, mergeConfig } from 'vitest/config';

import viteConfig from './vite.config.ts';

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      css: true,
      globals: true,
      environment: 'jsdom',
      setupFiles: ['./vitest.setup.ts'],
      exclude: ['**/node_modules/**', '**/dist/**', '**/*.server.test.ts', 'test/**'],
      coverage: {
        provider: 'v8',
        enabled: true,
        include: ['src/**/*'],
        exclude: ['src/routeTree.gen.ts'],
      },
      typecheck: {
        enabled: true,
      },
    },
  })
);
