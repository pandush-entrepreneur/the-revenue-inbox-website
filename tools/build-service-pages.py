"""Generate commercial service pages from approved copy decks."""
from site_common import *
import json

COPY = json.loads((ROOT / 'content/pages/cold-email-agency.json').read_text(encoding='utf8'))


def breadcrumb(items):
    parts = []
    for i, (label, href) in enumerate(items):
        if i:
            parts.append('<span>/</span>')
        if href:
            parts.append(f'<a href="{href}">{e(label)}</a>')
        else:
            parts.append(f'<span>{e(label)}</span>')
    return '<nav class="breadcrumbs" aria-label="Breadcrumb">' + ''.join(parts) + '</nav>'


def build_cold_email_agency():
    d = COPY

    def make_og():
        from fontTools.ttLib import TTFont
        from PIL import Image, ImageDraw, ImageFont
        font_path = ROOT / 'reference' / 'font-6.ttf'
        font_path.parent.mkdir(parents=True, exist_ok=True)
        if not font_path.exists():
            font = TTFont(ROOT / 'assets' / 'font-6.woff2')
            font.flavor = None
            font.save(font_path)
        im = Image.new('RGB', (1200, 630), '#161122')
        draw = ImageDraw.Draw(im)
        mark = Image.open(ROOT / 'assets' / 'brand' / 'logo-lettering.png').resize((150, 80), Image.Resampling.LANCZOS)
        im.paste(mark, (64, 48), mark)
        draw.text((64, 176), 'COLD EMAIL AGENCY', font=ImageFont.truetype(str(font_path), 24), fill='#d6d0de')
        font = ImageFont.truetype(str(font_path), 64)
        for i, line in enumerate(['Cold email that ends in', 'booked calls.']):
            draw.text((60, 244 + i * 82), line, font=font, fill='#f7f5fa')
        draw.line((64, 530, 1136, 530), fill='#8a40ea', width=2)
        draw.text((64, 556), 'therevenueinbox.com', font=ImageFont.truetype(str(font_path), 22), fill='#d6d0de')
        (ROOT / 'assets' / 'og').mkdir(parents=True, exist_ok=True)
        im.save(ROOT / 'assets' / 'og' / 'cold-email-agency.png', optimize=True)

    make_og()

    card = d['scope_card']
    scope_card = (
        '<aside class="svc-scope-card" aria-labelledby="scope-card-title">'
        + f'<p class="eyebrow">{e(card["label"])}</p>'
        + '<h2 id="scope-card-title">One team for the whole outbound job.</h2>'
        + '<ul class="svc-scope-list">'
        + ''.join(f'<li>{icon("check")}<span>{e(x)}</span></li>' for x in card['items'])
        + '</ul>'
        + f'<div class="svc-scope-price"><strong>{e(card["price"].split(" ")[0])}</strong><span>{" ".join(card["price"].split(" ")[1:])}</span></div>'
        + f'<p class="svc-scope-infra">{e(card["infra"])}</p>'
        + f'<p class="svc-scope-example">{e(card["example"])}</p>'
        + f'<p class="svc-scope-promise">{e(card["promise"])}</p>'
        + '</aside>'
    )

    hero = section(
        'top',
        '<div class="svc-hero-grid"><div class="svc-hero-copy">'
        + breadcrumb([('Home', '/'), ('Cold email agency', None)])
        + f'<p class="eyebrow">{e(d["eyebrow"])}</p>'
        + f'<h1>{e(d["h1"])}</h1>'
        + f'<p class="case-subhead">{e(d["subhead"])}</p>'
        + '<div class="svc-hero-actions">'
        + cta('cold-email-agency-hero')
        + f'<a class="text-link" href="#scope">See the scope {icon()}</a>'
        + '</div></div>'
        + scope_card
        + '</div>',
        'svc-hero',
    )

    scope_rows = ''.join(
        f'<div class="svc-row" role="row"><strong role="cell">{e(row["work"])}</strong><span role="cell" data-label="We own">{e(row["us"])}</span><span role="cell" data-label="You own">{e(row["you"])}</span></div>'
        for row in d['scope_rows']
    )
    scope = section(
        'scope',
        intro(
            'What we do. <br>What stays with you.',
            'The scope is the offer. This is who owns each part, from the first list to the closed deal.',
            'Scope',
        )
        + '<div class="svc-table" role="table" aria-label="Service scope">'
        + '<div class="svc-row svc-head" role="row"><span role="columnheader">Workstream</span><span role="columnheader">We own</span><span role="columnheader">You own</span></div>'
        + scope_rows
        + '</div>',
    )

    reply = d['reply_flow']
    reply_section = section(
        'after-reply',
        '<div class="svc-reply"><div class="svc-reply-head">'
        + f'<p class="eyebrow">{e(reply["label"])}</p>'
        + f'<h2>{e(reply["title"])}</h2>'
        + f'<p class="lead">{e(reply["intro"])}</p>'
        + '</div><div><ol class="svc-reply-list">'
        + ''.join(
            f'<li><span class="mono">{i:02}</span><div><h3>{e(step["title"])}</h3><p>{e(step["body"])}</p></div></li>'
            for i, step in enumerate(reply['steps'], 1)
        )
        + '</ol><a class="text-link svc-reply-link" href="'
        + e(reply['link'])
        + '">'
        + e(reply['link_label'])
        + ' '
        + icon()
        + '</a></div></div>',
    )

    steps = section(
        'process',
        intro(
            'How the work runs.',
            'Six stages. One owner from the first list to the meeting on your calendar.',
            'Process',
        )
        + '<ol class="svc-steps">'
        + ''.join(
            f'<li class="svc-step"><span class="mono">{i:02}</span><h3>{e(step["title"])}</h3><p>{e(step["body"])}</p></li>'
            for i, step in enumerate(d['steps'], 1)
        )
        + '</ol>',
    )

    req = d['requirements']
    requirements = section(
        'requirements',
        '<div class="svc-requirements"><div>'
        + f'<p class="eyebrow">What we need from you</p><h2>{e(req["title"])}</h2><p class="lead">{e(req["intro"])}</p>'
        + '</div><div><ul class="svc-req-list">'
        + ''.join(f'<li><strong>{e(item["title"])}</strong><p>{e(item["body"])}</p></li>' for item in req['items'])
        + '</ul><div class="svc-notfit"><h3>Not a fit</h3><ul>'
        + ''.join(f'<li>{e(x)}</li>' for x in req['not_fit'])
        + '</ul></div></div></div>',
        'tonal-section',
    )

    price = d['pricing']
    pricing = section(
        'pricing',
        '<div class="svc-price-band"><div>'
        + '<p class="eyebrow">Pricing</p>'
        + f'<h2>{e(price["title"])}</h2>'
        + f'<div class="svc-rate-grid"><div class="svc-rate"><span class="mono">Base fee</span><strong>{e(price["infra_amount"])}</strong><span>{e(price["infra_unit"])}</span><small>{e(price["infra_note"])}</small></div><div class="svc-rate"><span class="mono">Performance fee</span><strong>{e(price["appt_amount"])}</strong><span>{e(price["appt_unit"])}</span><small>{e(price["appt_note"])}</small></div></div>'
        + f'<p class="micro">{e(price["terms"])}</p>'
        + '</div><div>'
        + f'<p class="svc-price-example">{e(price["example"])}</p>'
        + '<div class="svc-price-actions">'
        + cta('cold-email-agency-pricing')
        + f'<a class="text-link" href="{e(price["link"])}">{e(price["link_label"])} {icon()}</a>'
        + '</div></div></div>',
        'tonal-section',
    )

    faq = section(
        'faq',
        '<div class="faq-layout">'
        + intro('Questions about the service.')
        + '<div class="faq-list">'
        + ''.join(
            f'<details data-event="faq_open"><summary>{e(item["q"])}{icon("plus")}</summary><div class="faq-answer"><p>{e(item["a"])}</p></div></details>'
            for item in d['faqs']
        )
        + '</div></div>',
    )

    service = {
        '@type': 'Service',
        '@id': BASE + '/cold-email-agency#service',
        'name': 'Done-for-you cold email and appointment setting',
        'serviceType': 'Cold email and B2B appointment setting',
        'provider': {'@id': ORG['@id']},
        'description': 'Strategy, ICP, data, copy, dedicated sending infrastructure, email and LinkedIn outreach, reply handling and qualified meeting booking.',
        'audience': {'@type': 'BusinessAudience', 'audienceType': 'B2B SaaS and service companies'},
        'offers': [{
            '@type': 'Offer',
            'name': 'Qualified booked appointment',
            'price': '100',
            'priceCurrency': 'USD',
            'description': 'Per qualified booked appointment, plus $1,500/month infrastructure. Rolling monthly.',
        }],
    }
    faq_schema = {
        '@type': 'FAQPage',
        'mainEntity': [
            {'@type': 'Question', 'name': item['q'], 'acceptedAnswer': {'@type': 'Answer', 'text': item['a']}}
            for item in d['faqs']
        ],
    }
    crumbs_schema = {
        '@type': 'BreadcrumbList',
        'itemListElement': [
            {'@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': BASE + '/'},
            {'@type': 'ListItem', 'position': 2, 'name': 'Cold email agency', 'item': BASE + '/cold-email-agency'},
        ],
    }

    page(
        '/cold-email-agency',
        d['title'],
        d['description'],
        hero + scope + steps + reply_section + requirements + pricing + faq + closing(),
        og='cold-email-agency',
        schemas=[service, faq_schema, crumbs_schema],
    )

    sitemap = ROOT / 'sitemap.xml'
    text = sitemap.read_text(encoding='utf8')
    loc = BASE + '/cold-email-agency'
    if loc not in text:
        text = text.replace('</urlset>', f'<url><loc>{loc}</loc></url></urlset>')
        sitemap.write_text(text, encoding='utf8')

    config_path = ROOT / 'vercel.json'
    config = json.loads(config_path.read_text(encoding='utf8'))
    config['rewrites'] = [r for r in config.get('rewrites', []) if r['source'] != '/cold-email-agency'] + [
        {'source': '/cold-email-agency', 'destination': '/cold-email-agency.html'}
    ]
    config['redirects'] = [r for r in config.get('redirects', []) if r['source'] != '/cold-email-agency.html'] + [
        {'source': '/cold-email-agency.html', 'destination': '/cold-email-agency', 'statusCode': 301}
    ]
    config_path.write_text(json.dumps(config, indent=2) + '\n', encoding='utf8')


build_cold_email_agency()
print('Generated /cold-email-agency, sitemap entry and Vercel route.')
