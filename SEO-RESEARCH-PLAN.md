Implementation note: foundation work has started on branch blog. See SEO-START-HERE.md and EDITORIAL.md. Keyword demand remains unmeasured until data is connected; first two drafts await actual founder review.

# US-first SEO research and content plan

Revision 2: combines the original research with the second agent brief supplied by Pandush. Research date: 16 October 2026. Target: United States, English, explicitly selected by Pandush. This phase is research only. No new skills installed, website code changed, articles published or production deployments performed.

## Recommendation

Build /blog on the existing domain, in the current design. Pair useful articles with commercial pages and the six existing case studies. The goal is qualified organic strategy calls and customers. Article count is an operating measure.

Prioritize founders evaluating an agency, its costs and its qualification standards. Broad cold-email searches can attract agency operators, job seekers and people looking for free templates. Their intent differs from buying managed outbound. Actual campaign decisions, original emails and honest economics are our strongest available material.

## Coverage and limits

Reviewed the installed OpenSEO skills; GitHub metadata, selected actual skill files and READMEs; Google documentation; and discovery searches for agency pricing, pay-per-appointment services and SaaS appointment setting.

No authenticated Search Console data or connected OpenSEO/DataForSEO dataset was used. The search samples are not controlled US Google rank measurements. No keyword volumes, difficulty scores, current positions, backlink counts or traffic forecasts are claimed. The priorities below are business-intent hypotheses pending US demand and result-page validation.

The existing site's static HTML, sitemap, metadata, redirects and case studies are useful foundations. These do not prove indexing or ranking. A Lighthouse SEO score checks implementation basics, not competitive search visibility.

## GitHub shortlist

| Repository | Role | Decision |
|---|---|---|
| [every-app/open-seo](https://github.com/every-app/open-seo) | Keyword research, clustering, competitor investigation, link prospecting | Keep. Thirteen skills are already installed. Establish a working data connection before a formal data-backed audit. |
| [coreyhaines31/marketingskills](https://github.com/coreyhaines31/marketingskills) | Content strategy, customer research, shared positioning context, architecture, copy editing | Primary content strategy and editing reference. Install a selected subset later. |
| [AgriciDaniel/claude-blog](https://github.com/AgriciDaniel/claude-blog) | Briefs, evidence checks, editorial workflow and refresh | Add to the shortlist. Pilot selected modules before adopting; adapt Claude-specific paths and helpers. |
| [AgriciDaniel/claude-seo](https://github.com/AgriciDaniel/claude-seo) | Technical and schema review | Use selected checks as a second opinion. Avoid a second full orchestration stack for the same jobs. |
| [blader/humanizer](https://github.com/blader/humanizer) | Final prose editing while preserving facts | Optional. It cannot supply experience or guarantee an AI-detector result. |
| [ComposioHQ/awesome-claude-skills](https://github.com/ComposioHQ/awesome-claude-skills/blob/master/content-research-writer/SKILL.md) | Content Research Writer: research, cited outlines, drafting and revision | Useful optional reference. Overlaps with the selected writing stack. |
| [TheCraigHewitt/seomachine](https://github.com/TheCraigHewitt/seomachine) | Research/draft/review/published workflow and performance feedback | Reference only. Do not transplant its WordPress publishing or Claude-specific workspace. |
| [ohmyjahh/Copy-Master-Xquads](https://github.com/ohmyjahh/Copy-Master-Xquads) | Headlines, proof, objections and CTAs | Already available as a reference. Use selectively, with the existing operator voice. |

Specific Corey Haines skills verified in the current repository: content-strategy, customer-research, product-marketing, site-architecture and copy-editing. Later, analytics and competitors can support measurement and truthful comparison pages. Avoid installing another seo-audit skill over OpenSEO's same-named skill. Older guides sometimes use names that have since changed.

OpenSEO separates markdown workflows from data access. Its documentation describes hosted MCP access and self-hosting with a DataForSEO key. Choose a supported connection and check credits/cost before paid research. Search Console supplies first-party search performance for our own site.

SEO Machine's README emphasizes 2,000-3,000+ word content and density analysis. Those are not our quality targets. Google says it has no preferred word count. Borrow its research and review organisation, not arbitrary scoring requirements.

OpenSEO, marketingskills, humanizer and SEO Machine identify MIT licenses. No repository-wide license was identified for the selected Composio skill, and no license file was found in Copy Master's tree. Check permission before redistributing their text or bundling it into a product. This plan does not install or redistribute those libraries.

Both new repositories were inspected at their current public sources, including selected SKILL.md files and installer sources. They are MIT licensed and designed for Claude Code. Plugin commands in the supplied brief do not directly install them into this current workflow. No installer was executed. Claude Blog is the stronger addition for article-specific work; Claude SEO contributes targeted technical/schema review. Their numerical quality scores, link quotas, word counts and citation-length heuristics are not Google ranking signals. Our evidence and voice rules override them. Humanizer stays optional; Composio and SEO Machine remain references, not additional active writing pipelines.

One primary owner per job: OpenSEO for research data; Corey for strategy and final prose editing; selected Claude Blog workflow for briefs/draft verification/refresh; selected Claude SEO checks for technical/schema QA; Copy Master for occasional offer/CTA review. Resolve compatibility in a small pilot before installation or script execution.

## Principles from Google's current guidance

Create useful, reliable content that adds original information and relevant experience. AI assistance can support that work. Generating many pages without meaningful additional value can violate scaled-content-abuse rules. An article should earn publication because it satisfies a reader, not because it fills a schedule.

Three or four posts weekly is a production choice, not a ranking advantage by itself. Answer the question fully and stop. Do not promise page-one results or a fixed time to customers.

Separate three kinds of links: citations support claims; internal links help readers navigate our site; backlinks are other sites linking to us. Adding outbound citations does not create backlinks. Google explicitly identifies buying ranking-credit links, automated link creation and excessive link exchanges as link spam. Earn relevant editorial references through useful work. Advertising/sponsorship is separate and requires appropriate link qualification.

### Corrections to the supplied brief

- The September 2026 spam update is real: Google's status history records 24 September to 8 October. The announcement does not establish that a specific site, wording pattern or posting cadence is targeted. Do not invent an algorithm diagnosis from an update date.
- The top-ten information-gain test is our editorial gate, not a formal Google safety test or ranking guarantee. Ask what materially improves the answer: original evidence, clearer economics, an actionable tool or a useful synthesis. Do not force novelty into every paragraph or pretend we have read inaccessible results.
- Google stopped showing FAQ rich results on 7 May 2026. Keep useful questions in the page, but do not add FAQPage everywhere as a ranking tactic. Existing markup does not require an emergency removal.
- Google explicitly says llms.txt neither helps nor harms Google visibility or rankings. It is optional for other consumers, with no priority over indexing, evidence and useful pages.
- Author pages document real expertise and responsibility. They are not a standalone E-E-A-T score booster; actual authorship and review are required.
- A word-based spam checker cannot establish inbox placement. Prioritize the existing ROI model and a transparent capacity/cost planner. A content checklist, if built, must describe its narrow limits. Gmail's own guidelines also discuss authentication, reputation and recipient feedback.
- Avoid fixed requirements to cut 20%, add two CTA blocks, put a number in every section, or insert a prescribed count of internal links. Make those decisions for the reader and evidence available. No invented first-person experience or numerical settings.
- A benchmark study is conditional on usable, permitted data. It should not be a mandatory 90-day deliverable if its sample or definitions are inadequate.
- A Notion migration should inventory existing indexing, source versions and editable canonical/redirect options. Publishing first-party resources on our site gives us control of the page; do not promise that moving them automatically transfers an abstract domain-authority score.

Verified sources: [Google status history](https://status.search.google.com/products/rGHU1u87FJnkP6W2GwMi/history), [Google documentation changes](https://developers.google.com/search/updates), [Google AI guide](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide), [Gmail sender guidance](https://support.google.com/mail/answer/81126?hl=en).

## Initial search-intent map

These are seed clusters, not validated demand estimates. Assign one primary page per distinct intent. Closely related variations may belong on the same page. Create distinct service pages only if the research supports a different buyer need.

| Priority | Search cluster | Likely destination | Distinct contribution |
|---|---|---|---|
| 1 | cold email agency / B2B appointment setting agency | Existing homepage or justified service page | Actual scope, prices, qualification and cases |
| 1 | pay per appointment lead generation / pay per meeting agency | Commercial offer page if intent is distinct | Exact costs, booked-versus-held distinction and terms |
| 1 | cold email agency pricing / appointment setting cost | Buyer guide linked to pricing | Exact $3,500 worked example at 20 appointments and full cost assumptions |
| 1 | how to choose a cold email agency | Decision guide | A useful supplier scorecard and evidence checks |
| 2 | outsourced SDR vs in-house SDR | Comparison guide | Transparent worksheet and verified cost inputs |
| 2 | cold email agency for B2B SaaS | Substantive use-case page or guide | Relevant Networked/GraiAI evidence, with contexts preserved |
| 2 | positive replies but no booked meetings | Diagnostic article | Definitions and reply-to-calendar handoff |
| 2 | qualified sales meeting definition | Evaluation guide | Exact qualification criteria and useful examples |
| 3 | templates / subject lines / free tools | Selective supporting content | Genuine examples where they help a buyer's decision |

Discovery searches returned a mix of buyer guides, commercial pricing pages and tools teaching operators how to price their own agencies. That ambiguity requires intent checks. SaaS appointment-setting searches also surfaced commercial service pages, supporting the hypothesis that a blog alone is insufficient. No rank position is asserted.

Example pages reviewed for format/intent, not adopted pricing or proof:

- https://www.builtforb2b.com/pricing
- https://snipeoutbound.com/appointment-setting/
- https://www.connectleadagency.com/services/sdr-appointment-setting/

## Cluster architecture

Use four working clusters, with most early effort on buying decisions. These are planning categories, not a requirement to launch four pillars immediately.

| Cluster | Initial focus | Evidence and boundaries |
|---|---|---|
| Hiring and pricing | Provider selection, payment models, agency vs in-house, qualification | Current offer and all relevant cases; highest buyer priority |
| Pipeline diagnosis and economics | Reply-to-meeting handoff, attendance, break-even, sales-cycle timing | Explicit denominators and source campaign context |
| Outbound operations | Deliverability, infrastructure, targeting, data and copy | Only verified practices and reader-relevant decisions; avoid an agency-operator tutorial factory |
| Industry evidence | SaaS, PR tech, parking, recruitment and fundraising | Existing source cases; fundraising audience fit may be weaker, so do not assume equal acquisition priority |

Create an indexable category page when it has enough substantive material and a useful editorial introduction. Do not launch empty archives or duplicate pillar/category pages. Internal links follow actual relevance; update older useful pages when new material belongs there. A commercial page can serve as a cluster hub when that best matches the query intent.

## Blog build, for the later implementation phase

Use /blog and /blog/descriptive-slug. Preserve the current typography, purple palette and shared components. Prioritize calm reading, annotated examples, useful tables and native graphics. No newsletter or email gate is required.

Extend the existing static authoring pipeline with Markdown article sources, structured metadata, index generation, sitemap entries and related links. Add explicit /blog rewrites to the existing Vercel routing. A CMS is optional if an editor needs independent publishing.

Article fields: title, slug, summary/meta description, primary intent, category, author, genuine publication/update dates, OG image, source evidence, related case, related article, CTA and draft/published state. Add dedicated /authors/pandush and /authors/umair pages when publishing their reviewed work. Generate RSS, reading time and a desktop table of contents where useful. Category pages can follow /blog/category/slug once they contain useful material. Tools can live at /tools/slug. Show a named author or reviewer only when they actually performed that role. Use relevant Article/BlogPosting and Breadcrumb metadata, canonical URLs and social images. These do not guarantee rich results.

Keep case pages as the primary narratives. Articles can analyse a lesson and link to the original study, without reproducing it as another competing page. Avoid thin tag archives and near-duplicate pages for keyword variations.

Use Notion resources as potential research material. Publish new complete search-targeted guides on our own site, then share summaries or excerpts linking back from Notion. Review existing resources before migrating or duplicating them. No Notion resources were supplied or reviewed here.

### Raw inputs and publishing access

Use /content/blog for reviewed article sources, /content/briefs for briefs and /content/drafts for work in progress. Store raw inputs under /reference/content-inputs or another explicitly gitignored location. A public repository and Vercel static deployment must not expose raw contact CSVs, unreleased client screenshots or transcript details. Gitignore and deployment exclusion are separate controls. Commit only approved, redacted evidence assets. Draft routes must remain unpublished; a noindex tag is not access control.

Every brief records the exact required Pandush input, its source/permission status and whether it is received. Missing evidence blocks the dependent claim, not all independent work. Ask for short specific inputs rather than a new broad briefing exercise.

### Approval boundaries

This revised plan still requires Pandush's approval before implementation. Complete the data-backed Phase 1 research packet first, then show its page map, selected briefs and opportunities before building/publishing. Every article needs actual Pandush review and approval before publication. Distribution copy may be drafted, but sending messages and posting on other platforms require explicit instructions. Approval of an article does not automatically authorize outreach to others.

## Editorial workflow

1. Choose a buyer question using US query data, result-page intent and real sales objections.
2. Brief the reader's decision, competing answers, our distinct contribution and next action.
3. Collect a source packet before drafting: approved campaign evidence, relevant primary documentation, exact citations and operator input.
4. Get a focused voice note or interview from Pandush/Umair when the article needs their experience. Never invent first-person stories, experiments, quotes or client details.
5. Draft the answer first. Add only sections that support it. Worked examples must state assumptions.
6. Verify every claim and source. Preserve the distinction among replies, opportunities, booked meetings, held meetings and customers. Case outcomes are not universal benchmarks.
7. Edit against real voice samples and the approved plain-language style. Optional Humanizer pass, followed by another factual check.
8. Check intent, title, headings, internal links, metadata, source links, mobile readability and CTA. Publish when the piece adds something useful.
9. Distribute where relevant, then update or consolidate based on performance and buyer feedback.

Quality gate: clear answer, distinct contribution, concrete example, supported claims, genuine expertise where needed, useful next step, no keyword stuffing, no artificial word count and no fabricated authorship. A polished generic summary does not pass.

## First 12 provisional article briefs

Ordered by likely business relevance, not measured search volume. Map keywords to existing pages before deciding a new URL. The contribution is a proposed angle; it is not a claim that no competitor already covers it.

| # | Seed intent | Working title | Contribution | Pandush input needed |
|---|---|---|---|---|
| 1 | Agency pricing, buyer | How much does a cold email agency cost? | Exact full-cost example and comparison worksheet | Confirm operational fees and unresolved free-work terms; approved pricing already supplies the base |
| 2 | Pay-per-meeting model, buyer | Pay per appointment vs a monthly retainer | Billable event, total cost and qualification checklist | Actual billing/no-show rules; do not infer them |
| 3 | Supplier selection, buyer | How to choose a cold email agency | Evidence-request scorecard with real disqualifiers | Common buyer objections and examples of good/weak qualification |
| 4 | Outsourcing decision, buyer | In-house SDR or outbound agency: the break-even model | Transparent contract-value and cost model | Founder review of assumptions; externally sourced current cost inputs |
| 5 | Meeting quality, evaluation | What counts as a qualified meeting? | Exact definition and practical acceptance checklist | Approved edge cases and qualification process |
| 6 | Supplier evaluation, buyer | What to check before signing an appointment-setting contract | Terms checklist without legal promises | Actual contract terms and questions prospects ask |
| 7 | SaaS provider fit, buyer | When a SaaS company is ready to outsource outbound | Fit criteria with relevant Networked/GraiAI examples | Real acceptance/rejection criteria and approved operator context |
| 8 | Campaign troubleshooting, problem-aware | Interested replies but no meetings: where the handoff fails | Stage-by-stage diagnosis and real workflow | Redacted reply journey and verified handling times |
| 9 | Campaign evidence, evaluation | Inside Networked's 81-meeting month | Decisions and limitations beyond the existing case narrative | Verified targeting/handoff decisions, original assets and permission |
| 10 | Deliverability, problem-aware | Before you scale cold email, check the infrastructure | Diagnostic decision tree and redacted setup | Actual setup screenshots, monitoring practices and a real incident if available |
| 11 | Market targeting, problem-aware | How to build an outbound list when job titles are not enough | PCS physical-location targeting lesson | Verified enrichment steps, redacted examples and source permission |
| 12 | Supplier comparison, buyer | A researched comparison of the agencies buyers actually shortlist | Dated scope, pricing, qualification and fit criteria | Real shortlist input; independent first-party competitor research and disclosed ownership |

Competitor comparison research belongs in Phase 1 early. Row 12 is publication-dependent on verified facts and demonstrated query/buyer relevance, not a blanket decision to publish about Belkins, Martal, CIENCE, SalesHive or Leadium. Distinguish a provider's own claims from our observations. Do not fabricate a review, rankings, hands-on use or an impartial best-agencies verdict. No year in the title unless maintained.

## Keyword evidence required before these briefs become final

For each primary cluster: country/language/date; provider and estimated volume; difficulty only if a provider supplies it, with its model named; intent; preferred page type; current primary URL; three representative leading organic URLs; gaps; source-based contribution; founder inputs; uncertainty. Read up to ten relevant competing results for shortlisted topics, with depth bounded by whether more reading changes the decision. Do not add near-duplicate query volumes as different audiences. Missing metrics remain unknown, never guessed. Search-result gaps require real page reading, not snippet inference.

## Practical rollout

Phase 1: verify Search Console ownership, indexing and sitemap coverage; connect a suitable SEO data source; establish a baseline. Build a prioritised query-to-page map recording buyer fit, intent, proof, estimated demand, competition and uncertainty.

Phase 2: install the selected skills and create shared editorial context from the approved offer, evidence and voice samples. Produce two strong pilot pieces to prove the process.

Phase 3: build the reusable blog template, generation, index, related links, metadata and draft workflow. Launch the pilot pieces and any independently justified commercial page.

Phase 4: month 1 starts with two reviewed articles a week plus one useful update/tool work session. Month 2 can move to three articles if evidence collection, editorial review and distribution remain reliable. Month 3 may reach three to four; the fourth must pass the same gate. These are targets, not ranking promises. Keep buying decisions prominent and use a bounded weekly founder input/review session.

Phase 5: review indexing and queries weekly; review qualified organic leads and sales feedback monthly. Improve strong pages and consolidate overlaps. An eight-to-twelve-week review window is a checkpoint, not a ranking promise.

## Earning links and distributing work

Useful assets to develop: a transparent cost worksheet, an agency-evaluation scorecard and eventually a properly defined benchmark report. Six case studies do not form a representative benchmark dataset. New aggregate claims need permission, sample size, dates, denominators and methodology.

Potential channels: genuine client case mentions, relevant tool-vendor customer stories, founder podcasts, B2B publications, expert contributions and communities where the asset answers a real question. LinkedIn summaries can point to complete guides. Research prospects and draft outreach later; no messages or backlink purchases are authorised by this research phase.

### First-90-day assets and link research

Prioritize one expanded ROI/cost worksheet and one real annotated campaign teardown. Pilot a sending-capacity planner only with visible user-controlled assumptions, working-day/follow-up assumptions, cost inputs and no inbox-placement guarantee. Do not call a simplistic spam-word list a deliverability test.

For a benchmark report, first request permitted exports and a data dictionary. Define campaign/account selection, dates, industries, unique contacts versus emails, first touches versus follow-ups, bounces, automated replies, positive replies, bookings and held meetings. Separate different observation windows. Distinguish pooled rates from typical campaign rates. Disclose small samples and selection bias; do not infer causality from uncontrolled changes. If the source is insufficient, publish a transparent individual case analysis instead of a benchmark report. Reconstructed dashboard chart profiles are not observed daily transaction data and cannot be reused as raw benchmark evidence.

Research 30 potential editorial/link opportunities during the data-backed planning phase, then prioritize the ten strongest. Each row needs an actual URL, relevant audience, proposed angle, evidence of editorial fit, eligibility/contact route, any cost and the last verification date. Partner directories require real current eligibility; Clutch/GoodFirms/Featured/Qwoted and named tool programs are candidates to verify, not guaranteed listings or link benefits. Judge opportunities by relevance and referral potential, not a third-party authority score alone. No mass outreach, paid ranking links or directory signups are authorized here.

## Measurement and inputs

Search Console: indexing, impressions, clicks, click-through and query/country trends. Separate brand from nonbrand where possible. Search Console access is not established by the existing website code.

Booking attribution: distinguish CTA click, calendar opened, completed booking, attended qualified call and customer. Existing DOM events can support integration, but no analytics provider is installed. A Calendly click is not a completed booking. Connect completion signals and retain landing-page context through CRM reporting during implementation.

Record completed strategy bookings attributable to organic landing pages and the subset later confirmed qualified; these are separate funnel measures. Report monthly in SEO_REPORT.md: indexing, relevant nonbrand impressions/clicks, selected buyer-query visibility, completed bookings, qualified/held calls, customers, relevant new referring domains and refresh actions. Attribution should state limitations, including unobserved prior visits or direct returns. A 30-day review checks access/indexing and early relevance; a 90-day review revisits content and commercial outcomes without treating sparse data as a proven failure.

Primary measure: qualified organic strategy calls and resulting customers. Supporting measures: useful indexed pages, relevant nonbrand clicks, search queries, case-study engagement and CTA clicks. No conversion or revenue forecast is invented.

Inputs for implementation: Search Console access/export; a connected keyword-data source and agreed paid-call budget; approved writing samples, buyer objections and operator input; links to useful Notion resources. Existing open guarantee operational details must not be filled with invented terms in articles.

## Primary Google references

- [Helpful content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)
- [Generative AI content](https://developers.google.com/search/docs/fundamentals/using-gen-ai-content)
- [Spam policies](https://developers.google.com/search/docs/essentials/spam-policies)
- [SEO starter guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide)
- [Search Console performance](https://support.google.com/webmasters/answer/7576553?hl=en)
- [Article metadata](https://developers.google.com/search/docs/appearance/structured-data/article)
- [AI search guidance](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide)

Repository snapshots are saved under the gitignored reference/seo-research directory. Popularity is not evidence that a skill produces rankings. No new skill or workflow was installed in this research phase.
