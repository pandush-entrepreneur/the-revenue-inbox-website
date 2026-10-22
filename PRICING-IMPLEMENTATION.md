# Three-plan pricing and More navigation — 22 October 2026

## Confirmed offer

| Plan | Monthly agency base | Per qualified booked meeting | Infrastructure | Guarantee |
| --- | ---: | ---: | --- | --- |
| Basic | $0 | $100 | Client pays vendors for domains, mailboxes and tools, then shares access | No 20-meeting guarantee |
| Standard | $1,500 | $100 | We buy and manage infrastructure | 20 qualified meetings in 30 days from campaign launch, or we work for free |
| Express | $2,500 | $100 | Everything in Standard; prewarmed domains and mailboxes | Same as Standard |

Founder-confirmed Express launch clock: campaigns go live on day 3, meaning three
calendar days after payment, required inputs and approvals are complete. This is
separate from the 30-day meeting-guarantee clock, which begins at campaign launch.

## Implementation

- `/pricing` contains all three plans, an interactive monthly calculator, a
  semantic comparison table, qualification/guarantee FAQs and strategy-call CTAs.
- Basic's default calculator result is the meeting fee **plus vendor costs**.
  No vendor prices are invented. An optional client budget supports dollars and
  cents; invalid amounts show an accessible error instead of a misleading total.
- Example: 20 booked meetings means $2,000 plus vendor costs on Basic, $3,500
  on Standard, or $4,500 on Express. These are fees, not forecast results.
- The primary navigation contains The system, Case studies, Blog, The math and
  More. More contains Cold email agency and Pricing in both desktop and mobile
  navigation. The footer also links to `/pricing`.
- More opens on desktop hover and supports pointer movement into the panel,
  keyboard Enter/Arrow Down, Escape with focus restoration, outside click and
  mobile tap. Native details links remain usable without JavaScript. Focus-loss
  handling preserves the native touch-link click before closing the disclosure.
- Homepage and service-page prices are explicitly labeled Standard where
  appropriate; their guarantees are qualified for Standard and Express only.
- Existing article calculators are labeled Standard examples. Two relevant
  articles have a generated current-pricing notice linking to `/pricing`.
  The six approved article source files and founder approval hashes are unchanged.
- Pricing has a canonical URL, absolute versioned OG/Twitter image, truthful
  Service offers with separate monthly/meeting price specifications, FAQ schema,
  breadcrumbs, sitemap entry, clean route and `/pricing.html` permanent redirect.
- The full build includes pricing before the blog/review preview. Plan facts are
  recorded in `content/pages/pricing.json` and shared through `tools/pricing_data.py`.
  No global skill changes, framework migration or new runtime dependencies.

## Verification

- `tools/test-pricing.py`: seven checks for prices/guarantee eligibility, Express
  clock, equal-volume comparisons, unknown vendor costs, schema/FAQ parity,
  shared navigation on all 19 current pages and article update notices.
- `tools/check-service-output.py`: 19 pages, 16 referenced social images, canonical
  URLs, internal links, schema, sitemap, GRAIL redirects and review-preview parity.
- `tools/qa-pricing.mjs`: 55 responsive layouts across Chrome, Firefox and WebKit;
  zero layout, asset, font or page-error failures. Eight interaction groups pass.
  Chrome and WebKit touch navigation and no-JavaScript fallbacks pass.
- Pricing-page axe WCAG A/AA checks pass in all three engines at 390px and 1440px.
  Automated checks do not certify physical devices or a complete manual audit.
- Calculator checks cover 0, 20 and 60 meetings, a $200.50 vendor budget, a negative
  budget, clearing the budget and the Basic/Standard/Express booking buttons.
- Eight existing blog publication-boundary tests and both existing public and
  editorial-preview output checks pass. Pricing checks ran locally; the existing
  CI workflow remains unchanged because the GitHub connection lacks workflow scope.
- Desktop, tablet and the complete mobile page were reviewed visually. Evidence
  is under `evidence/pricing`; Taste measurements are under `.taste-skill/pricing`.

## Design diagnostics

The existing typography, purple palette, wordmark, spacing and flat dark panels
remain authoritative. Impeccable's remaining flags concern the inherited CTA glow,
derived `color-mix()` colors, compact footer text and nested/container padding.
Actual responsive layouts, contrast checks and interactions are verified in browsers.

Taste's generic media/motion, huge-focal-headline and icon-card rules are not used
to turn a pricing comparison into a media landing page. The three panels are the
three user-specified plans; their check icons are feature markers, not placeholder
illustrations. The comparison table deliberately scrolls in a labeled region on
mobile, with an explicit swipe cue. Raw diagnostics are retained without claiming
a clean generic design-tool score.

## Review

Preview: `http://127.0.0.1:4174/pricing`.

The user reviewed the local implementation and approved production publication.
The release is prepared on `work/pricing-plans` and production tracks `alive`.
