import fs from 'node:fs/promises';
import path from 'node:path';

import { defineConfig, type Plugin } from 'vitest/config';

// Prisma generates its client with `runtime = "workerd"`, which imports the
// query compiler via `*.wasm?module`. That syntax is handled by the Cloudflare
// Vite plugin during normal builds, but this config runs tests in plain Node,
// so we provide an equivalent loader here. (vite-plugin-wasm only supports
// the standard `?init` syntax, not Cloudflare's `?module`.)
function wasmModuleLoader(): Plugin {
  return {
    name: 'wasm-module-loader',
    enforce: 'pre',
    resolveId(source, importer) {
      if (!source.endsWith('.wasm?module')) {
        return null;
      }

      const filePath = source.slice(0, -'?module'.length);
      return path.resolve(path.dirname(importer), filePath) + '?module';
    },
    async load(id) {
      if (!id.endsWith('.wasm?module')) {
        return null;
      }

      const buffer = await fs.readFile(id.replace(/\?module$/, ''));
      const base64 = buffer.toString('base64');
      return {
        code: `const binary = Uint8Array.from(atob("${base64}"), (c) => c.charCodeAt(0));\nexport default new WebAssembly.Module(binary);`,
      };
    },
  };
}

export default defineConfig({
  plugins: [wasmModuleLoader()],
  test: {
    include: ['src/**/*.server.test.ts'],
    environment: 'node',
    globalSetup: ['./test/globalSetup.ts'],
    setupFiles: ['./test/per-file-db.ts'],
  },
});
