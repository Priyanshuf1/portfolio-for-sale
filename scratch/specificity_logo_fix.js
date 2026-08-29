const fs = require('fs');

const path = 'patch.js';
if (fs.existsSync(path)) {
  let content = fs.readFileSync(path, 'utf8');

  // Normalize newlines
  content = content.replace(/\r\n/g, '\n');

  // Increase selector specificity to override any later stylesheets (like #priyanshu-logo-patch)
  const oldLogoRule = `    /* 1. Scale down logo header on mobile to prevent overflow & overlap */
    .framer-1lcme9 {
      width: 160px !important;
      height: 48px !important;
      background: none !important;
      background-image: none !important;
    }`;

  const newLogoRule = `    /* 1. Scale down logo header on mobile to prevent overflow & overlap */
    html body .framer-1lcme9 {
      width: 160px !important;
      height: 48px !important;
      background: none !important;
      background-image: none !important;
    }`;

  if (content.includes(oldLogoRule)) {
    content = content.replace(oldLogoRule, newLogoRule);
    console.log('✅ Successfully increased logo selector specificity in patch.js');
  } else {
    console.log('Warn: Could not find oldLogoRule in patch.js');
  }

  fs.writeFileSync(path, content);
} else {
  console.log('Error: patch.js not found.');
}
