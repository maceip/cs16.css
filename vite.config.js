import { resolve } from 'node:path';
import { defineConfig } from 'vite';

// Multi-page catalog build. Every top-level HTML entry is a separate rollup
// input so GitHub Pages serves the full showcase (root), liar gallery,
// gallery, and server browser.
export default defineConfig({
  // `./` keeps asset URLs relative so the build works at any subpath —
  // important for project-scoped Pages (`/cs16.css/`).
  base: './',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'index.html'),
        gallery: resolve(__dirname, 'gallery.html'),
        liar: resolve(__dirname, 'liar/index.html'),
        servers: resolve(__dirname, 'servers.html'),
      },
    },
  },
});
