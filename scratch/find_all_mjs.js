const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

const regex = /src="\.\/js\/[^"]+\.mjs[^"]*"/gi;
const matches = html.match(regex);
console.log('Found .mjs scripts in index.html:', matches);
