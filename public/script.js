/* ProBrothers replica — interactions */
document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Hero carousel (homepage only) ---------- */
  const slides = [...document.querySelectorAll('.slide')];
  const dotsWrap = document.getElementById('dots');
  let idx = 0, timer;

  if (slides.length && dotsWrap) {
    slides.forEach((_, i) => {
      const b = document.createElement('button');
      b.className = 'dot' + (i === 0 ? ' active' : '');
      b.setAttribute('aria-label', 'Slide ' + (i + 1));
      b.addEventListener('click', () => go(i, true));
      dotsWrap.appendChild(b);
    });
    const dots = [...dotsWrap.children];

    function go(n, manual) {
      slides[idx].classList.remove('is-active');
      dots[idx].classList.remove('active');
      idx = (n + slides.length) % slides.length;
      slides[idx].classList.add('is-active');
      dots[idx].classList.add('active');
      if (manual) restart();
    }
    function next() { go(idx + 1); }
    function start() { timer = setInterval(next, 6000); }
    function restart() { clearInterval(timer); start(); }

    const nextBtn = document.getElementById('nextSlide');
    const prevBtn = document.getElementById('prevSlide');
    if (nextBtn) nextBtn.addEventListener('click', () => go(idx + 1, true));
    if (prevBtn) prevBtn.addEventListener('click', () => go(idx - 1, true));
    start();

    /* ---- Touch / swipe support (mobile) ---- */
    const heroEl = document.querySelector('.hero');
    if (heroEl) {
      let sx = 0, sy = 0, dx = 0, dy = 0, tracking = false;
      const THRESHOLD = 40;
      heroEl.addEventListener('touchstart', (e) => {
        if (e.touches.length !== 1) return;
        tracking = true;
        sx = e.touches[0].clientX;
        sy = e.touches[0].clientY;
        dx = dy = 0;
      }, { passive: true });
      heroEl.addEventListener('touchmove', (e) => {
        if (!tracking) return;
        dx = e.touches[0].clientX - sx;
        dy = e.touches[0].clientY - sy;
      }, { passive: true });
      heroEl.addEventListener('touchend', () => {
        if (!tracking) return;
        tracking = false;
        if (Math.abs(dx) > THRESHOLD && Math.abs(dx) > Math.abs(dy)) {
          if (dx < 0) go(idx + 1, true); else go(idx - 1, true);
        }
      });
    }
  }

  /* ---------- Mobile nav ---------- */
  const burger = document.getElementById('hamburger');
  const nav = document.getElementById('nav');
  const navClose = document.getElementById('navClose');
  burger.addEventListener('click', () => {
    burger.classList.toggle('open');
    nav.classList.toggle('open');
  });
  if (navClose) {
    navClose.addEventListener('click', () => {
      burger.classList.remove('open');
      nav.classList.remove('open');
    });
  }
  // submenu toggles + close menu on link tap (mobile)
  nav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', (e) => {
      const parent = a.parentElement;
      if (window.innerWidth <= 900 && parent.classList.contains('has-sub') && a === parent.querySelector(':scope > a')) {
        e.preventDefault();
        parent.classList.toggle('open');
        return;
      }
      if (a.getAttribute('href')?.startsWith('#')) {
        burger.classList.remove('open');
        nav.classList.remove('open');
      }
    });
  });

  /* ---------- Header shrink on scroll ---------- */
  const header = document.getElementById('header');
  const toTop = document.getElementById('toTop');
  const onScroll = () => {
    const y = window.scrollY;
    header.classList.toggle('scrolled', y > 30);
    if (toTop) toTop.classList.toggle('show', y > 600);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  if (toTop) {
    toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  /* ---------- Reveal on scroll ---------- */
  const io = new IntersectionObserver((entries) => {
    entries.forEach(en => {
      if (en.isIntersecting) {
        en.target.classList.add('in');
        // count-up for the years number
        const num = en.target.querySelector?.('.why__num[data-count]');
        if (num) countUp(num);
        io.unobserve(en.target);
      }
    });
  }, { threshold: 0.15 });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  function countUp(el) {
    const target = +el.dataset.count;
    let cur = 0;
    const step = Math.max(1, Math.round(target / 40));
    const tick = () => {
      cur = Math.min(target, cur + step);
      el.firstChild ? (el.childNodes[0].nodeValue = cur) : (el.textContent = cur);
      el.textContent = cur;
      if (cur < target) requestAnimationFrame(tick);
    };
    tick();
  }

  /* =========================================================
     ENHANCED EFFECTS (added)
     ========================================================= */
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Preloader: hide as soon as the LCP image is ready ---------- */
  const preloader = document.getElementById('preloader');
  const hidePreloader = () => preloader && preloader.classList.add('done');
  if (reduce) hidePreloader();
  else {
    // Support both the hero carousel (homepage) and the page-banner (inner pages)
    const lcpImg = document.querySelector('.slide.is-active .slide__bg') ||
                   document.querySelector('.page-banner__bg');
    if (lcpImg && lcpImg.complete) {
      requestAnimationFrame(hidePreloader);
    } else if (lcpImg) {
      lcpImg.addEventListener('load', () => requestAnimationFrame(hidePreloader), { once: true });
      lcpImg.addEventListener('error', hidePreloader, { once: true });
    } else {
      window.addEventListener('load', hidePreloader);
    }
    setTimeout(hidePreloader, 3000);
  }

  /* ---------- Scroll progress bar ---------- */
  const progress = document.getElementById('scrollProgress');
  const h = document.documentElement;
  // Cache the scrollable distance; recompute only on resize/load to avoid a
  // layout read (scrollHeight/clientHeight) inside the scroll handler (forced reflow).
  let maxScroll = h.scrollHeight - h.clientHeight;
  const recalcMaxScroll = () => { maxScroll = h.scrollHeight - h.clientHeight; };
  let progTicking = false;
  const updateProgress = () => {
    progTicking = false;
    const pct = maxScroll > 0 ? (window.scrollY / maxScroll) * 100 : 0;
    if (progress) progress.style.width = pct + '%';
  };
  window.addEventListener('scroll', () => {
    if (!progTicking) { requestAnimationFrame(updateProgress); progTicking = true; }
  }, { passive: true });
  window.addEventListener('resize', recalcMaxScroll, { passive: true });
  window.addEventListener('load', recalcMaxScroll);
  updateProgress();

  if (!reduce) {
    /* ---------- Hero parallax (content drifts as you scroll) ---------- */
    const heroContent = document.querySelector('.hero .slides, .hero');
    const slideContents = document.querySelectorAll('.slide__content');
    let ticking = false;
    const parallax = () => {
      const y = window.scrollY;
      slideContents.forEach(el => { el.style.setProperty('--py', (y * 0.18) + 'px'); });
      ticking = false;
    };
    window.addEventListener('scroll', () => {
      if (!ticking) { requestAnimationFrame(parallax); ticking = true; }
    }, { passive: true });

    /* ---------- 3D tilt on project tiles ---------- */
    const MAX = 8; // degrees
    document.querySelectorAll('[data-tilt]').forEach(el => {
      let rect;
      const enter = () => { rect = el.getBoundingClientRect(); el.classList.add('tilting'); };
      const move = (e) => {
        if (!rect) rect = el.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width;   // 0..1
        const py = (e.clientY - rect.top) / rect.height;   // 0..1
        const rx = (0.5 - py) * MAX * 2;
        const ry = (px - 0.5) * MAX * 2;
        el.style.transform =
          `perspective(800px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) translateZ(6px)`;
        el.style.setProperty('--mx', (px * 100) + '%');
        el.style.setProperty('--my', (py * 100) + '%');
      };
      const leave = () => { el.classList.remove('tilting'); el.style.transform = ''; };
      el.addEventListener('pointerenter', enter);
      el.addEventListener('pointermove', move);
      el.addEventListener('pointerleave', leave);
    });

    /* ---------- Magnetic buttons ---------- */
    document.querySelectorAll('[data-magnetic]').forEach(btn => {
      const strength = 0.35;
      btn.addEventListener('pointermove', (e) => {
        const r = btn.getBoundingClientRect();
        const x = e.clientX - r.left - r.width / 2;
        const y = e.clientY - r.top - r.height / 2;
        btn.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
      });
      btn.addEventListener('pointerleave', () => { btn.style.transform = ''; });
    });
  }

  /* =========================================================
     SPECIAL EFFECTS v2
     ========================================================= */

  /* ---------- Split hero titles into letters ---------- */
  (function splitHeroTitles() {
    const hero = document.querySelector('.hero');
    const titles = document.querySelectorAll('.slide__title');
    if (!hero || !titles.length) return;
    titles.forEach(title => {
      const text = title.textContent;
      title.textContent = '';
      const words = text.split(' ');
      let i = 0;
      words.forEach((word, wIdx) => {
        const wordEl = document.createElement('span');
        wordEl.className = 'word';
        [...word].forEach(ch => {
          if (ch === ' ') {
            wordEl.appendChild(Object.assign(document.createElement('span'),
              { className: 'char char--space' }));
            return;
          }
          const s = document.createElement('span');
          s.className = 'char';
          s.textContent = ch;
          s.style.setProperty('--ci', i++);
          wordEl.appendChild(s);
        });
        title.appendChild(wordEl);
        if (wIdx < words.length - 1) {
          title.appendChild(Object.assign(document.createElement('span'),
            { className: 'char char--space' }));
        }
      });
    });
    hero.classList.add('split-ready');
  })();

  /* ---------- Blueprint line-draw under each section title ---------- */
  (function blueprints() {
    const svgNS = 'http://www.w3.org/2000/svg';
    document.querySelectorAll('.section__title').forEach(title => {
      const svg = document.createElementNS(svgNS, 'svg');
      svg.setAttribute('class', 'blueprint');
      svg.setAttribute('viewBox', '0 0 160 24');
      svg.setAttribute('aria-hidden', 'true');
      // a small "blueprint" motif: line + diamond node in the middle
      const path = document.createElementNS(svgNS, 'path');
      path.setAttribute('d', 'M2 12 H64 L74 4 L84 20 L94 12 H158');
      const len = 220;
      path.style.setProperty('--len', len);
      svg.appendChild(path);
      title.insertAdjacentElement('afterend', svg);
    });
  })();

  /* ---------- Cursor glow over dark sections ---------- */
  if (!reduce && window.matchMedia('(pointer:fine)').matches) {
    const glow = document.createElement('div');
    glow.className = 'glow-cursor';
    document.body.appendChild(glow);
    const darkSections = () => [...document.querySelectorAll('.hero, .page-banner, .why, .cta, .marquee, .footer')];
    let zones = darkSections();
    window.addEventListener('resize', () => { zones = darkSections(); }, { passive: true });
    let gx = 0, gy = 0, raf = false;
    const draw = () => { glow.style.transform = `translate(${gx}px, ${gy}px)`; raf = false; };
    window.addEventListener('pointermove', (e) => {
      gx = e.clientX; gy = e.clientY;
      const over = zones.some(z => {
        const r = z.getBoundingClientRect();
        return e.clientY >= r.top && e.clientY <= r.bottom;
      });
      glow.classList.toggle('show', over);
      if (!raf) { requestAnimationFrame(draw); raf = true; }
    }, { passive: true });
    window.addEventListener('pointerleave', () => glow.classList.remove('show'));
  }

  /* ---------- Page banner particles (about page) ---------- */
  (function bannerParticles() {
    const canvas = document.getElementById('bannerParticles');
    if (!canvas || reduce) return;
    const ctx = canvas.getContext('2d');
    const banner = canvas.parentElement;
    let w, h, parts = [], anim;
    const COUNT = 36;
    function size() { w = canvas.width = banner.offsetWidth; h = canvas.height = banner.offsetHeight; }
    function make() {
      parts = Array.from({ length: COUNT }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        r: Math.random() * 1.8 + 0.4,
        vx: (Math.random() - 0.5) * 0.22,
        vy: -(Math.random() * 0.35 + 0.08),
        a: Math.random() * 0.45 + 0.1
      }));
    }
    function tick() {
      ctx.clearRect(0, 0, w, h);
      parts.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.y < -5) { p.y = h + 5; p.x = Math.random() * w; }
        if (p.x < -5) p.x = w + 5; if (p.x > w + 5) p.x = -5;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,145,222,${p.a})`;
        ctx.fill();
      });
      anim = requestAnimationFrame(tick);
    }
    size(); make(); tick();
    window.addEventListener('resize', () => { size(); make(); }, { passive: true });
    new IntersectionObserver(es => {
      es.forEach(e => {
        if (e.isIntersecting) { if (!anim) tick(); }
        else { cancelAnimationFrame(anim); anim = null; }
      });
    }, { threshold: 0 }).observe(banner);
  })();

  /* ---------- Hero particles (floating gold flecks) ---------- */
  (function particles() {
    const canvas = document.getElementById('heroParticles');
    if (!canvas || reduce) return;
    const ctx = canvas.getContext('2d');
    const hero = canvas.parentElement;
    let w, h, parts = [], anim;
    const COUNT = 46;
    function size() {
      w = canvas.width = hero.offsetWidth;
      h = canvas.height = hero.offsetHeight;
    }
    function make() {
      parts = Array.from({ length: COUNT }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        r: Math.random() * 2 + 0.6,
        vx: (Math.random() - 0.5) * 0.25,
        vy: -(Math.random() * 0.4 + 0.1),
        a: Math.random() * 0.5 + 0.15
      }));
    }
    function tick() {
      ctx.clearRect(0, 0, w, h);
      parts.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.y < -5) { p.y = h + 5; p.x = Math.random() * w; }
        if (p.x < -5) p.x = w + 5; if (p.x > w + 5) p.x = -5;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(244,188,22,${p.a})`;
        ctx.fill();
      });
      anim = requestAnimationFrame(tick);
    }
    size(); make(); tick();
    window.addEventListener('resize', () => { size(); make(); }, { passive: true });
    // pause when hero scrolled out of view (saves battery)
    new IntersectionObserver(es => {
      es.forEach(e => {
        if (e.isIntersecting) { if (!anim) tick(); }
        else { cancelAnimationFrame(anim); anim = null; }
      });
    }, { threshold: 0 }).observe(hero);
  })();

  /* ---------- Contact form validation & submit ---------- */
  document.querySelectorAll('.contact-form').forEach(initContactForm);
  function initContactForm(form) {
    if (!form) return;
    const success = form.querySelector('.contact-form__success');

    function validate(field) {
      const group = field.closest('.contact-form__group');
      if (!group) return true;
      const err = group.querySelector('.contact-form__error');
      const wrap = group.querySelector('.contact-form__input-wrap');
      const input = wrap ? wrap.querySelector('input,textarea') : null;
      if (!input) return true;

      let msg = '';
      if (input.required && !input.value.trim()) {
        msg = 'This field is required.';
      } else if (input.type === 'email' && input.value.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value.trim())) {
        msg = 'Please enter a valid email address.';
      }

      if (msg) {
        input.classList.add('invalid');
        if (err) { err.textContent = msg; err.classList.add('show'); }
        return false;
      } else {
        input.classList.remove('invalid');
        if (err) { err.textContent = ''; err.classList.remove('show'); }
        return true;
      }
    }

    // live validation on blur
    form.querySelectorAll('input,textarea').forEach(input => {
      input.addEventListener('blur', () => validate(input));
      input.addEventListener('input', () => {
        if (input.classList.contains('invalid')) validate(input);
      });
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const fields = [...form.querySelectorAll('input[required],textarea[required]')];
      const allValid = fields.every(f => validate(f));
      if (!allValid) {
        const firstInvalid = form.querySelector('.invalid');
        if (firstInvalid) firstInvalid.focus();
        return;
      }
      // Simulate submit (replace with real endpoint as needed)
      const btn = form.querySelector('.contact-form__submit');
      btn.disabled = true;
      btn.textContent = 'Sending…';
      setTimeout(() => {
        form.reset();
        btn.disabled = false;
        btn.textContent = 'Submit';
        if (success) { success.removeAttribute('hidden'); success.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); }
        // hide success after 8s
        setTimeout(() => { if (success) success.setAttribute('hidden', ''); }, 8000);
      }, 900);
    });
  }

  /* ---------- Reviews slider ---------- */
  (function reviewsSlider() {
    const slider = document.getElementById('reviewsSlider');
    if (!slider) return;
    const track = document.getElementById('reviewsTrack');
    const items = [...track.children];
    const prev = document.getElementById('reviewsPrev');
    const next = document.getElementById('reviewsNext');
    const dotsWrap = document.getElementById('reviewsDots');
    if (!items.length) return;

    let perView = 3;
    let index = 0;
    let auto;

    function computePerView() {
      const w = window.innerWidth;
      if (w <= 700) perView = 1;
      else if (w <= 1024) perView = 2;
      else perView = 3;
    }
    function maxIndex() { return Math.max(0, items.length - perView); }
    function update() {
      const itemWidth = items[0].getBoundingClientRect().width;
      const gap = parseFloat(getComputedStyle(track).gap) || 0;
      track.style.transform = `translateX(-${index * (itemWidth + gap)}px)`;
      [...dotsWrap.children].forEach((d, i) => d.classList.toggle('active', i === index));
    }
    function buildDots() {
      dotsWrap.innerHTML = '';
      const count = maxIndex() + 1;
      for (let i = 0; i < count; i++) {
        const b = document.createElement('button');
        b.type = 'button';
        b.className = 'reviews-slider__dot' + (i === 0 ? ' active' : '');
        b.setAttribute('aria-label', 'Go to testimonial group ' + (i + 1));
        b.addEventListener('click', () => { index = i; update(); restart(); });
        dotsWrap.appendChild(b);
      }
    }
    function go(n) {
      const m = maxIndex();
      if (n < 0) index = m;
      else if (n > m) index = 0;
      else index = n;
      update();
    }
    function start() { auto = setInterval(() => go(index + 1), 7000); }
    function restart() { clearInterval(auto); start(); }

    function resize() {
      computePerView();
      if (index > maxIndex()) index = maxIndex();
      buildDots();
      update();
    }

    prev.addEventListener('click', () => { go(index - 1); restart(); });
    next.addEventListener('click', () => { go(index + 1); restart(); });

    /* swipe */
    let sx = 0, dx = 0, tracking = false;
    track.addEventListener('touchstart', (e) => {
      if (e.touches.length !== 1) return;
      tracking = true; sx = e.touches[0].clientX; dx = 0;
    }, { passive: true });
    track.addEventListener('touchmove', (e) => {
      if (tracking) dx = e.touches[0].clientX - sx;
    }, { passive: true });
    track.addEventListener('touchend', () => {
      if (!tracking) return;
      tracking = false;
      if (Math.abs(dx) > 40) {
        if (dx < 0) go(index + 1); else go(index - 1);
        restart();
      }
    });

    window.addEventListener('resize', resize, { passive: true });
    resize();
    start();
  })();

  /* ---------- Before / After wiper ---------- */
  (function beforeAfter() {
    const frame = document.getElementById('baFrame');
    const before = document.getElementById('baBefore');
    const handle = document.getElementById('baHandle');
    if (!frame || !before || !handle) return;

    function setFrameWidth() {
      const fw = frame.clientWidth;
      const img = before.querySelector('.ba__img');
      if (img) img.style.setProperty('--fw', fw + 'px');
    }
    function setPct(pct) {
      pct = Math.max(0, Math.min(100, pct));
      before.style.width = pct + '%';
      handle.style.left = pct + '%';
      handle.setAttribute('aria-valuenow', Math.round(pct));
    }
    function fromClientX(clientX) {
      const r = frame.getBoundingClientRect();
      setPct(((clientX - r.left) / r.width) * 100);
    }

    let dragging = false;
    const start = (e) => { dragging = true; fromClientX((e.touches ? e.touches[0] : e).clientX); };
    const move = (e) => { if (dragging) fromClientX((e.touches ? e.touches[0] : e).clientX); };
    const end = () => { dragging = false; };

    frame.addEventListener('pointerdown', start);
    window.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('pointerup', end);
    // keyboard
    handle.addEventListener('keydown', (e) => {
      const cur = +handle.getAttribute('aria-valuenow');
      if (e.key === 'ArrowLeft') { setPct(cur - 4); e.preventDefault(); }
      if (e.key === 'ArrowRight') { setPct(cur + 4); e.preventDefault(); }
    });
    window.addEventListener('resize', setFrameWidth, { passive: true });
    setFrameWidth(); setPct(50);
  })();
});

/* ============================================================
   Lightbox — fluid, modern image enlargement for project pages
   ============================================================ */
(function lightbox(){
  if (!document.querySelector('.gallery__item, .proj-feature__media[data-lightbox]')) return;

  // Build lightbox DOM once
  const lb = document.createElement('div');
  lb.className = 'lightbox';
  lb.setAttribute('role', 'dialog');
  lb.setAttribute('aria-modal', 'true');
  lb.setAttribute('aria-label', 'Image viewer');
  lb.innerHTML = `
    <div class="lightbox__counter" aria-live="polite"></div>
    <button class="lightbox__btn lightbox__close" type="button" aria-label="Close image viewer">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
    </button>
    <div class="lightbox__stage">
      <button class="lightbox__btn lightbox__nav lightbox__prev" type="button" aria-label="Previous image">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
      </button>
      <img class="lightbox__img" alt="" />
      <button class="lightbox__btn lightbox__nav lightbox__next" type="button" aria-label="Next image">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
      </button>
    </div>
    <div class="lightbox__caption" aria-live="polite"></div>
  `;
  document.body.appendChild(lb);

  const imgEl = lb.querySelector('.lightbox__img');
  const capEl = lb.querySelector('.lightbox__caption');
  const cntEl = lb.querySelector('.lightbox__counter');
  const btnClose = lb.querySelector('.lightbox__close');
  const btnPrev = lb.querySelector('.lightbox__prev');
  const btnNext = lb.querySelector('.lightbox__next');

  let group = [];
  let idx = 0;
  let lastFocused = null;

  function buildGroup(trigger){
    const g = trigger.getAttribute('data-gallery');
    if (g) {
      group = Array.from(document.querySelectorAll(`[data-gallery="${g}"]`));
    } else {
      group = [trigger];
    }
    idx = group.indexOf(trigger);
  }

  function show(i){
    if (i < 0) i = group.length - 1;
    if (i >= group.length) i = 0;
    idx = i;
    const trigger = group[idx];
    const src = trigger.getAttribute('data-full') || trigger.querySelector('img')?.src;
    const cap = trigger.getAttribute('data-caption') || trigger.querySelector('img')?.alt || '';
    imgEl.classList.remove('ready');
    capEl.classList.remove('ready');
    const tmp = new Image();
    tmp.onload = () => {
      imgEl.src = src;
      imgEl.alt = cap;
      requestAnimationFrame(() => {
        imgEl.classList.add('ready');
        capEl.classList.add('ready');
      });
    };
    tmp.src = src;
    capEl.textContent = cap;
    cntEl.textContent = group.length > 1 ? `${idx + 1} / ${group.length}` : '';
    btnPrev.style.display = group.length > 1 ? '' : 'none';
    btnNext.style.display = group.length > 1 ? '' : 'none';
  }

  function open(trigger){
    lastFocused = document.activeElement;
    buildGroup(trigger);
    document.body.classList.add('modal-open');
    lb.classList.add('open');
    show(idx);
    btnClose.focus();
  }

  function close(){
    lb.classList.remove('open');
    document.body.classList.remove('modal-open');
    setTimeout(() => { imgEl.src = ''; imgEl.classList.remove('ready'); }, 400);
    if (lastFocused) lastFocused.focus();
  }

  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('.gallery__item, .proj-feature__media[data-lightbox]');
    if (trigger) { e.preventDefault(); open(trigger); }
  });

  btnClose.addEventListener('click', close);
  btnPrev.addEventListener('click', () => show(idx - 1));
  btnNext.addEventListener('click', () => show(idx + 1));
  imgEl.addEventListener('click', close);
  lb.addEventListener('click', (e) => { if (e.target === lb || e.target.classList.contains('lightbox__stage')) close(); });

  document.addEventListener('keydown', (e) => {
    if (!lb.classList.contains('open')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft' && group.length > 1) show(idx - 1);
    if (e.key === 'ArrowRight' && group.length > 1) show(idx + 1);
  });

  // Basic swipe for touch
  let touchX = null;
  lb.addEventListener('touchstart', (e) => { touchX = e.touches[0].clientX; }, { passive: true });
  lb.addEventListener('touchend', (e) => {
    if (touchX === null || group.length < 2) return;
    const dx = e.changedTouches[0].clientX - touchX;
    if (Math.abs(dx) > 50) show(idx + (dx < 0 ? 1 : -1));
    touchX = null;
  });
})();
