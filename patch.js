const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Remove the old blog drawer if it exists
html = html.replace('<script src="./blog-section.js"></script>\n', '');

// Hide old Framer Client Reviews section
if (!html.includes('/* Hide old testimonials section */')) {
    const hideStyle = `<style>/* Hide old testimonials section */ #testimonials, section[data-framer-name="testimonials"], .framer-izep5p { display: none !important; }</style>\n`;
    html = html.replace('</head>', hideStyle + '</head>');
}

// Inject Firebase init before other custom scripts
if (!html.includes('firebase-init.js')) {
    const firebaseScripts = `
<script src="https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js"></script>
<script src="https://www.gstatic.com/firebasejs/8.10.1/firebase-database.js"></script>
<script src="./firebase-init.js"></script>
`;
    html = html.replace('</body>', firebaseScripts + '</body>');
}

if (!html.includes('custom-footer.js')) html = html.replace('</body>', '<script src="./custom-footer.js"></script>\n</body>');
if (!html.includes('book-a-call-modal.js')) html = html.replace('</body>', '<script src="./book-a-call-modal.js"></script>\n</body>');
if (!html.includes('add-review-modal.js')) html = html.replace('</body>', '<script src="./add-review-modal.js"></script>\n</body>');
if (!html.includes('native-sections.js')) html = html.replace('</body>', '<script src="./native-sections.js"></script>\n</body>');
if (!html.includes('blog-section.js')) html = html.replace('</body>', '<script src="./blog-section.js"></script>\n</body>');
if (!html.includes('location-section.js')) html = html.replace('</body>', '<script src="./location-section.js"></script>\n</body>');
if (!html.includes('admin-panel.js')) html = html.replace('</body>', '<script src="./admin-panel.js"></script>\n</body>');
if (!html.includes('ambient-particles.js')) html = html.replace('</body>', '<script src="./ambient-particles.js"></script>\n</body>');
if (!html.includes('audio-system.js')) html = html.replace('</body>', '<script src="./audio-system.js"></script>\n</body>');
if (!html.includes('svg-decorations.js')) html = html.replace('</body>', '<script src="./svg-decorations.js"></script>\n</body>');
if (!html.includes('rabto-fx-engine.js')) html = html.replace('</body>', '<script src="./rabto-fx-engine.js"></script>\n</body>');
if (!html.includes('bg-enhancer.js')) html = html.replace('</body>', '<script src="./bg-enhancer.js"></script>\n</body>');
if (!html.includes('skills-section.js')) html = html.replace('</body>', '<script src="./skills-section.js"></script>\n</body>');
if (!html.includes('three-bg.js')) html = html.replace('</body>', '<script src="./three-bg.js"></script>\n</body>');
if (!html.includes('global-logic-replacer.js')) html = html.replace('</body>', '<script src="./global-logic-replacer.js"></script>\n</body>');
if (!html.includes('company-details.js')) html = html.replace('</body>', '<script src="./company-details.js"></script>\n</body>');
if (!html.includes('three-logo-interactive.js')) html = html.replace('</body>', '<script src="./three-logo-interactive.js"></script>\n</body>');
if (!html.includes('custom-cursor.js')) html = html.replace('</body>', '<script src="./custom-cursor.js"></script>\n</body>');

fs.writeFileSync('index.html', html);
console.log('Appended firebase-init and native sections to index.html');
