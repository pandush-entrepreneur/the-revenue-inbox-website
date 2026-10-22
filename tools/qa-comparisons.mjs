import {chromium,firefox,webkit} from '../reference/qa/node_modules/playwright/index.mjs';
import fs from 'node:fs';
import assert from 'node:assert/strict';
const base='http://127.0.0.1:4174',out='evidence/comparisons';
fs.mkdirSync(out,{recursive:true});
const report={layouts:[],accessibility:[],navigation:[],noJavaScript:[],spacing:[],hubAlignments:[]};
for(const [name,engine] of [['Chrome',chromium],['Firefox',firefox],['WebKit',webkit]]){
 const browser=await engine.launch({headless:true,...(name==='Chrome'?{executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe'}:{})});
 try{
  for(const width of name==='Chrome'?[320,360,390,768,1024,1440,1920]:[390,1440]){
   const page=await browser.newPage({viewport:{width,height:900},reducedMotion:'reduce'});
   const errors=[];page.on('pageerror',e=>errors.push(e.message));
   page.on('requestfailed',r=>{if(r.url().startsWith(base))errors.push(r.url()+': '+r.failure()?.errorText);});
   for(const route of ['/compare','/compare/belkins','/compare/saleshive','/compare/martal','/compare/cience','/compare/cleverly']){
    errors.length=0;
    const response=await page.goto(base+route,{waitUntil:'networkidle'});
    await page.evaluate(()=>document.fonts.ready);
    const data=await page.evaluate(()=>({overflow:document.documentElement.scrollWidth>innerWidth+1,h1:document.querySelectorAll('h1').length,brokenImages:[...document.images].filter(i=>i.complete&&!i.naturalWidth).map(i=>i.src),fonts:document.fonts.check('600 32px Manrope')&&document.fonts.check('400 16px "DM Sans"'),moreLinks:[...document.querySelectorAll('.desktop-nav .nav-more-panel a')].map(a=>a.getAttribute('href'))}));
    report.layouts.push({engine:name,width,route,status:response.status(),...data,errors:[...errors]});
    if(route==='/compare'&&width>900){
     const cards=await page.locator('.comparison-guide').evaluateAll(elements=>elements.map(e=>({top:Math.round(e.getBoundingClientRect().top),width:e.getBoundingClientRect().width,bottom:e.getBoundingClientRect().bottom,linkBottom:e.querySelector('.text-link').getBoundingClientRect().bottom})));
     assert.equal(cards.length,5);assert(Math.max(...cards.map(c=>c.width))-Math.min(...cards.map(c=>c.width))<=1);
     for(const top of new Set(cards.map(c=>c.top))){
      const row=cards.filter(c=>c.top===top);
      assert(Math.max(...row.map(c=>c.bottom))-Math.min(...row.map(c=>c.bottom))<=1);
      assert(Math.max(...row.map(c=>c.linkBottom))-Math.min(...row.map(c=>c.linkBottom))<=1);
     }
     report.hubAlignments.push({engine:name,width,cards});
    }
    if(name==='Chrome'&&[390,768,1440].includes(width)){
     const stem=route==='/compare'?'hub':route.split('/').at(-1);
     await page.screenshot({path:`${out}/${stem}-${width}.png`,fullPage:true});
     await page.screenshot({path:`${out}/${stem}-${width}-fold.png`});
    }
    if([390,1440].includes(width)){
     await page.addScriptTag({path:'reference/qa/node_modules/axe-core/axe.min.js'});
     report.accessibility.push({engine:name,width,route,...await page.evaluate(async()=>({violations:(await axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21a','wcag21aa']}})).violations.map(v=>({id:v.id,impact:v.impact,targets:v.nodes.map(n=>n.target)}))}))});
    }
    if(route.startsWith('/compare/')){
     const spacing=await page.evaluate(()=>{
      const intro=document.querySelector('#costs .comparison-table-intro'),table=document.querySelector('#costs .plan-table-scroll');
      const a=intro.getBoundingClientRect(),b=table.getBoundingClientRect();
      return {introMargin:parseFloat(getComputedStyle(intro).marginBottom),gap:b.top-a.bottom,leftDifference:Math.abs(a.left-b.left),rightDifference:Math.abs(a.right-b.right)};
     });
     assert(spacing.introMargin>=(width<=767?24:32));assert(spacing.gap>=spacing.introMargin-1);
     assert(spacing.leftDifference<=1&&spacing.rightDifference<=1);
     report.spacing.push({engine:name,width,route,...spacing});
     await page.locator('.comparison-jumps a[href="#costs"]').click();assert(new URL(page.url()).hash==='#costs');
     await page.locator('#faq summary').first().click();assert(await page.locator('#faq details').first().evaluate(e=>e.open));
     if(width===390){
      const table=page.locator('#side-by-side .plan-table-scroll');await table.scrollIntoViewIfNeeded();
      assert(await table.evaluate(e=>e.scrollWidth>e.clientWidth));
      await table.focus();await page.keyboard.press('ArrowRight');
      await page.waitForFunction(()=>document.querySelector('#side-by-side .plan-table-scroll').scrollLeft>0);
     }
    }
   }
   if(width===1440){
    await page.goto(base+'/pricing',{waitUntil:'networkidle'});
    await page.locator('.desktop-nav .nav-more > summary').hover();
    await page.locator('.desktop-nav a[href="/compare"]').click();await page.waitForURL(base+'/compare');
    await page.locator('.comparison-guide[href="/compare/cleverly"]').click();await page.waitForURL(base+'/compare/cleverly');
    report.navigation.push({engine:name,desktopMore:true,hubToGuide:true});
   }
   await page.close();
  }
  const touch=await browser.newContext({viewport:{width:390,height:844},hasTouch:true});
  const p=await touch.newPage();await p.goto(base+'/',{waitUntil:'networkidle'});
  await p.locator('.mobile-menu > summary').tap();await p.locator('.mobile-menu .nav-more > summary').tap();
  await p.locator('.mobile-menu a[href="/compare"]').tap();await p.waitForURL(base+'/compare');
  await p.locator('.comparison-guide[href="/compare/cleverly"]').tap();await p.waitForURL(base+'/compare/cleverly');
  report.navigation.push({engine:name,touchMore:true,hubToGuide:true});await touch.close();
  if(name==='Chrome'||name==='WebKit'){
   const nojs=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:844},hasTouch:true});
   const p=await nojs.newPage();await p.goto(base+'/compare/cleverly',{waitUntil:'networkidle'});
   assert((await p.locator('#costs').innerText()).includes('$3,500'));
   await p.locator('#faq summary').first().tap();assert(await p.locator('#faq details').first().evaluate(e=>e.open));
   await p.locator('.mobile-menu > summary').tap();await p.locator('.mobile-menu .nav-more > summary').tap();
   await p.locator('.mobile-menu a[href="/compare"]').tap();await p.waitForURL(base+'/compare');
   report.noJavaScript.push({engine:name,completeContent:true,nativeFAQ:true,moreNavigation:true});await nojs.close();
  }
 }finally{await browser.close();}
}
const failures=report.layouts.filter(r=>r.overflow||r.h1!==1||r.status!==200||r.brokenImages.length||!r.fonts||r.errors.length||r.moreLinks.join(',')!=='/cold-email-agency,/pricing,/compare');
const accessibility=report.accessibility.filter(r=>r.violations.length);
report.summary={layouts:report.layouts.length,failures,accessibility,spacingChecks:report.spacing.length,hubAlignmentChecks:report.hubAlignments.length,navigation:report.navigation,noJavaScript:report.noJavaScript};
fs.writeFileSync(`${out}/qa.json`,JSON.stringify(report,null,2));console.log(JSON.stringify(report.summary,null,2));
if(failures.length||accessibility.length)process.exitCode=1;
