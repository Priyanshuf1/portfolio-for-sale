(function () {
  // ─── Inject Styles ───────────────────────────────────────────────────────────
  var styleEl = document.createElement('style');
  styleEl.textContent = `
    html, body { background-color: #050507 !important; }
    #rabto-3d-canvas {
      position: fixed; top: 0; left: 0;
      width: 100vw; height: 100vh;
      pointer-events: none; z-index: 0; opacity: 0.85;
    }
    [data-framer-root], #main, .framer-DvMIA,
    section[class*="framer-"], div[class*="framer-"] {
      background-color: transparent !important;
      background: transparent !important;
    }
    /* Force color on logo container and canvas */
    #glb-logo-mount, #glb-logo-mount *,
    #glm-logo-canvas { filter: none !important; -webkit-filter: none !important; }
  `;
  document.head.appendChild(styleEl);

  // ─── Wait for THREE.js ───────────────────────────────────────────────────────
  function whenThree(cb) {
    if (window.THREE) { cb(); return; }
    var s = document.createElement('script');
    s.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
    s.onload = cb;
    document.head.appendChild(s);
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // BACKGROUND SCENE — kept alive via MutationObserver re-injection
  // ═══════════════════════════════════════════════════════════════════════════
  var _bgCanvas = null;
  var _bgStarted = false;

  function buildBgCanvas() {
    var T = window.THREE;
    var canvas = document.createElement('canvas');
    canvas.id = 'rabto-3d-canvas';
    _bgCanvas = canvas;

    var scene = new T.Scene();
    scene.fog = new T.FogExp2(0x050507, 0.0018);
    var camera = new T.PerspectiveCamera(60, innerWidth / innerHeight, 1, 1000);
    camera.position.set(0, 100, 400);
    var renderer = new T.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });
    renderer.setSize(innerWidth, innerHeight);
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));

    // Grid
    var gridGeo = new T.PlaneGeometry(1600, 1600, 40, 40);
    var gridMat = new T.MeshBasicMaterial({ color: 0x94A3B8, wireframe: true, transparent: true, opacity: 0.15 });
    var grid = new T.Mesh(gridGeo, gridMat);
    grid.rotation.x = -Math.PI / 2;
    grid.position.y = -200;
    scene.add(grid);

    // Floating shapes
    var geos = [new T.IcosahedronGeometry(35, 1), new T.OctahedronGeometry(45, 0), new T.TetrahedronGeometry(40, 0)];
    var colors = [0xFFFFFF, 0xE2E8F0, 0x94A3B8, 0xCBD5E1];
    var shapes = [];
    for (var i = 0; i < 18; i++) {
      var m = new T.Mesh(geos[i % 3], new T.MeshBasicMaterial({ color: colors[i % 4], wireframe: true, transparent: true, opacity: 0.28 }));
      m.position.set((Math.random() - 0.5) * 1200, (Math.random() - 0.5) * 800, (Math.random() - 0.5) * 800);
      m.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
      m.userData = { rx: (Math.random() - 0.5) * 0.012, ry: (Math.random() - 0.5) * 0.012, fy: m.position.y };
      scene.add(m); shapes.push(m);
    }

    // Stars
    var pGeo = new T.BufferGeometry();
    var pPos = new Float32Array(350 * 3);
    for (var j = 0; j < 350 * 3; j += 3) {
      pPos[j] = (Math.random() - 0.5) * 1400;
      pPos[j + 1] = (Math.random() - 0.5) * 1000;
      pPos[j + 2] = (Math.random() - 0.5) * 1000;
    }
    pGeo.setAttribute('position', new T.BufferAttribute(pPos, 3));
    var stars = new T.Points(pGeo, new T.PointsMaterial({ color: 0xE2E8F0, size: 2, transparent: true, opacity: 0.35 }));
    scene.add(stars);

    var mx = 0, my = 0, tmx = 0, tmy = 0;
    window.addEventListener('mousemove', function (e) {
      tmx = (e.clientX - innerWidth / 2) * 0.5;
      tmy = (e.clientY - innerHeight / 2) * 0.5;
    });
    window.addEventListener('resize', function () {
      camera.aspect = innerWidth / innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(innerWidth, innerHeight);
    });

    var t = 0;
    (function tick() {
      requestAnimationFrame(tick);
      t += 0.016;
      mx += (tmx - mx) * 0.05; my += (tmy - my) * 0.05;
      camera.position.x = mx * 0.8;
      camera.position.y = -my * 0.8 + 100;
      camera.lookAt(0, 0, 0);
      var pos = gridGeo.attributes.position;
      for (var k = 0; k < pos.count; k++) {
        var u = pos.getX(k), v = pos.getY(k);
        pos.setZ(k, Math.sin(u * 0.01 + t * 1.5) * 15 + Math.cos(v * 0.01 + t * 1.5) * 15);
      }
      pos.needsUpdate = true;
      shapes.forEach(function (s) {
        s.rotation.x += s.userData.rx;
        s.rotation.y += s.userData.ry;
        s.position.y = s.userData.fy + Math.sin(t * 2 + s.position.x) * 20;
      });
      stars.rotation.y = t * 0.02;
      renderer.render(scene, camera);
    })();
  }

  function ensureBgInDom() {
    if (!_bgCanvas) return;
    if (!document.body.contains(_bgCanvas)) {
      document.body.insertBefore(_bgCanvas, document.body.firstChild);
    }
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // LOGO SCENE — colorful 3D emblem with mouse + scroll interaction
  // ═══════════════════════════════════════════════════════════════════════════
  var _logoStarted = false;
  var _logoMouse = { x: 0, y: 0, tx: 0, ty: 0 };
  var _logoHovered = false;
  var _lastScroll = window.scrollY;
  var _cardGroup = null;

  function makeFrontTex() {
    var T = window.THREE;
    var cv = document.createElement('canvas');
    cv.width = cv.height = 1024;
    var cx = cv.getContext('2d');

    var bg = cx.createRadialGradient(512, 512, 50, 512, 512, 600);
    bg.addColorStop(0, '#1c1a24'); bg.addColorStop(0.6, '#100f16'); bg.addColorStop(1, '#07070a');
    cx.fillStyle = bg; cx.fillRect(0, 0, 1024, 1024);

    var rg = cx.createRadialGradient(360, 512, 0, 360, 512, 380);
    rg.addColorStop(0, 'rgba(255,23,68,0.45)'); rg.addColorStop(0.7, 'rgba(255,23,68,0.08)'); rg.addColorStop(1, 'rgba(0,0,0,0)');
    cx.fillStyle = rg; cx.fillRect(0, 0, 1024, 1024);

    // Gold borders
    cx.strokeStyle = '#ffc72c'; cx.lineWidth = 6; cx.strokeRect(36, 36, 952, 952);
    cx.strokeStyle = 'rgba(255,199,44,0.4)'; cx.lineWidth = 2; cx.strokeRect(48, 48, 928, 928);

    // Corner accents
    cx.fillStyle = '#ffc72c';
    [[30,30,44,12],[30,30,12,44],[950,30,44,12],[982,30,12,44],[30,982,44,12],[30,950,12,44],[950,982,44,12],[982,950,12,44]]
      .forEach(function(r){ cx.fillRect(r[0],r[1],r[2],r[3]); });

    // Top label
    cx.fillStyle = '#ffc72c'; cx.font = 'bold 24px sans-serif'; cx.textAlign = 'center';
    cx.fillText('GLOBAL LOGIC MEDIA', 512, 115);

    // Red GLM logo shape
    cx.fillStyle = '#FF1744'; cx.shadowColor = '#FF1744'; cx.shadowBlur = 30;
    cx.beginPath();
    cx.moveTo(210,310); cx.lineTo(440,450); cx.lineTo(440,500); cx.lineTo(390,540);
    cx.lineTo(390,470); cx.lineTo(250,390); cx.lineTo(250,630); cx.lineTo(390,550);
    cx.lineTo(440,590); cx.lineTo(440,640); cx.lineTo(210,780);
    cx.closePath(); cx.fill();
    cx.beginPath(); cx.moveTo(320,465); cx.lineTo(400,515); cx.lineTo(320,565); cx.closePath(); cx.fill();
    cx.shadowColor = 'rgba(0,0,0,0)'; cx.shadowBlur = 0;

    // Brand text
    cx.fillStyle = '#ffffff'; cx.font = '900 70px sans-serif'; cx.textAlign = 'left';
    cx.fillText('GLOBAL', 480, 470); cx.fillText('LOGIC', 480, 550); cx.fillText('MEDIA', 480, 630);
    cx.fillStyle = 'rgba(255,255,255,0.65)'; cx.font = '600 22px sans-serif'; cx.textAlign = 'center';
    cx.fillText('EST. 2019  •  LUCKNOW, INDIA', 512, 910);

    var tex = new T.CanvasTexture(cv);
    tex.generateMipmaps = true; tex.minFilter = T.LinearMipmapLinearFilter; tex.magFilter = T.LinearFilter;
    return tex;
  }

  function makeBackTex() {
    var T = window.THREE;
    var cv = document.createElement('canvas');
    cv.width = cv.height = 1024;
    var cx = cv.getContext('2d');

    var bg = cx.createLinearGradient(0, 0, 1024, 1024);
    bg.addColorStop(0, '#0e0e16'); bg.addColorStop(0.5, '#161622'); bg.addColorStop(1, '#09090f');
    cx.fillStyle = bg; cx.fillRect(0, 0, 1024, 1024);

    cx.strokeStyle = 'rgba(255,199,44,0.6)'; cx.lineWidth = 5;
    cx.beginPath(); cx.arc(512, 512, 340, 0, Math.PI * 2); cx.stroke();

    var rg = cx.createRadialGradient(512, 512, 0, 512, 512, 250);
    rg.addColorStop(0, 'rgba(255,23,68,0.4)'); rg.addColorStop(1, 'rgba(0,0,0,0)');
    cx.fillStyle = rg; cx.fillRect(0, 0, 1024, 1024);

    cx.fillStyle = '#ffc72c'; cx.font = '900 130px sans-serif'; cx.textAlign = 'center';
    cx.shadowColor = 'rgba(255,199,44,0.6)'; cx.shadowBlur = 30;
    cx.fillText('GLM', 512, 555);
    cx.shadowColor = 'rgba(0,0,0,0)'; cx.shadowBlur = 0;

    cx.fillStyle = 'rgba(255,255,255,0.7)'; cx.font = '600 24px sans-serif';
    cx.fillText('DIGITAL MARKETING & PERFORMANCE', 512, 640);
    cx.fillStyle = '#FF1744'; cx.font = 'bold 20px sans-serif';
    cx.fillText('WWW.GLOBALLOGICMEDIA.COM', 512, 685);

    var tex = new T.CanvasTexture(cv);
    tex.generateMipmaps = true; tex.minFilter = T.LinearMipmapLinearFilter;
    return tex;
  }

  function mountLogo(container) {
    _logoStarted = true;
    var T = window.THREE;

    // Remove any leftover canvas
    var old = container.querySelector('#glm-logo-canvas');
    if (old) old.remove();

    var cv = document.createElement('canvas');
    cv.id = 'glm-logo-canvas';
    cv.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;z-index:10;border-radius:16px;pointer-events:auto;';
    container.style.position = 'relative';
    container.style.overflow = 'visible';
    container.appendChild(cv);

    var W = container.clientWidth || 520, H = container.clientHeight || 520;
    var scene = new T.Scene();
    var cam = new T.PerspectiveCamera(45, W / H, 0.1, 100);
    cam.position.set(0, 0, 5.4);
    var renderer = new T.WebGLRenderer({ canvas: cv, antialias: true, alpha: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    renderer.toneMapping = T.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;

    _cardGroup = new T.Group();
    scene.add(_cardGroup);

    // Lights
    scene.add(new T.AmbientLight(0xffffff, 0.9));
    var kl = new T.DirectionalLight(0xffffff, 1.3); kl.position.set(4, 5, 5); scene.add(kl);
    var gl = new T.PointLight(0xffc72c, 2.5, 12); gl.position.set(-3, 3, 4); scene.add(gl);
    var rl = new T.PointLight(0xff1744, 3.0, 12); rl.position.set(2, -3, 3); scene.add(rl);

    // Materials
    var goldMat = new T.MeshStandardMaterial({ color: 0xffc72c, roughness: 0.18, metalness: 0.95, emissive: 0xff9900, emissiveIntensity: 0.15 });
    var frontMat = new T.MeshPhysicalMaterial({ map: makeFrontTex(), roughness: 0.15, metalness: 0.45, clearcoat: 0.9, clearcoatRoughness: 0.1, reflectivity: 0.9 });
    var backMat = new T.MeshPhysicalMaterial({ map: makeBackTex(), roughness: 0.2, metalness: 0.8, clearcoat: 0.7, clearcoatRoughness: 0.15 });

    // Card
    var card = new T.Mesh(new T.BoxGeometry(3.3, 3.3, 0.16), [goldMat, goldMat, goldMat, goldMat, frontMat, backMat]);
    _cardGroup.add(card);

    // Gold trim bars
    [[3.38, 0.04, 0.22, 0, 1.67, 0],[3.38, 0.04, 0.22, 0, -1.67, 0],[0.04, 3.34, 0.22, -1.67, 0, 0],[0.04, 3.34, 0.22, 1.67, 0, 0]]
      .forEach(function(t) {
        var b = new T.Mesh(new T.BoxGeometry(t[0], t[1], t[2]), goldMat);
        b.position.set(t[3], t[4], t[5]); _cardGroup.add(b);
      });

    // Ember particles
    var eg = new T.BufferGeometry();
    var ep = new Float32Array(40 * 3);
    for (var i = 0; i < 40; i++) {
      ep[i*3]=(Math.random()-0.5)*5.5; ep[i*3+1]=(Math.random()-0.5)*5.5; ep[i*3+2]=(Math.random()-0.5)*3;
    }
    eg.setAttribute('position', new T.BufferAttribute(ep, 3));
    var embers = new T.Points(eg, new T.PointsMaterial({ color: 0xffc72c, size: 0.06, transparent: true, opacity: 0.8, blending: T.AdditiveBlending }));
    scene.add(embers);

    // Events
    container.addEventListener('mousemove', function(e) {
      var r = container.getBoundingClientRect();
      _logoMouse.tx = ((e.clientX - r.left) / r.width * 2 - 1) * 0.75;
      _logoMouse.ty = -(((e.clientY - r.top) / r.height * 2 - 1)) * 0.75;
      _logoHovered = true;
    });
    container.addEventListener('mouseleave', function() { _logoMouse.tx = 0; _logoMouse.ty = 0; _logoHovered = false; });
    window.addEventListener('scroll', function() {
      var d = window.scrollY - _lastScroll;
      if (_cardGroup) _cardGroup.rotation.y += d * 0.003;
      _lastScroll = window.scrollY;
    }, { passive: true });

    new ResizeObserver(function() {
      var w = container.clientWidth, h = container.clientHeight;
      if (w && h) { cam.aspect = w / h; cam.updateProjectionMatrix(); renderer.setSize(w, h); }
    }).observe(container);

    var tc = 0;
    (function logoTick() {
      requestAnimationFrame(logoTick);
      if (!_cardGroup) return;
      tc += 0.016;
      _logoMouse.x += (_logoMouse.tx - _logoMouse.x) * 0.08;
      _logoMouse.y += (_logoMouse.ty - _logoMouse.y) * 0.08;
      if (_logoHovered) {
        _cardGroup.rotation.y += (_logoMouse.x * 0.85 - _cardGroup.rotation.y) * 0.08;
        _cardGroup.rotation.x += (_logoMouse.y * 0.65 - _cardGroup.rotation.x) * 0.08;
        _cardGroup.rotation.z = -_logoMouse.x * 0.15;
      } else {
        _cardGroup.rotation.y += (Math.sin(tc * 0.8) * 0.28 - _cardGroup.rotation.y) * 0.05;
        _cardGroup.rotation.x += (Math.cos(tc * 0.6) * 0.12 - _cardGroup.rotation.x) * 0.05;
        _cardGroup.rotation.z = Math.sin(tc * 0.5) * 0.04;
      }
      _cardGroup.position.y = Math.sin(tc * 1.2) * 0.10;
      embers.rotation.y = tc * 0.05; embers.rotation.x = tc * 0.03;
      renderer.render(scene, cam);
    })();
  }

  // ─── Find the About Image Container ─────────────────────────────────────────
  function findLogoContainer() {
    // Strategy 1: Framer data-framer-name attribute
    var aboutSec = document.querySelector('[data-framer-name="about me section"]')
                || document.querySelector('[data-framer-name*="about"]')
                || document.querySelector('#about-me');

    if (aboutSec) {
      var wrap = aboutSec.querySelector('.framer-vbrsas')
               || aboutSec.querySelector('[data-framer-background-image-wrapper="true"]')
               || aboutSec.querySelector('[class*="framer-"][style*="overflow"]');
      if (wrap) return wrap;

      // Find the first img in about section
      var img = aboutSec.querySelector('img');
      if (img) return img.parentElement;
    }

    // Strategy 2: search all framer image containers for the circles image
    var imgs = document.querySelectorAll('img[src*="roWFLkzHAotwSx5UxGPxpxMeA"]');
    if (imgs.length) return imgs[0].parentElement;

    return null;
  }

  function tryMountLogo() {
    // Already mounted and still in DOM → nothing to do
    if (_logoStarted && document.getElementById('glm-logo-canvas')) return;

    var container = findLogoContainer();
    if (!container) return; // Framer hasn't rendered this section yet

    // Hide the original image
    var img = container.querySelector('img');
    if (img) { img.style.opacity = '0'; img.style.pointerEvents = 'none'; }

    mountLogo(container);
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // BOOTSTRAP — start AFTER Framer hydrates (~1.5 s typical)
  // MutationObserver keeps background canvas alive after any React re-render
  // ═══════════════════════════════════════════════════════════════════════════
  whenThree(function () {
    // Build the background canvas object (but don't insert yet)
    buildBgCanvas();

    // Insert and keep alive
    function ensureBg() {
      if (_bgCanvas && !document.body.contains(_bgCanvas)) {
        document.body.insertBefore(_bgCanvas, document.body.firstChild);
      }
    }

    ensureBg();

    // Watch body for any child-list mutations and re-add canvas
    var bodyObserver = new MutationObserver(ensureBg);
    bodyObserver.observe(document.body, { childList: true });

    // Poll logo mount — start after a delay to let Framer hydrate
    setTimeout(function () {
      tryMountLogo();
      setInterval(tryMountLogo, 600);
    }, 1200);
  });

})();
