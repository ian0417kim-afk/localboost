/* ============================================================
   렌더러 + 핸들러 — 이 파일은 수정하지 않아도 됩니다.
   콘텐츠 수정은 js/data.js 에서만 하세요.
   ============================================================ */

// 이미지 파일명을 실제 경로로 변환
const IMG_BASE = 'assets/images/';

/* ── 서비스 카드 자동 생성 ── */
(function renderServices() {
  const grid = document.getElementById('servicesGrid');
  if (!grid) return;

  SERVICES.forEach((s, i) => {
    const card = document.createElement('div');
    card.className = 'service reveal';
    if (i % 3 === 1) card.classList.add('reveal-delay-1');
    if (i % 3 === 2) card.classList.add('reveal-delay-2');

    card.innerHTML = `
      <div class="service-num">${s.no}</div>
      <h3 class="service-title">${s.title}</h3>
      <p class="service-desc">${s.desc}</p>
      <div class="service-tags">
        ${s.tags.map(t => `<span class="service-tag">${t}</span>`).join('')}
      </div>
    `;
    grid.appendChild(card);
  });

  // 마지막 행의 하단 보더 정리 (시각적 정돈)
  // CSS만으로 처리하기 까다로워서 마지막 카드들의 하단 라인 제거
  const cards = grid.querySelectorAll('.service');
  const total = cards.length;
  // 화면 폭에 따라 컬럼 수가 달라지므로 일단 마지막 카드만 처리
  if (cards[total - 1]) cards[total - 1].style.borderBottom = 'none';
})();

/* ── Hero 슬라이드쇼 ── */
(function initShowcase() {
  const frame   = document.getElementById('showcaseFrame');
  const counter = document.getElementById('showcaseCounter');
  const prev    = document.getElementById('showcasePrev');
  const next    = document.getElementById('showcaseNext');
  if (!frame) return;

  let current = 0;
  const total = WORKS.length;
  let timer;

  // 슬라이드 생성
  WORKS.forEach((w, i) => {
    const slide = document.createElement('div');
    slide.className = 'showcase-slide' + (i === 0 ? ' active' : '');

    // 메타 (태그 + 상태)
    // status가 '제작중'이면 상태 라벨 숨김 (태그만 표시)
    const meta = document.createElement('div');
    meta.className = 'showcase-meta';
    const statusHTML = (w.status && w.status !== '제작중')
      ? `<div class="showcase-status">${w.status}</div>`
      : '<div></div>';
    meta.innerHTML = `
      <div class="showcase-tag">${w.tag}</div>
      ${statusHTML}
    `;
    slide.appendChild(meta);

    // 이미지 또는 폴백
    if (w.img) {
      const img = document.createElement('img');
      img.src = IMG_BASE + w.img;
      img.alt = w.name;
      img.loading = 'lazy';
      img.addEventListener('error', () => {
        img.remove();
        const fb = document.createElement('div');
        fb.className = 'showcase-fallback';
        fb.textContent = w.name;
        slide.insertBefore(fb, slide.firstChild);
      });
      slide.appendChild(img);
    } else {
      const fb = document.createElement('div');
      fb.className = 'showcase-fallback';
      fb.textContent = w.name;
      slide.appendChild(fb);
    }

    // 캡션
    const cap = document.createElement('div');
    cap.className = 'showcase-caption';
    cap.innerHTML = `
      <div class="showcase-caption-name">${w.name}</div>
      <div class="showcase-caption-loc">${w.location}</div>
      <a class="showcase-caption-link" href="${w.url}" target="_blank" rel="noopener">
        전단지 보기 <span>→</span>
      </a>
    `;
    slide.appendChild(cap);

    frame.appendChild(slide);
  });

  function updateCounter() {
    if (counter) {
      counter.innerHTML = `<strong>${String(current + 1).padStart(2, '0')}</strong> &nbsp;/&nbsp; ${String(total).padStart(2, '0')}`;
    }
  }

  function goTo(idx) {
    const slides = frame.querySelectorAll('.showcase-slide');
    slides[current].classList.remove('active');
    current = (idx + total) % total;
    slides[current].classList.add('active');
    updateCounter();
    clearInterval(timer);
    timer = setInterval(() => goTo(current + 1), 4500);
  }

  updateCounter();
  timer = setInterval(() => goTo(current + 1), 4500);

  if (prev) prev.addEventListener('click', () => goTo(current - 1));
  if (next) next.addEventListener('click', () => goTo(current + 1));
})();

/* ── 갤러리 카드 자동 생성 ── */
(function renderGallery() {
  const track = document.getElementById('galleryTrack');
  if (!track) return;

  WORKS.forEach((w) => {
    const card = document.createElement('div');
    card.className = 'gallery-card reveal';

    let thumbHTML = '';
    if (w.img) {
      thumbHTML = `
        <img src="${IMG_BASE}${w.img}" alt="${w.name}" loading="lazy"
             onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">
        <div class="gallery-thumb-fallback" style="display:none;">${w.name}</div>
      `;
    } else {
      thumbHTML = `<div class="gallery-thumb-fallback">${w.name}</div>`;
    }

    // status가 '제작중'이면 상태 라벨 숨김 (태그만 표시)
    const galleryStatus = (w.status && w.status !== '제작중')
      ? `<div class="gallery-status">${w.status}</div>`
      : '';

    card.innerHTML = `
      <div class="gallery-thumb">
        ${thumbHTML}
        <div class="gallery-meta">
          <div class="gallery-tag">${w.tag}</div>
          ${galleryStatus}
        </div>
      </div>
      <div class="gallery-body">
        <div class="gallery-client">${w.client} · ${w.location}</div>
        <div class="gallery-name">${w.name}</div>
        <div class="gallery-desc">${w.desc}</div>
        <a class="gallery-link" href="${w.url}" target="_blank" rel="noopener">
          전단지 보기 <span>→</span>
        </a>
      </div>
    `;
    track.appendChild(card);
  });

  // 좌우 네비게이션
  const prev = document.getElementById('galleryPrev');
  const next = document.getElementById('galleryNext');
  if (prev && next) {
    const cardWidth = 320 + 24; // card width + gap
    next.addEventListener('click', () => track.scrollBy({ left: cardWidth * 2, behavior: 'smooth' }));
    prev.addEventListener('click', () => track.scrollBy({ left: -cardWidth * 2, behavior: 'smooth' }));
  }
})();

/* ── 스크롤 시 네비 보더 추가 ── */
(function navScroll() {
  const nav = document.getElementById('nav');
  if (!nav) return;
  const onScroll = () => {
    if (window.scrollY > 24) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

/* ── 스크롤 reveal ── */
const obs = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

// 초기 렌더된 reveal 등록
document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
// 동적으로 추가된 카드들도 등록
setTimeout(() => {
  document.querySelectorAll('.reveal:not(.visible)').forEach(el => obs.observe(el));
}, 100);

/* ── 하단 고정 바 QR ── */
window.addEventListener('load', () => {
  try {
    new QRCode(document.getElementById('dockQr'), {
      text: 'https://ian0417kim-afk.github.io/localboost/',
      width: 40, height: 40,
      colorDark: '#0F1B2E',
      colorLight: '#FAF8F4',
      correctLevel: QRCode.CorrectLevel.M
    });
  } catch (e) { console.warn('QR 생성 실패:', e); }
});

/* ── 상담 폼 제출 ── */
document.getElementById('contactForm').addEventListener('submit', async function(e) {
  e.preventDefault();
  const name  = document.getElementById('f-name').value.trim();
  const phone = document.getElementById('f-phone').value.trim();
  if (!name || !phone) { showToast('성함과 연락처를 입력해 주세요'); return; }

  const btn = this.querySelector('.submit');
  const originalHTML = btn.innerHTML;
  btn.innerHTML = '전송 중...';
  btn.disabled = true;

  try {
    const res = await fetch(this.action, {
      method: 'POST',
      body: new FormData(this),
      headers: { 'Accept': 'application/json' }
    });
    if (res.ok) {
      showToast(name + '님, 곧 연락드리겠습니다');
      this.reset();
    } else {
      showToast('전송이 어렵습니다. 전화나 카카오톡으로 연락 주세요');
    }
  } catch (err) {
    showToast('네트워크 오류. 전화나 카카오톡으로 연락 주세요');
  }
  btn.innerHTML = originalHTML;
  btn.disabled = false;
});

/* ── 토스트 ── */
let toastTimer;
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 3200);
}
