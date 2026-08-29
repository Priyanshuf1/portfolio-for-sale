const https = require('https');
const fs = require('fs');

console.log('Fetching live deployed HTML to verify final spacing and logo fixes...');
https.get('https://portfolio-for-sale.vercel.app/?nocache=' + Date.now(), {
  headers: {
    'Cache-Control': 'no-cache',
    'Pragma': 'no-cache'
  }
}, (res) => {
  let d = '';
  res.on('data', (c) => { d += c; });
  res.on('end', () => {
    fs.writeFileSync('scratch/live_perfect.html', d);
    console.log('Saved live perfect HTML. Length:', d.length);
    
    // Look for padding-top: 100px
    const containsPadding = d.includes('padding-top: 100px !important;');
    console.log('Live contains padding-top: 100px !important;:', containsPadding);
    
    // Look for background: none !important; on logo
    const containsBgNone = d.includes('background: none !important;\n      background-image: none !important;');
    const containsBgNoneSingleLine = d.includes('background: none !important; background-image: none !important;');
    console.log('Live contains background: none !important;:', containsBgNone || containsBgNoneSingleLine || d.includes('background: none !important;'));
  });
}).on('error', (err) => {
  console.error('Error fetching:', err.message);
});
