# Rebuild audit, 16 October 2026

Baseline: clean `alive` commit 5a37385. Work branch: `rebuild`. Production remains on `alive`; no automatic publication from this branch.

## Stack and build
Static HTML, CSS and vanilla JavaScript. No package manifest or compilation step. GSAP/ScrollTrigger 3.13.0 are local assets. Vercel clean URLs are enabled. Calendly and five Vimeo players load on intent. Existing fonts: Manrope and DM Sans. Current exact palette: #8A40EA, #4B1D8F, #161122, #6B6577, #FFFFFF, #F7F5FA, #F4EEFE, #D6D0DE.

## Pages and sections
- `case-study-arr-growth.html`: 3 sections. top, case-context, contact
- `case-study-investors.html`: 3 sections. top, case-context, contact
- `case-study-parking.html`: 3 sections. top, case-studies, contact
- `case-study-recruitment.html`: 3 sections. top, case-context, contact
- `case-study-spotlight.html`: 3 sections. top, case-studies, contact
- `index.html`: 15 sections. top, trusted-by, results, problem, process, infrastructure, pipeline-math, proof, case-studies, guarantee, pricing, founders, the-call, faq, contact

## Assets
Inventoried 353 tracked files, including runtime assets, five testimonial stills, two founder portraits and thumbnails, nine client wordmarks, eight font files, original campaign PDFs/JPGs, source/provenance files, legacy build helpers and screenshot/recording evidence. File hashes, sizes, runtime-page sections and referenced assets are recorded in tools/rebuild-inventory.json. Historical binary evidence is inventoried, not treated as fresh proof. The original square logo is a raster wordmark; rebuild its typographic identity as optically balanced SVG variants. The new six-study source is copied byte-for-byte to case-studies-copy.md and supersedes all old proof.

## Findings and changes
- Current daylight design uses two accumulated stylesheets and repeated explanatory graphics. Replace with one dark-first token system, native product graphics, shared components and short scroll entrances. Keep the brand hues and real faces.
- Existing proof includes the now-retired 240-meeting and 20% ARR claims. Replace homepage/case content with the six approved studies in source order. Build the index, six slugs, email cards, definitions and data dashboards.
- Preserve real HTML numbers, click-only media, keyboard focus, reduced-motion state and the working booking dialog.
- Add ROI/close-rate sliders, conservative-first break-even, scenario costs from actual pricing, 80% show rate and sales-cycle caveat. Dashboard volume curves will be mathematically reconstructed from supplied totals only, with chart descriptions explaining their derivation; no invented client identities or split metrics.
- Add canonical metadata, absolute per-page OG cards, JSON-LD, sitemap, robots, 404 and permanent old-URL redirects.
- QA all routes, controls, exact source copy, total sums, no-JS, reduced motion, contrast, mobile Lighthouse and browser engines. Real iOS/Android hardware verification will be distinguished from emulation.

## Open factual items
User approved Networked naming and Parking 500+ monthly. User explicitly directed 20 throughout, including GraiAI. PANDUSH TO CONFIRM: practical free-work scope/duration and testimonial names/roles/companies. No quote-slot placeholders will ship. No fake identities will fill missing testimonial attribution.

## SEO data availability
DataForSEO credentials detected in named environment variables: no. Keyword volume data needs a configured DataForSEO key. Installation and audit/on-page guidance proceed without it. No keyword volume will be invented.

## Plan
Install OpenSEO and Copy Master references next. Write the homepage copy deck with RMBC and a per-section quality review. Build dark shared components and all six exact-copy case pages, then complete SEO and a bounded visual/technical QA pass. This audit precedes implementation.

## Completed verification

See CHANGELOG.md and evidence/rebuild/FINAL-REVIEW.md. Final bounded confirmation: 96 layout/browser checks, zero axe violations, zero small controls, no overflow; local mobile Lighthouse 100/100/100/100. Browser emulation is distinguished from physical-device testing. Source narrative remains exact except the explicitly approved GraiAI 20-meeting correction.
