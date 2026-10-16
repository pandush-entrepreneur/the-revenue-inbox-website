# Blog operating guide

Audience: US B2B founders buying managed outbound. The goal is qualified organic calls and customers. Start at two useful articles per week; increase only when original inputs and review keep pace. The topic order is provisional until US demand data is connected.

## Sources and states

Markdown articles live in content/blog. Each file begins with JSON metadata between `---` lines. JSON is deliberately used so the static build needs no YAML dependency. Match the two pilot files when adding an article.

Required fields: title, slug, description, category, keyword, status, author, created, published, updated, visual, summary, related_case, related_posts and sources. States are draft, review and published. Slugs contain lowercase letters, digits and single hyphens. Publication dates must be real; scheduled future dates do not appear early. Authors are team, pandush or umair. Named author credit requires their actual authorship/review.

Raw exports, voice-note transcripts and unreleased screenshots belong in gitignored reference/content-inputs. Never commit private raw lead data or deploy it with the website. Approved, redacted assets can move to assets. content itself is excluded from Vercel uploads; only generated static pages are served.

## Weekly work

1. Inspect buyer queries and the existing page map. One primary URL per distinct intent. Missing volumes remain not measured.
2. Pick two questions with clear business fit and available evidence. Record primary intent, competing sources, the contribution, sources, founder inputs and proposed internal links in content/briefs.
3. Gather the exact inputs. The six case studies are approved evidence; reconstructed chart profiles are not raw transaction logs. Keep replies, opportunities, booked calls, held calls and customers separate.
4. Draft the direct answer and develop only what the reader needs. No imposed word count, density or source count. Preserve the site's plain voice and offer.
5. Check facts, original value, sources, calculation denominators, author credit, links, metadata, mobile layout and the next action.
6. Set status to review and generate the isolated review preview. Ask for actual founder review. Prepare changes until that exact article is approved.
7. Record approval, rebuild, run the publication checks and preview the public output. Deploy through alive only when authorized. No runtime AI writer, cron or automatic publication is installed.
8. Draft a useful LinkedIn excerpt or relevant outreach for review. Do not send or post to other platforms without explicit instructions.
9. Review indexing and query relevance after 30 days, and content/commercial outcomes after 90 days. Small baselines are noisy. Update or consolidate useful pages rather than producing duplicates.

## Build and review

`python tools/build-site.py` generates the public site from approved content only. With no approved articles, the blog index explains that guides are in review and points to the cases; it stays noindex and out of the sitemap until useful articles are approved.

`python tools/build-site.py --preview` also makes `.preview/blog`, including review-state articles. This directory is gitignored, separate from production and marked noindex. It contains runtime assets only. Start it with `python tools/serve-rebuild.py --directory .preview/blog --port 4180` and open http://127.0.0.1:4180/blog. Robots directives are not access control; use Vercel's protected preview for remote review and do not put confidential source material there.

After a real approval, record it using `python tools/approve-blog.py <slug> --reviewed-by Pandush --reference "<actual approval message or document>"`. This records a hash of the final source and sets publication metadata; it does not deploy. Editing the approved article invalidates that hash until reviewed again. Do not run this command to manufacture approval.

Tests: `python tools/test-blog-publication.py`. Browser QA: `node tools/qa-blog.mjs`, using the existing local Playwright/axe dependencies. Install Python markdown 3.8.2, beautifulsoup4, Pillow and fonttools for the development build. Production serves committed HTML and does not run Python.

## Page structure

/blog is the index. /blog/slug contains articles. /authors/pandush and /authors/umair document actual roles and reviewed articles. Empty author archives remain noindex. RSS at /blog/feed.xml contains approved, currently published articles only. Sitemap, social cards, metadata and relevant Article/Breadcrumb schema are generated with each build. Do not add FAQ schema to chase discontinued Google rich results.

Search is shown once at least five guides exist, an editorial UI choice rather than an SEO threshold. Mobile contents are collapsed initially, tables disclose horizontal scrolling, and all prose remains usable without JavaScript.

## Current launch checklist

- Connect Search Console and verify indexing; submit the sitemap.
- Choose the keyword data connection and research budget.
- Configure analytics after the actual measurement ID is provided.
- Connect and verify completed-booking signals separately from CTA clicks.
- Review the first two article drafts and any unresolved operational terms.
- Approve the blog preview and article versions before the first production release.
