const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');
const targets = ['Hero', 'hero', 'about me section', 'About', 'Projects', 'Services', "FAQ", 'Footer'];
const re = /data-framer-name="([^"]+)"/g;
const found = [];
let m;
while ((m = re.exec(html)) !== null) {
  if (targets.indexOf(m[1]) !== -1) {
    found.push({ name: m[1], pos: m.index });
  }
}
found.sort(function(a, b) { return a.pos - b.pos; });
console.log('Section order in HTML:');
found.forEach(function(f, i) {
  console.log((i+1) + '.', f.name, '(pos:', f.pos + ')');
});
