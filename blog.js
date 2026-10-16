/* Lightweight blog enhancements. Articles remain readable without JavaScript. */
(() => {
 const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
 const event=(name,detail)=>document.dispatchEvent(new CustomEvent('revenue-inbox:event',{detail:{event:name,...detail}}));
 const search=$('#guide-search');
 if(search){
  $('.guide-controls').hidden=false;
  const filter=()=>{const term=search.value.trim().toLowerCase();let count=0;$$('[data-guide]').forEach(card=>{card.hidden=!card.textContent.toLowerCase().includes(term);if(!card.hidden)count++;});$('#guide-count').textContent=count+' '+(count===1?'guide':'guides');$('.guide-empty').hidden=count>0;};
  search.addEventListener('input',filter);$('[data-clear-search]').addEventListener('click',()=>{search.value='';filter();search.focus();});
 }
 const volume=$('#guide-volume');
 if(volume){volume.disabled=false;const format=n=>new Intl.NumberFormat('en-US',{style:'currency',currency:'USD',minimumFractionDigits:n%1?2:0,maximumFractionDigits:2}).format(n);volume.addEventListener('input',()=>{const n=Number(volume.value),total=n*100+1500;$('#guide-volume-label').textContent=n;$('#guide-total').textContent=format(total);$('#guide-unit').textContent=format(total/n);event('article_calculator',{appointments:n,total});});}
 const contentsPanel=$('.article-aside details');if(contentsPanel&&matchMedia('(min-width:768px)').matches)contentsPanel.open=true;
 const contents=$$('.article-aside nav a');
 if(contents.length&&'IntersectionObserver'in window){const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting)contents.forEach(link=>{if(link.hash==='#'+entry.target.id)link.setAttribute('aria-current','location');else link.removeAttribute('aria-current');});});},{rootMargin:'-15% 0px -65% 0px'});contents.forEach(a=>{const heading=document.getElementById(a.hash.slice(1));if(heading)observer.observe(heading);});}
})();
