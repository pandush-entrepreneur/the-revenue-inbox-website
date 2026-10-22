// Browser regression checks for commercial pages, the GRAIL migration and previews.
import {chromium, firefox, webkit} from '../reference/qa/node_modules/playwright/index.mjs';
import {findChrome} from '../../taste-skill/skills/taste-skill/scripts/lib/cdp.mjs';
import fs from 'node:fs';

const base = 'http://127.0.0.1:4174';
const out = 'evidence/service-audit';
fs.mkdirSync(`${out}/after`, {recursive:true});
const cases = JSON.parse(fs.readFileSync('tools/rebuild-data.json', 'utf8'));
const blogs = fs.readdirSync('blog').filter(x=>x.endsWith('.html')).map(x=>'/blog/'+x.slice(0,-5));
const routes = ['/', '/cold-email-agency', '/case-studies', ...cases.map(x=>'/case-studies/'+x.id), '/blog', ...blogs, '/authors/pandush', '/authors/umair'];
const report = {layouts:[], accessibility:[], interactions:{}, redirects:[], previews:[], noJavaScript:[]};
report.concurrentAssets = await Promise.all(Array.from({length:32},async(_,i)=>{
  const route=['/styles.css','/script.js','/assets/brand/wordmark-white.svg','/assets/font-6.woff2'][i%4];
  try {const r=await fetch(base+route);await r.arrayBuffer();return {route,status:r.status};}
  catch(e){return {route,error:e.message};}
}));
if(process.argv.includes('--assets-only')) {
  const previous=JSON.parse(fs.readFileSync(`${out}/qa.json`,'utf8'));
  if(!fs.existsSync(`${out}/qa-before-assets-test-fix.json`))fs.copyFileSync(`${out}/qa.json`,`${out}/qa-before-assets-test-fix.json`);
  previous.concurrentAssets=report.concurrentAssets;
  previous.summary.badConcurrentAssets=report.concurrentAssets.filter(r=>r.status!==200);
  previous.verificationNotes=['Layout/accessibility/interaction results are from the preceding complete run. The concurrent-asset check was rerun separately after correcting the test to use native fetch Response.status as a property.'];
  fs.writeFileSync(`${out}/qa.json`,JSON.stringify(previous,null,2));
  console.log(JSON.stringify({requests:report.concurrentAssets.length,failures:previous.summary.badConcurrentAssets},null,2));
  process.exitCode=previous.summary.badConcurrentAssets.length?1:0;
} else {

for (const [name, engine] of [['Chrome',chromium], ['Firefox',firefox], ['WebKit',webkit]]) {
  const browser = await engine.launch({headless:true,...(name==='Chrome'?{executablePath:findChrome()}:{})});
  try {
    for (const width of name==='Chrome'?[360,390,768,1024,1440,1920]:[390,1440]) {
      const page = await browser.newPage({viewport:{width,height:900},reducedMotion:'reduce'});
      const errors = []; page.on('pageerror',e=>errors.push(e.message));
      page.on('requestfailed',r=>{if(r.url().startsWith(base))errors.push(`${r.url()}: ${r.failure()?.errorText}`);});
      const selected = name==='Chrome'?routes:['/','/cold-email-agency','/case-studies/grail','/blog'];
      for (const route of selected) {
        errors.length=0;
        const response = await page.goto(base+route,{waitUntil:'networkidle'});
        await page.evaluate(()=>document.fonts.ready);
        await page.evaluate(()=>Promise.all([...document.images].map(i=>{i.loading='eager';return i.decode().catch(()=>{});})));
        const data = await page.evaluate(()=>({
          overflow:document.documentElement.scrollWidth>innerWidth+1,
          h1:document.querySelectorAll('h1').length,
          brokenImages:[...document.images].filter(i=>i.complete&&!i.naturalWidth).map(i=>i.src),
          brokenAnchors:[...document.querySelectorAll('a[href^="#"]')].filter(a=>a.hash&&!document.getElementById(decodeURIComponent(a.hash.slice(1)))).map(a=>a.hash),
          oldClientName:/graiai/i.test(document.body.innerText),
          oldLinks:[...document.querySelectorAll('a[href]')].filter(a=>a.getAttribute('href').includes('/case-studies/graiai')).map(a=>a.href),
          fontLoaded:document.fonts.check('600 32px Manrope')&&document.fonts.check('400 16px "DM Sans"'),
          fonts:[...new Set([...document.querySelectorAll('h1,h2,p')].map(e=>getComputedStyle(e).fontFamily))]
        }));
        report.layouts.push({engine:name,width,route,status:response.status(),...data,errors:[...errors]});
        if(name==='Chrome'&&width===390&&['/','/cold-email-agency','/case-studies/grail','/blog'].includes(route)) {
          await page.addScriptTag({path:'reference/qa/node_modules/axe-core/axe.min.js'});
          report.accessibility.push({route,...await page.evaluate(async()=>{
            const result=await axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21a','wcag21aa']}});
            return {violations:result.violations.map(v=>({id:v.id,impact:v.impact,targets:v.nodes.map(n=>n.target)}))};
          })});
        }
        if(name==='Chrome'&&[390,1440].includes(width)&&['/cold-email-agency','/case-studies/grail'].includes(route)) {
          await page.screenshot({path:`${out}/after/${route.slice(1).replaceAll('/','-')}-${width}.png`,fullPage:true});
        }
      }
      await page.close();
    }
    if(name==='Chrome') {
      const page=await browser.newPage({viewport:{width:390,height:844},reducedMotion:'reduce'});
      await page.route('https://calendly.com/**',r=>r.abort());
      await page.goto(base+'/cold-email-agency');
      await page.locator('.svc-hero-actions .button').click();
      report.interactions.bookingOpens=await page.locator('dialog').evaluate(e=>e.open);
      await page.locator('.booking-embed iframe').waitFor({state:'attached',timeout:15000});
      report.interactions.calendarConfigured=await page.locator('.booking-embed iframe').count()===1;
      await page.keyboard.press('Escape');
      report.interactions.bookingCloses=await page.locator('dialog').evaluate(e=>!e.open);
      report.interactions.focusRestored=await page.locator('.svc-hero-actions .button').evaluate(e=>e===document.activeElement);
      await page.locator('#faq summary').first().click();
      report.interactions.faqOpens=await page.locator('#faq details').first().evaluate(e=>e.open);
      await page.locator('.mobile-menu summary').click();
      report.interactions.navigationOpens=await page.locator('.mobile-menu').evaluate(e=>e.open);
      for (const route of ['/case-studies/graiai','/case-studies/graiai.html','/case-studies/grail.html']) {
        const r=await page.request.get(base+route,{maxRedirects:0});
        report.redirects.push({route,status:r.status(),location:r.headers().location});
      }
      for (const route of ['/cold-email-agency','/case-studies/grail','/blog']) {
        await page.goto('http://127.0.0.1:4180'+route);
        await page.evaluate(()=>document.fonts.ready);
        report.previews.push({route,...await page.evaluate(()=>({overflow:document.documentElement.scrollWidth>innerWidth+1,brand:!!document.querySelector('img[src="/assets/brand/wordmark-white.svg"]'),font:document.fonts.check('600 32px Manrope')}))});
      }
      await page.close();
      for (const route of ['/cold-email-agency','/case-studies/grail']) {
        const context=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:844}});
        const p=await context.newPage(); await p.goto(base+route);
        report.noJavaScript.push({route,h1:await p.locator('h1').innerText(),content:await p.locator('main').innerText(),bookingLink:await p.locator('a[href*="calendly.com"]').count(),email:await p.locator('.email-body').count()});
        await context.close();
      }
    }
  } finally {await browser.close();}
}
const badLayouts=report.layouts.filter(r=>r.status!==200||r.overflow||r.h1!==1||r.brokenImages.length||r.brokenAnchors.length||r.oldClientName||r.oldLinks.length||!r.fontLoaded||r.errors.length);
const badAxe=report.accessibility.filter(r=>r.violations.length);
const badRedirects=report.redirects.filter(r=>r.status!==301||r.location!=='/case-studies/grail');
const badPreviews=report.previews.filter(r=>r.overflow||!r.brand||!r.font);
const badConcurrentAssets=report.concurrentAssets.filter(r=>r.status!==200);
report.summary={layouts:report.layouts.length,badLayouts,badAxe,badRedirects,badPreviews,badConcurrentAssets,interactions:report.interactions};
fs.writeFileSync(`${out}/qa.json`,JSON.stringify(report,null,2));
console.log(JSON.stringify(report.summary,null,2));
if(badLayouts.length||badAxe.length||badRedirects.length||badPreviews.length||badConcurrentAssets.length||Object.values(report.interactions).some(v=>!v))process.exitCode=1;
}
