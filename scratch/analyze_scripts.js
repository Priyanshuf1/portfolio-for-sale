const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

// Find all script tags
console.log('--- Script tags in index.html ---');
const scripts = html.match(/<script[^>]*>[\s\S]*?<\/script>/gi);
if (scripts) {
  scripts.forEach(s => {
    if (s.includes('src=')) {
      console.log(s.match(/src="([^"]+)"/)?.[0] || s.substring(0, 100));
    } else {
      console.log('Inline script:', s.substring(0, 120).replace(/\n/g, ' ') + '...');
    }
  });
}

// Let's check customize.js content too
console.log('\n--- check customize.js background styles ---');
const customize = fs.readFileSync('customize.js', 'utf8');
const bgStyles = customize.match(/background-color:[^;!]+(!important)?/g);
if (bgStyles) {
  console.log('customize.js background colors:', bgStyles);
}
