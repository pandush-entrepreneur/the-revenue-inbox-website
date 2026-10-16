"""Normalize existing client logo contours with native SVG filters."""
from pathlib import Path
import base64,re
from PIL import Image
ROOT=Path(__file__).resolve().parents[1]
out=ROOT/'assets'/'client-display';out.mkdir(exist_ok=True)
for name in ['client-0.webp','client-1.webp','client-2.webp','client-3.webp','client-4.webp','client-grail.svg','client-smpl-c.webp','client-eventrx.webp','client-vtslabs.svg']:
    source=ROOT/'assets'/name
    if source.suffix=='.webp':
        w,h=Image.open(source).size;mime='image/webp'
    else:
        text=source.read_text();view=re.search(r"viewBox=[\"']([^\"']+)",text)
        w,h=[float(n) for n in view[1].replace(',',' ').split()][2:];mime='image/svg+xml'
    data=base64.b64encode(source.read_bytes()).decode()
    (out/(source.stem+'.svg')).write_text(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}"><defs><filter id="ink" x="0" y="0" width="100%" height="100%" color-interpolation-filters="sRGB"><feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 -.2126 -.7152 -.0722 1 0"/></filter></defs><image width="{w}" height="{h}" href="data:{mime};base64,{data}" filter="url(#ink)"/></svg>',encoding='utf8')
