(function() {
  // ====================================================
  // IMAGE TRAIL — p5.js based, replaces Recent Works & Projects
  // Adapted from https://image-trail-p5.webflow.io/
  // Uses strictly work1.png → work4.png as trail images
  // Solid black background (hides general site background)
  // Layout optimized to shift headers up and trail down
  // ====================================================

  // Check reduced motion preference
  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var p5Instance = null;
  var clientX = -1000;
  var clientY = -1000;

  if (reducedMotion) {
    // Show static layout instead of animation if reduced motion is preferred
    injectStatic();
    return;
  }

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
    // ── Find and hide the Framer Recent Works (About Me) section ────────
    var recentWorkEl = document.querySelector('[data-framer-name="about me section"]') || document.getElementById('about-me');
    if (recentWorkEl) {
      recentWorkEl.style.display = 'none';
      recentWorkEl.style.visibility = 'hidden';
      recentWorkEl.style.height = '0';
      recentWorkEl.style.overflow = 'hidden';
      recentWorkEl.style.padding = '0';
      recentWorkEl.style.margin = '0';
    }

    // ── Find and hide the Framer Projects section ──────────────────────
    var projectsEl = document.querySelector('[data-framer-name="Projects"]') || document.querySelector('.framer-1mm21uq') || document.getElementById('projects');
    if (projectsEl) {
      projectsEl.style.display = 'none';
      projectsEl.style.visibility = 'hidden';
      projectsEl.style.height = '0';
      projectsEl.style.overflow = 'hidden';
      projectsEl.style.padding = '0';
      projectsEl.style.margin = '0';
    }

    if (!recentWorkEl && !projectsEl) return;

    var insertTarget = recentWorkEl || projectsEl;

    // If already injected, make sure it's in the DOM at the correct position
    var existingSection = document.getElementById('glm-image-trail-section');
    if (existingSection) {
      if (insertTarget.nextSibling !== existingSection) {
        insertTarget.parentNode.insertBefore(existingSection, insertTarget.nextSibling);
      }
      return;
    }

    // Build the replacement section
    var section = document.createElement('section');
    section.id = 'glm-image-trail-section';
    section.style.cssText = [
      'position:relative',
      'width:100%',
      'min-height:160vh', // Clean viewport height
      'background:#000000 !important',
      'display:flex',
      'flex-direction:column',
      'align-items:center',
      'justify-content:flex-start', // Align headers to top, leaving center/bottom open for trail
      'padding-top:15vh',
      'overflow:hidden',
      'z-index:8'
    ].join(';');

    // Canvas parent (p5 mounts here)
    var canvasParent = document.createElement('div');
    canvasParent.id = 'canvas-parent';
    canvasParent.style.cssText = 'position:absolute;inset:0;z-index:1;pointer-events:none;';
    section.appendChild(canvasParent);

    // Overlay text (mix-blend-mode difference makes it change color over images)
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
      '<p style="color:#FF1744;font-size:clamp(14px,1.5vw,20px);letter-spacing:0.4em;text-transform:uppercase;margin-bottom:20px;font-family:sans-serif;font-weight:700;">Recent Work</p>',
      '<h2 style="color:#ffffff;font-size:clamp(56px,10vw,130px);font-weight:900;line-height:0.95;font-family:sans-serif;margin:0;">Move your<br>cursor</h2>',
      '<p style="color:#8A8F98;font-size:clamp(12px,1.1vw,15px);letter-spacing:0.1em;font-family:sans-serif;margin-top:24px;">Interactive Image Trail</p>'
    ].join('');
    section.appendChild(overlay);

    // Insert section after the hidden one
    insertTarget.parentNode.insertBefore(section, insertTarget.nextSibling);

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

    // Strictly use the official work screenshots + campaign and design proofs
    var imageUrls = [
      './work1.png',
      './work2.png',
      './work3.png',
      './work4.png',
      './ss5.png',
      './ss6.png',
      './ss7.png',
      './ss8.png',
      './ss9.png',
      './ss10.png',
      './ss11.png',
      './ss12.png',
      './ss13.png',
      './ss14.png',
      './ss15.png',
      './ss16.png'
    ];

    var distThreshold = 65; // High responsiveness
    var scaleFactor = 3.4;   // Good proportions for work images

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
        // Size canvas exactly to section height to prevent scaling/stretch issues
        var w = section.clientWidth || p.windowWidth;
        var h = section.clientHeight || (p.windowHeight * 1.6);
        var cnv = p.createCanvas(w, h);
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

        // Boundary check
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

        // Manage active trail length
        if (queue.length > 30) {
          queue.pop();
        }

        var scaleVal = p.width / scaleFactor;

        // Draw image queue with rotation and fade
        for (var i = queue.length - 1; i >= 0; i--) {
          var item = queue[i];
          item.life -= 0.015; // Fade out
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
            p.rotate(p.sin(i * 0.45) * 0.12);
            p.tint(255, item.life * 255);
            p.image(img, 0, 0, imgWidth, imgHeight);
            p.pop();
          }
        }
      };

      p.windowResized = function() {
        var w = section.clientWidth || p.windowWidth;
        var h = section.clientHeight || (p.windowHeight * 1.6);
        p.resizeCanvas(w, h);
      };
    }, 'canvas-parent');
  }

  function injectStatic() {
    // Basic fallback layout if user prefers reduced motion
    var recentWorkEl = document.querySelector('[data-framer-name="about me section"]') || document.getElementById('about-me');
    if (recentWorkEl) recentWorkEl.style.display = 'block';
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
