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
      './three-bg.js',
      './ambient-particles.js',
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

  // Run initializations
  function start() {
    initFAQAccordion();
    initHeroTypewriter();
    initScrollSpy();
    initDesktopFlourishes();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }

})();
