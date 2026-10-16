// Dev-only vector tracing of the original artwork, not a replacement typeface.
const {trace}=require('../reference/qa/node_modules/potrace');
const {writeFileSync}=require('node:fs');
const {join}=require('node:path');
const root=join(__dirname,'..');
trace(join(root,'reference','original-lettering-mask.png'),{threshold:128,color:'#ffffff',background:'transparent',optTolerance:.15,alphaMax:1},(err,svg)=>{
 if(err)throw err;
 svg=svg.replace('width="500" height="500"','width="329" height="176"').replace('viewBox="0 0 500 500"','viewBox="88 162 329 176"').replace(/(<svg[^>]*>)/,'$1<title>The Revenue Inbox</title>');
 writeFileSync(join(root,'assets','brand','logo-dark.svg'),svg);
 writeFileSync(join(root,'assets','brand','wordmark-white.svg'),svg);
 writeFileSync(join(root,'assets','brand','logo-glow.svg'),svg);
 writeFileSync(join(root,'assets','brand','logo-light.svg'),svg.replaceAll('#ffffff','#161122'));
});
