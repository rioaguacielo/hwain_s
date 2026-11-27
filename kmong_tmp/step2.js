const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const base='https://raw.githubusercontent.com/rioaguacielo/hwain_s/main/kmong_tmp/pf/';
const leaf=t=>[...document.querySelectorAll('body *')].filter(e=>e.innerText&&e.innerText.trim()===t&&e.offsetParent!==null);
function setv(el,v){const proto=el.tagName==='TEXTAREA'?HTMLTextAreaElement.prototype:HTMLInputElement.prototype;Object.getOwnPropertyDescriptor(proto,'value').set.call(el,v);el.dispatchEvent(new Event('input',{bubbles:true}));el.dispatchEvent(new Event('change',{bubbles:true}));}
async function file(n){const r=await fetch(base+n); if(!r.ok) throw n+' '+r.status; return new File([await r.blob()],n,{type:'image/jpeg'});}
const log=[];
// main image
const fm=await file(D.id+'_main.jpg');
const orig=HTMLInputElement.prototype.click;
HTMLInputElement.prototype.click=function(){ if(this.type==='file'){const dt=new DataTransfer(); dt.items.add(fm); this.files=dt.files; this.dispatchEvent(new Event('change',{bubbles:true})); return;} return orig.call(this);};
[...document.querySelectorAll('button')].filter(b=>b.innerText.trim()==='추가')[0].click();
await sleep(3500); HTMLInputElement.prototype.click=orig;
const add=[...document.querySelectorAll('button')].find(b=>b.innerText.trim()==='추가하기'); if(add){add.click(); log.push('crop ok');} await sleep(2500);
// detail
const fd=await file(D.id+'_detail.jpg');
const inp=document.querySelector('input[type=file]'); const dt=new DataTransfer(); dt.items.add(fd); inp.files=dt.files; inp.dispatchEvent(new Event('change',{bubbles:true}));
await sleep(4000);
// industry
leaf('업종을 선택해 주세요').pop().click(); await sleep(800);
const op=[...document.querySelectorAll('[role=option]')].find(e=>e.innerText.trim()===D.ind); op.click(); await sleep(600);
setv(document.querySelector('textarea'), D.desc);
setv(document.querySelector('input[placeholder="고객사명을 입력해 주세요"]'), D.client);
if(D.private){ const cb=[...document.querySelectorAll('input[type=checkbox]')].find(c=>{let p=c;for(let k=0;k<3;k++)p=p.parentElement;return p.innerText.includes('비공개')}); if(cb&&!cb.checked){cb.click(); log.push('private');} }
await sleep(500);
const kw=document.querySelector('input[placeholder="키워드를 입력해 주세요"]');
for(const k of D.kw){ kw.focus(); setv(kw,k); await sleep(150); for(const ev of ['keydown','keypress','keyup']) kw.dispatchEvent(new KeyboardEvent(ev,{key:'Enter',code:'Enter',keyCode:13,which:13,bubbles:true})); await sleep(300);}
const t=document.body.innerText;
log.push(t.match(/대표 이미지\s*\((\d)\/1\)/)?.[1], t.match(/상세 이미지\s*\((\d+)\/10\)/)?.[1], t.match(/키워드\s*\((\d)\/5\)/)?.[1], (t.match(/(\d+)\/500/)||[])[1]);
return log;
