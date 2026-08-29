const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

const target = 'script_main.xNRutfmy.mjs';
let idx = 0;
let count = 0;
while ((idx = html.indexOf(target, idx)) !== -1) {
  count++;
  console.log(`Match ${count} at index ${idx}:`);
  console.log(html.substring(Math.max(0, idx - 50), Math.min(html.length, idx + 100)));
  idx += target.length;
}
