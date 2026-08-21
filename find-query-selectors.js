const fs = require('fs');
const path = require('path');

const files = fs.readdirSync('.').filter(f => f.endsWith('.js') || f.endsWith('.html'));

files.forEach(file => {
  const code = fs.readFileSync(file, 'utf8');
  if (code.includes('querySelector')) {
    console.log(`=== querySelector in ${file} ===`);
    const lines = code.split('\n');
    lines.forEach((line, idx) => {
      if (line.includes('querySelector')) {
        console.log(`${idx + 1}: ${line.trim()}`);
      }
    });
  }
});
