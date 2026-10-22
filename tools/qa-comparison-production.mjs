import {chromium,webkit} from '../reference/qa/node_modules/playwright/index.mjs';
import fs from 'node:fs';
import assert from 'node:assert/strict';
const base='https://www.therevenueinbox.com', out='evidence/comparisons/production.json';
const report={pages:[],interactions:[]};
const routes=['/','/compare','/compare/belkins','/compare/saleshive','/compare/martal','/compare/cience','/compare/cleverly','/pricing','/cold-email-agency','/blog','/case-studies/grail'];
const blocked=/googletagmanager\.com|google-analytics\.com|analytics\.google\.com|calendly\.com/;
const browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe'});
try{
 for(const width of [390,1440]){
  const context=await browser.newContext({viewport:{width,height:900},reducedMotion:'reduce',hasTouch:width===390});
  await context.route(blocked,r=>r.abort());
  const page=await context.newPage();
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  page.on('requestfailed',r=>{if(r.url().startsWith(base))errors.push(r.url()+': '+r.failure()?.errorText);});
  for(const route of routes){
   errors.length=0;const response=await page.goto(base+route,{waitUntil:'networkidle'});
   await page.evaluate(()=>document.fonts.ready);
   await page.evaluate(()=>Promise.all([...document.images].map(i=>{i.loading='eager';return i.decode().catch(()=>{});})));
   const data=await page.evaluate(()=>({overflow:document.documentElement.scrollWidth>innerWidth+1,h1:document.querySelectorAll('h1').length,brokenImages:[...document.images].filter(i=>!i.naturalWidth).map(i=>i.src),fonts:document.fonts.check('600 32px Manrope')&&document.fonts.check('400 16px "DM Sans"'),visuals:document.querySelectorAll('.comparison-visual').length,canonical:document.querySelector('link[rel=canonical]')?.href}));
   assert.equal(response.status(),200,route);assert(!data.overflow,route);assert.equal(data.h1,1,route);assert(!data.brokenImages.length,route);assert(data.fonts,route);assert(!errors.length,errors.join('\n'));assert.equal(data.canonical,base+route);
   if(route.startsWith('/compare/')){
    assert.equal(data.visuals,1,route);
    const spacing=await page.evaluate(()=>{const a=document.querySelector('#costs .comparison-table-intro'),b=document.querySelector('#costs .plan-table-scroll'),x=a.getBoundingClientRect(),y=b.getBoundingClientRect();return{margin:parseFloat(getComputedStyle(a).marginBottom),gap:y.top-x.bottom,left:Math.abs(x.left-y.left),right:Math.abs(x.right-y.right)};});
    assert(spacing.margin>=(width<768?24:32));assert(spacing.gap>=spacing.margin-1);assert(spacing.left<1&&spacing.right<1);
   }
   report.pages.push({width,route,status:response.status(),...data});
  }
  await page.goto(base+'/compare',{waitUntil:'networkidle'});
  assert.equal(await page.locator('.comparison-guide').count(),5);
  await page.locator('.comparison-guide[href="/compare/cleverly"]').click();await page.waitForURL(base+'/compare/cleverly');
  await page.locator('#faq summary').first().click();assert(await page.locator('#faq details').first().evaluate(e=>e.open));
  const booking=page.locator('.comparison-hero-actions .button');await booking.click();assert(await page.locator('.booking-dialog').evaluate(e=>e.open));
  await page.keyboard.press('Escape');await page.waitForFunction(()=>!document.querySelector('.booking-dialog').open);assert(!(await page.locator('.booking-dialog').evaluate(e=>e.open)));assert(await booking.evaluate(e=>e===document.activeElement));
  if(width===390){await page.locator('.mobile-menu > summary').tap();await page.locator('.mobile-menu .nav-more > summary').tap();await page.locator('.mobile-menu a[href="/compare"]').tap();await page.waitForURL(base+'/compare');}
  await page.goto(base+'/pricing',{waitUntil:'networkidle'});await page.locator('#pricing-meetings').evaluate(e=>{e.value='20';e.dispatchEvent(new Event('input',{bubbles:true}));});
  assert.equal(await page.locator('#standard-monthly-total').innerText(),'$3,500');assert.equal(await page.locator('#express-monthly-total').innerText(),'$4,500');
  report.interactions.push({width,hubLinks:true,faq:true,bookingDialog:true,focusRestored:true,pricingCalculator:true});await context.close();
 }
}finally{await browser.close();}
const safari=await webkit.launch();
try{const context=await safari.newContext({viewport:{width:390,height:844},hasTouch:true,javaScriptEnabled:false});await context.route(blocked,r=>r.abort());const p=await context.newPage();await p.goto(base+'/compare/cience',{waitUntil:'networkidle'});assert.equal(await p.locator('.comparison-visual').count(),1);await p.locator('.mobile-menu > summary').tap();await p.locator('.mobile-menu .nav-more > summary').tap();await p.locator('.mobile-menu a[href="/compare"]').tap();await p.waitForURL(base+'/compare');report.interactions.push({engine:'WebKit',noJavaScript:true,nativeVisual:true,nativeNavigation:true});}finally{await safari.close();}
fs.writeFileSync(out,JSON.stringify(report,null,2));console.log(`Production verified: ${report.pages.length} layouts, ${report.interactions.length} interaction groups; analytics and calendar requests blocked.`);
