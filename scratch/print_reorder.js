const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

const key = '// GLM Section Reorder';
const startIdx = html.indexOf(key);

if (startIdx !== -1) {
  const endIdx = html.indexOf('</script>', startIdx);
  console.log(html.substring(startIdx, endIdx + 9));
} else {
  console.log('GLM Section Reorder script not found');
}
