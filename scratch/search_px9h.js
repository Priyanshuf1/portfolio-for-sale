const fs = require('fs');
const content = fs.readFileSync('js/script_main.xNRutfmy.mjs', 'utf8');

const target = 'PX9h';
let idx = 0;
let count = 0;
while ((idx = content.indexOf(target, idx)) !== -1) {
  count++;
  console.log(`Match ${count} at index ${idx}:`);
  console.log(content.substring(Math.max(0, idx - 100), Math.min(content.length, idx + 150)).replace(/\n/g, ' '));
  idx += target.length;
}
