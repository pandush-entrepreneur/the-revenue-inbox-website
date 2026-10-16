## Blog editorial expansion, 16 October 2026

Reframed /blog as The outbound blog, removed its founders promotion and closing pitch, and corrected optical spacing around Blog in the header. Six original topic-specific SVG covers now replace the receipt/02 treatment on cards and article pages. The index has a featured article, a two-column reading grid and working search.

Added four unpublished review drafts: 7 B2B cold email templates, a seven-check deliverability guide with a reusable evidence log, a documentation-based Clay/Instantly/Smartlead workflow comparison with a trial scorecard, and a metrics guide with explicit denominators and calculations from approved case counts. Seven template blocks have progressive copy buttons. CTAs follow useful content and match the topic. Added a source/research brief and a varied next-topic queue; measured keyword volume and rankings are still unavailable.

QA: 90 responsive layouts across Chromium, Firefox and WebKit; no detected overflow, broken images, runtime errors, undersized controls or axe violations. Search/reset, calculator, mobile contents, booking and clipboard copying pass. All seven review pages pass metadata/link/cover checks. Mobile Lighthouse: Performance 100, Accessibility 100, Best Practices 100; LCP 1.8s. SEO scoring excluded on the noindex preview. These are local/emulated checks. Production remains unchanged; all six articles await founder review.

## Blog foundation and review drafts, 16 October 2026

Built on the blog feature branch from alive. Production is unchanged. Added a matching static blog index, article template, author profiles, RSS, per-article social cards, native cost calculator and publication checks. Two buyer-intent articles are review drafts, not approved publications. Public builds exclude them; a separate noindex preview allows review.

Installed 16 selected project-local SEO, strategy and writing skills alongside the existing OpenSEO skills. project-skills.json records source commits and content hashes. Claude-specific packages are reference workflows here, not native working plugin commands. Third-party helper scripts were not executed.

Added SEO-RESEARCH-PLAN.md, SEO-START-HERE.md, EDITORIAL.md and article briefs. US English is the initial market. Search volumes, difficulty and rankings remain unmeasured until keyword data is connected. Search Console and Analytics are not configured. No tracking provider, scheduled writer or automatic publisher was added. Booking clicks must not be reported as completed calls.

Validation: 8 publication tests; 50 responsive layouts across Chromium, Firefox and WebKit; no detected overflow, runtime errors, missing images, undersized controls or axe violations. Mobile Lighthouse preview: Performance 100, Accessibility 100, Best Practices 100. SEO scoring intentionally excluded because draft previews are noindex. See evidence/blog/REVIEW.md. These are local/emulated results, not production field measurements.

Needs Pandush's decision: review the two drafts before publication; supply the Google Search Console verification TXT record; provide a GA4 Measurement ID when ready; select keyword-data access/budget. The exact free-work remedy scope and duration remain unspecified, so drafts do not invent terms.

## Background-free original lettering and proof headline

Replaced the gradient logo tile with a clean SVG wordmark traced directly from the original artwork. Letter shapes, spacing and stacked composition now follow the source rather than a guessed typeface. Header, footer, favicon and social cards use the matching lettering. New asset URLs refresh the browser's cached logo.

Replaced the proof-strip headline with "The results. And the work behind them."

Checked eight Chrome widths plus desktop/mobile Firefox and WebKit: no overflow, missing images or CTA placement issues. Reviewed desktop/mobile captures of the wordmark and new headline.

## Original logo and trust strip corrections

Restored the exact supplied logo artwork instead of the redrawn wordmark and IN favicon. Optimized lossless WebP for the site; original PNG retained. CSS rounds the corners and crops unused gradient margins for legibility. Touch icons, favicons and OG badges now use the actual logo too.

Replaced all hero campaign-email snippets with original generic demo copy, including its initial HTML and reduced-motion fallback. Case-study emails remain unchanged.

Prepared faithful monochrome SVG versions of the supplied client logos with transparent backgrounds. Removed the global invert/blend behavior that created black rectangular patches. Reviewed desktop/mobile hero and trust-strip screenshots.

Production follow-up: direct301 routing verified; live mobile Lighthouse97/100/100/100. See CHANGELOG.md and evidence/rebuild/production-final.json.

# Rebuild, 16 October 2026

Rebuilt the homepage as a dark, native outbound workspace. Rewrote the copy, retained the brand palette and stacked logo identity, and used the approved promise: 20 qualified meetings in 30 days from campaign launch, or we work for free. The footer pricing microcopy remains removed.

Added a six-study index and six source-driven case pages with campaign dashboards, real KPI HTML, full email cards, merge tooltips/notes and counting definitions. Old case URLs have explicit 301 mappings. Removed retired 240-meeting/20% ARR claims. GraiAI uses the user-approved 20-meeting guarantee in its paragraph and chart; its actual result remains 12 in 21 days. Networked naming and Parking 500+ monthly were approved in conversation.

Added contract-value/close-rate controls, conservative-first break-even, 80% attendance, explicit scenario costs and sales-cycle timing. Pricing is one offer with the exact $3,500 worked example and a monthly volume slider. Calendly and Vimeo load on click. All primary booking links retain a direct fallback.

SEO includes unique short metadata, canonical URLs, absolute OG cards, Organization/Service/FAQ/Article/Breadcrumb schema, sitemap, robots, favicon and touch icons. All key results are in the initial HTML. DataForSEO is not configured, so keyword volume/ranking data was not fabricated.

Motion uses pinned local GSAP/ScrollTrigger 3.13.0, one hero handoff narrative, scroll-linked process connectors, offscreen pauses, reduced-motion end states, cursor effects and the mobile booking bar. No 3D or smooth-scroll hijack was added.

Validation: 96 responsive checks across Chrome, Firefox and WebKit at 360, 375, 390, 768, 1024, 1366, 1440 and 1920px in the main Chrome matrix; Firefox/WebKit at 390/1440. No overflow, runtime errors, broken images, missing anchors, initial players, undersized controls or axe violations. Tested 1366?768 and 375?667 hero CTAs. Slider math, filters, booking Escape/focus, media loading, native tooltips, no-JS and reduced motion pass. Final local mobile Lighthouse: Performance 100, Accessibility 100, Best Practices 100, SEO 100; LCP1.9s, CLS0.001, TBT0ms. This is emulation and browser-engine coverage, not physical iOS/Android certification. New OG files were rendered and metadata verified; public social caches must refresh after publication.

Impeccable's independent design and technical assessments and taste review are archived in evidence/rebuild/FINAL-REVIEW.md. Source-profile disclosure, dashboard legibility, low-contrast logo, heading hierarchy and filtered-feed motion findings were fixed. Screenshots, four clips and Lighthouse reports are linked from evidence/rebuild/index.html.

No analytics provider was present. data-event/data-location and the revenue-inbox:event DOM event expose cta_click, video_play, roi_toggle, pricing_toggle, faq_open, case_filter and campaign_segment. No tracking request was added.

## Needs Pandush's decision

- PANDUSH TO CONFIRM: the practical scope and duration of free work, including treatment of the infrastructure charge. The approved public promise is used without inventing additional terms.
- PANDUSH TO CONFIRM: names, roles and companies for the five testimonial captions. Real videos and qualitative captions are present; invented identities and quote placeholders are excluded.

## Publishing

Work is preserved on rebuild and published through the production branch alive. main remains untouched. Vercel must continue tracking alive so an obsolete main deployment cannot replace the site again.


---

# Alive

## Production restore, 16 October 2026

Production reverted because Vercel's production Git branch was still `main`, while the approved redesigned site was on `alive`. Later SEO commits and their reverts on `main` triggered automatic production deployments of the older design. The last overriding production commit was `7fe2fb3` at 22:10 UTC on 15 October.

Restored the approved deployment `dpl_GimcRkJzND3skhyNkji31LgVEjSa`, sourced from `alive` commit `1d2df15`. Changed the existing Vercel project's production Git branch from `main` to `alive` and verified the setting through the project API. Future website changes must branch from and return to `alive`; pushes to `alive` now publish production automatically. No main-branch files or commits were overwritten.

The approved free-work guarantee and removal of the pricing note beneath the final CTA remain intact. This incident changed deployment routing and documentation, not the site's design or offer.

## Approved production revision

- Replaced the money-back guarantee with “or we work for free” in the hero, guarantee, FAQs, final close, case pages, metadata and current copy deck. The user explicitly approved this offer change. The 20-qualified-meeting commitment and 30-day campaign-launch clock remain.
- Removed the pricing/no-long-contract note beneath the final booking button on all six pages, as requested. Pricing stays visible in the hero and offer section.
- Fixed the DESIGN.md frontmatter indentation and normalized SVG viewBox attributes while reviewing source validity.
- Rechecked desktop/mobile rendering and the six-page/six-width interaction suite before release. Updated captures are in evidence/alive/.
- Production publication is authorized from `alive` through the existing Vercel project. `main` remains untouched. Added .vercelignore to keep development evidence, source archives, tools and documents out of the production upload.

The user's new free-work guarantee supersedes the earlier money-back wording in the historical audit and notes below. No unapproved free-work duration, refund entitlement or infrastructure-fee exclusion has been added.

Current pass: `alive`, based on the clean local `redesign` checkout. No main push or production deployment. The earlier redesign notes below are historical and are superseded by the current offer facts supplied for this pass.

## What changed

- Verified the previous essentials before editing: no Canva embed, real nonzero HTML stats, five click-to-load video facades, and the exact Meerion Ltd legal sentence.
- Wrote COPY.md before implementation. It includes all section copy, three hero options with rationale, the selected outcome/timeframe/recourse headline, case copy and before/after examples.
- Rebuilt the page around the requested conversion sequence. Hard proof precedes explanation. Every primary action books the same strategy call. Current prices and the launch qualifier are visible in the hero.
- Built an original illustrative inbox, interested reply and calendar in native HTML/CSS. Built a five-stage scroll story with a lead that arrives at each node before its explanation changes, then lands on the calendar. Booking status changes at the actual final arrival.
- Added an infrastructure checklist with no invented health scores. Proof art encodes only the approved 18 investors, 240 meetings and 1-in-115 reply result. Original logo, client logos, founder portraits, video stills and destinations remain.
- Added pinned GSAP/ScrollTrigger 3.13.0, hosted locally from pinned cdnjs distributions. Headline reveals, near-final count-up, card depth, fine-pointer button magnetism, graphic parallax, responsive marquee and a single coordinated inbox loop bring movement. The page does not intercept native scrolling.
- Added motion pause/resume, off-screen/tab visibility pausing and complete reduced-motion cleanup. Mobile and shorter desktops never pin. The phone mechanism uses the explanatory route plus a compact calendar instead of repeating the route in another tall board.
- Replaced the old unexplained $18,000 ROI basis. The conservative illustration is 60 meetings over 90 days, 48 attended at 80%, 3 deals rounded down at 8%, and $10,500 fees calculated directly from the published pricing. Defaults to $15,000 contract value. It leads with one whole deal to cover modeled fees. Sales-cycle and gross-revenue-before-delivery-cost caveats precede the result. These assumptions are labeled illustrative, not campaign results or a forecast.
- Corrected investor proof to $1.2M in pipeline and 18 committed investors. Removed unapproved campaign details, invented trend implications, old service-only/all-inclusive plans and unsupported delivery cadence. Pandush's earlier $2.5M copywriting result appears in his bio only. His cold-email meeting count remains separately scoped to the last two years.
- Restyled the three approved case-study pages with shared native metric graphics and current offer components. Parking and Spotlight URLs remain usable as transparent review notices pointing to approved results. Their prior figures are outside this pass's explicitly authorized proof set.
- Added a native booking dialog with a click-created Calendly embed, visible direct-link fallback, keyboard close, focus return and scroll lock. Vimeo remains click-only with a direct fallback after activation. There are no third-party frames on initial load.
- Added the mobile booking bar after the hero and hid it near the final action. Rewrote title, description, OG and Twitter metadata; kept existing social assets and added canonical URLs.
- Extended DESIGN.md with tokens, component rules, choreography, responsive behavior and explicit exceptions to generic skill rules. No 3D was shipped: the native inbox communicates the service directly without a WebGL runtime.

## Tracking

No analytics provider existed in the repo. No provider, cookie or tracking network request was added. Static `data-event` and `data-location` hooks are present. JavaScript dispatches `revenue-inbox:event` on document, with detail:

| Event | Extra detail |
|---|---|
| cta_click | location: navigation, hero, proof section, ROI, pricing, final, footer or mobile-sticky |
| video_play | video: existing Vimeo ID |
| roi_toggle | contract_value: 15000, 25000 or 50000 |
| faq_open | question: visible question text |

Attach a consent-aware analytics adapter to this event later. No lead data is collected by these hooks. Calendly and Vimeo operate only after visitor intent.

## Needs Pandush's decision

The supplied offer facts resolve the old plan, pricing, guarantee wording, investor pipeline and headline questions. No further approval was needed to implement them. Remaining business/external checks:

1. **Free-work administration:** the user approved “or we work for free.” Align contractual billing details with that promise. The site does not invent a duration, refund entitlement or infrastructure-fee exclusion.
2. **Parking and Spotlight:** approve these campaigns explicitly if you want their previous figures republished. Until then their existing URLs display a review notice.
3. **Proof attribution and dates:** supply consented names, titles, companies and dates if you want them beside anonymized testimonials/cases. None were inferred or fabricated.
4. **Vimeo permissions and captions:** verify all five videos can play on the production domain, and confirm approved captions/transcripts. Prior local embedding returned 401. Current code keeps direct Vimeo links available; a local technical check cannot certify production privacy settings or spoken-caption accuracy.

## Evidence and validation

Review gallery: [evidence/alive/index.html](evidence/alive/index.html). It links desktop/mobile screenshots, four short hero/mechanism MP4 recordings, all six case/home page captures, interaction evidence, Lighthouse and audit notes. Recordings capture actual browser frames and are encoded with FFmpeg; they are not synthetic animation mockups. Raw frames are development artifacts excluded from Git.

Six pages were checked at 360, 390, 768, 1024, 1440 and 1920px. Checks cover overflow, images, anchors, heading structure, 44px targets, deferred embeds, legal copy, ROI output, booking dialog/Escape/focus, FAQ and event hooks, sticky CTA, no-JavaScript and reduced motion. A separate motion check covers 1024×768, all five synchronized stages, calendar arrival, video pause/resume and live reduced-motion switching.

Impeccable critique used two isolated assessments. Initial visual score: 7.8/10. Findings drove the shorter mobile hero, compact mobile mechanism, synchronized desktop state, short-viewport fallback, accessible video names and reliable Resume behavior. Technical and visual review details, measured Lighthouse scores and narrow detector exceptions are recorded in ALIVE-AUDIT.md. Emulated viewports and local headless Chromium do not certify physical-device 60fps or production caching.

---

# Redesign history

## Case-study and logo revision

Completed the follow-up on the same `redesign` branch:

- Replaced every case-study campaign screenshot with a shared native report: total sent, reply rate, opportunities and the exact source window. Final values are static HTML; metric groups enter once with reduced-motion support.
- Removed all calendar/reply “Campaign evidence” sections. Retained useful campaign facts in the narratives. The investor case now has an original native conversion chart using its existing 470 replies,188 bookings,132 attended meetings and18 investors. No daily trend data was invented.
- Added `case-study-parking.html`:148 opportunities from58.7K emails at7.35% in the latest four weeks. The PDF's earlier50-opportunity snapshot is clearly separate.
- Added `case-study-spotlight.html`:159 qualified opportunities from221.4K emails at1.75% in under90days. The copy explains the free-article offer and labels $159K as pipeline, not closed revenue.
- Added homepage filters for software, fundraising and recruitment. All five cases remain visible without JavaScript.
- Added GRAIL, SMPL-C, EventRx and VTS Labs, using assets from their official sites. Cropped Networked to its original name without the symbol.
- Following the latest spacing feedback, omitted SkyHigh, removed the pause button and autoplay, and used nine smaller wordmarks in one line with natural widths and even visible gaps. The row scrolls natively on narrower screens.
- Archived old image derivatives under source-assets; no campaign screenshots or pasted reply quotations remain on the case-study pages.

The source manifest, PDF transcriptions and visual-source contact sheets are in `source-assets/client-updates/`. Current captures and checks are in `evidence/revision-2/`. The previous section below records the first redesign for history; this revision supersedes its screenshot-evidence presentation.

Implemented on `redesign`. No push or production deployment. Same static HTML, CSS and JavaScript; same Vercel configuration and case-study URLs.

## What changed and why

- Replaced gradients, glow, glass and repeated feature tiles with a light editorial system. Proof and the people behind the service are visible immediately.
- Preserved the exact original logo file. Brand purple remains #8A40EA; white, existing ink and derived neutral surfaces carry most of the page.
- Introduced self-hosted Manrope and DM Sans, seven semantic type steps, a 4/8px spacing system and shared components across all four pages.
- Published 1,000+, $2.5M+, investor and campaign figures in real HTML. Removed counter effects that displayed zero or hid content without JavaScript.
- Rebuilt the Canva material natively. All 39 slides were extracted from the public browser presentation after the promised export folder proved absent. Pillars, fit criteria, internal 80+ meetings/month claim and call expectations map to native sections; repeated slide rhetoric was removed. See source-assets/canva-deck/README.md.
- Kept all five Vimeo videos and their original quotes. Higher-resolution local stills, matching 4:3 frames, custom play controls and click-only players replace eager embeds. Plain links still work without JavaScript.
- Rebuilt homepage case links and full case pages with the same design system. Preserved original narrative facts, added full-size evidence links, cropped campaign screenshots away from old slide artwork and transcribed recruitment replies into native quotes.
- Normalized client logos optically in monochrome. Both founders use matching 4:5 portrait framing; short bios preserve their existing experience and real LinkedIn destinations.
- Preserved all ROI scenarios, ACV options, calculations, break-even numbers and disclaimer. Replaced custom radio imitation with native inputs. Mobile table scroll is explicit and its stage column stays visible.
- Made both pricing charges visible together. Removed “Or you don't pay” from the hero, retaining the existing money-back promise beside pricing pending a decision on its scope.
- Added native FAQ/menu disclosures, keyboard handling, visible focus, reduced-motion treatment and resilient static reading. All booking actions use the supplied Calendly destination.
- Added the supplied Meerion Ltd legal identity and usable footer links.
- Kept original metadata, OG assets, PDFs and source images. Modern WebP derivatives have intrinsic dimensions; below-fold images are lazy. The exact logo and social preview remain original PNGs by design.
- No 3D: actual results and people provide stronger evidence without another runtime or LCP risk.

## Needs Pandush's decision

| Issue | Current evidence | Recommendation |
|---|---|---|
| Refund scope | Old hero says “Or you don't pay”; pricing adds $1,500/month infrastructure; guarantee promises money back under 20 meetings | Approve a single contractual promise specifying whether infrastructure, appointment fees or both are refunded. Use that wording in guarantee, FAQ and metadata. No new refund exclusions were invented. |
| 20 versus 20+ | Hero used 20+; guarantee says at least 20 within 30 days of launch | Use “At least 20 qualified meetings within 30 days of campaign launch”, with approved refund scope attached. Hero now makes the factual service promise without the conflicting shorthand. |
| Multiple plans | FAQ still refers to all-inclusive and service-only plans; pricing shows one appointment-based model | Confirm whether those plans still exist. If only one model remains, replace the infrastructure FAQ with that model's exact terms. Existing answer retained pending approval. |
| ROI break-even cost | Original JS uses $18,000 for all scenarios; current pricing varies with booked appointments | Approve a scenario-specific total cost formula or define the $18,000 program basis. Original numbers remain, with a visible model-basis note. |
| Investor money status | Old homepage called $1.2M both raised and “in the pipeline”; full page/PDF/deck call it raised | Verify closed funds versus commitments. Current presentation follows the full case-study wording; no new amount introduced. |
| ARR case headline | Current HTML says 240 meetings/month; original PDF title says 81; Canva deck says 240 | Confirm the time period and correct figure. Published HTML facts preserved. Keep campaign dates available to explain the difference. |
| ARR source-image mismatch | Old image alt said 110K sent / 195 opportunities; actual image shows 421.2K / 576 / 3.65% | Corrected inaccurate alt to a neutral description; native caption transcribes the real image. Existing 195 opportunities result snapshot remains. Confirm which month each result covers. |
| ARR definition | “20% ARR growth month after month” and a 12-month chart with varying monthly growth | Confirm ARR versus MRR and whether 20% is an average, specific period or shorthand. Existing claim retained. |
| Recruitment booking rate | Original HTML reused a40–50% booking-rate claim, but the supplied recruitment evidence establishes475 positive replies rather than a booking conversion | Removed that unsupported conversion claim from the revised copy. Reintroduce only with the campaign's booking records. The positive-reply and overall-reply figures remain unchanged. |
| Proof attribution | Five videos and three case studies lack approved names, titles and company attribution | Supply consented identities and relevant dates. Nothing fabricated or inferred from uploader identity. |
| Internal 80+ meetings | Existing Canva slide 2 says the agency generates 80+ qualified meetings/month | Confirm the claim is still current before launch. Preserved in the native process introduction as existing source content. |
| Client logo resolution | Several originals are small raster assets; Networked wordmark is 300px wide | Obtain original vector artwork when available. Faithful raster contour/tone normalization used; no invented redraw. |
| Video accessibility | Existing Vimeo captions/transcripts were not supplied or comprehensively verified | Add approved captions/transcripts in Vimeo. Automated accessibility100 does not certify spoken media content. |
| Vimeo playback | A final local headless player request returned HTTP401; OEmbed thumbnails were accessible | Check each video's embed/privacy settings for therevenueinbox.com and www.therevenueinbox.com and verify playback on the deployed preview. An explicit “Open video on Vimeo” fallback is available after activation. No credentials or privacy settings were changed. |

## Validation and evidence

Before screenshots and scan: evidence/before/. After full-page, section and viewport captures: evidence/after/. Full native source mapping: source-assets/canva-deck/.

Chromium checks cover 360, 390, 768, 1024, 1280, 1440 and 1920 on all four pages; mobile menu, disclosures, model, players, static HTML, anchors, targets, metadata and asset paths are checked. See AFTER-AUDIT.md for measured results and limitations. No browser compatibility or real-device performance result is implied by headless Chromium evidence.
