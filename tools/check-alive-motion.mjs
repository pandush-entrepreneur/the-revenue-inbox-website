import {Browser,sleep} from '../../taste-skill/skills/taste-skill/scripts/lib/cdp.mjs';
import {writeFileSync} from 'node:fs';
const b=await Browser.launch();const data={};
try {
 const short=await b.newPage({width:1024,height:768});await short.goto('http://127.0.0.1:4173',{settleMs:500});data.shortDesktop=await short.eval(()=>({pins:document.querySelectorAll('.pin-spacer').length,steps:[...document.querySelectorAll('[data-step]')].every(e=>getComputedStyle(e).opacity!=='0')}));await short.close();
 const p=await b.newPage({width:1440,height:900});await p.goto('http://127.0.0.1:4173',{settleMs:600});
 const bounds=await p.eval(()=>{const t=ScrollTrigger.getAll().find(t=>t.pin);return {start:t.start,end:t.end};});data.stages=[];
 for(const t of [.6,1.6,2.6,3.6,4.6,5.6]){
  await p.eval(y=>scrollTo(0,y),bounds.start+(bounds.end-bounds.start)*t/5.6);await sleep(550);
  data.stages.push(await p.eval(()=>{const a=document.querySelector('[data-step].is-active');const traveler=document.querySelector('.travelling-lead').getBoundingClientRect();const stop=document.querySelector('.route-stop.is-active:last-of-type');return {heading:a?.querySelector('h3').textContent.trim(),status:document.querySelector('.lead-destination .tag').textContent,travelerY:Math.round(traveler.top),travelerVisible:getComputedStyle(document.querySelector('.travelling-lead')).visibility};}));
 }
 await p.eval(()=>{document.querySelector('[data-video]').click();document.querySelector('.alive-hero').scrollIntoView();});await sleep(100);
 data.videoPause=await p.eval(()=>document.querySelector('[data-motion-toggle]').getAttribute('aria-pressed'));
 await p.eval(()=>document.querySelector('[data-motion-toggle]').click());data.explicitResume=await p.eval(()=>({pressed:document.querySelector('[data-motion-toggle]').getAttribute('aria-pressed'),text:document.querySelector('[data-motion-toggle]').textContent}));
 await p.send('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'reduce'}]});await sleep(300);data.dynamicReduced=await p.eval(()=>({pins:document.querySelectorAll('.pin-spacer').length,visibleSteps:[...document.querySelectorAll('[data-step]')].every(e=>getComputedStyle(e).opacity==='1'&&getComputedStyle(e).visibility==='visible'),stat:document.querySelector('[data-count]').textContent}));
 await p.close();writeFileSync('evidence/alive/motion-checks.json',JSON.stringify(data,null,2));console.log(JSON.stringify(data,null,2));
}finally{await b.close();}
