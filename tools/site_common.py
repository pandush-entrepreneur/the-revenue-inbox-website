"""Development-only static authoring. Case narrative is rendered from the supplied source."""
from pathlib import Path
import re,json,math,html,hashlib,shutil
import markdown
from bs4 import BeautifulSoup

ROOT=Path(__file__).resolve().parents[1]
BASE='https://www.therevenueinbox.com'
BOOK='https://calendly.com/therevenueinboxagency/discovery'
PROMISE='20 qualified meetings. 30 days. Or we work for free.'
SOURCE=(ROOT/'case-studies-copy.md').read_text(encoding='utf8')
OUT=ROOT/'case-studies';OUT.mkdir(exist_ok=True)
ASSETS=ROOT/'assets';(ASSETS/'brand').mkdir(exist_ok=True)
e=lambda s:html.escape(str(s),quote=True)
def md(s):return markdown.markdown(s,extensions=['tables','sane_lists'])
def icon(name='arrow'):
    paths={'arrow':'M5 12h14m-6-6 6 6-6 6','mail':'M3 6h18v12H3z M3 6l9 7 9-7','calendar':'M5 5h14v16H5z M8 2v6m8-6v6M5 10h14','check':'m5 12 4 4 10-10','play':'m9 5 11 7-11 7Z','plus':'M12 5v14M5 12h14','menu':'M4 8h16M4 16h16','people':'M5 21v-3a7 7 0 0 1 14 0v3M12 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8'}
    return f'<svg aria-hidden="true" viewBox="0 0 24 24" fill="none"><path d="{paths[name]}"/></svg>'
def cta(location,label='Book your strategy call'):
    return f'<a class="button primary" href="{BOOK}" data-event="cta_click" data-location="{location}"><span>{label}</span>{icon()}</a>'
def section(id,body,cls=''):
    return f'<section class="section {cls}" id="{id}"><div class="container">{body}</div></section>'
def intro(title,sub='',label=''):
    return f'<div class="section-heading">'+(f'<p class="eyebrow">{label}</p>' if label else '')+f'<h2>{title}</h2>'+(f'<p class="section-sub">{sub}</p>' if sub else '')+'</div>'
def header():
    links='<a href="/cold-email-agency">Cold email agency</a><a href="/case-studies">Case studies</a><a href="/blog">Blog</a><a href="/#math">The math</a><a href="/#pricing">Pricing</a>'
    return f'<header class="site-header"><div class="container nav-inner"><a class="brand" href="/" aria-label="The Revenue Inbox home"><img src="/assets/brand/wordmark-white.svg" width="108" height="58" alt="The Revenue Inbox"></a><nav class="desktop-nav" aria-label="Main navigation">{links}</nav><div class="nav-actions">{cta("navigation")}<details class="mobile-menu"><summary aria-label="Open navigation">{icon("menu")}</summary><nav aria-label="Mobile navigation">{links}</nav></details></div></div></header>'
def footer():
    return f'''<footer class="site-footer"><div class="container"><div class="footer-top"><a class="brand logo-glow" href="/" aria-label="The Revenue Inbox home"><img src="/assets/brand/wordmark-white.svg" width="108" height="58" alt="The Revenue Inbox"></a><p>Done-for-you B2B outbound.<br>Owned from first contact to qualified call.</p><nav aria-label="Footer"><a href="/#system">The system</a><a href="/cold-email-agency">Cold email agency</a><a href="/case-studies">Case studies</a><a href="/blog">Blog</a><a href="/#pricing">Pricing</a><a href="/#faq">Questions</a></nav><nav aria-label="Contact"><a href="https://www.linkedin.com/in/pandush/" target="_blank" rel="noopener">Pandush on LinkedIn</a><a href="https://www.linkedin.com/in/umair-murtaza/" target="_blank" rel="noopener">Umair on LinkedIn</a><a href="{BOOK}" data-event="cta_click" data-location="footer">Book your strategy call</a></nav></div><div class="footer-legal"><p>The Revenue Inbox is a trading name of Meerion Ltd, registered in England and Wales, company number 16682944.</p><p>© 2026 The Revenue Inbox.</p></div></div></footer>'''
def closing(title='Your next customer starts with a conversation.',study=False):
    sub="30 minutes. We'll map your market and tell you honestly if outbound will work for it." if study else 'Bring your offer. We will map the buyers, look at the economics and tell you where outbound fits.'
    return section('contact',f'<div class="close-grid"><div><p class="eyebrow">Let’s talk about your market</p><h2>{title}</h2><p>{sub}</p></div><div class="close-action">{cta("final","Book a strategy call" if study else "Book your strategy call")}'+('' if study else '<p class="micro">30 minutes. A useful conversation about your market.</p>')+'</div></div>','closing-section')
def extras(home=False):
    return f'''<dialog class="booking-dialog" aria-labelledby="booking-title"><div class="dialog-head"><h2 id="booking-title">Book your strategy call.</h2><button class="dialog-close" type="button" aria-label="Close booking">Close {icon('plus')}</button></div><p class="micro">Calendar not loading? <a href="{BOOK}" target="_blank" rel="noopener">Open Calendly directly</a>.</p><div class="booking-embed"></div></dialog>'''+(f'<div class="mobile-booking" hidden>{cta("mobile-sticky")}</div>' if home else '')
ORG={'@type':'Organization','@id':BASE+'/#organization','name':'The Revenue Inbox','legalName':'Meerion Ltd','url':BASE+'/','logo':BASE+'/assets/brand/logo-lettering-ink.png','sameAs':['https://www.linkedin.com/in/pandush/','https://www.linkedin.com/in/umair-murtaza/']}
def page(path,title,desc,body,og='home',schemas=None,home=False,noindex=False,head_extra='',body_class=''):
    assert len(title)<60,(title,len(title))
    assert len(desc)<155,(desc,len(desc))
    canonical=BASE+path
    data={'@context':'https://schema.org','@graph':[ORG,{'@type':'WebSite','@id':BASE+'/#website','name':'The Revenue Inbox','url':BASE+'/','publisher':{'@id':ORG['@id']}}]+(schemas or [])}
    head=f'''<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>{e(title)}</title><meta name="description" content="{e(desc)}"><meta name="robots" content="{'noindex,follow' if noindex else 'index,follow'}"><link rel="canonical" href="{canonical}"><meta name="theme-color" content="#161122"><meta property="og:type" content="{'article' if path.startswith(('/case-studies/','/blog/')) else 'website'}"><meta property="og:site_name" content="The Revenue Inbox"><meta property="og:title" content="{e(title)}"><meta property="og:description" content="{e(desc)}"><meta property="og:url" content="{canonical}"><meta property="og:image" content="{BASE}/assets/og/{og}.png?v=20261022"><meta property="og:image:type" content="image/png"><meta property="og:image:secure_url" content="{BASE}/assets/og/{og}.png?v=20261022"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"><meta property="og:image:alt" content="{e(title)}"><meta name="twitter:image:alt" content="{e(title)}"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="{e(title)}"><meta name="twitter:description" content="{e(desc)}"><meta name="twitter:image" content="{BASE}/assets/og/{og}.png?v=20261022"><link rel="icon" href="/assets/brand/favicon.svg?v=wordmark" type="image/svg+xml"><link rel="icon" href="/assets/brand/favicon-32.png?v=wordmark" sizes="32x32"><link rel="apple-touch-icon" href="/assets/brand/apple-touch-icon.png?v=wordmark"><link rel="manifest" href="/site.webmanifest"><link rel="preload" href="/assets/font-6.woff2" as="font" type="font/woff2" crossorigin><link rel="preload" href="/assets/font-0.woff2" as="font" type="font/woff2" crossorigin><link rel="stylesheet" href="/styles.css"><script type="application/ld+json">{json.dumps(data,ensure_ascii=False).replace('</','<\\/')}</script>'''
    content='<!doctype html><html lang="en"><head>'+head+head_extra+'<script src="/analytics.js" defer></script></head><body class="'+body_class+'"><a class="skip" href="#main">Skip to content</a>'+header()+'<main id="main">'+body+'</main>'+footer()+extras(home)+'<script src="/assets/vendor/gsap-3.13.0.min.js" defer></script><script src="/assets/vendor/ScrollTrigger-3.13.0.min.js" defer></script><script src="/script.js" defer></script></body></html>'
    target=ROOT/('index.html' if path=='/' else (path.strip('/')+'.html'))
    target.parent.mkdir(exist_ok=True,parents=True);target.write_text(content,encoding='utf8')
    return target

