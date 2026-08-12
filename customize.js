const fs = require('fs');
const path = require('path');

// ──────────────────────────────────────────────
//  1. COLOUR REPLACEMENTS  (Black → Midnight Blue, accents → Gold)
// ──────────────────────────────────────────────
const colorReplacements = [
    // Pure black bg → deep midnight blue
    { from: /rgb\(0,\s*0,\s*0\)/g,              to: 'rgb(10, 14, 39)' },
    { from: /rgb\(4,\s*4,\s*4\)/g,              to: 'rgb(8, 12, 35)' },
    { from: /rgb\(10,\s*10,\s*10\)/g,           to: 'rgb(12, 16, 42)' },
    { from: /rgb\(13,\s*13,\s*13\)/g,           to: 'rgb(14, 18, 45)' },
    { from: /rgb\(3,\s*3,\s*3\)/g,              to: 'rgb(10, 14, 39)' },
    // Dark card / hover bg
    { from: /rgb\(59,\s*59,\s*59\)/g,           to: 'rgb(30, 40, 90)' },
    { from: /rgb\(99,\s*99,\s*99\)/g,           to: 'rgb(40, 55, 110)' },
    { from: /rgb\(163,\s*163,\s*163\)/g,        to: 'rgb(212, 175, 55)' },
    { from: /rgb\(115,\s*115,\s*115\)/g,        to: 'rgb(180, 145, 30)' },
    { from: /rgb\(230,\s*230,\s*230\)/g,        to: 'rgb(212, 175, 55)' },
    // hex equivalents
    { from: /#000000/gi,                         to: '#0A0E27' },
    { from: /#000/gi,                            to: '#0A0E27' },
    // Link blue accent → gold
    { from: /rgb\(0,\s*153,\s*255\)/g,          to: 'rgb(212, 175, 55)' },
];

// ──────────────────────────────────────────────
//  2. TEXT REPLACEMENTS
// ──────────────────────────────────────────────
const textReplacements = [
    // Meta / title
    { from: /Portfolio For Sale/g,              to: 'Priyanshu — Creative Portfolio' },
    { from: /Priyanshu's Creative Developer Portfolio/g, to: 'Priyanshu — Creative Portfolio' },
    { from: /Creative Developer Portfolio/g,    to: 'Priyanshu — Creative Portfolio' },

    // Hero / name
    { from: /Portfolite/g,                      to: 'Priyanshu' },

    // Taglines & hero bio
    {
        from: /I am a passionate creative developer building interactive digital experiences\./g,
        to: 'I design digital experiences that merge aesthetics with function — turning ideas into products people actually love.'
    },
    {
        from: /Curious about what we can create together\? Let's bring something extraordinary to life!/g,
        to: 'Have a project in mind or just want to say hello? Let\'s craft something remarkable together.'
    },
    {
        from: /Curious about what we can create together\? Let.s bring something extraordinary to life!/g,
        to: "Have a project in mind or just want to say hello? Let's craft something remarkable together."
    },

    // Available badge
    { from: /Available For Hire/g,              to: 'Open to Projects' },
    { from: /Available For Work/g,              to: 'Open to Projects' },

    // CTA button text
    { from: /Book a Free Call/g,               to: 'Start a Conversation' },
    { from: /Remix for free/g,                 to: 'Work With Me' },

    // Footer / contact
    { from: /hello@priyanshu\.dev/g,           to: 'priyanshu@creative.dev' },
    { from: /hello@framebase\.design/g,        to: 'priyanshu@creative.dev' },
    { from: /All rights reserved, .?2025/g,    to: 'Priyanshu © 2025 · All rights reserved' },
    { from: /All rights reserved, c2025/g,     to: 'Priyanshu © 2025 · All rights reserved' },
    { from: /Design In/g,                       to: 'Crafted with passion ·' },

    // Nav links (generic)
    { from: /\bWork\b/g,                        to: 'Projects' },
    { from: /\bAbout\b/g,                       to: 'About Me' },

    // Footer attribution
    { from: /framebase/gi,                      to: 'priyanshu' },

    // Cal link
    { from: /https:\/\/cal\.com\/rick\/get-rick-rolled/g, to: 'mailto:priyanshu@creative.dev' },
];

// ──────────────────────────────────────────────
//  3. CUSTOM CSS INJECTION (luxury Midnight Blue + Gold)
// ──────────────────────────────────────────────
const customCSS = `
<style id="priyanshu-custom-theme">
  /* ── Midnight Blue + Gold Luxury Theme ── */
  :root {
    --gold: #D4AF37;
    --gold-light: #F0D060;
    --midnight: #0A0E27;
    --midnight-mid: #131840;
    --midnight-card: #1A2255;
  }

  /* Global background */
  body, html {
    background-color: var(--midnight) !important;
  }

  /* Gold text for headings */
  h1, h2 {
    background: linear-gradient(135deg, #D4AF37 0%, #F0D060 50%, #D4AF37 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
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

  /* All primary buttons → gold gradient */
  a[class*="framer-"][class*="1dk6y11"],
  a[class*="framer-"][class*="1z0enj7"],
  a[class*="framer-1z0enj7"],
  a[class*="framer-1dk6y11"] {
    background: linear-gradient(135deg, #D4AF37, #F0D060) !important;
    color: #0A0E27 !important;
    border: none !important;
    box-shadow: 0 0 30px rgba(212,175,55,0.35), inset 0 1px 0 rgba(255,255,255,0.2) !important;
  }
  a[class*="framer-"][class*="1dk6y11"]:hover,
  a[class*="framer-"][class*="1z0enj7"]:hover {
    box-shadow: 0 0 50px rgba(212,175,55,0.6), inset 0 1px 0 rgba(255,255,255,0.2) !important;
    transform: translateY(-2px) !important;
  }

  /* Cards hover glow */
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

  /* "Available / Open to projects" badge */
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

  /* Smooth scroll */
  html { scroll-behavior: smooth; }
</style>
`;

// ──────────────────────────────────────────────
//  PROCESSOR
// ──────────────────────────────────────────────
function processFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    const original = content;

    // Apply text replacements
    for (const r of textReplacements) {
        content = content.replace(r.from, r.to);
    }

    // Apply colour replacements
    for (const r of colorReplacements) {
        content = content.replace(r.from, r.to);
    }

    // Inject CSS into index.html right before </head>
    if (filePath.endsWith('index.html') && content.indexOf('priyanshu-custom-theme') === -1) {
        content = content.replace('</head>', customCSS + '\n</head>');
        console.log('  ✅ Injected luxury theme CSS');
    }

    if (content !== original) {
        fs.writeFileSync(filePath, content);
        console.log(`  ✅ Updated: ${path.basename(filePath)}`);
    } else {
        console.log(`  ⬜ No changes: ${path.basename(filePath)}`);
    }
}

function processDirectory(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            processDirectory(fullPath);
        } else if (file.endsWith('.html') || file.endsWith('.mjs') || file.endsWith('.css')) {
            processFile(fullPath);
        }
    }
}

console.log('\n🎨 Applying Midnight Blue + Gold luxury theme for Priyanshu...\n');
processDirectory('.');
console.log('\n✨ Done! Ready to deploy.\n');
