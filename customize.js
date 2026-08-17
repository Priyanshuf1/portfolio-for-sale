const fs = require('fs');
const path = require('path');

const customCSS = `
<style id="priyanshu-custom-theme">
  /* ── Luxury Midnight Blue + Gold Theme with Liquid Platinum Silver Buttons ── */
  :root {
    --gold: #D4AF37;
    --gold-light: #F0D060;
    --midnight: #0A0E27;
    --midnight-mid: #131840;
    --midnight-card: #1A2255;
    --silver-liquid: linear-gradient(135deg, #FFFFFF 0%, #E2E8F0 45%, #94A3B8 100%);
  }

  /* Global background */
  body, html {
    background-color: var(--midnight) !important;
  }

  /* Gold text for headings */
  h1, h2 {
    background: linear-gradient(135deg, #D4AF37 0%, #F0D060 50%, #D4AF37 100%) !important;
    -webkit-background-clip: text !important;
    -webkit-text-fill-color: transparent !important;
    background-clip: text !important;
  }

  /* Scrollbar */
  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: var(--midnight); }
  ::-webkit-scrollbar-thumb { background: var(--gold); border-radius: 3px; }

  /* Gold selection highlight */
  ::selection { background: rgba(212,175,55,0.35); color: #fff; }

  /* Nav bar luxury glass */
  header, nav, [data-framer-name="Navbar"],
  [data-framer-name="nav"], [data-framer-name="Nav"] {
    background: rgba(10, 14, 39, 0.85) !important;
    backdrop-filter: blur(20px) !important;
    -webkit-backdrop-filter: blur(20px) !important;
    border-bottom: 1px solid rgba(212, 175, 55, 0.2) !important;
  }

  /* ⚡ ONLY CTA Primary Buttons → Liquid Platinum Silver Gradient ⚡ */
  a[class*="framer-"][class*="1dk6y11"],
  a[class*="framer-"][class*="1z0enj7"],
  a[class*="framer-1z0enj7"],
  a[class*="framer-1dk6y11"],
  a[data-framer-name="Primary"] {
    background: linear-gradient(135deg, #FFFFFF 0%, #E2E8F0 45%, #94A3B8 100%) !important;
    color: #0A0E27 !important;
    font-weight: 700 !important;
    border: none !important;
    box-shadow: 0 0 28px rgba(255, 255, 255, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.8) !important;
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1) !important;
  }
  a[class*="framer-"][class*="1dk6y11"]:hover,
  a[class*="framer-"][class*="1z0enj7"]:hover,
  a[data-framer-name="Primary"]:hover {
    box-shadow: 0 0 45px rgba(255, 255, 255, 0.75), inset 0 1px 0 rgba(255, 255, 255, 0.9) !important;
    transform: translateY(-2px) scale(1.03) !important;
  }

  /* Cards hover glow → Gold */
  [class*="framer-"]:hover > [class*="framer-s7w4jd"] {
    box-shadow: 0 0 40px rgba(212, 175, 55, 0.25) !important;
  }

  /* Project card overlay border → gold tint */
  [data-framer-name="View Project"],
  [data-framer-name="View Casestudy"] {
    border-color: rgba(212, 175, 55, 0.4) !important;
    background-color: rgba(10, 14, 39, 0.75) !important;
  }

  /* Gold divider lines */
  [data-framer-name="separation"] {
    background-color: rgba(212, 175, 55, 0.35) !important;
    opacity: 1 !important;
  }

  /* Cursor dot → gold */
  [class*="cursor"], [data-framer-cursor] {
    background: var(--gold) !important;
    mix-blend-mode: normal !important;
  }

  /* Footer bg */
  footer, [data-framer-name="Footer"] {
    background: var(--midnight) !important;
    border-top: 1px solid rgba(212, 175, 55, 0.15) !important;
  }

  /* "Available / Open to projects" badge → Gold */
  [class*="framer-"][class*="jral3p"] {
    border: 1px solid rgba(212,175,55,0.5) !important;
    background: rgba(212,175,55,0.1) !important;
    color: var(--gold) !important;
  }

  /* Social icon hover → gold */
  a[class*="framer-ir3zuj"]:hover svg,
  a[class*="framer-ir3zuj"]:hover use {
    --21h8s6: #D4AF37 !important;
  }

  html { scroll-behavior: smooth; }
</style>
`;

function processFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');

    if (filePath.endsWith('index.html')) {
        if (content.indexOf('priyanshu-custom-theme') !== -1) {
            content = content.replace(/<style id="priyanshu-custom-theme">[\s\S]*?<\/style>/g, customCSS);
        } else {
            content = content.replace('</head>', customCSS + '\n</head>');
        }
        fs.writeFileSync(filePath, content);
        console.log('✅ Updated index.html with Gold Theme & Liquid Silver Buttons');
    }
}

processFile('index.html');
