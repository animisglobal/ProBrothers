#!/usr/bin/env python3
"""T5: inject 2-3 contextual in-body links (to /services/ and /locations/) into each blog post.
Idempotent: skips a file that already contains the block marker. Inserts immediately before
the post-cta div so the links sit inside .post-body, contextual to the article."""
import re, pathlib, sys

BLOG = pathlib.Path(__file__).resolve().parent.parent / "src" / "pages" / "blog"
MARKER = "blog-internal-links (T5)"

# Per-post: heading + list of (anchor text, href) — 3 contextual links each (services + a location)
MAP = {
 "best-remodeling-contractor-in-pennsylvania.astro": [
    ("home remodeling services", "/services/remodeling/"),
    ("general construction services", "/services/construction-services/"),
    ("remodeling contractor in Media, PA", "/locations/media/")],
 "choosing-the-right-wood-for-cabinets.astro": [
    ("custom cabinetry services", "/services/cabinets/"),
    ("trim carpentry services", "/services/trim/"),
    ("cabinet makers in West Chester, PA", "/locations/west-chester/")],
 "custom-construction-services-offered-by-probrothers.astro": [
    ("custom construction services", "/services/construction-services/"),
    ("home additions", "/services/additions/"),
    ("construction services in Media, PA", "/locations/media/")],
 "everything-you-need-to-know-about-custom-built-additions.astro": [
    ("home addition services", "/services/additions/"),
    ("general construction services", "/services/construction-services/"),
    ("home additions in King of Prussia, PA", "/locations/king-of-prussia/")],
 "guide-to-hiring-remodeling-contractors.astro": [
    ("home remodeling services", "/services/remodeling/"),
    ("our full range of construction services", "/services/"),
    ("trusted contractor in Media, PA", "/locations/media/")],
 "home-remodeling-guide-2025.astro": [
    ("home remodeling services", "/services/remodeling/"),
    ("custom cabinetry", "/services/cabinets/"),
    ("home remodeling in Glen Mills, PA", "/locations/glen-mills/")],
 "how-to-choose-right-cabinet-styles-for-home.astro": [
    ("custom cabinetry services", "/services/cabinets/"),
    ("home remodeling services", "/services/remodeling/"),
    ("cabinet installation in Malvern, PA", "/locations/malvern/")],
 "how-trim-carpentry-elevates-home-aesthetics.astro": [
    ("trim carpentry services", "/services/trim/"),
    ("custom cabinetry services", "/services/cabinets/"),
    ("trim carpentry in West Chester, PA", "/locations/west-chester/")],
 "kitchen-cabinets-cost.astro": [
    ("custom cabinetry services", "/services/cabinets/"),
    ("home remodeling services", "/services/remodeling/"),
    ("kitchen remodeling in King of Prussia, PA", "/locations/king-of-prussia/")],
 "must-have-cabinet-features-for-home.astro": [
    ("custom cabinetry services", "/services/cabinets/"),
    ("trim carpentry services", "/services/trim/"),
    ("custom cabinets in Kennett Square, PA", "/locations/kennett-square/")],
 "selecting-the-right-windows-for-your-home-a-comprehensive-guide.astro": [
    ("window and door installation", "/services/windows-and-doors/"),
    ("home remodeling services", "/services/remodeling/"),
    ("windows and doors in Springfield, PA", "/locations/springfield/")],
 "top-general-contractors-in-pennsylvania.astro": [
    ("general construction services", "/services/construction-services/"),
    ("home remodeling services", "/services/remodeling/"),
    ("general contractor in Media, PA", "/locations/media/")],
 "why-choose-probrothers-for-home-remodeling.astro": [
    ("home remodeling services", "/services/remodeling/"),
    ("home additions", "/services/additions/"),
    ("home remodeling in Philadelphia, PA", "/locations/philadelphia/")],
 "why-renovating-your-home-could-be-a-better-choice-than-buying-new.astro": [
    ("home remodeling services", "/services/remodeling/"),
    ("home addition services", "/services/additions/"),
    ("home renovation in Newtown Square, PA", "/locations/newtown/")],
}

def block(links):
    lis = "\n".join(
        f'                  <li><a href="{href}">{txt}</a></li>' for txt, href in links)
    return (
f'''            <!-- {MARKER} -->
            <div class="post-body__section post-related-links reveal" aria-label="Related ProBrothers services and service areas">
              <h2>Related ProBrothers Services &amp; Service Areas</h2>
              <p>Explore the in-house services behind this article and the Delaware County and Main Line communities ProBrothers serves:</p>
              <ul class="post-related-links__list">
{lis}
                </ul>
            </div>

''')

def main():
    changed = []
    for fn, links in MAP.items():
        p = BLOG / fn
        s = p.read_text()
        if MARKER in s:
            print(f"skip (already done): {fn}"); continue
        # anchor: the post-cta div (with or without preceding comment)
        m = re.search(r'(\n([ \t]*)<!-- CTA Section -->\n)?([ \t]*)<div class="post-body__section post-cta reveal">', s)
        if not m:
            print(f"!! NO ANCHOR: {fn}"); sys.exit(2)
        insert_at = m.start(3) if m.group(3) else m.start()
        # find start of the line containing the post-cta div (or its comment)
        line_start = s.rfind("\n", 0, m.start()) + 1
        s2 = s[:line_start] + block(links) + s[line_start:]
        p.write_text(s2)
        changed.append(fn)
        print(f"injected: {fn}")
    print(f"\n{len(changed)} files changed")

if __name__ == "__main__":
    main()
