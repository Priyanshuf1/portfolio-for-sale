(function() {
  // Rabto Skill Engine: anime-particle-systems (Ambient Dust Only - Mouse Sparks Removed)
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return;

  const canvas = document.createElement('canvas');
  canvas.id = 'rabto-ambient-canvas';
  canvas.style.cssText = 'position:fixed;top:0;left:0;width:100vw;height:100vh;pointer-events:none;z-index:1;opacity:0.6;';
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particles = [];
  const particleCount = Math.min(35, Math.floor(width / 40));

  const colors = [
    'rgba(255, 199, 44, ',   // Cyan (#FFC72C)
    'rgba(139, 92, 246, ',  // Violet (#8B5CF6)
    'rgba(16, 185, 129, '   // Emerald (#10B981)
  ];

  class AmbientParticle {
    constructor(x = null, y = null) {
      this.reset(x, y);
    }

    reset(x = null, y = null) {
      this.x = x !== null ? x : Math.random() * width;
      this.y = y !== null ? y : Math.random() * height + height;
      this.size = Math.random() * 2 + 0.8;
      this.speedY = -(Math.random() * 0.6 + 0.2);
      this.speedX = (Math.random() - 0.5) * 0.4;
      this.colorPrefix = colors[Math.floor(Math.random() * colors.length)];
      this.alpha = Math.random() * 0.4 + 0.15;
      this.decay = Math.random() * 0.002 + 0.001;
      this.sineAngle = Math.random() * Math.PI * 2;
    }

    update() {
      this.sineAngle += 0.015;
      this.x += this.speedX + Math.sin(this.sineAngle) * 0.25;
      this.y += this.speedY;
      this.alpha -= this.decay;

      if (this.alpha <= 0 || this.y < -10 || this.x < -10 || this.x > width + 10) {
        this.reset(null, height + 10);
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = this.colorPrefix + Math.max(0, this.alpha) + ')';
      ctx.shadowBlur = 6;
      ctx.shadowColor = this.colorPrefix + '0.6)';
      ctx.fill();
      ctx.shadowBlur = 0;
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new AmbientParticle(Math.random() * width, Math.random() * height));
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();
    }

    requestAnimationFrame(animate);
  }

  animate();
})();
