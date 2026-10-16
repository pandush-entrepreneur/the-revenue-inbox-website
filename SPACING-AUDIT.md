# Spacing audit and applied changes

16 October 2026. Scope: spacing and alignment across the current approved website. No copy or content-source changes. Production branch alive; work branch spacing-polish.

## Evidence and findings

| Severity | Finding | Measured before | Applied fix |
|---|---|---|---|
| P2 | Consecutive plain sections create an excessive empty interval | 128px + 128px = 256px on desktop; 80px + 80px on mobile | Shared 80px desktop / 56px mobile interval, split across neighboring sections |
| P2 | Same-role heading groups have competing spacing | Process content starts 64px after its header; peers use 56px. Mobile intro rules use 36px, while FAQ adds separate margins/gaps | Shared 48px / 32px intro gap; remove competing margin |
| P2 | Blog cover and reading column edges differ | Pricing article at 1440px: cover left 464px, text left 584px | Both start at 492px and end at 1252px; grouped reading layout centered |
| P2 | Author collection title has no owned gap to cards | Title/grid spacing relies on defaults while the two containing sections create a 256px transition | Shared intro gap plus one shared section interval |
| P3 | Paragraph margins and divider padding combine unpredictably | Source heading uses 16px padding plus a 24px margin; footer uses 56px/28px | Explicit symmetric divider tokens; heading margins owned by the component |
| P3 | Paired founder and article links do not share a baseline | Different copy lengths determine link position | Flexible content columns align their final link without fixing text height |

## Verification

Baseline: 18 pages at 390, 768 and 1440px, 54 layouts. Final: Chromium at 360, 390, 768, 1024, 1440 and 1920px; Firefox and WebKit at 390/1440px, 180 layouts. Full before/after screenshots of representative templates and individual homepage sections accompany computed measurements in evidence/spacing.

No detected horizontal overflow, broken anchors, missing images, page errors or axe WCAG A/AA violations. Every measured section-heading subtitle/content gap and every article cover/text edge matches the intended responsive rule. Separate 90-layout blog checks pass calculator math, search/reset, mobile contents, booking dialog and touch-target dimensions. Devices were emulated; physical iOS/Android and a full assistive-technology audit were not performed.

Impeccable detector ran once on changed CSS. Its three advisories concern pre-existing black/white neutrals in the approved design, not new colors. Manual screenshot review covered spacing, rhythm, text grouping and alignment. The approved left-aligned composition, hero/trust exceptions and dense product UI were preserved.

## Scoped audit assessment

Accessibility: 3/4, automated A/AA checks clear, full manual assistive testing outside this spacing pass. Performance: 3/4, CSS-only changes and no added network/runtime work; no new Lighthouse score is claimed. Theming: 3/4, existing palette preserved with inherited neutral advisories. Responsive: 3/4, three engines and all requested widths pass, physical-device/touch coverage limited. Implementation integrity: 4/4 for the audited spacing system, shared tokens and measured alignment agree.

## Durable rules

DESIGN.md records the new tokens and exceptions. Use the same heading group component and reading grid for future sections. Avoid adding a compensating margin to both sides of a shared gap. Keep more space between reading sections than between a heading and its explanation. Treat symmetry as consistent edges and grouping, not centering every block.
