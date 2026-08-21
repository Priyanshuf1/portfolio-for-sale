(function() {
  // ── 3D Interactive Logo WebGL Component ──
  
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
    
    // 4. Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);
    
    // Spotlight for dynamic reflection highlights on the card face
    const spotLight = new THREE.SpotLight(0xffc72c, 8, 15, Math.PI / 4, 0.5, 1);
    spotLight.position.set(2, 3, 5);
    scene.add(spotLight);
    
    const dirLight = new THREE.DirectionalLight(0xffffff, 1.8);
    dirLight.position.set(-3, 2, 4);
    scene.add(dirLight);
    
    // 5. Load Logo Texture
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load('./logo.png', function(texture) {
      texture.generateMipmaps = true;
      texture.minFilter = THREE.LinearMipmapLinearFilter;
      
      // 6. Create 3D Logo Token (Metallic Card with glass overlay)
      const geometry = new THREE.BoxGeometry(3.2, 3.2, 0.08);
      
      // Materials list: right, left, top, bottom, front, back
      const frontMaterial = new THREE.MeshPhysicalMaterial({
        map: texture,
        transparent: true,
        roughness: 0.12,
        metalness: 0.85,
        clearcoat: 1.0,
        clearcoatRoughness: 0.1,
        reflectivity: 0.9,
        side: THREE.DoubleSide
      });
      
      const sideMaterial = new THREE.MeshStandardMaterial({
        color: 0xffc72c, // Brand Gold edge
        roughness: 0.2,
        metalness: 0.9
      });
      
      const materials = [
        sideMaterial, // right
        sideMaterial, // left
        sideMaterial, // top
        sideMaterial, // bottom
        frontMaterial, // front
        frontMaterial  // back
      ];
      
      logoCard = new THREE.Mesh(geometry, materials);
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
  
  // Continuous search for the headphone girl image to replace
  function checkAndReplace() {
    // Clean up any canvas created in the wrong section (like Projects)
    const existingCanvases = document.querySelectorAll('#glb-3d-logo-canvas');
    existingCanvases.forEach(c => {
      const parentSec = c.closest('[data-framer-name="about me section"]');
      if (!parentSec) {
        c.remove();
        // Restore opacity of any projects image that was hidden by mistake
        const projImg = document.querySelector('img[src*="RYRvZnstUexQMOl8zRyrvDfDT0.png"]');
        if (projImg) projImg.style.opacity = '1';
        const otherAboutImg = document.querySelector('img[src*="roWFLkzHAotwSx5UxGPxpxMeA.jpg"]');
        if (otherAboutImg && otherAboutImg.getBoundingClientRect().top + window.scrollY > 2000) {
          otherAboutImg.style.opacity = '1';
        }
      }
    });

    const aboutSection = document.querySelector('[data-framer-name="about me section"]');
    if (!aboutSection) return;

    // Find the target image specifically inside the About section
    const targetImg = aboutSection.querySelector('img[src*="roWFLkzHAotwSx5UxGPxpxMeA.jpg"]');
    if (!targetImg) return;
    
    // Target container is the parent background image wrapper
    const container = targetImg.parentElement;
    if (!container) return;
    
    // Hide the image so our 3D canvas is visible
    targetImg.style.opacity = '0';
    targetImg.style.pointerEvents = 'none';
    
    // Make sure container holds absolute positioning for canvas
    if (window.getComputedStyle(container).position === 'static') {
      container.style.position = 'relative';
    }
    
    init3DLogo(container);
  }
  
  // Initialize check loop
  setInterval(checkAndReplace, 500);
  
})();
