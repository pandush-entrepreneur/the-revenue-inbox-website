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
# The full site build uses this same renderer; no separate legacy OG style.
import runpy
runpy.run_path(str(ROOT/'tools'/'build-social-previews.py'),run_name='__main__')
print('Preserved original logo artwork, favicon family and current-brand social cards.')
