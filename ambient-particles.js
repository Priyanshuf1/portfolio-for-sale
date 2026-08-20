(function() {
  // Destinyland-Style Interactive Constellation & Node-Link Background Animation (Original Theme)
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return;

  const canvas = document.createElement('canvas');
  canvas.id = 'rabto-ambient-canvas';
  canvas.style.cssText = 'position:fixed;top:0;left:0;width:100vw;height:100vh;pointer-events:none;z-index:0;opacity:0.85;';
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

  // Click to spawn dynamic constellation nodes
  window.addEventListener('click', (e) => {
    if (e.target.closest('a, button, input, textarea, iframe')) return;
    for (let i = 0; i < 4; i++) {
      particles.push(new ConstellationParticle(e.clientX + (Math.random() - 0.5) * 40, e.clientY + (Math.random() - 0.5) * 40, true));
      if (particles.length > maxParticles + 15) particles.shift();
    }
  });

  const maxParticles = Math.min(80, Math.floor((width * height) / 14000));
  const particles = [];
  const maxDistance = 160;

  // Original Gold, Warm Cream, Silver & Deep Violet Palette
  const colors = [
    { r: 255, g: 199, b: 44 },  // Rich Gold (#FFC72C)
    { r: 255, g: 224, b: 102 }, // Soft Warm Gold (#FFE066)
    { r: 241, g: 239, b: 234 }, // Destinyland Cream (#F1EFEA)
    { r: 139, g: 92,  b: 246 }  // Deep Violet (#8B5CF6)
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
      this.radius = Math.random() * 2.2 + 1.2;
      this.colorObj = colors[Math.floor(Math.random() * colors.length)];
      this.baseAlpha = Math.random() * 0.4 + 0.35;
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
        const repulseX = Math.cos(angle) * force * 4.5;
        const repulseY = Math.sin(angle) * force * 4.5;

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
      ctx.shadowBlur = 8;
      ctx.shadowColor = `rgba(${this.colorObj.r}, ${this.colorObj.g}, ${this.colorObj.b}, 0.8)`;
      ctx.fill();
      ctx.shadowBlur = 0;
    }
  }

  // Populate initial constellation nodes
  for (let i = 0; i < maxParticles; i++) {
    particles.push(new ConstellationParticle());
  }

  // Draw Destinyland-style connecting constellation lines
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
          const lineAlpha = (1 - dist / maxDistance) * 0.35;
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          
          const grad = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y);
          grad.addColorStop(0, `rgba(${p1.colorObj.r}, ${p1.colorObj.g}, ${p1.colorObj.b}, ${lineAlpha})`);
          grad.addColorStop(1, `rgba(${p2.colorObj.r}, ${p2.colorObj.g}, ${p2.colorObj.b}, ${lineAlpha})`);

          ctx.strokeStyle = grad;
          ctx.lineWidth = 0.9;
          ctx.stroke();
        }
      }

      // Connect nodes to mouse cursor when close (Interactive Mouse Tethering)
      if (mouse.x > 0 && mouse.y > 0) {
        const p = particles[i];
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouse.radius) {
          const tetherAlpha = (1 - dist / mouse.radius) * 0.45;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(255, 199, 44, ${tetherAlpha})`;
          ctx.lineWidth = 1.1;
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
