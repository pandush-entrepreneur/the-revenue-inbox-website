"""Static blog authoring. Review drafts never enter the public build or feed."""
from pathlib import Path
from datetime import date, datetime, timezone
from email.utils import format_datetime
import argparse, hashlib, json, re, shutil, subprocess, sys
import xml.etree.ElementTree as ET
from bs4 import BeautifulSoup
from PIL import Image, ImageDraw, ImageFont
import site_common as site

ROOT = Path(__file__).resolve().parents[1]
BASE = site.BASE
BOOK = site.BOOK
e = site.e
AUTHORS = {
    'pandush': {'name': 'Pandush', 'role': 'Strategy and copy', 'image': 'pandush', 'linkedin': 'pandush', 'bio': 'Pandush owns buyer research and messaging at The Revenue Inbox. He has booked 1,000+ meetings from cold email in the last two years.'},
    'umair': {'name': 'Umair', 'role': 'Sales and qualification', 'image': 'umair', 'linkedin': 'umair-murtaza', 'bio': 'Umair brings four years in B2B sales to qualification and the sales conversation. His focus is whether a prospect fits and has agreed to hear the offer.'}
}

def read_post(path):
    source = path.read_text(encoding='utf8')
    blocks = source.split('---', 2)
    if len(blocks) != 3 or blocks[0].strip():
        raise ValueError(f'{path.name}: expected JSON frontmatter between --- lines')
    post = json.loads(blocks[1]); post['body'] = blocks[2].strip()
    if not re.fullmatch(r'[a-z0-9]+(?:-[a-z0-9]+)*', post['slug']):
        raise ValueError('Invalid article slug')
    if post['status'] not in ['draft', 'review', 'published']:
        raise ValueError('Invalid editorial status')
    if post['author'] not in ['team', *AUTHORS]:
        raise ValueError('Unknown author')
    for field in ['published', 'updated']:
        if post.get(field): date.fromisoformat(post[field])
    post['hash'] = hashlib.sha256(source.encode('utf8')).hexdigest()
    post['minutes'] = max(1, round(len(post['body'].split()) / 220))
    return post

def approved(post, reviews=ROOT/'content'/'reviews', today=None):
    if post['status'] != 'published': return False
    record = reviews / (post['slug'] + '.json')
    if not record.exists(): raise ValueError(post['slug'] + ': no recorded founder approval')
    review = json.loads(record.read_text(encoding='utf8'))
    if review.get('contentSha256') != post['hash']:
        raise ValueError(post['slug'] + ': article changed after approval; review it again')
    if review.get('reviewedBy') not in ['Pandush', 'Umair'] or not review.get('reference'):
        raise ValueError(post['slug'] + ': approval needs reviewer and actual approval reference')
    if not post.get('published'): raise ValueError('Published article needs a real publication date')
    return date.fromisoformat(post['published']) <= (today or date.today())

def load_posts():
    posts = [read_post(p) for p in sorted((ROOT/'content'/'blog').glob('*.md'))]
    if len({p['slug'] for p in posts}) != len(posts): raise ValueError('Duplicate article slug')
    return posts

def calculator():
    return '''<section class="article-calculator" aria-labelledby="cost-model-title"><h3 id="cost-model-title">See the full bill at your appointment volume.</h3><p>Our published pricing: $100 per qualified booked appointment plus $1,500 per month infrastructure.</p><label for="guide-volume">Qualified booked appointments <output id="guide-volume-label" for="guide-volume">20</output></label><input id="guide-volume" disabled type="range" min="10" max="60" value="20"><div class="guide-totals" aria-live="polite"><div><span>Monthly total</span><strong id="guide-total">$3,500</strong></div><div><span>Cost per appointment</span><strong id="guide-unit">$175</strong></div></div><p class="micro">Billing examples only. This control does not predict campaign results. Costs are in USD.</p></section>'''

def meta(post):
    if post['status'] != 'published': return 'Editorial preview · Awaiting founder review'
    published = date.fromisoformat(post['published']).strftime('%b %d, %Y')
    return published + (' · Updated ' + post['updated'] if post.get('updated') and post['updated'] != post['published'] else '')

def article_card(post, featured=False):
    return f'''<article class="guide-card {'guide-featured' if featured else ''}" data-guide data-category="{e(post['category'])}"><a href="/blog/{post['slug']}">{cover(post, card=True)}<div class="guide-card-copy"><div class="guide-meta"><span>{e(post['category'])}</span><span>{post['minutes']} min read</span></div><h2>{e(post['title'])}</h2><p>{e(post['summary'])}</p><span class="guide-read">Read the article {site.icon()}</span></div></a></article>'''

def cover(post, card=False):
    if not (ROOT/'assets'/'blog'/(post['visual']+'.svg')).is_file():
        raise ValueError(post['slug']+': missing editorial cover')
    return f'''<figure class="editorial-cover{' card-cover' if card else ''}"><img src="/assets/blog/{e(post['visual'])}.svg" width="960" height="640" alt="{e(post['image_alt'])}" {'loading="lazy"' if card else 'fetchpriority="high"'} decoding="async">{'' if card else '<figcaption>'+e(post['image_caption'])+'</figcaption>'}</figure>'''

def article_cta(post):
    return '<aside class="article-next-step"><p class="eyebrow">Put it into practice</p><h3>'+e(post.get('cta_title','Build an outbound plan around your market.'))+'</h3><p>'+e(post.get('cta_text','Bring your ICP and current approach. We can map what the campaign needs before you commit.'))+'</p>'+site.cta('blog-'+post['slug'])+'<p class="micro">A conversation about your market, offer and next step.</p></aside>'

def og(output, key, title, label='The Revenue Inbox · Field guides'):
    from fontTools.ttLib import TTFont
    font_path = ROOT/'reference'/'font-6.ttf'
    font_path.parent.mkdir(parents=True,exist_ok=True)
    if not font_path.exists():
        font = TTFont(ROOT/'assets'/'font-6.woff2'); font.flavor = None; font.save(font_path)
    im = Image.new('RGB', (1200,630), '#161122'); draw = ImageDraw.Draw(im)
    mark = Image.open(ROOT/'assets'/'brand'/'logo-lettering.png').resize((150,80), Image.Resampling.LANCZOS)
    im.paste(mark,(64,48),mark)
    draw.text((64,176),label,font=ImageFont.truetype(str(font_path),24),fill='#d6d0de')
    font = ImageFont.truetype(str(font_path),64); lines=[]; line=''
    for word in title.split():
        if draw.textlength((line+' '+word).strip(),font=font)>1050:lines.append(line);line=word
        else:line=(line+' '+word).strip()
    lines.append(line)
    for i,line in enumerate(lines):draw.text((60,244+i*82),line,font=font,fill='#f7f5fa')
    draw.line((64,530,1136,530),fill='#8a40ea',width=2)
    draw.text((64,556),'therevenueinbox.com',font=ImageFont.truetype(str(font_path),22),fill='#d6d0de')
    (output/'assets'/'og').mkdir(parents=True,exist_ok=True);im.save(output/'assets'/'og'/f'{key}.png',optimize=True)

def build(output, include_review=False):
    output = output.resolve(); output.mkdir(parents=True,exist_ok=True)
    site.ROOT = output
    all_posts = load_posts(); live = [p for p in all_posts if approved(p)]
    posts = [p for p in all_posts if p in live or (include_review and p['status']=='review')]
    posts.sort(key=lambda p:(p.get('published') or p['created'],p.get('editorial_order',0)),reverse=True)
    extra = '<link rel="stylesheet" href="/blog.css"><link rel="alternate" type="application/rss+xml" title="The Revenue Inbox guides" href="/blog/feed.xml"><script src="/blog.js" defer></script>'
    def page(path,title,description,body,key='blog-index',schemas=None,noindex=False):
        return site.page(path,title,description,body,og=key,schemas=schemas,head_extra=extra,body_class='blog-surface',noindex=noindex or include_review)
    breadcrumb = '<nav class="breadcrumbs" aria-label="Breadcrumb"><a href="/">Home</a><span>/</span><span>Blog</span></nav>'
    intro = site.section('blog-top',breadcrumb+'<p class="eyebrow">The Revenue Inbox journal</p><h1>The outbound blog.</h1><p class="blog-lead">Cold email templates, practical strategies and clear answers. For B2B teams building a better pipeline.</p>','blog-index-hero')
    if posts:
        controls = '<div class="guide-controls" hidden><label for="guide-search">Find an article<input id="guide-search" type="search" placeholder="Search templates, deliverability, tools…" autocomplete="off"></label><p id="guide-count" aria-live="polite">'+str(len(posts))+' articles</p></div>'
        if len(posts)<5: controls='<p class="guide-collection-count">'+str(len(posts))+' guides</p>'
        cards = ''.join(article_card(p,i==0) for i,p in enumerate(posts))
        listing = site.section('guides','<h2 class="sr-only">Field guides</h2>'+controls+'<div class="guide-grid">'+cards+'</div><div class="guide-empty" hidden><h2>No matching guides.</h2><p>Try another topic, or browse the campaign evidence.</p><button type="button" class="button secondary" data-clear-search>Show all guides</button></div>','guide-list')
    else:
        listing = site.section('guides','<h2>Start with the campaign evidence.</h2><p class="blog-lead">Our first guides are being reviewed. You can already inspect the emails, costs and results in our six case studies.</p><a href="/case-studies" class="button secondary">Read the case studies '+site.icon()+'</a>','guide-list')
    og(output,'blog-index','The outbound blog.')
    page('/blog','Cold Email & Outbound Blog | The Revenue Inbox','Practical cold email templates, deliverability checklists, tool comparisons and campaign measurement guides for B2B founders and sales teams.',intro+listing,noindex=not posts)
    generated=['blog.html','assets/og/blog-index.png','blog/feed.xml']
    for post in posts:
        body=site.md(post['body']); soup=BeautifulSoup(body,'html.parser');toc=[]
        for h in soup.select('h2'):
            slug=re.sub('[^a-z0-9]+','-',h.get_text().lower()).strip('-');h['id']=slug;toc.append((slug,h.get_text()))
        for table in soup.select('table'):
            hint=soup.new_tag('p',attrs={'class':'table-hint'});hint.string='Swipe to see all columns.';table.insert_before(hint)
            wrap=soup.new_tag('div',attrs={'class':'article-table','role':'region','aria-label':'Comparison table','tabindex':'0'});table.wrap(wrap)
        if post.get('format')=='templates':
            for quote in soup.select('blockquote'):quote['data-email-template']=''
        body=str(soup).replace('<p>{{cost-calculator}}</p>',calculator()).replace('<p>{{article-cta}}</p>',article_cta(post))
        author=AUTHORS.get(post['author']); byline=(f'<a href="/authors/{post["author"]}">{author["name"]}</a>' if author else '<a href="/#team">The Revenue Inbox</a>')
        trail='<nav class="breadcrumbs" aria-label="Breadcrumb"><a href="/">Home</a><span>/</span><a href="/blog">Blog</a><span>/</span><span>'+e(post['category'])+'</span></nav>'
        lead=site.section('article-top',trail+f'<div class="guide-meta"><span>{e(post["category"])}</span><span>{post["minutes"]} min read</span></div><h1>{e(post["title"])}</h1><p class="article-summary">{e(post["summary"])}</p><div class="article-byline">{byline}<span>{meta(post)}</span></div>','article-hero')
        nav=''.join(f'<a href="#{id}">{e(label)}</a>' for id,label in toc)
        case='/case-studies/'+post['related_case']
        links=''.join(f'<li><a href="{e(u)}" target="_blank" rel="noopener">{e(u.replace(BASE,"The Revenue Inbox").replace("https://www.","").replace("https://",""))}</a></li>' for u in post['sources'])
        related=''.join(article_card(p) for p in posts if p['slug'] in post.get('related_posts',[]))
        source_note=post.get('source_note','Pricing examples use our published offer. Campaign results describe individual engagements and do not predict your results. External provider information was checked on 16 October 2026.')
        layout=f'<div class="article-layout"><aside class="article-aside"><details><summary>In this guide</summary><nav aria-label="Article contents">{nav}</nav></details><a class="aside-case" href="{case}"><span>Inspect the evidence</span><b>Read the related campaign</b>{site.icon()}</a></aside><article class="article-prose">{body}<section class="article-sources"><h2>Sources and working</h2><p>{e(source_note)}</p><ul>{links}</ul></section><div class="article-author-note"><p>Prepared by The Revenue Inbox.{" Founder review is pending; this is an editorial preview." if post["status"]!="published" else ""}</p></div></article></div>'
        visual=site.section('article-visual',cover(post),'article-visual-section')
        schema={'@type':'BlogPosting','headline':post['title'],'description':post['description'],'image':BASE+'/assets/og/blog-'+post['slug']+'.png','mainEntityOfPage':BASE+'/blog/'+post['slug'],'publisher':{'@id':site.ORG['@id']},'author':({'@type':'Person','name':author['name'],'url':BASE+'/authors/'+post['author'],'sameAs':['https://www.linkedin.com/in/'+author['linkedin']+'/']} if author else {'@id':site.ORG['@id']}),'inLanguage':'en-US'}
        if post.get('published'):schema['datePublished']=post['published']
        if post.get('updated'):schema['dateModified']=post['updated']
        crumbs={'@type':'BreadcrumbList','itemListElement':[{'@type':'ListItem','position':i+1,'name':name,'item':BASE+path} for i,(name,path) in enumerate([('Home','/'),('Blog','/blog'),(post['title'],'/blog/'+post['slug'])])]}
        og(output,'blog-'+post['slug'],post['title'])
        page('/blog/'+post['slug'],post.get('seo_title',post['title']+' | Revenue Inbox'),post['description'],lead+visual+site.section('article-body',layout,'article-body-section')+(site.section('related-guides','<h2>Keep reading.</h2><div class="guide-grid related-guide-grid">'+related+'</div>','related-guides') if related else ''),'blog-'+post['slug'],[schema,crumbs])
        generated+=['blog/'+post['slug']+'.html','assets/og/blog-'+post['slug']+'.png']
    for key,a in AUTHORS.items():
        own=[p for p in posts if p['author']==key]
        body=site.section('author-top',f'<nav class="breadcrumbs" aria-label="Breadcrumb"><a href="/">Home</a><span>/</span><a href="/blog">Blog</a><span>/</span><span>{a["name"]}</span></nav><div class="author-profile"><img src="/assets/{a["image"]}.webp" width="640" height="800" alt="{a["name"]} at The Revenue Inbox"><div><p class="mono">{a["role"]}</p><h1>{a["name"]}</h1><p>{a["bio"]}</p><a href="https://www.linkedin.com/in/{a["linkedin"]}/" class="text-link" target="_blank" rel="noopener">{a["name"]} on LinkedIn {site.icon()}</a></div></div>','author-hero')
        body+=site.section('author-guides','<h2>Guides from '+a['name']+'.</h2><div class="guide-grid">'+''.join(article_card(p) for p in own)+'</div>') if own else site.section('author-campaigns','<h2>See the work behind the advice.</h2><p>Read the campaign emails and defined results in our case studies.</p><a href="/case-studies" class="button secondary">Explore the campaigns '+site.icon()+'</a>')
        person={'@type':'Person','name':a['name'],'jobTitle':a['role'],'url':BASE+'/authors/'+key,'image':BASE+'/assets/'+a['image']+'.webp','sameAs':['https://www.linkedin.com/in/'+a['linkedin']+'/'],'worksFor':{'@id':site.ORG['@id']}}
        page('/authors/'+key,a['name']+' | The Revenue Inbox',a['name']+' leads '+a['role'].lower()+' at The Revenue Inbox. Read the campaign evidence and practical outbound guides.',body,schemas=[person],noindex=not own)
        generated+=['authors/'+key+'.html']
    config=json.loads((output/'vercel.json').read_text())
    prefixes=['/blog','/authors']
    config['rewrites']=[r for r in config.get('rewrites',[]) if not any(r['source'].startswith(p) for p in prefixes)]+[{'source':'/blog','destination':'/blog.html'},{'source':'/blog/:slug([a-z0-9-]+)','destination':'/blog/:slug.html'},{'source':'/authors/:slug([a-z0-9-]+)','destination':'/authors/:slug.html'}]
    config['redirects']=[r for r in config['redirects'] if not any(r['source'].startswith(p) for p in prefixes)]+[{'source':'/blog.html','destination':'/blog','statusCode':301}]+[{'source':'/blog/'+p['slug']+'.html','destination':'/blog/'+p['slug'],'statusCode':301} for p in posts]+[{'source':'/authors/'+key+'.html','destination':'/authors/'+key,'statusCode':301} for key in AUTHORS]
    if include_review:config['headers'].append({'source':'/(.*)','headers':[{'key':'X-Robots-Tag','value':'noindex, nofollow'}]})
    (output/'vercel.json').write_text(json.dumps(config,indent=2)+'\n',encoding='utf8')
    ns='http://www.sitemaps.org/schemas/sitemap/0.9';ET.register_namespace('',ns)
    tree=ET.parse(output/'sitemap.xml');urlset=tree.getroot()
    for node in list(urlset):
        loc=node.find('{'+ns+'}loc')
        if loc is not None and any(loc.text.startswith(BASE+p) for p in prefixes):urlset.remove(node)
    if live:
        for path in ['/blog']+['/blog/'+p['slug'] for p in live]+['/authors/'+k for k in AUTHORS if any(p['author']==k for p in live)]:
            node=ET.SubElement(urlset,'{'+ns+'}url');ET.SubElement(node,'{'+ns+'}loc').text=BASE+path
    tree.write(output/'sitemap.xml',encoding='utf-8',xml_declaration=True)
    rss=ET.Element('rss',version='2.0');channel=ET.SubElement(rss,'channel')
    for name,value in [('title','The Revenue Inbox field guides'),('link',BASE+'/blog'),('description','Practical outbound decisions for B2B founders.'),('language','en-us')]:ET.SubElement(channel,name).text=value
    for post in live:
        item=ET.SubElement(channel,'item');url=BASE+'/blog/'+post['slug']
        for name,value in [('title',post['title']),('link',url),('guid',url),('description',post['summary']),('pubDate',format_datetime(datetime.fromisoformat(post['published']).replace(tzinfo=timezone.utc)))]:ET.SubElement(item,name).text=value
    (output/'blog').mkdir(exist_ok=True);ET.ElementTree(rss).write(output/'blog'/'feed.xml',encoding='utf-8',xml_declaration=True)
    previous=output/'.blog-generated.json'
    if previous.exists():
        for rel in json.loads(previous.read_text()):
            target=(output/rel).resolve()
            if rel not in generated and target.is_relative_to(output) and target.is_file() and (rel.startswith(('blog/','authors/','assets/og/blog-'))):target.unlink()
    previous.write_text(json.dumps(generated,indent=2),encoding='utf8')
    if include_review:
        (output/'robots.txt').write_text('User-agent: *\nDisallow: /\n',encoding='utf8')
        for html in output.rglob('*.html'):
            text=html.read_text(encoding='utf8').replace('content="index,follow"','content="noindex,nofollow"');html.write_text(text,encoding='utf8')
    print(f'Blog: {len(live)} approved public articles; {len(posts)-len(live)} review previews. Output: {output}')

def preview(output):
    output=output.resolve()
    if output==ROOT or not output.is_relative_to(ROOT/'.preview'):
        raise ValueError('Review output must be inside the project .preview directory')
    output.mkdir(parents=True,exist_ok=True)
    for folder in ['assets','case-studies','authors']:
        if (ROOT/folder).exists():shutil.copytree(ROOT/folder,output/folder,dirs_exist_ok=True)
    for file in ROOT.iterdir():
        if file.is_file() and (file.suffix in ['.html','.css','.js','.xml','.ico','.webmanifest'] or file.name in ['vercel.json','robots.txt']):
            if file.is_file():shutil.copy2(file,output/file.name)
    build(output,True)

if __name__=='__main__':
    parser=argparse.ArgumentParser();parser.add_argument('--preview',action='store_true');args=parser.parse_args()
    build(ROOT)
    if args.preview:preview(ROOT/'.preview'/'blog')
