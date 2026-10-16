from pathlib import Path
import json,math,re
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from PIL import Image,ImageDraw,ImageFont,ImageFilter
ROOT=Path(__file__).resolve().parents[1];B=ROOT/'assets'/'brand';B.mkdir(exist_ok=True)
font=TTFont(ROOT/'reference'/'Anton-Regular.ttf');glyphs=font.getGlyphSet();cmap=font.getBestCmap();upm=font['head'].unitsPerEm
def word(text,x,y,size):
    pen=SVGPathPen(glyphs);cursor=0
    for ch in text:
        name=cmap.get(ord(ch));g=glyphs[name]
        g.draw(TransformPen(pen,(size/upm,0,0,-size/upm,x+cursor,y)))
        cursor+=g.width*size/upm
    return pen.getCommands()
paths=[word('THE',3,58,28),word('REVENUE',55,58,62),word('INBOX',0,165,124)]
for mode,fill in [('dark','#ffffff'),('light','#161122')]:
    body=''.join(f'<path d="{d}" fill="{fill}"/>' for d in paths)
    svg=f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 330 176" role="img" aria-label="The Revenue Inbox"><title>The Revenue Inbox</title>{body}</svg>'
    (B/f'logo-{mode}.svg').write_text(svg,encoding='utf8')
body=''.join(f'<path d="{d}" fill="#ffffff"/>' for d in paths)
(B/'logo-glow.svg').write_text(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="-20 -20 370 216"><title>The Revenue Inbox</title><defs><filter id="glow" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="7"/></filter></defs><g opacity=".2" filter="url(#glow)" fill="#8a40ea">{body}</g>{body}</svg>',encoding='utf8')
mark=word('IN',36,196,190)
(B/'favicon.svg').write_text(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><title>The Revenue Inbox</title><rect width="256" height="256" rx="44" fill="#8a40ea"/><path d="{mark}" fill="#fff"/></svg>',encoding='utf8')
anton=ImageFont.truetype(str(ROOT/'reference'/'Anton-Regular.ttf'),190)
for size,name in [(32,'favicon-32.png'),(180,'apple-touch-icon.png'),(192,'icon-192.png'),(512,'icon-512.png')]:
    im=Image.new('RGBA',(512,512),(0,0,0,0));d=ImageDraw.Draw(im);d.rounded_rectangle((0,0,511,511),radius=88,fill='#8a40ea');f=ImageFont.truetype(str(ROOT/'reference'/'Anton-Regular.ttf'),380);d.text((74,40),'IN',font=f,fill='white');im.resize((size,size),Image.Resampling.LANCZOS).save(B/name)
Image.open(B/'icon-192.png').save(ROOT/'favicon.ico',sizes=[(16,16),(32,32),(48,48)])
for index in [0,6]:
    f=TTFont(ROOT/'assets'/f'font-{index}.woff2');f.flavor=None;f.save(ROOT/'reference'/f'font-{index}.ttf')
face=str(ROOT/'reference'/'font-6.ttf');bodyface=str(ROOT/'reference'/'font-0.ttf')
og=ROOT/'assets'/'og';og.mkdir(exist_ok=True)
records=json.loads((ROOT/'tools'/'rebuild-data.json').read_text(encoding='utf8'))
cards=[('home','20 qualified meetings.','30 days. Or we work for free.','Done-for-you B2B outbound'),('case-studies','The work. The numbers.','Six campaigns. Every handoff.','B2B outbound case studies')]+[(r['id'],r['primary'],r['title'],r['name']) for r in records]
for key,big,title,label in cards:
    im=Image.new('RGB',(1200,630),'#161122');d=ImageDraw.Draw(im)
    for x in range(0,1200,60):d.line((x,0,x,630),fill='#21182f')
    for y in range(0,630,60):d.line((0,y,1200,y),fill='#21182f')
    glow=Image.new('RGBA',im.size);g=ImageDraw.Draw(glow);g.ellipse((650,-280,1400,470),fill=(138,64,234,36));glow=glow.filter(ImageFilter.GaussianBlur(110));im=Image.alpha_composite(im.convert('RGBA'),glow).convert('RGB');d=ImageDraw.Draw(im)
    d.rounded_rectangle((64,64,105,105),radius=9,fill='#8a40ea');d.text((74,67),'IN',font=ImageFont.truetype(str(ROOT/'reference'/'Anton-Regular.ttf'),28),fill='white')
    d.text((122,64),'The Revenue Inbox',font=ImageFont.truetype(face,28),fill='#ffffff');d.text((64,167),label,font=ImageFont.truetype(bodyface,24),fill='#d6d0de')
    fs=82 if len(big)>12 else 114
    while d.textbbox((0,0),big,font=ImageFont.truetype(face,fs))[2]>1070:fs-=2
    d.text((58,217),big,font=ImageFont.truetype(face,fs),fill='#ffffff')
    lines=[];line='';f=ImageFont.truetype(face,34)
    for w in title.split():
        if d.textlength(line+' '+w,font=f)>1010:lines.append(line);line=w
        else:line=(line+' '+w).strip()
    lines.append(line)
    for n,line in enumerate(lines):d.text((64,365+n*47),line,font=f,fill='#d9c0fa')
    d.text((64,548),'therevenueinbox.com',font=ImageFont.truetype(bodyface,22),fill='#d6d0de')
    d.line((64,518,1136,518),fill='#4b1d8f',width=2)
    im.save(og/f'{key}.png',optimize=True)
print('Built outlined logo variants, favicon family and eight 1200x630 OG cards.')
