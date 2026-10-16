"""Check review-page metadata, article cover files and local link destinations."""
from pathlib import Path
from urllib.parse import urlsplit,unquote
import json
from bs4 import BeautifulSoup

ROOT=Path(__file__).resolve().parents[1]
PREVIEW=ROOT/'.preview'/'blog'
pages=[PREVIEW/'blog.html',*(PREVIEW/'blog').glob('*.html')]
for path in pages:
    soup=BeautifulSoup(path.read_text(encoding='utf8'),'html.parser')
    assert len(soup.select('h1'))==1,path
    assert len(soup.title.text)<60,(path,'long title')
    assert len(soup.select_one('meta[name=description]')['content'])<155,(path,'long description')
    assert 'noindex' in soup.select_one('meta[name=robots]')['content'],path
    assert not soup.select('#guide-operators'),path
    for script in soup.select('script[type="application/ld+json"]'):json.loads(script.string)
    for element in soup.select('a[href],img[src]'):
        href=element.get('href') or element.get('src');u=urlsplit(href)
        if u.scheme or u.netloc:continue
        target=PREVIEW/unquote(u.path).lstrip('/') if u.path else path
        if u.path=='/':target=PREVIEW/'index.html'
        elif not target.suffix:target=target.with_suffix('.html')
        assert target.is_file(),(path,href)
        if u.fragment:
            other=BeautifulSoup(target.read_text(encoding='utf8'),'html.parser')
            assert other.find(id=u.fragment),(path,href)
    assert '{{' not in soup.select_one('main').get_text(),(path,'unresolved marker')
print(f'Passed metadata, covers, links and noindex checks for {len(pages)} review pages.')
