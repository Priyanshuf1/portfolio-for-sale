// ============================================================
// BACKUP: 3D Interactive Logo Model for Meet Global Logic Media
// Saved from commit c5bede9 — 2026-08-22
// To restore: copy this to three-logo-interactive.js
// ============================================================
(function() {
  var style = document.createElement('style');
  style.textContent = [
    '.framer-vbrsas { filter: none !important; -webkit-filter: none !important; }',
    '.framer-vbrsas * { filter: none !important; -webkit-filter: none !important; }',
    '#glb-3d-logo-canvas { filter: none !important; -webkit-filter: none !important; }',
    '.framer-12f38e1 * { overflow: visible !important; }',
    '.framer-12f38e1 h1, .framer-12f38e1 h2 { padding-bottom: 10px !important; line-height: 1.3 !important; }'
  ].join('\n');
  document.head.appendChild(style);

  var mouse = { x: 0, y: 0, tx: 0, ty: 0 };
  var angle = 0;
  var scene, camera, renderer, mesh, mountedIn;

  window.addEventListener('mousemove', function(e) {
    mouse.tx = (e.clientX / window.innerWidth - 0.5) * 2.5;
    mouse.ty = -(e.clientY / window.innerHeight - 0.5) * 2.5;
  });

  function build(container) {
    if (document.getElementById('glb-3d-logo-canvas')) return;
    if (!window.THREE) return;
    mountedIn = container;

    var W = container.clientWidth || 650;
    var H = container.clientHeight || 613;

    var cv = document.createElement('canvas');
    cv.id = 'glb-3d-logo-canvas';
    cv.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;z-index:15;border-radius:inherit;pointer-events:auto;';
    container.style.position = 'relative';
    container.appendChild(cv);

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(40, W / H, 0.1, 100);
    camera.position.z = 7;

    scene.add(new THREE.AmbientLight(0xffffff, 3));
    var dl = new THREE.DirectionalLight(0xFF1744, 4);
    dl.position.set(3, 4, 5);
    scene.add(dl);

    renderer = new THREE.WebGLRenderer({ canvas: cv, antialias: true, alpha: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    var geo = new THREE.BoxGeometry(3.8, 3.8, 0.3);
    var frontMat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true });
    var sideMat = new THREE.MeshStandardMaterial({ color: 0xFF1744, metalness: 0.9, roughness: 0.15, emissive: 0x550000 });
    var mats = [sideMat, sideMat, sideMat, sideMat, frontMat, frontMat];
    mesh = new THREE.Mesh(geo, mats);
    scene.add(mesh);

    new THREE.TextureLoader().load('./logo.png', function(tex) {
      frontMat.map = tex;
      frontMat.needsUpdate = true;
    });

    new ResizeObserver(function() {
      var w = container.clientWidth, h = container.clientHeight;
      if (w && h) { camera.aspect = w / h; camera.updateProjectionMatrix(); renderer.setSize(w, h); }
    }).observe(container);

    loop();
  }

  function loop() {
    requestAnimationFrame(loop);
    if (!mesh) return;
    mouse.x += (mouse.tx - mouse.x) * 0.12;
    mouse.y += (mouse.ty - mouse.y) * 0.12;
    angle += 0.012;
    mesh.rotation.y = mouse.x + Math.sin(angle) * 0.2;
    mesh.rotation.x = mouse.y + Math.sin(angle * 0.6) * 0.07;
    mesh.position.y = Math.sin(angle * 1.4) * 0.12;
    renderer.render(scene, camera);
  }

  function tryMount() {
    if (document.getElementById('glb-3d-logo-canvas')) return;
    var logoImg;
    var allImgs = document.querySelectorAll('img');
    for (var i = 0; i < allImgs.length; i++) {
      if (allImgs[i].src.indexOf('logo.png') !== -1 && allImgs[i].clientWidth > 400) {
        logoImg = allImgs[i]; break;
      }
    }
    if (!logoImg) return;
    logoImg.style.opacity = '0';
    logoImg.style.visibility = 'hidden';
    var container = logoImg.parentElement;
    while (container && container.clientWidth < 200) container = container.parentElement;

    if (window.THREE) {
      build(container);
    } else {
      var s = document.createElement('script');
      s.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
      s.onload = function() { build(container); };
      document.head.appendChild(s);
    }
  }

  var timer = setInterval(function() {
    tryMount();
    if (document.getElementById('glb-3d-logo-canvas')) clearInterval(timer);
  }, 200);

  new MutationObserver(function() {
    if (!document.getElementById('glb-3d-logo-canvas')) tryMount();
  }).observe(document.body, { childList: true, subtree: true });

})();
