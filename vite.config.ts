import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';
import { leadApiDevServer } from './scripts/lead-api-dev-plugin';

export default defineConfig({
  plugins: [react(), leadApiDevServer()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    target: 'es2020',
    cssTarget: 'chrome100',
    chunkSizeWarningLimit: 300,
    rollupOptions: {
      output: {
        /*
         * Function form, not the object form. `manualChunks: { router: ['pkg'] }`
         * promotes the package to an entry point, which retains all its exports
         * and disables tree-shaking for it. The function form runs after
         * tree-shaking and only decides where surviving modules land.
         *
         * Splitting vendors out keeps them cached across content deploys: an
         * edit to a section should not invalidate React for returning visitors.
         */
        manualChunks(id) {
          if (!id.includes('node_modules')) return undefined;
          if (id.includes('react-router') || id.includes('@remix-run')) return 'router';
          if (id.includes('lucide-react')) return 'icons';
          return 'vendor';
        },
      },
    },
  },
});
