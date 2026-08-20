(function() {
  // Rabto Skill Engine: Fiery Brand Red Hero Cloud Filter & Original Site Theme
  
  const styles = `
    :root {
      --token-f50a08ee-89ba-45ba-bd59-521f4e9cdc51: transparent !important;
      --token-0c62d1bb-1ac3-4cd6-8f0f-8ee3950e02c0: transparent !important;
      --token-67527bae-cc15-4839-8636-c9b28351e4d7: transparent !important;
    }

    /* ── Single Unified Website Background (Original Midnight + Gold/Violet Radial Glow) ── */
    html, body, html body, #main, [data-framer-root] {
      background-color: #0A0E27 !important;
      background-image: 
        radial-gradient(at 15% 10%, rgba(255, 199, 44, 0.25) 0px, transparent 50%),
        radial-gradient(at 85% 15%, rgba(139, 92, 246, 0.3) 0px, transparent 50%),
        radial-gradient(at 50% 50%, rgba(255, 199, 44, 0.2) 0px, transparent 55%),
        radial-gradient(at 85% 85%, rgba(139, 92, 246, 0.25) 0px, transparent 50%),
        radial-gradient(at 15% 85%, rgba(16, 185, 129, 0.2) 0px, transparent 50%) !important;
      background-attachment: fixed !important;
      background-size: cover !important;
      color: #ffffff !important;
    }

    /* ── 🔥 BRAND RED HERO BACKGROUND CLOUD ONLY (Matching Uploaded Image & Logo Red) 🔥 ── */
    [data-framer-name="Hero"] [data-framer-background-image-wrapper],
    [data-framer-name="hero"] [data-framer-background-image-wrapper],
    #hero [data-framer-background-image-wrapper],
    .framer-1uy17lu {
      filter: sepia(100%) saturate(1500%) hue-rotate(335deg) brightness(1.1) drop-shadow(0 0 60px rgba(229, 9, 20, 0.95)) !important;
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
      border-top: 1px solid rgba(255, 199, 44, 0.25) !important;
      position: relative !important;
      z-index: 100 !important;
      opacity: 1 !important;
    }

    /* ── Card Wireframe Transparency (Original Gold Border) ── */
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
      border: 1px solid rgba(255, 199, 44, 0.15) !important;
      border-radius: 16px !important;
      transition: border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease !important;
    }

    /* Card Hover State (Original Gold Glow) */
    .glb-review-card-premium:hover, 
    .glb-home-blog-card:hover, 
    .glb-contact-card:hover,
    .glb-skill-card:hover,
    .glb-map-container-box:hover,
    .glb-map-tilt-wrapper:hover,
    .framer-6o1HC:hover,
    div[data-framer-name="Open"]:hover,
    div[data-framer-name="Closed"]:hover {
      background: rgba(255, 199, 44, 0.04) !important;
      border-color: rgba(255, 199, 44, 0.5) !important;
      box-shadow: 0 0 25px rgba(255, 199, 44, 0.2) !important;
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

  // Dynamic DOM watcher for Framer hydration
  function applyHeroRedCloud() {
    const hero = document.querySelector('[data-framer-name="Hero"]') || document.querySelector('[data-framer-name="hero"]') || document.querySelector('#hero');
    if (!hero) return;
    const bgWrappers = hero.querySelectorAll('[data-framer-background-image-wrapper], .framer-1uy17lu');
    bgWrappers.forEach(el => {
      el.style.filter = 'sepia(100%) saturate(1500%) hue-rotate(335deg) brightness(1.1) drop-shadow(0 0 60px rgba(229, 9, 20, 0.95))';
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyHeroRedCloud);
  } else {
    applyHeroRedCloud();
  }
  setInterval(applyHeroRedCloud, 500);
})();
