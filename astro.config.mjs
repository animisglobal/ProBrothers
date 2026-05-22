// @ts-check
import { defineConfig } from 'astro/config';

// Static output — generates plain HTML files, same as the original site.
export default defineConfig({
  site: 'https://prob.nurotech.co.in',
  // Keep emitted HTML close to the hand-written source (no extra minification surprises).
  build: {
    format: 'directory',
  },
});
