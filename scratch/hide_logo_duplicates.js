const fs = require('fs');

const path = 'patch.js';
if (fs.existsSync(path)) {
  let content = fs.readFileSync(path, 'utf8');

  // Normalize newlines
  content = content.replace(/\r\n/g, '\n');

  // Find logo rule and update it to hide child divs/images
  const oldLogoRule = `    /* 1. Scale down logo header on mobile to prevent overflow & overlap */
    .framer-1lcme9 {
      width: 160px !important;
      height: 48px !important;
      background: none !important;
      background-image: none !important;
    }`;

  const newLogoRule = `    /* 1. Scale down logo header on mobile to prevent overflow & overlap */
    .framer-1lcme9 {
      width: 160px !important;
      height: 48px !important;
      background: none !important;
      background-image: none !important;
    }
    /* Hide the React-restored duplicate child div and images to prevent double rendering */
    .framer-1lcme9 div,
    .framer-1lcme9 img {
      display: none !important;
    }`;

  if (content.includes(oldLogoRule)) {
    content = content.replace(oldLogoRule, newLogoRule);
    console.log('✅ Updated logo duplicates rule in patch.js');
  } else {
    console.log('Warn: Could not locate oldLogoRule in patch.js');
  }

  fs.writeFileSync(path, content);
} else {
  console.log('Error: patch.js not found.');
}
