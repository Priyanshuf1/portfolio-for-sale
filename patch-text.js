const fs = require('fs');
const path = require('path');

const SAFE_REPLACEMENTS = [
    // 1. Meta Titles & Names
    [/Portfolite[^<"']*/g, 'Priyanshu — Creative Portfolio'],
    [/Framer Portfolio Template/g, 'Creative Developer Portfolio'],
    [/Portfolio For Sale/g, 'Priyanshu — Creative Portfolio'],

    // 2. Exact Hero string
    [/Branding that you  need Indeed/g, 'Grow Smarter Faster Better'],

    // 3. Exact Substrings
    [/Curious about what we can create together\? Let’s bring something extraordinary to life!/g, "Have a project in mind? Let's build something remarkable together."],
    [/Portfolite is a sleek and professionally designed portfolio template for Framer[^"<}]*/g, 'Priyanshu is a UI/UX Designer, Creative Developer & Freelancer.'],
    
    // 4. Buttons and Badges
    [/Available For (Work|Hire)/g, 'Open to Projects'],
    [/Book a Free Call/g, 'Start a Conversation'],
    [/Remix for free/g, 'Work With Me'],
    
    // 5. Contact & Footer
    [/hello@framebase\.design/g, 'priyanshu@creative.dev'],
    [/All rights reserved, ©2025/g, 'Priyanshu © 2025 · All rights reserved'],
    [/Design In/g, 'Crafted with passion ·'],
];

function processFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;
    for (const [pattern, replacement] of SAFE_REPLACEMENTS) {
        content = content.replace(pattern, replacement);
    }
    if (content !== original) {
        fs.writeFileSync(filePath, content);
        console.log('Patched:', filePath);
    }
}

// Patch JS
const jsDir = path.join(__dirname, 'js');
fs.readdirSync(jsDir).forEach(file => {
    if (file.endsWith('.mjs')) processFile(path.join(jsDir, file));
});
// Patch HTML
processFile(path.join(__dirname, 'index.html'));

console.log('All files safely patched for React Hydration!');
