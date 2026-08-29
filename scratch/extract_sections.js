const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

// Find all section and header tags with their names and pos
const regex = /<(section|header|footer)\b[^>]*?(?:data-framer-name|id|class)=["']([^"']+)["'][^>]*>/gi;
let m;
const tags = [];
while ((m = regex.exec(html)) !== null) {
  tags.push({ tag: m[1], attribute: m[2], index: m.index });
}

// Print some context around each match to understand what section it represents
tags.forEach((t, i) => {
  const start = Math.max(0, t.index - 50);
  const end = Math.min(html.length, t.index + 200);
  console.log(`\nTag ${i+1}: <${t.tag}> with identifier "${t.attribute}" at index ${t.index}`);
  console.log(html.substring(start, end).replace(/\s+/g, ' '));
});
