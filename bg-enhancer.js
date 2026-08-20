(function() {
  // Rabto Skill Engine: Restored Background + Syne Bold Typography + Brand Red Text & Red Hover Glow
  
  const styles = `
    :root {
      --token-f50a08ee-89ba-45ba-bd59-521f4e9cdc51: transparent !important;
      --token-0c62d1bb-1ac3-4cd6-8f0f-8ee3950e02c0: transparent !important;
      --token-67527bae-cc15-4839-8636-c9b28351e4d7: transparent !important;
    }

    /* ── Single Unified Website Background (Original Midnight + Ambient Glow) ── */
    html, body, html body, #main, [data-framer-root] {
      background-color: #0A0E27 !important;
      background-image: 
        radial-gradient(at 15% 10%, rgba(255, 199, 44, 0.22) 0px, transparent 50%),
        radial-gradient(at 85% 15%, rgba(139, 92, 246, 0.28) 0px, transparent 50%),
        radial-gradient(at 50% 50%, rgba(255, 199, 44, 0.18) 0px, transparent 55%),
        radial-gradient(at 85% 85%, rgba(139, 92, 246, 0.22) 0px, transparent 50%),
        radial-gradient(at 15% 85%, rgba(16, 185, 129, 0.18) 0px, transparent 50%) !important;
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

    /* ── 🔤 FIRST PAGE TYPOGRAPHY & BRAND RED ACCENT TEXT (From Screenshot) 🔤 ── */
    [data-framer-name="Hero"] h1,
    [data-framer-name="hero"] h1,
    [data-framer-name="Hero"] .framer-text,
    [data-framer-name="hero"] .framer-text {
      font-family: 'Syne', 'Plus Jakarta Sans', system-ui, sans-serif !important;
      font-weight: 900 !important;
      letter-spacing: -1.5px !important;
    }

    /* Main Hero Title Highlight Text in Brand Red */
    .glb-hero-red-text,
    [data-framer-name="Hero"] span[style*="color"],
    [data-framer-name="hero"] span[style*="color"] {
      color: #FF1744 !important;
      text-shadow: 0 0 25px rgba(255, 23, 68, 0.7) !important;
    }

    /* Pill Badges in Hero (Matching Screenshot Style) */
    .glb-hero-pill-badge {
      display: inline-flex;
      align-items: center;
      padding: 8px 18px;
      margin: 4px;
      border-radius: 30px;
      background: rgba(10, 14, 39, 0.7);
      border: 1px solid rgba(255, 23, 68, 0.45);
      color: #ffffff;
      font-family: 'Plus Jakarta Sans', sans-serif;
      font-weight: 700;
      font-size: 13px;
      letter-spacing: 0.5px;
      transition: all 0.3s ease;
    }

    .glb-hero-pill-badge:hover {
      background: rgba(255, 23, 68, 0.15) !important;
      border-color: #FF1744 !important;
      box-shadow: 0 0 20px rgba(255, 23, 68, 0.5) !important;
      transform: translateY(-2px);
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
    div[class*="framer-"],
    div[class*="glb-"] {
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

    /* ── RESTORE SOLID FOOTER SECTION ── */
    .glb-footer,
    footer,
    [data-framer-name="Footer"] {
      background-color: #0A0E27 !important;
      background: #0A0E27 !important;
      border-top: 1px solid rgba(255, 23, 68, 0.35) !important;
      position: relative !important;
      z-index: 100 !important;
      opacity: 1 !important;
    }

    /* ── Card Wireframe Transparency ── */
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
      border: 1px solid rgba(255, 199, 44, 0.18) !important;
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
      background: rgba(255, 23, 68, 0.06) !important;
      border-color: rgba(255, 23, 68, 0.65) !important;
      box-shadow: 0 0 30px rgba(255, 23, 68, 0.45) !important;
    }

    .glb-review-quote,
    .glb-review-name,
    .glb-home-blog-title,
    .glb-contact-card-val,
    .glb-skill-name,
    .framer-text {
      color: #ffffff !important;
    }
  `;

  const styleEl = document.createElement('style');
  styleEl.innerHTML = styles;
  document.head.appendChild(styleEl);

  // Dynamic Brand Red text highlight watcher for Hero section
  function applyHeroRedTypography() {
    const hero = document.querySelector('[data-framer-name="Hero"]') || document.querySelector('[data-framer-name="hero"]') || document.querySelector('#hero');
    if (!hero) return;

    // Remove red filter from background cloud
    const bgWrappers = hero.querySelectorAll('[data-framer-background-image-wrapper], .framer-1uy17lu');
    bgWrappers.forEach(el => {
      el.style.filter = 'none';
    });

    // Apply Brand Red gradient/glow to main title accent words
    const h1s = hero.querySelectorAll('h1, h2, .framer-styles-preset-1x8i0c5, .framer-styles-preset-gc0h9e');
    h1s.forEach(h => {
      h.style.fontFamily = "'Syne', 'Plus Jakarta Sans', sans-serif";
      h.style.fontWeight = '900';
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyHeroRedTypography);
  } else {
    applyHeroRedTypography();
  }
  setInterval(applyHeroRedTypography, 500);
})();
