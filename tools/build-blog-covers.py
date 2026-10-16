"""Original editorial SVG covers. No stock assets or simulated client dashboards."""
from pathlib import Path
from html import escape

OUT=Path(__file__).resolve().parents[1]/'assets'/'blog'
OUT.mkdir(parents=True,exist_ok=True)
def text(x,y,s,size=24,fill='#F7F5FA',weight=500):
    return f'<text x="{x}" y="{y}" font-family="Arial,Helvetica,sans-serif" font-size="{size}" font-weight="{weight}" fill="{fill}">{escape(s)}</text>'
def rect(x,y,w,h,fill='#21182E',radius=18,stroke='#49375F'):
    return f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{radius}" fill="{fill}" stroke="{stroke}"/>'
def line(x,y,x2,y2,color='#745395',width=3):
    return f'<path d="M{x} {y}L{x2} {y2}" fill="none" stroke="{color}" stroke-width="{width}" stroke-linecap="round"/>'
def cover(key,title,label,body):
    svg=f'<svg xmlns="http://www.w3.org/2000/svg" width="960" height="640" viewBox="0 0 960 640" role="img" aria-labelledby="title"><title id="title">{escape(title)}</title><rect width="960" height="640" fill="#161122"/><path d="M0 160H960M0 480H960M160 0V640M800 0V640" stroke="#241B32"/>'+text(64,70,'THE REVENUE INBOX',17,'#C1B0D4')+text(64,586,label,20,'#C1B0D4')+body+'</svg>'
    (OUT/(key+'.svg')).write_text(svg,encoding='utf8')

body=rect(120,158,440,310)+text(156,211,'THE FULL COST',20,'#C1B0D4')
for y,w,label in [(246,220,'Appointments'),(316,150,'Infrastructure')]:
    body+=rect(156,y,w,24,'#8A40EA',5,'#8A40EA')+text(156,y+54,label,18,'#C1B0D4')
body+=rect(622,205,200,254,'#30203F')+rect(648,231,148,55,'#161122',8)+text(668,268,'a + b',28,'#E4D4F8')
for y in [309,358,407]:
    for x in [648,702,756]:body+=rect(x,y,40,30,'#49305F',5,'#49305F')
cover('cost','A calculator beside appointment and infrastructure cost components','PRICING / COUNT THE WHOLE BILL',body)

body=''
for x,label,marks in [(132,'Monthly retainer',[(0,0),(1,0),(2,0)]),(516,'Per appointment',[(0,0),(2,1),(1,2)])]:
    body+=rect(x,166,312,300)+text(x+26,212,label,23)+line(x+24,238,x+288,238)
    for row in range(3):
        for col in range(3):body+=rect(x+30+col*83,264+row*57,63,38,'#271D35',6,'#49375F')
    for col,row in marks:body+=rect(x+30+col*83,264+row*57,63,38,'#8A40EA',6,'#8A40EA')
cover('model','Two calendar panels representing retainer and appointment-based billing','BUYING MODELS / DEFINE THE COMMITMENT',body)

body=rect(190,156,580,300,'#271D35')
body+=f'<path d="M191 176L480 362 769 176M191 438L381 309M769 438L579 309" fill="none" stroke="#8A40EA" stroke-width="4"/>'
body+=rect(306,126,348,174,'#21182E')
body+=text(340,174,'A reason to write.',24)+line(340,202,610,202,'#806596')+line(340,225,570,225,'#806596')+line(340,248,530,248,'#806596')
body+=rect(603,387,166,68,'#8A40EA',34,'#8A40EA')+text(641,430,'Reply →',24)
cover('templates','An open envelope with a short message and a reply tab','TEMPLATES / MAKE THE NEXT LINE COUNT',body)

body=rect(134,187,278,254)+text(166,237,'Sending domain',23)
for y,label in [(280,'SPF'),(334,'DKIM'),(388,'DMARC')]:
    body+=text(168,y,label,20,'#C1B0D4')+f'<path d="M335 {y-9}l9 9 16-19" fill="none" stroke="#B388ED" stroke-width="4"/>'
body+=line(412,314,538,314,'#8A40EA',4)
body+='<path d="M670 166L785 212V318C785 396 716 446 670 466 624 446 555 396 555 318V212Z" fill="#30203F" stroke="#8A40EA" stroke-width="4"/>'
body+='<path d="m620 313 35 35 70-82" fill="none" stroke="#E4D4F8" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>'
cover('deliverability','Email authentication records connected to a shield; a checklist concept, not a live audit','DELIVERABILITY / CHECK BEFORE YOU SEND',body)

body=rect(126,171,300,286)+text(158,228,'Clay',38)+text(158,270,'Research & enrichment',19,'#C1B0D4')
for y in [310,345,380]:
    for x in [158,222,286,350]:body+=rect(x,y,44,20,'#49305F',4,'#49305F')
body+=line(426,313,496,313,'#8A40EA',4)+line(496,243,496,391,'#8A40EA',4)+line(496,243,550,243,'#8A40EA',4)+line(496,391,550,391,'#8A40EA',4)
for y,label in [(181,'Instantly'),(329,'Smartlead')]:
    body+=rect(550,y,282,122,'#30203F')+text(582,y+49,label,31)+text(582,y+85,'Outreach & replies',18,'#C1B0D4')
cover('tools','Clay connected to Instantly or Smartlead as alternative outreach routes','TOOL GUIDE / CHOOSE THE JOB FIRST',body)

body=rect(126,167,708,304)+text(164,220,'One campaign. Different stages.',25)
body+=text(164,281,'Booked',20,'#C1B0D4')+rect(164,300,530,32,'#8A40EA',5,'#8A40EA')+text(718,327,'188',28)
body+=text(164,383,'Held',20,'#C1B0D4')+rect(164,402,372,32,'#8A40EA',5,'#8A40EA')+text(560,429,'132',28)
cover('metrics','Networked fundraising case: 188 booked meetings and 132 held; bars use a common linear scale','MEASUREMENT / KEEP THE DENOMINATOR',body)
print('Built six original topic-specific SVG covers.')
