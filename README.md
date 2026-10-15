# The Revenue Inbox Website

Static landing page and case study pages for The Revenue Inbox.

The redesign lives on the `redesign` branch. There is no build step or runtime dependency. Deploy the root folder with the existing Vercel setup.

## Pages

- `index.html`
- `case-study-investors.html`
- `case-study-arr-growth.html`
- `case-study-recruitment.html`

## Local Preview

```bash
python -m http.server 4173 --bind 127.0.0.1
```

Open http://127.0.0.1:4173. Documentation: `DESIGN.md`, `AUDIT.md`, `AFTER-AUDIT.md`, `CHANGES.md`. Visual evidence is in `evidence/before/` and `evidence/after/`; `evidence/index.html` provides a review gallery.

Review the “Needs Pandush's decision” list in `CHANGES.md` before publishing contractual claims. The implementation preserves existing terms rather than inventing a refund policy or changing case-study figures.

