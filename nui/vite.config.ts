import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  base: './',
  plugins: [react()],
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    target: 'esnext',
    outDir: 'build',
    cssCodeSplit: true,
    rollupOptions: {
      external: [],
    },
  },
  optimizeDeps: {
    include: [
      '@radix-ui/react-slot',
      '@radix-ui/react-dialog',
      '@radix-ui/react-dropdown-menu',
      '@radix-ui/react-select',
      '@radix-ui/react-tabs',
      'class-variance-authority',
      'clsx',
      'tailwind-merge',
    ],
  },
  server: {
    port: 5000,
    host: '0.0.0.0',
    allowedHosts: true,
  },
});
