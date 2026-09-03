import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    coverage: {
      provider: 'v8',
      include: ['src/**/*.{ts,tsx}'],
      exclude: [
        'src/routeTree.gen.ts',
        'test/**',
        'src/**/*.test.{ts,tsx}',
        'src/**/generated/**',
        // Server function wrapeprs
        'src/config/server/getSiteName.ts',
        // Single line library wrapeprs
        'src/auth/client.ts',
        'src/auth/server.ts',
        'src/auth/server/lib.ts',
        'src/database/lib/client.ts',
        // Route pages
        'src/routes/**/*.tsx',
        // API Routes handlers
        'src/routes/api/**',
      ],
    },
    projects: [
      {
        extends: true,
        test: {
          name: 'ui-components',
          include: ['src/**/*.test.tsx', 'src/**/hooks/**/*.test.ts'],
          exclude: ['src/routes/**'],
          environment: 'jsdom',
        },
      },
      {
        extends: true,
        test: {
          name: 'server',
          include: ['src/**/*.test.ts'],
          exclude: ['src/routes/**', 'src/**/hooks/**'],
          environment: 'node',
          globalSetup: ['./test/globalSetup.ts'],
          setupFiles: ['./test/per-file-db.ts'],
        },
      },
    ],
  },
});
