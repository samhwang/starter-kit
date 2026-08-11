/// <reference types="vitest" />
/// <reference types="vite/client" />

import { cloudflare } from '@cloudflare/vite-plugin';
import { tanstackRouter } from '@tanstack/router-vite-plugin';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tanstackRouter(), ...(process.env.VITEST ? [] : [cloudflare()])],
});
