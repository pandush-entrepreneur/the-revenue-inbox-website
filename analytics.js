/* GA4: production only, one automatic page view, allowlisted public event data. */
(() => {
 'use strict';
 if(!['therevenueinbox.com','www.therevenueinbox.com'].includes(location.hostname)||document.querySelector('meta[name="robots"]')?.content.includes('noindex'))return;
 const id='G-7B80MZJWGJ';
 if(window.revenueInboxAnalyticsReady)return;
 window.revenueInboxAnalyticsReady=true;
 window.dataLayer=window.dataLayer||[];
 window.gtag=window.gtag||function(){window.dataLayer.push(arguments);};
 const cleanURL=value=>{try{const u=new URL(value);u.search='';u.hash='';return u.href}catch{return ''}};
 const url=new URL(location.href);url.hash='';
 for(const key of [...url.searchParams.keys()])if(!/^utm_(source|medium|campaign|term|content|id)$/.test(key))url.searchParams.delete(key);
 window.gtag('js',new Date());
 window.gtag('config',id,{page_location:url.href,page_referrer:cleanURL(document.referrer),allow_google_signals:false,allow_ad_personalization_signals:false});
 const tag=document.createElement('script');tag.async=true;tag.src='https://www.googletagmanager.com/gtag/js?id='+id;document.head.append(tag);
 const fields={cta_click:['location'],video_play:['video'],faq_open:['question'],roi_toggle:['contract_value','close_rate'],pricing_toggle:['appointments','total'],case_filter:['category'],campaign_segment:['segment'],article_calculator:['appointments','total'],template_copy:['template'],strategy_call_booked:['location']};
 const timers=new Map();
 const send=detail=>{
  const params={send_to:id,page_path:location.pathname};
  for(const key of fields[detail.event]){const value=detail[key];if(typeof value==='string')params[key]=value.slice(0,100);else if(typeof value==='number'&&Number.isFinite(value))params[key]=value;}
  window.gtag('event',detail.event,params);
 };
 document.addEventListener('revenue-inbox:event',({detail})=>{
  if(!detail||!Object.hasOwn(fields,detail.event))return;
  if(['roi_toggle','pricing_toggle','article_calculator'].includes(detail.event)){
   clearTimeout(timers.get(detail.event));timers.set(detail.event,setTimeout(()=>send(detail),350));
  }else send(detail);
 });
})();
