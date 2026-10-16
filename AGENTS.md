# Website work

Read PRODUCT.md and DESIGN.md before changing the approved site. Preserve the logo, offer, source case copy and brand system.

Production tracks alive. Work on a feature branch from alive; main is historical. Never publish unreviewed blog articles. Follow EDITORIAL.md for actual founder approval, source states and build commands. Raw inputs stay out of Git and deployment.

Read SKILLS.md for project skill roles and Claude-specific compatibility limitations. Third-party helper scripts are not automatically executable in this environment; do not invent plugin paths or report checks that did not run.

Use tools/build-site.py to generate the full site, so blog routes and approved articles remain in the sitemap and routing configuration. tools/build-rebuild.py alone generates only the original site families.
