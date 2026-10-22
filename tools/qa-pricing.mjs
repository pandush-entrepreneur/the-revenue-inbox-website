import {chromium,firefox,webkit} from '../reference/qa/node_modules/playwright/index.mjs';
import {findChrome} from '../../taste-skill/skills/taste-skill/scripts/lib/cdp.mjs';
import fs from 'node:fs';
import assert from 'node:assert/strict';

const base='http://127.0.0.1:4174',out='evidence/pricing';
fs.mkdirSync(out,{recursive:true});
const report={layouts:[],accessibility:[],interactions:[],noJavaScript:[]};
const routes=['/pricing','/','/cold-email-agency','/blog/cold-email-agency-pricing','/case-studies/grail'];
for(const [name,engine] of [['Chrome',chromium],['Firefox',firefox],['WebKit',webkit]]){
 const browser=await engine.launch({headless:true,...(name==='Chrome'?{executablePath:findChrome()}:{})});
 try{
  for(const width of name==='Chrome'?[320,360,390,768,1024,1440,1920]:[390,1440]){
   const page=await browser.newPage({viewport:{width,height:900},reducedMotion:'reduce'});
   const errors=[];page.on('pageerror',e=>errors.push(e.message));
   page.on('requestfailed',r=>{if(r.url().startsWith(base))errors.push(r.url()+': '+r.failure()?.errorText);});
   for(const route of routes){
    errors.length=0;const response=await page.goto(base+route,{waitUntil:'networkidle'});
    await page.evaluate(()=>document.fonts.ready);
    await page.evaluate(()=>Promise.all([...document.images].map(i=>{i.loading='eager';return i.decode().catch(()=>{});})));
    const data=await page.evaluate(()=>({overflow:document.documentElement.scrollWidth>innerWidth+1,h1:document.querySelectorAll('h1').length,brokenImages:[...document.images].filter(i=>i.complete&&!i.naturalWidth).map(i=>i.src),fonts:document.fonts.check('600 32px Manrope')&&document.fonts.check('400 16px "DM Sans"'),moreLinks:[...document.querySelectorAll('.desktop-nav .nav-more-panel a')].map(a=>a.getAttribute('href'))}));
    report.layouts.push({engine:name,width,route,status:response.status(),...data,errors:[...errors]});
    if(name==='Chrome'&&route==='/pricing'&&[390,768,1440].includes(width))await page.screenshot({path:`${out}/pricing-${width}.png`,fullPage:true});
    if(route==='/pricing'&&[390,1440].includes(width)){
     await page.addScriptTag({path:'reference/qa/node_modules/axe-core/axe.min.js'});
     report.accessibility.push({engine:name,width,...await page.evaluate(async()=>({violations:(await axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21a','wcag21aa']}})).violations.map(v=>({id:v.id,impact:v.impact,targets:v.nodes.map(n=>n.target)}))}))});
    }
   }
   if(width===1440){
    await page.goto(base+'/pricing',{waitUntil:'networkidle'});
    const more=page.locator('.desktop-nav .nav-more'),summary=more.locator('summary');
    await summary.hover();await more.locator('a[href="/pricing"]').waitFor({state:'visible'});
    assert(await more.evaluate(e=>e.open));
    await more.locator('a[href="/cold-email-agency"]').hover();assert(await more.evaluate(e=>e.open));
    if(name==='Chrome')await page.screenshot({path:`${out}/more-desktop.png`});
    await page.mouse.move(1100,500);await page.waitForFunction(()=>!document.querySelector('.desktop-nav .nav-more').open);
    await summary.focus();await page.keyboard.press('ArrowDown');
    assert(await more.locator('a').first().evaluate(e=>e===document.activeElement));
    await page.keyboard.press('Escape');assert.equal(await more.evaluate(e=>e.open),false);
    assert(await summary.evaluate(e=>e===document.activeElement));
    await page.keyboard.press('Enter');assert(await more.evaluate(e=>e.open));
    await page.locator('h1').click();assert.equal(await more.evaluate(e=>e.open),false);
    report.interactions.push({engine:name,desktopHover:true,pointerIntoPanel:true,mouseLeave:true,keyboardOpen:true,escapeFocus:true,outsideClick:true});
    const meetings=page.locator('#pricing-meetings');
    for(const [count,standard,express] of [[0,'$1,500','$2,500'],[20,'$3,500','$4,500'],[60,'$7,500','$8,500']]){
     await meetings.evaluate((e,value)=>{e.value=value;e.dispatchEvent(new Event('input',{bubbles:true}));},String(count));
     assert.equal(await page.locator('#standard-monthly-total').innerText(),standard);
     assert.equal(await page.locator('#express-monthly-total').innerText(),express);
     assert((await page.locator('#basic-monthly-total').innerText()).includes('+ vendor costs'));
    }
    await meetings.evaluate(e=>{e.value='20';e.dispatchEvent(new Event('input',{bubbles:true}));});
    await page.locator('#basic-vendor-budget').fill('200.50');assert.equal(await page.locator('#basic-monthly-total').innerText(),'$2,200.50');
    await page.locator('#basic-vendor-budget').fill('-1');assert(await page.locator('#vendor-budget-error').isVisible());
    assert.equal(await page.locator('#basic-vendor-budget').getAttribute('aria-invalid'),'true');
    await page.locator('#basic-vendor-budget').fill('');assert.equal(await page.locator('#vendor-budget-error').isVisible(),false);
    assert((await page.locator('#basic-monthly-total').innerText()).includes('+ vendor costs'));
    report.interactions.push({engine:name,zeroMeetings:true,twentyMeetings:true,sixtyMeetings:true,vendorCents:true,invalidBudget:true,clearedBudget:true});
   }
   await page.close();
  }
  if(name==='Chrome'||name==='WebKit'){
   const context=await browser.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true,reducedMotion:'reduce'});
   const page=await context.newPage();await page.goto(base,{waitUntil:'networkidle'});
   await page.locator('.mobile-menu > summary').tap();await page.locator('.mobile-menu .nav-more > summary').tap();
   assert(await page.locator('.mobile-menu a[href="/pricing"]').isVisible());
   await page.screenshot({path:`${out}/more-mobile-${name}.png`});
   await page.locator('.mobile-menu a[href="/pricing"]').tap();await page.waitForURL(base+'/pricing');
   assert.equal(await page.locator('h1').innerText(),'Cold email agency pricing.');
   await page.route('https://assets.calendly.com/**',r=>r.abort());
   await page.route('https://calendly.com/**',r=>r.abort());
   for(const id of ['basic','standard','express']){
    const button=page.locator(`#${id} .button`);await button.tap();
    assert(await page.locator('.booking-dialog').evaluate(e=>e.open));
    await page.keyboard.press('Escape');assert.equal(await page.locator('.booking-dialog').evaluate(e=>e.open),false);
    assert(await button.evaluate(e=>e===document.activeElement));
   }
   await page.locator('#faq summary').first().tap();assert(await page.locator('#faq details').first().evaluate(e=>e.open));
   report.interactions.push({engine:name,mobileMoreTap:true,mobilePricingNavigation:true,threeBookingButtons:true,bookingFocusRestored:true,faq:true});
   await context.close();
   const nojs=await browser.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true,javaScriptEnabled:false});
   const p=await nojs.newPage();await p.goto(base+'/pricing',{waitUntil:'networkidle'});
   assert.equal(await p.locator('.plan-card').count(),3);assert(await p.locator('#pricing-meetings').isDisabled());
   assert((await p.locator('#basic-monthly-total').innerText()).includes('+ vendor costs'));
   await p.locator('.mobile-menu > summary').tap();await p.locator('.mobile-menu .nav-more > summary').tap();assert(await p.locator('.mobile-menu a[href="/pricing"]').isVisible());
   report.noJavaScript.push({threePlans:true,staticCosts:true,nativeMoreNavigation:true});await nojs.close();
  }
 }finally{await browser.close();}
}
const failures=report.layouts.filter(r=>r.overflow||r.h1!==1||r.status!==200||r.brokenImages.length||!r.fonts||r.errors.length||r.moreLinks.join(',')!=='/cold-email-agency,/pricing');
const accessibility=report.accessibility.filter(r=>r.violations.length);
report.summary={layouts:report.layouts.length,failures,accessibility,interactionGroups:report.interactions.length,noJavaScript:report.noJavaScript};
fs.writeFileSync(`${out}/qa.json`,JSON.stringify(report,null,2));console.log(JSON.stringify(report.summary,null,2));
if(failures.length||accessibility.length)process.exitCode=1;
