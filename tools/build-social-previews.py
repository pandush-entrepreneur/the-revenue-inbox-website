"""Regenerate core previews; service and blog builds use the same renderer."""
import json
import shutil
from social_card import ROOT, render_social_card


def build_core_previews():
    render_social_card(ROOT, 'home', '20 qualified meetings. 30 days.',
                       'Done-for-you B2B outbound', 'Or we work for free. From campaign launch.')
    render_social_card(ROOT, 'case-studies', 'The work. The numbers.',
                       'B2B outbound case studies', 'Six campaigns. Read the emails. Inspect the results.')
    records = json.loads((ROOT / 'tools/rebuild-data.json').read_text(encoding='utf8'))
    for rec in records:
        render_social_card(ROOT, rec['id'], rec['title'], rec['name'], 'Campaign evidence. Defined results. The complete case study.')
    # Keep previously shared image addresses useful without advertising old art.
    shutil.copyfile(ROOT / 'assets/og/grail.png', ROOT / 'assets/og/graiai.png')
    shutil.copyfile(ROOT / 'assets/og/home.png', ROOT / 'og-image.png')


if __name__ == '__main__':
    build_core_previews()
    print('Generated current-brand homepage, case index and case-study previews.')
