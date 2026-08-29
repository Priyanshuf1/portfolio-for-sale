const fs = require('fs');
const patch = fs.readFileSync('patch.js', 'utf8');

const target = 'glb-mobile-responsive';
let idx = 0;
let count = 0;
while ((idx = patch.indexOf(target, idx)) !== -1) {
  count++;
  console.log(`Match ${count} at index ${idx}:`);
  console.log(patch.substring(Math.max(0, idx - 100), Math.min(patch.length, idx + 200)).replace(/\n/g, ' '));
  idx += target.length;
}
