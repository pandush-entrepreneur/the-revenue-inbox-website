# The Revenue Inbox Website

Static landing page and case study pages for The Revenue Inbox.

The current motion and conversion pass lives on the `alive` branch. There is no build step. GSAP and ScrollTrigger 3.13.0 are vendored under assets/vendor. Production is published from `alive` through the existing Vercel project; `main` remains untouched. .vercelignore excludes development artifacts from the production upload.

## Pages

- `index.html`
- `case-study-investors.html`
- `case-study-arr-growth.html`
- `case-study-recruitment.html`
- `case-study-parking.html`
- `case-study-spotlight.html`

## Local Preview

```bash
python -m http.server 4173 --bind 127.0.0.1
```

Open http://127.0.0.1:4173. Documentation: `DESIGN.md`, `AUDIT.md`, `AFTER-AUDIT.md`, `CHANGES.md`. Visual evidence is in `evidence/before/` and `evidence/after/`; `evidence/index.html` provides a review gallery.

The latest “Alive” section in CHANGES.md supersedes the earlier redesign notes. COPY.md contains the approved-source copy deck and hero alternatives. DESIGN.md documents components, motion and exceptions. Evidence, desktop/mobile recordings and local Lighthouse reports are linked from evidence/alive/index.html. Parking and Spotlight retain their URLs as review notices because their figures are outside this pass's authorized proof set.

## Checks for the alive pass

With the preview server running, `node tools/qa-alive.mjs` checks every page at six widths and exercises booking, ROI, FAQ, video facades, reduced motion and no-JavaScript content. `node tools/capture-alive.mjs` captures storyboard frames; `node tools/record-alive.mjs` records Chrome compositor frames for short hero and mechanism clips. `node tools/check-alive-motion.mjs` verifies synchronized state and motion fallbacks. These tools use the adjacent local taste-skill CDP helper and are development-only; they are not required for deployment.

Tracking hooks are static data-event/data-location attributes plus the revenue-inbox:event DOM CustomEvent. No analytics provider or tracking request is installed. See CHANGES.md for the event contract and known external-video limitations.

