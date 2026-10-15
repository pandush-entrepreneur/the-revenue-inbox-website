# After audit

15 October 2026. Rebuilt homepage and all three case-study pages on `redesign`.

## Results

| Check | Result |
|---|---|
| Lighthouse mobile, local Chromium | Performance **98**, Accessibility **100**, Best Practices **100**, SEO **100** |
| Core lab measurements | LCP **2.3s**, TBT **0ms**, CLS **0** |
| Impeccable technical health | **19/20**, Excellent: accessibility 3, performance 4, theming 4, responsive 4, integrity 4 |
| Taste source lint | **0 FAIL, 0 WARN** |
| Taste browser inspection | **0 FAIL, 2 intentional WARN**, after contextual exclusions below |
| Layout checks | Four pages × seven widths: 360, 390, 768, 1024, 1280, 1440, 1920 |
| All tested layouts | No document overflow, broken internal anchors, console exceptions or visible targets below 44px |
| HTML resilience | Real figures present; no invisible main content with JavaScript disabled |
| Reduced motion | No active animations; native instant anchor scrolling |
| Interaction | All five Vimeo facades activate; native ROI values, menu closing, Escape and FAQ disclosures verified |
| Metadata and source | Original titles/meta values preserved; original logo unchanged; local references verified |

## Impeccable audit and contextual findings

The detector reported 11 `cramped-padding` warnings: five homepage and two per case page. These are full-width section wrapper false positives. `.section` supplies 128px desktop/64px mobile vertical padding; nested `.container` supplies responsive gutters. No genuine cramped component was found by the independent technical review.

The first Lighthouse run exposed low contrast from partially transparent off-screen reveals and accessible video names that did not contain the visible “Watch testimonial” label. Fixed both. Observed content now remains fully opaque and rises 12px; final Lighthouse accessibility is 100.

Taste inspector exclusions are narrow contextual false positives: `palette-purple` is the mandatory brand; `icon-cards` detects real video play controls rather than generic feature tiles; `eyebrow` mistakes earlier link text/founder attribution above large numeric evidence for heading labels. No eyebrow element is shipped. The remaining warnings are intentional: no autoplay footage (players must load on click), and a scrollable mobile ROI table (explicitly permitted by the brief, with sticky stage column and visible swipe instruction). None was hidden from the meter.

## Critique and polish

Independent design review: design 8/10, usability 8/10, creativity 7/10, content 7/10. Weighted taste score **7.7/10**. No rebuild requested. Three material requests were fixed: accessible full-size campaign evidence, a clearer fourth testimonial crop, and shorter case introductions. The reviewer then scored all three **resolved**, disposition **ship** for that fix list. This is not a claim that unresolved source-content decisions have disappeared.

Desktop/mobile captures cover every homepage section and all case pages. `consistency-1440.jpg` and `consistency-390.jpg` place the complete four-page family side by side. Shared canvas, type, portrait/video grade, square corners, spacing and motion remain coherent. The final image cleanup removes residual slide backgrounds from factual campaign extracts.

## Canva reconciliation

The promised export folder was absent at intake and the web-fetch tool could not open Canva. Browser access succeeded. All 39 slides were read sequentially and transcribed to `source-assets/canva-deck/content.md`, with their native destinations mapped in its README. No deck content is represented as having been recovered from a nonexistent export. No iframe or slide screenshot remains in the page.

## Limits and owner decisions

These are headless Chromium lab and emulated-viewport checks, not field data, physical-device tests, or comprehensive screen-reader certification. Vimeo playback/caption availability and visual authenticity of supplied claims require owner review. Lighthouse’s local-server cache recommendation does not describe Vercel's production cache behavior.

Final media check: the local headless iframe request returned HTTP401, so player activation is verified but successful playback on the production domain is **not** certified. Each activated player now includes an explicit external Vimeo fallback. Verify the domain's embed permissions before launch. The mobile table's first scenario is fully visible before swiping; native keyboard scrolling moved its viewport 240px. Synthetic touch scroll did not yield a conclusive result and is not reported as a pass.

The legal name was supplied by the user, not independently verified. Existing commercial and proof contradictions are listed in `CHANGES.md`: refund scope, multiple-plan wording, ROI cost basis, 81 versus 240 meetings/month, 195 versus 576 opportunities/periods, ARR definition, investor raised-versus-pipeline status and missing client identities. No replacements invented.

Questions skipped: the user explicitly delegated design decisions and requested completion. Their one source-asset clarification authorized extracting and rewriting current presentations/screenshots. No further design approval was necessary.
