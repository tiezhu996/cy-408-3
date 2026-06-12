import path from 'node:path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  root: 'renderer',
  plugins: [react()],
  server: {
    port: 28314,
    strictPort: true
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true
  },
  resolve: {
    alias: {
      '@renderer': path.resolve(__dirname, 'renderer/src'),
      '@shared': path.resolve(__dirname, 'shared')
    }
  }
});
