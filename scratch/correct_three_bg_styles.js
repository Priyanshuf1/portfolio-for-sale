const fs = require('fs');

const path = 'three-bg.js';
if (fs.existsSync(path)) {
  let content = fs.readFileSync(path, 'utf8');

  // Normalize CRLF to LF to avoid line ending mismatches on Windows
  content = content.replace(/\r\n/g, '\n');

  // 1. Replace the CSS rules at the top to use solid white for html/body but keep sections transparent
  // Revert the styles variable definition in three-bg.js to correct value
  const stylesBlock = `  const styles = \`
    html, body, html body {
      background-color: #ffffff !important;
      background: #ffffff !important;
      color: #1f2937 !important;
    }

    #rabto-3d-canvas {
      position: fixed;
      top: 0; left: 0;
      width: 100vw; height: 100vh;
      pointer-events: none;
      z-index: -1;
      opacity: 0.35;
      transition: opacity 0.3s ease;
    }

    #vanta-bg-container {
      position: fixed;
      top: 0; left: 0;
      width: 100vw; height: 100vh;
      pointer-events: none;
      z-index: -1;
      opacity: 0;
      display: block;
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
  \`;`;

  // We will find the const styles = ` ... ` block in three-bg.js and replace it with stylesBlock
  // To do this reliably, we can search from const styles = to `;
  const startStylesIdx = content.indexOf('const styles =');
  const endStylesIdx = content.indexOf('const styleEl =');

  if (startStylesIdx !== -1 && endStylesIdx !== -1) {
    content = content.substring(0, startStylesIdx) + stylesBlock + '\n\n  ' + content.substring(endStylesIdx);
    fs.writeFileSync(path, content);
    console.log('✅ Successfully corrected styles block in three-bg.js (html/body white, sections transparent)');
  } else {
    console.log('Error: Could not locate styles block in three-bg.js');
  }
} else {
  console.log('Error: three-bg.js not found.');
}
