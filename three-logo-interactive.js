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
    camera.position.z = 6.5; // Restored to 6.5 for the perfect scaling
    
    // 3. Renderer
    renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    // 4. Load Logo Texture
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load('./logo.png', function(texture) {
      texture.generateMipmaps = true;
      texture.minFilter = THREE.LinearMipmapLinearFilter;
      
      // 5. Create 3D Logo Token (Using basic materials to preserve bright original red/white colors)
      const geometry = new THREE.BoxGeometry(3.2, 3.2, 0.08);
      
      const frontMaterial = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        side: THREE.DoubleSide
      });
      
      const sideMaterial = new THREE.MeshBasicMaterial({
        color: 0xffc72c // Brand Gold edge
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
  
  let rotateSpeed = 0.015;
  function animate() {
    requestAnimationFrame(animate);
    
    if (logoCard) {
      // Continuous rotation around Y axis
      logoCard.rotation.y += rotateSpeed;
      
      // Smoothly interpolate rotations towards target (damping effect)
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;
      
      if (isNear) {
        // Accelerate rotation and tilt slightly towards mouse
        rotateSpeed = 0.04;
        logoCard.rotation.x = mouse.y * 0.4;
        logoCard.rotation.z = -mouse.x * 0.2;
      } else {
        // Normal rotation speed, gentle wobble, and vertical floating
        rotateSpeed = 0.012;
        logoCard.rotation.x = Math.sin(Date.now() * 0.001) * 0.1;
        logoCard.rotation.z = 0;
        logoCard.position.y = Math.sin(Date.now() * 0.0015) * 0.12;
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
