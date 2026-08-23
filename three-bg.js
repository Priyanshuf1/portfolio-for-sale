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
      opacity: 0.35;
      transition: opacity 0.3s ease;
    }

    #grid-trail-canvas {
      position: fixed;
      top: 0; left: 0;
      width: 100vw; height: 100vh;
      pointer-events: none;
      z-index: -1;
      opacity: 0;
      display: none;
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
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.6.0/p5.min.js';
    script.onload = callback;
    document.head.appendChild(script);
  }

  // Scroll opacity controller
  function updateCanvasOpacities() {
    const scrollY = window.scrollY;
    const fadeHeight = window.innerHeight * 0.8;
    
    // 3D Canvas (Only visible on the first page / hero section)
    const opacity3D = Math.max(0, 0.35 - (scrollY / fadeHeight) * 0.35);
    const canvas3D = document.getElementById('rabto-3d-canvas');
    if (canvas3D) {
      canvas3D.style.opacity = opacity3D;
      canvas3D.style.display = opacity3D === 0 ? 'none' : 'block';
    }

    // Ambient Particles Canvas (Only visible on the first page / hero section)
    const opacityAmbient = Math.max(0, 0.85 - (scrollY / fadeHeight) * 0.85);
    const canvasAmbient = document.getElementById('rabto-ambient-canvas');
    if (canvasAmbient) {
      canvasAmbient.style.opacity = opacityAmbient;
      canvasAmbient.style.display = opacityAmbient === 0 ? 'none' : 'block';
    }
    
    // Grid Trail Canvas (Fades in as we scroll past the first page)
    const opacityTrail = Math.min(1.0, scrollY / fadeHeight);
    const canvasTrail = document.getElementById('grid-trail-canvas');
    if (canvasTrail) {
      canvasTrail.style.opacity = opacityTrail;
      canvasTrail.style.display = opacityTrail === 0 ? 'none' : 'block';
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

  // 2. Initialize Grid Trail Canvas (Other Pages)
  function initGridTrailScene() {
    if (!window.p5 || document.getElementById('grid-trail-canvas')) return;

    new p5((p) => {
      const CELL_SIZE = 40;
      const COLOR_R = 79;
      const COLOR_G = 38;
      const COLOR_B = 233;
      const STARTING_ALPHA = 200;
      const BACKGROUND_COLOR = [5, 5, 7]; // matching body dark theme #050507
      const PROB_OF_NEIGHBOR = 0.5;
      const AMT_FADE_PER_FRAME = 5;

      let colorWithAlpha;
      let numRows;
      let numCols;
      let currentRow = -2;
      let currentCol = -2;
      let allNeighbors = [];
      
      let virtualT = 0;
      let lastMouseX = 0;
      let lastMouseY = 0;
      let isMouseMoving = false;
      let idleTimer = 0;
      let cursorAlpha = 0;

      p.setup = () => {
        let cnv = p.createCanvas(p.windowWidth, p.windowHeight);
        cnv.id('grid-trail-canvas');
        cnv.style("position", "fixed");
        cnv.style("inset", 0);
        cnv.style("z-index", -1);
        cnv.style("pointer-events", "none");
        cnv.style("opacity", "0");
        cnv.style("display", "none");
        
        colorWithAlpha = p.color(COLOR_R, COLOR_G, COLOR_B, STARTING_ALPHA);
        p.noFill();
        p.stroke(colorWithAlpha);
        p.strokeWeight(1);
        numRows = Math.ceil(p.height / CELL_SIZE);
        numCols = Math.ceil(p.width / CELL_SIZE);

        window.addEventListener('mousemove', (e) => {
          lastMouseX = e.clientX;
          lastMouseY = e.clientY;
          isMouseMoving = true;
          idleTimer = 0;
        });

        // Trigger scroll handler once elements exist to initialize sizes and states
        updateCanvasOpacities();
      };

      p.draw = () => {
        p.clear();

        let xCoord = lastMouseX;
        let yCoord = lastMouseY;
        
        const isMobile = p.width < 768;
        if (isMobile) {
          virtualT += 0.015;
          xCoord = (p.width / 2) + Math.cos(virtualT * 0.7) * (p.width * 0.45);
          yCoord = (p.height / 2) + Math.sin(virtualT * 1.1) * (p.height * 0.45);
          cursorAlpha = STARTING_ALPHA;
        } else {
          if (isMouseMoving) {
            idleTimer++;
            if (idleTimer > 60) { // After 1 second of inactivity, fade out
              cursorAlpha = p.max(0, cursorAlpha - AMT_FADE_PER_FRAME);
              if (cursorAlpha === 0) {
                isMouseMoving = false;
              }
            } else {
              cursorAlpha = STARTING_ALPHA;
            }
          } else {
            cursorAlpha = p.max(0, cursorAlpha - AMT_FADE_PER_FRAME);
          }
        }

        let row = p.floor(yCoord / CELL_SIZE);
        let col = p.floor(xCoord / CELL_SIZE);

        if (cursorAlpha > 0) {
          if (row !== currentRow || col !== currentCol) {
            currentRow = row;
            currentCol = col;
            allNeighbors.push(...getRandomNeighbors(row, col));
          }

          let x = col * CELL_SIZE;
          let y = row * CELL_SIZE;

          p.stroke(COLOR_R, COLOR_G, COLOR_B, cursorAlpha);
          p.rect(x, y, CELL_SIZE, CELL_SIZE);
        }

        for (let neighbor of allNeighbors) {
          let neighborX = neighbor.col * CELL_SIZE;
          let neighborY = neighbor.row * CELL_SIZE;
          neighbor.opacity = p.max(0, neighbor.opacity - AMT_FADE_PER_FRAME);
          p.stroke(COLOR_R, COLOR_G, COLOR_B, neighbor.opacity);
          p.rect(neighborX, neighborY, CELL_SIZE, CELL_SIZE);
        }
        
        allNeighbors = allNeighbors.filter((neighbor) => neighbor.opacity > 0);
      };

      function getRandomNeighbors(row, col) {
        let neighbors = [];
        for (let dRow = -1; dRow <= 1; dRow++) {
          for (let dCol = -1; dCol <= 1; dCol++) {
            let neighborRow = row + dRow;
            let neighborCol = col + dCol;
            let isCurrentCell = dRow === 0 && dCol === 0;
            let isInBounds = neighborRow >= 0 && neighborRow < numRows && neighborCol >= 0 && neighborCol < numCols;
            if (!isCurrentCell && isInBounds && Math.random() < PROB_OF_NEIGHBOR) {
              neighbors.push({
                row: neighborRow,
                col: neighborCol,
                opacity: 255
              });
            }
          }
        }
        return neighbors;
      }

      p.windowResized = () => {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
        numRows = Math.ceil(p.height / CELL_SIZE);
        numCols = Math.ceil(p.width / CELL_SIZE);
      };
    });
  }

  // Load libraries and initialize
  loadThreeJS(init3DScene);
  // loadP5JS(initGridTrailScene); // Disabled grid trail for premium monochrome look

  // Setup scroll opacity listener
  window.addEventListener('scroll', updateCanvasOpacities);
  window.addEventListener('resize', updateCanvasOpacities);
})();
