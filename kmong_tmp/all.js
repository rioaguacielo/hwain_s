const sleep=ms=>new Promise(r=>setTimeout(r,ms));
function setv(el,v){Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,'value').set.call(el,v);el.dispatchEvent(new Event('input',{bubbles:true}));}
const c2=[...document.querySelectorAll('body *')].filter(e=>e.childElementCount===0&&e.offsetParent!==null&&e.textContent.trim()===D.cat2).pop();
if(!c2) return 'no cat2';
c2.click(); await sleep(700);
const sel=document.body.innerText; if(!sel.includes(D.cat2)) return 'cat2 not set';
setv(document.querySelector('input[placeholder="포트폴리오 제목을 입력해 주세요"]'), D.title); await sleep(400);
[...document.querySelectorAll('button')].find(b=>b.innerText.trim()==='다음').click(); await sleep(2500);
const src=await (await fetch(B+'step2.js')).text(); const AF=Object.getPrototypeOf(async function(){}).constructor;
const r2=await new AF('D',src)(D);
const t=document.body.innerText; const i=t.indexOf('미리보기'); const prev=t.slice(i,i+160).replace(/\n+/g,'|');
if(!(r2[1]==='1'&&r2[2]==='1'&&r2[3]==='5'&&prev.includes(D.ind))) return {stop:true,r2,prev};
[...document.querySelectorAll('button')].filter(b=>b.innerText.trim()==='다음').pop().click(); await sleep(2500);
const cards=[...document.querySelectorAll('button')].filter(b=>/원~/.test(b.innerText)); if(cards[0]){cards[0].click(); await sleep(600);}
const cb=document.querySelector('input[type=checkbox]'); if(cb&&!cb.checked){cb.click(); await sleep(500);}
if(!cb||!cb.checked) return {stop:'agree'};
[...document.querySelectorAll('button')].find(b=>b.innerText.trim()==='제출하기').click(); await sleep(3000);
return {done:location.pathname, n:(document.body.innerText.match(/총 \d+개/)||[''])[0], cards:cards.length, r2};
