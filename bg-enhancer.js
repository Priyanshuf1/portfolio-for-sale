(function() {
  // Rabto Skill Engine: Background Mesh Visibility & Transparent Glass Cards for FAQ Section
  
  const styles = `
    :root {
      --token-f50a08ee-89ba-45ba-bd59-521f4e9cdc51: #0A0E27 !important;
      --token-0c62d1bb-1ac3-4cd6-8f0f-8ee3950e02c0: rgba(255, 199, 44, 0.03) !important;
      --token-67527bae-cc15-4839-8636-c9b28351e4d7: rgba(255, 199, 44, 0.08) !important;
    }

    html, body, html body {
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

    [data-framer-root],
    #main,
    .framer-DvMIA,
    .framer-1iwpgy7,
    #hero,
    #services,
    #about,
    #contact,
    #faq,
    section[class*="framer-"],
    div[class*="framer-"] {
      background-color: transparent !important;
      background: transparent !important;
    }

    /* ── FAQ / Answers Section Background Effect Visibility ── */
    /* Strip heavy solid card background fills & box-shadows so background mesh & particles shine through */
    #faq,
    .framer-85cfdf,
    .framer-85cfdf *,
    [data-framer-name="FAQ's"],
    [data-framer-name="Answers"],
    [data-framer-name="All FAQs"] {
      background-color: transparent !important;
    }

    .framer-6o1HC,
    div[data-framer-name="Open"],
    div[data-framer-name="Closed"],
    .framer-1wjnscd-container,
    .framer-1sk946w-container,
    .framer-h63dtg-container,
    .framer-tb0yeu-container {
      background: rgba(255, 255, 255, 0.03) !important;
      backdrop-filter: blur(8px) !important;
      -webkit-backdrop-filter: blur(8px) !important;
      border: 1px solid rgba(255, 199, 44, 0.18) !important;
      border-radius: 16px !important;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2) !important;
      transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1) !important;
    }

    .framer-6o1HC:hover,
    div[data-framer-name="Open"]:hover,
    div[data-framer-name="Closed"]:hover {
      background: rgba(255, 255, 255, 0.07) !important;
      border-color: rgba(255, 199, 44, 0.45) !important;
      box-shadow: 0 0 25px rgba(255, 199, 44, 0.2) !important;
    }

    .glb-reviews-native-wrapper, 
    .glb-home-blogs, 
    .glb-location-section, 
    .glb-skills-section,
    .glb-footer {
      background: rgba(10, 14, 39, 0.65) !important;
      backdrop-filter: blur(16px) !important;
      -webkit-backdrop-filter: blur(16px) !important;
      border-top: 1px solid rgba(255, 199, 44, 0.15) !important;
    }

    .glb-review-card-premium, 
    .glb-home-blog-card, 
    .glb-contact-card,
    .glb-skill-card {
      background: rgba(255, 255, 255, 0.03) !important;
      backdrop-filter: blur(12px) !important;
      -webkit-backdrop-filter: blur(12px) !important;
      border: 1px solid rgba(255, 199, 44, 0.18) !important;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4) !important;
    }
  `;

  const styleEl = document.createElement('style');
  styleEl.innerHTML = styles;
  document.head.appendChild(styleEl);
})();
