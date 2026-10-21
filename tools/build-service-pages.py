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
        title = 'Cold email that ends in booked calls.'
        font = ImageFont.truetype(str(font_path), 64)
        lines = ['Cold email that ends in', 'booked calls.']
        for i, line in enumerate(lines):
            draw.text((60, 244 + i * 82), line, font=font, fill='#f7f5fa')
        draw.line((64, 530, 1136, 530), fill='#8a40ea', width=2)
        draw.text((64, 556), 'therevenueinbox.com', font=ImageFont.truetype(str(font_path), 22), fill='#d6d0de')
        (ROOT / 'assets' / 'og').mkdir(parents=True, exist_ok=True)
        im.save(ROOT / 'assets' / 'og' / 'cold-email-agency.png', optimize=True)

    make_og()

    hero = section(
        'top',
        breadcrumb([('Home', '/'), ('Cold email agency', None)])
        + f'<p class="eyebrow">{e(d["eyebrow"])}</p>'
        + f'<h1>{e(d["h1"])}</h1>'
        + f'<p class="case-subhead">{e(d["subhead"])}</p>'
        + '<div class="case-hero-action">'
        + cta('cold-email-agency-hero')
        + f'<a class="text-link" href="#what-we-own">See what we own {icon()}</a>'
        + '</div>'
        + f'<p class="micro hero-price">{e(d["hero_micro"])}</p>',
        'case-hero',
    )

    ownership = section(
        'what-we-own',
        intro(
            'The work from the list <br>to the booked call.',
            'A reply is not a meeting. A meeting with the wrong person is not pipeline. These are the four parts we own.',
            'What we own',
        )
        + '<ol class="how-grid">'
        + ''.join(
            f'<li><span class="step-index">{i:02}</span><h3>{e(item["title"])}</h3><p>{e(item["body"])}</p><span class="ownership">{e(item["owner"])}</span></li>'
            for i, item in enumerate(d['ownership'], 1)
        )
        + '</ol>',
    )

    fit = section(
        'fit',
        '<div class="problem-grid"><h2>Who this is for.</h2><div>'
        '<p class="lead">Outbound works when there is a real buyer, a reason to write and someone ready to take the call. If that is not in place, the campaign will not fix it.</p>'
        '<h3>A good fit</h3><ul>'
        + ''.join(f'<li>{e(x)}</li>' for x in d['fit']['for'])
        + '</ul><h3>Not a good fit</h3><ul>'
        + ''.join(f'<li>{e(x)}</li>' for x in d['fit']['not_for'])
        + '</ul></div></div>',
        'tonal-section',
    )

    proof = section(
        'proof',
        intro(
            'The work, in numbers.',
            'Every result below comes from a campaign we ran. Open the study to see the email, the funnel and what counted as a result.',
            'Proof',
        )
        + '<div class="proof-strip">'
        + ''.join(
            f'<a href="{e(item["href"])}"><strong>{e(item["value"])}</strong><span>{e(item["label"])}</span><small>{e(item["name"])} {icon()}</small></a>'
            for item in d['proof']
        )
        + '</div>',
    )

    symbols = ['people', 'mail', 'check', 'calendar', 'people']
    system = section(
        'system',
        intro(
            'One system. <br>Four handoffs we own. You close.',
            'From the first prospect record to the call on your calendar, the work stays with us. You show up and close.',
            'How it works',
        )
        + '<div class="system-pipeline"><div class="pipeline-connector" aria-hidden="true"><i></i></div>'
        + ''.join(
            f'<article class="pipeline-step"><div class="step-symbol">{icon(symbols[i])}</div><h3>{e(step["title"])}</h3><p>{e(step["body"])}</p></article>'
            for i, step in enumerate(d['system'])
        )
        + '</div>',
        'tonal-section',
    )

    inclusions = [
        'A buyer list built around who can actually buy.',
        'Copy that gives those buyers a reason to reply.',
        'Sending infrastructure managed on your behalf.',
        'Email and LinkedIn outreach with replies handled.',
        'Qualified appointments booked onto your calendar.',
    ]
    pricing = section(
        'pricing',
        intro(
            'Pay for qualified appointments. <br>Know the full cost.',
            d['pricing_intro'],
            'Pricing',
        )
        + f'''<div class="pricing-card"><div class="price-main"><p class="price-line"><strong>$100</strong><span>per booked appointment</span></p><p class="infrastructure-price">+ $1,500/month infrastructure</p><p class="price-terms">Domains, mailboxes, data and sending tools.<br>Rolling monthly. No long contract.</p><div class="price-example">At 20 booked appointments in a month: $2,000 + $1,500 = $3,500.</div><div class="price-slider"><label for="appointment-count">Appointments per month <output for="appointment-count" id="appointments-output">20</output></label><input id="appointment-count" type="range" min="10" max="60" value="20" step="1"><div class="price-calculation" aria-live="polite"><span>Monthly total <b id="monthly-total">$3,500</b></span><span>Effective cost per appointment <b id="effective-cost">$175</b></span></div></div>{cta('cold-email-agency-pricing')}<p class="micro"><a href="/blog/cold-email-agency-pricing">See how the full bill works</a></p></div><div class="price-inclusions"><h3>The outbound job, included.</h3><ul>'''
        + ''.join(f'<li>{icon("check")}<span>{e(x)}</span></li>' for x in inclusions)
        + '</ul><a class="text-link" href="#faq">Read the FAQs '
        + icon()
        + '</a></div></div>',
        'tonal-section',
    )

    faq = section(
        'faq',
        '<div class="faq-layout">'
        + intro('Questions before the call.')
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
        hero + ownership + fit + proof + system + pricing + faq + closing(),
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
