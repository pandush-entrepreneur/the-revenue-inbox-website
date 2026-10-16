/* The shipped document is complete. Behavior and motion enhance its real values. */
(() => {
 'use strict';
 const $=(s,root=document)=>root.querySelector(s), $$=(s,root=document)=>[...root.querySelectorAll(s)];
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 const money=n=>new Intl.NumberFormat('en-US',{style:'currency',currency:'USD',maximumFractionDigits:0}).format(n);
 const number=n=>new Intl.NumberFormat('en-US').format(n);
 const track=(event,detail={})=>document.dispatchEvent(new CustomEvent('revenue-inbox:event',{detail:{event,...detail}}));
 const menu=$('.mobile-menu');
 if(menu){
  $$('a',menu).forEach(a=>a.addEventListener('click',()=>{menu.open=false;}));
  document.addEventListener('click',e=>{if(!menu.contains(e.target))menu.open=false;});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&menu.open){menu.open=false;$('summary',menu).focus();}});
 }
 $$('details').forEach(d=>d.addEventListener('toggle',()=>{if(d.open&&d.dataset.event)track(d.dataset.event,{question:$('summary',d).textContent.trim()});}));
 const dialog=$('.booking-dialog');let trigger=null;
 if(dialog){
  $('.dialog-close',dialog).addEventListener('click',()=>dialog.close());
  dialog.addEventListener('close',()=>{document.body.classList.remove('booking-open');trigger?.focus();});
  dialog.addEventListener('click',e=>{if(e.target!==dialog)return;const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();});
 }
 $$('a[href="https://calendly.com/therevenueinboxagency/discovery"]').forEach(a=>a.addEventListener('click',e=>{
  track('cta_click',{location:a.dataset.location||a.closest('section')?.id||'footer'});
  if(!dialog||a.closest('dialog')||!dialog.showModal||e.ctrlKey||e.metaKey||e.shiftKey||e.altKey)return;
  e.preventDefault();trigger=a;
  if(!$('iframe',dialog)){
   const frame=document.createElement('iframe');frame.title='Choose a time for your strategy call';
   frame.src='https://calendly.com/therevenueinboxagency/discovery?embed_domain='+encodeURIComponent(location.hostname)+'&embed_type=Inline&primary_color=8a40ea';
   $('.booking-embed',dialog).append(frame);
  }
  document.body.classList.add('booking-open');dialog.showModal();$('.dialog-close',dialog).focus();
 }));
 let videoActive=false;
 $$('[data-video]').forEach(a=>a.addEventListener('click',e=>{
  if(e.ctrlKey||e.metaKey||e.shiftKey||e.altKey)return;
  e.preventDefault();track('video_play',{video:a.dataset.video});
  const frame=document.createElement('iframe');frame.src=`https://player.vimeo.com/video/${a.dataset.video}?autoplay=1&title=0&byline=0&portrait=0&dnt=1&color=8A40EA`;frame.title=a.getAttribute('aria-label');frame.allow='autoplay; fullscreen; picture-in-picture';frame.allowFullscreen=true;
  const box=document.createElement('div');box.className='video-player';box.append(frame);
  const fallback=document.createElement('a');fallback.className='text-link';fallback.textContent='Open video on Vimeo';fallback.href=a.href;fallback.target='_blank';fallback.rel='noopener';
  a.replaceWith(box,fallback);frame.focus();videoActive=true;document.dispatchEvent(new Event('revenue-inbox:video-start'));
 }));
 const bar=$('.mobile-booking'),hero=$('.hero'),close=$('#contact');let heroVisible=true,closeVisible=false;
 if(bar&&'IntersectionObserver'in window){const ob=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.target===hero)heroVisible=e.isIntersecting;if(e.target===close)closeVisible=e.isIntersecting;});bar.hidden=heroVisible||closeVisible;});if(hero)ob.observe(hero);if(close)ob.observe(close);}

 // Native slider values are useful without animation or an analytics provider.
 const contract=$('#contract-value'),rate=$('#close-rate');
 const updateROI=(emit=true)=>{
  if(!contract)return;const acv=+contract.value,cr=+rate.value/100;const books=[54,91,135],attended=books.map(n=>Math.floor(n*.8)),deals=attended.map(n=>Math.floor(n*cr)),fees=books.map(n=>n*100+4500),breakEven=Math.ceil(fees[0]/acv);
  $('#contract-output').textContent=money(acv);$('#close-output').textContent=number(+rate.value)+'%';
  $$('[data-contract]').forEach(b=>b.setAttribute('aria-pressed',String(+b.dataset.contract===acv)));
  $('#break-even').textContent=number(breakEven);
  $('#break-even-detail').textContent=`${money(fees[0])} in conservative-scenario fees ÷ ${money(acv)} per contract. ${breakEven===1?'One whole deal covers':number(breakEven)+' whole deals cover'} modeled fees, before delivery costs.`;
  for(let i=0;i<3;i++){$('#revenue-'+i).textContent=money(acv*deals[i]);$('#deals-'+i).textContent=number(deals[i]);$('#fees-'+i).textContent=money(fees[i]);}
  $('#flow-deals').textContent=number(deals[0]);$('.roi-stage:last-child small').textContent=number(+rate.value)+'% close rate';
  const marker=$('.break-even-marker'),trackWidth=$('.roi-stage:last-child .roi-track').getBoundingClientRect().width;
  marker.style.transform=`translateX(${trackWidth*.18*Math.min(1,breakEven/Math.max(1,deals[0]))}px)`;marker.setAttribute('aria-label',`Break-even at ${breakEven} closed ${breakEven===1?'deal':'deals'}`);
  if(emit){track('roi_toggle',{contract_value:acv,close_rate:+rate.value});animateROI();}
 };
 const animateROI=()=>{
  if(!window.gsap||reduced.matches)return;
  gsap.fromTo('.roi-stage .roi-track>i',{scaleX:.92},{scaleX:1,duration:.4,stagger:.045,ease:'power3.out',overwrite:true});
  gsap.fromTo('.scenario>strong',{y:5,opacity:.7},{y:0,opacity:1,duration:.4,ease:'power3.out',overwrite:true});
  const particle=$('.roi-particle');if(particle)gsap.fromTo(particle,{y:0,opacity:0},{y:340,opacity:1,duration:1.4,ease:'power1.in',overwrite:true,onComplete:()=>gsap.set(particle,{opacity:0})});
 };
 if(contract){
  contract.addEventListener('input',()=>updateROI());rate.addEventListener('input',()=>updateROI());
  $$('[data-contract]').forEach(b=>b.addEventListener('click',()=>{contract.value=b.dataset.contract;updateROI();}));
  const particle=document.createElement('i');particle.className='roi-particle';particle.setAttribute('aria-hidden','true');$('.roi-visual').append(particle);
  updateROI(false);
 }
 const appointments=$('#appointment-count');
 if(appointments)appointments.addEventListener('input',()=>{const n=+appointments.value,total=n*100+1500;$('#appointments-output').textContent=number(n);$('#monthly-total').textContent=money(total);$('#effective-cost').textContent=money(total/n);track('pricing_toggle',{appointments:n,total});});
 const filters=$('.case-filters');
 if(filters){filters.hidden=false;$$('[data-filter]',filters).forEach(button=>button.addEventListener('click',()=>{const type=button.dataset.filter;$$('[data-filter]',filters).forEach(b=>b.setAttribute('aria-pressed',String(b===button)));let visible=0;$$('#all-cases .case-card').forEach(card=>{card.hidden=type!=='All'&&type!==card.dataset.category;if(!card.hidden)visible++;});$('#filter-count').textContent=`${visible} ${visible===1?'campaign':'campaigns'}`;track('case_filter',{category:type});}));}
 // Segment controls filter representative activity only. Aggregate totals stay unchanged.
 $$('[data-segment]').forEach(button=>button.addEventListener('click',()=>{
  const dashboard=button.closest('.dashboard'),selected=button.getAttribute('aria-pressed')!=='true';
  $$('[data-segment]',dashboard).forEach(b=>b.setAttribute('aria-pressed',String(selected&&b===button)));
  const patterns={'Aviation':/aviation|airline/i,'Hotels':/hotel/i,'Luxury resorts':/resort/i};
  $$('.feed-viewport li',dashboard).forEach(row=>row.hidden=selected&&!patterns[button.dataset.segment].test(row.textContent));
  const feed=$('.feed-viewport',dashboard),loop=loops.find(row=>row.element===feed);
  feed.classList.toggle('is-filtered',selected);
  if(loop){loop.disabled=selected;loop.animation.pause(0);if(!selected)loop.animation.invalidate().restart();sync();}
  track('campaign_segment',{segment:selected?button.dataset.segment:'All'});
 }));
 // A real tooltip stays inside the viewport, with keyboard and tap support.
 const pills=$$('.merge-pill');
 if(pills.length){
  document.body.classList.add('tooltip-enhanced');const tip=document.createElement('div');tip.className='merge-tooltip';tip.id='merge-tooltip';tip.setAttribute('role','tooltip');tip.hidden=true;document.body.append(tip);let active=null;
  const hide=()=>{tip.hidden=true;if(active){active.removeAttribute('aria-describedby');active.classList.remove('is-open');}active=null;};
  const show=pill=>{if(active&&active!==pill)hide();active=pill;tip.textContent=pill.dataset.tooltip;tip.hidden=false;pill.setAttribute('aria-describedby',tip.id);const r=pill.getBoundingClientRect(),t=tip.getBoundingClientRect();tip.style.left=Math.max(16,Math.min(innerWidth-t.width-16,r.left))+'px';tip.style.top=Math.max(12,r.top-t.height-10)+'px';};
  pills.forEach(pill=>{pill.addEventListener('pointerenter',()=>show(pill));pill.addEventListener('pointerleave',()=>{if(!pill.classList.contains('is-open'))hide();});pill.addEventListener('focus',()=>show(pill));pill.addEventListener('blur',hide);pill.addEventListener('click',()=>{if(pill.classList.contains('is-open'))hide();else{pill.classList.add('is-open');show(pill);}});});
  document.addEventListener('click',e=>{if(!e.target.closest('.merge-pill'))hide();});document.addEventListener('keydown',e=>{if(e.key==='Escape')hide();});document.addEventListener('scroll',hide,{passive:true});
 }
 if(!window.gsap||!window.ScrollTrigger)return;
 gsap.registerPlugin(ScrollTrigger);const mm=gsap.matchMedia();let paused=false;
 const loops=[];
 const inView=el=>{const r=el.getBoundingClientRect();return r.bottom>0&&r.top<innerHeight;};
 const sync=()=>{const sceneVisible=hero&&$('.revenue-scene')&&inView($('.revenue-scene'));loops.forEach(({animation,element,kind})=>animation.paused(paused||videoActive||document.hidden||loops.find(row=>row.animation===animation)?.disabled||!inView(element)||(kind==='logos'&&sceneVisible)));};
 const motionButton=$('[data-motion-toggle]');if(motionButton){motionButton.hidden=false;motionButton.addEventListener('click',()=>{paused=!paused;if(!paused)videoActive=false;motionButton.setAttribute('aria-pressed',String(paused));motionButton.textContent=paused?'Resume motion':'Pause motion';sync();});}
 document.addEventListener('visibilitychange',sync);document.addEventListener('revenue-inbox:video-start',()=>{paused=true;if(motionButton){motionButton.setAttribute('aria-pressed','true');motionButton.textContent='Resume motion';}sync();});
 const observeLoop=(animation,element,kind)=>{const row={animation,element,kind};loops.push(row);ScrollTrigger.create({trigger:element,start:'top bottom',end:'bottom top',onToggle:sync});sync();return row;};
 mm.add('(prefers-reduced-motion: no-preference)',()=>{
  const owned=[];
  if(hero){
   gsap.fromTo('.hero-copy h1>span',{y:12},{y:0,duration:.4,stagger:.07,ease:'power3.out'});
   const scene=$('.revenue-scene'),typing=$('[data-typing]'),counter=$('[data-scene-count]');let cycle=0;
   const firstLines=['Your next customer should already be on the calendar.','You built the product. We can put buyers in the room.','The right person. A reason to reply. Your next call.'];
   const replies=['Interested. What does your calendar look like Thursday?','That sounds relevant. Can we speak Thursday?','Happy to hear more. Are you free Friday?'];
   const slots=['Thu 10:00','Thu 14:00','Fri 11:00'];
   const chars={n:0},count={n:80};
   const reset=()=>{typing.textContent=firstLines[cycle%3];$('[data-reply-text]').textContent=replies[cycle%3];$('[data-slot-text]').textContent=slots[cycle%3];};
   const tl=gsap.timeline({paused:true,repeat:-1,repeatDelay:1.2,onRepeat:()=>{cycle++;reset();}});
   tl.fromTo(chars,{n:0},{n:1,duration:1.5,ease:'none',onUpdate:()=>{const line=firstLines[cycle%3];typing.textContent=line.slice(0,Math.floor(line.length*chars.n));}},0)
    .to('.scene-compose',{y:-3,x:5,opacity:.78,duration:.4,ease:'power3.out'},1.6)
    .fromTo('.flying-mail',{x:0,opacity:0},{x:()=>$('.flight-route').clientWidth,opacity:1,duration:1.1,ease:'power2.inOut'},1.9)
    .to('.flying-mail',{opacity:0,duration:.3},2.8)
    .fromTo('.inbox-target',{scale:.98,opacity:.5},{scale:1,opacity:1,duration:.4,ease:'power3.out'},3.05)
    .fromTo('.inbox-open',{opacity:0,y:4},{opacity:1,y:0,duration:.4},3.5)
    .fromTo('.reply-bubble',{y:12,opacity:0},{y:0,opacity:1,duration:.5,ease:'power3.out'},4.3)
    .fromTo('.booked-slot',{y:12,opacity:0},{y:0,opacity:1,duration:.5,ease:'power3.out'},6)
    .fromTo(count,{n:80},{n:81,duration:.6,ease:'power3.out',onUpdate:()=>{counter.textContent=String(Math.round(count.n));}},7)
    .fromTo('.scene-flow-map>div:first-child svg',{x:-6,opacity:.3},{x:0,opacity:1,duration:.5,stagger:.08},1.9)
    .to('.scene-compose',{y:0,x:0,opacity:1,duration:.4},7.8).to({},{duration:1},8.2);
   owned.push(observeLoop(tl,scene,'hero'));
  }
  const counter=$('[data-count]');
  if(counter){const value={n:970};gsap.to(value,{n:1000,duration:.8,ease:'power3.out',onUpdate:()=>{counter.textContent=number(Math.round(value.n))+'+';},onComplete:()=>counter.textContent='1,000+'});}
  $$('.section-heading').forEach(group=>gsap.fromTo($$('h2,.section-sub',group),{y:12,opacity:.7},{y:0,opacity:1,duration:.4,stagger:.06,ease:'power3.out',scrollTrigger:{trigger:group,start:'top 90%',once:true}}));
  const pipe=$('.pipeline-connector i');if(pipe){const phone=matchMedia('(max-width:767px)').matches;gsap.fromTo(pipe,phone?{scaleY:0}:{scaleX:0},{scaleX:1,scaleY:1,ease:'none',scrollTrigger:{trigger:'.system-pipeline',start:'top 80%',end:'bottom 50%',scrub:.4}});}
  $$('.mini-dashboard,.dashboard').forEach(d=>{
   const graphic=$$('.chart-draw,.dash-track i',d);if(graphic.length)gsap.fromTo(graphic,{scaleX:.92,opacity:.65},{scaleX:1,opacity:1,duration:.4,stagger:.035,ease:'power3.out',scrollTrigger:{trigger:d,start:'top 90%',once:true}});
  });
  $$('.kpi dd[data-final]').forEach(el=>{
   const final=el.dataset.final,match=final.match(/^(\$?)([\d,.]+)([MK]?)(\+?)$/);if(!match)return;
   const value=Number(match[2].replaceAll(',','')),state={n:0};
   gsap.to(state,{n:value,duration:.75,ease:'power3.out',scrollTrigger:{trigger:el,start:'top 92%',once:true},onStart:()=>{el.textContent=final;},onUpdate:()=>{el.textContent=match[1]+(value%1?state.n.toFixed(1):number(Math.round(state.n)))+match[3]+match[4];},onComplete:()=>{el.textContent=final;}});
  });
  $$('.feed-viewport').forEach(feed=>{
   const list=$('ul',feed);if(!list)return;const copy=list.cloneNode(true);copy.setAttribute('aria-hidden','true');feed.append(copy);feed.classList.add('is-running');
   const wrapper=document.createElement('div');wrapper.className='feed-motion';list.before(wrapper);wrapper.append(list,copy);
   const tl=gsap.to(wrapper,{y:()=>-list.offsetHeight,duration:24,ease:'none',repeat:-1,paused:true});owned.push(observeLoop(tl,feed,'feed'));
  });
  return()=>{
   owned.forEach(row=>{row.animation.kill();const index=loops.indexOf(row);if(index>=0)loops.splice(index,1);});
   if(counter)counter.textContent='1,000+';if($('[data-scene-count]'))$('[data-scene-count]').textContent='81';
   if($('[data-typing]'))$('[data-typing]').textContent='Your next customer should already be on the calendar.';
   $$('.kpi dd[data-final]').forEach(el=>el.textContent=el.dataset.final);
   $$('.feed-motion').forEach(wrapper=>{const feed=wrapper.parentElement,list=$('ul',wrapper);wrapper.replaceWith(list);feed.classList.remove('is-running');});
   gsap.set('.scene-compose,.flying-mail,.inbox-target,.inbox-open,.reply-bubble,.booked-slot,.chart-draw,.dash-track i,.pipeline-connector i',{clearProps:'all'});
  };
 });
 mm.add('(min-width: 768px) and (prefers-reduced-motion: no-preference)',()=>{
  const track=$('.logo-track'),strip=$('.logo-strip');if(!track||!strip)return;
  const clone=strip.cloneNode(true);clone.setAttribute('aria-hidden','true');$$('img',clone).forEach(i=>i.alt='');track.append(clone);track.classList.add('marquee');
  const tl=gsap.to(track,{x:()=>-strip.getBoundingClientRect().width-64,duration:36,repeat:-1,ease:'none',paused:true});const row=observeLoop(tl,track.parentElement,'logos');
  return()=>{tl.kill();loops.splice(loops.indexOf(row),1);clone.remove();track.classList.remove('marquee');gsap.set(track,{clearProps:'transform'});};
 });
 mm.add('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)',()=>{
  const cleanup=[];
  $$('.button.primary').forEach(button=>{
   const move=e=>{const r=button.getBoundingClientRect();gsap.to(button,{x:(e.clientX-r.left-r.width/2)*.06,y:(e.clientY-r.top-r.height/2)*.09,duration:.4,ease:'power3.out',overwrite:true});};
   const leave=()=>gsap.to(button,{x:0,y:0,duration:.4,ease:'power3.out',overwrite:true});button.addEventListener('pointermove',move);button.addEventListener('pointerleave',leave);cleanup.push(()=>{button.removeEventListener('pointermove',move);button.removeEventListener('pointerleave',leave);gsap.set(button,{clearProps:'transform'});});
  });
  $$('.case-card').forEach(card=>{
   const glow=$('.spotlight',card),move=e=>{const r=card.getBoundingClientRect();gsap.to(glow,{x:e.clientX-r.left-140,y:e.clientY-r.top-140,duration:.4,ease:'power3.out',overwrite:true});};
   const hover=()=>{const metric=$('.mini-metric b',card),final=metric.textContent;const m=final.match(/^(\$?)([\d,.]+)([MK]?)$/);if(!m)return;const n=+m[2].replaceAll(',',''),v={n:n*.8};gsap.to(v,{n,duration:.4,ease:'power3.out',onUpdate:()=>metric.textContent=m[1]+(n%1?v.n.toFixed(1):number(Math.round(v.n)))+m[3],onComplete:()=>metric.textContent=final});};
   card.addEventListener('pointermove',move);card.addEventListener('pointerenter',hover);cleanup.push(()=>{card.removeEventListener('pointermove',move);card.removeEventListener('pointerenter',hover);});
  });return()=>cleanup.forEach(fn=>fn());
 });
 document.fonts.ready.then(()=>ScrollTrigger.refresh());
})();
