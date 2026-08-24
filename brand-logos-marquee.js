/**
 * brand-logos-marquee.js
 * Replaces the Framer company logos strip with a CSS-animated marquee.
 * Wordmarks are styled in a premium dark silver grayscale mix-blend mode.
 * Replaces About section image with a 3D floating company logo card + rotating ring.
 */
(function() {

  // ── 1. INJECT STYLES ──────────────────────────────────────────────────
  const style = document.createElement('style');
  style.innerHTML = `
    /* Hide original Framer logos container */
    .framer-ikqh5l-container {
      display: none !important;
      height: 0 !important;
      overflow: hidden !important;
    }

    /* GLM Brand Marquee Strip */
    #glm-brand-marquee-wrap {
      width: 100%;
      overflow: hidden;
      padding: 20px 0;
      position: relative;
      z-index: 2;
      background: transparent;
      border-top: 1px solid rgba(0, 0, 0, 0.03);
      border-bottom: 1px solid rgba(0, 0, 0, 0.03);
      margin-top: 20px;
    }
    #glm-brand-marquee-wrap::before,
    #glm-brand-marquee-wrap::after {
      content: '';
      position: absolute;
      top: 0; bottom: 0;
      width: 120px;
      z-index: 3;
      pointer-events: none;
    }
    #glm-brand-marquee-wrap::before { left: 0; background: linear-gradient(to right, rgba(255,255,255,1), rgba(255,255,255,0)); }
    #glm-brand-marquee-wrap::after  { right: 0; background: linear-gradient(to left, rgba(255,255,255,1), rgba(255,255,255,0)); }

    .glm-brand-marquee-track {
      display: flex;
      align-items: center;
      gap: 75px;
      width: max-content;
      animation: glmMarqueeScroll 28s linear infinite;
    }
    .glm-brand-marquee-track:hover { animation-play-state: paused; }

    @keyframes glmMarqueeScroll {
      from { transform: translateX(0); }
      to   { transform: translateX(-50%); }
    }

    .glm-brand-logo-item {
      flex-shrink: 0;
      height: 34px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .glm-brand-logo-item:hover {
      transform: scale(1.08);
    }
    
    /* Premium Dark silver monochrome color treatment for moving logos */
    .glm-brand-logo-item img {
      height: 34px;
      width: auto;
      max-width: 130px;
      object-fit: contain;
      display: block;
      mix-blend-mode: multiply;
      filter: contrast(0.85) brightness(0.6) grayscale(1) opacity(0.7) !important;
      transition: filter 0.3s ease, opacity 0.3s ease;
    }
    .glm-brand-logo-item:hover img {
      filter: grayscale(0) brightness(1) contrast(1) opacity(1) !important;
    }

    /* Disable grayscale filter in About section to let the logo show in true colors */
    [data-framer-name="about me section"] .framer-vbrsas,
    [data-framer-name="about me section"] .framer-eDUaF,
    .glm-about-logo-container,
    .glm-about-logo-container * {
      filter: none !important;
      -webkit-filter: none !important;
    }

    /* Ring Rotation in About Section */
    @keyframes glmRingRotate {
      from { transform: rotate(0deg); }
      to   { transform: rotate(360deg); }
    }
    .glm-rotating-ring-element {
      animation: glmRingRotate 22s linear infinite !important;
    }
  `;
  document.head.appendChild(style);

  // ── 2. BRAND DATA ──────────────────────────────────────────────────────────
  const brands = [
    { src: './brand_b_luxury.jpeg',       alt: 'B Luxury Salon'        },
    { src: './brand_book_digital.jpeg',   alt: 'Book Your Digital Story' },
    { src: './brand_cs_ec.jpeg',          alt: 'CS EC'                 },
    { src: './brand_krazy_cakes.jpeg',    alt: 'Krazy 4 Cakes'         },
    { src: './brand_kurti_kahaanii.jpeg', alt: 'Kurti Kahaanii'        },
    { src: './brand_om_group.jpeg',       alt: 'OM Group Builders'     },
    { src: './brand_tabs19.jpeg',         alt: 'Tabs 19 Studio'        },
    { src: './brand_b_luxury2.jpeg',      alt: 'B Luxury Salon 2'      }
  ];

  // ── 3. BUILD MARQUEE ──────────────────────────────────────────────────────
  function buildItems(list) {
    return list.map(b => '<div class="glm-brand-logo-item"><img src="' + b.src + '" alt="' + b.alt + '" loading="lazy"></div>').join('');
  }

  function injectMarquee() {
    if (document.getElementById('glm-brand-marquee-wrap')) return;

    const heroSection = document.querySelector('[data-framer-name="hero"]') || document.querySelector('#hero');
    if (!heroSection) return;

    const wrap = document.createElement('div');
    wrap.id = 'glm-brand-marquee-wrap';

    const track = document.createElement('div');
    track.className = 'glm-brand-marquee-track';
    track.innerHTML = buildItems(brands) + buildItems(brands); // doubled for seamless loop
    wrap.appendChild(track);

    if (heroSection.nextSibling) {
      heroSection.parentNode.insertBefore(wrap, heroSection.nextSibling);
    } else {
      heroSection.parentNode.appendChild(wrap);
    }

    // Hide original Framer container
    const framerContainer = document.querySelector('.framer-ikqh5l-container');
    if (framerContainer) framerContainer.style.setProperty('display', 'none', 'important');
  }

  // ── 4. THREE.JS 3D ROTATING LOGO CARD ──────────────────────────────────────
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
    
    container.appendChild(canvas);
    
    const width = container.clientWidth || 300;
    const height = container.clientHeight || 450;
    
    scene = new THREE.Scene();
    
    camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 6.5;
    
    renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    
    // Load Logo Texture (using aspect ratio 4.8 x 1.7)
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load('./logo.png', function(texture) {
      texture.generateMipmaps = true;
      texture.minFilter = THREE.LinearMipmapLinearFilter;
      texture.magFilter = THREE.LinearFilter;
      
      logoCard = new THREE.Group();
      
      const logoGeom = new THREE.PlaneGeometry(4.8, 1.7); // Exact aspect ratio of logo!
      const logoMat = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        side: THREE.DoubleSide
      });
      const logoMesh = new THREE.Mesh(logoGeom, logoMat);
      logoCard.add(logoMesh);
      
      scene.add(logoCard);
      
      animate();
    });
    
    // Hover interactions
    container.addEventListener('mousemove', function(e) {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      mouse.targetX = ((x / rect.width) * 2 - 1) * 0.7;
      mouse.targetY = -((y / rect.height) * 2 - 1) * 0.7;
      isNear = true;
    });
    
    container.addEventListener('mouseleave', function() {
      mouse.targetX = 0;
      mouse.targetY = 0;
      isNear = false;
    });
    
    // Scroll interaction
    window.addEventListener('scroll', function() {
      const currentScroll = window.scrollY;
      const diff = currentScroll - scrollY;
      if (logoCard) {
        logoCard.rotation.y += diff * 0.003;
      }
      scrollY = currentScroll;
    });
    
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
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;
      
      autoRotateAngle += 0.008;
      
      // Floating and tilting in 3D space
      logoCard.rotation.x = mouse.y + Math.sin(autoRotateAngle * 0.5) * 0.03;
      logoCard.rotation.y = mouse.x + Math.cos(autoRotateAngle * 0.3) * 0.05;
      logoCard.rotation.z = 0;
      
      logoCard.position.y = Math.sin(autoRotateAngle * 1.5) * 0.15;
    }
    
    renderer.render(scene, camera);
  }

  // ── 5. REPLACE ABOUT LOGO CONTAINER ────────────────────────────────────────
  function replaceAboutLogoWith3D() {
    const aboutSection = document.querySelector('[data-framer-name="about me section"]') || document.getElementById('about-me');
    if (!aboutSection) return;

    // Check if already patched to prevent infinite re-render loop
    if (aboutSection.querySelector('.glm-about-logo-container')) return;

    const targetImg = aboutSection.querySelector('img[src*="logo.png"]');
    if (!targetImg) return;

    const container = targetImg.parentElement;
    if (!container) return;

    const svgHTML = `
      <div class="glm-about-logo-container" style="display: flex; justify-content: center; align-items: center; width: 100%; height: 100%; min-height: 250px; background: transparent; padding: 20px; box-sizing: border-box; position: relative;">
        <!-- Rotating Yellow Ring SVG behind 3D Canvas -->
        <svg viewBox="0 0 100 100" style="position: absolute; width: 220px; height: 220px; top: 50%; left: 50%; transform: translate(-50%, -50%); pointer-events: none; z-index: 1;">
          <circle cx="50" cy="50" r="47" fill="none" stroke="#fbbf24" stroke-width="2" stroke-dasharray="8 6" class="glm-rotating-ring-element" style="transform-origin: center; stroke: #fbbf24 !important; fill: none !important;"></circle>
        </svg>
      </div>
    `;

    container.innerHTML = svgHTML;
    
    const wrapper = container.querySelector('.glm-about-logo-container');
    if (wrapper) {
      loadThreeJS(function() {
        init3DLogo(wrapper);
      });
    }
  }

  // ── 6. RUN ────────────────────────────────────────────────────────────────
  function run() { 
    injectMarquee(); 
    replaceAboutLogoWith3D(); 
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run);
  } else {
    run();
  }
  
  // Single-run safety checker
  setInterval(run, 1000);

})();
