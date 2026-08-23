const fs = require('fs');
const path = require('path');

const filesToPatch = [
  'index.html',
  'bg-enhancer.js',
  'ambient-particles.js',
  'custom-footer.js',
  'company-details.js',
  'location-section.js',
  'skills-section.js',
  'native-sections.js',
  'customize.js',
  'book-a-call-modal.js',
  'add-review-modal.js',
  'admin-panel.js',
  'rabto-fx-engine.js'
];

filesToPatch.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (!fs.existsSync(filePath)) {
    console.log(`File not found: ${file}`);
    return;
  }
  
  let content = fs.readFileSync(filePath, 'utf8');
  const original = content;
  
  // Replace gold HEX codes
  content = content.replace(/#FFC72C/g, '#e20001');
  content = content.replace(/#ffc72c/g, '#e20001');
  content = content.replace(/#FFE066/g, '#ff3333');
  content = content.replace(/#ffe066/g, '#ff3333');
  content = content.replace(/#FFF2A3/g, '#ff9999');
  content = content.replace(/#fff2a3/g, '#ff9999');
  content = content.replace(/#D48806/g, '#7f0001');
  content = content.replace(/#d48806/g, '#7f0001');
  content = content.replace(/#FF1744/g, '#e20001'); // Align any old bright red to logo red
  
  // Replace gold RGB values
  content = content.replace(/255,\s*199,\s*44/g, '226, 0, 1');
  content = content.replace(/255,\s*199,\s*45/g, '226, 0, 1'); // Catch minor variations
  content = content.replace(/255,\s*224,\s*102/g, '255, 51, 51');
  
  if (content !== original) {
    fs.writeFileSync(filePath, content);
    console.log(`✅ Swapped gold to brand red in: ${file}`);
  }
});
