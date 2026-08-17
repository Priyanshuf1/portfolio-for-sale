(function() {
  // Rabto Skill Engine: threejs-foundations, glsl-shader-effects & interactive-3d-models
  // Pure Black Background with 3D WebGL Interactive Geometry & Depth Grid
  
  const styles = `
    html, body, html body {
      background-color: #000000 !important;
      background: #000000 !important;
      color: #ffffff !important;
    }

    #rabto-3d-canvas {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      pointer-events: none;
      z-index: 0;
      opacity: 0.85;
    }

    [data-framer-root],
    #main,
    .framer-DvMIA,
    .framer-1iwpgy7,
    #hero,
    #services,
    #about,
    #contact,
    section[class*="framer-"],
    div[class*="framer-"] {
      background-color: transparent !important;
      background: transparent !important;
    }

    .glb-reviews-native-wrapper, 
    .glb-home-blogs, 
    .glb-location-section, 
    .glb-skills-section,
    .glb-footer {
      background: rgba(10, 10, 12, 0.75) !important;
      backdrop-filter: blur(16px) !important;
      -webkit-backdrop-filter: blur(16px) !important;
      border-top: 1px solid rgba(255, 255, 255, 0.08) !important;
    }

    .framer-1l7inir,
    .glb-review-card-premium, 
    .glb-home-blog-card, 
    .glb-contact-card,
    .glb-skill-card {
      background: rgba(18, 18, 22, 0.8) !important;
      backdrop-filter: blur(12px) !important;
      border: 1px solid rgba(255, 255, 255, 0.1) !important;
    }
  `;

  const styleEl = document.createElement('style');
  styleEl.innerHTML = styles;
  document.head.appendChild(styleEl);

  // Load Three.js dynamically if not present
  function loadThreeJS(callback) {
    if (window.THREE) {
      callback();
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
    script.onload = callback;
    document.head.appendChild(script);
  }

  function init3DScene() {
    if (!window.THREE) return;
    if (document.getElementById('rabto-3d-canvas')) return;

    const canvas = document.createElement('canvas');
    canvas.id = 'rabto-3d-canvas';
    document.body.appendChild(canvas);

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000000, 0.0018);

    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 400;
    camera.position.y = 100;

    const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // 1. 3D Perspective Wireframe Grid Plane
    const gridGeo = new THREE.PlaneGeometry(1600, 1600, 40, 40);
    const gridMat = new THREE.MeshBasicMaterial({
      color: 0x8b5cf6,
      wireframe: true,
      transparent: true,
      opacity: 0.18
    });
    const gridMesh = new THREE.Mesh(gridGeo, gridMat);
    gridMesh.rotation.x = -Math.PI / 2;
    gridMesh.position.y = -200;
    scene.add(gridMesh);

    // 2. 3D Floating Geometry (Icosahedrons & Octahedrons)
    const shapesGroup = new THREE.Group();
    scene.add(shapesGroup);

    const geometries = [
      new THREE.IcosahedronGeometry(35, 1),
      new THREE.OctahedronGeometry(45, 0),
      new THREE.TetrahedronGeometry(40, 0),
      new THREE.TorisGeometry ? new THREE.TorusGeometry(30, 8, 16, 32) : new THREE.IcosahedronGeometry(30, 0)
    ];

    const shapeColors = [0x8b5cf6, 0x06b6d4, 0x10b981, 0x06b6d4];
    const shapes = [];

    for (let i = 0; i < 18; i++) {
      const geo = geometries[i % geometries.length];
      const color = shapeColors[i % shapeColors.length];
      
      const mat = new THREE.MeshBasicMaterial({
        color: color,
        wireframe: true,
        transparent: true,
        opacity: 0.35
      });

      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.x = (Math.random() - 0.5) * 1200;
      mesh.position.y = (Math.random() - 0.5) * 800;
      mesh.position.z = (Math.random() - 0.5) * 800;

      mesh.rotation.x = Math.random() * Math.PI;
      mesh.rotation.y = Math.random() * Math.PI;

      mesh.userData = {
        rotSpeedX: (Math.random() - 0.5) * 0.015,
        rotSpeedY: (Math.random() - 0.5) * 0.015,
        floatSpeed: Math.random() * 0.02 + 0.005,
        initialY: mesh.position.y
      };

      shapesGroup.add(mesh);
      shapes.push(mesh);
    }

    // 3. 3D Particle Constellation
    const particleCount = 400;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 1400;
      positions[i + 1] = (Math.random() - 0.5) * 1000;
      positions[i + 2] = (Math.random() - 0.5) * 1000;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 2,
      transparent: true,
      opacity: 0.4
    });
    const particleSystem = new THREE.Points(particleGeo, particleMat);
    scene.add(particleSystem);

    // Mouse Parallax Interaction
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

    // 3D Render Loop
    let clock = new THREE.Clock();

    function animate() {
      requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse parallax camera lerp
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      camera.position.x = mouseX * 0.8;
      camera.position.y = -mouseY * 0.8 + 100;
      camera.lookAt(0, 0, 0);

      // Undulate 3D grid plane
      const pos = gridGeo.attributes.position;
      for (let i = 0; i < pos.count; i++) {
        const u = pos.getX(i);
        const v = pos.getY(i);
        const z = Math.sin(u * 0.01 + elapsedTime * 1.5) * 15 + Math.cos(v * 0.01 + elapsedTime * 1.5) * 15;
        pos.setZ(i, z);
      }
      pos.needsUpdate = true;

      // Rotate 3D floating wireframe shapes
      shapes.forEach(shape => {
        shape.rotation.x += shape.userData.rotSpeedX;
        shape.rotation.y += shape.userData.rotSpeedY;
        shape.position.y = shape.userData.initialY + Math.sin(elapsedTime * 2 + shape.position.x) * 20;
      });

      // Slowly rotate particle system
      particleSystem.rotation.y = elapsedTime * 0.03;

      renderer.render(scene, camera);
    }

    animate();
  }

  loadThreeJS(init3DScene);
})();
