const fs = require('fs');
const path = require('path');

const customCSS = `
<style id="priyanshu-custom-theme">
  /* ── Blackish Silver & Platinum Titanium Theme ── */
  :root {
    --silver-primary: #FFFFFF;
    --silver-secondary: #E2E8F0;
    --silver-muted: #94A3B8;
    --black-obsidian: #050507;
    --black-card: #121218;
  }

  /* Headings → Brushed Liquid Platinum Silver Gradient */
  h1, h2 {
    background: linear-gradient(180deg, #FFFFFF 0%, #E2E8F0 50%, #64748B 100%) !important;
    -webkit-background-clip: text !important;
    -webkit-text-fill-color: transparent !important;
    background-clip: text !important;
  }

  /* Scrollbar */
  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: #050507; }
  ::-webkit-scrollbar-thumb { background: #94A3B8; border-radius: 3px; }

  /* Selection highlight */
  ::selection { background: rgba(255, 255, 255, 0.25); color: #ffffff; }

  /* Nav bar glass */
  header, nav, [data-framer-name="Navbar"],
  [data-framer-name="nav"], [data-framer-name="Nav"] {
    background: rgba(8, 8, 12, 0.85) !important;
    backdrop-filter: blur(20px) !important;
    -webkit-backdrop-filter: blur(20px) !important;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1) !important;
  }

  /* Primary CTA Buttons → Liquid Platinum Silver Gradient */
  a[class*="framer-"][class*="1dk6y11"],
  a[class*="framer-"][class*="1z0enj7"],
  a[class*="framer-1z0enj7"],
  a[class*="framer-1dk6y11"] {
    background: linear-gradient(135deg, #FFFFFF 0%, #E2E8F0 40%, #94A3B8 100%) !important;
    color: #050507 !important;
    font-weight: 700 !important;
    border: none !important;
    box-shadow: 0 0 25px rgba(255, 255, 255, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.6) !important;
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1) !important;
  }
  a[class*="framer-"][class*="1dk6y11"]:hover,
  a[class*="framer-"][class*="1z0enj7"]:hover {
    box-shadow: 0 0 40px rgba(255, 255, 255, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.8) !important;
    transform: translateY(-2px) scale(1.03) !important;
  }

  /* Project card overlay border */
  [data-framer-name="View Project"],
  [data-framer-name="View Casestudy"] {
    border-color: rgba(255, 255, 255, 0.3) !important;
    background-color: rgba(18, 18, 24, 0.85) !important;
  }

  /* Dividers */
  [data-framer-name="separation"] {
    background-color: rgba(255, 255, 255, 0.1) !important;
    opacity: 1 !important;
  }

  /* Cursor */
  [class*="cursor"], [data-framer-cursor] {
    background: #FFFFFF !important;
    mix-blend-mode: normal !important;
  }

  /* "Available / Open to projects" badge */
  [class*="framer-"][class*="jral3p"] {
    border: 1px solid rgba(255, 255, 255, 0.4) !important;
    background: rgba(255, 255, 255, 0.08) !important;
    color: #FFFFFF !important;
  }

  /* Social icon hover */
  a[class*="framer-ir3zuj"]:hover svg,
  a[class*="framer-ir3zuj"]:hover use {
    --21h8s6: #FFFFFF !important;
  }

  html { scroll-behavior: smooth; }
</style>
`;

function processFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');

    if (filePath.endsWith('index.html')) {
        content = content.replace(/<style id="priyanshu-custom-theme">[\s\S]*?<\/style>/g, customCSS);
        fs.writeFileSync(filePath, content);
        console.log('✅ Applied Blackish Silver & Platinum theme to index.html');
    }
}

processFile('index.html');
