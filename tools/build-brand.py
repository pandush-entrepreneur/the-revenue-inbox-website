from pathlib import Path
import json,math,re
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from PIL import Image,ImageDraw,ImageFont,ImageFilter
ROOT=Path(__file__).resolve().parents[1];B=ROOT/'assets'/'brand';B.mkdir(exist_ok=True)
# Preserve the supplied artwork exactly. Format conversion and CSS rounding only.
import base64,shutil
original=ROOT/'The Revenue - 1.png'
shutil.copyfile(original,B/'logo-original.png')
logo=Image.open(original).convert('RGBA')
logo.save(B/'logo-original.webp',lossless=True,method=6)
# Isolate original dark lettering, preserving its exact composition.
from PIL import ImageChops
import subprocess
rgb=logo.convert('RGB')
r,g,b=rgb.split();maximum=ImageChops.lighter(ImageChops.lighter(r,g),b)
alpha=maximum.point(lambda value:255 if value<120 else 0)
mask=Image.new('L',logo.size,255);mask.paste(0,(0,0,500,500),alpha)
mask.save(ROOT/'reference'/'original-lettering-mask.png')
subprocess.run(['node',str(ROOT/'tools'/'build-wordmark.cjs')],check=True)
wordmark=Image.new('RGBA',logo.size,'white');wordmark.putalpha(alpha);wordmark=wordmark.crop((88,162,417,338))
wordmark.save(B/'logo-lettering.png')
ink=Image.new('RGBA',logo.size,'#161122');ink.putalpha(alpha);ink.crop((88,162,417,338)).save(B/'logo-lettering-ink.png')
for size,name in [(32,'favicon-32.png'),(180,'apple-touch-icon.png'),(192,'icon-192.png'),(512,'icon-512.png')]:
    im=Image.new('RGBA',(size,size));d=ImageDraw.Draw(im);d.rounded_rectangle((0,0,size-1,size-1),radius=round(size*.14),fill='#161122')
    mark=wordmark.copy();mark.thumbnail((round(size*.85),round(size*.6)),Image.Resampling.LANCZOS);im.alpha_composite(mark,((size-mark.width)//2,(size-mark.height)//2));im.save(B/name)
(B/'favicon.svg').write_text('<svg xmlns="http://www.w3.org/2000/svg" viewBox="88 162 329 176"><style>path{fill:#161122}@media(prefers-color-scheme:dark){path{fill:#ffffff}}</style>'+re.search(r'(<path.*)</svg>',(B/'logo-dark.svg').read_text(),re.S)[1]+'</svg>',encoding='utf8')
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
    badge=wordmark.resize((112,60),Image.Resampling.LANCZOS);im.paste(badge,(64,54),badge);d=ImageDraw.Draw(im)
    d.text((198,64),'The Revenue Inbox',font=ImageFont.truetype(face,28),fill='#ffffff');d.text((64,167),label,font=ImageFont.truetype(bodyface,24),fill='#d6d0de')
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
print('Preserved original logo artwork in optimized formats, favicon family and eight OG cards.')
