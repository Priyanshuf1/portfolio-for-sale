const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');
const re = /data-framer-name="([^"]+)"/g;
const seen = new Set();
let m;
while ((m = re.exec(html)) !== null) {
  seen.add(m[1]);
}
console.log('All framer section names:');
seen.forEach(function(n) { console.log(' -', n); });
