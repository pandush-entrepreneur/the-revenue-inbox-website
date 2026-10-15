# Redesign

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
| Proof attribution | Five videos and three case studies lack approved names, titles and company attribution | Supply consented identities and relevant dates. Nothing fabricated or inferred from uploader identity. |
| Internal 80+ meetings | Existing Canva slide 2 says the agency generates 80+ qualified meetings/month | Confirm the claim is still current before launch. Preserved in the native process introduction as existing source content. |
| Client logo resolution | Several originals are small raster assets; Networked wordmark is 300px wide | Obtain original vector artwork when available. Faithful raster contour/tone normalization used; no invented redraw. |
| Video accessibility | Existing Vimeo captions/transcripts were not supplied or comprehensively verified | Add approved captions/transcripts in Vimeo. Automated accessibility100 does not certify spoken media content. |
| Vimeo playback | A final local headless player request returned HTTP401; OEmbed thumbnails were accessible | Check each video's embed/privacy settings for therevenueinbox.com and www.therevenueinbox.com and verify playback on the deployed preview. An explicit “Open video on Vimeo” fallback is available after activation. No credentials or privacy settings were changed. |

## Validation and evidence

Before screenshots and scan: evidence/before/. After full-page, section and viewport captures: evidence/after/. Full native source mapping: source-assets/canva-deck/.

Chromium checks cover 360, 390, 768, 1024, 1280, 1440 and 1920 on all four pages; mobile menu, disclosures, model, players, static HTML, anchors, targets, metadata and asset paths are checked. See AFTER-AUDIT.md for measured results and limitations. No browser compatibility or real-device performance result is implied by headless Chromium evidence.
