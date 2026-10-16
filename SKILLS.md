# Project SEO and writing skills

Sixteen selected skills were installed into this website's `.agents/skills` directory using the system skill-installer. The existing thirteen OpenSEO skills remain intact. Installed skills become discoverable on the next agent turn; files can also be read directly now.

Sources and content hashes: `project-skills.json`. Installed third-party directories remain gitignored and excluded from deployment. The manifest is committed so another checkout can reproduce the selection. Copy Master remains a reference under `reference/copy-master`.

| Source | Installed skills | Role |
|---|---|---|
| coreyhaines31/marketingskills | content-strategy, customer-research, product-marketing, site-architecture, copy-editing, competitors, analytics | Planning, buyer language, structure, editing and measurement |
| AgriciDaniel/claude-blog | blog, blog-brief, blog-write, blog-factcheck, blog-seo-check, blog-decay | Blog-specific reference workflow, templates and quality checks |
| AgriciDaniel/claude-seo | seo, seo-technical, seo-schema | Technical/schema reference checks |

The two AgriciDaniel packages declare Claude Code compatibility and refer to host-specific helpers, paths and agent orchestration. They are installed as project-local reference workflows here, not as functioning native Claude plugin commands. No third-party install script or helper was executed. Read their SKILL.md, referenced resource and script before using any executable helper. Never guess missing plugin paths or claim their automated checks ran when using a manual equivalent. The actual working pipeline for this static site is in tools/build-site.py and the blog tools below.

Primary owner per job: OpenSEO for connected demand data; content-strategy for prioritization; blog-brief for evidence and outline fields; copy-editing for prose; blog-factcheck/seo-check for manual review guidance; selected seo-technical/schema checks for the site implementation. Avoid invoking overlapping suites to generate duplicate reports or chase incompatible numerical scores.

The approved project brief overrides generic recommendations for word count, keyword density, link quotas, stock imagery and AI art. No fabricated author experience, first-person stories, data or search volumes. User approval precedes article publication.

To reproduce the selection, use the system skill-installer with each recorded repository, observed commit and path, and `--dest <project>/.agents/skills`. Original helper location in this environment: `C:/Users/user/.codex/skills/.system/skill-installer/scripts/install-skill-from-github.py`.
