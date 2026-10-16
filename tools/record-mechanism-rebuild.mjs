// Capture Chrome's real compositor frames and preserve their timing in FFmpeg concat files.
import {Browser,sleep} from '../../taste-skill/skills/taste-skill/scripts/lib/cdp.mjs';
import {mkdirSync,writeFileSync} from 'node:fs';
const b=await Browser.launch();const summaries=[];
try {
 for(const width of [390,1440]) {
  const p=await b.newPage({width,height:width<768?844:900,mobile:width<768});
  await p.goto('http://127.0.0.1:4174',{settleMs:200});
  for(const scene of ['mechanism']) {
   const dir=`evidence/rebuild/frames-live-${scene}-${width}`;mkdirSync(dir,{recursive:true});
   let start=0,end=0;
   if(scene==='mechanism') {
    const rect=await p.eval(()=>{const e=document.querySelector('.system-pipeline');return {top:e.getBoundingClientRect().top+scrollY,height:e.offsetHeight};});
    start=Math.max(0,rect.top-(width<768?844:900)*.75);end=start+rect.height+240;
   }else if(width<768)end=await p.eval(()=>Math.max(0,document.querySelector('.revenue-scene').getBoundingClientRect().bottom+scrollY-innerHeight+80));
   await p.eval(y=>scrollTo({top:y,behavior:'instant'}),start);await sleep(200);
   const frames=[];
   const off=b.on(p.sessionId,'Page.screencastFrame',frame=>{
    const name=`${String(frames.length).padStart(5,'0')}.jpg`;
    writeFileSync(`${dir}/${name}`,Buffer.from(frame.data,'base64'));frames.push({name,time:frame.metadata.timestamp});
    p.send('Page.screencastFrameAck',{sessionId:frame.sessionId}).catch(()=>{});
   });
   await p.send('Page.startScreencast',{format:'jpeg',quality:85,maxWidth:width,maxHeight:width<768?844:900,everyNthFrame:1});
   const duration=scene==='hero'?10500:6500;
   if(end>start)await p.eval(({start,end,duration})=>new Promise(resolve=>{const t=performance.now();function move(now){const progress=Math.min(1,(now-t)/duration);scrollTo(0,start+(end-start)*progress);if(progress<1)requestAnimationFrame(move);else resolve(true);}requestAnimationFrame(move);}),{start,end,duration});
   else await sleep(duration);
   await sleep(300);await p.send('Page.stopScreencast');off();
   const concat=frames.map((f,i)=>`file '${f.name}'\nduration ${Math.max(.001,i<frames.length-1?frames[i+1].time-f.time:.1).toFixed(6)}`).join('\n');
   writeFileSync(`${dir}/frames.txt`,concat+'\n');summaries.push({scene,width,frames:frames.length,duration:frames.at(-1).time-frames[0].time});
  }
  await p.close();
 }
 writeFileSync('evidence/rebuild/recordings-mechanism.json',JSON.stringify(summaries,null,2));console.log(summaries);
}finally{await b.close();}
