import {chromium,firefox,webkit} from '../reference/qa/node_modules/playwright/index.mjs';
import {findChrome} from '../../taste-skill/skills/taste-skill/scripts/lib/cdp.mjs';
import fs from 'node:fs';
const stage=process.argv[2]||'after',base=process.env.SPACING_BASE||'http://127.0.0.1:4180';
const paths=['/','/case-studies',...fs.readdirSync('case-studies').filter(n=>n.endsWith('.html')).map(n=>'/case-studies/'+n.slice(0,-5)),'/blog',...fs.readdirSync('content/blog').filter(n=>n.endsWith('.md')).map(n=>'/blog/'+n.slice(0,-3)),'/authors/pandush','/authors/umair','/404'];
const captures=new Set(['/','/case-studies','/case-studies/networked-sales-meetings','/blog','/blog/cold-email-agency-pricing','/authors/pandush']);
const out='evidence/spacing/'+stage;fs.mkdirSync(out,{recursive:true});const report={layouts:[],accessibility:[]};
for(const [name,engine] of stage==='before'?[['Chrome',chromium]]:[['Chrome',chromium],['Firefox',firefox],['WebKit',webkit]]){
 const b=await engine.launch({headless:true,...(name==='Chrome'?{executablePath:findChrome()}:{})});
 try{for(const width of stage==='before'?[390,768,1440]:name==='Chrome'?[360,390,768,1024,1440,1920]:[390,1440]){
  const p=await b.newPage({viewport:{width,height:1000},reducedMotion:'reduce'});const errors=[];p.on('pageerror',e=>errors.push(e.message));
  for(const route of paths){await p.goto(base+route);await p.evaluate(async()=>{await document.fonts.ready;for(const i of document.images)i.loading='eager';await Promise.all([...document.images].map(i=>i.decode().catch(()=>{})))});
   const data=await p.evaluate(()=>{
    const cs=e=>getComputedStyle(e),rect=e=>e.getBoundingClientRect(),num=v=>parseFloat(v)||0;
    const gap=(a,b)=>Math.round(rect(b).top-rect(a).bottom);
    const headingPairs=[...document.querySelectorAll('.section-heading')].map(e=>{const h=e.querySelector('h2'),sub=e.querySelector('.section-sub');return{heading:h.textContent,subtitleGap:sub?gap(h,sub):null,bodyGap:e.nextElementSibling?gap(e,e.nextElementSibling):null,bottomMargin:num(cs(e).marginBottom),alignment:cs(e).textAlign,x:Math.round(rect(e).x)}});
    const sections=[...document.querySelectorAll('main>.section')].map(e=>({id:e.id,top:num(cs(e).paddingTop),bottom:num(cs(e).paddingBottom),contentHeight:Math.round(rect(e.querySelector('.container')).height),heading:e.querySelector('h1,h2')?.textContent.slice(0,80)}));
    const proseHeadings=[...document.querySelectorAll('.story-section>h2,.article-prose>h2,.article-sources>h2')].map(e=>({text:e.textContent,top:num(cs(e).marginTop),bottom:num(cs(e).marginBottom)}));
    const cover=document.querySelector('#article-visual .editorial-cover'),body=document.querySelector('.article-prose');
    return{overflow:document.documentElement.scrollWidth>innerWidth,missingImages:[...document.images].filter(i=>!i.naturalWidth).map(i=>i.src),headingPairs,sections,proseHeadings,articleAlignment:cover&&body?{coverLeft:Math.round(rect(cover).left),bodyLeft:Math.round(rect(body).left),coverRight:Math.round(rect(cover).right),bodyRight:Math.round(rect(body).right)}:null,badAnchors:[...document.querySelectorAll('a[href^="#"]')].filter(a=>!document.getElementById(a.hash.slice(1))).map(a=>a.hash)};
   });report.layouts.push({engine:name,width,route,...data,errors:[...errors]});
   if(name==='Chrome'&&[390,1440].includes(width)&&captures.has(route)){const key=route==='/'?'home':route.slice(1).replaceAll('/','-');await p.screenshot({path:`${out}/${key}-${width}.jpg`,fullPage:true,type:'jpeg',quality:78});if(route==='/'){for(const id of ['system','math','pricing','team','faq']){const e=p.locator('#'+id);await e.screenshot({path:`${out}/home-${id}-${width}.png`})}}}
   if(stage!=='before'&&name==='Chrome'&&width===390){await p.addScriptTag({path:'reference/qa/node_modules/axe-core/axe.min.js'});report.accessibility.push({route,...await p.evaluate(async()=>{const r=await axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21a','wcag21aa']}});return{violations:r.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)}))}})});}
  }await p.close();
 }}finally{await b.close()}
}
const spacingFailures=stage==='before'?[]:report.layouts.flatMap(r=>{const [sub,body]=r.width<768?[16,32]:[24,48],errors=r.headingPairs.filter(h=>(h.subtitleGap!==null&&h.subtitleGap!==sub)||(h.bodyGap!==null&&h.bodyGap!==body));const a=r.articleAlignment;if(a&&(Math.abs(a.coverLeft-a.bodyLeft)>1||Math.abs(a.coverRight-a.bodyRight)>1))errors.push(a);return errors.length?[{route:r.route,width:r.width,engine:r.engine,errors}]:[]});
fs.writeFileSync(`${out}/measurements.json`,JSON.stringify(report,null,2));const failures=report.layouts.filter(r=>r.overflow||r.missingImages.length||r.errors.length||r.badAnchors.length),axe=report.accessibility.filter(r=>r.violations.length);console.log(JSON.stringify({stage,layouts:report.layouts.length,failures,axe,spacingFailures}));if(failures.length||axe.length||spacingFailures.length)process.exitCode=1;
