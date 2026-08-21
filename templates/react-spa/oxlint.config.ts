import { defineConfig } from 'oxlint';

export default defineConfig({
  plugins: ['react', 'typescript', 'jsx-a11y'],
  options: {
    typeAware: true,
  },
  rules: {},
  ignorePatterns: ['**/node_modules', '**/dist', '**/coverage', '**/src/routeTree.gen.ts', '**/src/**/__snapshots__', '**/public/mockServiceWorker.js'],
});
