import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [{ find: /^~/, replacement: '' }],
  },
  base: './',
  server: {
    port: 3000,
    open: './demo/index.html',
  },
  build: {
    outDir: 'dist_demo',
    sourcemap: false,
    rollupOptions: {
      input: {
        demo: resolve(__dirname, './index.html'),
      },
    },
  },
});
