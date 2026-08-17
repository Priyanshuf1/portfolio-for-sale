(function() {
  // Rabto Skill Engine: gsap-splittext-choreography, anime-title-impact-animation & 3D Tilt Box FX
  
  const styles = `
    /* Refined Color Palette & Typography Tokens */
    :root {
      --rabto-bg: #070709;
      --rabto-card-bg: rgba(18, 18, 26, 0.7);
      --rabto-border: rgba(255, 255, 255, 0.08);
      --rabto-accent-gold: #D4AF37;
      --rabto-accent-purple: #8B5CF6;
      --rabto-accent-cyan: #06B6D4;
      --rabto-glow-shadow: 0 10px 40px -10px rgba(139, 92, 246, 0.3);
    }

    /* 3D Tilt & Spotlight Card Base */
    .rabto-tilt-card {
      transform-style: preserve-3d;
      perspective: 1000px;
      transition: transform 0.15s cubic-bezier(0.2, 0, 0.2, 1), border-color 0.3s ease, box-shadow 0.3s ease;
      position: relative;
      overflow: hidden;
    }

    /* Spotlight Glare Effect on Cards */
    .rabto-spotlight-glare {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      background: radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255, 255, 255, 0.08), transparent 40%);
      border-radius: inherit;
      z-index: 2;
      opacity: 0;
      transition: opacity 0.3s ease;
    }
    .rabto-tilt-card:hover .rabto-spotlight-glare {
      opacity: 1;
    }

    /* Card Glow & Border Highlight */
    .rabto-tilt-card:hover {
      border-color: rgba(139, 92, 246, 0.4) !important;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.7), 0 0 25px rgba(139, 92, 246, 0.25) !important;
    }

    /* Kinetic Text Reveal Classes */
    .rabto-text-reveal {
      opacity: 0;
      transform: translateY(30px);
      transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .rabto-text-reveal.is-visible {
      opacity: 1;
      transform: translateY(0);
    }

    /* Glowing Text Gradient Mask */
    .rabto-gradient-heading {
      background: linear-gradient(135deg, #FFFFFF 0%, #E2E8F0 40%, #8B5CF6 80%, #06B6D4 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    /* Button Pulse Animation */
    .glb-admin-submit, .glb-home-blogs-btn, .glb-contact-card-action {
      position: relative;
      overflow: hidden;
    }
    .glb-admin-submit::after, .glb-home-blogs-btn::after {
      content: '';
      position: absolute;
      top: -50%;
      left: -50%;
      width: 200%;
      height: 200%;
      background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.15), transparent);
      transform: rotate(45deg) translateY(-100%);
      transition: transform 0.6s ease;
    }
    .glb-admin-submit:hover::after, .glb-home-blogs-btn:hover::after {
      transform: rotate(45deg) translateY(100%);
    }
  `;

  const styleEl = document.createElement('style');
  styleEl.innerHTML = styles;
  document.head.appendChild(styleEl);

  // 1. Interactive 3D Card Tilt & Mouse Spotlight Effect
  function init3DTiltCards() {
    const cards = document.querySelectorAll('.glb-review-card-premium, .glb-home-blog-card, .glb-contact-card, .glb-map-container-box');
    
    cards.forEach(card => {
      card.classList.add('rabto-tilt-card');
      
      // Ensure spotlight glare layer exists
      if (!card.querySelector('.rabto-spotlight-glare')) {
        const glare = document.createElement('div');
        glare.className = 'rabto-spotlight-glare';
        card.appendChild(glare);
      }

      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = ((y - centerY) / centerY) * -7; // Max tilt 7deg
        const rotateY = ((x - centerX) / centerX) * 7;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
      });
    });
  }

  // 2. Kinetic Scroll-Triggered Text Reveal
  function initScrollTextReveals() {
    const headings = document.querySelectorAll('.glb-reviews-title-wrap h2, .glb-reviews-title-wrap p, .glb-home-blogs-header h2, .glb-home-blogs-header p, .glb-location-header h2, .glb-location-header p');
    
    headings.forEach(el => {
      el.classList.add('rabto-text-reveal');
    });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    }, { threshold: 0.15 });

    headings.forEach(el => observer.observe(el));
  }

  // Initialize FX Loop
  function initRabtoFX() {
    init3DTiltCards();
    initScrollTextReveals();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => setTimeout(initRabtoFX, 500));
  } else {
    setTimeout(initRabtoFX, 500);
  }
})();
