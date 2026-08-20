const fs = require('fs');

const OLD_HEX = '#FF1744';
const OLD_HEX_LOWER = '#ff1744';
const OLD_RGB = '255, 23, 68';
const NEW_HEX = '#00D4FF';
const NEW_RGB = '0, 212, 255';

const files = [
  'index.html',
  'bg-enhancer.js',
  'ambient-particles.js',
  'custom-footer.js',
];

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  const before = content;

  content = content.replace(new RegExp(OLD_HEX, 'g'), NEW_HEX);
  content = content.replace(new RegExp(OLD_HEX_LOWER, 'g'), NEW_HEX);
  content = content.replace(new RegExp(OLD_RGB, 'g'), NEW_RGB);

  fs.writeFileSync(file, content);
  const changed = (before !== content);
  console.log(`${file}: ${changed ? '✅ updated' : '⚠️ no changes'}`);
}
console.log('\nDone! Brand accent: Electric Cyan #00D4FF');
