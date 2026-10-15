---
name: The Revenue Inbox
description: A daylight editorial system for earned outbound evidence and clear commercial terms.
colors:
  primary: "#8a40ea"
  deep: "#4b1d8f"
  ink: "#161122"
  muted: "#6b6577"
  paper: "#fff"
  soft: "#f7f5fa"
  tint: "#f4eefe"
  night: "#161122"
  on-night: "#fff"
  line: "#d6d0de"
typography:
  display:
    fontFamily: "Manrope, sans-serif"
    fontSize: "clamp(2.5rem,7.2vw,6rem)"
    fontWeight: 600
    lineHeight: 1.04
    letterSpacing: "-.04em"
  headline:
    fontFamily: "Manrope, sans-serif"
    fontSize: "clamp(2rem,3.6vw,3rem)"
    fontWeight: 600
    lineHeight: 1.12
    letterSpacing: "-.03em"
  title:
    fontFamily: "Manrope, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "-.03em"
  stat:
    fontFamily: "Manrope, sans-serif"
    fontSize: "clamp(2.5rem,5vw,4rem)"
    fontWeight: 500
    lineHeight: 1.12
    letterSpacing: "-.04em"
  body:
    fontFamily: "DM Sans, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.6
  lead:
    fontFamily: "DM Sans, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "DM Sans, sans-serif"
    fontSize: ".875rem"
    fontWeight: 500
    lineHeight: 1.5
rounded:
  radius: "0"
  round: "50%"
spacing:
  s1: "4px"
  s2: "8px"
  s3: "12px"
  s4: "16px"
  s5: "24px"
  s6: "32px"
  s7: "48px"
  s8: "64px"
  s9: "96px"
  s10: "128px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.paper}"
    typography: "{typography.label}"
    rounded: "{rounded.radius}"
    padding: "12px 24px"
  button-primary-hover:
    backgroundColor: "{colors.deep}"
  button-secondary:
    backgroundColor: "{colors.soft}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.radius}"
    padding: "12px 24px"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.radius}"
    padding: "12px 24px"
  case-row:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.radius}"
    padding: "48px"
  radio-option:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.radius}"
    padding: "12px 16px"
  radio-option-selected:
    backgroundColor: "{colors.deep}"
    textColor: "{colors.paper}"
  faq:
    backgroundColor: "{colors.soft}"
    textColor: "{colors.ink}"
    rounded: "{rounded.radius}"
    padding: "24px"
---

# Design System: The Revenue Inbox

The directional DESIGN.md was established before implementation. This scan refresh reconciles that user-authorized, code-first editorial type statement with the shipping CSS and components; the project brief takes precedence over further concept-approval rounds.

## Overview

**Creative North Star: "The Considered Proposal"**

A partner's considered proposal: daylight reading, clear terms, earned evidence and real operators. Strong typography and broad whitespace carry the hierarchy; original campaign results provide the editorial record.

The original logo and purple identity remain binding. Manrope display type and DM Sans reading type bring a precise, approachable character. The static site stays useful without JavaScript; enhancement adds deliberate movement and native-control behavior.

**Key Characteristics:**

- Light editorial canvas with one inverse closing field.
- Square, flat surfaces and a four-pixel spacing rhythm.
- Real evidence, monochrome photography and static final metrics.
- Native controls, visible content and reduced-motion support.

## Colors

A single purple accent sits within warm, ink-derived neutrals. Frontmatter values mirror the CSS source; semantic aliases intentionally share values.

### Primary

- **Brand purple** (`primary`): booking actions, focus outlines and native radio accents.
- **Deep purple** (`deep`): primary-action hover, selected contract-value controls, selection background and FAQ hover text.
- **Pale purple** (`tint`): expected-scenario table cells.

### Neutral

- **Reading ink** (`ink`): headings, running copy, media backgrounds and play icons.
- **Secondary ink** (`muted`): notes and secondary reading, including model footnotes.
- **Daylight paper** (`paper`): page canvas, navigation, buttons' inverse text and evidence panels.
- **Soft paper** (`soft`): alternating sections, secondary buttons and FAQ surfaces.
- **Closing ink / inverse paper** (`night`, `on-night`): final CTA and footer.
- **Table rule** (`line`): one-pixel row separators in the ROI table.

**The Brand Fidelity Rule.** Keep the original logo unmodified. Client logos, portraits and campaign imagery receive the implemented monochrome treatment; the brand logo does not.

Calculated WCAG contrast ratios for solid-color pairs: paper on primary 5.25:1; paper on deep 11.22:1; ink on paper 18.46:1; muted on paper 5.60:1; muted on soft 5.17:1; ink on soft 17.05:1; ink on tint 16.27:1. These normal-text pairs meet AA. These figures describe solid states, not every composited animation frame or photographic background. Observed content reveals keep full opacity to preserve text contrast.

## Typography

**Display Font:** Manrope, sans-serif fallback. **Body Font:** DM Sans, sans-serif fallback. Both are self-hosted with swap behavior; the Latin font files are preloaded.

The display family is compact and deliberate; the reading family keeps commercial detail comfortable. Frontmatter records the base semantic roles. Display and headline use balanced wrapping; paragraphs use pretty wrapping and generally stop at 60ch. Testimonial quotes stop at 45ch. Text remains in sentence case, with no eyebrow labels.

### Hierarchy

- **Display:** hero H1 and closing CTA. Mobile overrides its size to `clamp(2.5rem,9.8vw,4rem)`.
- **Headline:** section H2s; case-study H1s also use this role on mobile.
- **Title:** H3s; process and case-row titles reduce to the lead size on mobile.
- **Stat:** static evidence, pricing and break-even figures; weight 500. Case-study summary statistics use the headline size with weight 500.
- **Body / lead:** regular running text and introductory copy. Hero lead reduces to body size on mobile; testimonial lead uses weight 500 and leading 1.5.
- **Label:** small controls and links; ordinary small notes use body weight and leading unless locally overridden.

**The Evidence Rule.** Metrics are final static values, never counters from zero. The ROI table uses tabular numerals.

## Layout

The centered container caps at 1200px with `clamp(24px,4vw,64px)` gutters on each side. Desktop compositions use twelve equal tracks with 32px gaps; each section defines its own spans. The testimonial grid uses six tracks: two leading half-width videos, then three third-width videos. Founders and pricing use two columns. Major compositions share a left edge.

The spacing scale is a four-pixel rhythm. Standard sections use 128px vertical padding, reduced to 64px at 767px and below. Hero spacing is deliberately distinct: 96px top and 64px bottom on desktop, 48px top and bottom on mobile. Evidence rows use 48px padding, reduced to 32px on mobile. Pricing uses 48px padding, reduced to 32px on mobile. Related controls and copy use the smaller scale steps.

- At **1023px and below**, desktop links give way to a native mobile disclosure; footer columns reduce from four to two.
- At **767px and below**, major paired compositions stack, all testimonials become single-column, founder cards stack, standard sections tighten, and header height becomes 80px with a 48px logo. The display size has its mobile override.
- At **480px and below**, the header hides brand text and the menu's visible label; accessible names remain.

The ROI table has a 760px desktop minimum width inside an independently scrolling region. At 767px and below, the table minimum reduces to 608px and its sticky first column has a 128px minimum width, using spacing token s10. This exposes the conservative revenue before horizontal scrolling at the reviewed mobile viewport. The focusable region supports native keyboard scrolling; touch scrolling remains browser-native. The document itself must fit the viewport. Portrait frames use 4:5; testimonial facades and injected players use 4:3. Intrinsic geometry, percentages, breakpoint values and border widths are not spacing-scale exceptions.

## Elevation & Depth

There are no box shadows, glass layers or decorative gradients. Tonal fills, whitespace and the table's rules establish hierarchy. The header remains solid paper and sticky, above content at z-index 20. Its outer height stays stable while the logo scales to .86 after 48px of scrolling. A three-pixel primary outline with a four-pixel offset marks keyboard focus on links, buttons, summaries, inputs and the table scroll region.

**The Visible Content Rule.** Content is visible without script. Off-screen observed elements begin at full opacity with a 12px translation, then move into place once; failure to receive an observer event never hides their text.

Motion uses 150ms, 250ms and 600ms durations with `cubic-bezier(.16,1,.3,1)`. Only opacity and transforms animate; colors change immediately. Hero lines enter from opacity .65 and 12px below over 600ms, with a 150ms second-line delay. Open FAQ answers enter from opacity .65 and 8px below over 250ms. Reduced motion disables these entrances, travel, smooth scrolling and transitions. There are no motion loops or scroll hijacking.

## Shapes

Surfaces, panels, buttons and media frames are square. Circles are reserved for the 48px miniature portraits and play controls. SVG icons use a consistent 1.5 stroke and generally occupy 24px, or 16px inside buttons and play controls. The FAQ's plus rotates 45 degrees when expanded. The pricing checks use authored CSS strokes.

## Components

### Navigation

Solid paper, plain small links and a primary booking action. Desktop header minimum height is 88px; mobile is 80px. The original logo is 56px on desktop and 48px on mobile. Links underline on hover. Native details/summary provides mobile navigation without script; enhancement closes it on Escape, outside click or link selection, and Escape restores summary focus.

### Buttons and links

Square, restrained and explicit. The primary button uses primary fill with paper text; secondary uses soft fill; ghost is transparent. All use 12px by 24px padding and a 48px minimum height. Button gap is 24px, reduced to 16px on the narrowest screens. Primary hover changes to deep purple. Buttons rise 4px on hover and return on press; text-link arrows move 4px horizontally. Focus uses the shared outline. Booking actions use ?Book a call? and the same Calendly discovery URL. The case-sidebar booking anchor uses a simpler primary treatment with the same minimum target and focus rule.

### Evidence rows and static statistics

Sequential white editorial rows pair a large metric with context and a case-study link. Twelve desktop tracks become stacked content on mobile. They use whitespace and fill, with no border or shadow. Reuse a semantic evidence group rather than a generic icon tile. Statistics are present in HTML at their final values.

### Client logos and founders

Nine client logos form one compact monochrome row. The original Networked asset is cropped to its name, excluding its symbol. Logo height is 20px, optically adjusted to24px for the two-line Red Buffer logo and32px for the EventRx badge. Natural wordmark widths and minimum32px gaps keep visible spacing even; space-between fills wide containers. The SkyHigh monogram is omitted at the user's request.

The row stays still, with native horizontal scrolling when it exceeds the viewport. There is no autoplay, duplicate content or pause button. The focusable scroll region has a visible outline and works with touch or keyboard. Every displayed name appears once to assistive technology.

Founder portraits use matching 4:5 frames, full-cover crop and grayscale treatment. Miniature portraits are round. Preserve the real names, biographies, locations and LinkedIn destinations.

### Testimonials and video facade

Monochrome 4:3 stills, a 48px paper play circle, original quotations and an accessible external Vimeo link. The image scales to 1.025 and opacity .8 on hover. The first two desktop facades show a text action; smaller desktop facades retain the play control, and all show the action on mobile. Clicking deliberately replaces the facade with a matching 4:3 Vimeo iframe and appends a visible ?Open video on Vimeo? text link after the player. That link retains the original destination and opens a new tab with noopener. No player request is made before that action. Without JavaScript the facade link opens Vimeo normally. The external fallback remains available when embedding fails; production-domain playback is unverified after a local headless iframe response returned 401.

### ROI model and contract-value controls

A semantic table carries original assumptions, rows, scenario results and disclaimer. Expected values use tint; revenue receives larger type. Native radio inputs live in a fieldset with a legend. Unselected labels use paper; selected labels use deep purple and paper text. Each label has a 48px minimum height and 12px by 16px desktop padding. Mobile labels use 12px by 8px padding in three columns. The static baseline is $25,000; selecting $15,000 or $50,000 updates revenue and break-even copy. Preserve the stated cost-basis caveat recorded in CHANGES.md.

### Process and pricing

Process is an ordered native four-stage sequence with an adjacent introduction. Pricing is one flat paper panel on a soft section, with appointment price, monthly infrastructure fee, six original inclusions and booking action. Its guarantee sits adjacent as factual copy. Keep commercial discrepancies documented rather than resolving them through visual implication.

### FAQ

Native details/summary, soft fill, 24px summary padding, 48px minimum summary target and a rotating plus. Answer padding is 0 24px 24px. Hover changes summary text to deep purple; focus uses the shared outline. Answers remain usable without JavaScript.

### Closing CTA, footer and case-study pages

The CTA and footer share the inverse field. The CTA pairs a display-scale heading with the original free 30-minute call offer. Footer navigation, legal identity and original destinations remain explicit. Five case-study pages reuse the same tokens, navigation and footer with a metric-led introduction, native campaign report, specific narrative and CTA. No campaign screenshots, pasted lead replies or calendar evidence appear on these pages.

### Native campaign report and conversion chart

A single flat soft-paper report contains a heading, exact campaign window, semantic definition list for total sent/reply rate/opportunities, and contextual notes. It uses 48px padding on desktop and 32px on mobile. Metrics use the existing stat face and size; three columns become a large total-sent row with two supporting metrics on mobile. New case heroes omit duplicate statistic grids because the report already contains those figures.

Reports represent supplied aggregate results; they do not imitate an Instantly screenshot or invent daily time series. Final numbers are always in HTML. An observed entrance moves metric groups 12px over 600ms with 150/250ms stagger; reduced motion shows the final state immediately.

The investor conversion chart uses four real counts: 470 positive replies, 188 bookings, 132 attended meetings and 18 investors. Bar lengths are explicitly relative to 470 positive replies. Scale-only animation introduces the bars once; no numbers count from zero.

### Case-study filters

All five case links remain in static HTML. JavaScript reveals four native filter buttons: All results, Software, Fundraising and Recruitment. Pressed state uses ink/paper and aria-pressed; hidden cards use the native hidden attribute. Controls have 48px minimum targets and normal focus styling.

## Do's and Don'ts

### Do:

- **Do** preserve the original logo, brand purple and earned evidence.
- **Do** use the existing spacing, typography and color tokens.
- **Do** keep final metrics and readable content in static HTML.
- **Do** preserve keyboard focus, native controls and reduced-motion behavior.

### Don't:

- **Don't** invent claims, identities, logos, campaign figures or performance histories. Native reports may present the supplied facts in our own style.
- **Don't** add decorative gradients, glass, stock imagery or icon feature grids.
- **Don't** hide static content behind JavaScript or load a third-party player before intent.
- **Don't** introduce horizontal document scrolling; keep model overflow scoped to its table.
