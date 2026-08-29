const https = require('https');
const fs = require('fs');

console.log('Fetching live deployed HTML to check background and Vanta fixes...');
https.get('https://portfolio-for-sale.vercel.app/?nocache=' + Date.now(), {
  headers: {
    'Cache-Control': 'no-cache',
    'Pragma': 'no-cache'
  }
}, (res) => {
  let d = '';
  res.on('data', (c) => { d += c; });
  res.on('end', () => {
    fs.writeFileSync('scratch/after_bg_fix.html', d);
    console.log('Saved live after HTML. Length:', d.length);
    
    // Look for three-bg version
    const matches = d.match(/three-bg\.js\?v=\d+/gi);
    console.log('Live three-bg version parameter matches:', matches);
  });
}).on('error', (err) => {
  console.error('Error fetching:', err.message);
});
