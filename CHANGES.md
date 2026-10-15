# Alive

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

1. **Refund administration:** keep the exact supplied money-back promise. Confirm the contract's refund process and scope before publishing contractual terms elsewhere. No refund exclusions, setup deadline or processing window were invented on this site.
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
