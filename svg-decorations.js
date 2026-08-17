(function() {
  // SVG Path Line Accents & Clean Grid Overlay (Stripped Artificial Rainbow Effects)
  const styles = `
    .rabto-grid-bg {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      background-image: 
        linear-gradient(to right, rgba(255, 255, 255, 0.02) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
      background-size: 60px 60px;
      z-index: 1;
      opacity: 0.5;
    }

    .rabto-svg-divider {
      width: 100%;
      height: 2px;
      overflow: visible;
      margin: 30px 0;
    }
  `;

  const styleEl = document.createElement('style');
  styleEl.innerHTML = styles;
  document.head.appendChild(styleEl);

  function injectVisualAccents() {
    const sections = document.querySelectorAll('.glb-location-section, .glb-home-blogs, .glb-reviews-native-wrapper, .glb-skills-section');
    sections.forEach(sec => {
      if (!sec.querySelector('.rabto-grid-bg')) {
        const grid = document.createElement('div');
        grid.className = 'rabto-grid-bg';
        sec.style.position = 'relative';
        sec.insertBefore(grid, sec.firstChild);
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => setTimeout(injectVisualAccents, 300));
  } else {
    setTimeout(injectVisualAccents, 300);
  }
})();
