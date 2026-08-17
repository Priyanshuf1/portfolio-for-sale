(function() {
  // Rabto Skill Engine: creative-web-art-direction & background-aware-contrast-compositing
  
  const styles = `
    /* Global Rich Atmospheric Background */
    html, body {
      background-color: #070710 !important;
      background-image: 
        radial-gradient(at 10% 10%, rgba(124, 58, 237, 0.18) 0px, transparent 45%),
        radial-gradient(at 90% 15%, rgba(6, 182, 212, 0.14) 0px, transparent 45%),
        radial-gradient(at 50% 60%, rgba(16, 185, 129, 0.08) 0px, transparent 50%),
        radial-gradient(at 85% 85%, rgba(212, 175, 55, 0.08) 0px, transparent 45%),
        radial-gradient(at 15% 85%, rgba(236, 72, 153, 0.1) 0px, transparent 45%) !important;
      background-attachment: fixed !important;
      background-size: cover !important;
      color: #ffffff !important;
    }

    /* Update Native Sections to Glassmorphic Translucent Dark Surfaces */
    .glb-reviews-native-wrapper, 
    .glb-home-blogs, 
    .glb-location-section, 
    .glb-footer {
      background: rgba(10, 10, 18, 0.65) !important;
      backdrop-filter: blur(16px) !important;
      -webkit-backdrop-filter: blur(16px) !important;
      border-top: 1px solid rgba(255, 255, 255, 0.08) !important;
    }

    /* Floating Glowing Ambient Orbs in Background */
    .rabto-ambient-orb-1 {
      position: fixed;
      top: 15%;
      left: -5%;
      width: 450px;
      height: 450px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(124, 58, 237, 0.25) 0%, transparent 70%);
      filter: blur(90px);
      pointer-events: none;
      z-index: 0;
      animation: floatOrb1 18s ease-in-out infinite alternate;
    }

    .rabto-ambient-orb-2 {
      position: fixed;
      bottom: 20%;
      right: -5%;
      width: 500px;
      height: 500px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(6, 182, 212, 0.2) 0%, transparent 70%);
      filter: blur(100px);
      pointer-events: none;
      z-index: 0;
      animation: floatOrb2 22s ease-in-out infinite alternate;
    }

    @keyframes floatOrb1 {
      0% { transform: translate(0, 0) scale(1); }
      100% { transform: translate(80px, 60px) scale(1.15); }
    }

    @keyframes floatOrb2 {
      0% { transform: translate(0, 0) scale(1); }
      100% { transform: translate(-70px, -80px) scale(1.12); }
    }
  `;

  const styleEl = document.createElement('style');
  styleEl.innerHTML = styles;
  document.head.appendChild(styleEl);

  function injectOrbs() {
    if (!document.querySelector('.rabto-ambient-orb-1')) {
      const orb1 = document.createElement('div');
      orb1.className = 'rabto-ambient-orb-1';
      document.body.appendChild(orb1);

      const orb2 = document.createElement('div');
      orb2.className = 'rabto-ambient-orb-2';
      document.body.appendChild(orb2);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectOrbs);
  } else {
    injectOrbs();
  }
})();
