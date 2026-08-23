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
  
  function loadThreeJS(callback) {
    if (window.THREE) { callback(); return; }
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
    script.onload = callback;
    document.head.appendChild(script);
  }

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
      
      // Core logo plane (zoomed/scaled up to 3.6 x 3.6)
      const logoGeom = new THREE.PlaneGeometry(3.6, 3.6);
      const logoMat = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        side: THREE.DoubleSide
      });
      const logoMesh = new THREE.Mesh(logoGeom, logoMat);
      logoCard.add(logoMesh);
      
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
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;
      
      // Continuous time parameter
      autoRotateAngle += 0.008;
      
      // Constant gentle tilt hover
      logoCard.rotation.x = mouse.y + Math.sin(autoRotateAngle * 0.5) * 0.03;
      logoCard.rotation.y = mouse.x + Math.cos(autoRotateAngle * 0.3) * 0.05;
      logoCard.rotation.z = 0; // Lock Z rotation to keep the logo right side up
      
      // Constant gentle floating hover animation on Y
      logoCard.position.y = Math.sin(autoRotateAngle * 1.5) * 0.15;
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
    
    loadThreeJS(function() {
      init3DLogo(container);
    });
  }
  
  // Initialize check loop
  setInterval(checkAndReplace, 500);
  
})();
