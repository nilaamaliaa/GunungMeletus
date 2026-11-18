(function(){'use strict';
const $=(s,r)=>(r||document).querySelector(s),$$=(s,r)=>[...(r||document).querySelectorAll(s)];
const fmt=n=>n==null?'Data belum tersedia':n.toLocaleString('id-ID');
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const LV=['Belum diverifikasi','Normal','Waspada','Siaga','Awas'],LC=['#8a8a8a','#4caf50','#ffd600','#FF6A00','#e53935'];
const ST=statusGunungApi,byId=id=>volcanoes.find(v=>v.id===id),tgl=s=>s?new Date(s+'T00:00:00').toLocaleDateString('id-ID',{day:'numeric',month:'long',year:'numeric'}):'Data belum tersedia';
volcanoes.forEach(v=>{v.st=ST.items.find(s=>s.id===v.id)||{level:0,label:'Belum diverifikasi',radiusBahayaKm:null,sejakTanggal:null,rekomendasi:'Status belum diverifikasi. Cek MAGMA Indonesia.',sumber:ST.sumberUrl,tanggalUpdate:null,perluVerifikasi:true};v.level=v.st.level});
const reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;
const card=(i,j,t)=>`<div class="card">${i?`<div class="icon">${i}</div>`:''}<h3>${j}</h3><p>${t}</p></div>`;
/* ---------- Perf: lite mode, embers canvas, debug ---------- */
const Q=new URLSearchParams(location.search),debounce=(f,ms)=>{let t;return function(){const a=arguments;clearTimeout(t);t=setTimeout(()=>f.apply(null,a),ms)}};
let lite=reduce||navigator.hardwareConcurrency<=4||navigator.deviceMemory<=4;
try{const sv=localStorage.getItem('lite');if(sv==='1')lite=true;else if(sv==='0')lite=false}catch(e){}
if(Q.get('lite')==='1')lite=true;
document.addEventListener('error',e=>{const i=e.target;if(!i||i.tagName!=='IMG')return;if(i.dataset.fb){const f=i.dataset.fb;delete i.dataset.fb;i.src=f}else{i.classList.add('noimg');i.removeAttribute('src')}},true);
const em=(function(){const c=$('#embers'),x=c.getContext('2d'),N=32;let P=[],raf=0,on=false,vis=true,W=0,H=0,last=0;
 const rs=()=>{const r=c.getBoundingClientRect();W=c.width=Math.max(1,r.width|0);H=c.height=Math.max(1,r.height|0)};
 const mk=()=>({x:Math.random()*W,y:Math.random()*H,r:1+Math.random()*2.2,v:18+Math.random()*38,dx:(Math.random()-.5)*14,a:.35+Math.random()*.55});
 function frame(t){const dt=Math.min(.05,(t-last)/1000);last=t;x.clearRect(0,0,W,H);x.fillStyle='#FF8C1A';
  for(const p of P){p.y-=p.v*dt;p.x+=p.dx*dt;if(p.y<-6){p.y=H+6;p.x=Math.random()*W}x.globalAlpha=p.a*Math.min(1,p.y/(H*.6));x.beginPath();x.arc(p.x,p.y,p.r,0,6.283);x.fill()}
  raf=requestAnimationFrame(frame)}
 function update(){const run=vis&&!document.hidden&&!lite;if(run&&!on){on=true;rs();P=Array.from({length:N},mk);last=performance.now();raf=requestAnimationFrame(frame)}else if(!run&&on){on=false;cancelAnimationFrame(raf);x.clearRect(0,0,W,H)}}
 new IntersectionObserver(e=>{vis=e[0].isIntersecting;$('#hero').classList.toggle('off',!vis);update()}).observe($('#hero'));
 document.addEventListener('visibilitychange',update);addEventListener('resize',debounce(()=>{if(on)rs()},200));return {update}})();
const lbtn=$('#litebtn');
function setLite(v,save){lite=v;document.documentElement.classList.toggle('lite',v);lbtn.setAttribute('aria-pressed',v);lbtn.innerHTML=v?'<i class="bi bi-lightning-charge-fill"></i> Mode Ringan: ON':'<i class="bi bi-lightning-charge-fill"></i> Mode Ringan';if(save){try{localStorage.setItem('lite',v?'1':'0')}catch(e){}}em.update()}
lbtn.onclick=()=>setLite(!lite,true);setLite(lite,false);
if(Q.get('debug')==='1'){const o=document.createElement('div');o.id='dbg';document.body.append(o);let f=0,t0=performance.now(),lt=0;
 (function l(t){f++;if(t-t0>=1000){window.__fps=Math.round(f*1000/(t-t0));o.textContent='FPS '+window.__fps+' | long tasks '+lt+' | '+(lite?'MODE RINGAN':'MODE PENUH')+' | anim '+document.getAnimations().length;f=0;t0=t}requestAnimationFrame(l)})(t0);
 try{new PerformanceObserver(l=>l.getEntries().forEach(e=>{lt++;console.log('[LongTask] '+Math.round(e.duration)+' ms @ '+Math.round(e.startTime))})).observe({entryTypes:['longtask']})}catch(e){}}
/* ---------- 1. Pengecekan dataset (console) ---------- */
(function(){console.group('Pengecekan dataset');
 const C=content,ds={volcanoes,dataBencana,'content.umum.tipe':C.umum.tipe,'content.umum.penyebab':C.umum.penyebab,'content.umum.bahaya':C.umum.bahaya,'content.levels':C.levels,'content.lapisan.bagian':C.lapisan.bagian,'content.mitigasi':C.mitigasi,'content.evakuasi.kartun':C.evakuasi.kartun,'content.evakuasi.foto':C.evakuasi.foto,'content.peringatan.alur':C.peringatan.alur,'content.peringatan.alat':C.peringatan.alat,'content.peringatan.media':C.peringatan.media,'content.penanggulangan':C.penanggulangan,'content.referensi':C.referensi};
 Object.keys(ds).forEach(k=>{const n=ds[k]?ds[k].length:0;(n?console.log:console.warn)(k+': '+n+' item'+(n?'':'  <-- KOSONG'))});
 const ids=new Set(volcanoes.map(v=>v.id));const cnt=[0,0,0,0,0];volcanoes.forEach(v=>cnt[v.level]++);console.log('Status: Awas '+cnt[4]+', Siaga '+cnt[3]+', Waspada '+cnt[2]+', Normal '+cnt[1]+', belum diverifikasi '+cnt[0]);if(cnt[0])console.warn(cnt[0]+' gunung belum punya status di data/status.js: '+volcanoes.filter(v=>!v.level).map(v=>v.nama).join(', '));ST.items.forEach(i=>{if(!ids.has(i.id))console.warn('status.js: id tidak ada di volcanoes:',i.id)});
 if(volcanoes.length!==74||ids.size!==74)console.warn('Jumlah gunung bukan 74 unik!');
 volcanoes.forEach(v=>{const im=new Image();im.onerror=()=>console.warn('Gambar tidak ter-load:',v.gambar);im.src=v.thumb||v.gambar});
 console.groupEnd()})();
/* ---------- 2. Nav ---------- */
const setHH=()=>document.documentElement.style.setProperty('--hh',$('.nav').offsetHeight+'px');setHH();addEventListener('resize',setHH);
const side=$('#side'),links=$$('#side a'),burger=$('#burger');let lock=0;
const setActive=id=>links.forEach(a=>a.classList.toggle('on',a.getAttribute('href')==='#'+id));
const mqO=matchMedia('(max-width:1024px)'),de0=document.documentElement;let sbOpen=true;const sbRe=debounce(()=>{if(typeof draw==='function')draw()},250);
function applySb(v,save){sbOpen=v;de0.classList.toggle('sb-closed',!v);burger.setAttribute('aria-expanded',String(v));burger.setAttribute('aria-label',v?'Tutup menu samping':'Buka menu samping');side.setAttribute('aria-hidden',String(!v));if(save&&!mqO.matches){try{localStorage.setItem('sidebar',v?'1':'0')}catch(e){}}sbRe()}
function sbInit(){let v=!mqO.matches;if(!mqO.matches){try{const x=localStorage.getItem('sidebar');if(x!==null)v=x==='1'}catch(e){}}applySb(v,false)}
const closeSide=()=>{if(mqO.matches&&sbOpen)applySb(false,false)};
burger.onclick=()=>applySb(!sbOpen,true);
if(mqO.addEventListener)mqO.addEventListener('change',sbInit);else mqO.addListener(sbInit);
document.addEventListener('click',e=>{if(mqO.matches&&sbOpen&&!e.target.closest('#side,#burger'))applySb(false,false)});
addEventListener('keydown',e=>{if(e.key==='Escape'&&mqO.matches&&sbOpen&&!(typeof lb!=='undefined'&&lb&&lb.classList.contains('open')))applySb(false,false)});
sbInit();
links.forEach(a=>a.addEventListener('click',()=>{setActive(a.getAttribute('href').slice(1));lock=Date.now()+900;closeSide()}));
const io=new IntersectionObserver(es=>{if(Date.now()<lock)return;es.forEach(e=>e.isIntersecting&&setActive(e.target.id))},{rootMargin:'-35% 0px -60% 0px'});
$$('main section').forEach(s=>io.observe(s));
$$('a[href^="#"]').forEach(a=>{const id=a.getAttribute('href').slice(1);if(id&&!document.getElementById(id))console.warn('Link mati:',a.getAttribute('href'))});
let sct=0;const tb=$('#top'),pg=$('#progress');addEventListener('scroll',()=>{if(sct)return;sct=requestAnimationFrame(()=>{sct=0;const h=document.documentElement,mx=h.scrollHeight-h.clientHeight;pg.style.transform='scaleX('+(mx>0?h.scrollTop/mx:0)+')';tb.style.display=h.scrollTop>600?'block':'none'})},{passive:true});
$('#top').onclick=()=>scrollTo({top:0,behavior:reduce?'auto':'smooth'});
/* ---------- 3. Hero ---------- */
$('#stats').innerHTML=[[127,'Gunung api aktif di Indonesia (PVMBG)'],[volcanoes.length,'Gunung di situs ini'],[13,'% gunung api aktif dunia ada di Indonesia']].map(a=>`<div><b data-n="${a[0]}">0</b><span>${a[1]}</span></div>`).join('');
$$('[data-n]').forEach(e=>{const t=+e.dataset.n;let c=0;const id=setInterval(()=>{c+=Math.ceil(t/40);if(c>=t){c=t;clearInterval(id)}e.textContent=c},30)});
/* ---------- 4. Konten dari content.js ---------- */
const U=content.umum;
$('#umumBody').innerHTML=`<p>${U.pengertian}</p><ul>${U.fakta.map(f=>`<li>${f}</li>`).join('')}</ul>
<div class="card"><h3>${U.mengapa.j}</h3><p>${U.mengapa.t}</p></div><h3>Tipe gunung api</h3><div class="grid">${U.tipe.map(t=>card('',t.j,t.t)).join('')}</div>
<h3>Penyebab gunung meletus</h3><ol class="steps">${U.penyebab.map(p=>`<li><b>${p.j}</b>${p.t}</li>`).join('')}</ol>
<p class="warn"><b>Tanda-tanda sebelum letusan:</b> ${U.tanda}</p><h3>Bahaya yang menyertai letusan</h3><div class="grid">${U.bahaya.map(b=>card(b.i,b.j,b.t)).join('')}</div>`;
const L=content.lapisan;
$('#lapisanBody').innerHTML=`<div class="split"><img src="${L.gambar||L.img}" alt="Struktur internal gunung berapi: awan abu, kawah, aliran lava, saluran, sill, lakolit, kantung magma" loading="lazy"><div>${L.bagian.map(b=>`<details><summary>${b.j}</summary><p>${b.t}</p></details>`).join('')}<p class="dim">Sumber: <a href="${L.sumber}">Roboguru</a></p></div></div>`;
const M=content.mitigasi;
$('#mitigasiBody').innerHTML=`<div class="tabs" role="tablist">${M.map((m,i)=>`<button role="tab" id="tb${i}" aria-selected="${i==0}" aria-controls="mp" data-i="${i}">${m.i} ${m.j}</button>`).join('')}</div><div id="mp" role="tabpanel"></div>`;
const showM=i=>{const m=M[i];$$('[role=tab]').forEach((b,j)=>b.setAttribute('aria-selected',j==i));$('#mp').innerHTML=`<div class="split"><img src="${m.img}" alt="Ilustrasi ${m.j}" loading="lazy"><ul>${m.item.map(t=>`<li>${t}</li>`).join('')}</ul></div>`};
$$('[role=tab]').forEach(b=>b.onclick=()=>showM(+b.dataset.i));showM(0);
function statusBanner(){const c=[0,0,0,0,0];volcanoes.forEach(v=>c[v.level]++);const sg=volcanoes.filter(v=>v.level>=3),ver=volcanoes.some(v=>v.level&&v.st.perluVerifikasi);
 return `<div class="sbanner"><b>Status per ${tgl(ST.tanggalData)}:</b> ${c[4]} Awas, ${c[3]} Siaga, ${c[2]} Waspada, ${c[1]} Normal, ${c[0]} belum diverifikasi (dari ${volcanoes.length} gunung).<div>${sg.length?'Siaga/Awas: '+sg.map(v=>`<button class="chip" data-vid="${v.id}" style="border-color:${LC[v.level]}">${esc(v.nama)} (${LV[v.level]}${v.st.radiusBahayaKm?', '+v.st.radiusBahayaKm+' km':''})</button>`).join(''):'Tidak ada gunung berstatus Siaga atau Awas.'}</div><p class="dim">${ST.catatan} <a href="${ST.sumberUrl}" target="_blank" rel="noopener">magma.esdm.go.id</a>. Data diperbarui ${tgl(ST.tanggalData)}.${ver?' Status Waspada ditandai "perlu verifikasi".':''}</p></div>`}
const E=content.evakuasi;let chk={};try{chk=JSON.parse(localStorage.getItem('tas')||'{}')}catch(e){}
$('#evakuasiBody').innerHTML=`<h3>Enam langkah evakuasi</h3><p>Berlaku saat status mulai naik hingga tiba di tempat aman. Ajak seluruh keluarga membacanya bersama.</p><div class="grid">${E.kartun.map((s,i)=>card(s.i,(i+1)+'. '+s.j,s.t)).join('')}</div>
<h3>Situasi nyata di lapangan</h3><div id="situasi" class="fieldlist"></div>
<h3>Isi tas siaga bencana</h3><div class="grid">${Object.keys(E.tas).map(k=>`<div class="card"><h3>${k}</h3>${E.tas[k].map(t=>`<label class="check"><input type="checkbox" data-k="${esc(t)}" ${chk[t]?'checked':''}>${t}</label>`).join('')}</div>`).join('')}</div>
<h3>Nomor penting</h3><div class="grid">${E.kontak.map(k=>card('<i class="bi bi-telephone-fill"></i>',k.n,k.v)).join('')}</div><p>${E.kontakCatatan}</p>`;
const fotoH=(s,i,img)=>`<article class="field${img?' has':''}">${img?`<img src="${img}" alt="${esc(s.j)}" loading="lazy">`:''}<div><h4>${i+1}. ${s.j}</h4><p>${s.t}</p></div></article>`;
$('#situasi').innerHTML=E.foto.map((s,i)=>fotoH(s,i,null)).join('');
E.foto.forEach((s,i)=>{if(!s.gambar)return;const im=new Image();im.onload=()=>{$$('#situasi article')[i].outerHTML=fotoH(s,i,s.gambar)};im.src=s.gambar});
$('#evakuasiBody').onchange=e=>{if(e.target.dataset.k){chk[e.target.dataset.k]=e.target.checked;try{localStorage.setItem('tas',JSON.stringify(chk))}catch(x){}}};
const P=content.peringatan;
$('#peringatanBody').innerHTML=statusBanner()+`<h3>Empat level status gunung api</h3><div class="stepper">${content.levels.map((l,i)=>`<div class="lv" style="background:${l.c};color:${i==3?'#fff':'#000'}"><b>${l.n}</b><i>(${l.w})</i><p>${l.arti}</p><p><b>Tindakan:</b> ${l.aksi}</p></div>`).join('')}</div><ul>${content.levelCatatan.map(t=>`<li>${t}</li>`).join('')}</ul>
<h3>Alur kerja sistem peringatan dini</h3><div class="flowc">${P.alur.map((a,i)=>`<div class="fstep"><div class="card"><h3>${i+1}. ${a.j}</h3><p><i>${a.s}</i></p><p>${a.t}</p></div></div>`).join('')}</div>
<h3>Teknologi dan alat pemantauan</h3><div class="grid">${P.alat.map(a=>card(a.i,a.j,a.t)).join('')}</div><p class="dim">${P.alatCatatan}</p>
<h3>Media penyampaian peringatan</h3><div class="grid">${P.media.map(a=>card(a.i,a.j,a.t)).join('')}</div><p>${P.mediaCatatan}</p>
<div class="card"><h3><i class="bi bi-phone-fill"></i> ${P.aplikasi.n}</h3><p><i>${P.aplikasi.s}</i></p><p>${P.aplikasi.t}</p><ul>${P.aplikasi.fitur.map(f=>`<li>${f}</li>`).join('')}</ul><p>${P.aplikasi.upd}</p><p><a class="btn" href="${P.aplikasi.url}">Buka MAGMA Indonesia</a></p><p>Sumber informasi lain:</p><ul>${P.aplikasi.lain.map(f=>`<li>${f}</li>`).join('')}</ul></div>`;
$('#penanggulanganBody').innerHTML=`<p>Alur upaya penanggulangan dari pemantauan hingga pemulihan:</p><div class="flowc">${content.penanggulangan.map((c,i)=>`<div class="fstep">${card(c.i,(i+1)+'. '+c.j,c.t)}</div>`).join('')}</div>`;
$('#refs').innerHTML=content.referensi.map(r=>`<li><a href="${r.u}" target="_blank" rel="noopener">${r.n}</a></li>`).join('');
/* ---------- 5. Bencana & korban Indonesia (data/bencana.js) ---------- */
const nf=n=>n.toLocaleString('id-ID'),has=(k,f,a)=>(k[a]||[]).includes(f);
const val=(k,f)=>k[f]==null?'-':(has(k,f,'lebihDari')?'> ':'')+(has(k,f,'perkiraan')?'±':'')+nf(k[f]);
const rows=[];dataBencana.forEach(e=>{rows.push({gid:e.gunungId,tahun:e.tahun,label:e.gunung,k:e.korban,tgl:e.tanggal,lok:e.lokasi});if(e.korbanSusulan)rows.push({gid:e.gunungId,tahun:e.korbanSusulan.tahun,label:e.gunung+' – '+e.korbanSusulan.label.toLowerCase(),k:e.korbanSusulan,susulan:true,tgl:e.korbanSusulan.tanggal,lok:e.lokasi})});
const short=t=>t.split('. ')[0].replace(/\.?$/,'.');
$('#timeline').innerHTML=dataBencana.map((e,i)=>{const k=e.korban,ks=[['Meninggal','meninggal'],['Hilang','hilang'],['Luka berat','lukaBerat'],['Luka','luka'],['Mengungsi','mengungsi']].filter(a=>k[a[1]]!=null).map(a=>`<li>${a[0]}: <b>${val(k,a[1])}</b></li>`).join('');
 const su=e.korbanSusulan?`<p><b>${e.korbanSusulan.label} (${e.korbanSusulan.tanggal}):</b> ${val(e.korbanSusulan,'meninggal')} meninggal, ${val(e.korbanSusulan,'hilang')} hilang.</p>`:'';
 return `<li><button class="tl" aria-expanded="false" aria-controls="tl${i}"><span class="tly">${e.tahun}</span><span><b>${e.gunung}</b> — ${e.lokasi}<br><small>${short(e.kronologi)}</small></span><span class="tlc">＋</span></button><div class="tlp" id="tl${i}" hidden><p><b>Tanggal:</b> ${e.tanggal}</p><p>${e.kronologi}</p>${e.catatanKecil?`<p class="dim">${e.catatanKecil.replace('magma.esdm.go.id','<a href="https://magma.esdm.go.id" target="_blank" rel="noopener">magma.esdm.go.id</a>')}</p>`:''}${ks?`<p><b>Korban:</b></p><ul>${ks}</ul>`:''}${k.catatan?`<p class="dim">${esc(k.catatan)}</p>`:''}${su}${e.penyebabUtama?`<p><b>Penyebab utama:</b> ${e.penyebabUtama}</p>`:''}<p class="dim">Sumber: ${e.sumber}</p>${e.gunungId?`<button class="btn" data-gid="${e.gunungId}">Lihat detail gunung</button>`:''}</div></li>`}).join('');
$('#timeline').addEventListener('click',e=>{const g=e.target.closest('[data-gid]');if(g){openLb(g.dataset.gid,g,[byId(g.dataset.gid)]);return}const b=e.target.closest('.tl');if(!b)return;const p=$('#'+b.getAttribute('aria-controls')),o=b.getAttribute('aria-expanded')==='true';b.setAttribute('aria-expanded',!o);p.hidden=o;b.querySelector('.tlc').textContent=o?'＋':'−'});
const totM=dataBencana.reduce((s,e)=>s+(e.korban.meninggal||0),0),top=dataBencana.reduce((a,e)=>(e.korban.meninggal||0)>(a.korban.meninggal||0)?e:a),sus=dataBencana.find(e=>e.korbanSusulan).korbanSusulan;
$('#ringkas').innerHTML=[[nf(totM),'Total korban meninggal akibat letusan','Jumlah dari '+dataBencana.length+' letusan (termasuk angka perkiraan ±). Tidak termasuk banjir lahar Marapi 2024.'],['+'+nf(sus.meninggal),'Tambahan korban banjir lahar Marapi 2024','Meninggal; '+nf(sus.hilang)+' orang lain hilang. Dicatat terpisah dari erupsi.'],[(has(top.korban,'meninggal','perkiraan')?'±':'')+nf(top.korban.meninggal),'Letusan paling mematikan',top.gunung+' ('+top.tahun+')']].map(a=>`<div class="card"><div class="big">${a[0]}</div><h3>${a[1]}</h3><p>${a[2]}</p></div>`).join('');
const KM=[['meninggal','Meninggal',[['meninggal','Meninggal']]],['hilang','Hilang',[['hilang','Hilang']]],['luka','Luka',[['lukaBerat','Luka berat'],['luka','Luka']]],['mengungsi','Mengungsi',[['mengungsi','Mengungsi']]]];
const order=[...rows].sort((a,b)=>(b.k.meninggal||0)-(a.k.meninggal||0));
const rl2=r=>{const b=r.label.split(' – ')[0].replace('Gunung ','');return r.gid==='marapi'?['Marapi '+r.tahun,r.susulan?'(banjir lahar)':'(erupsi)']:[b,'('+r.tahun+')']};
const rlabel=r=>rl2(r).join(' ');
const tv=(k,f)=>k[f]==null?'Tidak ada data':(has(k,f,'lebihDari')?'lebih dari ':'')+nf(k[f])+(has(k,f,'perkiraan')?' (perkiraan)':'');
let metric=0,tipI=-1,pinned=false;const kc=$('#kchart'),kt=$('#ktip'),BARH=250;
function buildChart(){kc.innerHTML='<div class="kin">'+order.map((r,i)=>{const l=rl2(r);return `<button class="kcol${r.susulan?' sus':''}" role="listitem" data-i="${i}" aria-label="${esc(rlabel(r))}"><span class="kbw"><span class="kb"><b class="kv"></b><i class="kf"></i></span><span class="kb s2"><b class="kv"></b><i class="kf"></i></span></span><span class="kl"><span>${esc(l[0])}</span><span>${esc(l[1])}</span></span></button>`}).join('')+'</div>';
 $('#metric').innerHTML=KM.map((m,i)=>`<button role="tab" aria-selected="${i===0}" data-m="${i}">${m[1]}</button>`).join('')}
function updateChart(anim){const ser=KM[metric][2],mx=Math.max(1,...order.flatMap(r=>ser.map(s=>r.k[s[0]]||0))),fills=[];
 $('#klegend').innerHTML=ser.length>1?ser.map((s,j)=>`<span><i class="sw s${j+1}"></i>${s[1]}</span>`).join(' '):'';
 $$('.kcol',kc).forEach((b,i)=>{const r=order[i];$$('.kb',b).forEach((kb,j)=>{if(j>=ser.length){kb.hidden=true;return}kb.hidden=false;const f=$('.kf',kb),t=$('.kv,.kn',kb),v=r.k[ser[j][0]];
  if(v==null){f.hidden=true;t.className='kn';t.textContent=(ser[j][0]==='meninggal'&&r.k.tidakAdaKorban)?'tidak ada laporan korban jiwa':'tidak ada data'}else{f.hidden=false;t.className='kv';t.textContent=val(r.k,ser[j][0]);f.style.height=Math.max(4,Math.round(v/mx*BARH))+'px';fills.push(f)}})});
 if(anim&&!reduce){fills.forEach(f=>{f.style.transition='none';f.style.transform='scaleY(0)'});void kc.offsetWidth;fills.forEach(f=>{f.style.transition='transform .35s ease-out';f.style.transform='scaleY(1)'})}else fills.forEach(f=>{f.style.transform='none'})}
function tipHTML(r,pin){const k=r.k,L=[['Meninggal','meninggal'],['Hilang','hilang'],['Luka berat','lukaBerat'],['Luka','luka'],['Mengungsi','mengungsi']];
 return `<b>${esc(rlabel(r))}</b><br><small>${esc(r.tgl)} • ${esc(r.lok)}</small><ul>${L.map(a=>`<li>${a[0]}: ${a[1]==='meninggal'&&k.tidakAdaKorban?'Tidak ada laporan korban jiwa (data per 8 September 2026)':tv(k,a[1])}</li>`).join('')}</ul>${k.catatan&&!k.tidakAdaKorban?`<small>${esc(k.catatan)}</small><br>`:''}${pin?`<button class="btn" data-gid="${r.gid}">Lihat detail gunung</button>`:'<small class="dim">Klik kolom untuk detail gunung</small>'}`}
function showTip(i,pin){const b=$$('.kcol',kc)[i],w=kc.parentNode;kt.innerHTML=tipHTML(order[i],pin);kt.hidden=false;const br=b.getBoundingClientRect(),wr=w.getBoundingClientRect(),tw=kt.offsetWidth;let l=br.right-wr.left+6;if(l+tw>wr.width)l=br.left-wr.left-tw-6;kt.style.left=Math.max(6,Math.min(l,wr.width-tw-6))+'px';kt.style.top='8px';tipI=i;pinned=!!pin}
function hideTip(){kt.hidden=true;tipI=-1;pinned=false}
kc.addEventListener('pointerover',e=>{if(e.pointerType!=='mouse')return;const b=e.target.closest('.kcol');if(b&&+b.dataset.i!==tipI)showTip(+b.dataset.i,false)});
kc.addEventListener('pointerleave',e=>{if(e.pointerType==='mouse')hideTip()});document.addEventListener('pointerdown',e=>{if(pinned&&!e.target.closest('.kwrap'))hideTip()});
kc.addEventListener('focusin',e=>{const b=e.target.closest('.kcol');if(b)showTip(+b.dataset.i,false)});
kc.addEventListener('click',e=>{const b=e.target.closest('.kcol');if(!b)return;const i=+b.dataset.i;if(e.pointerType==='touch'&&!(pinned&&tipI===i)){showTip(i,true);return}openLb(order[i].gid,b,[byId(order[i].gid)])});
kt.addEventListener('click',e=>{const g=e.target.closest('[data-gid]');if(g)openLb(g.dataset.gid,g,[byId(g.dataset.gid)])});
$('#metric').addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;metric=+b.dataset.m;$$('#metric button').forEach((x,i)=>x.setAttribute('aria-selected',i===metric));hideTip();updateChart(true)});
const kio=('IntersectionObserver' in window)?new IntersectionObserver(es=>{if(es[0].isIntersecting){kio.disconnect();buildChart();updateChart(true)}},{rootMargin:'300px'}):null;
if(kio)kio.observe($('#korban'));else{buildChart();updateChart(false)}
/* ---------- 5b. Grafik gunung erupsi per tahun (data/letusan_tahunan.js) ---------- */
(function(){const D=letusanTahunan,yc=$('#ychart'),yt=$('#ytip'),BH=250,Y=[];
 for(let y=D.dari;y<=D.sampaiLengkap;y++){const n=[...new Set(D.rec.filter(r=>r[1]<=y&&r[2]>=y).map(r=>r[0]))].sort();Y.push({y,n,p:false})}
 Object.keys(D.sementara).sort().forEach(y=>Y.push({y:+y,n:D.sementara[y].slice().sort(),p:true}));
 const full=Y.filter(a=>!a.p),mx=Math.max(...Y.map(a=>a.n.length)),top=full.reduce((a,b)=>b.n.length>a.n.length?b:a),
  avg=full.reduce((s,a)=>s+a.n.length,0)/full.length,uniq=new Set(full.flatMap(a=>a.n)).size,lo=full.reduce((a,b)=>b.n.length<a.n.length?b:a);
 $('#ystats').innerHTML=[[uniq,'Gunung berbeda yang erupsi','Tercatat erupsi minimal sekali pada '+D.dari+'–'+D.sampaiLengkap+'.'],
  [top.n.length,'Tahun terbanyak: '+top.y,'Gunung yang erupsi dalam satu tahun (terendah: '+lo.n.length+' gunung pada '+lo.y+').'],
  [avg.toFixed(1).replace('.',','),'Rata-rata per tahun','Gunung yang erupsi tiap tahun pada '+D.dari+'–'+D.sampaiLengkap+'.']].map(a=>`<div class="card"><div class="big">${a[0]}</div><h3>${a[1]}</h3><p>${a[2]}</p></div>`).join('');
 $('#ylegend').innerHTML='<span><i class="sw s1"></i>Data lengkap (GVP)</span><span><i class="sw sp"></i>Sementara: angka minimum, belum lengkap</span>';
 $('#ynote').innerHTML='Sumber: <a href="'+D.sumberUrl+'" target="_blank" rel="noopener">Smithsonian Global Volcanism Program</a>, hanya erupsi berstatus terkonfirmasi. Gunung dihitung bila ada erupsi aktif pada sebagian waktu tahun itu, termasuk erupsi panjang seperti Semeru, Ibu, dan Dukono. Angka 2024–2026 baru memuat gunung yang tampil berstatus erupsi berlanjut di data GVP yang sempat dibaca (tanda ≥), jadi jangan dibandingkan langsung dengan tahun-tahun sebelumnya. Ukuran ini berbeda dari jumlah <i>kejadian</i> erupsi PVMBG yang bisa mencapai ribuan per tahun untuk satu gunung.';
 yc.innerHTML='<div class="yin">'+Y.map((a,i)=>`<button class="ycol${a===top?' peak':''}" role="listitem" data-i="${i}" aria-label="${a.y}: ${a.p?'minimal ':''}${a.n.length} gunung erupsi"><span class="kbw"><span class="kb"><b class="kv">${a.p?'≥':''}${a.n.length}</b><i class="kf${a.p?' prov':''}" style="height:${Math.max(4,Math.round(a.n.length/mx*BH))}px"></i></span></span><span class="kl"><span>${a.y}</span></span></button>`).join('')+'</div>';
 let cur=-1;const bars=$$('.kf',yc);
 function show(i){const a=Y[i],b=$$('.ycol',yc)[i],w=yc.parentNode;yt.innerHTML=`<b>${a.y}: ${a.p?'minimal ':''}${a.n.length} gunung erupsi</b><br><small>${a.p?'Data sementara, belum lengkap.':'Data GVP lengkap.'}</small><p style="margin:.4rem 0 0">${a.n.map(esc).join(', ')}</p>`;yt.hidden=false;
  const br=b.getBoundingClientRect(),wr=w.getBoundingClientRect(),tw=yt.offsetWidth;let l=br.right-wr.left+6;if(l+tw>wr.width)l=br.left-wr.left-tw-6;yt.style.left=Math.max(6,Math.min(l,wr.width-tw-6))+'px';yt.style.top='8px';cur=i}
 const hide=()=>{yt.hidden=true;cur=-1};
 yc.addEventListener('pointerover',e=>{if(e.pointerType!=='mouse')return;const b=e.target.closest('.ycol');if(b&&+b.dataset.i!==cur)show(+b.dataset.i)});
 yc.addEventListener('pointerleave',e=>{if(e.pointerType==='mouse')hide()});
 yc.addEventListener('focusin',e=>{const b=e.target.closest('.ycol');if(b)show(+b.dataset.i)});
 yc.addEventListener('click',e=>{const b=e.target.closest('.ycol');if(b)show(+b.dataset.i)});
 document.addEventListener('pointerdown',e=>{if(cur>-1&&!e.target.closest('#tahunan .kwrap'))hide()});
 function anim(){if(reduce)return;bars.forEach(f=>{f.style.transition='none';f.style.transform='scaleY(0)'});void yc.offsetWidth;bars.forEach(f=>{f.style.transition='transform .5s ease-out';f.style.transform='scaleY(1)'})}
 if('IntersectionObserver' in window){const o=new IntersectionObserver(es=>{if(es[0].isIntersecting){o.disconnect();anim()}},{rootMargin:'-10% 0px'});o.observe(yc)}
})();
/* ---------- 6. Filter bersama ---------- */
const grp=v=>/kaldera/i.test(v.tipe)?'Kaldera':/kubah/i.test(v.tipe)?'Kubah lava':/kompleks/i.test(v.tipe)?'Kompleks':/strato/i.test(v.tipe)?'Stratovolkano':'Tipe belum tersedia';
const provs=[...new Set(volcanoes.map(v=>v.provinsi))].sort(),tipes=[...new Set(volcanoes.map(grp))].sort();
const opt=(a,all)=>`<option value="">${all}</option>`+a.map(x=>`<option>${x}</option>`).join('');
const match=(v,q,p,t)=>(!q||(v.nama+' '+v.provinsi+' '+v.lokasi).toLowerCase().includes(q))&&(!p||v.provinsi===p)&&(!t||grp(v)===t);
/* ---------- 7. Peta SVG Indonesia ---------- */
const mp=$('#map'),dr=$('#drawer');
const land=[[[95.2,5.6],[97.6,5.3],[100.2,2.6],[103.5,0.4],[106,-2.9],[105.9,-5.8],[104.4,-5.9],[102.2,-4],[100.3,-1.2],[98.6,1.2],[96.2,3.4]],[[105.2,-6.8],[106.5,-5.9],[108.5,-6.4],[111,-6.4],[113,-6.9],[114.5,-7.7],[114.4,-8.7],[111,-8.3],[108,-7.8],[105.5,-7.2]],[[108.9,1.8],[110.3,1.7],[111.8,2.8],[113.8,4.5],[115.5,5],[117.7,6.9],[119.2,5.3],[118.3,1.2],[117.6,-0.8],[116.4,-3.5],[114.3,-4.1],[111.6,-3.4],[110.2,-2.9],[109.1,-0.5]],[[119.4,-5.4],[119.6,-3.3],[118.9,-2.1],[119.9,0.8],[121.6,1.2],[124.7,1.7],[125.2,1.5],[123.2,0.4],[121.2,0.3],[122.4,-0.9],[123.1,-1.6],[121.5,-1.9],[122.2,-4.6],[123,-5.1],[121.9,-5],[120.5,-3.5],[120.4,-5.5]],[[131,-0.8],[134.1,-0.9],[135,-3.3],[137.8,-1.5],[141,-2.6],[141,-9.1],[138.5,-8.3],[137.5,-5.5],[134,-4.2],[132.5,-3]],[[127.4,2.2],[128.3,1.7],[128.5,0.5],[128.2,-0.7],[127.9,-0.5],[127.6,0.4],[127.8,1],[127.3,1.3]],[[114.4,-8.1],[115.7,-8.1],[115.5,-8.8],[114.6,-8.7]],[[116.1,-8.4],[118.9,-8.3],[119.1,-8.6],[116.5,-9]],[[119.9,-8.5],[122.7,-8.3],[123.4,-8.4],[122,-8.9],[120.2,-8.8]],[[119,-9.5],[120.6,-9.5],[121,-10.1],[119.3,-9.9]],[[123.4,-9.2],[125,-8.4],[127,-8.4],[124,-10.3]],[[128,-3],[130.8,-3.1],[130.6,-3.5],[128.2,-3.4]],[[126.5,-3.3],[127.4,-3.3],[127.4,-3.8],[126.6,-3.9]],[[123.5,-8.2],[124.5,-8.3],[124.3,-8.6]]];
let gr='';for(let i=94;i<=142;i+=6)gr+=`<line x1="${i}" x2="${i}" y1="-6" y2="11"/>`;for(let j=-10;j<=6;j+=4)gr+=`<line x1="94" x2="142" y1="${-j}" y2="${-j}"/>`;
mp.innerHTML=`<svg id="msvg" role="group" aria-label="Peta Indonesia dengan penanda gunung berapi"><rect x="0" y="-20" width="200" height="60" fill="#0f1114"/><g stroke="#222" stroke-width=".05">${gr}</g><g fill="#2a2320" stroke="#6a5240" stroke-width=".08">${land.map(a=>`<polygon points="${a.map(p=>p[0]+','+(-p[1])).join(' ')}"/>`).join('')}</g><g id="mk"></g></svg>
<div class="mapctl"><button id="zi" aria-label="Perbesar">+</button><button id="zo" aria-label="Perkecil">−</button><button id="zr" aria-label="Kembali ke peta Indonesia" title="Kembali ke peta Indonesia">⟲</button></div><div class="badge" id="badge"></div><div class="maphint" id="hint" role="status"></div>`;
const svg=$('#msvg'),gmk=$('#mk'),hint=$('#hint'),BASE={cx:118,cy:2.5,w:52},WMIN=.6,WMAX=52,NS='http://www.w3.org/2000/svg';
let V={...BASE},sel=null,tok=0,lockUntil=0,wheelOn=false,hintT=0,FMs=new Set(volcanoes.map(v=>v.id));
const thumbOf=v=>v.thumb||v.gambar,medOf=v=>v.medium||v.gambar;
const El=(tag,at)=>{const e=document.createElementNS(NS,tag);for(const k in at)e.setAttribute(k,at[k]);return e};
const nodes={},pool=[],lyr=El('g',{}),cls=El('g',{}),selg=El('g',{id:'selg','class':'hid'});selg.append(El('circle',{'class':'ring',r:12}));gmk.append(lyr,cls,selg);
volcanoes.forEach(v=>{const g=El('g',{'class':'mk','data-id':v.id,tabindex:0,role:'button','aria-label':v.nama+', '+v.provinsi}),t=El('title',{});t.textContent=v.nama;g.append(t,El('circle',{'class':'hit',r:20}),El('circle',{'class':'mglow',r:11}),El('circle',{'class':'dot',r:7}));lyr.append(g);nodes[v.id]=g});
const hid=(n,b)=>{if(n._h!==b){n._h=b;n.classList.toggle('hid',b)}};
function clusterEl(i){if(!pool[i]){const g=El('g',{'class':'mk cl',tabindex:0,role:'button'});g.append(El('title',{}),El('circle',{'class':'hit',r:20}),El('circle',{'class':'dot',r:15}),El('text',{y:4.5,'font-size':14}));cls.append(g);pool[i]=g}return pool[i]}
const clamp=()=>{V.w=Math.min(WMAX,Math.max(WMIN,V.w));V.cx=Math.min(142,Math.max(94,V.cx));V.cy=Math.min(11,Math.max(-6,V.cy))};
const showHint=(t,ms)=>{hint.textContent=t;hint.classList.add('on');clearTimeout(hintT);hintT=setTimeout(()=>hint.classList.remove('on'),ms||1800)};
function draw(){const w=mp.clientWidth,h=mp.clientHeight;if(!w||!h)return;const ppd=w/V.w,vh=V.w*h/w,x0=V.cx-V.w/2,y0=V.cy-vh/2,sc=1/ppd,cs=34,g=new Map();
 svg.setAttribute('viewBox',x0+' '+y0+' '+V.w+' '+vh);
 for(const v of volcanoes){const n=nodes[v.id];if(!FMs.has(v.id)){hid(n,true);continue}const sx=(v.lng-x0)*ppd,sy=(-v.lat-y0)*ppd;if(sx<-60||sy<-60||sx>w+60||sy>h+60){hid(n,true);continue}
  const k=Math.floor(sx/cs)+'_'+Math.floor(sy/cs);let a=g.get(k);if(!a)g.set(k,a=[]);a.push(v)}
 let ci=0;g.forEach(a=>{if(a.length===1){const v=a[0],n=nodes[v.id];hid(n,false);n.setAttribute('transform','translate('+v.lng+' '+(-v.lat)+') scale('+sc+')')}
  else{a.forEach(v=>hid(nodes[v.id],true));const c=clusterEl(ci++),x=a.reduce((p,v)=>p+v.lng,0)/a.length,y=-a.reduce((p,v)=>p+v.lat,0)/a.length,ids=a.map(v=>v.id).join(',');hid(c,false);c.setAttribute('transform','translate('+x+' '+y+') scale('+sc+')');
   if(c._i!==ids){c._i=ids;c.dataset.cl=ids}if(c._n!==a.length){c._n=a.length;c.setAttribute('aria-label','Gugus '+a.length+' gunung, perbesar');c.firstChild.textContent=a.length+' gunung (klik untuk zoom)';c.lastChild.textContent=a.length}}});
 for(;ci<pool.length;ci++)hid(pool[ci],true);
 if(sel&&FMs.has(sel.id)){hid(selg,false);selg.setAttribute('transform','translate('+sel.lng+' '+(-sel.lat)+') scale('+sc+')')}else hid(selg,true)}
function fly(c,d){const my=++tok,S={...V},Tg={cx:Math.min(142,Math.max(94,c.cx)),cy:Math.min(11,Math.max(-6,c.cy)),w:Math.min(WMAX,Math.max(WMIN,c.w))};
 if(reduce||!d){V=Tg;draw();return}const t0=performance.now();(function f(t){if(my!==tok)return;const k=Math.min(1,(t-t0)/(d*1000)),e=k<.5?4*k*k*k:1-Math.pow(-2*k+2,3)/2;V={cx:S.cx+(Tg.cx-S.cx)*e,cy:S.cy+(Tg.cy-S.cy)*e,w:S.w*Math.pow(Tg.w/S.w,e)};draw();if(k<1)requestAnimationFrame(f)})(t0)}
const locked=()=>Date.now()<lockUntil;
function setSel(v){if(sel)nodes[sel.id].classList.remove('sel');sel=v;if(v)nodes[v.id].classList.add('sel')}
function closeDrawer(){dr.classList.remove('open');setSel(null);draw()}
function home(){lockUntil=0;closeDrawer();fly(BASE,1.5)}
function volcanoDetail(id,o){o=o||{};const v=byId(id);
 return `<div class="vd"><img class="vdimg" decoding="async" width="600" height="400" src="${o.modal?medOf(v):thumbOf(v)}"${v.thumb?` data-fb="${v.gambar}"`:''} alt="Foto Gunung ${esc(v.nama)}"><div class="vdt">${o.modal?'':`<h3 class="vdh">${esc(v.nama)}</h3>`}
 <dl><dt>Provinsi</dt><dd>${esc(v.provinsi)}</dd><dt>Lokasi</dt><dd>${esc(v.lokasi)}</dd><dt>Koordinat</dt><dd>${v.lat}, ${v.lng}</dd><dt>Ketinggian</dt><dd>${v.tinggi==null?'Data belum tersedia':fmt(v.tinggi)+' mdpl'}</dd><dt>Tipe</dt><dd>${esc(v.tipe)}</dd><dt>Letusan terakhir</dt><dd>${esc(v.terakhir)}</dd><dt>Sejarah penting / fakta</dt><dd>${esc(v.fakta)}</dd></dl>
 <p class="warnbox">${esc(v.catatan)}</p><p class="dim">Sumber: <a href="${v.sumber}" target="_blank" rel="noopener">Wikipedia – Daftar gunung berapi di Indonesia</a>.</p></div></div>`}
function select(v){if(locked())return;setSel(v);const mob=matchMedia('(max-width:800px)').matches,vh=mp.clientHeight/mp.clientWidth;
 fly({cx:v.lng+(mob?0:190/mp.clientWidth),cy:-v.lat+(mob?.27*vh:0),w:1.0},1.5);lockUntil=reduce?0:Date.now()+1500;
 dr.innerHTML=`<button class="dx" id="dclose" aria-label="Tutup panel"><i class="bi bi-x-lg"></i></button><button class="btn" id="back">← Kembali ke peta Indonesia</button>`+volcanoDetail(v.id);
 dr.classList.add('open');dr.scrollTop=0;$('#back').onclick=home;$('#dclose').onclick=closeDrawer;draw()}
let drag=null,moved=false;
svg.addEventListener('pointerdown',e=>{if(e.pointerType==='touch')return;drag={x:e.clientX,y:e.clientY,cx:V.cx,cy:V.cy};moved=false;tok++;wheelOn=true;hint.classList.remove('on')});
addEventListener('pointermove',e=>{if(!drag)return;const dx=e.clientX-drag.x,dy=e.clientY-drag.y;if(Math.hypot(dx,dy)>12)moved=true;if(!moved)return;const ppd=mp.clientWidth/V.w;V.cx=drag.cx-dx/ppd;V.cy=drag.cy-dy/ppd;clamp();draw()});
addEventListener('pointerup',()=>{drag=null});
svg.addEventListener('dblclick',e=>e.preventDefault());
svg.addEventListener('wheel',e=>{if(!(wheelOn||e.ctrlKey||e.metaKey)){showHint('Klik peta untuk mengaktifkan zoom (atau Ctrl + scroll)');return}e.preventDefault();tok++;V.w*=Math.exp(Math.max(-80,Math.min(80,e.deltaY))*.0025);clamp();draw()},{passive:false});
mp.addEventListener('mouseenter',()=>{if(!wheelOn&&!matchMedia('(pointer:coarse)').matches)showHint('Klik peta untuk mengaktifkan zoom (atau Ctrl + scroll)',2200)});
mp.addEventListener('mouseleave',()=>{wheelOn=false;hint.classList.remove('on')});
let tg=null;const dist=t=>Math.hypot(t[0].clientX-t[1].clientX,t[0].clientY-t[1].clientY),mid=t=>[(t[0].clientX+t[1].clientX)/2,(t[0].clientY+t[1].clientY)/2];
svg.addEventListener('touchstart',e=>{if(e.touches.length===2){if(e.cancelable)e.preventDefault();tok++;const m=mid(e.touches);tg={d:dist(e.touches),mx:m[0],my:m[1],V:{...V}}}},{passive:false});
svg.addEventListener('touchmove',e=>{if(e.touches.length===2&&tg){if(e.cancelable)e.preventDefault();const m=mid(e.touches),ppd=mp.clientWidth/tg.V.w;V.w=tg.V.w*Math.pow(tg.d/dist(e.touches),.8);V.cx=tg.V.cx-(m[0]-tg.mx)/ppd;V.cy=tg.V.cy-(m[1]-tg.my)/ppd;clamp();draw()}else if(e.touches.length===1)showHint('Gunakan dua jari untuk menggeser peta',1500)},{passive:false});
svg.addEventListener('touchend',e=>{if(e.touches.length<2)tg=null});
const act=t=>{const g=t.closest&&t.closest('.mk');if(!g||moved||locked())return;if(g.dataset.id)select(byId(g.dataset.id));else{const a=g.dataset.cl.split(',').map(byId);fly({cx:a.reduce((p,v)=>p+v.lng,0)/a.length,cy:-a.reduce((p,v)=>p+v.lat,0)/a.length,w:V.w/3},1.2)}};
svg.addEventListener('click',e=>act(e.target));svg.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();moved=false;act(e.target)}});
$('#zi').onclick=()=>{tok++;V.w*=.75;clamp();draw()};$('#zo').onclick=()=>{tok++;V.w*=1.33;clamp();draw()};$('#zr').onclick=home;addEventListener('resize',debounce(draw,200));
/* daftar + filter peta: dibangun SEKALI, filter hanya toggle hidden */
$('#mprov').innerHTML=opt(provs,'Semua provinsi');
$('#mlist').innerHTML=volcanoes.map(v=>`<button role="listitem" data-id="${v.id}"><span class="dot2"></span><span><b>${esc(v.nama)}</b><br><small class="dim">${esc(v.provinsi)}</small></span></button>`).join('')+'<p class="dim" id="mnone" hidden>Tidak ada gunung yang cocok.</p>';
const mbtn=$$('#mlist button');
function mapFilter(){const q=$('#mq').value.toLowerCase(),p=$('#mprov').value;FMs=new Set();volcanoes.forEach(v=>{if(match(v,q,p,''))FMs.add(v.id)});mbtn.forEach(b=>{b.hidden=!FMs.has(b.dataset.id)});$('#mnone').hidden=FMs.size>0;
 $('#badge').textContent=FMs.size===volcanoes.length?volcanoes.length+' gunung berapi':FMs.size+' dari '+volcanoes.length+' gunung berapi';draw()}
['mq','mprov'].forEach(i=>$('#'+i).addEventListener('input',mapFilter));
$('#mlist').onclick=e=>{const b=e.target.closest('button');if(b)select(byId(b.dataset.id))};
document.addEventListener('click',e=>{const c=e.target.closest('[data-vid]');if(c){$('#peta').scrollIntoView({behavior:reduce?'auto':'smooth'});lockUntil=0;select(byId(c.dataset.vid))}});
addEventListener('keydown',e=>{if(e.key==='Escape'&&!isOpen()&&dr.classList.contains('open'))closeDrawer()});
$('#offline').textContent=navigator.onLine?'Peta memakai outline lokal (skematis) sehingga tetap tampil tanpa internet.':'Anda sedang offline: peta skematis lokal tetap tampil.';
mapFilter();
/* ---------- 8. Galeri (dibangun sekali) + modal (satu elemen, hanya isi diganti) ---------- */
$('#gprov').innerHTML=opt(provs,'Semua provinsi');$('#gtipe').innerHTML=opt(tipes,'Semua jenis');
const gal=$('#gallery');
gal.innerHTML=volcanoes.map(v=>`<button class="gi" data-id="${v.id}"><img loading="lazy" decoding="async" width="600" height="450" src="${thumbOf(v)}"${v.thumb?` data-fb="${v.gambar}"`:''} alt="Foto Gunung ${esc(v.nama)}, ${esc(v.provinsi)}"><div><b>${esc(v.nama)}</b><small>${esc(v.provinsi)} • ${v.tinggi==null?'tinggi n/a':fmt(v.tinggi)+' mdpl'}</small></div></button>`).join('')+'<p class="dim" id="gnone" hidden>Tidak ada gunung yang cocok.</p>';
const gbt=$$('.gi',gal);let GL=volcanoes.slice();
function applyGal(){const q=$('#gq').value.toLowerCase(),p=$('#gprov').value,t=$('#gtipe').value;GL=[];gbt.forEach((b,i)=>{const ok=match(volcanoes[i],q,p,t);b.hidden=!ok;if(ok)GL.push(volcanoes[i])});$('#gnone').hidden=GL.length>0;$('#gcount').textContent=GL.length+' / '+volcanoes.length}
['gq','gprov','gtipe'].forEach(i=>$('#'+i).addEventListener('input',applyGal));applyGal();
var lb=$('#lb');let LL=[],gi=0,opener=null;
function isOpen(){return lb.classList.contains('open')}
function lbShow(i){gi=(i+LL.length)%LL.length;const v=LL[gi];$('#lbt').textContent=v.nama;$('#lbc').innerHTML=volcanoDetail(v.id,{modal:true});$('#lbc').scrollTop=0;$('#lbp').hidden=$('#lbn').hidden=LL.length<2;
 $('#lbm').onclick=()=>{closeLb(false);$('#peta').scrollIntoView({behavior:reduce?'auto':'smooth'});lockUntil=0;select(byId(v.id))};
 if(LL.length>1)[gi-1,gi+1].forEach(j=>{const n=LL[(j+LL.length)%LL.length],im=new Image();im.decoding='async';im.src=medOf(n)})}
function openLb(id,el,list){opener=el;LL=list||GL;lbShow(Math.max(0,LL.findIndex(v=>v.id===id)));const de=document.documentElement,sw=innerWidth-de.clientWidth;de.style.paddingRight=sw+'px';de.style.overflow='hidden';lb.classList.add('open');lb.setAttribute('aria-hidden','false');$('#lbx').focus({preventScroll:true})}
function closeLb(restore){lb.classList.remove('open');lb.setAttribute('aria-hidden','true');const de=document.documentElement;de.style.overflow='';de.style.paddingRight='';if(restore!==false&&opener&&document.contains(opener))opener.focus({preventScroll:true})}
gal.onclick=e=>{const b=e.target.closest('.gi');if(b)openLb(b.dataset.id,b,GL)};
$('#lbx').onclick=$('#lbclose').onclick=()=>closeLb();$('#lbp').onclick=()=>lbShow(gi-1);$('#lbn').onclick=()=>lbShow(gi+1);lb.addEventListener('click',e=>{if(e.target===lb)closeLb()});
addEventListener('keydown',e=>{if(!isOpen())return;if(e.key==='Escape')closeLb();else if(e.key==='ArrowLeft'&&LL.length>1)lbShow(gi-1);else if(e.key==='ArrowRight'&&LL.length>1)lbShow(gi+1);else if(e.key==='Tab'){const f=$$('button,a[href]',lb).filter(x=>!x.hidden&&x.offsetParent!==null);if(!f.length)return;const i=f.indexOf(document.activeElement);if(e.shiftKey&&i<=0){e.preventDefault();f[f.length-1].focus()}else if(!e.shiftKey&&i===f.length-1){e.preventDefault();f[0].focus()}}});
/* ---------- 9. Pencarian navbar ---------- */
$('#search').oninput=e=>{const q=e.target.value.toLowerCase().trim(),r=$('#results');if(!q){r.hidden=true;return}
 const h=volcanoes.filter(v=>(v.nama+' '+v.provinsi).toLowerCase().includes(q)).slice(0,8);r.innerHTML='';
 h.forEach(v=>{const li=document.createElement('li');li.tabIndex=0;li.innerHTML='<i class="bi bi-triangle-fill"></i> ';li.append(v.nama+' — '+v.provinsi);const go=()=>{lockUntil=0;r.hidden=true;$('#peta').scrollIntoView({behavior:reduce?'auto':'smooth'});select(v)};li.onclick=go;li.onkeydown=ev=>{if(ev.key==='Enter')go()};r.append(li)});r.hidden=!h.length};
})();
