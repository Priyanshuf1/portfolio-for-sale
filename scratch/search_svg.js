const fs = require('fs');
const path = require('path');

function searchDir(dir) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      if (file !== 'node_modules' && file !== '.git') {
        searchDir(filePath);
      }
    } else if (file.endsWith('.js') || file.endsWith('.html') || file.endsWith('.mjs')) {
      const content = fs.readFileSync(filePath, 'utf8');
      if (content.includes('340 120') || content.includes('GLOBAL</text>')) {
        console.log('Match found in:', filePath);
      }
    }
  });
}

searchDir('.');
