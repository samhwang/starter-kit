import { defineConfig, mergeConfig } from 'vitest/config';

import viteConfig from './vite.config.ts';

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      globals: true,
      coverage: {
        provider: 'v8',
        enabled: true,
        include: ['src/**/*'],
        exclude: ['src/routeTree.gen.ts'],
      },
      typecheck: {
        enabled: true,
      },
      projects: [
        {
          test: {
            name: 'server',
            include: ['src/**/*.server.test.ts'],
            environment: 'node',
            globalSetup: ['./test/globalSetup.ts'],
            setupFiles: ['./test/per-file-db.ts'],
          }
        },
        {
          extends: true,
          test: {
            css: true,
            environment: 'jsdom',
            setupFiles: ['./vitest.setup.ts'],
            exclude: ['**/node_modules/**', '**/dist/**', '**/*.server.test.ts', 'test/**'],
          }
        }
      ],
    },
  })
);
