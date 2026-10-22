"""Commercial truth, navigation and SEO checks for the three-plan release."""
from pathlib import Path
import json
import unittest
from bs4 import BeautifulSoup
from pricing_data import PRICING, PLANS

ROOT = Path(__file__).resolve().parents[1]


class PricingTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.page = BeautifulSoup((ROOT / 'pricing.html').read_text(encoding='utf8'), 'html.parser')

    def test_plan_prices_and_guarantee_eligibility(self):
        self.assertEqual([(p['name'], p['base_fee'], p['guarantee']) for p in PLANS],
                         [('Basic', 0, False), ('Standard', 1500, True), ('Express', 2500, True)])
        for plan in PLANS:
            card = self.page.select_one('#' + plan['id'])
            self.assertIn(f"${plan['base_fee']:,}", card.select_one('.plan-price').get_text())
            self.assertIn('$100', card.select_one('.plan-meeting-fee').get_text())
        self.assertIn('pay vendors directly', self.page.select_one('#basic').get_text())
        self.assertIn('Standard and Express', self.page.select_one('#basic .plan-guarantee').get_text())

    def test_express_clock_is_explicit(self):
        text = self.page.get_text(' ', strip=True)
        self.assertIn(PRICING['express_clock'], text)
        self.assertIn('Day 3: three calendar days after payment, required inputs and approvals are complete.', text)

    def test_cost_comparison_uses_equal_meeting_volumes(self):
        rows = self.page.select('.plan-comparison tbody tr')[-3:]
        for row, count in zip(rows, [10, 20, 40]):
            fee = count * 100
            self.assertEqual([x.get_text(strip=True) for x in row.select('td')],
                             [f'${fee:,} + vendor costs', f'${fee+1500:,}', f'${fee+2500:,}'])

    def test_unknown_vendor_costs_are_not_hidden_in_total(self):
        self.assertEqual(self.page.select_one('#basic-vendor-budget').get('value', ''), '')
        self.assertIn('+ vendor costs', self.page.select_one('#basic-monthly-total').get_text())
        self.assertEqual(self.page.select_one('#standard-monthly-total').text, '$3,500')
        self.assertEqual(self.page.select_one('#express-monthly-total').text, '$4,500')

    def test_faq_schema_matches_visible_answers(self):
        graph = json.loads(self.page.select_one('script[type="application/ld+json"]').string)['@graph']
        faq = next(x for x in graph if x['@type'] == 'FAQPage')['mainEntity']
        visible = self.page.select('#faq details')
        self.assertEqual(len(faq), len(visible))
        for item, details in zip(faq, visible):
            self.assertEqual(item['name'], details.summary.get_text(strip=True))
            self.assertEqual(item['acceptedAnswer']['text'], details.select_one('.faq-answer').get_text(strip=True))
        offers = next(x for x in graph if x['@type'] == 'Service')['offers']
        self.assertEqual([x['priceSpecification'][0]['price'] for x in offers], ['0', '1500', '2500'])

    def test_all_current_pages_use_the_same_more_navigation(self):
        paths = [ROOT / 'index.html', ROOT / 'pricing.html', ROOT / 'cold-email-agency.html', ROOT / 'case-studies.html', ROOT / 'blog.html']
        paths += [p for p in (ROOT / 'case-studies').glob('*.html') if p.stem != 'graiai']
        paths += list((ROOT / 'blog').glob('*.html')) + list((ROOT / 'authors').glob('*.html'))
        paths += [ROOT / 'compare.html'] + list((ROOT / 'compare').glob('*.html'))
        self.assertEqual(len(paths), 25)
        for path in paths:
            page = BeautifulSoup(path.read_text(encoding='utf8'), 'html.parser')
            for selector in ['.desktop-nav', '.mobile-menu > nav']:
                nav = page.select_one(selector)
                self.assertEqual([a['href'] for a in nav.select('.nav-more-panel a')], ['/cold-email-agency', '/pricing', '/compare'], path.name)
                self.assertFalse(nav.select(':scope > a[href="/cold-email-agency"], :scope > a[href="/pricing"]'), path.name)

    def test_previous_articles_remain_approved_and_contextualized(self):
        for slug in ['cold-email-agency-pricing', 'pay-per-appointment-vs-retainer']:
            page = BeautifulSoup((ROOT / 'blog' / (slug + '.html')).read_text(encoding='utf8'), 'html.parser')
            self.assertEqual(page.select_one('.pricing-update a')['href'], '/pricing')
            self.assertIn('Standard plan', page.select_one('.pricing-update').get_text())


if __name__ == '__main__':
    unittest.main()
