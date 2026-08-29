const fs = require('fs');

const path = 'patch.js';
if (fs.existsSync(path)) {
  let content = fs.readFileSync(path, 'utf8');

  // Normalize newlines
  content = content.replace(/\r\n/g, '\n');

  // 1. Update logo container to hide duplicate background image
  const oldLogoRule = `    /* 1. Scale down logo header on mobile to prevent overflow & overlap */
    .framer-1lcme9 {
      width: 150px !important;
      height: 48px !important;
      background-position: left center !important;
    }`;

  const newLogoRule = `    /* 1. Scale down logo header on mobile to prevent overflow & overlap */
    .framer-1lcme9 {
      width: 160px !important;
      height: 48px !important;
      background: none !important;
      background-image: none !important;
    }`;

  if (content.includes(oldLogoRule)) {
    content = content.replace(oldLogoRule, newLogoRule);
    console.log('✅ Updated logo container rule in patch.js');
  } else {
    console.log('Warn: Could not locate oldLogoRule in patch.js');
  }

  // 2. Separate hero padding to prevent overlapping with floating nav bar
  const oldSpacingRule = `    /* 3. Tighten section spacing to eliminate massive blank page gaps */
    #hero, #about-me, #process, #services, #faq,
    [data-framer-name="hero"],
    [data-framer-name="about me section"],
    [data-framer-name="process"],
    [data-framer-name="Services"],
    [data-framer-name="FAQ's"] {
      min-height: auto !important;
      height: auto !important;
      padding-top: 40px !important;
      padding-bottom: 40px !important;
    }`;

  const newSpacingRule = `    /* 3. Tighten section spacing to eliminate massive blank page gaps */
    #hero,
    [data-framer-name="hero"] {
      min-height: auto !important;
      height: auto !important;
      padding-top: 100px !important; /* Pushes content down to clear the floating header */
      padding-bottom: 40px !important;
    }
    #about-me, #process, #services, #faq,
    [data-framer-name="about me section"],
    [data-framer-name="process"],
    [data-framer-name="Services"],
    [data-framer-name="FAQ's"] {
      min-height: auto !important;
      height: auto !important;
      padding-top: 40px !important;
      padding-bottom: 40px !important;
    }`;

  if (content.includes(oldSpacingRule)) {
    content = content.replace(oldSpacingRule, newSpacingRule);
    console.log('✅ Separated Hero padding rule in patch.js');
  } else {
    console.log('Warn: Could not locate oldSpacingRule in patch.js');
  }

  fs.writeFileSync(path, content);
} else {
  console.log('Error: patch.js not found.');
}
