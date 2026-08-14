const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Remove the old blog drawer if it exists
html = html.replace('<script src="./blog-section.js"></script>\n', '');

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

fs.writeFileSync('index.html', html);
console.log('Appended firebase-init and native sections to index.html');
