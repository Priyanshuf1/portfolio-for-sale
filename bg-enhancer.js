(function() {
  // Rabto Skill Engine: Blackish Silver & Metallic Platinum Theme
  
  const styles = `
    :root {
      --token-f50a08ee-89ba-45ba-bd59-521f4e9cdc51: #050507 !important;
      --token-0c62d1bb-1ac3-4cd6-8f0f-8ee3950e02c0: #0C0C0E !important;
      --token-67527bae-cc15-4839-8636-c9b28351e4d7: #1A1A20 !important;
    }

    html, body, html body {
      background-color: #050507 !important;
      background: #050507 !important;
      color: #ffffff !important;
    }

    [data-framer-root],
    #main,
    .framer-DvMIA,
    .framer-1iwpgy7,
    #hero,
    #services,
    #about,
    #contact,
    section[class*="framer-"],
    div[class*="framer-"] {
      background-color: transparent !important;
      background: transparent !important;
    }

    .glb-reviews-native-wrapper, 
    .glb-home-blogs, 
    .glb-location-section, 
    .glb-skills-section,
    .glb-footer {
      background: rgba(12, 12, 16, 0.85) !important;
      backdrop-filter: blur(16px) !important;
      -webkit-backdrop-filter: blur(16px) !important;
      border-top: 1px solid rgba(255, 255, 255, 0.08) !important;
    }

    .framer-1l7inir,
    .glb-review-card-premium, 
    .glb-home-blog-card, 
    .glb-contact-card,
    .glb-skill-card {
      background: rgba(18, 18, 24, 0.85) !important;
      backdrop-filter: blur(14px) !important;
      border: 1px solid rgba(255, 255, 255, 0.12) !important;
      box-shadow: inset 0px 1px 0px 0px rgba(255, 255, 255, 0.12), 0 10px 30px rgba(0, 0, 0, 0.6) !important;
    }
  `;

  const styleEl = document.createElement('style');
  styleEl.innerHTML = styles;
  document.head.appendChild(styleEl);
})();
