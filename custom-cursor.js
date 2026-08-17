(function() {
  const isMobile = window.innerWidth <= 809 || ('ontouchstart' in window) || navigator.maxTouchPoints > 0;
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (isMobile || prefersReduced) return;

  const styles = `
    body { cursor: default; }
    
    #rabto-cursor-dot {
      position: fixed;
      top: 0; left: 0;
      width: 6px; height: 6px;
      background: #FFFFFF;
      border-radius: 50%;
      pointer-events: none;
      z-index: 99999;
      transform: translate(-50%, -50%);
      box-shadow: 0 0 12px rgba(255, 255, 255, 0.9);
      transition: transform 0.15s ease-out, background-color 0.3s ease, opacity 0.2s ease;
    }

    #rabto-cursor-ring {
      position: fixed;
      top: 0; left: 0;
      width: 32px; height: 32px;
      border: 1px solid rgba(255, 255, 255, 0.4);
      border-radius: 50%;
      pointer-events: none;
      z-index: 99998;
      transform: translate(-50%, -50%);
      transition: width 0.3s ease, height 0.3s ease, background-color 0.3s ease, border-color 0.3s ease, opacity 0.2s ease;
      box-shadow: 0 0 15px rgba(255, 255, 255, 0.1);
    }

    body.rabto-hovering #rabto-cursor-ring {
      width: 52px; height: 52px;
      background: rgba(255, 255, 255, 0.08);
      border-color: rgba(255, 255, 255, 0.85);
      box-shadow: 0 0 25px rgba(255, 255, 255, 0.3);
    }

    body.rabto-hovering #rabto-cursor-dot {
      background: #FFFFFF;
      box-shadow: 0 0 15px #FFFFFF;
      transform: translate(-50%, -50%) scale(1.4);
    }

    body.rabto-clicking #rabto-cursor-ring {
      transform: translate(-50%, -50%) scale(0.75);
    }

    body.rabto-over-iframe #rabto-cursor-dot,
    body.rabto-over-iframe #rabto-cursor-ring {
      opacity: 0 !important;
    }
  `;

  const styleEl = document.createElement('style');
  styleEl.innerHTML = styles;
  document.head.appendChild(styleEl);

  const dot = document.createElement('div');
  dot.id = 'rabto-cursor-dot';
  document.body.appendChild(dot);

  const ring = document.createElement('div');
  ring.id = 'rabto-cursor-ring';
  document.body.appendChild(ring);

  let mouseX = -100, mouseY = -100;
  let ringX = -100, ringY = -100;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX; mouseY = e.clientY;
    dot.style.left = `${mouseX}px`;
    dot.style.top = `${mouseY}px`;

    const el = document.elementFromPoint(mouseX, mouseY);
    if (el && (el.tagName === 'IFRAME' || el.closest('.glb-map-container-box'))) {
      document.body.classList.add('rabto-over-iframe');
    } else {
      document.body.classList.remove('rabto-over-iframe');
    }
  });

  function animateRing() {
    ringX += (mouseX - ringX) * 0.18;
    ringY += (mouseY - ringY) * 0.18;
    ring.style.left = `${ringX}px`;
    ring.style.top = `${ringY}px`;
    requestAnimationFrame(animateRing);
  }
  animateRing();

  document.addEventListener('mouseover', (e) => {
    if (e.target.closest('a, button, input, textarea, select, .glb-skill-card, .glb-home-blog-card, .glb-review-card-premium, .glb-contact-card')) {
      document.body.classList.add('rabto-hovering');
    }
  });

  document.addEventListener('mouseout', (e) => {
    if (e.target.closest('a, button, input, textarea, select, .glb-skill-card, .glb-home-blog-card, .glb-review-card-premium, .glb-contact-card')) {
      document.body.classList.remove('rabto-hovering');
    }
  });

  document.addEventListener('mousedown', () => document.body.classList.add('rabto-clicking'));
  document.addEventListener('mouseup', () => document.body.classList.remove('rabto-clicking'));
})();
