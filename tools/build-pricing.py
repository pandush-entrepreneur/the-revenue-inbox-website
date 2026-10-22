"""Build the three-plan commercial page from founder-supplied pricing."""
from site_common import *
from pricing_data import PRICING, PLANS, MEETING_FEE, plan_offers
from social_card import render_social_card


def money(value):
    return f'${value:,}'


hero = section('top',
    '<nav class="breadcrumbs" aria-label="Breadcrumb"><a href="/">Home</a><span>/</span><span>Pricing</span></nav>'
    + '<div class="plans-intro"><p class="eyebrow">Basic · Standard · Express</p><h1>Cold email agency pricing.</h1>'
    + '<p class="lead">Choose who handles the infrastructure and how quickly you launch. Every plan charges the same $100 per qualified booked meeting.</p>'
    + '<p class="plans-terms">Monthly fees in USD. Basic vendor bills are separate from our meeting fee.</p></div>', 'plans-hero')

cards = []
for plan in PLANS:
    badge = '<p class="plan-label">Managed infrastructure</p>' if plan['id'] == 'standard' else '<p class="plan-label">Day-3 launch</p>' if plan['id'] == 'express' else '<p class="plan-label">Bring your infrastructure</p>'
    guarantee = '<p class="plan-guarantee">20 qualified meetings. 30 days. Or we work for free.</p>' if plan['guarantee'] else '<p class="plan-guarantee plan-guarantee-muted">The 20-meeting guarantee is available on Standard and Express.</p>'
    cards.append(
        f'<article class="plan-card" id="{plan["id"]}" aria-labelledby="{plan["id"]}-title">'
        + badge + f'<h2 id="{plan["id"]}-title">{plan["name"]}</h2><p class="plan-audience">{e(plan["audience"])}</p>'
        + f'<p class="plan-price"><strong>{money(plan["base_fee"])}</strong><span>/month base fee</span></p>'
        + '<p class="plan-meeting-fee">+ $100 per qualified booked meeting</p>'
        + f'<p class="plan-infrastructure">{e(plan["infrastructure"])}</p>'
        + '<ul class="plan-features">' + ''.join(f'<li>{icon("check")}<span>{e(item)}</span></li>' for item in plan['features']) + '</ul>'
        + f'<p class="plan-launch"><strong>Launch</strong><span>{e(plan["launch"])}</span></p>'
        + guarantee + cta('pricing-' + plan['id'], 'Discuss ' + plan['name']) + '</article>'
    )
plans = section('plans', '<h2 class="sr-only">Compare the three plans</h2><div class="plan-grid">' + ''.join(cards) + '</div><p class="plan-footnote">The 30-day guarantee clock starts when campaigns go live. It applies to Standard and Express only.</p>')

calculator = section('monthly-cost',
    intro('See your monthly bill.', 'Pick a meeting volume to compare the fees. For Basic, add your own vendor budget if you know it.')
    + f'<div class="plan-calculator" data-meeting-fee="{MEETING_FEE}" data-standard-base="{PLANS[1]["base_fee"]}" data-express-base="{PLANS[2]["base_fee"]}"><div class="plan-calculator-controls">'
    + '<label for="pricing-meetings">Qualified booked meetings per month <output id="pricing-meetings-label" for="pricing-meetings">20</output></label>'
    + '<input id="pricing-meetings" type="range" min="0" max="60" step="1" value="20" disabled>'
    + '<label for="basic-vendor-budget">Your Basic vendor budget <span>(optional, USD/month)</span></label>'
    + '<input id="basic-vendor-budget" type="number" min="0" max="100000" step="0.01" inputmode="decimal" placeholder="Add your monthly vendor costs" aria-describedby="vendor-budget-note vendor-budget-error" disabled>'
    + '<p class="micro" id="vendor-budget-note">Include the domains, mailboxes and tools you pay for directly. We have not estimated these costs for you.</p><p class="micro" id="vendor-budget-error" hidden>Enter a budget from $0 to $100,000, with at most two decimal places.</p></div>'
    + '<div class="plan-calculator-results" aria-live="polite" aria-atomic="true">'
    + '<div><h3>Basic</h3><p id="basic-monthly-total">$2,000 <span>+ vendor costs</span></p><small id="basic-cost-note">Meeting fees only; vendor bills are additional.</small></div>'
    + '<div><h3>Standard</h3><p id="standard-monthly-total">$3,500</p><small>$1,500 base + meeting fees.</small></div>'
    + '<div><h3>Express</h3><p id="express-monthly-total">$4,500</p><small>$2,500 base + meeting fees.</small></div>'
    + '</div></div><p class="plan-footnote">Billing examples, not a forecast of campaign results. The $100 fee applies to a qualified booked meeting.</p>', 'tonal-section')

comparison_rows = [
    ('Monthly base fee', '$0', '$1,500', '$2,500'),
    ('Per qualified booked meeting', '$100', '$100', '$100'),
    ('Domains, mailboxes and tools', 'You buy; vendor bills are additional', 'We buy and manage', 'We buy and manage; prewarmed setup'),
    ('Campaign launch', 'Once your sending setup is ready', 'After setup, warm-up and approvals', 'Day 3 after payment, inputs and approvals'),
    ('20-meeting, 30-day guarantee', 'Not included', 'Included, from campaign launch', 'Included, from campaign launch'),
]
for count in [10, 20, 40]:
    fee = count * MEETING_FEE
    comparison_rows.append((f'Monthly bill at {count} meetings', money(fee) + ' + vendor costs', money(fee + 1500), money(fee + 2500)))
comparison = section('compare',
    intro('Compare the full cost.', 'The same meeting definition and meeting fee across all three plans. Infrastructure and launch speed are the differences.')
    + '<p class="table-scroll-cue">On a small screen, swipe the table to compare all three plans.</p>'
    + '<div class="plan-table-scroll" role="region" aria-label="Plan costs and service comparison" tabindex="0"><table class="plan-comparison">'
    + '<caption>Monthly plan costs in USD.</caption>'
    + '<thead><tr><th scope="col">What you pay for</th><th scope="col">Basic</th><th scope="col">Standard</th><th scope="col">Express</th></tr></thead><tbody>'
    + ''.join('<tr><th scope="row">' + e(row[0]) + '</th>' + ''.join('<td>' + e(value) + '</td>' for value in row[1:]) + '</tr>' for row in comparison_rows)
    + '</tbody></table></div><p class="plan-footnote">For example, 20 qualified booked meetings means $2,000 in meeting fees. Standard totals $3,500; Express totals $4,500. Basic totals $2,000 plus your actual vendor bills.</p>')

faqs = [
    ('Is Basic free?', 'Basic has a $0 monthly agency base fee. You pay $100 per qualified booked meeting, and you pay vendors directly for your domains, mailboxes and tools. You share access with us so we can run the campaign.'),
    ('What does Standard include?', 'Standard is $1,500 per month plus $100 per qualified booked meeting. We buy and manage the domains, mailboxes, data and sending tools, and run the campaign through to qualified booking.'),
    ('What makes Express different?', 'Express is $2,500 per month plus $100 per qualified booked meeting. It includes everything in Standard, with prewarmed domains and mailboxes so campaigns can go live on day 3.'),
    ('When does the Express launch clock start?', PRICING['express_clock'] + ' The day-3 launch promise is separate from the 30-day meeting guarantee, which starts when campaigns go live.'),
    ('Which plans include the guarantee?', 'Standard and Express include: ' + PRICING['guarantee'] + ' Basic does not include the 20-meeting guarantee.'),
    ('What counts as a qualified booked meeting?', 'A booked call with a decision-maker within the agreed ideal customer profile who has agreed to hear the offer. A positive reply on its own is not a qualified booked meeting. We agree the qualification criteria before launch.'),
    ('Does Express promise more meetings?', 'Express changes launch speed by using prewarmed infrastructure. The $100 meeting fee, qualification definition and 20-meeting, 30-day guarantee are the same as Standard.'),
]
faq = section('faq', '<div class="faq-layout">' + intro('Before you choose a plan.') + '<div class="faq-list">'
    + ''.join(f'<details data-event="faq_open"><summary>{e(q)}{icon("plus")}</summary><div class="faq-answer"><p>{e(a)}</p></div></details>' for q, a in faqs) + '</div></div>')
proof = section('pricing-proof', '<div class="pricing-proof"><div><h2>Read the work before the call.</h2><p>Real campaigns. Defined outcomes. The email and the results behind each one.</p></div><a class="text-link" href="/case-studies">Read the case studies ' + icon() + '</a></div>')
schemas = [
    {'@type': 'Service', '@id': BASE + '/pricing#service', 'name': 'B2B cold email and qualified appointment setting', 'provider': {'@id': ORG['@id']}, 'offers': plan_offers(BASE)},
    {'@type': 'FAQPage', 'mainEntity': [{'@type': 'Question', 'name': q, 'acceptedAnswer': {'@type': 'Answer', 'text': a}} for q, a in faqs]},
    {'@type': 'BreadcrumbList', 'itemListElement': [{'@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': BASE + '/'}, {'@type': 'ListItem', 'position': 2, 'name': 'Pricing', 'item': BASE + '/pricing'}]},
]
render_social_card(ROOT, 'pricing', 'One meeting fee. Three ways to start.', 'Cold email agency pricing', 'Monthly base fees: $0 / $1,500 / $2,500. Meeting and Basic vendor costs extra.')
page('/pricing', PRICING['title'], PRICING['description'], hero + plans + calculator + comparison + faq + proof + closing(), og='pricing', schemas=schemas, body_class='pricing-surface')
sitemap = ROOT / 'sitemap.xml'
text = sitemap.read_text(encoding='utf8')
if BASE + '/pricing' not in text:
    sitemap.write_text(text.replace('</urlset>', '<url><loc>' + BASE + '/pricing</loc></url></urlset>'), encoding='utf8')
config_path = ROOT / 'vercel.json'
config = json.loads(config_path.read_text())
config['rewrites'] = [r for r in config.get('rewrites', []) if r['source'] != '/pricing'] + [{'source': '/pricing', 'destination': '/pricing.html'}]
config['redirects'] = [r for r in config.get('redirects', []) if r['source'] != '/pricing.html'] + [{'source': '/pricing.html', 'destination': '/pricing', 'statusCode': 301}]
config_path.write_text(json.dumps(config, indent=2) + '\n', encoding='utf8')
print('Generated three-plan pricing page, social image, sitemap and routes.')
