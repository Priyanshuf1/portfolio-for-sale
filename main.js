(function() {

  // ── 1. FAQ ACCORDION LOGIC ────────────────────────────────────────────────
  function initFAQAccordion() {
    const faqRows = document.querySelectorAll('.faq-row');
    faqRows.forEach(row => {
      // Clear inline style constraints that could prevent opening
      row.style.opacity = '';
      row.style.transform = '';

      const btn = row.querySelector('.faq-question-btn');
      const panel = row.querySelector('.faq-answer-panel');
      if (!btn || !panel) return;

      btn.addEventListener('click', () => {
        const isActive = row.classList.contains('active');
        faqRows.forEach(r => {
          r.classList.remove('active');
          const p = r.querySelector('.faq-answer-panel');
          if (p) p.style.maxHeight = null;
        });
        if (!isActive) {
          row.classList.add('active');
          panel.style.maxHeight = panel.scrollHeight + 'px';
        }
      });
    });
  }

  // ── 2. HERO BADGE TYPEWRITER ──────────────────────────────────────────────
  function initHeroTypewriter() {
    const textEl = document.getElementById('typewriter-text');
    if (!textEl) return;
    const words = [
      'Website Design',
      'Social Media Marketing',
      'SEO & Lead Generation',
      'Brand Development',
      'Google & Meta Ads'
    ];
    let wordIdx = 0, charIdx = 0, isDeleting = false, delay = 180;
    function type() {
      const w = words[wordIdx];
      if (isDeleting) { textEl.textContent = w.substring(0, charIdx - 1); charIdx--; delay = 80; }
      else            { textEl.textContent = w.substring(0, charIdx + 1); charIdx++; delay = 140; }
      if (!isDeleting && charIdx === w.length)  { delay = 2000; isDeleting = true; }
      else if (isDeleting && charIdx === 0)     { isDeleting = false; wordIdx = (wordIdx + 1) % words.length; delay = 400; }
      setTimeout(type, delay);
    }
    setTimeout(type, 800);
  }

  // ── 3. SCROLL SPY ────────────────────────────────────────────────────────
  function initScrollSpy() {
    const navLinks = document.querySelectorAll('nav.glb-nav-menu a, .glb-drawer-link');
    const sections = [
      '#hero','#about-me','#services','#projects','#faq','#glb-location'
    ].map(s => document.querySelector(s)).filter(Boolean);

    function update() {
      let active = sections[0];
      const pos = window.scrollY + window.innerHeight / 3;
      sections.forEach(s => { if (pos >= s.offsetTop) active = s; });
      navLinks.forEach(link => {
        link.classList.remove('glb-nav-active');
        if (active && link.getAttribute('href') && link.getAttribute('href').includes(active.id)) {
          link.classList.add('glb-nav-active');
        }
      });
    }
    window.addEventListener('scroll', update, { passive: true });
    update();
  }

  // ── 4. DESKTOP FLOURISHES ─────────────────────────────────────────────────
  function initDesktopFlourishes() {
    const isDesktop = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!isDesktop) return;
    ['./custom-cursor.js','./audio-system.js',
     './three-logo-interactive.js','./rabto-fx-engine.js','./bg-enhancer.js'
    ].forEach(src => {
      const s = document.createElement('script');
      s.src = src + '?v=' + Date.now();
      s.defer = true;
      document.body.appendChild(s);
    });
  }

  // ── 5. ANIMATED STAT COUNTER ─────────────────────────────────────────────
  function initStatCounters() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
    const statNums = document.querySelectorAll('.about-stat-num');
    statNums.forEach(el => {
      const rawText = el.textContent.trim();
      const match = rawText.match(/^(\d+)(\+?\s*[A-Za-z+\s]*)$/);
      if (!match) return;
      const targetVal = parseInt(match[1]);
      const suffix = match[2] || '';
      
      let countObj = { val: 0 };
      gsap.fromTo(countObj,
        { val: 0 },
        {
          val: targetVal,
          duration: 1.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 95%',
            toggleActions: 'play reset play reset',
            onLeaveBack: () => {
              el.textContent = "0" + suffix;
            }
          },
          onUpdate: () => {
            el.textContent = Math.round(countObj.val) + suffix;
          },
          onComplete: () => {
            el.textContent = rawText;
          }
        }
      );
    });
  }

  // ── 6. WORD-BY-WORD HEADING REVEAL ───────────────────────────────────────
  function initHeadingWordReveals() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    const headings = document.querySelectorAll('h2, #hero h1');
    headings.forEach(h => {
      if (h.querySelector('.glm-word-reveal')) return;

      const contents = Array.from(h.childNodes);
      h.innerHTML = '';

      contents.forEach(node => {
        if (node.nodeType === Node.TEXT_NODE) {
          const words = node.textContent.split(/(\s+)/);
          words.forEach(w => {
            if (w.trim() === '') {
              h.appendChild(document.createTextNode(w));
            } else {
              const wrap = document.createElement('span');
              wrap.className = 'glm-word-reveal';
              const inner = document.createElement('span');
              inner.className = 'glm-word-inner';
              inner.textContent = w;
              wrap.appendChild(inner);
              h.appendChild(wrap);
            }
          });
        } else if (node.nodeType === Node.ELEMENT_NODE) {
          if (node.tagName.toLowerCase() === 'br') {
            h.appendChild(node.cloneNode(true));
          } else {
            const wrap = document.createElement('span');
            wrap.className = 'glm-word-reveal';
            const inner = node.cloneNode(true);
            inner.classList.add('glm-word-inner');
            inner.style.display = 'inline-block';
            wrap.appendChild(inner);
            h.appendChild(wrap);
          }
        }
      });

      gsap.to(h.querySelectorAll('.glm-word-inner'), {
        y: '0%',
        opacity: 1,
        duration: 0.8,
        stagger: 0.045,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: h,
          start: 'top 85%',
          toggleActions: 'play reset play reset'
        }
      });
    });
  }

  // ── 7. SMOOTH SCROLL + GSAP ANIMATIONS ───────────────────────────────────
  function initAnimations() {
    if (!window.gsap || !window.ScrollTrigger) return;
    gsap.registerPlugin(ScrollTrigger);

    // ── SCROLL PROGRESS BAR (Rafael-style thin red top line) ──
    const progressEl = document.getElementById('glm-scroll-progress');
    if (progressEl) {
      gsap.to(progressEl, {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: document.body,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.3
        }
      });
    }

    // Lenis smooth scroll
    if (window.Lenis) {
      const lenis = new Lenis({
        duration: 1.1,
        easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        wheelMultiplier: 0.85,
        touchMultiplier: 1.5
      });
      function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
      requestAnimationFrame(raf);
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add(time => lenis.raf(time * 1000));
      gsap.ticker.lagSmoothing(0);
    }

    const isMobile = window.innerWidth <= 767 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    // ── HERO — immediate reveal on load ──
    gsap.fromTo(
      '#hero .badge-pill-red, #hero .hero-typewriter-wrap, #hero p, #hero .hero-cta-row, #hero .hero-metrics-row, #hero .btn-primary',
      { opacity: 0, y: 35 },
      { opacity: 1, y: 0, duration: 0.9, stagger: 0.1, ease: 'power3.out', delay: 0.15 }
    );

    // ── RESTORE STAGGERED REVEALS FOR ALL OTHER ELEMENTS ──
    const revealSections = ['#about-me', '#projects', '#services', '#faq', '#glb-skills-section', '#glb-reviews-section', '#glb-location', 'footer'];
    revealSections.forEach(selector => {
      const section = document.querySelector(selector);
      if (!section) return;

      // Select inner elements that should animate in smoothly on scroll (excluding .glb-skill-card to avoid clashes)
      const anims = section.querySelectorAll(
        '.badge-pill-red, .badge-pill-gold, .badge-pill-red, .badge-pill-gold, .body-fluid, p, .btn-primary, .btn-secondary, .about-stat-card, .project-card, .service-card-item, .faq-row, .glb-review-card-premium, .footer-inner > *, .services-image-col, .glb-map-container-box, .glb-contact-card'
      );
      if (anims.length === 0) return;

      gsap.fromTo(anims,
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: isMobile ? 'top 90%' : 'top 82%',
            toggleActions: 'play reset play reset'
          }
        }
      );
    });

    // ── EXTRA REVEAL ANIMATIONS FOR GRAPHIC CONTAINERS ──
    // About 3D logo
    const logoCard = document.getElementById('about-logo-3d-card');
    if (logoCard) {
      gsap.fromTo(logoCard,
        { opacity: 0, scale: 0.93 },
        { opacity: 1, scale: 1, duration: 0.85, ease: 'power2.out',
          scrollTrigger: { trigger: logoCard, start: isMobile ? 'top 92%' : 'top 85%', toggleActions: 'play reset play reset' } }
      );
    }
  }

  // ── 8. HEADER SCROLL SHRINK ─────────────────────────────────────────────
  function initHeaderShrink() {
    const header = document.querySelector('header.glb-site-header');
    if (!header) return;
    window.addEventListener('scroll', () => {
      if (window.scrollY > 60) {
        header.style.padding = '8px 20px';
        header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.06)';
      }
    }, { passive: true });
  }

  // ── MOBILE DRAWER MENU ────────────────══════════════════════════════════
  function initMobileDrawerMenu() {
    const toggle = document.getElementById('glbMenuToggle');
    const drawer = document.getElementById('glbMobileDrawer');
    const close = document.getElementById('glbDrawerClose');
    const overlay = document.getElementById('glbDrawerOverlay');
    const links = document.querySelectorAll('.glb-drawer-link');

    if (!toggle || !drawer) return;

    function openMenu() {
      drawer.classList.add('active');
      document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
      drawer.classList.remove('active');
      document.body.style.overflow = '';
    }

    toggle.addEventListener('click', openMenu);
    if (close) close.addEventListener('click', closeMenu);
    if (overlay) overlay.addEventListener('click', closeMenu);
    
    links.forEach(link => {
      link.addEventListener('click', closeMenu);
    });
  }

  // ── START ────────────────────────────────────────────────────────────────
  function start() {
    initMobileDrawerMenu();
    initFAQAccordion();
    initHeroTypewriter();
    initScrollSpy();
    initDesktopFlourishes();
    initStatCounters();
    initHeadingWordReveals();
    initAnimations();
    initHeaderShrink();

    // Re-trigger layout captures after dynamic script injection delays (300ms, 800ms, 1500ms)
    setTimeout(() => {
      initHeadingWordReveals();
      initAnimations();
    }, 450);

    setTimeout(() => {
      initHeadingWordReveals();
      initAnimations();
    }, 950);

    setTimeout(() => {
      initHeadingWordReveals();
      initAnimations();
    }, 1800);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }

})();
