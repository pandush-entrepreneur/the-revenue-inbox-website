import {Browser,sleep} from '../../taste-skill/skills/taste-skill/scripts/lib/cdp.mjs';
import {mkdirSync,writeFileSync} from 'node:fs';
const out='evidence/alive';mkdirSync(out,{recursive:true});
const b=await Browser.launch();const results=[];
try {
 for(const file of ['index.html','case-study-investors.html','case-study-arr-growth.html','case-study-recruitment.html','case-study-parking.html','case-study-spotlight.html']) {
  for(const width of [360,390,768,1024,1440,1920]) {
   const p=await b.newPage({width,height:900,mobile:width<768});
   await p.goto('http://127.0.0.1:4173/'+file,{settleMs:1200});
   await p.eval(()=>document.fonts.ready.then(()=>true));
   const data=await p.eval(()=>({overflow:document.documentElement.scrollWidth>innerWidth,h1:document.querySelectorAll('h1').length,initialPlayers:document.querySelectorAll('iframe').length,missingImages:[...document.images].filter(i=>i.complete&&!i.naturalWidth).map(i=>i.src),badAnchors:[...document.querySelectorAll('a[href^="#"]')].filter(a=>!document.getElementById(a.hash.slice(1))).map(a=>a.hash),smallTargets:[...document.querySelectorAll('a,summary,button,label')].filter(e=>{const r=e.getBoundingClientRect();return r.width&&r.height&&r.height<44}).map(e=>({text:e.textContent.trim().slice(0,70),height:e.getBoundingClientRect().height})),heroText:document.querySelector('h1').textContent,gsap:!!window.gsap,pins:document.querySelectorAll('.pin-spacer').length,legal:document.querySelector('footer').textContent.replace(/\s+/g,' ').trim().includes('The Revenue Inbox is a trading name of Meerion Ltd, registered in England and Wales, company number 16682944.')}));
   results.push({file,width,...data,errors:p.consoleErrors});
   if(!process.argv.includes('--checks-only') && (width===390||width===1440)) {
    await p.screenshot({path:`${out}/${file.replace('.html','')}-${width}-fold.png`,format:'png'});
    await p.wheel(await p.eval(()=>document.documentElement.scrollHeight),{step:700,pauseMs:5});await sleep(500);
    await p.eval(()=>scrollTo({top:0,behavior:'instant'}));await sleep(500);
    await p.screenshot({path:`${out}/${file.replace('.html','')}-${width}-full.jpg`,format:'jpeg',quality:85,fullPage:true});
   }
   await p.close();
  }
 }
 const p=await b.newPage({width:390,height:844,mobile:true});await p.goto('http://127.0.0.1:4173',{settleMs:700});
 await p.eval(()=>{window.capturedEvents=[];document.addEventListener('revenue-inbox:event',e=>window.capturedEvents.push(e.detail));});
 const interactions={};
 for(const v of ['25000','50000','15000']) interactions['roi'+v]=await p.eval(value=>{const i=document.querySelector(`input[value="${value}"]`);i.checked=true;i.dispatchEvent(new Event('change',{bubbles:true}));return document.querySelector('#roi-revenue').textContent;},v);
 await p.eval(()=>{document.querySelector('.faq-list details').open=true;});await sleep(50);
 await p.eval(()=>{document.querySelector('.alive-hero .button').click();});await sleep(100);
 interactions.booking=await p.eval(()=>({open:document.querySelector('dialog').open,src:document.querySelector('dialog iframe')?.src,focus:document.activeElement.className,bodyLocked:document.body.classList.contains('booking-open')}));
 await p.send('Input.dispatchKeyEvent',{type:'keyDown',key:'Escape',code:'Escape',windowsVirtualKeyCode:27});await p.send('Input.dispatchKeyEvent',{type:'keyUp',key:'Escape',code:'Escape',windowsVirtualKeyCode:27});await sleep(100);
 interactions.escape=await p.eval(()=>({closed:!document.querySelector('dialog').open,focusRestored:document.activeElement.matches('.alive-hero .button'),bodyUnlocked:!document.body.classList.contains('booking-open')}));
 await p.eval(()=>document.querySelector('#results').scrollIntoView());await sleep(400);interactions.stickyShown=await p.eval(()=>!document.querySelector('.mobile-booking').hidden);
 await p.eval(()=>document.querySelector('#contact').scrollIntoView());await sleep(400);interactions.stickyHiddenFinal=await p.eval(()=>document.querySelector('.mobile-booking').hidden);
 await p.eval(()=>document.querySelector('[data-video]').click());await sleep(100);interactions.video=await p.eval(()=>({players:document.querySelectorAll('.video-player iframe').length,fallback:!!document.querySelector('.video-player + a[href^="https://vimeo.com"]')}));
 interactions.events=await p.eval(()=>window.capturedEvents);await p.close();
 const reduced=await b.newPage({width:1440,height:900,reducedMotion:true});await reduced.goto('http://127.0.0.1:4173',{settleMs:500});
 interactions.reduced=await reduced.eval(()=>({pins:document.querySelectorAll('.pin-spacer').length,hiddenSteps:[...document.querySelectorAll('[data-step]')].filter(e=>getComputedStyle(e).opacity==='0').length,activeAnimations:gsap.globalTimeline.getChildren(true,true,true).filter(t=>t.isActive()).length}));await reduced.close();
 const nojs=await b.newPage({width:390,height:844,mobile:true});await nojs.send('Emulation.setScriptExecutionDisabled',{value:true});await nojs.goto('http://127.0.0.1:4173',{settleMs:300});
 interactions.nojs=await nojs.eval(()=>({stat:document.querySelector('[data-count]').textContent,steps:[...document.querySelectorAll('[data-step]')].every(e=>getComputedStyle(e).opacity!=='0'),directBooking:document.querySelector('.alive-hero .button').href,players:document.querySelectorAll('iframe').length}));await nojs.close();
 writeFileSync(`${out}/checks.json`,JSON.stringify({results,interactions},null,2));
 console.log(JSON.stringify({checks:results.length,failures:results.filter(x=>x.overflow||x.h1!==1||x.initialPlayers||x.missingImages.length||x.badAnchors.length||!x.legal),smallTargets:results.filter(x=>x.smallTargets.length).map(x=>({file:x.file,width:x.width,targets:x.smallTargets})),interactions},null,2));
}finally{await b.close();}
