(function() {
  // Rabto Skill Engine: svg-motion-graphics & cinematic-web-typography
  const styles = `
    /* Rabto SVG & Grid Overlay Styles */
    .rabto-grid-bg {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      background-image: 
        linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
      background-size: 60px 60px;
      z-index: 1;
      opacity: 0.6;
    }
    
    .rabto-glow-accent {
      position: absolute;
      width: 500px;
      height: 500px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(124, 58, 237, 0.15) 0%, rgba(74, 222, 128, 0.05) 50%, transparent 70%);
      filter: blur(80px);
      pointer-events: none;
      z-index: 0;
    }

    .rabto-svg-divider {
      width: 100%;
      height: 3px;
      overflow: visible;
      margin: 40px 0;
    }
    .rabto-svg-path {
      stroke: url(#rabto-gradient);
      stroke-width: 2;
      stroke-linecap: round;
      fill: none;
      stroke-dasharray: 1000;
      stroke-dashoffset: 1000;
      animation: drawPath 3s cubic-bezier(0.16, 1, 0.3, 1) forwards infinite alternate;
    }
    @keyframes drawPath {
      0% { stroke-dashoffset: 1000; }
      100% { stroke-dashoffset: 0; }
    }

    .rabto-rainbow-border {
      position: relative;
    }
    .rabto-rainbow-border::before {
      content: '';
      position: absolute;
      top: -1px; left: -1px; right: -1px; bottom: -1px;
      border-radius: inherit;
      padding: 1px;
      background: linear-gradient(135deg, #7C3AED, #4ADE80, #6366F1, #EC4899);
      -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
      -webkit-mask-composite: xor;
      mask-composite: exclude;
      opacity: 0.4;
      transition: opacity 0.3s ease;
      pointer-events: none;
    }
    .rabto-rainbow-border:hover::before {
      opacity: 1;
    }
  `;

  const styleEl = document.createElement('style');
  styleEl.innerHTML = styles;
  document.head.appendChild(styleEl);

  function injectVisualAccents() {
    // Inject subtle grid backdrops into native sections
    const sections = document.querySelectorAll('.glb-location-section, .glb-home-blogs, .glb-reviews-native-wrapper');
    sections.forEach(sec => {
      if (!sec.querySelector('.rabto-grid-bg')) {
        const grid = document.createElement('div');
        grid.className = 'rabto-grid-bg';
        sec.style.position = 'relative';
        sec.insertBefore(grid, sec.firstChild);
      }
    });

    // Add rainbow border effect to service and review cards
    const cards = document.querySelectorAll('.glb-review-card-premium, .glb-home-blog-card, .glb-contact-card');
    cards.forEach(card => {
      card.classList.add('rabto-rainbow-border');
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => setTimeout(injectVisualAccents, 400));
  } else {
    setTimeout(injectVisualAccents, 400);
  }
})();
