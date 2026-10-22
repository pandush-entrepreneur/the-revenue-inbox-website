"""Verify the GRAIL URL migration and current-brand metadata across site families."""
from pathlib import Path
from urllib.parse import urlsplit, unquote
import json
import xml.etree.ElementTree as ET
from bs4 import BeautifulSoup
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
BASE = 'https://www.therevenueinbox.com'
records = json.loads((ROOT / 'tools/rebuild-data.json').read_text(encoding='utf8'))
routes = ['/', '/cold-email-agency', '/case-studies', '/blog', '/authors/pandush', '/authors/umair']
routes += ['/case-studies/' + r['id'] for r in records]
routes += ['/blog/' + p.stem for p in (ROOT / 'blog').glob('*.html')]
config = json.loads((ROOT / 'vercel.json').read_text())
redirects = {r['source']: r for r in config['redirects']}
images = set()

for route in routes:
    file = 'index.html' if route == '/' else route.lstrip('/') + '.html'
    soup = BeautifulSoup((ROOT / file).read_text(encoding='utf8'), 'html.parser')
    assert len(soup.select('h1')) == 1, (route, 'H1')
    assert len(soup.title.text) < 60, (route, 'title')
    assert len(soup.select_one('meta[name=description]')['content']) < 155, (route, 'description')
    assert soup.select_one('link[rel=canonical]')['href'] == BASE + route, (route, 'canonical')
    assert soup.select_one('meta[property="og:url"]')['content'] == BASE + route
    # Umair's profile intentionally stays out of Search until it has authored posts.
    expected_robots = 'noindex,follow' if route == '/authors/umair' else 'index,follow'
    assert soup.select_one('meta[name=robots]')['content'] == expected_robots, route
    og = soup.select_one('meta[property="og:image"]')['content']
    assert og == soup.select_one('meta[name="twitter:image"]')['content']
    assert og.startswith(BASE + '/assets/og/') and '?v=20261022' in og
    image = ROOT / unquote(urlsplit(og).path.lstrip('/'))
    assert Image.open(image).size == (1200, 630), image
    images.add(image.name)
    assert soup.select_one('meta[name="twitter:image:alt"]')['content']
    assert soup.select_one('meta[property="og:image:type"]')['content'] == 'image/png'
    assert soup.select_one('img[src="/assets/brand/wordmark-white.svg"]'), route
    assert [x['href'] for x in soup.select('link[rel=stylesheet]')][0] == '/styles.css'
    assert 'graiai' not in soup.get_text().lower(), (route, 'old client name')
    for a in soup.select('a[href]'):
        assert '/case-studies/graiai' not in a['href'], (route, 'old internal link')
        link = urlsplit(a['href'])
        if not link.scheme and not link.netloc and link.path.startswith('/'):
            target = ROOT / unquote(link.path.lstrip('/'))
            assert link.path == '/' or link.path in redirects or target.is_file() or target.with_suffix('.html').is_file(), (route, a['href'])
    for script in soup.select('script[type="application/ld+json"]'):
        json.loads(script.string)
    if (ROOT / '.preview/blog').exists():
        preview = BeautifulSoup((ROOT / '.preview/blog' / file).read_text(encoding='utf8'), 'html.parser')
        assert preview.select_one('h1').get_text() == soup.select_one('h1').get_text(), (route, 'stale preview')
        assert preview.select_one('meta[property="og:image"]')['content'] == og
        assert (ROOT / '.preview/blog' / image.relative_to(ROOT)).read_bytes() == image.read_bytes()

service = BeautifulSoup((ROOT / 'cold-email-agency.html').read_text(), 'html.parser')
graph = json.loads(service.select_one('script[type="application/ld+json"]').string)['@graph']
faq = next(x for x in graph if x['@type'] == 'FAQPage')
questions = service.select('#faq details')
assert len(faq['mainEntity']) == len(questions)
for entity, details in zip(faq['mainEntity'], questions):
    assert entity['name'] == details.summary.get_text(strip=True)
    assert entity['acceptedAnswer']['text'] == details.select_one('.faq-answer').get_text(strip=True)
offer = next(x for x in graph if x['@type'] == 'Service')['offers'][0]
assert offer['price'] == '100' and offer['priceCurrency'] == 'USD'
assert '$1,500/month' in offer['description']
for source in ['/case-studies/graiai', '/case-studies/graiai.html', '/case-studies/grail.html']:
    assert redirects[source]['destination'] == '/case-studies/grail'
    assert redirects[source]['statusCode'] == 301
sitemap = ET.parse(ROOT / 'sitemap.xml')
locations = [n.text for n in sitemap.findall('.//{*}loc')]
assert BASE + '/case-studies/grail' in locations
assert not any('graiai' in x for x in locations)
assert all(BASE + route in locations for route in routes if route != '/authors/umair')
assert Image.open(ROOT / 'og-image.png').tobytes() == Image.open(ROOT / 'assets/og/home.png').tobytes()
assert (ROOT / '.preview/blog/styles.css').read_bytes() == (ROOT / 'styles.css').read_bytes()
print(f'Passed: {len(routes)} pages, {len(images)} social images, FAQ/offer schema, internal links, GRAIL redirects, sitemap and preview parity.')
