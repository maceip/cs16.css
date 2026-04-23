import { defineConfig } from 'vite';

// Single-page gallery build. Only the root index.html (which loads
// src/mail-app.js / src/mail-app.css) is deployed. Every other entrypoint
// — liar/, servers.html, the old multi-page showcase — is intentionally
// excluded so GitHub Pages serves exactly one thing: the gallery.
export default defineConfig({
  // `./` keeps asset URLs relative so the build works at any subpath —
  // important for project-scoped Pages (`/cs16.css/`).
  base: './',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
});
