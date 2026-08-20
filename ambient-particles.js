(function() {
  // Destinyland-Style Interactive Shiny Red Constellation & Node-Link Background Animation
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return;

  const canvas = document.createElement('canvas');
  canvas.id = 'rabto-ambient-canvas';
  canvas.style.cssText = 'position:fixed;top:0;left:0;width:100vw;height:100vh;pointer-events:none;z-index:0;opacity:0.9;';
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  // Track Mouse Position for Destinyland-style interactivity
  const mouse = {
    x: -1000,
    y: -1000,
    radius: 220
  };

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener('mouseleave', () => {
    mouse.x = -1000;
    mouse.y = -1000;
  });

  // Click to spawn dynamic shiny red constellation nodes
  window.addEventListener('click', (e) => {
    if (e.target.closest('a, button, input, textarea, iframe')) return;
    for (let i = 0; i < 5; i++) {
      particles.push(new ConstellationParticle(e.clientX + (Math.random() - 0.5) * 40, e.clientY + (Math.random() - 0.5) * 40, true));
      if (particles.length > maxParticles + 20) particles.shift();
    }
  });

  const maxParticles = Math.min(85, Math.floor((width * height) / 13000));
  const particles = [];
  const maxDistance = 165;

  // Shiny Crimson & Metallic Red Color Palette
  const colors = [
    { r: 255, g: 23,  b: 68  }, // Shiny Crimson Red (#FF1744)
    { r: 255, g: 82,  b: 82  }, // Bright Ruby Red (#FF5252)
    { r: 213, g: 0,   b: 0   }, // Deep Metallic Red (#D50000)
    { r: 255, g: 138, b: 128 }  // Glow Light Red (#FF8A80)
  ];

  class ConstellationParticle {
    constructor(x = null, y = null, isSpawned = false) {
      this.reset(x, y, isSpawned);
    }

    reset(x = null, y = null, isSpawned = false) {
      this.x = x !== null ? x : Math.random() * width;
      this.y = y !== null ? y : Math.random() * height;
      this.vx = (Math.random() - 0.5) * 1.2;
      this.vy = (Math.random() - 0.5) * 1.2;
      this.radius = Math.random() * 2.4 + 1.2;
      this.colorObj = colors[Math.floor(Math.random() * colors.length)];
      this.baseAlpha = Math.random() * 0.45 + 0.4;
      this.alpha = this.baseAlpha;
      this.isSpawned = isSpawned;
      this.pulseSpeed = Math.random() * 0.03 + 0.01;
      this.angle = Math.random() * Math.PI * 2;
    }

    update() {
      // Pulse opacity
      this.angle += this.pulseSpeed;
      this.alpha = this.baseAlpha + Math.sin(this.angle) * 0.2;

      // Mouse Repulse & Interactive Bend (Destinyland Physics)
      const dx = mouse.x - this.x;
      const dy = mouse.y - this.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < mouse.radius && dist > 0) {
        const force = (mouse.radius - dist) / mouse.radius;
        const angle = Math.atan2(dy, dx);
        const repulseX = Math.cos(angle) * force * 4.8;
        const repulseY = Math.sin(angle) * force * 4.8;

        this.x -= repulseX;
        this.y -= repulseY;
      } else {
        this.x += this.vx;
        this.y += this.vy;
      }

      // Screen Wrapping / Boundary Bouncing
      if (this.x < -20) this.x = width + 20;
      if (this.x > width + 20) this.x = -20;
      if (this.y < -20) this.y = height + 20;
      if (this.y > height + 20) this.y = -20;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${this.colorObj.r}, ${this.colorObj.g}, ${this.colorObj.b}, ${Math.max(0, this.alpha)})`;
      ctx.shadowBlur = 10;
      ctx.shadowColor = `rgba(${this.colorObj.r}, ${this.colorObj.g}, ${this.colorObj.b}, 0.95)`;
      ctx.fill();
      ctx.shadowBlur = 0;
    }
  }

  // Populate initial constellation nodes
  for (let i = 0; i < maxParticles; i++) {
    particles.push(new ConstellationParticle());
  }

  // Draw Destinyland-style connecting constellation lines in Shiny Red
  function drawConstellationLines() {
    const pLength = particles.length;
    for (let i = 0; i < pLength; i++) {
      for (let j = i + 1; j < pLength; j++) {
        const p1 = particles[i];
        const p2 = particles[j];
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < maxDistance) {
          const lineAlpha = (1 - dist / maxDistance) * 0.42;
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          
          const grad = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y);
          grad.addColorStop(0, `rgba(${p1.colorObj.r}, ${p1.colorObj.g}, ${p1.colorObj.b}, ${lineAlpha})`);
          grad.addColorStop(1, `rgba(${p2.colorObj.r}, ${p2.colorObj.g}, ${p2.colorObj.b}, ${lineAlpha})`);

          ctx.strokeStyle = grad;
          ctx.lineWidth = 1.0;
          ctx.stroke();
        }
      }

      // Connect nodes to mouse cursor in Shiny Red (Interactive Mouse Tethering)
      if (mouse.x > 0 && mouse.y > 0) {
        const p = particles[i];
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouse.radius) {
          const tetherAlpha = (1 - dist / mouse.radius) * 0.55;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(255, 23, 68, ${tetherAlpha})`;
          ctx.lineWidth = 1.2;
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    drawConstellationLines();

    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();
    }

    requestAnimationFrame(animate);
  }

  animate();
})();
