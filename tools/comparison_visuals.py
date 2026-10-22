"""Responsive, semantic diagrams of our approved offer; no simulated results."""
from bs4 import BeautifulSoup
from site_common import e, icon
from pricing_data import MEETING_FEE, PLANS


def illustrated(markup, key):
    base_fees = ' / '.join(f'${p["base_fee"]:,}' for p in PLANS)
    diagrams = {
        'belkins': (
            'Choose who handles your sending setup.',
            [('Basic', 'You buy the infrastructure', 'Domains, mailboxes and tools stay on your vendor bills.'),
             ('Standard & Express', 'We buy and manage it', 'Managed infrastructure, with prewarmed setup on Express.')],
            f'Every plan adds ${MEETING_FEE} per qualified booked meeting. Basic vendor bills are additional.',
            'options',
        ),
        'saleshive': (
            'How your Revenue Inbox bill works.',
            [('Monthly base', base_fees, 'Choose Basic, Standard or Express.'),
             ('Meeting fees', f'${MEETING_FEE} × qualified bookings', 'The same fee per qualified booked meeting on every plan.'),
             ('Monthly total', 'Base + meeting fees', 'Add your actual vendor bills on Basic.')],
            'A billing formula, not a forecast of campaign results.',
            'formula',
        ),
        'martal': (
            'The handoff with The Revenue Inbox.',
            [('Our campaign', 'Outbound', 'Research, messaging, outreach and replies.'),
             ('Our handoff', 'Qualified booking', 'An agreed ICP fit, ready for a sales conversation.'),
             ('Your sales team', 'Sales calls & closing', 'You run discovery, negotiate and close.')],
            'Our service owns the work through to qualified booking. Your team owns the sales conversation.',
            'flow',
        ),
        'cience': (
            'Keep each meeting stage visible.',
            [('Calendar', 'Qualified booked', 'The agreed call has a slot.'),
             ('Attendance', 'Held', 'The meeting has taken place.'),
             ('Your pipeline', 'Sales opportunity', 'Your team assesses the potential deal.')],
            'These are separate measures. Our $100 variable fee applies to a qualified booked meeting.',
            'flow',
        ),
        'cleverly': (
            'What makes our booking billable.',
            [('Conversation', 'Interested reply', 'A reply alone does not count.'),
             ('Qualification', 'Decision-maker + ICP fit', 'The prospect agrees to hear your offer.'),
             ('Calendar', 'Qualified booked call', 'An agreed call is booked for your team.')],
            'The $100 fee applies to the qualified booked call, after the agreed qualification criteria are met.',
            'flow',
        ),
    }
    title, steps, note, kind = diagrams[key]
    nodes = []
    for n, (label, heading, description) in enumerate(steps):
        connector = ''
        if n < len(steps) - 1 and kind != 'options':
            mark = ('+' if n == 0 else '=') if kind == 'formula' else icon()
            connector = f'<span class="comparison-visual-connector" aria-hidden="true">{mark}</span>'
        nodes.append(f'<li><span class="comparison-visual-label">{e(label)}</span><strong>{e(heading)}</strong><p>{e(description)}</p>{connector}</li>')
    visual = f'<figure class="comparison-visual comparison-visual-{kind}"><figcaption>{e(title)}</figcaption><ol>{"".join(nodes)}</ol><p class="comparison-visual-note">{e(note)}</p></figure>'
    soup = BeautifulSoup(markup, 'html.parser')
    heading = soup.select_one('.section-heading')
    assert heading is not None, key
    heading.insert_after(BeautifulSoup(visual, 'html.parser'))
    return str(soup)
