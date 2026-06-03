// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Static output — generates plain HTML files, same as the original site.
export default defineConfig({
  site: 'https://probrothers.com',
  integrations: [sitemap()],
  // Keep emitted HTML close to the hand-written source (no extra minification surprises).
  build: {
    format: 'directory',
  },
});
