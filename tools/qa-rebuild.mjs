import { chromium, firefox, webkit } from '../reference/qa/node_modules/playwright/index.mjs';
import {findChrome} from '../../taste-skill/skills/taste-skill/scripts/lib/cdp.mjs';
import {readFileSync,writeFileSync,mkdirSync} from 'node:fs';
const base='http://127.0.0.1:4174',out='evidence/rebuild';mkdirSync(out,{recursive:true});
const source=JSON.parse(readFileSync('tools/rebuild-data.json','utf8'));
const paths=['/','/case-studies',...source.map(r=>'/case-studies/'+r.id)];
const report={layouts:[],accessibility:[],interactions:{},engines:{}};
for(const [name,engine] of [['chrome',chromium],['firefox',firefox],['webkit',webkit]]){
 const browser=await engine.launch({headless:true,...(name==='chrome'?{executablePath:findChrome()}: {})});
 try{
  report.engines[name]=browser.version();
  for(const width of name==='chrome'?[360,375,390,768,1024,1366,1440,1920]:[390,1440])for(const path of paths){
   const context=await browser.newContext({viewport:{width,height:width<768?812:width===1366?768:900},reducedMotion:'reduce',...(name==='chrome'&&width<768?{isMobile:true,hasTouch:true}: {})});
   const page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
   const response=await page.goto(base+path);await page.evaluate(()=>document.fonts.ready);await page.waitForTimeout(100);
   const row=await page.evaluate(()=>({overflow:document.documentElement.scrollWidth>innerWidth,h1:document.querySelectorAll('h1').length,missingImages:[...document.images].filter(i=>i.complete&&!i.naturalWidth).map(i=>i.src),initialPlayers:document.querySelectorAll('iframe').length,badAnchors:[...document.querySelectorAll('a[href^="#"]')].filter(a=>!document.getElementById(a.hash.slice(1))).map(a=>a.hash),smallTargets:[...document.querySelectorAll('a,button,summary,input[type=range]')].filter(e=>{const r=e.getBoundingClientRect();return r.width&&r.height&&(r.height<43.5||r.width<43.5)}).map(e=>({tag:e.tagName,text:e.textContent.trim().slice(0,40),height:e.getBoundingClientRect().height,width:e.getBoundingClientRect().width})),title:document.title,canonical:document.querySelector('link[rel=canonical]')?.href,description:document.querySelector('meta[name=description]')?.content,headline:document.querySelector('h1')?.textContent.trim(),ctaAboveFold:location.pathname!=='/'||document.querySelector('.hero-copy .button').getBoundingClientRect().bottom<innerHeight,oldClaims:/240 qualified meetings|20%.*ARR growth|illustrative/i.test(document.querySelector('main').innerText),initialKpis:[...document.querySelectorAll('.kpi dd')].map(e=>e.textContent.trim())}));
   report.layouts.push({engine:name,width,path,status:response.status(),...row,errors});
   if(name==='chrome'&&[390,1440].includes(width)){
    const key=path==='/'?'home':path.replaceAll('/','-').slice(1);await page.screenshot({path:`${out}/${key}-${width}-fold.png`});
    if(path==='/'||path==='/case-studies'||path.endsWith('parking-compliance-systems')||path.endsWith('networked-fundraise'))await page.screenshot({path:`${out}/${key}-${width}-full.jpg`,fullPage:true,type:'jpeg',quality:82});
   }
   if(name==='chrome'&&width===390){
    await page.addScriptTag({path:'reference/qa/node_modules/axe-core/axe.min.js'});
    const axe=await page.evaluate(async()=>{const r=await axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21a','wcag21aa']}});return r.violations.map(v=>({id:v.id,impact:v.impact,help:v.help,nodes:v.nodes.map(n=>({target:n.target,summary:n.failureSummary}))}));});
    report.accessibility.push({path,violations:axe});
   }
   const record=source.find(r=>path.endsWith(r.id));if(record){const email=await page.locator('.email-body').textContent();if(email!==record.email)report.layouts.at(-1).emailMismatch={expected:record.email,actual:email};}
   await context.close();
  }
  if(name==='chrome'){
   const context=await browser.newContext({viewport:{width:375,height:667},isMobile:true,hasTouch:true});const page=await context.newPage();await page.goto(base);await page.evaluate(()=>document.fonts.ready);await page.waitForTimeout(400);
   report.interactions.shortPhoneCTA=await page.locator('.hero-copy .button').evaluate(e=>e.getBoundingClientRect().bottom<innerHeight);
   await page.evaluate(()=>{window.events=[];document.addEventListener('revenue-inbox:event',e=>window.events.push(e.detail));});
   await page.locator('.hero-copy .button').tap();report.interactions.booking=await page.evaluate(()=>({open:document.querySelector('dialog').open,iframe:!!document.querySelector('dialog iframe'),focus:document.activeElement.className}));await page.keyboard.press('Escape');report.interactions.escape=await page.evaluate(()=>({closed:!document.querySelector('dialog').open,focus:document.activeElement.matches('.hero-copy .button')}));
   const slider=async(id,value)=>page.locator(id).evaluate((el,v)=>{el.value=v;el.dispatchEvent(new Event('input',{bubbles:true}));},value);
   await slider('#contract-value','50000');await slider('#close-rate','20');report.interactions.roi=await page.evaluate(()=>({breakEven:document.querySelector('#break-even').textContent,revenue:document.querySelector('#revenue-0').textContent,deals:document.querySelector('#deals-0').textContent}));
   await slider('#contract-value','5000');await slider('#close-rate','5');report.interactions.roiLow=await page.evaluate(()=>({breakEven:document.querySelector('#break-even').textContent,revenue:document.querySelector('#revenue-0').textContent}));
   await slider('#appointment-count','60');report.interactions.price=await page.locator('#monthly-total').textContent();
   await page.locator('.faq-list summary').first().click();report.interactions.faq=await page.locator('.faq-list details').first().evaluate(e=>e.open);
   await page.locator('#system').scrollIntoViewIfNeeded();await page.waitForTimeout(100);report.interactions.sticky=await page.locator('.mobile-booking').isVisible();
   await page.locator('#contact').scrollIntoViewIfNeeded();await page.waitForTimeout(100);report.interactions.stickyHidden=!(await page.locator('.mobile-booking').isVisible());
   report.interactions.events=await page.evaluate(()=>window.events);
   await page.goto(base+'/case-studies');await page.locator('[data-filter=Fundraising]').click();report.interactions.filterCount=await page.locator('.case-card:visible').count();
   await page.goto(base+'/case-studies/networked-fundraise');const pill=page.locator('.merge-pill').first();await pill.tap();report.interactions.tooltip=await page.locator('.merge-tooltip').evaluate(e=>({visible:!e.hidden,left:e.getBoundingClientRect().left,right:e.getBoundingClientRect().right,width:innerWidth}));
   await context.close();
   const nojs=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:844}});const np=await nojs.newPage();await np.goto(base+'/case-studies/grail');report.interactions.noJS=await np.evaluate(()=>({kpis:[...document.querySelectorAll('.kpi dd')].map(e=>e.textContent),email:!!document.querySelector('.email-body'),players:document.querySelectorAll('iframe').length}));await nojs.close();
  }
 }finally{await browser.close();}
}
writeFileSync(`${out}/qa.json`,JSON.stringify(report,null,2));
const bad=report.layouts.filter(x=>x.overflow||x.h1!==1||x.status!==200||x.missingImages.length||x.initialPlayers||x.badAnchors.length||x.errors.length||x.emailMismatch||!x.ctaAboveFold||x.oldClaims);
console.log(JSON.stringify({checks:report.layouts.length,failures:bad,smallTargets:report.layouts.filter(x=>x.smallTargets.length).map(x=>({engine:x.engine,path:x.path,width:x.width,targets:x.smallTargets})),axe:report.accessibility.filter(x=>x.violations.length),interactions:report.interactions,engines:report.engines},null,2));
