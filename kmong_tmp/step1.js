const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const leaf=t=>[...document.querySelectorAll('body *')].filter(e=>e.innerText&&e.innerText.trim()===t&&e.offsetParent!==null);
function setv(el,v){const proto=el.tagName==='TEXTAREA'?HTMLTextAreaElement.prototype:HTMLInputElement.prototype;Object.getOwnPropertyDescriptor(proto,'value').set.call(el,v);el.dispatchEvent(new Event('input',{bubbles:true}));el.dispatchEvent(new Event('change',{bubbles:true}));}
await sleep(1500);
leaf('1차 카테고리')[0].click(); await sleep(600);
let o=leaf(D.cat1); o[o.length-1].click(); await sleep(800);
leaf('2차 카테고리').pop().click(); await sleep(800);
const opts=[...document.querySelectorAll('body *')].filter(e=>e.childElementCount===0&&e.offsetParent!==null);
let c2=D.cat2==='web'? null : opts.filter(e=>e.textContent.trim()===D.cat2).pop();
if(!c2){ return {need:'cat2', list: [...new Set(opts.map(e=>e.textContent.trim()))].filter(s=>s.length<20).slice(0,80)}; }
c2.click(); await sleep(600);
setv(document.querySelector('input[placeholder="포트폴리오 제목을 입력해 주세요"]'), D.title); await sleep(400);
[...document.querySelectorAll('button')].find(b=>b.innerText.trim()==='다음').click(); await sleep(2500);
return {ok:true, page: document.body.innerText.slice(0,40)};
