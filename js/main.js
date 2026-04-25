(() => {
  const header = document.querySelector('.site-header');
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.primary-nav');
  const yearEl = document.getElementById('year');

  if (yearEl) yearEl.textContent = new Date().getFullYear();

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!open));
      toggle.setAttribute('aria-label', open ? 'Open navigation' : 'Close navigation');
      nav.classList.toggle('open', !open);
    });

    nav.querySelectorAll('a').forEach((a) => {
      a.addEventListener('click', () => {
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', 'Open navigation');
        nav.classList.remove('open');
      });
    });
  }

  const onScroll = () => {
    if (!header) return;
    header.classList.toggle('scrolled', window.scrollY > 6);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // Cases tab switcher (自住 / 投资)
  const casePages = document.querySelector('.case-pages');
  const caseTabs = document.querySelectorAll('.case-tab');
  if (casePages && caseTabs.length) {
    caseTabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        const target = tab.dataset.target;
        if (!target) return;
        casePages.dataset.active = target;
        caseTabs.forEach((t) => {
          const active = t === tab;
          t.classList.toggle('is-active', active);
          t.setAttribute('aria-selected', String(active));
        });
      });
    });
  }

  // Image carousel for case cards
  document.querySelectorAll('.case-carousel').forEach((carousel) => {
    const slides = carousel.querySelector('.case-slides');
    if (!slides) return;
    const imgs = slides.children;
    if (imgs.length < 2) return;
    const dots = carousel.querySelectorAll('.carousel-dots span');
    let idx = 0;

    const go = (i) => {
      idx = (i + imgs.length) % imgs.length;
      slides.style.transform = `translateX(-${idx * 100}%)`;
      dots.forEach((d, j) => d.classList.toggle('active', j === idx));
    };

    const prev = carousel.querySelector('.carousel-prev');
    const next = carousel.querySelector('.carousel-next');
    if (prev) prev.addEventListener('click', (e) => { e.preventDefault(); go(idx - 1); });
    if (next) next.addEventListener('click', (e) => { e.preventDefault(); go(idx + 1); });

    let startX = null;
    slides.addEventListener('touchstart', (e) => { startX = e.touches[0].clientX; }, { passive: true });
    slides.addEventListener('touchend', (e) => {
      if (startX === null) return;
      const dx = e.changedTouches[0].clientX - startX;
      if (Math.abs(dx) > 40) go(idx + (dx < 0 ? 1 : -1));
      startX = null;
    });
  });

  if ('IntersectionObserver' in window) {
    const revealables = document.querySelectorAll('.section-head, .card, .steps li, .case-card, .value-item, .hero-card, .about-photo');
    revealables.forEach((el) => el.classList.add('reveal'));
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    revealables.forEach((el) => io.observe(el));
  }
})();
