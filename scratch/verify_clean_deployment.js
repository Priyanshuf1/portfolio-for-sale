const https = require('https');
const fs = require('fs');

console.log('Fetching live deployed HTML to verify final duplicate logo hiding fixes...');
https.get('https://portfolio-for-sale.vercel.app/?nocache=' + Date.now(), {
  headers: {
    'Cache-Control': 'no-cache',
    'Pragma': 'no-cache'
  }
}, (res) => {
  let d = '';
  res.on('data', (c) => { d += c; });
  res.on('end', () => {
    fs.writeFileSync('scratch/live_clean.html', d);
    console.log('Saved live clean HTML. Length:', d.length);
    
    // Look for duplicate hiding rule
    const containsDuplicatesHiding = d.includes('.framer-1lcme9 div');
    console.log('Live contains .framer-1lcme9 div duplicate hiding rule:', containsDuplicatesHiding);
  });
}).on('error', (err) => {
  console.error('Error fetching:', err.message);
});
