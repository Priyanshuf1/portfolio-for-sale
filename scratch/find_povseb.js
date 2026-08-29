const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

const target = 'framer-povseb';
let idx = 0;
let count = 0;
while ((idx = html.indexOf(target, idx)) !== -1) {
  count++;
  console.log(`Match ${count} at index ${idx}:`);
  console.log(html.substring(Math.max(0, idx - 150), Math.min(html.length, idx + 250)).replace(/\n/g, ' '));
  idx += target.length;
}
