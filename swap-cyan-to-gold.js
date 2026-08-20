const fs = require('fs');

const files = ['index.html', 'bg-enhancer.js', 'ambient-particles.js', 'custom-footer.js'];

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  const before = content;

  content = content.replace(/#00D4FF/g, '#FFC72C');
  content = content.replace(/#00d4ff/g, '#FFC72C');
  content = content.replace(/0, 212, 255/g, '255, 199, 44');

  fs.writeFileSync(file, content);
  console.log(`${file}: ${before !== content ? '✅ updated' : '⚠️ no changes'}`);
}
console.log('\nDone! Accent restored to Gold #FFC72C');
