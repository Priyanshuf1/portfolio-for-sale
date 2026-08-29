(function() {

  // ── 1. FAQ ACCORDION LOGIC ────────────────────────────────────────────────
  function initFAQAccordion() {
    const faqRows = document.querySelectorAll('.faq-row');
    faqRows.forEach(row => {
      // Make sure rows are always visible - don't hide them
      row.style.opacity = '1';
      row.style.transform = 'none';

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
    const navLinks = document.querySelectorAll('nav.glb-nav-menu a');
    const sections = [
      '#hero','#about-me','#services','#projects','#process','#faq','#glb-location'
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
    ['./custom-cursor.js','./image-trail-section.js','./audio-system.js',
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
    // Parse stat numbers like "7+ Yrs", "100+", "500+"
    const statNums = document.querySelectorAll('.about-stat-num');
    if (!statNums.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const raw = el.textContent.trim();
        // Extract number, prefix (nothing), suffix ("+", "+ Yrs", " Yrs" etc)
        const match = raw.match(/^(\d+)(\+?\s*[A-Za-z+\s]*)$/);
        if (!match) return;
        const target = parseInt(match[1]);
        const suffix = match[2] || '';
        const duration = 1800; // ms
        const start = performance.now();

        function tick(now) {
          const elapsed = now - start;
          const progress = Math.min(elapsed / duration, 1);
          // Ease out cubic
          const eased = 1 - Math.pow(1 - progress, 3);
          const current = Math.round(eased * target);
          el.textContent = current + suffix;
          if (progress < 1) {
            requestAnimationFrame(tick);
          } else {
            el.textContent = raw; // Restore exact original
            // Trigger bottom-line sweep CSS
            const card = el.closest('.about-stat-card');
            if (card) card.classList.add('counted');
          }
        }
        requestAnimationFrame(tick);
        observer.unobserve(el);
      });
    }, { threshold: 0.5 });

    statNums.forEach(el => observer.observe(el));
  }

  // ── 6. SMOOTH SCROLL + GSAP ANIMATIONS ───────────────────────────────────
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

    const isMobile = window.innerWidth <= 767;
    const trigStart = isMobile ? 'top 90%' : 'top 82%';

    // ── SAFE fromTo helper (no invisible elements) ──
    function reveal(targets, fromVars, toVars, scrollTriggerOpts) {
      const els = typeof targets === 'string'
        ? document.querySelectorAll(targets)
        : (targets instanceof NodeList ? targets : [targets]);
      if (!els || !els.length) return;
      gsap.fromTo(els,
        { opacity: 0, ...fromVars },
        { opacity: 1, ...toVars, scrollTrigger: scrollTriggerOpts }
      );
    }

    // ── HERO — immediate reveal ──
    gsap.fromTo(
      '#hero .badge-pill-red, #hero h1, #hero .hero-typewriter-wrap, #hero p, #hero .btn-primary',
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.9, stagger: 0.11, ease: 'power3.out', delay: 0.2 }
    );

    // ── ABOUT SECTION ──
    const aboutSection = document.getElementById('about-me');
    if (aboutSection) {
      // Section header words slide up (Rafael-style text reveal)
      const h2 = aboutSection.querySelector('h2');
      const badge = aboutSection.querySelector('.badge-pill-red');
      const desc = aboutSection.querySelector('.body-fluid');
      if (badge) gsap.fromTo(badge, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', scrollTrigger: { trigger: badge, start: trigStart, toggleActions: 'play none none none' } });
      if (h2) {
        // Split into lines manually for word-by-word reveal
        const words = h2.innerHTML.split(/\s+/);
        h2.innerHTML = words.map(w => `<span class="glm-word-reveal" style="display:inline-block;overflow:hidden;"><span class="glm-word-inner" style="display:inline-block;transform:translateY(100%);opacity:0;">${w}&nbsp;</span></span>`).join('');
        gsap.to(h2.querySelectorAll('.glm-word-inner'), {
          y: 0, opacity: 1, duration: 0.65, stagger: 0.05, ease: 'power3.out',
          scrollTrigger: { trigger: h2, start: trigStart, toggleActions: 'play none none none' }
        });
      }
      if (desc) gsap.fromTo(desc, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7, delay: 0.2, ease: 'power2.out', scrollTrigger: { trigger: desc, start: trigStart, toggleActions: 'play none none none' } });

      // Logo card from left
      const logoCard = document.getElementById('about-logo-3d-card');
      if (logoCard) gsap.fromTo(logoCard, { opacity: 0, x: -50, scale: 0.94 }, { opacity: 1, x: 0, scale: 1, duration: 0.9, ease: 'power2.out', scrollTrigger: { trigger: logoCard, start: trigStart, toggleActions: 'play none none none' } });

      // Stat cards bounce in
      const statCards = aboutSection.querySelectorAll('.about-stat-card');
      if (statCards.length) {
        gsap.fromTo(statCards,
          { opacity: 0, y: 30, scale: 0.88 },
          { opacity: 1, y: 0, scale: 1, duration: 0.55, stagger: 0.12, ease: 'back.out(1.7)',
            scrollTrigger: { trigger: statCards[0], start: trigStart, toggleActions: 'play none none none' } }
        );
      }
    }

    // ── PROJECTS SECTION — Rafael-style: cards slide from right as you scroll ──
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      const pBadge = projectsSection.querySelector('.badge-pill-gold');
      const pH2    = projectsSection.querySelector('h2');
      const pDesc  = projectsSection.querySelector('p');
      [pBadge, pH2, pDesc].filter(Boolean).forEach((el, i) => {
        gsap.fromTo(el, { opacity: 0, y: 25 }, { opacity: 1, y: 0, duration: 0.65, delay: i * 0.1, ease: 'power2.out',
          scrollTrigger: { trigger: el, start: trigStart, toggleActions: 'play none none none' } });
      });

      // Cards: stagger slide up
      const cards = projectsSection.querySelectorAll('.project-card');
      cards.forEach((card, i) => {
        gsap.fromTo(card,
          { opacity: 0, y: 60, scale: 0.93 },
          { opacity: 1, y: 0, scale: 1, duration: 0.75, delay: i * 0.1, ease: 'power2.out',
            scrollTrigger: { trigger: card, start: trigStart, toggleActions: 'play none none none' } }
        );
      });
    }

    // ── PROCESS SECTION — steps slide from left ──
    const processSection = document.getElementById('process');
    if (processSection) {
      const h2 = processSection.querySelector('h2');
      if (h2) gsap.fromTo(h2, { opacity: 0, y: 25 }, { opacity: 1, y: 0, duration: 0.65, ease: 'power2.out',
        scrollTrigger: { trigger: h2, start: trigStart, toggleActions: 'play none none none' } });

      const steps = processSection.querySelectorAll('.process-step-row');
      steps.forEach((step, i) => {
        gsap.fromTo(step,
          { opacity: 0, x: -45 },
          { opacity: 1, x: 0, duration: 0.65, delay: i * 0.1, ease: 'power2.out',
            scrollTrigger: { trigger: step, start: trigStart, toggleActions: 'play none none none' } }
        );
      });

      const img = processSection.querySelector('.process-img-wrap');
      if (img) gsap.fromTo(img, { opacity: 0, x: 45, scale: 0.95 }, { opacity: 1, x: 0, scale: 1, duration: 0.85, ease: 'power2.out',
        scrollTrigger: { trigger: img, start: trigStart, toggleActions: 'play none none none' } });
    }

    // ── SERVICES SECTION — cards pop in ──
    const servicesSection = document.getElementById('services');
    if (servicesSection) {
      const h2 = servicesSection.querySelector('h2');
      if (h2) gsap.fromTo(h2, { opacity: 0, y: 25 }, { opacity: 1, y: 0, duration: 0.65, ease: 'power2.out',
        scrollTrigger: { trigger: h2, start: trigStart, toggleActions: 'play none none none' } });

      const cards = servicesSection.querySelectorAll('.service-card-item');
      cards.forEach((card, i) => {
        gsap.fromTo(card,
          { opacity: 0, y: 40, scale: 0.92 },
          { opacity: 1, y: 0, scale: 1, duration: 0.6, delay: i * 0.08, ease: 'back.out(1.5)',
            scrollTrigger: { trigger: card, start: trigStart, toggleActions: 'play none none none' } }
        );
      });
    }

    // ── FAQ SECTION — NEVER hide rows, only animate border line ──
    // FAQ rows are kept fully visible. Only the left column animates.
    const faqSection = document.getElementById('faq');
    if (faqSection) {
      const leftCol = faqSection.querySelector('.about-content-col');
      if (leftCol) {
        const children = Array.from(leftCol.children);
        children.forEach((el, i) => {
          gsap.fromTo(el, { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.6, delay: i * 0.1, ease: 'power2.out',
            scrollTrigger: { trigger: leftCol, start: trigStart, toggleActions: 'play none none none' } });
        });
      }
      // FAQ accordion rows — subtle slide from right, but ALWAYS visible (start opacity 0.4 not 0)
      const faqRows = faqSection.querySelectorAll('.faq-row');
      faqRows.forEach((row, i) => {
        gsap.fromTo(row,
          { opacity: 0.4, x: 20 },
          { opacity: 1, x: 0, duration: 0.45, delay: i * 0.06, ease: 'power2.out',
            scrollTrigger: { trigger: row, start: trigStart, toggleActions: 'play none none none' } }
        );
      });
    }

    // ── SKILLS SECTION — RAFAEL STYLE horizontal card slide ──
    // Cards fly in from alternating sides like skill tiles
    setTimeout(() => {
      const skillSection = document.getElementById('glb-skills-section');
      if (!skillSection) return;

      const skillH2 = skillSection.querySelector('h2, .glb-skills-header h2');
      if (skillH2) gsap.fromTo(skillH2, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out',
        scrollTrigger: { trigger: skillH2, start: trigStart, toggleActions: 'play none none none' } });

      // Watch for skill grid rendering (it renders dynamically)
      const gridObserver = new MutationObserver(() => {
        const cards = skillSection.querySelectorAll('.glb-skill-card');
        if (!cards.length) return;
        gridObserver.disconnect();

        cards.forEach((card, i) => {
          const fromLeft = i % 2 === 0;
          gsap.fromTo(card,
            { opacity: 0, x: fromLeft ? -35 : 35, y: 20, scale: 0.9 },
            { opacity: 1, x: 0, y: 0, scale: 1, duration: 0.55, delay: (i % 8) * 0.055, ease: 'back.out(1.4)',
              scrollTrigger: { trigger: card, start: 'top 90%', toggleActions: 'play none none none' } }
          );
        });
      });
      gridObserver.observe(skillSection, { childList: true, subtree: true });

      // Also try immediately in case already rendered
      const cards = skillSection.querySelectorAll('.glb-skill-card');
      if (cards.length) {
        gridObserver.disconnect();
        cards.forEach((card, i) => {
          const fromLeft = i % 2 === 0;
          gsap.fromTo(card,
            { opacity: 0, x: fromLeft ? -35 : 35, y: 20, scale: 0.9 },
            { opacity: 1, x: 0, y: 0, scale: 1, duration: 0.55, delay: (i % 8) * 0.055, ease: 'back.out(1.4)',
              scrollTrigger: { trigger: card, start: 'top 90%', toggleActions: 'play none none none' } }
          );
        });
      }
    }, 1200);

    // ── REVIEWS ──
    setTimeout(() => {
      const reviewsSection = document.getElementById('glb-reviews-section');
      if (!reviewsSection) return;
      const reviewCards = reviewsSection.querySelectorAll('.glb-review-card-premium');
      if (reviewCards.length) {
        reviewCards.forEach((card, i) => {
          gsap.fromTo(card,
            { opacity: 0, y: 50, scale: 0.95 },
            { opacity: 1, y: 0, scale: 1, duration: 0.7, delay: i * 0.1, ease: 'power2.out',
              scrollTrigger: { trigger: card, start: trigStart, toggleActions: 'play none none none' } }
          );
        });
      }
    }, 1200);

    // ── LOCATION SECTION ──
    setTimeout(() => {
      const locationSection = document.getElementById('glb-location');
      if (!locationSection) return;
      const contactCards = locationSection.querySelectorAll('.glb-contact-card');
      contactCards.forEach((card, i) => {
        gsap.fromTo(card, { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.6, delay: i * 0.1, ease: 'power2.out',
          scrollTrigger: { trigger: card, start: trigStart, toggleActions: 'play none none none' } });
      });
      const mapBox = locationSection.querySelector('.glb-map-container-box');
      if (mapBox) gsap.fromTo(mapBox, { opacity: 0, x: 40, scale: 0.96 }, { opacity: 1, x: 0, scale: 1, duration: 0.85, ease: 'power2.out',
        scrollTrigger: { trigger: mapBox, start: trigStart, toggleActions: 'play none none none' } });
    }, 1200);

    // ── FOOTER ──
    setTimeout(() => {
      const footer = document.querySelector('footer.glb-footer');
      if (!footer) return;
      gsap.fromTo(footer.querySelectorAll('.glb-footer-col, .glb-footer-bottom'),
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.12, ease: 'power2.out',
          scrollTrigger: { trigger: footer, start: 'top 96%', toggleActions: 'play none none none' } }
      );
    }, 1500);

    // ── LOGO STRIP ──
    setTimeout(() => {
      const logoStrip = document.querySelector('.glb-brand-logos-section, .brand-logos-marquee-section');
      if (!logoStrip) return;
      gsap.fromTo(logoStrip, { opacity: 0 }, { opacity: 1, duration: 0.8, ease: 'power2.out',
        scrollTrigger: { trigger: logoStrip, start: trigStart, toggleActions: 'play none none none' } });
    }, 800);

    console.log('[GLM Motion] ✓ All section animations initialized');
  }

  // ── 7. HEADER SCROLL SHRINK ─────────────────────────────────────────────
  function initHeaderShrink() {
    const header = document.querySelector('header.glb-site-header');
    if (!header) return;
    window.addEventListener('scroll', () => {
      if (window.scrollY > 60) {
        header.style.padding = '8px 20px';
        header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.06)';
      } else {
        header.style.padding = '';
        header.style.boxShadow = '';
      }
    }, { passive: true });
  }

  // ── START ────────────────────────────────────────────────────────────────
  function start() {
    initFAQAccordion();
    initHeroTypewriter();
    initScrollSpy();
    initDesktopFlourishes();
    initStatCounters();
    initAnimations();
    initHeaderShrink();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }

})();
