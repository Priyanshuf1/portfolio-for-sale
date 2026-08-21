(function() {
  const styles = `
    html, body, html body {
      background-color: #050507 !important;
      background: #050507 !important;
      color: #ffffff !important;
    }

    #rabto-3d-canvas {
      position: fixed;
      top: 0; left: 0;
      width: 100vw; height: 100vh;
      pointer-events: none;
      z-index: 0;
      opacity: 0.85;
    }

    [data-framer-root],
    #main,
    .framer-DvMIA,
    .framer-1iwpgy7,
    #hero, #services, #about, #contact,
    section[class*="framer-"], div[class*="framer-"] {
      background-color: transparent !important;
      background: transparent !important;
    }

    /* Disable Framer grayscale on 3D logo container */
    .framer-vbrsas,
    .framer-vbrsas *,
    #glb-3d-logo-canvas,
    [data-framer-name="about me section"] .framer-vbrsas,
    [data-framer-name="about me section"] [data-framer-background-image-wrapper="true"] {
      filter: none !important;
      -webkit-filter: none !important;
    }
  `;

  const styleEl = document.createElement('style');
  styleEl.innerHTML = styles;
  document.head.appendChild(styleEl);

  function loadThreeJS(callback) {
    if (window.THREE) { callback(); return; }
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
    script.onload = callback;
    document.head.appendChild(script);
  }

  // ─────────────────────────────────────────────────────────────
  // 1. BACKGROUND SCENE (Grid Plane + Platinum Geometry + Starfield)
  // ─────────────────────────────────────────────────────────────
  function init3DScene() {
    if (!window.THREE || document.getElementById('rabto-3d-canvas')) return;

    const canvas = document.createElement('canvas');
    canvas.id = 'rabto-3d-canvas';
    document.body.appendChild(canvas);

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050507, 0.0018);

    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 400;
    camera.position.y = 100;

    const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const gridGeo = new THREE.PlaneGeometry(1600, 1600, 40, 40);
    const gridMat = new THREE.MeshBasicMaterial({
      color: 0x94A3B8,
      wireframe: true,
      transparent: true,
      opacity: 0.15
    });
    const gridMesh = new THREE.Mesh(gridGeo, gridMat);
    gridMesh.rotation.x = -Math.PI / 2;
    gridMesh.position.y = -200;
    scene.add(gridMesh);

    const shapesGroup = new THREE.Group();
    scene.add(shapesGroup);

    const geometries = [
      new THREE.IcosahedronGeometry(35, 1),
      new THREE.OctahedronGeometry(45, 0),
      new THREE.TetrahedronGeometry(40, 0)
    ];

    const shapeColors = [0xFFFFFF, 0xE2E8F0, 0x94A3B8, 0xCBD5E1];
    const shapes = [];

    for (let i = 0; i < 18; i++) {
      const geo = geometries[i % geometries.length];
      const color = shapeColors[i % shapeColors.length];
      
      const mat = new THREE.MeshBasicMaterial({
        color: color,
        wireframe: true,
        transparent: true,
        opacity: 0.28
      });

      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.x = (Math.random() - 0.5) * 1200;
      mesh.position.y = (Math.random() - 0.5) * 800;
      mesh.position.z = (Math.random() - 0.5) * 800;

      mesh.rotation.x = Math.random() * Math.PI;
      mesh.rotation.y = Math.random() * Math.PI;

      mesh.userData = {
        rotSpeedX: (Math.random() - 0.5) * 0.012,
        rotSpeedY: (Math.random() - 0.5) * 0.012,
        floatSpeed: Math.random() * 0.02 + 0.005,
        initialY: mesh.position.y
      };

      shapesGroup.add(mesh);
      shapes.push(mesh);
    }

    const particleCount = 350;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 1400;
      positions[i + 1] = (Math.random() - 0.5) * 1000;
      positions[i + 2] = (Math.random() - 0.5) * 1000;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xE2E8F0,
      size: 2,
      transparent: true,
      opacity: 0.35
    });
    const particleSystem = new THREE.Points(particleGeo, particleMat);
    scene.add(particleSystem);

    let mouseX = 0, mouseY = 0;
    let targetMouseX = 0, targetMouseY = 0;

    window.addEventListener('mousemove', (e) => {
      targetMouseX = (e.clientX - window.innerWidth / 2) * 0.5;
      targetMouseY = (e.clientY - window.innerHeight / 2) * 0.5;
    });

    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });

    let clock = new THREE.Clock();

    function animate() {
      requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      camera.position.x = mouseX * 0.8;
      camera.position.y = -mouseY * 0.8 + 100;
      camera.lookAt(0, 0, 0);

      const pos = gridGeo.attributes.position;
      for (let i = 0; i < pos.count; i++) {
        const u = pos.getX(i);
        const v = pos.getY(i);
        const z = Math.sin(u * 0.01 + elapsedTime * 1.5) * 15 + Math.cos(v * 0.01 + elapsedTime * 1.5) * 15;
        pos.setZ(i, z);
      }
      pos.needsUpdate = true;

      shapes.forEach(shape => {
        shape.rotation.x += shape.userData.rotSpeedX;
        shape.rotation.y += shape.userData.rotSpeedY;
        shape.position.y = shape.userData.initialY + Math.sin(elapsedTime * 2 + shape.position.x) * 20;
      });

      particleSystem.rotation.y = elapsedTime * 0.02;

      renderer.render(scene, camera);
    }

    animate();
  }

  // ─────────────────────────────────────────────────────────────
  // 2. INTERACTIVE 3D BRAND EMBLEM IN "MEET GLOBAL LOGIC MEDIA"
  // ─────────────────────────────────────────────────────────────
  var logoScene, logoCamera, logoRenderer, logoCardGroup, logoCardMesh, logoParticles;
  var logoMouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
  var logoIsHovered = false;
  var lastScrollY = window.scrollY;
  var logoInitialized = false;

  function createFrontTexture() {
    var cvs = document.createElement('canvas');
    cvs.width = 1024;
    cvs.height = 1024;
    var ctx = cvs.getContext('2d');

    // Obsidian base
    var bg = ctx.createRadialGradient(512, 512, 50, 512, 512, 600);
    bg.addColorStop(0, '#1c1a24');
    bg.addColorStop(0.6, '#100f16');
    bg.addColorStop(1, '#07070a');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, 1024, 1024);

    // Crimson backlight glow
    var rGlow = ctx.createRadialGradient(360, 512, 0, 360, 512, 380);
    rGlow.addColorStop(0, 'rgba(255, 23, 68, 0.45)');
    rGlow.addColorStop(0.7, 'rgba(255, 23, 68, 0.08)');
    rGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = rGlow;
    ctx.fillRect(0, 0, 1024, 1024);

    // Gold Outer & Inner Borders
    ctx.strokeStyle = '#ffc72c';
    ctx.lineWidth = 6;
    ctx.strokeRect(36, 36, 952, 952);

    ctx.strokeStyle = 'rgba(255, 199, 44, 0.4)';
    ctx.lineWidth = 2;
    ctx.strokeRect(48, 48, 928, 928);

    // Corner L-Accents
    ctx.fillStyle = '#ffc72c';
    ctx.fillRect(30, 30, 44, 12); ctx.fillRect(30, 30, 12, 44);
    ctx.fillRect(950, 30, 44, 12); ctx.fillRect(982, 30, 12, 44);
    ctx.fillRect(30, 982, 44, 12); ctx.fillRect(30, 950, 12, 44);
    ctx.fillRect(950, 982, 44, 12); ctx.fillRect(982, 950, 12, 44);

    // Top Brand Tag
    ctx.fillStyle = '#ffc72c';
    ctx.font = 'bold 24px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('GLOBAL LOGIC MEDIA', 512, 115);

    // Red Geometric Logo Icon
    ctx.fillStyle = '#FF1744';
    ctx.shadowColor = '#FF1744';
    ctx.shadowBlur = 30;

    ctx.beginPath();
    ctx.moveTo(210, 310); ctx.lineTo(440, 450); ctx.lineTo(440, 500);
    ctx.lineTo(390, 540); ctx.lineTo(390, 470); ctx.lineTo(250, 390);
    ctx.lineTo(250, 630); ctx.lineTo(390, 550); ctx.lineTo(440, 590);
    ctx.lineTo(440, 640); ctx.lineTo(210, 780);
    ctx.closePath(); ctx.fill();

    ctx.beginPath();
    ctx.moveTo(320, 465); ctx.lineTo(400, 515); ctx.lineTo(320, 565);
    ctx.closePath(); ctx.fill();

    ctx.shadowColor = 'rgba(0,0,0,0)';
    ctx.shadowBlur = 0;

    // Brand Name Typography on Right
    ctx.fillStyle = '#ffffff';
    ctx.font = '900 70px sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('GLOBAL', 480, 470);
    ctx.fillText('LOGIC', 480, 550);
    ctx.fillText('MEDIA', 480, 630);

    // Bottom Subtitle
    ctx.fillStyle = 'rgba(255, 255, 255, 0.65)';
    ctx.font = '600 22px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('EST. 2019  •  LUCKNOW, INDIA', 512, 910);

    // Overlay real logo.png if loaded
    var logoImg = new Image();
    logoImg.crossOrigin = 'anonymous';
    logoImg.onload = function() {
      ctx.drawImage(logoImg, 140, 240, 744, 544);
      if (logoCardMesh && logoCardMesh.material && logoCardMesh.material[4] && logoCardMesh.material[4].map) {
        logoCardMesh.material[4].map.needsUpdate = true;
      }
    };
    logoImg.src = '/logo.png';

    var tex = new THREE.CanvasTexture(cvs);
    tex.generateMipmaps = true;
    tex.minFilter = THREE.LinearMipmapLinearFilter;
    tex.magFilter = THREE.LinearFilter;
    return tex;
  }

  function createBackTexture() {
    var cvs = document.createElement('canvas');
    cvs.width = 1024;
    cvs.height = 1024;
    var ctx = cvs.getContext('2d');

    var bg = ctx.createLinearGradient(0, 0, 1024, 1024);
    bg.addColorStop(0, '#0e0e16');
    bg.addColorStop(0.5, '#161622');
    bg.addColorStop(1, '#09090f');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, 1024, 1024);

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

    var redGlow = ctx.createRadialGradient(512, 512, 0, 512, 512, 250);
    redGlow.addColorStop(0, 'rgba(255, 23, 68, 0.4)');
    redGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = redGlow;
    ctx.fillRect(0, 0, 1024, 1024);

    ctx.fillStyle = '#ffc72c';
    ctx.font = '900 130px sans-serif';
    ctx.textAlign = 'center';
    ctx.shadowColor = 'rgba(255, 199, 44, 0.6)';
    ctx.shadowBlur = 30;
    ctx.fillText('GLM', 512, 555);

    ctx.shadowColor = 'rgba(0,0,0,0)';
    ctx.shadowBlur = 0;

    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.font = '600 24px sans-serif';
    ctx.fillText('DIGITAL MARKETING & PERFORMANCE', 512, 640);

    ctx.fillStyle = '#FF1744';
    ctx.font = 'bold 20px sans-serif';
    ctx.fillText('WWW.GLOBALLOGICMEDIA.COM', 512, 685);

    var tex = new THREE.CanvasTexture(cvs);
    tex.generateMipmaps = true;
    tex.minFilter = THREE.LinearMipmapLinearFilter;
    return tex;
  }

  function init3DLogo(container) {
    if (document.getElementById('glb-3d-logo-canvas')) return;
    logoInitialized = true;

    var canvas = document.createElement('canvas');
    canvas.id = 'glb-3d-logo-canvas';
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = '10';
    canvas.style.borderRadius = '16px';
    canvas.style.pointerEvents = 'auto';
    container.appendChild(canvas);

    var W = container.clientWidth || 550;
    var H = container.clientHeight || 550;

    logoScene = new THREE.Scene();

    logoCamera = new THREE.PerspectiveCamera(45, W / H, 0.1, 100);
    logoCamera.position.set(0, 0, 5.4);

    logoRenderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });
    logoRenderer.setSize(W, H);
    logoRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    logoRenderer.toneMapping = THREE.ACESFilmicToneMapping;
    logoRenderer.toneMappingExposure = 1.2;

    logoCardGroup = new THREE.Group();
    logoScene.add(logoCardGroup);

    // Studio Lighting
    logoScene.add(new THREE.AmbientLight(0xffffff, 0.9));

    var keyLight = new THREE.DirectionalLight(0xffffff, 1.3);
    keyLight.position.set(4, 5, 5);
    logoScene.add(keyLight);

    var goldFill = new THREE.PointLight(0xffc72c, 2.5, 12);
    goldFill.position.set(-3, 3, 4);
    logoScene.add(goldFill);

    var redRim = new THREE.PointLight(0xff1744, 3.0, 12);
    redRim.position.set(2, -3, 3);
    logoScene.add(redRim);

    // Materials
    var frontTex = createFrontTexture();
    var backTex = createBackTexture();

    var goldMat = new THREE.MeshStandardMaterial({
      color: 0xffc72c,
      roughness: 0.18,
      metalness: 0.95,
      emissive: 0xff9900,
      emissiveIntensity: 0.15
    });

    var frontMat = new THREE.MeshPhysicalMaterial({
      map: frontTex,
      roughness: 0.15,
      metalness: 0.45,
      clearcoat: 0.9,
      clearcoatRoughness: 0.1,
      reflectivity: 0.9
    });

    var backMat = new THREE.MeshPhysicalMaterial({
      map: backTex,
      roughness: 0.2,
      metalness: 0.8,
      clearcoat: 0.7,
      clearcoatRoughness: 0.15
    });

    var materials = [
      goldMat,  // right
      goldMat,  // left
      goldMat,  // top
      goldMat,  // bottom
      frontMat, // front (+Z)
      backMat   // back (-Z)
    ];

    logoCardMesh = new THREE.Mesh(new THREE.BoxGeometry(3.3, 3.3, 0.16), materials);
    logoCardGroup.add(logoCardMesh);

    // Gold outer bevel bars
    var trims = [
      { s: [3.38, 0.04, 0.22], p: [0, 1.67, 0] },
      { s: [3.38, 0.04, 0.22], p: [0, -1.67, 0] },
      { s: [0.04, 3.34, 0.22], p: [-1.67, 0, 0] },
      { s: [0.04, 3.34, 0.22], p: [1.67, 0, 0] }
    ];
    trims.forEach(function(t) {
      var b = new THREE.Mesh(new THREE.BoxGeometry(t.s[0], t.s[1], t.s[2]), goldMat);
      b.position.set(t.p[0], t.p[1], t.p[2]);
      logoCardGroup.add(b);
    });

    // Ambient floating embers
    var pGeo = new THREE.BufferGeometry();
    var pPos = new Float32Array(40 * 3);
    for (var i = 0; i < 40; i++) {
      pPos[i * 3 + 0] = (Math.random() - 0.5) * 5.5;
      pPos[i * 3 + 1] = (Math.random() - 0.5) * 5.5;
      pPos[i * 3 + 2] = (Math.random() - 0.5) * 3;
    }
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
    var pMat = new THREE.PointsMaterial({
      color: 0xffc72c,
      size: 0.06,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending
    });
    logoParticles = new THREE.Points(pGeo, pMat);
    logoScene.add(logoParticles);

    // Mouse events
    container.addEventListener('mousemove', function(e) {
      var rect = container.getBoundingClientRect();
      var x = e.clientX - rect.left;
      var y = e.clientY - rect.top;
      logoMouse.targetX = ((x / rect.width) * 2 - 1) * 0.75;
      logoMouse.targetY = -((y / rect.height) * 2 - 1) * 0.75;
      logoIsHovered = true;
    });

    container.addEventListener('mouseleave', function() {
      logoMouse.targetX = 0;
      logoMouse.targetY = 0;
      logoIsHovered = false;
    });

    window.addEventListener('scroll', function() {
      var cur = window.scrollY;
      var diff = cur - lastScrollY;
      if (logoCardGroup) {
        logoCardGroup.rotation.y += diff * 0.003;
      }
      lastScrollY = cur;
    }, { passive: true });

    var ro = new ResizeObserver(function() {
      var w = container.clientWidth;
      var h = container.clientHeight;
      if (w && h) {
        logoCamera.aspect = w / h;
        logoCamera.updateProjectionMatrix();
        logoRenderer.setSize(w, h);
      }
    });
    ro.observe(container);

    var logoClock = 0;
    function animateLogo() {
      requestAnimationFrame(animateLogo);
      if (!logoCardGroup) return;

      logoClock += 0.016;

      logoMouse.x += (logoMouse.targetX - logoMouse.x) * 0.08;
      logoMouse.y += (logoMouse.targetY - logoMouse.y) * 0.08;

      if (logoIsHovered) {
        var targetRotY = logoMouse.x * 0.85;
        var targetRotX = logoMouse.y * 0.65;
        logoCardGroup.rotation.y += (targetRotY - logoCardGroup.rotation.y) * 0.08;
        logoCardGroup.rotation.x += (targetRotX - logoCardGroup.rotation.x) * 0.08;
        logoCardGroup.rotation.z = -logoMouse.x * 0.15;
      } else {
        var idleRotY = Math.sin(logoClock * 0.8) * 0.28;
        var idleRotX = Math.cos(logoClock * 0.6) * 0.12;
        logoCardGroup.rotation.y += (idleRotY - logoCardGroup.rotation.y) * 0.05;
        logoCardGroup.rotation.x += (idleRotX - logoCardGroup.rotation.x) * 0.05;
        logoCardGroup.rotation.z = Math.sin(logoClock * 0.5) * 0.04;
      }

      logoCardGroup.position.y = Math.sin(logoClock * 1.2) * 0.10;

      if (logoParticles) {
        logoParticles.rotation.y = logoClock * 0.05;
        logoParticles.rotation.x = logoClock * 0.03;
      }

      logoRenderer.render(logoScene, logoCamera);
    }

    animateLogo();
  }

  function checkAndMountLogo() {
    if (logoInitialized && document.getElementById('glb-3d-logo-canvas')) return;

    var aboutSec = document.querySelector('[data-framer-name="about me section"]');
    if (!aboutSec) return;

    var imgWrap = aboutSec.querySelector('.framer-vbrsas') ||
                  aboutSec.querySelector('[data-framer-background-image-wrapper="true"]');
    if (!imgWrap) {
      var img = aboutSec.querySelector('img[src*="roWFLkzHAotwSx5UxGPxpxMeA.jpg"]');
      if (img) imgWrap = img.parentElement;
    }
    if (!imgWrap) return;

    var targetImg = imgWrap.querySelector('img');
    if (targetImg) {
      targetImg.style.opacity = '0';
      targetImg.style.pointerEvents = 'none';
    }

    imgWrap.style.position = 'relative';
    imgWrap.style.overflow = 'visible';

    loadThreeJS(function() {
      init3DLogo(imgWrap);
    });
  }

  loadThreeJS(function() {
    init3DScene();
    checkAndMountLogo();
    setInterval(checkAndMountLogo, 400);
  });

})();
