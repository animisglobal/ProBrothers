# ProBrothers — Project CLAUDE.md

## Project
- Name: ProBrothers
- Type: WordPress to Astro migration
- Repo: (add your GitHub repo URL here)
- Live URL: (add your live WordPress URL here)
- New URL: (add your new Astro URL here)

## Your Only Job
Convert WordPress pages to Astro. No rewrites.

## Non-Negotiable Rules

### Content
- Copy every word verbatim — headings, body, CTAs, alt text, microcopy
- Same section order as source page
- Never rewrite, rephrase, shorten, or expand anything
- Only fix broken links, typos, malformed HTML, missing alts — flag these in a comment block at top of file, never silently edit

### Design
- Match homepage design system exactly — same components, tokens, spacing, typography, color palette, CSS conventions
- Add scroll animations, hover micro-interactions, lazy images, srcset/sizes, smooth transitions
- Mobile-first, fully responsive

### Accessibility
- WCAG 2.1 AA compliant
- Semantic HTML5
- Single H1, logical H2–H6 order
- ARIA labels where needed
- Keyboard navigation + focus states
- Sufficient color contrast

### Navigation
- Wire into global header/menu
- Update all internal links to new Astro routes
- No orphan links to old WordPress URLs
- Add breadcrumbs with BreadcrumbList schema

### SEO (Must Be Perfect)
- Title: unique, ≤60 chars, matches page intent
- Meta description: unique, ≤160 chars
- Canonical tag pointing to new URL
- Open Graph + Twitter Card meta tags with correct image dimensions
- JSON-LD structured data (Service, LocalBusiness, BreadcrumbList, FAQPage where applicable)
- Clean descriptive URL slug
- html lang, charset, viewport tags correct
- Sitemap.xml entry correct
- Robots directives correct
- No duplicate meta tags across pages

### Images
- Preserve original alt text verbatim
- Explicit width and height on all images
- WebP/AVIF with fallback
- Lazy loading on below-fold images
- LCP image: eager + fetchpriority="high"

### Performance
- LCP < 2.5s
- CLS < 0.1
- INP < 200ms
- Preconnect/preload for critical fonts and assets
- Inline critical CSS
- No render-blocking resources
- Minified CSS/JS

### Output Format
- One .astro file per page
- File path clearly stated
- List any shared components extracted with their paths
- Comment block at top of each file: source URL, errors fixed, SEO additions made

### Final Step — Always
- Commit and push to GitHub after every page completion
- Commit message format: "feat: migrate [page-name] from WordPress to Astro"

## How To Start Each Page
1. Read this CLAUDE.md
2. Fetch the source WordPress page URL
3. Audit existing homepage components and design tokens
4. Build the Astro page
5. Self-check against every rule above
6. Commit and push
