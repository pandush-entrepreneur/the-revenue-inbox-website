# Blog review, 16 October 2026

Scope: new editorial surfaces on the blog branch. Production remains on alive. Two unapproved articles exist only in the separate review output.

## Evidence

- qa.json and qa-console.txt: 50 layouts across Chromium at 360, 390, 768, 1024, 1440 and 1920px, and Firefox/WebKit at 390/1440px. Five surfaces checked. No overflow, missing images, runtime errors, broken anchors, undersized controls or axe violations.
- Interactions verified: calculator at 40 meetings gives $5,500 and $137.50; mobile contents opens and anchors correctly; booking dialog opens and closes with Escape. Search is withheld until the collection needs it.
- Eight publication tests verify exclusion, required approval, content hashes, future dates and cross-platform newline handling.
- withdrawal-check.json: withdrawn draft pages are removed when a preview rebuilds, rather than lingering from a previous build.
- lighthouse-mobile.report.html/json: Performance 100, Accessibility 100, Best Practices 100; LCP 1.7s. SEO deliberately excluded on noindex review pages. Local emulation is not a field-performance guarantee.
- Desktop/mobile index, pricing article, comparison article and author screenshots are alongside this report. Full-page captures are included for the index and pricing guide.

## Impeccable critique and polish

Two independent assessments were requested under Impeccable's critique workflow. The design assessor reviewed source and saved screenshots without seeing the detector output; its overall assessment was 25/32. The technical assessor used the detector and reviewed implementation. Native browser inventory was unavailable to those assessors; their reports were not live-browser tests. Parent verification used actual Playwright Chromium, Firefox and WebKit.

Findings addressed: mobile contents now starts collapsed; wide tables carry a swipe cue; search is omitted for a two-post collection; small functional labels were enlarged; blog social metadata uses article type; a preview-manifest bug that retained withdrawn HTML was fixed and regression-checked. Detector findings involving existing decorative numbers, derived purple shades and the user-approved dark/glow identity were assessed in context, not blindly removed. Final functional accessibility checks show no axe violations.

Taste review: preserved the approved original-lettering logo and palette. The index uses one native cost receipt and a quieter second guide rather than a generic card wall. Article pages prioritize readable prose and inspectable calculations. No added stock art, invented campaign results, fake author approval, speculative search-volume claims or decorative animation.

## Remaining limits

Founder review is pending. No articles are published. Google tools are not connected. Keyword demand and ranking difficulty are not yet measured. Device coverage is browser-engine emulation, not physical iOS/Android certification. No completed-booking analytics integration is claimed. Draft previews are noindex, which is not an access-control mechanism; remote deployment protection must be checked separately.
