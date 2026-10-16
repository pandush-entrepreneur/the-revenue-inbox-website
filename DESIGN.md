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

Spacing follows 4, 8, 12, 16, 24, 32, 48, 64, 96, 128px. Desktop sections use 128px with smaller mobile intervals. Container is 1248px, increasing to 1320px on wide screens. Gutters are clamp(24px,4.5vw,72px). Radii are 8px for controls, 12px for email cards, 16px for standard panels, 20px for calculators. Shadows stay soft and dark.

## Brand assets

The condensed, stacked THE REVENUE INBOX wordmark retains the original identity. Anton outlines remove font dependencies from the SVG. Light, dark and restrained glow variants live in assets/brand. The monogram supplies SVG/PNG/ICO favicons and touch icons. The licensed font source is recorded in anton-OFL.txt. Client logos come from existing assets or the clients' own websites. Never redraw their names into invented marks.

## Components

- **Revenue scene:** native compose card, inbox row, interested reply, calendar slot and the real Networked 81-meeting result. No fake person or company identity. First lines rotate from the supplied campaigns. The CTA precedes the graphic on mobile.
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

The user's explicit dark-first purple direction authorizes soft brand glows, restrained gradient borders, dashboard grids and small mono labels. These are narrow exceptions to generic anti-template taste warnings. Repeated decoration, fake analytics, stock images, holographic objects and unrelated colors remain excluded. The source case narratives override generic copy patterns; the user-approved GraiAI guarantee correction is the sole factual source-copy exception.
