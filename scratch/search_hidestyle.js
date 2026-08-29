const fs = require('fs');
const patch = fs.readFileSync('patch.js', 'utf8');

const target = 'hideStyle =';
const idx = patch.indexOf(target);
if (idx !== -1) {
  console.log('Found hideStyle definition at index:', idx);
  console.log(patch.substring(idx, idx + 350).replace(/\n/g, ' '));
} else {
  console.log('hideStyle = not found');
}
