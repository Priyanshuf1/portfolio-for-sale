const https = require('https');
const fs = require('fs');

console.log('Fetching live deployed HTML to check changes...');
https.get('https://portfolio-for-sale.vercel.app/?nocache=' + Date.now(), {
  headers: {
    'Cache-Control': 'no-cache',
    'Pragma': 'no-cache'
  }
}, (res) => {
  let d = '';
  res.on('data', (c) => { d += c; });
  res.on('end', () => {
    fs.writeFileSync('scratch/after_live.html', d);
    console.log('Saved live after HTML. Length:', d.length);
    console.log('Contains glb-mobile-responsive?', d.includes('glb-mobile-responsive'));
    
    // Simple line count comparison
    const baseline = fs.readFileSync('scratch/baseline_live.html', 'utf8');
    console.log('Baseline Length:', baseline.length);
    console.log('Difference in length:', d.length - baseline.length);
  });
}).on('error', (err) => {
  console.error('Error fetching:', err.message);
});
