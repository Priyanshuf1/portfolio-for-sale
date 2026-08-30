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

  function initDesktopFlourishes() {
    // Disabled dynamic script injection because they are statically loaded via index.html scripts
  }

  // ── 5. ANIMATED STAT COUNTER ─────────────────────────────────────────────
  function initStatCounters() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
    const statNums = document.querySelectorAll('.about-stat-num');
    statNums.forEach(el => {
      if (el.classList.contains('glb-counter-initialized')) return;
      el.classList.add('glb-counter-initialized');
      
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
    // Disabled to prevent breaking React DOM tree and clashing with Framer's native scroll animations
  }

  // ── 7. SMOOTH SCROLL + GSAP ANIMATIONS ───────────────────────────────────
  function initAnimations() {
    if (!window.gsap || !window.ScrollTrigger) return;
    gsap.registerPlugin(ScrollTrigger);

    // Prevent duplicate initialization
    if (document.body.classList.contains('glb-animations-loaded')) return;
    document.body.classList.add('glb-animations-loaded');

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

    const isMobile = window.innerWidth <= 767 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    // ── HERO REVEAL (Immediate on Load) ──
    const heroTitle = document.querySelector('#hero h1');
    const heroElements = document.querySelectorAll('#hero .badge-pill-red, #hero .hero-typewriter-wrap, #hero p, #hero .btn-primary');
    
    if (heroTitle) {
      gsap.fromTo(heroTitle,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.1 }
      );
    }
    if (heroElements.length > 0) {
      gsap.fromTo(heroElements,
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.15, ease: 'power3.out', delay: 0.35 }
      );
    }

    // ── SECTION REVEALS ──
    const revealConfigs = [
      {
        trigger: '#about-me',
        elements: '#about-me .badge-pill-red, #about-me h2, #about-me p, #about-me .about-tag-item, #about-me .about-tool-tag, #about-me .about-stat-card, #about-logo-3d-card'
      },
      {
        trigger: '#services',
        elements: '#services .badge-pill-red, #services h2, #services p, #services .service-card-item, #services .process-img-wrap'
      },
      {
        trigger: '#faq',
        elements: '#faq .badge-pill-red, #faq h2, #faq p, #faq .faq-row'
      }
    ];

    revealConfigs.forEach(config => {
      const section = document.querySelector(config.trigger);
      if (!section) return;

      const items = section.querySelectorAll(config.elements);
      if (items.length === 0) return;

      // Set initial state to avoid flash
      gsap.set(items, { opacity: 0, y: 30 });

      gsap.to(items, {
        opacity: 1,
        y: 0,
        duration: 0.75,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: section,
          start: isMobile ? 'top 92%' : 'top 85%',
          toggleActions: 'play reset play reset' // Replay animations on scroll up and down
        }
      });
    });
  }

  function initHeaderShrink() {
    // Disabled header shrink card styling as requested by user
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

  // ── HASH LINK SMOOTH SCROLL (Delegated) ──
  function initHashLinkScroll() {
    document.addEventListener('click', function(e) {
      const anchor = e.target.closest('a[href^="#"]');
      if (!anchor) return;
      
      const href = anchor.getAttribute('href');
      if (!href || href === '#') return;
      
      const targetEl = document.querySelector(href);
      if (targetEl) {
        e.preventDefault();
        if (window.lenisInstance) {
          window.lenisInstance.scrollTo(targetEl, { offset: -20 });
        } else {
          targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        // Close mobile menu drawer if open
        const drawer = document.getElementById('glbMobileDrawer');
        if (drawer && drawer.classList.contains('active')) {
          drawer.classList.remove('active');
          document.body.style.overflow = '';
        }
        // Update URL hash without browser jump
        history.pushState(null, null, href);
      }
    });
  }

  // ── START ────────────────────────────────────────────────────────────────
  function start() {
    initMobileDrawerMenu();
    initFAQAccordion();
    initHeroTypewriter();
    initScrollSpy();
    initHashLinkScroll();
    initDesktopFlourishes();
    initStatCounters();
    initHeadingWordReveals();
    initAnimations();
    initHeaderShrink();

    // Refresh ScrollTrigger to align bounds with React hydration layout adjustments
    setTimeout(() => {
      if (window.ScrollTrigger) window.ScrollTrigger.refresh();
    }, 450);

    setTimeout(() => {
      if (window.ScrollTrigger) window.ScrollTrigger.refresh();
    }, 950);

    setTimeout(() => {
      if (window.ScrollTrigger) window.ScrollTrigger.refresh();
    }, 1800);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }

})();
