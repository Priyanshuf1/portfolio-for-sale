(function() {
  // Rabto Skill Engine: Classy Ultra-Sleek Custom Cursor Ring & Dot Follower
  const isMobile = window.innerWidth <= 809 || ('ontouchstart' in window) || navigator.maxTouchPoints > 0;
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (isMobile || prefersReduced) return;

  const styles = `
    /* Classy Custom Cursor Element Styles */
    body {
      cursor: default;
    }
    
    #rabto-cursor-dot {
      position: fixed;
      top: 0;
      left: 0;
      width: 6px;
      height: 6px;
      background: #06B6D4;
      border-radius: 50%;
      pointer-events: none;
      z-index: 99999;
      transform: translate(-50%, -50%);
      box-shadow: 0 0 10px #06B6D4;
      transition: transform 0.15s ease-out, background-color 0.3s ease;
    }

    #rabto-cursor-ring {
      position: fixed;
      top: 0;
      left: 0;
      width: 34px;
      height: 34px;
      border: 1px solid rgba(6, 182, 212, 0.5);
      border-radius: 50%;
      pointer-events: none;
      z-index: 99998;
      transform: translate(-50%, -50%);
      transition: width 0.3s ease, height 0.3s ease, background-color 0.3s ease, border-color 0.3s ease, opacity 0.3s ease;
      box-shadow: 0 0 15px rgba(6, 182, 212, 0.15);
    }

    /* Hover States for Interactive Elements */
    body.rabto-hovering #rabto-cursor-ring {
      width: 54px;
      height: 54px;
      background: rgba(139, 92, 246, 0.12);
      border-color: rgba(139, 92, 246, 0.6);
      box-shadow: 0 0 25px rgba(139, 92, 246, 0.3);
    }

    body.rabto-hovering #rabto-cursor-dot {
      background: #8B5CF6;
      box-shadow: 0 0 12px #8B5CF6;
      transform: translate(-50%, -50%) scale(1.4);
    }

    /* Click Active State */
    body.rabto-clicking #rabto-cursor-ring {
      transform: translate(-50%, -50%) scale(0.75);
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
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.left = `${mouseX}px`;
    dot.style.top = `${mouseY}px`;
  });

  // Smooth lerp loop for outer ring
  function animateRing() {
    ringX += (mouseX - ringX) * 0.18;
    ringY += (mouseY - ringY) * 0.18;

    ring.style.left = `${ringX}px`;
    ring.style.top = `${ringY}px`;

    requestAnimationFrame(animateRing);
  }
  animateRing();

  // Mouse hover listeners on interactive elements
  document.addEventListener('mouseover', (e) => {
    const target = e.target.closest('a, button, input, textarea, select, .glb-skill-card, .glb-home-blog-card, .glb-review-card-premium, .glb-contact-card');
    if (target) {
      document.body.classList.add('rabto-hovering');
    }
  });

  document.addEventListener('mouseout', (e) => {
    const target = e.target.closest('a, button, input, textarea, select, .glb-skill-card, .glb-home-blog-card, .glb-review-card-premium, .glb-contact-card');
    if (target) {
      document.body.classList.remove('rabto-hovering');
    }
  });

  document.addEventListener('mousedown', () => {
    document.body.classList.add('rabto-clicking');
  });

  document.addEventListener('mouseup', () => {
    document.body.classList.remove('rabto-clicking');
  });
})();
