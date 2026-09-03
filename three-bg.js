(function() {
    const styles = `
    html, body, html body {
      background-color: #ffffff !important;
      background: #ffffff !important;
      color: #1f2937 !important;
    }

    #rabto-3d-canvas {
      position: fixed;
      top: 0; left: 0;
      width: 100vw; height: 100vh;
      pointer-events: none;
      z-index: -1;
      opacity: 0.35;
      transition: opacity 0.3s ease;
    }

    #vanta-bg-container {
      position: fixed;
      top: 0; left: 0;
      width: 100vw; height: 100vh;
      pointer-events: none;
      z-index: -1;
      opacity: 0;
      display: block;
      transition: opacity 0.3s ease;
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
  `;

  const styleEl = document.createElement('style');
  styleEl.innerHTML = styles;
  document.head.appendChild(styleEl);

  // Load Three.js dynamically
  function loadThreeJS(callback) {
    if (window.THREE) { callback(); return; }
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
    script.onload = callback;
    document.head.appendChild(script);
  }

  // Load p5.js dynamically
  function loadP5JS(callback) {
    if (window.p5) { callback(); return; }
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.9.0/p5.min.js';
    script.onload = callback;
    document.head.appendChild(script);
  }

  // Scroll opacity controller
  function updateCanvasOpacities() {
    const scrollY = window.scrollY;
    const fadeHeight = window.innerHeight * 0.8;
    
    // 3D Canvas (Disabled)
    const canvas3D = document.getElementById('rabto-3d-canvas');
    if (canvas3D) {
      canvas3D.style.opacity = 0;
      canvas3D.style.display = 'none';
    }

    // Ambient Particles Canvas (Disabled)
    const canvasAmbient = document.getElementById('rabto-ambient-canvas');
    if (canvasAmbient) {
      canvasAmbient.style.opacity = 0;
      canvasAmbient.style.display = 'none';
    }
    
    // Vanta Topology Background (Only visible on the first page / hero section, fades on scroll)
    const opacityVanta = Math.max(0, 1.0 - (scrollY / fadeHeight) * 1.0);
    const canvasVanta = document.getElementById('vanta-bg-container');
    if (canvasVanta) {
      canvasVanta.style.opacity = opacityVanta;
      canvasVanta.style.display = opacityVanta === 0 ? 'none' : 'block';
  if (vantaEffect) {
    if (opacityVanta === 0 && !vantaEffect.paused) {
      if (typeof vantaEffect.pause === 'function') vantaEffect.pause();
    } else if (opacityVanta > 0 && vantaEffect.paused) {
      if (typeof vantaEffect.play === 'function') vantaEffect.play();
    }
  }
    }
  }

  // 1. Initialize 3D Canvas (First Page)
  function init3DScene() {
    if (!window.THREE || document.getElementById('rabto-3d-canvas')) return;

    const canvas = document.createElement('canvas');
    canvas.id = 'rabto-3d-canvas';
    document.body.appendChild(canvas);

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050508, 0.0018);

    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 400;
    camera.position.y = 100;

    const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

    // Perspective Grid Plane
    const gridGeo = new THREE.PlaneGeometry(1600, 1600, 40, 40);
    const gridMat = new THREE.MeshBasicMaterial({
      color: 0x94A3B8,
      wireframe: true,
      transparent: true,
      opacity: 0.10
    });
    const gridMesh = new THREE.Mesh(gridGeo, gridMat);
    gridMesh.rotation.x = -Math.PI / 2;
    gridMesh.position.y = -200;
    scene.add(gridMesh);

    // Floating Shapes
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
        opacity: 0.18
      });

      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.x = (Math.random() - 0.5) * 1200;
      mesh.position.y = (Math.random() - 0.5) * 800;
      mesh.position.z = (Math.random() - 0.5) * 800;

      mesh.rotation.x = Math.random() * Math.PI;
      mesh.rotation.y = Math.random() * Math.PI;

      mesh.userData = {
        rotSpeedX: (Math.random() - 0.5) * 0.006,
        rotSpeedY: (Math.random() - 0.5) * 0.006,
        floatSpeed: Math.random() * 0.01 + 0.003,
        initialY: mesh.position.y
      };

      shapesGroup.add(mesh);
      shapes.push(mesh);
    }

    // Starfield Particles
    const particleCount = 250;
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
      size: 1.8,
      transparent: true,
      opacity: 0.22
    });
    const particleSystem = new THREE.Points(particleGeo, particleMat);
    scene.add(particleSystem);

    let mouseX = 0, mouseY = 0;
    let targetMouseX = 0, targetMouseY = 0;

    window.addEventListener('mousemove', (e) => {
      targetMouseX = (e.clientX - window.innerWidth / 2) * 0.3;
      targetMouseY = (e.clientY - window.innerHeight / 2) * 0.3;
    });

    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });

    let clock = new THREE.Clock();

    function animate() {
      requestAnimationFrame(animate);
      if (document.hidden) return;

      const elapsedTime = clock.getElapsedTime();

      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      camera.position.x = mouseX * 0.8;
      camera.position.y = -mouseY * 0.8 + 100;
      camera.lookAt(0, 0, 0);

      gridMesh.position.z = Math.sin(elapsedTime * 0.8) * 15;
      gridMesh.rotation.z = Math.sin(elapsedTime * 0.4) * 0.04;

      shapes.forEach(shape => {
        shape.rotation.x += shape.userData.rotSpeedX;
        shape.rotation.y += shape.userData.rotSpeedY;
        shape.position.y = shape.userData.initialY + Math.sin(elapsedTime * 1.5 + shape.position.x) * 15;
      });

      particleSystem.rotation.y = elapsedTime * 0.015;

      renderer.render(scene, camera);
    }

    animate();
  }

  // 2. Load Vanta Topology and dependencies dynamically
  function loadVantaTopology(callback) {
    const isMobile = window.innerWidth <= 767 || ('ontouchstart' in window) || navigator.maxTouchPoints > 0;
    if (isMobile) {
      console.log('[Vanta] ⚡ Skipped on mobile view to maximize performance.');
      return;
    }
    // Vanta Topology uses p5.js directly; Three.js is not needed
    loadP5JS(() => {
      if (window.VANTA && window.VANTA.TOPOLOGY) {
        callback();
        return;
      }
      const script = document.createElement('script');
      script.src = './vanta.topology.js?v=' + Date.now();
      script.onload = callback;
      document.head.appendChild(script);
    });
  }

  // 3. Initialize Vanta Topology Background Scene
  function initVantaTopology() {
    let bgContainer = document.getElementById('vanta-bg-container');
    if (!bgContainer) {
      bgContainer = document.createElement('div');
      bgContainer.id = 'vanta-bg-container';
      // Force inline style sizes to prevent 0px dimensions race condition during Vanta init
      bgContainer.style.cssText = 'position: fixed !important; top: 0 !important; left: 0 !important; width: 100vw !important; height: 100vh !important; pointer-events: none !important; z-index: -1 !important; display: block !important; background-color: #ffffff !important;';
      document.body.insertBefore(bgContainer, document.body.firstChild);
    }

    let vantaEffect = null;
    let attempts = 0;
    function startVanta() {
      if (window.VANTA && window.VANTA.TOPOLOGY) {
        try {
          vantaEffect = window.VANTA.TOPOLOGY({
            el: "#vanta-bg-container",
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: window.innerHeight || 600,
            minWidth: window.innerWidth || 800,
            scale: 3.50,
            scaleMobile: 5.50,
            color: 0x4b5563,
            backgroundColor: 0xffffff
          });
          console.log('[Vanta] ✅ Topology monochrome lines initialized successfully');
          
          // Force resize and recalibration after browser paints to guarantee covering full viewport
          setTimeout(() => {
            if (vantaEffect && typeof vantaEffect.resize === 'function') {
              vantaEffect.resize();
            }
          }, 100);
          
          updateCanvasOpacities();
        } catch (err) {
          console.error('[Vanta] Initialization error:', err);
        }
      } else if (attempts < 50) {
        attempts++;
        setTimeout(startVanta, 100);
      }
    }
    
    startVanta();
  }

  // Load libraries and initialize Vanta Topology after page load is fully complete
  if (document.readyState === 'complete') {
    loadVantaTopology(initVantaTopology);
  } else {
    window.addEventListener('load', () => {
      // Extra 100ms delay to ensure hydration has settled
      setTimeout(() => {
        loadVantaTopology(initVantaTopology);
      }, 400);
    });
  }

  // Setup scroll opacity listener
  let _scrollTick = false;
  window.addEventListener('scroll', () => {
    if (!_scrollTick) {
      requestAnimationFrame(() => {
        updateCanvasOpacities();
        _scrollTick = false;
      });
      _scrollTick = true;
    }
  }, { passive: true });
  window.addEventListener('resize', updateCanvasOpacities);
})();
