/* ProBrothers replica — interactions */
document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Hero carousel ---------- */
  const slides = [...document.querySelectorAll('.slide')];
  const dotsWrap = document.getElementById('dots');
  let idx = 0, timer;

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
  function prev() { go(idx - 1); }
  function start() { timer = setInterval(next, 6000); }
  function restart() { clearInterval(timer); start(); }

  document.getElementById('nextSlide').addEventListener('click', () => go(idx + 1, true));
  document.getElementById('prevSlide').addEventListener('click', () => go(idx - 1, true));
  start();

  /* ---------- Mobile nav ---------- */
  const burger = document.getElementById('hamburger');
  const nav = document.getElementById('nav');
  burger.addEventListener('click', () => {
    burger.classList.toggle('open');
    nav.classList.toggle('open');
  });
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
    toTop.classList.toggle('show', y > 600);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

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

  /* ---------- Preloader: hide as soon as the hero image is ready ---------- */
  const preloader = document.getElementById('preloader');
  const hidePreloader = () => preloader && preloader.classList.add('done');
  if (reduce) hidePreloader();
  else {
    // Reveal the moment the LCP hero image has painted (don't wait for full load),
    // so the preloader overlay doesn't delay Largest Contentful Paint.
    const heroImg = document.querySelector('.slide.is-active .slide__bg');
    if (heroImg && heroImg.complete) {
      requestAnimationFrame(hidePreloader);
    } else if (heroImg) {
      heroImg.addEventListener('load', () => requestAnimationFrame(hidePreloader), { once: true });
      heroImg.addEventListener('error', hidePreloader, { once: true });
    } else {
      window.addEventListener('load', hidePreloader);
    }
    // safety net: never trap the user behind the loader
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
      let i = 0;
      [...text].forEach(ch => {
        if (ch === ' ') {
          title.appendChild(Object.assign(document.createElement('span'),
            { className: 'char char--space' }));
        } else {
          const s = document.createElement('span');
          s.className = 'char';
          s.textContent = ch;
          s.style.setProperty('--ci', i++);
          title.appendChild(s);
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
    const darkSections = () => [...document.querySelectorAll('.hero, .why, .cta, .marquee, .footer')];
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
