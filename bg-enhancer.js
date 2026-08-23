(function() {
  // Rabto Skill Engine: Pure Restored Site Layout + Gold Swapped to Brand Red (#FFC72C)
  
  const styles = `
    :root {
      --token-f50a08ee-89ba-45ba-bd59-521f4e9cdc51: transparent !important;
      --token-0c62d1bb-1ac3-4cd6-8f0f-8ee3950e02c0: transparent !important;
      --token-67527bae-cc15-4839-8636-c9b28351e4d7: transparent !important;
    }

    /* ── Single Unified Website Background (Midnight Dark + Brand Red & Violet Glow) ── */
    html, body, html body, #main, [data-framer-root] {
      background-color: #050508 !important;
      background-image: 
        radial-gradient(at 15% 10%, rgba(255, 255, 255, 0.05) 0px, transparent 50%),
        radial-gradient(at 85% 15%, rgba(148, 163, 184, 0.04) 0px, transparent 50%),
        radial-gradient(at 50% 50%, rgba(255, 255, 255, 0.04) 0px, transparent 55%),
        radial-gradient(at 85% 85%, rgba(148, 163, 184, 0.03) 0px, transparent 50%),
        radial-gradient(at 15% 85%, rgba(255, 255, 255, 0.03) 0px, transparent 50%) !important;
      background-attachment: fixed !important;
      background-size: cover !important;
      color: #ffffff !important;
    }

    /* ── RESTORE ORIGINAL UNFILTERED BACKGROUND CLOUD ── */
    [data-framer-name="Hero"] [data-framer-background-image-wrapper],
    [data-framer-name="hero"] [data-framer-background-image-wrapper],
    #hero [data-framer-background-image-wrapper],
    .framer-1uy17lu {
      filter: none !important;
    }

    /* ── Make Main Sections Transparent ── */
    #hero,
    #services,
    #about,
    #contact,
    #faq,
    .glb-reviews-native-wrapper, 
    .glb-home-blogs, 
    .glb-location-section, 
    .glb-skills-section,
    header,
    nav,
    section,
    section[class*="framer-"],
    div[class*="framer-"] {
      background-color: transparent !important;
      background: transparent !important;
      backdrop-filter: none !important;
      -webkit-backdrop-filter: none !important;
    }

    /* Remove section top borders that create visible breaks */
    .glb-reviews-native-wrapper, 
    .glb-home-blogs, 
    .glb-location-section, 
    .glb-skills-section {
      border-top: none !important;
    }

    /* ── RESTORE SOLID FOOTER SECTION WITH BRAND RED TOP BORDER ── */
    .glb-footer,
    footer,
    [data-framer-name="Footer"] {
      background-color: #050508 !important;
      background: #050508 !important;
      border-top: 1px solid rgba(255, 199, 44, 0.35) !important;
      position: relative !important;
      z-index: 100 !important;
      opacity: 1 !important;
    }

    /* ── Card Wireframe Transparency (Brand Red Border Accent) ── */
    .glb-review-card-premium, 
    .glb-home-blog-card, 
    .glb-contact-card,
    .glb-skill-card,
    .glb-map-container-box,
    .glb-map-tilt-wrapper,
    .framer-6o1HC,
    div[data-framer-name="Open"],
    div[data-framer-name="Closed"],
    div[data-framer-name="All FAQs"],
    .framer-1wjnscd-container,
    .framer-1sk946w-container,
    .framer-h63dtg-container,
    .framer-tb0yeu-container,
    .framer-1l7inir,
    .framer-unn2aa,
    .framer-NIbMY {
      background: transparent !important;
      background-color: transparent !important;
      box-shadow: none !important;
      backdrop-filter: none !important;
      -webkit-backdrop-filter: none !important;
      border: 1px solid rgba(255, 199, 44, 0.22) !important;
      border-radius: 16px !important;
      transition: border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease !important;
    }

    /* ── 🔥 BRAND RED HOVER SHINE ON CARDS & BUTTONS (Replaces Golden Glow) 🔥 ── */
    .glb-review-card-premium:hover, 
    .glb-home-blog-card:hover, 
    .glb-contact-card:hover,
    .glb-skill-card:hover,
    .glb-map-container-box:hover,
    .glb-map-tilt-wrapper:hover,
    .framer-6o1HC:hover,
    div[data-framer-name="Open"]:hover,
    div[data-framer-name="Closed"]:hover,
    button:hover,
    .glb-btn:hover,
    a.framer-11j49s1:hover {
      background: rgba(255, 199, 44, 0.08) !important;
      border-color: rgba(255, 199, 44, 0.7) !important;
      box-shadow: 0 0 32px rgba(255, 199, 44, 0.5) !important;
    }

    .glb-review-quote,
    .glb-review-name,
    .glb-home-blog-title,
    .glb-contact-card-val,
    .glb-skill-name,
    .framer-text {
      color: #ffffff !important;
    }

    #monochrome-spotlight {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      pointer-events: none;
      z-index: -2;
      background: radial-gradient(circle 350px at var(--mouse-x, -1000px) var(--mouse-y, -1000px), rgba(255, 255, 255, 0.06), transparent 80%);
      transition: background 0.05s ease;
    }

    /* Hide redundant Book a Free Call CTA buttons */
    [data-framer-name="process"] [data-framer-name="buttons"],
    [data-framer-name="FAQ's"] .framer-4y99x1-container,
    [data-framer-name="faq"] .framer-4y99x1-container {
      display: none !important;
    }
  `;

  const styleEl = document.createElement('style');
  styleEl.innerHTML = styles;
  document.head.appendChild(styleEl);

  // Dynamic watcher to remove filter from cloud background
  function resetHeroCloudFilter() {
    const hero = document.querySelector('[data-framer-name="Hero"]') || document.querySelector('[data-framer-name="hero"]') || document.querySelector('#hero');
    if (!hero) return;
    const bgWrappers = hero.querySelectorAll('[data-framer-background-image-wrapper], .framer-1uy17lu');
    bgWrappers.forEach(el => {
      el.style.filter = 'none';
    });
  }

  // Inject spotlight DOM element
  function initMonochromeSpotlight() {
    if (document.getElementById('monochrome-spotlight')) return;
    const spotlight = document.createElement('div');
    spotlight.id = 'monochrome-spotlight';
    document.body.appendChild(spotlight);

    window.addEventListener('mousemove', (e) => {
      spotlight.style.setProperty('--mouse-x', `${e.clientX}px`);
      spotlight.style.setProperty('--mouse-y', `${e.clientY}px`);
    });
  }

  // Intercept all "Book a Call" buttons to trigger the local modal
  function patchBookACallLinks() {
    const elements = document.querySelectorAll('a, button');
    elements.forEach(el => {
      const text = (el.textContent || '').trim().toLowerCase();
      if (text.includes('book') && text.includes('call')) {
        if (!el.dataset.patchedGlbCall) {
          el.dataset.patchedGlbCall = 'true';
          el.setAttribute('href', 'javascript:void(0)');
          el.removeAttribute('target');
          el.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            if (typeof window.openBookACallModal === 'function') {
              window.openBookACallModal();
            }
          });
        }
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      resetHeroCloudFilter();
      initMonochromeSpotlight();
      patchBookACallLinks();
    });
  } else {
    resetHeroCloudFilter();
    initMonochromeSpotlight();
    patchBookACallLinks();
  }
  setInterval(() => {
    resetHeroCloudFilter();
    patchBookACallLinks();
  }, 500);
})();
