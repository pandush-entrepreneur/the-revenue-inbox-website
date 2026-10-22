"""Shared social previews using the current website's wordmark, type and palette."""
from pathlib import Path
from fontTools.ttLib import TTFont
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1]


def face(index, size):
    target = ROOT / 'reference' / f'font-{index}.ttf'
    target.parent.mkdir(parents=True, exist_ok=True)
    if not target.exists():
        font = TTFont(ROOT / 'assets' / f'font-{index}.woff2')
        font.flavor = None
        font.save(target)
    return ImageFont.truetype(str(target), size)


def wrap(draw, text, font, width):
    lines = []
    line = ''
    for word in text.split():
        candidate = (line + ' ' + word).strip()
        if line and draw.textlength(candidate, font=font) > width:
            lines.append(line)
            line = word
        else:
            line = candidate
    return lines + [line]


def render_social_card(output, key, title, label, summary=''):
    image = Image.new('RGB', (1200, 630), '#0e0b16')
    draw = ImageDraw.Draw(image)
    mark = Image.open(ROOT / 'assets/brand/logo-lettering.png').convert('RGBA')
    mark.thumbnail((120, 64), Image.Resampling.LANCZOS)
    image.paste(mark, (64, 48), mark)
    draw.text((220, 66), label, font=face(0, 25), fill='#d6d0de')
    size = 72
    while True:
        font = face(6, size)
        lines = [line for paragraph in title.splitlines() for line in wrap(draw, paragraph, font, 1072)]
        if len(lines) <= 3 and len(lines) * (size + 13) <= 255:
            break
        size -= 2
        if size < 36:
            raise ValueError(f'Social title too long: {key}')
    for n, line in enumerate(lines):
        draw.text((60, 175 + n * (size + 13)), line, font=font, fill='#f7f5fa')
    if summary:
        summary_font = face(0, 26)
        summary_lines = wrap(draw, summary, summary_font, 1072)
        if len(summary_lines) > 2:
            raise ValueError(f'Social summary too long: {key}')
        for n, line in enumerate(summary_lines):
            draw.text((64, 440 + 35 * n), line, font=summary_font, fill='#d9c0fa')
    draw.line((64, 536, 1136, 536), fill='#4b1d8f', width=1)
    draw.text((64, 557), 'therevenueinbox.com', font=face(0, 23), fill='#d6d0de')
    target = Path(output) / 'assets' / 'og' / f'{key}.png'
    target.parent.mkdir(parents=True, exist_ok=True)
    image.save(target, optimize=True)
    return target
