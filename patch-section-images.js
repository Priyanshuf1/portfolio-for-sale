const fs = require('fs');
const path = require('path');

console.log('=== Patching Section Images (FAQ, Process, Services) ===');

const filesToPatch = [
  'index.html',
  'js/l31sonSvPM96iEFWqw0Ab0nmHNOercM7iLhki8PGTPg.6BnxHPM7.mjs',
  'js/script_main.xNRutfmy.mjs'
];

filesToPatch.forEach(relPath => {
  const filePath = path.join(process.cwd(), relPath);
  if (!fs.existsSync(filePath)) return;

  let content = fs.readFileSync(filePath, 'utf8');

  // FAQ
  content = content.replace(/https:\/\/framerusercontent\.com\/images\/QqqmFNIdzb0HbOiMSHvqZXkwT7w\.[a-zA-Z0-9_\-\?&=.]+/g, './faq_graphics.jpg');
  content = content.replace(/QqqmFNIdzb0HbOiMSHvqZXkwT7w\.png/g, 'faq_graphics.jpg');
  content = content.replace(/\.\/faq_desk\.jpg/g, './faq_graphics.jpg');
  content = content.replace(/\.\/faq_graphics\.jpg[a-zA-Z0-9_\-\?&=.;]*/g, './faq_graphics.jpg');

  // Process
  content = content.replace(/https:\/\/framerusercontent\.com\/images\/djbcRHCD89IflJ1okJAa1J65cuM\.[a-zA-Z0-9_\-\?&=.]+/g, './process_graphics.jpg');
  content = content.replace(/djbcRHCD89IflJ1okJAa1J65cuM\.png/g, 'process_graphics.jpg');
  content = content.replace(/\.\/process_flow\.png/g, './process_graphics.jpg');
  content = content.replace(/\.\/process_graphics\.jpg[a-zA-Z0-9_\-\?&=.;]*/g, './process_graphics.jpg');

  // Services
  content = content.replace(/https:\/\/framerusercontent\.com\/images\/p6Im6dfknHAI0ig4NqDcO4WNpc\.[a-zA-Z0-9_\-\?&=.]+/g, './services_graphics.jpg');
  content = content.replace(/p6Im6dfknHAI0ig4NqDcO4WNpc\.jpg/g, 'services_graphics.jpg');
  content = content.replace(/\.\/services_tablet\.png/g, './services_graphics.jpg');
  content = content.replace(/\.\/services_graphics\.jpg[a-zA-Z0-9_\-\?&=.;]*/g, './services_graphics.jpg');

  fs.writeFileSync(filePath, content);
  console.log(`Updated section images to clean 3D graphics paths in: ${relPath}`);
});
