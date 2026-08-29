(function() {
  
  // ── 1. FAQ ACCORDION LOGIC ────────────────────────────────────────────────
  function initFAQAccordion() {
    const faqRows = document.querySelectorAll('.faq-row');
    faqRows.forEach(row => {
      const btn = row.querySelector('.faq-question-btn');
      const panel = row.querySelector('.faq-answer-panel');
      if (!btn || !panel) return;

      btn.addEventListener('click', () => {
        const isActive = row.classList.contains('active');
        
        // Collapse all panels
        faqRows.forEach(r => {
          r.classList.remove('active');
          const p = r.querySelector('.faq-answer-panel');
          if (p) p.style.maxHeight = null;
        });

        // Expand clicked panel if it wasn't already active
        if (!isActive) {
          row.classList.add('active');
          panel.style.maxHeight = panel.scrollHeight + "px";
          if (window.rabtoPlayClickSFX) window.rabtoPlayClickSFX(550, 'triangle', 0.05);
        }
      });
    });
  }

  // ── 2. HERO BADGE TYPEWRITER EFFECT ──────────────────────────────────────
  function initHeroTypewriter() {
    const textEl = document.getElementById('typewriter-text');
    if (!textEl) return;

    const words = [
      "Website Design",
      "Social Media Marketing",
      "SEO & Lead Generation",
      "Brand Development",
      "Google & Meta Ads"
    ];

    let wordIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    let delay = 180;

    function type() {
      const currentWord = words[wordIdx];
      
      if (isDeleting) {
        textEl.textContent = currentWord.substring(0, charIdx - 1);
        charIdx--;
        delay = 80;
      } else {
        textEl.textContent = currentWord.substring(0, charIdx + 1);
        charIdx++;
        delay = 140;
      }

      if (!isDeleting && charIdx === currentWord.length) {
        delay = 2000; // Pause at the end of the word
        isDeleting = true;
      } else if (isDeleting && charIdx === 0) {
        isDeleting = false;
        wordIdx = (wordIdx + 1) % words.length;
        delay = 400; // Pause before typing next word
      }

      setTimeout(type, delay);
    }

    setTimeout(type, 800);
  }

  // ── 3. SCROLL SPY NAVIGATION ACTIVE LINKS ───────────────────────────────
  function initScrollSpy() {
    const navLinks = document.querySelectorAll('nav.glb-nav-menu a');
    const sections = [
      document.getElementById('hero') || document.querySelector('[data-framer-name="hero"]'),
      document.getElementById('about-me') || document.querySelector('[data-framer-name="about me section"]'),
      document.getElementById('services') || document.querySelector('[data-framer-name="Services"]'),
      document.getElementById('projects') || document.querySelector('[data-framer-name="Projects"]'),
      document.getElementById('process') || document.querySelector('[data-framer-name="process"]'),
      document.getElementById('faq') || document.querySelector('[data-framer-name="FAQ\'s"]'),
      document.getElementById('glb-location') || document.querySelector('.glb-location-section-wrapper')
    ].filter(Boolean);

    function updateActiveLink() {
      let activeSection = sections[0];
      const scrollPos = window.scrollY + window.innerHeight / 3;

      sections.forEach(sec => {
        if (scrollPos >= sec.offsetTop) {
          activeSection = sec;
        }
      });

      if (!activeSection) return;
      const activeName = activeSection.id || activeSection.getAttribute('data-framer-name');
      
      navLinks.forEach(link => {
        link.classList.remove('glb-nav-active');
        const href = link.getAttribute('href');
        if (href && (href.includes(activeSection.id) || (activeName && href.includes(activeName.toLowerCase().replace(/\s+/g, '-'))))) {
          link.classList.add('glb-nav-active');
        }
      });
    }

    window.addEventListener('scroll', updateActiveLink);
    updateActiveLink();
  }

  // ── 4. CONDITIONAL DESKTOP FLOURISHES LOADER ─────────────────────────────
  function initDesktopFlourishes() {
    // Only load visual flourishes on desktop viewports with pointer-hover capability
    const isDesktop = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!isDesktop) {
      console.log('[GLM Engine] Mobile viewport or touch device detected: Visual flourish scripts disabled to save rendering pipeline');
      return;
    }

    console.log('[GLM Engine] Desktop hover-fine device detected: Loading visual flourish pipeline...');

    const flourishScripts = [
      './custom-cursor.js',
      './image-trail-section.js',
      './audio-system.js',
      './three-logo-interactive.js',
      './rabto-fx-engine.js',
      './bg-enhancer.js'
    ];

    flourishScripts.forEach(src => {
      const script = document.createElement('script');
      script.src = src + '?v=' + Date.now();
      script.defer = true;
      document.body.appendChild(script);
    });
  }

  // ── 5. SMOOTH SCROLLING & RICH GSAP SCROLL ANIMATIONS ────────────────────
  function initSmoothScrollAndAnimations() {
    if (!window.gsap || !window.ScrollTrigger) return;

    gsap.registerPlugin(ScrollTrigger);

    // ── Lenis Smooth Scroll Setup ──
    if (window.Lenis) {
      const lenis = new Lenis({
        duration: 1.1,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        wheelMultiplier: 0.85,
        touchMultiplier: 1.5
      });
      function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
      requestAnimationFrame(raf);
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add((time) => { lenis.raf(time * 1000); });
      gsap.ticker.lagSmoothing(0);
    }

    const isMobile = window.innerWidth <= 767;
    const startPct = isMobile ? '85%' : '80%';

    // ─────────────────────────────────────────────────────────────────────
    // HERO — immediate staggered reveal on load
    // ─────────────────────────────────────────────────────────────────────
    const heroItems = document.querySelectorAll(
      '#hero .badge-pill-red, #hero h1, #hero .hero-typewriter-wrap, #hero p, #hero .hero-cta-row, #hero .hero-metrics-row'
    );
    if (heroItems.length) {
      gsap.from(heroItems, {
        opacity: 0, y: 36, duration: 0.9, stagger: 0.1,
        ease: 'power3.out', delay: 0.15
      });
    }

    // ─────────────────────────────────────────────────────────────────────
    // Helper: section badge + heading animated in
    // ─────────────────────────────────────────────────────────────────────
    function animateSectionHeader(section) {
      const badge  = section.querySelector('.badge-pill-red, .badge-pill-gold');
      const h2     = section.querySelector('h2');
      const subTxt = section.querySelector('.body-fluid, .section-subtext');

      const els = [badge, h2, subTxt].filter(Boolean);
      if (!els.length) return;
      gsap.from(els, {
        opacity: 0, y: 30, duration: 0.75, stagger: 0.12,
        ease: 'power2.out',
        scrollTrigger: { trigger: section, start: `top ${startPct}`, toggleActions: 'play none none none' }
      });
    }

    // ─────────────────────────────────────────────────────────────────────
    // ABOUT SECTION — left/right split reveal
    // ─────────────────────────────────────────────────────────────────────
    const aboutSection = document.getElementById('about-me');
    if (aboutSection) {
      animateSectionHeader(aboutSection);

      const leftCol = aboutSection.querySelector('.about-content-col');
      const rightCol = aboutSection.querySelector('.about-visual-col');
      if (leftCol) gsap.from(leftCol.children, {
        opacity: 0, x: -40, duration: 0.8, stagger: 0.1, ease: 'power2.out',
        scrollTrigger: { trigger: leftCol, start: `top ${startPct}`, toggleActions: 'play none none none' }
      });
      if (rightCol) gsap.from(rightCol, {
        opacity: 0, x: 40, scale: 0.96, duration: 0.85, ease: 'power2.out',
        scrollTrigger: { trigger: rightCol, start: `top ${startPct}`, toggleActions: 'play none none none' }
      });

      // Stat cards — bounce in with stagger
      const statCards = aboutSection.querySelectorAll('.about-stat-card');
      if (statCards.length) {
        gsap.from(statCards, {
          opacity: 0, y: 25, scale: 0.9, duration: 0.6, stagger: 0.1,
          ease: 'back.out(1.5)',
          scrollTrigger: { trigger: statCards[0], start: `top ${startPct}`, toggleActions: 'play none none none' }
        });
      }
    }

    // ─────────────────────────────────────────────────────────────────────
    // PROJECTS — cards slide in from bottom, staggered
    // ─────────────────────────────────────────────────────────────────────
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      animateSectionHeader(projectsSection);
      const cards = projectsSection.querySelectorAll('.project-card');
      if (cards.length) {
        gsap.from(cards, {
          opacity: 0, y: 50, scale: 0.94, duration: 0.75, stagger: 0.12,
          ease: 'power2.out',
          scrollTrigger: { trigger: projectsSection.querySelector('.projects-carousel-container') || projectsSection, start: `top ${startPct}`, toggleActions: 'play none none none' }
        });
      }
    }

    // ─────────────────────────────────────────────────────────────────────
    // PROCESS — steps slide in from left, image from right
    // ─────────────────────────────────────────────────────────────────────
    const processSection = document.getElementById('process');
    if (processSection) {
      animateSectionHeader(processSection);
      const steps = processSection.querySelectorAll('.process-step-row');
      steps.forEach((step, i) => {
        gsap.from(step, {
          opacity: 0, x: -45, duration: 0.7, delay: i * 0.07,
          ease: 'power2.out',
          scrollTrigger: { trigger: step, start: `top ${startPct}`, toggleActions: 'play none none none' }
        });
      });
      const img = processSection.querySelector('.process-img-wrap');
      if (img) gsap.from(img, {
        opacity: 0, x: 40, scale: 0.95, duration: 0.8, ease: 'power2.out',
        scrollTrigger: { trigger: img, start: `top ${startPct}`, toggleActions: 'play none none none' }
      });
    }

    // ─────────────────────────────────────────────────────────────────────
    // SERVICES — service cards pop in from bottom with stagger
    // ─────────────────────────────────────────────────────────────────────
    const servicesSection = document.getElementById('services');
    if (servicesSection) {
      animateSectionHeader(servicesSection);
      const serviceCards = servicesSection.querySelectorAll('.service-card-item');
      if (serviceCards.length) {
        gsap.from(serviceCards, {
          opacity: 0, y: 40, scale: 0.93, duration: 0.65, stagger: 0.1,
          ease: 'back.out(1.4)',
          scrollTrigger: { trigger: servicesSection.querySelector('.services-cards-col') || servicesSection, start: `top ${startPct}`, toggleActions: 'play none none none' }
        });
      }
      const imgCol = servicesSection.querySelector('.services-image-col');
      if (imgCol) gsap.from(imgCol, {
        opacity: 0, x: -35, duration: 0.8, ease: 'power2.out',
        scrollTrigger: { trigger: imgCol, start: `top ${startPct}`, toggleActions: 'play none none none' }
      });
    }

    // ─────────────────────────────────────────────────────────────────────
    // FAQ — rows slide in from right, alternating
    // ─────────────────────────────────────────────────────────────────────
    const faqSection = document.getElementById('faq');
    if (faqSection) {
      animateSectionHeader(faqSection);
      const faqRows = faqSection.querySelectorAll('.faq-row');
      faqRows.forEach((row, i) => {
        gsap.from(row, {
          opacity: 0, x: 35, duration: 0.65, delay: i * 0.06,
          ease: 'power2.out',
          scrollTrigger: { trigger: row, start: `top ${startPct}`, toggleActions: 'play none none none' }
        });
      });
      const faqImg = faqSection.querySelector('.faq-image-col');
      if (faqImg) gsap.from(faqImg, {
        opacity: 0, scale: 0.94, duration: 0.8, ease: 'power2.out',
        scrollTrigger: { trigger: faqImg, start: `top ${startPct}`, toggleActions: 'play none none none' }
      });
    }

    // ─────────────────────────────────────────────────────────────────────
    // SKILLS SECTION — tab bar fades up, skill cards pop in as grid
    // ─────────────────────────────────────────────────────────────────────
    const skillsSection = document.getElementById('glb-skills-section');
    if (skillsSection) {
      animateSectionHeader(skillsSection);
      gsap.from(skillsSection.querySelectorAll('.glb-skills-tab'), {
        opacity: 0, y: 20, duration: 0.5, stagger: 0.05, ease: 'power2.out',
        scrollTrigger: { trigger: skillsSection, start: `top ${startPct}`, toggleActions: 'play none none none' }
      });
    }
    // Skill cards animate on tab change too — handled by observer
    const skillCardObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const cards = entry.target.querySelectorAll('.glb-skill-card');
        if (cards.length && window.gsap) {
          gsap.from(cards, {
            opacity: 0, y: 28, scale: 0.92, duration: 0.55, stagger: 0.05, ease: 'back.out(1.4)'
          });
        }
        skillCardObserver.unobserve(entry.target);
      });
    }, { threshold: 0.1 });
    const skillGrid = document.querySelector('.glb-skills-grid');
    if (skillGrid) skillCardObserver.observe(skillGrid);

    // ─────────────────────────────────────────────────────────────────────
    // REVIEWS SECTION — cards fly in from bottom
    // ─────────────────────────────────────────────────────────────────────
    const reviewsSection = document.getElementById('glb-reviews-section');
    if (reviewsSection) {
      animateSectionHeader(reviewsSection);
      gsap.from(reviewsSection.querySelectorAll('.glb-review-card-premium'), {
        opacity: 0, y: 45, scale: 0.95, duration: 0.7, stagger: 0.1, ease: 'power2.out',
        scrollTrigger: { trigger: reviewsSection, start: `top ${startPct}`, toggleActions: 'play none none none' }
      });
    }

    // ─────────────────────────────────────────────────────────────────────
    // LOCATION SECTION — left cards from left, map from right
    // ─────────────────────────────────────────────────────────────────────
    const locationSection = document.getElementById('glb-location');
    if (locationSection) {
      animateSectionHeader(locationSection);
      const contactCards = locationSection.querySelectorAll('.glb-contact-card');
      if (contactCards.length) {
        gsap.from(contactCards, {
          opacity: 0, x: -35, duration: 0.65, stagger: 0.1, ease: 'power2.out',
          scrollTrigger: { trigger: locationSection, start: `top ${startPct}`, toggleActions: 'play none none none' }
        });
      }
      const mapBox = locationSection.querySelector('.glb-map-container-box');
      if (mapBox) gsap.from(mapBox, {
        opacity: 0, x: 35, scale: 0.97, duration: 0.8, ease: 'power2.out',
        scrollTrigger: { trigger: mapBox, start: `top ${startPct}`, toggleActions: 'play none none none' }
      });
    }

    // ─────────────────────────────────────────────────────────────────────
    // FOOTER — bottom-up reveal
    // ─────────────────────────────────────────────────────────────────────
    const footer = document.querySelector('footer.glb-footer');
    if (footer) {
      const footerCols = footer.querySelectorAll('.glb-footer-col, .glb-footer-bottom');
      gsap.from(footerCols, {
        opacity: 0, y: 30, duration: 0.7, stagger: 0.1, ease: 'power2.out',
        scrollTrigger: { trigger: footer, start: 'top 95%', toggleActions: 'play none none none' }
      });
    }

    // ─────────────────────────────────────────────────────────────────────
    // LOGO STRIP — fade in as marquee
    // ─────────────────────────────────────────────────────────────────────
    const logoStrip = document.querySelector('.glb-brand-logos-section, .brand-logos-marquee-section');
    if (logoStrip) {
      gsap.from(logoStrip, {
        opacity: 0, duration: 0.8, ease: 'power2.out',
        scrollTrigger: { trigger: logoStrip, start: `top ${startPct}`, toggleActions: 'play none none none' }
      });
    }

    // ─────────────────────────────────────────────────────────────────────
    // INSTAGRAM BENTO SECTION — scale in
    // ─────────────────────────────────────────────────────────────────────
    const igSection = document.getElementById('glm-instagram-feed-section');
    if (igSection) {
      animateSectionHeader(igSection);
    }

    // ─────────────────────────────────────────────────────────────────────
    // BLOG SECTION — card reveal
    // ─────────────────────────────────────────────────────────────────────
    const blogSection = document.querySelector('.glb-home-blogs-section-wrapper');
    if (blogSection) {
      gsap.from(blogSection.querySelectorAll('.glb-blog-card'), {
        opacity: 0, y: 40, duration: 0.7, stagger: 0.1, ease: 'power2.out',
        scrollTrigger: { trigger: blogSection, start: `top ${startPct}`, toggleActions: 'play none none none' }
      });
    }

    console.log('[GLM Motion] Scroll animations initialized ✓');
  }

  // Run initializations
  function start() {
    initFAQAccordion();
    initHeroTypewriter();
    initScrollSpy();
    initDesktopFlourishes();
    initSmoothScrollAndAnimations();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }

})();

