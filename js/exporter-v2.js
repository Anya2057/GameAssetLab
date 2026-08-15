/* Exporter for the expanded Stage 2 effect model. */
exportProject=function(c){
  var anim=animationCSS(c),effects=activeEffects(c),style=effectStyles(c);
  var find=type=>effects.find(effect=>effect.type===type);
  var tint=find('tint'),shimmer=find('shimmer'),flicker=find('flicker'),flash=find('flash'),glitch=find('glitch'),hue=find('hue');
  var fxAnimations=[];
  if(flicker)fxAnimations.push(`gal-flicker ${1/(flicker.params.frequency||7)}s steps(2) infinite`);
  if(flash)fxAnimations.push(`gal-flash ${1/(flash.params.frequency||1)}s ease-in-out infinite`);
  if(glitch)fxAnimations.push(`gal-glitch ${1/(glitch.params.frequency||8)}s steps(2) infinite`);
  if(hue?.params.animate)fxAnimations.push(`gal-hue ${hue.params.speed||4}s linear infinite`);
  var html=`<!-- Замените путь assets/game-asset.png на путь к вашему ассету -->
<div class="gal-scene">
  <canvas class="gal-particles"></canvas>
  <div class="gal-asset"><div class="gal-anim"><div class="gal-fx"><img src="assets/game-asset.png" alt="Игровой ассет"></div></div></div>
</div>`;
  var css=`/* GAME ASSET LAB — автономный экспорт */
.gal-scene{position:relative;width:600px;height:500px;display:grid;place-items:center;overflow:hidden;background:#11131a}
.gal-particles{position:absolute;inset:0;width:100%;height:100%;pointer-events:none}
.gal-asset{position:relative;z-index:1;transform:translate(${c.transform.x}px,${c.transform.y}px) scale(${c.transform.scale}) rotate(${c.transform.rotation}deg);transition:transform .18s,filter .18s}
.gal-fx{position:relative;isolation:isolate;animation:${fxAnimations.join(',')||'none'};--flicker-min:${(flicker?.params.minOpacity??45)/100};--flash:${(flash?.params.brightness??220)/100};--glitch:${glitch?.params.strength??7}px}
.gal-fx img{display:block;max-width:300px;max-height:300px;filter:${style.filter||'none'};opacity:${style.opacity}}
.gal-fx:before,.gal-fx:after{content:"";position:absolute;inset:0;pointer-events:none;-webkit-mask:url("assets/game-asset.png") center/100% 100% no-repeat;mask:url("assets/game-asset.png") center/100% 100% no-repeat}
${tint?`.gal-fx:before{background:${tint.params.color};opacity:${(tint.params.amount??35)/100};mix-blend-mode:color}`:''}
${shimmer?`.gal-fx:after{background:linear-gradient(${shimmer.params.angle}deg,transparent calc(50% - ${shimmer.params.width}%),rgba(255,255,255,${(shimmer.params.brightness??190)/100}) 50%,transparent calc(50% + ${shimmer.params.width}%));background-size:300% 300%;mix-blend-mode:screen;animation:gal-shimmer ${shimmer.params.speed}s linear infinite}`:''}
.gal-anim{animation:${anim.map(item=>item.value).join(',')||'none'}}
.gal-asset:hover{transform:translate(${c.transform.x}px,${c.transform.y}px) scale(${c.transform.scale*(c.interactions.hover.scale||1)}) rotate(${c.transform.rotation+(c.interactions.hover.rotate||0)}deg);filter:brightness(${c.interactions.hover.brightness||100}%) drop-shadow(0 0 ${c.interactions.hover.glow||0}px #9d7cff)}
${anim.map(item=>item.keyframes).join('\n')}
@keyframes gal-shimmer{from{background-position:150% 150%}to{background-position:-50% -50%}}
@keyframes gal-flicker{40%{opacity:var(--flicker-min)}43%{opacity:1}72%{opacity:.72}}
@keyframes gal-flash{45%,55%{filter:brightness(var(--flash))}}
@keyframes gal-glitch{35%{transform:translateX(var(--glitch))}38%{transform:translateX(calc(-1 * var(--glitch)))}42%{transform:none}}
@keyframes gal-hue{to{filter:hue-rotate(360deg)}}
@keyframes gal-click{45%{transform:translateY(-18px) scale(.92,1.08)}70%{transform:none}}
.gal-asset.clicked .gal-anim{animation:gal-click .5s ease-out}`;
  var particleConfig=JSON.stringify({...c.particles,burst:c.interactions.burst});
  var js=`// GAME ASSET LAB — интеракции и Canvas-частицы
const root=document.querySelector('.gal-asset'),canvas=document.querySelector('.gal-particles'),ctx=canvas.getContext('2d');
const config=${particleConfig};let particles=[],last=performance.now(),acc=0;
function resize(){const r=canvas.getBoundingClientRect();canvas.width=r.width*devicePixelRatio;canvas.height=r.height*devicePixelRatio;ctx.setTransform(devicePixelRatio,0,0,devicePixelRatio,0,0)}resize();addEventListener('resize',resize);
function spawn(n=1,burst=false){const r=root.getBoundingClientRect(),s=canvas.getBoundingClientRect();for(let i=0;i<n;i++){const a=(burst?Math.random()*360:-90+(Math.random()-.5)*config.spread)*Math.PI/180,v=(burst?config.burst.force:config.speed)*(.5+Math.random());particles.push({x:r.left-s.left+r.width/2,y:r.top-s.top+r.height/2,vx:Math.cos(a)*v,vy:Math.sin(a)*v,size:(burst?config.burst.size:config.size)*(0.6+Math.random()),life:burst?config.burst.lifetime:config.lifetime,max:burst?config.burst.lifetime:config.lifetime,color:burst?config.burst.color:config.color})}}
function loop(t){const dt=Math.min((t-last)/1000,.04);last=t;if(config.enabled){acc+=dt*config.count/config.lifetime;while(acc>1){spawn();acc--}}ctx.clearRect(0,0,canvas.clientWidth,canvas.clientHeight);particles=particles.filter(p=>{p.life-=dt;if(p.life<=0)return false;p.x+=p.vx*dt;p.y+=p.vy*dt;ctx.globalAlpha=p.life/p.max;ctx.fillStyle=p.color;ctx.beginPath();ctx.arc(p.x,p.y,p.size,0,Math.PI*2);ctx.fill();return true});ctx.globalAlpha=1;requestAnimationFrame(loop)}requestAnimationFrame(loop);
root.addEventListener('click',()=>{root.classList.remove('clicked');void root.offsetWidth;root.classList.add('clicked');${c.interactions.click.burst?'spawn(config.burst.count,true);':''}});`;
  return{html,css,js,preset:JSON.stringify(c,null,2),complete:`<!doctype html><html><head><meta charset="UTF-8"><style>${css}</style></head><body>${html}<script>${js.replaceAll('</script>','<\\/script>')}<\/script></body></html>`};
};
