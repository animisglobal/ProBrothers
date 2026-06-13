import type { APIRoute } from 'astro';

// Single, flat sitemap served directly at /sitemap.xml (no sitemap index, no
// sitemap-0.xml). Replaces @astrojs/sitemap, which always emits an index + a
// nested sitemap-0.xml. Routes are auto-derived from src/pages so new pages are
// picked up automatically.

const SITE = 'https://probrothers.com';

// All page modules. Eagerly globbed so this works at build time (static output).
const pages = import.meta.glob('./**/*.astro', { eager: true });

// Routes we never want in the sitemap.
const EXCLUDE = new Set(['/404/']);

function fileToUrlPath(file: string): string | null {
  // file looks like "./about.astro", "./blog/index.astro", "./blog/page/2/index.astro"
  let p = file.replace(/^\.\//, '').replace(/\.astro$/, '');

  // Dynamic routes (contain [param]) can't be enumerated here — skip them.
  if (p.includes('[')) return null;

  // index files map to their parent directory
  if (p === 'index') {
    p = '';
  } else if (p.endsWith('/index')) {
    p = p.slice(0, -'/index'.length);
  }

  // build.format: 'directory' => every page is served with a trailing slash.
  const route = p === '' ? '/' : `/${p}/`;
  return route;
}

export const GET: APIRoute = () => {
  const lastmod = new Date().toISOString();

  const routes = Object.keys(pages)
    .map(fileToUrlPath)
    .filter((r): r is string => r !== null && !EXCLUDE.has(r))
    // de-dupe + stable sort for a clean, deterministic file
    .filter((r, i, arr) => arr.indexOf(r) === i)
    .sort();

  const urls = routes
    .map((route) => {
      const loc = `${SITE}${route}`;
      return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>${route === '/' ? '1.0' : '0.7'}</priority>\n  </url>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
};
