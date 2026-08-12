const fs = require('fs');
const path = require('path');
const https = require('https');

const JS_DIR = path.join(__dirname, 'js');
if (!fs.existsSync(JS_DIR)) {
    fs.mkdirSync(JS_DIR, { recursive: true });
}

const downloaded = new Set();
const queue = [];

function fetchFile(url) {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => resolve(data));
        }).on('error', reject);
    });
}

async function processFile(url) {
    if (downloaded.has(url)) return;
    downloaded.add(url);

    console.log('Downloading:', url);
    let content = await fetchFile(url);
    
    // Find all JS imports in the content
    const importRegex = /https:\/\/framerusercontent\.com\/[a-zA-Z0-9.\/_-]+\.mjs/g;
    const matches = content.match(importRegex) || [];
    
    for (const matchUrl of matches) {
        if (!downloaded.has(matchUrl)) {
            queue.push(matchUrl);
        }
    }

    // Replace all CDN URLs with local paths
    let localContent = content.replace(importRegex, (match) => {
        const filename = match.split('/').pop();
        // Return relative path depending on where this is used. 
        // For simplicity, we just use absolute path from root or relative to js folder.
        // Inside JS files, they are in the same folder.
        return `./${filename}`;
    });

    const filename = url.split('/').pop();
    fs.writeFileSync(path.join(JS_DIR, filename), localContent);
}

async function start() {
    console.log('Starting deep clone...');
    
    // Read index.html to find initial scripts
    let html = fs.readFileSync('index.html', 'utf8');
    const htmlRegex = /https:\/\/framerusercontent\.com\/[a-zA-Z0-9.\/_-]+\.mjs/g;
    const matches = html.match(htmlRegex) || [];
    
    for (const url of matches) {
        queue.push(url);
    }

    while (queue.length > 0) {
        const url = queue.shift();
        await processFile(url);
    }

    // Now update index.html
    html = html.replace(htmlRegex, (match) => {
        const filename = match.split('/').pop();
        return `./js/${filename}`;
    });
    fs.writeFileSync('index.html', html);

    console.log('Deep clone finished. Total files:', downloaded.size);
}

start().catch(console.error);
