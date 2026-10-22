"""Shared commercial facts for pricing, the homepage and service metadata."""
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
PRICING = json.loads((ROOT / 'content/pages/pricing.json').read_text(encoding='utf8'))
PLANS = PRICING['plans']
MEETING_FEE = PRICING['meeting_fee']


def plan_offers(base):
    return [{
        '@type': 'Offer',
        'name': plan['name'],
        'url': base + '/pricing#' + plan['id'],
        'description': f"${plan['base_fee']:,}/month base fee plus ${MEETING_FEE} per qualified booked meeting. " + plan['infrastructure'],
        'priceSpecification': [
            {'@type': 'UnitPriceSpecification', 'name': 'Monthly base fee', 'price': str(plan['base_fee']), 'priceCurrency': 'USD', 'unitText': 'month'},
            {'@type': 'UnitPriceSpecification', 'name': 'Qualified booked meeting', 'price': str(MEETING_FEE), 'priceCurrency': 'USD', 'unitText': 'qualified booked meeting'},
        ],
    } for plan in PLANS]
