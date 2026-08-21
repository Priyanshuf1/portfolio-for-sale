const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

const start = html.indexOf('data-framer-name="Services"');
const end = html.indexOf('data-framer-name="testimonials"') !== -1 
  ? html.indexOf('data-framer-name="testimonials"') 
  : html.indexOf('data-framer-name="FAQ\'s"');

const servicesBlock = html.substring(start, end);

// Let's find all text content matching Framer's preset text containers
// e.g. <p class="..." ...>TEXT</p> or <h2 class="..." ...>TEXT</h2> or similar
const textRegex = /<([a-z1-6]+)[^>]*>(.*?)<\/\1>/gi;
let match;
const foundTexts = [];

console.log('Services block length:', servicesBlock.length);

// Let's find unique strings of text in servicesBlock (non-tag texts)
// A simpler way: strip HTML tags and see the text content
let textOnly = servicesBlock.replace(/<[^>]+>/g, '\n');
// Clean up whitespace
textOnly = textOnly.split('\n').map(line => line.trim()).filter(line => line.length > 0);
// Remove duplicates
const uniqueText = [...new Set(textOnly)];

console.log('=== Unique Text in Services Section ===');
uniqueText.forEach((t, i) => {
  if (t.length > 2) console.log(`${i}: "${t}"`);
});
