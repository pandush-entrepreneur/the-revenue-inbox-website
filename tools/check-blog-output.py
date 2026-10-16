"""Verify public metadata, source exclusion and local blog link targets."""
from pathlib import Path
from urllib.parse import urlsplit, unquote
import importlib.util, json, xml.etree.ElementTree as ET
from bs4 import BeautifulSoup

ROOT=Path(__file__).resolve().parents[1]
spec=importlib.util.spec_from_file_location('blog',ROOT/'tools'/'build-blog.py');blog=importlib.util.module_from_spec(spec);spec.loader.exec_module(blog)
posts=blog.load_posts();live=[p for p in posts if blog.approved(p)]
sitemap=(ROOT/'sitemap.xml').read_text();feed=(ROOT/'blog'/'feed.xml').read_text()
for p in posts:
    path=ROOT/'blog'/(p['slug']+'.html')
    if p not in live:
        assert not path.exists(),f'Unapproved article exists in public output: {p["slug"]}'
        assert '/blog/'+p['slug'] not in sitemap+feed,'Unapproved article leaked into discovery'
    else:assert path.exists(),'Approved article not generated'
paths=[ROOT/'blog.html',*(ROOT/'authors').glob('*.html'),*(ROOT/'blog').glob('*.html')]
for path in paths:
    soup=BeautifulSoup(path.read_text(encoding='utf8'),'html.parser')
    assert len(soup.select('h1'))==1,(path,'H1 count')
    assert soup.title and len(soup.title.text)<60,(path,'Title')
    assert len(soup.select_one('meta[name=description]')['content'])<155,(path,'Description')
    assert soup.select_one('link[rel=canonical]')['href'].startswith(blog.BASE),(path,'Canonical')
    assert soup.select_one('meta[property="og:image"]')['content'].startswith(blog.BASE),(path,'OG')
    for script in soup.select('script[type="application/ld+json"]'):json.loads(script.string)
    for anchor in soup.select('a[href]'):
        u=urlsplit(anchor['href'])
        if u.scheme or u.netloc:continue
        rel=unquote(u.path)
        target=(ROOT/rel.lstrip('/')) if rel else path
        if rel=='/':target=ROOT/'index.html'
        elif not target.suffix:target=target.with_suffix('.html')
        assert target.is_file(),(path,anchor['href'],'Missing internal destination')
        if u.fragment and target.suffix=='.html':
            other=BeautifulSoup(target.read_text(encoding='utf8'),'html.parser');assert other.find(id=u.fragment),(path,anchor['href'],'Missing anchor')
ET.parse(ROOT/'blog'/'feed.xml');ET.parse(ROOT/'sitemap.xml')
print(f'Public blog output passed. {len(live)} approved articles; {len(posts)-len(live)} excluded drafts. {len(paths)} public page templates checked.')
