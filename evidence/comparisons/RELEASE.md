# Comparison release — 22 October 2026

Publication authorized by the founder: “let's push live everything so far,” including final spacing fixes and lightweight native design additions.

## Release contents

- `/compare` and five individually approved pages: Belkins, SalesHive, Martal Group, CIENCE and Cleverly.
- Shared More menu and footer entry, clean routes, sitemap entries, breadcrumbs, visible sources, matched FAQ schema and current-brand social cards.
- One responsive semantic HTML diagram per comparison: infrastructure choices, the billing formula, sales handoff, meeting stages or booking qualification. Uses approved commercial terms, existing typography/colors and authored arrows, with no simulated client results or new runtime dependencies.
- Pricing intros, tables and prose align at 760px with a 32px introductory gap, reduced to 24px on mobile. Plain sections share one spacing interval. Inline arrows, equal-height hub cards and mobile title sizes have been polished.

## Preflight evidence

- Full site and isolated review builds passed. Six approved blog posts remain public; no draft publication or approval-state changes.
- Seven commercial/navigation tests and eight blog publication-boundary tests passed. Public blog and isolated preview checks passed.
- Metadata/output checks passed across 25 pages and 22 social images, including internal links, sitemap, clean paths, FAQ answer parity and preview parity.
- Comparison suite: 66 layouts across Chrome, Firefox and WebKit; 36 axe scans with no detected WCAG A/AA violations; 55 pricing-spacing/edge checks and five hub alignment checks passed. Native menu, FAQs and content work without JavaScript.
- Existing pricing/site-family regression suite: 55 layouts, eight interaction groups and six axe scans passed. Includes plan calculators, mobile/desktop More navigation, all three booking buttons and focus restoration.
- A regression assertion initially checked the dialog before its native Escape-close event completed. Targeted tests confirmed the dialog closes and restores focus in Chrome/WebKit. The test now waits for the native close state before asserting; no application behavior was changed. The full pricing suite then passed.
- Twenty existing HTML pages retain exactly the same parsed main content as the previous live commit. Shared navigation/footer updates are intentional.
- Native figures reviewed at 390, 768 and 1440px. Wide and mobile examples are retained alongside machine-readable QA reports. Automated accessibility results supplement, rather than replace, manual visual review.
- Production branch was verified unchanged before preparing the fast-forward release. CI workflow and blog source/approval files were not edited.

## Production verification

After deployment, run `node tools/qa-comparison-production.mjs`. It verifies 22 live viewport/route combinations, metadata, fonts, native diagrams, pricing gaps, navigation, booking dialog/focus behavior and the calculator. It also checks native WebKit navigation without JavaScript. Google Analytics and calendar requests are blocked during these checks to avoid test traffic or booking side effects. Output is recorded locally in `production.json`.
