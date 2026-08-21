(function() {
  'use strict';

  // ─────────────────────────────────────────────────────────────
  // GLOBAL LOGIC MEDIA — Premium 3D Interactive Brand Emblem
  // ─────────────────────────────────────────────────────────────

  var scene, camera, renderer, cardGroup, cardMesh, particlesMesh;
  var mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
  var isHovered = false;
  var scrollY = window.scrollY;
  var initialized = false;

  function ensureThree(callback) {
    if (window.THREE) {
      callback();
      return;
    }
    var script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
    script.onload = callback;
    document.head.appendChild(script);
  }

  // 1. High-Definition Front Texture (Deep Obsidian + Crimson + Gold + Crisp Typography)
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
    rGlow.addColorStop(0, 'rgba(255, 23, 68, 0.40)');
    rGlow.addColorStop(0.7, 'rgba(255, 23, 68, 0.06)');
    rGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = rGlow;
    ctx.fillRect(0, 0, 1024, 1024);

    // Gold Outer & Inner Borders
    ctx.strokeStyle = '#ffc72c';
    ctx.lineWidth = 6;
    ctx.strokeRect(36, 36, 952, 952);

    ctx.strokeStyle = 'rgba(255, 199, 44, 0.35)';
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
    ctx.shadowBlur = 25;

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
    ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
    ctx.font = '600 22px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('EST. 2019  •  LUCKNOW, INDIA', 512, 910);

    // Overlay real logo.png if loaded
    var logoImg = new Image();
    logoImg.crossOrigin = 'anonymous';
    logoImg.onload = function() {
      ctx.drawImage(logoImg, 140, 240, 744, 544);
      if (cardMesh && cardMesh.material && cardMesh.material[4] && cardMesh.material[4].map) {
        cardMesh.material[4].map.needsUpdate = true;
      }
    };
    logoImg.src = '/logo.png';

    var tex = new THREE.CanvasTexture(cvs);
    tex.generateMipmaps = true;
    tex.minFilter = THREE.LinearMipmapLinearFilter;
    tex.magFilter = THREE.LinearFilter;
    return tex;
  }

  // 2. High-Definition Back Texture (Monogram Seal)
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

  // 3. Initialize 3D Scene
  function init3DLogo(container) {
    if (document.getElementById('glb-3d-logo-canvas')) return;
    initialized = true;

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

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(45, W / H, 0.1, 100);
    camera.position.set(0, 0, 5.4);

    renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;

    cardGroup = new THREE.Group();
    scene.add(cardGroup);

    // Studio Lighting
    scene.add(new THREE.AmbientLight(0xffffff, 0.85));

    var keyLight = new THREE.DirectionalLight(0xffffff, 1.2);
    keyLight.position.set(4, 5, 5);
    scene.add(keyLight);

    var goldFill = new THREE.PointLight(0xffc72c, 2.5, 12);
    goldFill.position.set(-3, 3, 4);
    scene.add(goldFill);

    var redRim = new THREE.PointLight(0xff1744, 3.0, 12);
    redRim.position.set(2, -3, 3);
    scene.add(redRim);

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

    cardMesh = new THREE.Mesh(new THREE.BoxGeometry(3.3, 3.3, 0.16), materials);
    cardGroup.add(cardMesh);

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
      cardGroup.add(b);
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
    particlesMesh = new THREE.Points(pGeo, pMat);
    scene.add(particlesMesh);

    // Mouse events
    container.addEventListener('mousemove', function(e) {
      var rect = container.getBoundingClientRect();
      var x = e.clientX - rect.left;
      var y = e.clientY - rect.top;
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
      var cur = window.scrollY;
      var diff = cur - scrollY;
      if (cardGroup) {
        cardGroup.rotation.y += diff * 0.003;
      }
      scrollY = cur;
    }, { passive: true });

    var ro = new ResizeObserver(function() {
      var w = container.clientWidth;
      var h = container.clientHeight;
      if (w && h) {
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      }
    });
    ro.observe(container);

    animate();
  }

  // 4. Animation Loop
  var clock = 0;
  function animate() {
    requestAnimationFrame(animate);
    if (!cardGroup) return;

    clock += 0.016;

    mouse.x += (mouse.targetX - mouse.x) * 0.08;
    mouse.y += (mouse.targetY - mouse.y) * 0.08;

    if (isHovered) {
      // Direct mouse tracking tilt
      var targetRotY = mouse.x * 0.85;
      var targetRotX = mouse.y * 0.65;
      cardGroup.rotation.y += (targetRotY - cardGroup.rotation.y) * 0.08;
      cardGroup.rotation.x += (targetRotX - cardGroup.rotation.x) * 0.08;
      cardGroup.rotation.z = -mouse.x * 0.15;
    } else {
      // Idle elegant floating & wobble
      var idleRotY = Math.sin(clock * 0.8) * 0.28;
      var idleRotX = Math.cos(clock * 0.6) * 0.12;
      cardGroup.rotation.y += (idleRotY - cardGroup.rotation.y) * 0.05;
      cardGroup.rotation.x += (idleRotX - cardGroup.rotation.x) * 0.05;
      cardGroup.rotation.z = Math.sin(clock * 0.5) * 0.04;
    }

    cardGroup.position.y = Math.sin(clock * 1.2) * 0.10;

    if (particlesMesh) {
      particlesMesh.rotation.y = clock * 0.05;
      particlesMesh.rotation.x = clock * 0.03;
    }

    renderer.render(scene, camera);
  }

  // 5. Injector Loop
  function checkAndReplace() {
    if (initialized && document.getElementById('glb-3d-logo-canvas')) return;

    var aboutSec = document.querySelector('[data-framer-name="about me section"]');
    if (!aboutSec) return;

    var imgWrap = aboutSec.querySelector('.framer-vbrsas') ||
                  aboutSec.querySelector('[data-framer-background-image-wrapper="true"]');
    if (!imgWrap) return;

    var img = imgWrap.querySelector('img');
    if (img) {
      img.style.opacity = '0';
      img.style.pointerEvents = 'none';
    }

    imgWrap.style.position = 'relative';
    imgWrap.style.overflow = 'visible';

    ensureThree(function() {
      init3DLogo(imgWrap);
    });
  }

  checkAndReplace();
  setInterval(checkAndReplace, 400);

})();
