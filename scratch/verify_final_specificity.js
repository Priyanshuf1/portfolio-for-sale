const https = require('https');
const fs = require('fs');

console.log('Fetching live deployed HTML to verify final logo specificity fixes...');
https.get('https://portfolio-for-sale.vercel.app/?nocache=' + Date.now(), {
  headers: {
    'Cache-Control': 'no-cache',
    'Pragma': 'no-cache'
  }
}, (res) => {
  let d = '';
  res.on('data', (c) => { d += c; });
  res.on('end', () => {
    fs.writeFileSync('scratch/live_final_perfect.html', d);
    console.log('Saved live final perfect HTML. Length:', d.length);
    
    // Look for duplicate specificity rule
    const containsSpecificity = d.includes('html body .framer-1lcme9');
    console.log('Live contains html body .framer-1lcme9 specificity rule:', containsSpecificity);
  });
}).on('error', (err) => {
  console.error('Error fetching:', err.message);
});
