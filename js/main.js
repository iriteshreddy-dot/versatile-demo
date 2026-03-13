/* ═══════════════════════════════════════
   VERSATILE IT SOLUTIONS — GLOBAL JS
   ═══════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Scroll Reveal ── */
  const rvEls = document.querySelectorAll('.rv');
  if (rvEls.length) {
    const rvIO = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('vis'); rvIO.unobserve(e.target); } });
    }, { threshold: 0.08 });
    rvEls.forEach(el => rvIO.observe(el));
  }

  /* ── Counter Animation ── */
  const counters = document.querySelectorAll('[data-count]');
  if (counters.length) {
    const cIO = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        const el = e.target;
        const target = +el.dataset.count;
        const suffix = el.dataset.suffix || '';
        const duration = 1600;
        const start = performance.now();
        function tick(now) {
          const p = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          el.textContent = Math.floor(eased * target) + suffix;
          if (p < 1) requestAnimationFrame(tick);
          else el.textContent = target + suffix;
        }
        requestAnimationFrame(tick);
        cIO.unobserve(el);
      });
    }, { threshold: 0.3 });
    counters.forEach(el => cIO.observe(el));
  }

  /* ── Navbar scroll ── */
  const navbar = document.getElementById('navbar');
  if (navbar && !navbar.classList.contains('solid')) {
    const onScroll = () => navbar.classList.toggle('scrolled', window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ── Active nav link ── */
  const navLinks = document.querySelectorAll('.nav-link[data-section]');
  const sections = [];
  navLinks.forEach(l => {
    const sec = document.getElementById(l.dataset.section);
    if (sec) sections.push({ el: sec, link: l });
  });
  if (sections.length) {
    const nIO = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          navLinks.forEach(l => l.classList.remove('active'));
          const match = sections.find(s => s.el === e.target);
          if (match) match.link.classList.add('active');
        }
      });
    }, { threshold: 0.25 });
    sections.forEach(s => nIO.observe(s.el));
  }

  /* ── Mobile menu ── */
  const menuBtn = document.getElementById('menuToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      const open = mobileMenu.classList.toggle('open');
      const spans = menuBtn.querySelectorAll('span');
      spans[0].style.transform = open ? 'rotate(45deg) translate(5px,5px)' : 'none';
      spans[1].style.opacity = open ? '0' : '1';
      spans[2].style.transform = open ? 'rotate(-45deg) translate(5px,-5px)' : 'none';
    });
    mobileMenu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        const spans = menuBtn.querySelectorAll('span');
        spans.forEach(s => { s.style.transform = 'none'; s.style.opacity = '1'; });
      });
    });
  }

  /* ── Smooth scroll ── */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href');
      if (id === '#') return;
      const target = document.querySelector(id);
      if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    });
  });

  /* ── Portfolio filter ── */
  const filterBtns = document.querySelectorAll('[data-filter]');
  const filterItems = document.querySelectorAll('[data-category]');
  if (filterBtns.length && filterItems.length) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const cat = btn.dataset.filter;
        filterItems.forEach(item => {
          if (cat === 'all' || item.dataset.category === cat) {
            item.style.display = '';
            item.style.animation = 'fadeIn .4s ease';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  }

  /* ── Client logo grid animation ── */
  const logoItems = document.querySelectorAll('.client-logo-item');
  if (logoItems.length) {
    const lIO = new IntersectionObserver(entries => {
      entries.forEach((e, i) => {
        if (e.isIntersecting) {
          e.target.style.transitionDelay = (i * 0.03) + 's';
          e.target.classList.add('vis');
          lIO.unobserve(e.target);
        }
      });
    }, { threshold: 0.05 });
    logoItems.forEach(el => lIO.observe(el));
  }

});
