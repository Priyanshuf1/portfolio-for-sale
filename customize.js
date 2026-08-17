const fs = require('fs');
const path = require('path');

// ──────────────────────────────────────────────
//  1. COLOUR REPLACEMENTS (Clean Dark + Electric Cyan & Silver Accents)
// ──────────────────────────────────────────────
const colorReplacements = [
    { from: /#06B6D4/gi, to: '#06B6D4' },
    { from: /#38BDF8/gi, to: '#38BDF8' },
    { from: /#06B6D4/gi, to: '#06B6D4' },
    { from: /rgb\(212,\s*175,\s*55\)/g, to: 'rgb(6, 182, 212)' },
    { from: /rgba\(212,\s*175,\s*55/g, to: 'rgba(6, 182, 212' },
];

// ──────────────────────────────────────────────
//  2. TEXT REPLACEMENTS
// ──────────────────────────────────────────────
const textReplacements = [
    { from: /Portfolio For Sale/g, to: 'Global Logic Media — Digital Marketing Agency' },
];

// ──────────────────────────────────────────────
//  3. CUSTOM CSS INJECTION (Awwwards Electric Cyan + Metallic Silver Theme)
// ──────────────────────────────────────────────
const customCSS = `
<style id="priyanshu-custom-theme">
  /* ── Awwwards Electric Cyan & Metallic Silver Theme ── */
  :root {
    --accent-cyan: #06B6D4;
    --accent-blue: #38BDF8;
  }

  /* Headings → Crisp Metallic Silver White Gradient */
  h1, h2 {
    background: linear-gradient(180deg, #FFFFFF 0%, #CBD5E1 100%) !important;
    -webkit-background-clip: text !important;
    -webkit-text-fill-color: transparent !important;
    background-clip: text !important;
  }

  /* Scrollbar */
  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: #070709; }
  ::-webkit-scrollbar-thumb { background: #06B6D4; border-radius: 3px; }

  /* Selection highlight */
  ::selection { background: rgba(6, 182, 212, 0.35); color: #fff; }

  /* Nav bar glass */
  header, nav, [data-framer-name="Navbar"],
  [data-framer-name="nav"], [data-framer-name="Nav"] {
    background: rgba(10, 10, 16, 0.85) !important;
    backdrop-filter: blur(20px) !important;
    -webkit-backdrop-filter: blur(20px) !important;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1) !important;
  }

  /* All primary CTA buttons → Electric Cyan & Blue Gradient */
  a[class*="framer-"][class*="1dk6y11"],
  a[class*="framer-"][class*="1z0enj7"],
  a[class*="framer-1z0enj7"],
  a[class*="framer-1dk6y11"] {
    background: linear-gradient(135deg, #06B6D4 0%, #2563EB 100%) !important;
    color: #FFFFFF !important;
    font-weight: 700 !important;
    border: none !important;
    box-shadow: 0 0 25px rgba(6, 182, 212, 0.45) !important;
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1) !important;
  }
  a[class*="framer-"][class*="1dk6y11"]:hover,
  a[class*="framer-"][class*="1z0enj7"]:hover {
    box-shadow: 0 0 40px rgba(6, 182, 212, 0.7) !important;
    transform: translateY(-2px) scale(1.03) !important;
  }

  /* Project card overlay border */
  [data-framer-name="View Project"],
  [data-framer-name="View Casestudy"] {
    border-color: rgba(6, 182, 212, 0.4) !important;
    background-color: rgba(10, 14, 39, 0.75) !important;
  }

  /* Dividers */
  [data-framer-name="separation"] {
    background-color: rgba(255, 255, 255, 0.1) !important;
    opacity: 1 !important;
  }

  /* Cursor */
  [class*="cursor"], [data-framer-cursor] {
    background: #06B6D4 !important;
    mix-blend-mode: normal !important;
  }

  /* "Available / Open to projects" badge */
  [class*="framer-"][class*="jral3p"] {
    border: 1px solid rgba(6, 182, 212, 0.5) !important;
    background: rgba(6, 182, 212, 0.1) !important;
    color: #06B6D4 !important;
  }

  /* Social icon hover */
  a[class*="framer-ir3zuj"]:hover svg,
  a[class*="framer-ir3zuj"]:hover use {
    --21h8s6: #06B6D4 !important;
  }

  html { scroll-behavior: smooth; }
</style>
`;

function processFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    const original = content;

    for (const r of colorReplacements) {
        content = content.replace(r.from, r.to);
    }

    if (filePath.endsWith('index.html')) {
        // Replace existing priyanshu-custom-theme style tag
        content = content.replace(/<style id="priyanshu-custom-theme">[\s\S]*?<\/style>/g, customCSS);
    }

    if (content !== original) {
        fs.writeFileSync(filePath, content);
        console.log(`  ✅ Updated: ${path.basename(filePath)}`);
    }
}

processFile('index.html');
console.log('\n🎨 Updated theme to Awwwards Electric Cyan & Metallic Silver!\n');
