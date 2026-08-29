const https = require('https');
const fs = require('fs');

console.log('Fetching live deployed HTML to check logo and badge import fixes...');
https.get('https://portfolio-for-sale.vercel.app/?nocache=' + Date.now(), {
  headers: {
    'Cache-Control': 'no-cache',
    'Pragma': 'no-cache'
  }
}, (res) => {
  let d = '';
  res.on('data', (c) => { d += c; });
  res.on('end', () => {
    fs.writeFileSync('scratch/after_logo_fix.html', d);
    console.log('Saved live after HTML. Length:', d.length);
    
    // Look for script_main cache buster
    const matches = d.match(/script_main\.xNRutfmy\.mjs\?v=\d+/gi);
    console.log('Live script_main version parameter matches:', matches);
  });
}).on('error', (err) => {
  console.error('Error fetching:', err.message);
});
