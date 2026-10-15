import {Browser,sleep} from '../../taste-skill/skills/taste-skill/scripts/lib/cdp.mjs';
import {mkdirSync,writeFileSync} from 'node:fs';
const b=await Browser.launch();
try {
 for(const width of [390,1440]) {
  const p=await b.newPage({width,height:width<768?844:900,mobile:width<768});
  await p.goto('http://127.0.0.1:4173',{settleMs:100});
  for(const scene of ['hero','mechanism']) {
   const dir=`evidence/alive/frames-${scene}-${width}`;mkdirSync(dir,{recursive:true});
   let start=0,end=0;
   if(scene==='mechanism') {
    const bounds=await p.eval(()=>{const e=document.querySelector('.system-stage');return {start:e.getBoundingClientRect().top+scrollY-112,height:e.offsetHeight};});
    start=bounds.start;end=start+(width>=1024?1100:bounds.height-200);
    await p.eval(y=>scrollTo({top:y,behavior:'instant'}),start);await sleep(500);
   } else if(width<768) {
    // Phone recording includes both the offer and the scene in one smooth scroll.
    end=await p.eval(()=>Math.max(0,document.querySelector('.inbox-scene').getBoundingClientRect().bottom+scrollY-innerHeight+90));
   }
   const frames=72;
   for(let i=0;i<frames;i++) {
    if(end)await p.eval(y=>scrollTo({top:y,behavior:'instant'}),start+(end-start)*i/(frames-1));
    const {data}=await p.send('Page.captureScreenshot',{format:'jpeg',quality:82});
    writeFileSync(`${dir}/${String(i).padStart(4,'0')}.jpg`,Buffer.from(data,'base64'));
    await sleep(95);
   }
   await p.screenshot({path:`evidence/alive/${scene}-${width}.png`,format:'png'});
  }
  await p.close();
 }
}finally{await b.close();}
console.log('Captured desktop and mobile hero and mechanism frames.');
