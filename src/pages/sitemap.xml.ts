import type { APIRoute } from 'astro';
import { execSync } from 'node:child_process';
import { statSync } from 'node:fs';

// Single, flat sitemap served directly at /sitemap.xml (no sitemap index, no
// sitemap-0.xml). Replaces @astrojs/sitemap, which always emits an index + a
// nested sitemap-0.xml. Routes are auto-derived from src/pages so new pages are
// picked up automatically.

const SITE = 'https://probrothers.com';

// All page file paths. We only need the KEYS (file paths) to derive routes — not
// the module exports — so we glob LAZILY (eager: false). Eager-importing every
// page module pulled all page/component CSS into this route's chunk, which Astro
// then linked (sitemap_xml.*.css) into every HTML <head>. Lazy glob keeps the
// keys available at build time without bundling that stray stylesheet (TB1).
const pages = import.meta.glob('./**/*.astro');

// Routes we never want in the sitemap.
// /blog/home-remodeling-guide-2025/ is a legacy slug that 301-redirects to the
// 2026 guide (see public/_redirects); the .astro file exists only to serve the
// redirect, so it must NOT be advertised as a canonical URL in the sitemap (S2).
const EXCLUDE = new Set(['/404/', '/blog/home-remodeling-guide-2025/']);

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

// Per-route <lastmod> (TB item P1-6). A single build-time timestamp re-dated all
// 65 URLs on every deploy, so Google correctly ignored the signal. We derive the
// date from the page source file's last git commit, falling back to file mtime
// (Cloudflare Pages does a shallow clone by default — if `git log` comes back
// empty there, mtime still gives a stable, per-file value).
const lastmodCache = new Map<string, string>();

function lastmodFor(file: string): string {
  const cached = lastmodCache.get(file);
  if (cached) return cached;

  const path = file.replace(/^\.\//, 'src/pages/');
  let iso = '';
  try {
    iso = execSync(`git log -1 --format=%cI -- "${path}"`, {
      encoding: 'utf-8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim();
  } catch {
    /* not a git checkout, shallow clone, or newly added file */
  }
  if (!iso) {
    try {
      iso = statSync(path).mtime.toISOString();
    } catch {
      iso = new Date().toISOString();
    }
  }
  lastmodCache.set(file, iso);
  return iso;
}

export const GET: APIRoute = () => {
  const seen = new Set<string>();
  const entries = Object.keys(pages)
    .map((file) => ({ file, route: fileToUrlPath(file) }))
    .filter((e): e is { file: string; route: string } =>
      e.route !== null && !EXCLUDE.has(e.route))
    // de-dupe + stable sort for a clean, deterministic file
    .filter((e) => (seen.has(e.route) ? false : (seen.add(e.route), true)))
    .sort((a, b) => a.route.localeCompare(b.route));

  const urls = entries
    .map(({ file, route }) => {
      const loc = `${SITE}${route}`;
      // <changefreq> and <priority> dropped — Google ignores both.
      return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${lastmodFor(file)}</lastmod>\n  </url>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
};
