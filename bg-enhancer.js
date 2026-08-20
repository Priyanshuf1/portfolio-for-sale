(function() {
  // Rabto Skill Engine: Shiny Red Background Cloud Aura & Solid Footer Section
  
  const styles = `
    :root {
      --token-f50a08ee-89ba-45ba-bd59-521f4e9cdc51: transparent !important;
      --token-0c62d1bb-1ac3-4cd6-8f0f-8ee3950e02c0: transparent !important;
      --token-67527bae-cc15-4839-8636-c9b28351e4d7: transparent !important;
    }

    /* ── Shiny Crimson & Metallic Red Volumetric Background Cloud Aura ── */
    html, body, html body, #main, [data-framer-root] {
      background-color: #050507 !important;
      background-image: 
        radial-gradient(at 15% 10%, rgba(255, 23, 68, 0.35) 0px, transparent 50%),
        radial-gradient(at 85% 15%, rgba(213, 0, 0, 0.4) 0px, transparent 50%),
        radial-gradient(at 50% 50%, rgba(255, 23, 68, 0.3) 0px, transparent 55%),
        radial-gradient(at 85% 85%, rgba(213, 0, 0, 0.35) 0px, transparent 50%),
        radial-gradient(at 15% 85%, rgba(255, 82, 82, 0.3) 0px, transparent 50%) !important;
      background-attachment: fixed !important;
      background-size: cover !important;
      color: #ffffff !important;
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

    /* ── Card Wireframe Transparency with Shiny Red Accents ── */
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
      border: 1px solid rgba(255, 23, 68, 0.22) !important;
      border-radius: 16px !important;
      transition: border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease !important;
    }

    /* Card Hover State in Shiny Red */
    .glb-review-card-premium:hover, 
    .glb-home-blog-card:hover, 
    .glb-contact-card:hover,
    .glb-skill-card:hover,
    .glb-map-container-box:hover,
    .glb-map-tilt-wrapper:hover,
    .framer-6o1HC:hover,
    div[data-framer-name="Open"]:hover,
    div[data-framer-name="Closed"]:hover {
      background: rgba(255, 23, 68, 0.05) !important;
      border-color: rgba(255, 23, 68, 0.6) !important;
      box-shadow: 0 0 28px rgba(255, 23, 68, 0.3) !important;
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
})();
