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
      exclude: ['**/node_modules/**', '**/dist/**', 'test/**'],
      projects: [
        {
          test: {
            name: 'server',
            include: ['src/**/*.server.test.ts'],
            environment: 'node',
            globalSetup: ['./test/global-db-setup.ts'],
            setupFiles: ['./test/per-file-db.ts'],
          }
        },
        {
          extends: true,
          test: {
            name: 'ui',
            css: true,
            include: ['src/**/*.test.tsx'],
            exclude: ['src/routes/'],
            environment: 'jsdom',
            setupFiles: ['./test/ui-setup.ts'],
          }
        }
      ],
    },
  })
);
