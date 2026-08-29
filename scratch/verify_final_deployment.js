const https = require('https');
const fs = require('fs');

console.log('Fetching live deployed HTML to verify final stylesheet injection...');
https.get('https://portfolio-for-sale.vercel.app/?nocache=' + Date.now(), {
  headers: {
    'Cache-Control': 'no-cache',
    'Pragma': 'no-cache'
  }
}, (res) => {
  let d = '';
  res.on('data', (c) => { d += c; });
  res.on('end', () => {
    fs.writeFileSync('scratch/live_final.html', d);
    console.log('Saved live final HTML. Length:', d.length);
    
    // Look for style block presence
    const hasStyle = d.includes('glb-main-custom-styles');
    console.log('Live contains glb-main-custom-styles:', hasStyle);
    
    // Look for min-height 100vh on povseb/OLpjL
    const containsMinHeight = d.includes('min-height: 100vh !important;');
    console.log('Live style rule contains min-height: 100vh !important;:', containsMinHeight);
  });
}).on('error', (err) => {
  console.error('Error fetching:', err.message);
});
