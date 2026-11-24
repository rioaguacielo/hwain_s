// 모바일 메뉴
document.querySelector('.menu-btn')?.addEventListener('click', () => {
  document.querySelector('.nav').classList.toggle('open');
});

// 푸터 연도
document.querySelectorAll('[data-year]').forEach(el => el.textContent = new Date().getFullYear());

// 작품 라이트박스 + 작가별 필터 (전시 상세 페이지)
(function () {
  const works = [...document.querySelectorAll('.work')];
  if (!works.length) return;

  // 필터 버튼: 작품의 data-artist 값으로 자동 생성
  const filter = document.querySelector('.filter');
  if (filter) {
    const artists = [...new Set(works.map(w => w.dataset.artist).filter(Boolean))];
    ['전체', ...artists].forEach((name, i) => {
      const b = document.createElement('button');
      b.textContent = name;
      if (i === 0) b.classList.add('on');
      b.onclick = () => {
        filter.querySelectorAll('button').forEach(x => x.classList.remove('on'));
        b.classList.add('on');
        works.forEach(w => w.style.display = (i === 0 || w.dataset.artist === name) ? '' : 'none');
      };
      filter.appendChild(b);
    });
  }

  const lb = document.createElement('div');
  lb.className = 'lightbox';
  lb.innerHTML = `
    <button class="lb-btn lb-close" aria-label="닫기">✕</button>
    <button class="lb-btn lb-prev" aria-label="이전">‹</button>
    <figure><img alt=""><figcaption></figcaption></figure>
    <button class="lb-btn lb-next" aria-label="다음">›</button>`;
  document.body.appendChild(lb);
  const img = lb.querySelector('img'), cap = lb.querySelector('figcaption');
  let idx = 0;
  const visible = () => works.filter(w => w.style.display !== 'none');

  function show(i) {
    const list = visible();
    idx = (i + list.length) % list.length;
    const w = list[idx];
    img.src = w.querySelector('img').src;
    img.alt = w.querySelector('img').alt;
    cap.innerHTML = w.querySelector('.cap').innerHTML;
    lb.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function close() { lb.classList.remove('open'); document.body.style.overflow = ''; }

  works.forEach(w => w.addEventListener('click', () => show(visible().indexOf(w))));
  lb.querySelector('.lb-close').onclick = close;
  lb.querySelector('.lb-prev').onclick = e => { e.stopPropagation(); show(idx - 1); };
  lb.querySelector('.lb-next').onclick = e => { e.stopPropagation(); show(idx + 1); };
  lb.addEventListener('click', e => { if (e.target === lb) close(); });
  document.addEventListener('keydown', e => {
    if (!lb.classList.contains('open')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') show(idx - 1);
    if (e.key === 'ArrowRight') show(idx + 1);
  });
})();
