const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

let faqStart = html.indexOf('id="faq"');
let faqContent = html.substring(faqStart, faqStart + 15000);

let classes = faqContent.match(/class="([^"]+)"/g) || [];
let uniqueClasses = [...new Set(classes)];
console.log('--- ALL CLASSES IN FAQ SECTION ---');
uniqueClasses.forEach(c => console.log(c));
