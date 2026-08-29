const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

const key = '<script id="glb-scroll-spy-navbar">';
const startIdx = html.indexOf(key);

if (startIdx !== -1) {
  const endIdx = html.indexOf('</script>', startIdx);
  console.log(html.substring(startIdx, endIdx + 9));
} else {
  console.log('glb-scroll-spy-navbar not found');
}
