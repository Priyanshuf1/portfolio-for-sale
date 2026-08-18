(function() {
  // Rabto Skill Engine: Unified Seamless Background & Complete Card/Section Transparency
  
  const styles = `
    :root {
      --token-f50a08ee-89ba-45ba-bd59-521f4e9cdc51: transparent !important;
      --token-0c62d1bb-1ac3-4cd6-8f0f-8ee3950e02c0: transparent !important;
      --token-67527bae-cc15-4839-8636-c9b28351e4d7: transparent !important;
    }

    /* ── Single Unified Website Background ── */
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

    /* ── Make ALL Sections 100% Transparent ── */
    #hero,
    #services,
    #about,
    #contact,
    #faq,
    .glb-reviews-native-wrapper, 
    .glb-home-blogs, 
    .glb-location-section, 
    .glb-skills-section,
    .glb-footer,
    footer,
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
    .glb-skills-section,
    .glb-footer {
      border-top: none !important;
    }

    /* ── Remove Card Background Fills Across ALL Sections ── */
    /* Remove card background boxes, heavy shadows, and blur filters so the background mesh & WebGL 3D canvas show through seamlessly */
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

    /* Card Hover State — Sheer Metallic Gold Glow Without Card Background Fills */
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

    /* Ensure text readability over unified background */
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
