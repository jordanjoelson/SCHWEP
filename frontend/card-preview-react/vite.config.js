import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: 'src/main.jsx',
      name: 'SchwepCardPreview',
      fileName: 'card-preview',
      formats: ['iife'],
    },
    rollupOptions: {
      output: {
        assetFileNames: 'card-preview.[ext]',
      },
    },
    outDir: '../assets/js',
    emptyOutDir: false,
  },
});
