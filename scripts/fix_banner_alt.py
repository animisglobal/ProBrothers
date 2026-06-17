#!/usr/bin/env python3
"""T2: Add descriptive alt text to empty-alt page-banner hero images across all pages.
Derives the alt from each page's banner H1 (#banner-heading), with sensible overrides
for generic titles. Only touches the <img class="page-banner__bg"> block's alt="".
"""
import re, sys, html, glob, os

# Explicit overrides for generic / non-descriptive banner titles -> meaningful alt.
OVERRIDES = {
    "About Us": "ProBrothers construction and remodeling team serving Media, PA and Delaware County",
    "Blog": "ProBrothers home remodeling and construction blog, Media, PA",
    "Contact Us": "Contact ProBrothers general contractor in Media, PA",
    "Privacy Policy": "ProBrothers general contractor office in Media, PA",
    "Accessibility Statement": "ProBrothers general contractor office in Media, PA",
    "Our Projects": "Completed remodeling and construction projects by ProBrothers in Delaware County, PA",
    "Projects": "Completed remodeling and construction projects by ProBrothers in Delaware County, PA",
    "404": "ProBrothers general contractor in Media, PA",
    "Page Not Found": "ProBrothers general contractor in Media, PA",
}

def banner_alt(title):
    t = html.unescape(title).strip()
    if t in OVERRIDES:
        return OVERRIDES[t]
    # All-caps single-word service/category headings (e.g. CABINETS, TRIM)
    if t.isupper() and len(t.split()) <= 3:
        return f"{t.title()} services by ProBrothers in Media, PA"
    # Already location/service descriptive headings -> "<heading> — ProBrothers"
    return f"{t} — ProBrothers"

def process(path):
    src = open(path, encoding="utf-8").read()
    # Find banner H1 title
    m = re.search(r'class="page-banner__title"[^>]*id="banner-heading"[^>]*>(.*?)</h1>', src, re.S)
    if not m:
        m = re.search(r'id="banner-heading"[^>]*>(.*?)</h1>', src, re.S)
    title = re.sub(r'<[^>]+>', '', m.group(1)).strip() if m else None
    if not title:
        title = "ProBrothers general contractor in Media, PA"
    alt = banner_alt(title)
    alt_esc = html.escape(alt, quote=True)

    # Locate the page-banner__bg img block and replace its alt="" only.
    bm = re.search(r'(<img class="page-banner__bg".*?/>)', src, re.S)
    if not bm:
        return False, "no banner img"
    block = bm.group(1)
    if 'alt=""' not in block:
        return False, f"alt already set ({title})"
    new_block = block.replace('alt=""', f'alt="{alt_esc}"', 1)
    src = src[:bm.start()] + new_block + src[bm.end():]
    open(path, "w", encoding="utf-8").write(src)
    return True, alt

if __name__ == "__main__":
    files = sorted(glob.glob("src/pages/**/*.astro", recursive=True))
    changed = 0
    for f in files:
        if "page-banner__bg" not in open(f, encoding="utf-8").read():
            continue
        ok, info = process(f)
        status = "FIXED" if ok else "skip "
        if ok:
            changed += 1
        print(f"{status} {f} -> {info}")
    print(f"\nTotal fixed: {changed}")
