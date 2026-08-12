const fs = require('fs');
const path = require('path');

const replacements = [
    { from: /Portfolite/g, to: 'Priyanshu' },
    { from: /Framer Portfolio Template/g, to: 'Creative Developer Portfolio' },
    { from: /Curious about what we can create together\? Let’s bring something extraordinary to life!/g, to: "I am a passionate creative developer building interactive digital experiences." },
    { from: /hello@framebase.design/g, to: "hello@priyanshu.dev" },
    { from: /Available For Work/g, to: "Available For Hire" }
];

function processFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;
    
    for (let r of replacements) {
        content = content.replace(r.from, r.to);
    }
    
    if (content !== original) {
        fs.writeFileSync(filePath, content);
        console.log(`Updated ${filePath}`);
    }
}

function processDirectory(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            processDirectory(fullPath);
        } else if (fullPath.endsWith('.html') || fullPath.endsWith('.mjs')) {
            processFile(fullPath);
        }
    }
}

processDirectory('.');
console.log('Text replacement finished.');
