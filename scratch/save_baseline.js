const https = require('https');
const fs = require('fs');

https.get('https://portfolio-for-sale.vercel.app/', (res) => {
  let d = '';
  res.on('data', (c) => { d += c; });
  res.on('end', () => {
    fs.writeFileSync('scratch/baseline_live.html', d);
    console.log('Saved baseline. Length:', d.length);
  });
});
