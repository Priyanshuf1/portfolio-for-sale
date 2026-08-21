(function() {
  'use strict';

  // ─────────────────────────────────────────────────────────────
  // GLOBAL LOGIC MEDIA — Premium 3D Interactive Brand Emblem
  // ─────────────────────────────────────────────────────────────

  let scene, camera, renderer, cardGroup, cardMesh, particlesMesh;
  let mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
  let isHovered = false;
  let scrollY = window.scrollY;
  let initialized = false;

  // 1. Generate High-Definition Card Face Texture
  function createFrontTexture() {
    const cvs = document.createElement('canvas');
    cvs.width = 1024;
    cvs.height = 1024;
    const ctx = cvs.getContext('2d');

    // Deep Obsidian Card Base
    const bgGrad = ctx.createRadialGradient(512, 512, 50, 512, 512, 600);
    bgGrad.addColorStop(0, '#1c1c28');
    bgGrad.addColorStop(0.5, '#12121b');
    bgGrad.addColorStop(1, '#09090f');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, 1024, 1024);

    // Subtle Brand Red Backlight Glow
    const redGlow = ctx.createRadialGradient(380, 512, 0, 380, 512, 350);
    redGlow.addColorStop(0, 'rgba(255, 23, 68, 0.35)');
    redGlow.addColorStop(0.5, 'rgba(255, 23, 68, 0.08)');
    redGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = redGlow;
    ctx.fillRect(0, 0, 1024, 1024);

    // Gold Inner Border Frame
    ctx.strokeStyle = 'rgba(255, 199, 44, 0.45)';
    ctx.lineWidth = 4;
    ctx.strokeRect(40, 40, 944, 944);

    ctx.strokeStyle = 'rgba(255, 199, 44, 0.15)';
    ctx.lineWidth = 1;
    ctx.strokeRect(52, 52, 920, 920);

    // Corner Accents (Gold L-brackets)
    ctx.strokeStyle = '#ffc72c';
    ctx.lineWidth = 6;
    const cl = 40; // corner length
    // Top-Left
    ctx.beginPath(); ctx.moveTo(40, 40 + cl); ctx.lineTo(40, 40); ctx.lineTo(40 + cl, 40); ctx.stroke();
    // Top-Right
    ctx.beginPath(); ctx.moveTo(984 - cl, 40); ctx.lineTo(984, 40); ctx.lineTo(984, 40 + cl); ctx.stroke();
    // Bottom-Left
    ctx.beginPath(); ctx.moveTo(40, 984 - cl); ctx.lineTo(40, 984); ctx.lineTo(40 + cl, 984); ctx.stroke();
    // Bottom-Right
    ctx.beginPath(); ctx.moveTo(984 - cl, 984); ctx.lineTo(984, 984); ctx.lineTo(984, 984 - cl); ctx.stroke();

    // Top Brand Tag
    ctx.fillStyle = '#ffc72c';
    ctx.font = 'bold 22px "Plus Jakarta Sans", "Syne", sans-serif';
    ctx.textAlign = 'center';
    ctx.letterSpacing = '6px';
    ctx.fillText('GLOBAL LOGIC MEDIA', 512, 110);

    // Draw the Red Geometric Logo + White Typography
    // Logo Icon: Red G-frame with play triangle
    // Left Red Bracket
    ctx.fillStyle = '#FF1744';
    ctx.shadowColor = '#FF1744';
    ctx.shadowBlur = 25;

    // Outer Red Triangle/G Icon
    ctx.beginPath();
    ctx.moveTo(220, 310);
    ctx.lineTo(450, 450);
    ctx.lineTo(450, 500);
    ctx.lineTo(390, 540);
    ctx.lineTo(390, 470);
    ctx.lineTo(260, 390);
    ctx.lineTo(260, 630);
    ctx.lineTo(390, 550);
    ctx.lineTo(450, 590);
    ctx.lineTo(450, 640);
    ctx.lineTo(220, 780);
    ctx.closePath();
    ctx.fill();

    // Red Center Play Triangle
    ctx.beginPath();
    ctx.moveTo(330, 465);
    ctx.lineTo(410, 515);
    ctx.lineTo(330, 565);
    ctx.closePath();
    ctx.fill();

    // Reset Shadow for Text
    ctx.shadowColor = 'rgba(0,0,0,0)';
    ctx.shadowBlur = 0;

    // Brand Name Typography on Right
    ctx.fillStyle = '#ffffff';
    ctx.font = '900 68px "Syne", "Plus Jakarta Sans", sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('GLOBAL', 485, 470);
    ctx.fillText('LOGIC', 485, 545);
    ctx.fillText('MEDIA', 485, 620);

    // Bottom Badge
    ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
    ctx.font = '600 20px "Plus Jakarta Sans", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('EST. 2019  •  LUCKNOW, INDIA', 512, 910);

    // Overlay real logo.png if loaded to ensure 100% vector accuracy
    const logoImg = new Image();
    logoImg.crossOrigin = 'anonymous';
    logoImg.onload = function() {
      // Draw actual logo sharply in the center area
      ctx.drawImage(logoImg, 140, 240, 744, 544);
      if (cardMesh && cardMesh.material && cardMesh.material[4]) {
        cardMesh.material[4].map.needsUpdate = true;
      }
    };
    logoImg.src = '/logo.png';

    const tex = new THREE.CanvasTexture(cvs);
    tex.generateMipmaps = true;
    tex.minFilter = THREE.LinearMipmapLinearFilter;
    tex.magFilter = THREE.LinearFilter;
    return tex;
  }

  // 2. Generate Back Face Texture (Luxury Monogram Seal)
  function createBackTexture() {
    const cvs = document.createElement('canvas');
    cvs.width = 1024;
    cvs.height = 1024;
    const ctx = cvs.getContext('2d');

    // Dark brushed metal background
    const bgGrad = ctx.createLinearGradient(0, 0, 1024, 1024);
    bgGrad.addColorStop(0, '#0e0e16');
    bgGrad.addColorStop(0.5, '#161622');
    bgGrad.addColorStop(1, '#09090f');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, 1024, 1024);

    // Gold Outer Circle Seal
    ctx.strokeStyle = 'rgba(255, 199, 44, 0.6)';
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.arc(512, 512, 340, 0, Math.PI * 2);
    ctx.stroke();

    ctx.strokeStyle = 'rgba(255, 199, 44, 0.2)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(512, 512, 360, 0, Math.PI * 2);
    ctx.stroke();

    // Crimson Glow Behind Monogram
    const redGlow = ctx.createRadialGradient(512, 512, 0, 512, 512, 250);
    redGlow.addColorStop(0, 'rgba(255, 23, 68, 0.4)');
    redGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = redGlow;
    ctx.fillRect(0, 0, 1024, 1024);

    // Gold Monogram "GLM"
    ctx.fillStyle = '#ffc72c';
    ctx.font = '900 130px "Syne", "Plus Jakarta Sans", sans-serif';
    ctx.textAlign = 'center';
    ctx.shadowColor = 'rgba(255, 199, 44, 0.6)';
    ctx.shadowBlur = 30;
    ctx.fillText('GLM', 512, 555);

    ctx.shadowColor = 'rgba(0,0,0,0)';
    ctx.shadowBlur = 0;

    // Subtitles
    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.font = '600 24px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('DIGITAL MARKETING & PERFORMANCE', 512, 640);

    ctx.fillStyle = '#FF1744';
    ctx.font = 'bold 20px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('WWW.GLOBALLOGICMEDIA.COM', 512, 685);

    const tex = new THREE.CanvasTexture(cvs);
    tex.generateMipmaps = true;
    tex.minFilter = THREE.LinearMipmapLinearFilter;
    return tex;
  }

  // 3. Initialize 3D Scene
  function init3DLogo(container) {
    if (document.getElementById('glb-3d-logo-canvas')) return;
    initialized = true;

    // Setup Canvas
    canvas = document.createElement('canvas');
    canvas.id = 'glb-3d-logo-canvas';
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = '5';
    canvas.style.borderRadius = '16px';
    canvas.style.pointerEvents = 'auto';
    container.appendChild(canvas);

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 600;

    // Scene
    scene = new THREE.Scene();

    // Camera
    camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 6.2);

    // Renderer with HDR tone mapping
    renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;

    // Root Group
    cardGroup = new THREE.Group();
    scene.add(cardGroup);

    // Lighting (Golden Spotlight + Studio White + Red Ambient Rim)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const spotLight = new THREE.SpotLight(0xffc72c, 6, 20, Math.PI / 3, 0.4, 1);
    spotLight.position.set(3, 4, 6);
    scene.add(spotLight);

    const rimLight = new THREE.DirectionalLight(0xffffff, 2.0);
    rimLight.position.set(-4, 3, 5);
    scene.add(rimLight);

    const redRim = new THREE.PointLight(0xff1744, 4, 15);
    redRim.position.set(0, -3, 3);
    scene.add(redRim);

    // Materials
    const frontTex = createFrontTexture();
    const backTex = createBackTexture();

    const frontMat = new THREE.MeshPhysicalMaterial({
      map: frontTex,
      roughness: 0.15,
      metalness: 0.65,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      reflectivity: 0.9
    });

    const backMat = new THREE.MeshPhysicalMaterial({
      map: backTex,
      roughness: 0.2,
      metalness: 0.75,
      clearcoat: 0.8,
      clearcoatRoughness: 0.15
    });

    const goldEdgeMat = new THREE.MeshStandardMaterial({
      color: 0xffc72c,
      roughness: 0.18,
      metalness: 0.95,
      emissive: 0xffa500,
      emissiveIntensity: 0.25
    });

    // 3D Card Geometry: [right, left, top, bottom, front, back]
    const cardGeo = new THREE.BoxGeometry(3.6, 3.6, 0.16);
    const materials = [
      goldEdgeMat, // right
      goldEdgeMat, // left
      goldEdgeMat, // top
      goldEdgeMat, // bottom
      frontMat,    // front (+Z)
      backMat      // back (-Z)
    ];

    cardMesh = new THREE.Mesh(cardGeo, materials);
    cardGroup.add(cardMesh);

    // Beveled Outer Gold Wireframe Frame
    const frameGeo = new THREE.BoxGeometry(3.68, 3.68, 0.18);
    const frameMat = new THREE.MeshStandardMaterial({
      color: 0xffc72c,
      wireframe: false,
      roughness: 0.1,
      metalness: 1.0
    });
    // Add thin gold trim bars
    const trims = [
      { s: [3.72, 0.05, 0.24], p: [0, 1.84, 0] },
      { s: [3.72, 0.05, 0.24], p: [0, -1.84, 0] },
      { s: [0.05, 3.68, 0.24], p: [-1.84, 0, 0] },
      { s: [0.05, 3.68, 0.24], p: [1.84, 0, 0] }
    ];
    trims.forEach(t => {
      const bar = new THREE.Mesh(new THREE.BoxGeometry(t.s[0], t.s[1], t.s[2]), frameMat);
      bar.position.set(t.p[0], t.p[1], t.p[2]);
      cardGroup.add(bar);
    });

    // 4. Ambient Sparkles / Embers
    const particleCount = 45;
    const pGeo = new THREE.BufferGeometry();
    const pPos = new Float32Array(particleCount * 3);
    const pScales = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      pPos[i * 3 + 0] = (Math.random() - 0.5) * 6.5;
      pPos[i * 3 + 1] = (Math.random() - 0.5) * 6.5;
      pPos[i * 3 + 2] = (Math.random() - 0.5) * 3.5;
      pScales[i] = Math.random();
    }
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));

    const pMat = new THREE.PointsMaterial({
      color: 0xffc72c,
      size: 0.06,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending
    });
    particlesMesh = new THREE.Points(pGeo, pMat);
    scene.add(particlesMesh);

    // 5. Event Listeners
    container.addEventListener('mousemove', function(e) {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      mouse.targetX = ((x / rect.width) * 2 - 1) * 0.75;
      mouse.targetY = -((y / rect.height) * 2 - 1) * 0.75;
      isHovered = true;
    });

    container.addEventListener('mouseleave', function() {
      mouse.targetX = 0;
      mouse.targetY = 0;
      isHovered = false;
    });

    window.addEventListener('scroll', function() {
      const cur = window.scrollY;
      const diff = cur - scrollY;
      if (cardGroup) {
        cardGroup.rotation.y += diff * 0.003;
      }
      scrollY = cur;
    }, { passive: true });

    const ro = new ResizeObserver(function() {
      const w = container.clientWidth;
      const h = container.clientHeight;
      if (w && h) {
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      }
    });
    ro.observe(container);

    animate();
  }

  // 6. 60 FPS Render Loop
  let clock = 0;
  function animate() {
    requestAnimationFrame(animate);
    if (!cardGroup) return;

    clock += 0.016;

    // Smooth inertia lerp towards mouse target
    mouse.x += (mouse.targetX - mouse.x) * 0.08;
    mouse.y += (mouse.targetY - mouse.y) * 0.08;

    if (isHovered) {
      // Dynamic mouse tracking: tilts and turns smoothly with cursor
      const targetRotY = mouse.x * 0.85;
      const targetRotX = mouse.y * 0.65;
      cardGroup.rotation.y += (targetRotY - cardGroup.rotation.y) * 0.08;
      cardGroup.rotation.x += (targetRotX - cardGroup.rotation.x) * 0.08;
      cardGroup.rotation.z = -mouse.x * 0.15;
    } else {
      // Idle Animation: Elegant floating with gentle breathing wobble
      const idleRotY = Math.sin(clock * 0.8) * 0.28;
      const idleRotX = Math.cos(clock * 0.6) * 0.12;
      cardGroup.rotation.y += (idleRotY - cardGroup.rotation.y) * 0.05;
      cardGroup.rotation.x += (idleRotX - cardGroup.rotation.x) * 0.05;
      cardGroup.rotation.z = Math.sin(clock * 0.5) * 0.04;
    }

    // Subtle Levitation Float
    cardGroup.position.y = Math.sin(clock * 1.2) * 0.12;

    // Rotate particle field slowly
    if (particlesMesh) {
      particlesMesh.rotation.y = clock * 0.05;
      particlesMesh.rotation.x = clock * 0.03;
    }

    renderer.render(scene, camera);
  }

  // 7. Injector Loop
  function checkAndReplace() {
    if (initialized) return;

    // Clean up any rogue canvases outside of the About section
    document.querySelectorAll('#glb-3d-logo-canvas').forEach(function(c) {
      if (!c.closest('[data-framer-name="about me section"]')) c.remove();
    });

    const aboutSection = document.querySelector('[data-framer-name="about me section"]');
    if (!aboutSection) return;

    const targetImg = aboutSection.querySelector('img[src*="roWFLkzHAotwSx5UxGPxpxMeA.jpg"]');
    if (!targetImg) return;

    const container = targetImg.parentElement;
    if (!container) return;

    // Hide background image so 3D model takes over
    targetImg.style.opacity = '0';
    targetImg.style.pointerEvents = 'none';

    if (window.getComputedStyle(container).position === 'static') {
      container.style.position = 'relative';
    }

    init3DLogo(container);
  }

  setInterval(checkAndReplace, 500);

})();
