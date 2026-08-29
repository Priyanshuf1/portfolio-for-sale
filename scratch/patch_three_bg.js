const fs = require('fs');

const path = 'three-bg.js';
if (fs.existsSync(path)) {
  let content = fs.readFileSync(path, 'utf8');

  // Normalize CRLF to LF to avoid line ending mismatches on Windows
  content = content.replace(/\r\n/g, '\n');

  // 1. Replace the CSS rules at the top to use solid white instead of transparent
  content = content.replace(
    /background-color:\s*transparent\s*!important;\n\s*background:\s*transparent\s*!important;/gi,
    'background-color: #ffffff !important;\n      background: #ffffff !important;'
  );

  // 2. Update initVantaTopology to use absolute inline styling constraints and delayed force resize
  const targetOldInit = `  // 3. Initialize Vanta Topology Background Scene
  function initVantaTopology() {
    if (document.getElementById('vanta-bg-container')) return;

    // Create background container wrapper
    const bgContainer = document.createElement('div');
    bgContainer.id = 'vanta-bg-container';
    
    // Insert behind everything
    document.body.insertBefore(bgContainer, document.body.firstChild);

    let vantaEffect = null;
    function startVanta() {
      if (window.VANTA && window.VANTA.TOPOLOGY) {
        vantaEffect = window.VANTA.TOPOLOGY({
          el: "#vanta-bg-container",
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.00,
          minWidth: 200.00,
          scale: 3.50,               // Spacious grid for fewer lines (fewer lines)
          scaleMobile: 5.50,         // Spacious grid on mobile
          color: 0x4b5563,           // Premium Monochrome color (Charcoal #4b5563)
          backgroundColor: 0xffffff  // Solid White background
        });
        console.log('[Vanta] ✅ Topology monochrome lines initialized successfully');
        
        // Initial trigger for opacity setup
        updateCanvasOpacities();
      } else {
        setTimeout(startVanta, 100);
      }
    }
    
    startVanta();
  }`;

  const targetNewInit = `  // 3. Initialize Vanta Topology Background Scene
  function initVantaTopology() {
    let bgContainer = document.getElementById('vanta-bg-container');
    if (!bgContainer) {
      bgContainer = document.createElement('div');
      bgContainer.id = 'vanta-bg-container';
      // Force inline style sizes to prevent 0px dimensions race condition during Vanta init
      bgContainer.style.cssText = 'position: fixed !important; top: 0 !important; left: 0 !important; width: 100vw !important; height: 100vh !important; pointer-events: none !important; z-index: -1 !important; display: block !important; background-color: #ffffff !important;';
      document.body.insertBefore(bgContainer, document.body.firstChild);
    }

    let vantaEffect = null;
    let attempts = 0;
    function startVanta() {
      if (window.VANTA && window.VANTA.TOPOLOGY) {
        try {
          vantaEffect = window.VANTA.TOPOLOGY({
            el: "#vanta-bg-container",
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: window.innerHeight || 600,
            minWidth: window.innerWidth || 800,
            scale: 3.50,
            scaleMobile: 5.50,
            color: 0x4b5563,
            backgroundColor: 0xffffff
          });
          console.log('[Vanta] ✅ Topology monochrome lines initialized successfully');
          
          // Force resize and recalibration after browser paints to guarantee covering full viewport
          setTimeout(() => {
            if (vantaEffect && typeof vantaEffect.resize === 'function') {
              vantaEffect.resize();
            }
          }, 100);
          
          updateCanvasOpacities();
        } catch (err) {
          console.error('[Vanta] Initialization error:', err);
        }
      } else if (attempts < 50) {
        attempts++;
        setTimeout(startVanta, 100);
      }
    }
    
    startVanta();
  }`;

  if (content.includes('initVantaTopology')) {
    content = content.replace(targetOldInit, targetNewInit);
    fs.writeFileSync(path, content);
    console.log('✅ Normalized line endings and successfully patched three-bg.js background color and Vanta container sizing constraints!');
  } else {
    console.log('Error: Could not locate initVantaTopology in three-bg.js');
  }
} else {
  console.log('Error: three-bg.js not found.');
}
