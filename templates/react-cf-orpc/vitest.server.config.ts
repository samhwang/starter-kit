import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['src/**/*.server.test.ts'],
    environment: 'node',
    globalSetup: ['./test/globalSetup.ts'],
    setupFiles: ['./test/per-file-db.ts'],
  },
});
