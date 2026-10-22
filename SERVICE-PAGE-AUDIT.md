# Service page, preview and GRAIL audit — 22 October 2026

Scope: `/cold-email-agency`, consistency with the existing website, all current
social preview images, local preview reliability, and the GRAIL name/URL migration.
The `ideas` file was read; its other proposed pages and campaigns remain future work.

## Findings and fixes

- The service page already used the approved Manrope/DM Sans fonts, original
  wordmark and purple/neutral palette. These remain the site's visual foundation.
- The desktop headline consumed four lines. It now reads “Cold email agency.
  From list to booked call.” and fits two lines at 1440px, with a legible mobile
  layout. The existing guarantee is now visible beside the main decision and CTA.
- The service page lacked a dedicated proof section. It now links directly to
  Networked's 81 meetings, GRAIL's 12 meetings in 21 days, and Parking Compliance
  Systems' 26 qualified leads a day. These are existing, supplied case results.
- Consecutive plain sections now share the established 80px desktop / 56px mobile
  interval. Bordered/tonal section transitions retain the normal full insets.
- Service paragraphs and procedural labels are more legible; mobile header
  booking text and breadcrumbs are now 12px, with existing 44px interaction targets.
- The service panels now use the existing flat dark surface and shared corner
  radius. The approved site-wide CTA treatment remains unchanged.
- Three different social-image implementations had left the homepage and case
  studies using an older grid/glow treatment. One shared renderer now produces
  homepage, case-index, case, service and blog cards from the current typography,
  wordmark and palette. Old image addresses retain updated artwork. Metadata
  references a new versioned image URL to avoid reusing old image cache entries.
- The fallback `/og-image.png` now matches the current homepage artwork. Open
  Graph and Twitter images agree; all current image references resolve to
  1200×630 PNGs with alt text. Absolute canonical URLs remain correct.
- GRAIL is corrected in the source narrative, generator, homepage/index cards,
  case page, metadata, structured data, sitemap, proof link and social artwork.
  The canonical route is `/case-studies/grail`. Both `/case-studies/graiai` and
  `/case-studies/graiai.html` redirect directly to it with HTTP 301. A minimal
  noindex fallback file replaces the old full duplicate page. Historical audit
  records are retained as history.
- Concurrent local preview requests intermittently failed with connection-refused
  errors. The preview server now explicitly accepts a queue of 128 connections,
  rather than relying on its small default. This affects local authoring only.

## Verification

- `tools/build-site.py --preview` rebuilt the complete public site and isolated
  review preview, preserving all six approved articles.
- `tools/check-service-output.py` validates 18 current pages and 15 referenced
  social images: canonical/meta tags, internal links, image dimensions, FAQ
  answers, offer values, sitemap, GRAIL redirects and preview/source parity.
- `tools/qa-service-audit.mjs` checks 124 layouts: all 18 pages across six widths
  in Chrome, plus four representative pages across two widths in Firefox and
  WebKit. It also checks local asset requests, a 32-request concurrent asset
  batch, booking open/close/focus, configured Calendly embed, FAQ/mobile menu,
  redirects, the review preview, and content without JavaScript.
- WCAG A/AA axe checks cover the homepage, service page, GRAIL case and blog
  index. These automated checks do not constitute a complete accessibility audit.
- Eight blog publication-boundary tests and the existing public-blog checks pass.
  The approved article source files and approval hashes were not edited.
- Final result: 124 layouts passed, no local asset request failures, no reported
  axe violations on the four tested pages, all interaction and redirect checks
  passed, and 32 concurrent asset requests returned HTTP 200. The concurrency
  test was confirmed separately after correcting the test's native-fetch API
  usage; its provenance is recorded in the saved QA JSON.
- Header layout was also checked at 320px: no header overflow with the larger
  booking label. Browser emulation does not certify physical devices.
- Taste source lint reports no findings on the generated service HTML. Before/
  after measurements, screenshots and raw reports are retained under
  `.taste-skill/service-before`, `.taste-skill/service-after` and
  `evidence/service-audit/`.

## Design-tool interpretation

This was an implementation audit and refinement using Taste inspection and
Impeccable's polish/audit guidance, not a formal independent-agent critique.
Raw detector results are preserved rather than rewritten into a clean score.

Some generic Taste rules conflict with the approved website: purple CTA glow,
compact monospace data labels, a three-line mobile heading, and a mostly textual
service page. Stock photography, autoplay footage and a new visual identity were
not added to satisfy those rules. Its “icon cards” flag describes the trailing
navigation arrows on the new case-proof links, not decorative feature icons.
The transient broken-image finding was investigated as an actual preview-server
request failure and addressed in the server.

Impeccable also reports derived `color-mix()` colors as outside the literal
palette and misses some CSS-variable/nested-container padding. Actual browser
measurements show the intended section and panel insets, and the colors derive
from the approved tokens. Compact case-dashboard label warnings remain outside
the service-page redesign scope; the GRAIL case layout is preserved.

Questions skipped: the user expressly authorized judgment-based fixes; no new
business claims or changes to the commercial terms were required.

## Review

Local website: `http://127.0.0.1:4174/cold-email-agency` and
`http://127.0.0.1:4174/case-studies/grail`.

The user reviewed these changes locally and approved production publication on
22 October 2026. Production tracks the `alive` branch. Previously created hosting
deployments remain historical snapshots. Third-party
social services may need to fetch the page again before an existing cached share
reflects its updated metadata. Ranking improvements and FAQ rich results are not
promised by valid structured data.

Search Console indexing status and field Core Web Vitals were not available in
this workspace and were not certified by this audit.
