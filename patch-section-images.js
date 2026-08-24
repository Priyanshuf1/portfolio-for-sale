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

  // 1. FAQ (answers) Section Image: QqqmFNIdzb0HbOiMSHvqZXkwT7w -> faq_desk.jpg
  content = content.replace(/https:\/\/framerusercontent\.com\/images\/QqqmFNIdzb0HbOiMSHvqZXkwT7w\.[a-zA-Z0-9_\-\?&=.]+/g, './faq_desk.jpg');
  content = content.replace(/(?<=src="[^"]*)QqqmFNIdzb0HbOiMSHvqZXkwT7w\.png/g, 'faq_desk.jpg');

  // 2. Process Section Image: djbcRHCD89IflJ1okJAa1J65cuM -> process_flow.png
  content = content.replace(/https:\/\/framerusercontent\.com\/images\/djbcRHCD89IflJ1okJAa1J65cuM\.[a-zA-Z0-9_\-\?&=.]+/g, './process_flow.png');
  content = content.replace(/(?<=src="[^"]*)djbcRHCD89IflJ1okJAa1J65cuM\.png/g, 'process_flow.png');

  // 3. Services Section Image: p6Im6dfknHAI0ig4NqDcO4WNpc -> services_tablet.png
  content = content.replace(/https:\/\/framerusercontent\.com\/images\/p6Im6dfknHAI0ig4NqDcO4WNpc\.[a-zA-Z0-9_\-\?&=.]+/g, './services_tablet.png');
  content = content.replace(/(?<=src="[^"]*)p6Im6dfknHAI0ig4NqDcO4WNpc\.jpg/g, 'services_tablet.png');

  fs.writeFileSync(filePath, content);
  console.log(`Updated section images in: ${relPath}`);
});
