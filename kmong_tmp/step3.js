const sleep=ms=>new Promise(r=>setTimeout(r,ms));
[...document.querySelectorAll('button')].filter(b=>b.innerText.trim()==='다음').pop().click(); await sleep(2500);
const cards=[...document.querySelectorAll('button')].filter(b=>/원~/.test(b.innerText));
if(cards[0]) {cards[0].click(); await sleep(600);}
const cb=document.querySelector('input[type=checkbox]'); 
return {page:document.body.innerText.slice(0,30), cards:cards.map(c=>c.innerText.split('\n').slice(0,3).join('/')), checked:cb?.checked};
