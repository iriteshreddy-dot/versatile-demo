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

  /* ── Card Nav ── */
  const cardNav = document.getElementById('cardNav');
  const cardNavToggle = document.getElementById('cardNavToggle');
  const navBackdrop = document.getElementById('navBackdrop');
  if (cardNav && cardNavToggle) {
    function closeNav() {
      cardNav.classList.remove('open');
      cardNavToggle.classList.remove('open');
      if (navBackdrop) navBackdrop.classList.remove('active');
    }
    cardNavToggle.addEventListener('click', () => {
      const opening = cardNav.classList.toggle('open');
      cardNavToggle.classList.toggle('open');
      if (navBackdrop) navBackdrop.classList.toggle('active', opening);
    });
    cardNav.querySelectorAll('.nav-card-link').forEach(a => {
      a.addEventListener('click', closeNav);
    });
    if (navBackdrop) navBackdrop.addEventListener('click', closeNav);
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

  /* ── Decrypt Text Effect (rotating phrases) ── */
  document.querySelectorAll('.nav-decrypt-text').forEach(el => {
    const phrases = [
      'Empowering Global Digital Transformation',
      'Driving Business Through Technology',
      'Empowering Businesses with Technology',
      'Innovating Global Business Growth',
      'Technology-Driven Business Empowerment'
    ];
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+';
    const speed = 40;
    const holdTime = 4000;
    let phraseIdx = Math.floor(Math.random() * phrases.length);

    function animatePhrase(text, onDone) {
      var len = text.length;
      var revealed = 0;
      // scramble phase
      function scramble() {
        var out = '';
        for (var i = 0; i < len; i++) {
          if (text[i] === ' ') { out += ' '; continue; }
          if (i < revealed) out += '<span>' + text[i] + '</span>';
          else out += '<span class="encrypted">' + chars[Math.floor(Math.random() * chars.length)] + '</span>';
        }
        el.innerHTML = out;
      }
      scramble();
      var iv = setInterval(function() {
        while (revealed < len && text[revealed] === ' ') revealed++;
        if (revealed >= len) { clearInterval(iv); el.textContent = text; if (onDone) onDone(); return; }
        revealed++;
        scramble();
      }, speed);
    }

    function scrambleOut(text, onDone) {
      var len = text.length;
      var remaining = len;
      var iv = setInterval(function() {
        remaining -= 2;
        if (remaining <= 0) { clearInterval(iv); el.innerHTML = ''; if (onDone) onDone(); return; }
        var out = '';
        for (var i = 0; i < len; i++) {
          if (text[i] === ' ') { out += ' '; continue; }
          if (i < remaining) out += '<span>' + text[i] + '</span>';
          else out += '<span class="encrypted">' + chars[Math.floor(Math.random() * chars.length)] + '</span>';
        }
        el.innerHTML = out;
      }, speed);
    }

    function cycle() {
      var text = phrases[phraseIdx];
      animatePhrase(text, function() {
        setTimeout(function() {
          scrambleOut(text, function() {
            phraseIdx = (phraseIdx + 1) % phrases.length;
            cycle();
          });
        }, holdTime);
      });
    }

    cycle();
  });

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
