const fs = require('fs');
const https = require('https');
const path = require('path');

const BASE_URL = 'https://portfolio-for-sale.vercel.app';
const JS_DIR = path.join(__dirname, 'js');

if (!fs.existsSync(JS_DIR)) {
  fs.mkdirSync(JS_DIR, { recursive: true });
}

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
         return downloadFile(res.headers.location.startsWith('http') ? res.headers.location : BASE_URL + res.headers.location, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        reject(new Error(`Failed to get '${url}' (${res.statusCode})`));
        return;
      }
      const file = fs.createWriteStream(dest);
      res.pipe(file);
      file.on('finish', () => file.close(resolve));
    }).on('error', (err) => reject(err));
  });
}

async function scrape() {
  console.log('Downloading index.html...');
  await downloadFile(`${BASE_URL}/`, path.join(__dirname, 'index.html'));
  
  const html = fs.readFileSync('index.html', 'utf8');
  const jsFiles = new Set();
  const regex = /["']\.\/(js\/[^"']+\.m?js)["']/g;
  let match;
  while ((match = regex.exec(html)) !== null) {
    jsFiles.add(match[1]);
  }
  
  // also look for framer module imports in script tags
  const importRegex = /from ["']\.\/(js\/[^"']+\.m?js)["']/g;
  while ((match = importRegex.exec(html)) !== null) {
    jsFiles.add(match[1]);
  }

  console.log(`Found ${jsFiles.size} JS files.`);
  
  for (const jsFile of jsFiles) {
    console.log('Downloading', jsFile);
    await downloadFile(`${BASE_URL}/${jsFile}`, path.join(__dirname, jsFile));
  }
  console.log('Done downloading full source!');
}
scrape();
