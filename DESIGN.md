---
name: The Revenue Inbox
description: A dark product workspace for earned outbound evidence and clear commercial terms.
colors:
  primary: "#8A40EA"
  deep: "#4B1D8F"
  ink: "#161122"
  paper: "#FFFFFF"
  soft: "#F7F5FA"
  tint: "#F4EEFE"
  line: "#D6D0DE"
---

# Design system

The homepage persuades. Case pages let a skeptical founder read the work and inspect its numbers. The visual world is a real outbound workspace: compose, inbox, reply, calendar. Dark surfaces, generous margins, actual client marks and readable campaign emails make the identity specific to this business.

## Tokens

The original palette remains authoritative. No new hue is permitted. CSS custom properties in styles.css are the implementation source.

| Token | Value or derivation | Use |
|---|---|---|
| primary | #8A40EA | Actions, chart marks, focus accents |
| deep | #4B1D8F | Selected states, selection |
| ink / panel | #161122 | Dashboard and calculator surfaces |
| bg | 65% ink mixed with black | Page ground |
| panel-raised | 92% ink, 8% line | Raised surfaces |
| text | #F7F5FA | Body and headings |
| muted | 76% line, 24% original muted #6B6577 | Secondary copy |
| accent | 40% primary, 60% tint | Accessible purple text |
| rule | 14% line, transparent | Fine separators |
| rule-strong | 42% primary, transparent | Selected borders |
| glow | 12% primary, transparent | Restrained hero depth |

Manrope 600 is the display face. DM Sans 400/500 is the body face. Both are existing self-hosted WOFF2 assets. UI labels use the system monospace stack. All numeric results use tabular figures. Body is 17px, small copy 14px, data labels 9 to 12px inside dense dashboard UI. Heading size uses clamp(32px,3.7vw,52px). Hero text uses clamp(42px,4.9vw,70px); mobile scales to the available width. Source case headlines may wrap naturally.

Spacing follows the existing 4px scale. Section insets are 80px desktop and 56px mobile. Adjacent sections on the same plain surface split one interval between them rather than doubling it. Container is 1248px, increasing to 1320px on wide screens. Gutters are clamp(24px,4.5vw,72px). Radii are 8px for controls, 12px for email cards, 16px for standard panels, 20px for calculators. Shadows stay soft and dark.

## Brand assets

The website wordmark is a clean vector trace of the actual lettering in The Revenue - 1.png. Its glyph shapes, THE placement, kerning, line proportions and overall composition follow the source artwork directly. The purple gradient is removed. Use wordmark-white.svg on dark surfaces and logo-light.svg on light surfaces. The source image and lossless conversion remain archived. Header width is 96px desktop and 80px mobile; object-fit:contain preserves the full lettering. No cropping or gradient tile surrounds the displayed wordmark. Favicons and OG cards use the same source lettering; favicon exports use a neutral solid ground for legibility. No replacement typeface or invented monogram. Client logos come from existing assets or the clients' own websites. Never redraw their names into invented marks.

## Components

- **Revenue scene:** native compose card, inbox row, interested reply, calendar slot and the real Networked 81-meeting result. No fake person or company identity. First lines rotate through original generic demo copy. Never use case-study email lines in the hero. The CTA precedes the graphic on mobile.
- **System pipeline:** five readable steps connected by one scroll-linked rule. Dedicated infrastructure and the five-minute response handoff are visible mechanisms. Mobile stacks the same complete content.
- **Case card:** client identity, large source result, mini dashboard, source metric chips and one whole-card link. Source order remains fixed. Index filters expose All, SaaS, Hard markets, Fundraising and Recruitment.
- **Dashboard:** campaign-window label, static source KPIs, chart, explicitly labeled funnel conversions, representative role-based activity and Running/Completed status. Charts reconstruct aggregate totals and the supplied ramp profile. SVG descriptions disclose this. Relative day/week labels avoid invented dates. Funnel widths use a stated square-root scale, with exact counts and rates beside each stage. No invented vertical splits. Spotlight controls filter representative activity while retaining aggregate totals.
- **Email card:** original first-touch text and original line breaks. Merge fields are keyboard/tap accessible buttons with viewport-clamped tooltips. A native details panel preserves the supplied merge-field notes without JavaScript. Sender is visually redacted. No invented subject or sender identity.
- **ROI lab:** contract-value slider and presets, close-rate slider, conservative break-even first, six-stage flow, three scenarios and explicit fees. Attendance is 80%, deals round down to whole contracts. Revenue follows the reader's sales cycle. Controls update one model, without fabricated client results.
- **Pricing:** one offer, exact worked example, appointments slider, total and effective cost. $100 per qualified booked appointment plus $1,500/month infrastructure, rolling monthly.
- **Video facade:** real thumbnail and click-to-load Vimeo player. No initial third-party player requests. Missing attribution is never filled with an invented name.
- **Booking:** native dialog, Calendly loaded only on click, Escape/backdrop close, focus restoration and direct-link fallback. Modified clicks retain browser behavior.
- **FAQ / definitions:** native details elements. FAQ answers match JSON-LD and current offer terms. How we count appears on every study.
- **Mobile booking bar:** appears after the hero and hides at the final CTA.

## Motion

GSAP and ScrollTrigger 3.13.0 are local pinned assets. No smooth-scroll hijack, WebGL or heavy background video. Use power3.out, equivalent to the CSS cubic-bezier(.16,1,.3,1), for 400ms entrances; hover/press transitions use 180ms. Animate transforms and opacity. Typing and numeric text are the requested semantic exceptions.

The hero is a sequential 9.2-second narrative with a 1.2-second resting interval. Only the active handoff moves clearly. The real 81 and 1,000+ values exist in HTML before enhancement. Offscreen loops pause, hidden tabs pause, testimonial playback pauses ambient motion. Logos move only after the hero scene leaves the viewport. Feed activity scrolls at a slow pace on case pages. Dashboard charts enter once. Buttons receive a small magnetic offset only with a fine pointer. Cards use restrained lift and a cursor-following glow.

Reduced motion provides the complete static end state, restores all source values, removes feed clones and disables magnetic effects. The user also has a Pause motion control. Body copy never receives parallax. No content depends on animation completing.

## Accessibility and layout

One H1 per page. Native landmarks, links, buttons, range inputs and details controls. Visible focus rings. 44px minimum interactive dimensions. Strong light-on-dark contrast; purple text uses the light accent, never raw primary on dark. All product content exists in the initial HTML. Logo overflow and decorative glow are clipped locally. No global clipping hides layout defects.

## Brief-specific taste decisions

The user's explicit dark-first purple direction authorizes soft brand glows, restrained gradient borders, dashboard grids and small mono labels. These are narrow exceptions to generic anti-template taste warnings. Repeated decoration, fake analytics, stock images, holographic objects and unrelated colors remain excluded. The source case narratives override generic copy patterns; the user-approved GRAIL guarantee correction is the sole factual source-copy exception.

Client strip assets use SVG-native luminance-to-alpha normalization of the supplied logos. The white rectangular image backgrounds disappear, with original contours retained in monochrome. Display these prepared assets without invert or blend-mode filters; animate opacity/transform only.

## Blog and editorial pages

Mode: Read. The blog inherits the dark palette, wordmark, fonts, spacing and booking action. The index is a publication headed The outbound blog. One featured article leads into a two-column article grid, stacked on mobile. Search appears once five articles exist. No founders promotion or closing sales section on the index.

Every article has its own original topic-specific SVG cover at 3:2, using the existing purple and neutral tokens. Covers depict email, authentication, tool routing, billing components or source-defined metrics. No generic number placeholders, stock imagery or invented software results. Use full compositions without cropping on mobile. Text within the cover is complemented by descriptive alt text and article captions. Covers are generated by tools/build-blog-covers.py; no continuous animation on reading pages.

Article measure is 760px, body 18px desktop/16px mobile, H2 32px/27px. A 240px desktop contents rail is sticky; mobile contents start collapsed. Comparison tables preserve columns within a labeled scroll region, with a visible mobile cue. Sources and per-article caveats sit after the article.

Template examples use native blockquotes with progressive Copy template buttons, 44px controls and copy confirmation. Text remains selectable without JavaScript. One contextual next-step block follows useful material; it uses existing rules, type and CTA tokens and does not gate the answer. Related articles and a relevant campaign remain available.

The article calculator uses the same $100 appointment fee and $1,500 infrastructure cost; values are complete in HTML and controls are enabled only after enhancement. Author credit and real publication/update dates come from reviewed source metadata. Review pages never enter the public feed or sitemap. Desktop navigation centers each link in its target area so Blog has consistent optical spacing; mobile links share the same inset.

The homepage has no standalone commitment section. Pricing flows directly into the founders with the same 80px desktop / 56px mobile inset on each side of the surface boundary. Its supporting link goes to the FAQs. The response-clock label remains two complete words on two lines.

## Spacing audit system, 16 October 2026

| Role / CSS token | Desktop | Mobile below 768px |
|---|---:|---:|
| Surface edge to content, --section | 80px | 56px |
| Half of an uninterrupted section transition, --section-join | 40px | 28px |
| Heading group to content, --intro-gap | 48px | 32px |
| Heading to subtitle, --heading-gap | 24px | 16px |
| Eyebrow to heading, --label-gap | 16px | 12px |
| Major text divider inset, --divider-space | 32px | 24px |
| Reading subsection separation, --reading-section-gap | 64px | 48px |

Section-heading owns its paragraph margins; children do not contribute an accidental second bottom margin. The process pipeline has no competing top margin. FAQ heading-to-list spacing uses the same intro token on mobile. Headings remain on the established left edge; only content that was already intended to be centered is centered. Do not center all text in pursuit of symmetry.

On the homepage, math, case studies and testimonials share plain-surface transitions. The founders and FAQ are separated by a fine rule, with a full section inset on each side. Bordered surface transitions keep equal insets either side. Hero and trust strip retain their intentional compact presentation. Page-intro top padding remains 40px desktop/24px mobile; dense dashboard/table spacing remains appropriate to its smaller UI scale.

Blog reading layout: 240px contents rail, 64px gap and 760px reading column, centered as a 1064px group. Below 1100px, use a 200px rail and 40px gap; mobile stacks. Covers use the exact reading-column width and edges, not a separate wider measure. Author biographies and their article collections share one section interval; collection headings receive the shared intro gap. Source-divider padding is explicit rather than padding plus a heading margin.

Founder biography links and nonfeatured article-card reading links align at the bottom of their paired content areas without constraining copy length. Footer legal-divider spacing is equal above and below. Screenshots and before/after computed measurements are in evidence/spacing.

## Team and FAQ revision, 20 October 2026

Team profiles use two equal panels with 24px between them. Each panel places a portrait beside the name and role, then a full-width biography and LinkedIn link below. Panel padding is 32px desktop, 28px tablet and 24px mobile. Portraits retain their 4:5 ratio at 128px desktop, 104px tablet and 88px mobile. Profiles stack below 768px. Bios are 16px desktop and 15px mobile.

The FAQ is one left-aligned reading column within a centered 960px group. The heading sits above the questions with the shared intro gap and wraps naturally. Native details controls retain all nine answers; question rows have fine separators and a circular plus control. Answer text uses 16px desktop and 15px mobile. Screenshots and responsive/accessibility checks are in evidence/team-faq-v2.

## Commercial pages and social previews, 22 October 2026

The cold email agency page inherits the same type, grid and section tokens. Its
hero uses a scoped 38–64px Manrope heading and shows the guarantee beside the CTA.
Source-backed case links follow the hero. Service panels use the existing flat
dark surface and 16px radius. Consecutive plain service sections share one section
interval; tonal boundaries retain full insets. Mobile booking navigation and
breadcrumbs use 12px type with existing 44px targets.

Social previews use tools/social_card.py: current wordmark, Manrope headlines,
DM Sans labels, dark page ground and the approved purple/neutrals. Homepage,
service, case and blog cards share this renderer; retired grid/glow artwork is
not regenerated. The client name is GRAIL and its canonical route is
/case-studies/grail, with permanent redirects from the previous spelling.
