const fs = require('fs');
const content = fs.readFileSync('admin-panel.js', 'utf8');

const regex = /document\.querySelector|document\.getElementById/g;
let m;
while ((m = regex.exec(content)) !== null) {
  const start = Math.max(0, m.index - 50);
  const end = Math.min(content.length, m.index + 120);
  console.log(content.substring(start, end).replace(/\n/g, ' '));
}
