(function() {
  // Rabto Skill Engine: anime-particle-systems & energy-slash-and-trail-effects
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return;

  const canvas = document.createElement('canvas');
  canvas.id = 'rabto-ambient-canvas';
  canvas.style.cssText = 'position:fixed;top:0;left:0;width:100vw;height:100vh;pointer-events:none;z-index:1;opacity:0.75;';
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particles = [];
  const particleCount = Math.min(45, Math.floor(width / 35));

  const colors = [
    'rgba(124, 58, 237, ',   // Electric Violet (#7C3AED)
    'rgba(74, 222, 128, ',   // Neon Emerald (#4ADE80)
    'rgba(99, 102, 241, ',   // Indigo (#6366F1)
    'rgba(236, 72, 153, '    // Neon Pink (#EC4899)
  ];

  class Particle {
    constructor(isSpark = false, x = null, y = null) {
      this.isSpark = isSpark;
      this.reset(x, y);
    }

    reset(x = null, y = null) {
      this.x = x !== null ? x : Math.random() * width;
      this.y = y !== null ? y : Math.random() * height + height;
      this.size = this.isSpark ? Math.random() * 3 + 1.5 : Math.random() * 2.5 + 0.8;
      this.speedY = this.isSpark ? (Math.random() - 0.5) * 4 : -(Math.random() * 0.8 + 0.3);
      this.speedX = this.isSpark ? (Math.random() - 0.5) * 4 : (Math.random() - 0.5) * 0.5;
      this.colorPrefix = colors[Math.floor(Math.random() * colors.length)];
      this.alpha = this.isSpark ? 1 : Math.random() * 0.5 + 0.2;
      this.maxAlpha = this.alpha;
      this.decay = this.isSpark ? Math.random() * 0.03 + 0.015 : Math.random() * 0.002 + 0.001;
      this.sineAngle = Math.random() * Math.PI * 2;
    }

    update() {
      this.sineAngle += 0.02;
      this.x += this.speedX + Math.sin(this.sineAngle) * 0.3;
      this.y += this.speedY;
      this.alpha -= this.decay;

      if (this.alpha <= 0 || this.y < -10 || this.x < -10 || this.x > width + 10) {
        if (this.isSpark) {
          return false; // Remove spark
        } else {
          this.reset(null, height + 10);
        }
      }
      return true;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = this.colorPrefix + Math.max(0, this.alpha) + ')';
      ctx.shadowBlur = this.isSpark ? 12 : 6;
      ctx.shadowColor = this.colorPrefix + '0.8)';
      ctx.fill();
      ctx.shadowBlur = 0;
    }
  }

  // Create ambient background particles
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle(false, Math.random() * width, Math.random() * height));
  }

  // Interactive mouse sparks
  const sparks = [];
  let mouseX = -100, mouseY = -100;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (Math.random() < 0.35) {
      sparks.push(new Particle(true, mouseX, mouseY));
    }
  });

  window.addEventListener('click', (e) => {
    for (let i = 0; i < 12; i++) {
      sparks.push(new Particle(true, e.clientX, e.clientY));
    }
  });

  // Render Loop
  function animate() {
    ctx.clearRect(0, 0, width, height);

    // Update & draw ambient particles
    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();
    }

    // Update & draw sparks
    for (let i = sparks.length - 1; i >= 0; i--) {
      if (!sparks[i].update()) {
        sparks.splice(i, 1);
      } else {
        sparks[i].draw();
      }
    }

    requestAnimationFrame(animate);
  }

  animate();
})();
