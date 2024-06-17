import { defineConfig, LibraryFormats } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import dts from 'vite-plugin-dts';
import { libInjectCss } from 'vite-plugin-lib-inject-css';

export default defineConfig(() => ({
  plugins: [
    react(),
    tsconfigPaths(),
    dts({
      include: ['lib'],
      insertTypesEntry: true,
    }),
    libInjectCss(),
  ],
  resolve: {
    alias: [{ find: /^~/, replacement: '' }],
  },
  base: '/',
  build: {
    outDir: 'dist',
    sourcemap: false,
    assetsInclude: ['**/*.svg'],
    lib: {
      entry: './lib/index.ts',
      name: 'react-dnd-antd-form-builder',
      formats: ['es'] as LibraryFormats[],
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
    },
  },
}));
