const https = require('https');
const fs = require('fs');

console.log('Fetching live production HTML to verify clean rebuild deploy...');
https.get('https://portfolio-for-sale.vercel.app/?nocache=' + Date.now(), {
  headers: {
    'Cache-Control': 'no-cache',
    'Pragma': 'no-cache'
  }
}, (res) => {
  let d = '';
  res.on('data', (c) => { d += c; });
  res.on('end', () => {
    fs.writeFileSync('scratch/live_perfect_final_deployed.html', d);
    console.log('Saved live production HTML. Length:', d.length);
    
    // Look for link to stylesheet
    const containsCSSLink = d.includes('href="./styles.css"');
    console.log('Live contains rebuilt styles.css reference:', containsCSSLink);
  });
}).on('error', (err) => {
  console.error('Error fetching:', err.message);
});
