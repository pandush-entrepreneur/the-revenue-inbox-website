# The Revenue Inbox website

Static HTML, CSS and vanilla JavaScript on Vercel. No production build step. GSAP and ScrollTrigger 3.13.0 are vendored under assets/vendor. The rebuild work starts from alive on the rebuild branch. Vercel production tracks alive; main is historical. Do not deploy main over the current site.

## Pages

- /: homepage
- /case-studies: filterable index
- /case-studies/parking-compliance-systems
- /case-studies/spotlight-skyhigh-creatives
- /case-studies/networked-sales-meetings
- /case-studies/graiai
- /case-studies/networked-fundraise
- /case-studies/sales-recruitment

Legacy case-study URLs redirect permanently to their replacement slugs through vercel.json. The 404 page is noindex.

## Development

Run `python tools/serve-rebuild.py` and open http://127.0.0.1:4174. This server reproduces extensionless URLs and legacy redirect responses. Deployment serves the committed static files directly.

`tools/build-rebuild.py` is an authoring generator, not a production dependency. Install Python markdown 3.8.2 and beautifulsoup4 before running it. It reads the original case-studies-copy.md and generates static pages, routing, schema and sitemaps. The user-approved GraiAI guarantee correction is explicit in this generator. Brand assets are built separately by tools/build-brand.py using licensed glyph outlines and Pillow.

The gitignored reference directory contains Copy Master, downloaded font sources and QA dependencies. OpenSEO skills are installed in .agents. Neither directory is deployed. DataForSEO keyword-volume access needs a key; no volume data is invented.

## Verification

`node tools/qa-rebuild.mjs` exercises eight pages at responsive widths, Chrome/Firefox/WebKit, static content, sliders, filters, tooltips, booking and no-JavaScript fallbacks. It uses Playwright and axe-core installed under reference/qa. Mobile sizes emulate devices; they do not establish physical iOS/Android certification.

COPY.md contains the homepage copy deck. case-studies-copy.md is the supplied source. DESIGN.md is the current token/component/motion system. AUDIT.md records baseline and verification. CHANGELOG.md and CHANGES.md record current changes and open facts. Current screenshots, recordings and reports live in evidence/rebuild, excluded from deployment.

Tracking uses data-event/data-location attributes and the revenue-inbox:event DOM CustomEvent. There is no analytics provider or tracking network request. Calendly/Vimeo are loaded on visitor action.
