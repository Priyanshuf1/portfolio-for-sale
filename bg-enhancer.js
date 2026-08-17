(function() {
  // Rabto Skill Engine: Gold Mesh Theme with Liquid Platinum Silver Buttons
  
  const styles = `
    :root {
      --token-f50a08ee-89ba-45ba-bd59-521f4e9cdc51: #0A0E27 !important;
      --token-0c62d1bb-1ac3-4cd6-8f0f-8ee3950e02c0: #131840 !important;
      --token-67527bae-cc15-4839-8636-c9b28351e4d7: #1A2255 !important;
    }

    html, body, html body {
      background-color: #0A0E27 !important;
      background-image: 
        radial-gradient(at 15% 10%, rgba(212, 175, 55, 0.18) 0px, transparent 50%),
        radial-gradient(at 85% 15%, rgba(79, 70, 229, 0.25) 0px, transparent 50%),
        radial-gradient(at 50% 50%, rgba(212, 175, 55, 0.15) 0px, transparent 55%),
        radial-gradient(at 85% 85%, rgba(139, 92, 246, 0.2) 0px, transparent 50%),
        radial-gradient(at 15% 85%, rgba(16, 185, 129, 0.15) 0px, transparent 50%) !important;
      background-attachment: fixed !important;
      background-size: cover !important;
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
      background: rgba(10, 14, 39, 0.8) !important;
      backdrop-filter: blur(16px) !important;
      -webkit-backdrop-filter: blur(16px) !important;
      border-top: 1px solid rgba(212, 175, 55, 0.15) !important;
    }

    .framer-1l7inir,
    .glb-review-card-premium, 
    .glb-home-blog-card, 
    .glb-contact-card,
    .glb-skill-card {
      background: rgba(19, 24, 60, 0.8) !important;
      backdrop-filter: blur(14px) !important;
      border: 1px solid rgba(212, 175, 55, 0.18) !important;
      box-shadow: inset 0px 1px 0px 0px rgba(212, 175, 55, 0.15), 0 10px 30px rgba(0, 0, 0, 0.6) !important;
    }
  `;

  const styleEl = document.createElement('style');
  styleEl.innerHTML = styles;
  document.head.appendChild(styleEl);
})();
