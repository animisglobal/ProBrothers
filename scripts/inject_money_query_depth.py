#!/usr/bin/env python3
"""T3: Add a query-targeted topical-depth section (money-query phrasing in an H2 +
fact-dense local paragraph + 1-2 proof points) on the page that OWNS each stuck query.
Inserted just before the FAQ section (or the Quote Form on media, which has no FAQ).
Idempotent: skips a page that already contains the section's anchor id.
"""
import os, re

# (file, anchor-marker-to-insert-before, anchor_id, kicker, h2, paragraphs[])
BLOCKS = [
 ("src/pages/locations/media.astro",
  "<!-- ===== Quote Form ===== -->", "media-pa-contractor",
  "MEDIA, PA SPECIALISTS",
  "Kitchen Remodeling &amp; Trusted Contractor in Media, PA",
  ["Looking for kitchen remodeling in Media, PA, or a contractor in Media, PA you can rely on? ProBrothers is a locally based general contractor headquartered at 7 Blackhorse Ln, Media, PA 19063, serving Media and the surrounding Delaware County and Main Line communities for over 15 years. Our kitchen remodels in Media combine custom cabinetry, durable countertops, and skilled trim carpentry, all managed by one in-house team from design through final installation.",
   "Because we are based in Media rather than travelling in from outside the area, our crews know local permitting, township inspections, and the older housing stock common across Media and Delaware County. That local knowledge keeps Media, PA kitchen remodeling projects on schedule and on budget, and it is one reason homeowners across the area consistently rate ProBrothers 5.0."]),

 ("src/pages/locations/king-of-prussia.astro",
  "<!-- ===== FAQ ===== -->", "kop-kitchen-remodeling",
  "KING OF PRUSSIA SPECIALISTS",
  "Kitchen Remodeling in King of Prussia, PA",
  ["For kitchen remodeling in King of Prussia, PA, ProBrothers delivers full-service renovations — from layout redesign and custom cabinetry to countertops, lighting, and finish trim carpentry. With over 15 years of experience and a 5.0 client rating, our King of Prussia kitchen remodels are handled end to end by one in-house team, so design intent carries cleanly through to installation.",
   "We serve King of Prussia and the wider Main Line from our Media, PA base, and we plan each kitchen remodel around how the household actually uses the space — workflow, storage, and durable materials built to last rather than follow short-term trends. Every King of Prussia project starts with a free, detailed quote returned within one business day."]),

 ("src/pages/services/remodeling.astro",
  "<!-- ===== FAQ ===== -->", "kitchen-remodeling-media-pa",
  "KITCHEN REMODELING",
  "Kitchen Remodeling in Media, PA",
  ["Kitchen remodeling in Media, PA is one of ProBrothers' most-requested services. As a Media-based general contractor with over 15 years of experience and a 5.0 client rating, we manage every stage of a kitchen remodel in-house — cabinetry, countertops, electrical and plumbing coordination, flooring, and finish trim — so homeowners deal with one accountable team instead of juggling subcontractors.",
   "Whether it is a full gut renovation or a targeted kitchen update, our Media, PA kitchen remodeling projects focus on practical layouts, durable materials, and craftsmanship built to last. We provide a free, detailed quote within one business day for every kitchen remodel across Media and Delaware County."]),

 ("src/pages/services/additions.astro",
  "<!-- ===== FAQ ===== -->", "additions-central-pennsylvania",
  "HOME ADDITIONS",
  "Home Additions Across Central &amp; Southeastern Pennsylvania",
  ["ProBrothers builds home additions across central and southeastern Pennsylvania, from our Media, PA base out through Delaware County and the Main Line. With over 15 years of experience and a 5.0 client rating, we design and construct room additions, second-story builds, in-law suites, sunrooms, and bump-outs — managing structural work, permits, and finishes end to end.",
   "Every Pennsylvania addition is engineered to integrate seamlessly with your existing home's structure and style, using durable materials and craftsmanship built to last. We begin each addition project with a free, detailed quote returned within one business day."]),

 ("src/pages/services/construction-services.astro",
  "<!-- ===== FAQ ===== -->", "general-contractors-pennsylvania",
  "PENNSYLVANIA GENERAL CONTRACTORS",
  "General Contractors in Pennsylvania",
  ["As established general contractors in Pennsylvania, ProBrothers delivers full residential and commercial construction across Media, Delaware County, and the Main Line. With over 15 years of experience and a 5.0 client rating, we self-perform the core trades — framing, carpentry, cabinetry, trim, and finishes — so projects stay coordinated under one accountable Pennsylvania contractor from start to finish.",
   "Homeowners and businesses choose ProBrothers as their Pennsylvania general contractor for custom builds, renovations, additions, and structural work, backed by local permitting knowledge and craftsmanship built to last. Every project begins with a free, detailed quote within one business day."]),
]

def build(anchor_id, kicker, h2, paras):
    ps = "\n".join(f'        <p>{p}</p>' for p in paras)
    return (
        f'  <!-- ===== Money-query depth (T3) ===== -->\n'
        f'  <section class="section" id="{anchor_id}" aria-label="{h2.replace("&amp;","and")}">\n'
        f'    <div class="container">\n'
        f'      <div class="section__head reveal">\n'
        f'        <span class="section__kicker">{kicker}</span>\n'
        f'        <h2 class="section__title">{h2}</h2>\n'
        f'      </div>\n'
        f'      <div class="reveal">\n{ps}\n      </div>\n'
        f'    </div>\n'
        f'  </section>\n\n'
    )

changed = 0
for f, marker, anchor_id, kicker, h2, paras in BLOCKS:
    if not os.path.exists(f):
        print("MISSING", f); continue
    s = open(f, encoding="utf-8").read()
    if f'id="{anchor_id}"' in s:
        print("skip  ", f, "(already present)"); continue
    if marker not in s:
        print("NOMARK", f, marker); continue
    block = build(anchor_id, kicker, h2, paras)
    s = s.replace(marker, block + marker, 1)
    open(f, "w", encoding="utf-8").write(s)
    print("FIXED ", f, "->", anchor_id)
    changed += 1
print(f"\nTotal: {changed}")
