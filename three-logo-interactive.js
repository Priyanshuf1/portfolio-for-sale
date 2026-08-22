(function() {
  // Scoped grayscale bypass strictly for the about me section
  const styleEl = document.createElement('style');
  styleEl.innerHTML = `
    [data-framer-name="about me section"] .framer-vbrsas,
    [data-framer-name="about me section"] [data-framer-background-image-wrapper="true"],
    #glb-3d-logo-canvas {
      filter: none !important;
      -webkit-filter: none !important;
    }
  `;
  document.head.appendChild(styleEl);

  let scene, camera, renderer, logoCard, canvas;
  let mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
  let scrollY = window.scrollY;
  let isNear = false;
  let autoRotateAngle = 0;
  
  function init3DLogo(container) {
    if (document.getElementById('glb-3d-logo-canvas')) return;
    
    // Create canvas
    canvas = document.createElement('canvas');
    canvas.id = 'glb-3d-logo-canvas';
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = '5';
    canvas.style.borderRadius = 'inherit';
    canvas.style.pointerEvents = 'auto'; // Capture hover/pointer events
    
    // Add canvas to container
    container.appendChild(canvas);
    
    const width = container.clientWidth || 300;
    const height = container.clientHeight || 450;
    
    // 1. Scene
    scene = new THREE.Scene();
    
    // 2. Camera
    camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 6.5;
    
    // 3. Renderer
    renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    
    // 4. Load Logo Texture and create a true 3D interactive composite model
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load('./logo.png', function(texture) {
      texture.generateMipmaps = true;
      texture.minFilter = THREE.LinearMipmapLinearFilter;
      texture.magFilter = THREE.LinearFilter;
      
      // Create main group
      logoCard = new THREE.Group();
      
      // Inner wireframe sphere
      const sphereGeom = new THREE.SphereGeometry(2.0, 24, 24);
      const sphereMat = new THREE.MeshBasicMaterial({
        color: 0xFF4500, // Orange-red theme accent
        wireframe: true,
        transparent: true,
        opacity: 0.12
      });
      const sphereMesh = new THREE.Mesh(sphereGeom, sphereMat);
      logoCard.add(sphereMesh);
      
      // Outer wireframe sphere
      const outerGeom = new THREE.SphereGeometry(2.4, 16, 16);
      const outerMat = new THREE.MeshBasicMaterial({
        color: 0xFFD700, // Gold glowing accent
        wireframe: true,
        transparent: true,
        opacity: 0.05
      });
      const outerMesh = new THREE.Mesh(outerGeom, outerMat);
      logoCard.add(outerMesh);
      
      // Core logo plane
      const logoGeom = new THREE.PlaneGeometry(2.2, 2.2);
      const logoMat = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        side: THREE.DoubleSide
      });
      const logoMesh = new THREE.Mesh(logoGeom, logoMat);
      logoCard.add(logoMesh);
      
      // Orbiting particles shell
      const particleCount = 60;
      const particlesGeom = new THREE.BufferGeometry();
      const positions = new Float32Array(particleCount * 3);
      for (let i = 0; i < particleCount * 3; i += 3) {
        const r = 2.0 + Math.random() * 0.6;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos((Math.random() * 2) - 1);
        positions[i] = r * Math.sin(phi) * Math.cos(theta);
        positions[i+1] = r * Math.sin(phi) * Math.sin(theta);
        positions[i+2] = r * Math.cos(phi);
      }
      particlesGeom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      const particlesMat = new THREE.PointsMaterial({
        color: 0xFFFFFF,
        size: 0.05,
        transparent: true,
        opacity: 0.6
      });
      const particles = new THREE.Points(particlesGeom, particlesMat);
      logoCard.add(particles);
      
      scene.add(logoCard);
      
      // Subtle float animation
      animate();
    });
    
    // 7. Event Listeners
    // Track mouse coordinates relative to the center of the container
    container.addEventListener('mousemove', function(e) {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Normalize to -1 to 1
      mouse.targetX = ((x / rect.width) * 2 - 1) * 0.6;
      mouse.targetY = -((y / rect.height) * 2 - 1) * 0.6;
      isNear = true;
    });
    
    container.addEventListener('mouseleave', function() {
      mouse.targetX = 0;
      mouse.targetY = 0;
      isNear = false;
    });
    
    // Rotate slightly on scroll
    window.addEventListener('scroll', function() {
      const currentScroll = window.scrollY;
      const diff = currentScroll - scrollY;
      if (logoCard) {
        logoCard.rotation.y += diff * 0.003;
      }
      scrollY = currentScroll;
    });
    
    // Resize handler
    const resizeObserver = new ResizeObserver(() => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      if (w && h) {
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      }
    });
    resizeObserver.observe(container);
  }
  
  function animate() {
    requestAnimationFrame(animate);
    
    if (logoCard) {
      // Smoothly interpolate rotations towards target (damping effect)
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;
      
      // Calculate rotation
      logoCard.rotation.x = mouse.y;
      
      if (isNear) {
        // Face the cursor
        logoCard.rotation.y = mouse.x;
      } else {
        // Idle floating/rotating animation when mouse is away
        autoRotateAngle += 0.008;
        logoCard.rotation.y = Math.sin(autoRotateAngle) * 0.35;
        logoCard.position.y = Math.sin(autoRotateAngle * 1.5) * 0.15;
      }
    }
    
    renderer.render(scene, camera);
  }
  
  // Continuous search for the logo.png image inside the About section to replace
  function checkAndReplace() {
    const aboutSection = document.querySelector('[data-framer-name="about me section"]') || document.getElementById('about-me');
    if (!aboutSection) return;

    // Find the target logo image inside the About section card (skip header logo or other wrappers)
    const targetImg = aboutSection.querySelector('img[src*="logo.png"]');
    if (!targetImg) return;
    
    // Target container is the parent wrapper
    const container = targetImg.parentElement;
    if (!container) return;
    
    // Hide the image so our 3D canvas is visible
    targetImg.style.opacity = '0';
    targetImg.style.pointerEvents = 'none';
    
    // Make sure container holds relative positioning for canvas
    if (window.getComputedStyle(container).position === 'static') {
      container.style.position = 'relative';
    }
    
    init3DLogo(container);
  }
  
  // Initialize check loop
  setInterval(checkAndReplace, 500);
  
})();
