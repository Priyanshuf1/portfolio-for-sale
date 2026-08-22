(function() {
  // ====================================================
  // IMAGE TRAIL — p5.js based, replaces Recent Works
  // Adapted from https://image-trail-p5.webflow.io/
  // Uses work1.png → work4.png as trail images
  // ====================================================

  var p5Instance = null;
  var clientX = -1000;
  var clientY = -1000;

  // Track mouse position globally
  window.addEventListener('mousemove', function(e) {
    clientX = e.clientX;
    clientY = e.clientY;
  });

  // Track touch position for mobile devices
  window.addEventListener('touchmove', function(e) {
    if (e.touches && e.touches[0]) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    }
  }, { passive: true });

  function inject() {
    var recentWorkEl = document.querySelector('[data-framer-name="about me section"]') || document.getElementById('about-me');
    if (!recentWorkEl) return;

    // Hide original section
    if (recentWorkEl.style.display !== 'none') {
      recentWorkEl.style.display = 'none';
      recentWorkEl.style.visibility = 'hidden';
      recentWorkEl.style.height = '0';
      recentWorkEl.style.overflow = 'hidden';
      recentWorkEl.style.padding = '0';
      recentWorkEl.style.margin = '0';
    }

    // If already injected, make sure it's in the DOM at the correct position
    var existingSection = document.getElementById('glm-image-trail-section');
    if (existingSection) {
      if (recentWorkEl.nextSibling !== existingSection) {
        recentWorkEl.parentNode.insertBefore(existingSection, recentWorkEl.nextSibling);
      }
      return;
    }

    // Build the replacement section
    var section = document.createElement('section');
    section.id = 'glm-image-trail-section';
    section.style.cssText = [
      'position:relative',
      'width:100%',
      'min-height:100vh',
      'background:#050507',
      'display:flex',
      'flex-direction:column',
      'align-items:center',
      'justify-content:center',
      'overflow:hidden',
      'z-index:2'
    ].join(';');

    // Canvas parent (p5 mounts here)
    var canvasParent = document.createElement('div');
    canvasParent.id = 'canvas-parent';
    canvasParent.style.cssText = 'position:absolute;inset:0;z-index:1;pointer-events:none;';
    section.appendChild(canvasParent);

    // Overlay text
    var overlay = document.createElement('div');
    overlay.style.cssText = [
      'position:relative',
      'z-index:10',
      'text-align:center',
      'pointer-events:none',
      'user-select:none',
      'mix-blend-mode:difference'
    ].join(';');
    overlay.innerHTML = [
      '<p style="color:#FF1744;font-size:clamp(12px,1.2vw,16px);letter-spacing:0.3em;text-transform:uppercase;margin-bottom:24px;font-family:sans-serif;font-weight:700;">Recent Work</p>',
      '<h2 style="color:#ffffff;font-size:clamp(48px,8vw,120px);font-weight:900;line-height:0.9;font-family:sans-serif;margin:0;">Move your<br>cursor</h2>'
    ].join('');
    section.appendChild(overlay);

    // Insert section after the hidden one
    recentWorkEl.parentNode.insertBefore(section, recentWorkEl.nextSibling);

    // Load p5.js and launch the sketch
    if (window.p5) {
      launchSketch(section);
    } else {
      var p5Script = document.createElement('script');
      p5Script.src = 'https://cdn.jsdelivr.net/npm/p5@1.9.4/lib/p5.min.js';
      p5Script.onload = function() { launchSketch(section); };
      document.head.appendChild(p5Script);
    }
  }

  function launchSketch(section) {
    if (p5Instance) {
      p5Instance.remove();
    }

    var imageUrls = [
      './work1.png',
      './work2.png',
      './work3.png',
      './work4.png'
    ];

    var distThreshold = 75; // Distance mouse needs to move before next image
    var scaleFactor = 4;    // Scale factor to size images

    p5Instance = new p5(function(p) {
      var images = [];
      var queue = [];
      var lastPos = { x: -1000, y: -1000 };
      var imgIndex = 0;

      p.preload = function() {
        for (var i = 0; i < imageUrls.length; i++) {
          images[i] = p.loadImage(imageUrls[i]);
        }
      };

      p.setup = function() {
        var cnv = p.createCanvas(p.windowWidth, p.windowHeight);
        cnv.parent('canvas-parent');
        cnv.style('display', 'block');
        cnv.style('position', 'absolute');
        cnv.style('inset', '0');
        p.imageMode(p.CENTER);
      };

      p.draw = function() {
        p.clear();

        // Calculate mouse relative to section top-left
        var rect = section.getBoundingClientRect();
        var mx = clientX - rect.left;
        var my = clientY - rect.top;

        // Pure boundary check — no enter/leave events needed!
        if (mx >= 0 && mx <= rect.width && my >= 0 && my <= rect.height) {
          if (lastPos.x === -1000) {
            lastPos = { x: mx, y: my };
          }
          var d = p.dist(mx, my, lastPos.x, lastPos.y);
          if (d > distThreshold) {
            queue.unshift({ x: mx, y: my, index: imgIndex, life: 1.0 });
            lastPos = { x: mx, y: my };
            imgIndex = (imgIndex + 1) % images.length;
          }
        }

        // Keep queue size managed
        if (queue.length > 25) {
          queue.pop();
        }

        var scaleVal = p.width / scaleFactor;

        // Draw images in queue (reversed so newest is on top)
        for (var i = queue.length - 1; i >= 0; i--) {
          var item = queue[i];
          item.life -= 0.015; // Slow fade out
          if (item.life <= 0) {
            queue.splice(i, 1);
            continue;
          }

          var img = images[item.index];
          if (img && img.width > 0) {
            var imgWidth = (img.width * scaleVal) / img.width;
            var imgHeight = (img.height * scaleVal) / img.width;

            p.push();
            p.translate(item.x, item.y);
            p.rotate(p.sin(i * 0.4) * 0.1);
            p.tint(255, item.life * 255);
            p.image(img, 0, 0, imgWidth, imgHeight);
            p.pop();
          }
        }
      };

      p.windowResized = function() {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
      };
    }, 'canvas-parent');
  }

  // Run continuously to survive Framer React hydration and re-renders
  setInterval(inject, 500);

  // Monitor DOM modifications to immediately re-run inject
  var observer = new MutationObserver(inject);
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      observer.observe(document.body, { childList: true, subtree: true });
      inject();
    });
  } else {
    observer.observe(document.body, { childList: true, subtree: true });
    inject();
  }

})();
