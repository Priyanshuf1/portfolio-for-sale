const fs = require('fs');
const path = require('path');
const JS_DIR = path.join(__dirname, 'js');

async function main() {
    console.log('Step 1: Downloading fresh HTML from Framer source...');
    const res = await fetch('https://priyanshuf1.framer.media/');
    let html = await res.text();
    console.log('  Downloaded:', html.length, 'chars');

    console.log('Step 2: Rewriting CDN JS URLs to local ./js/ paths...');
    html = html.replace(
        /https:\/\/framerusercontent\.com\/sites\/[a-zA-Z0-9]+\/([a-zA-Z0-9._-]+\.mjs)/g,
        './js/$1'
    );

    console.log('Step 3: Injecting CSS-only Framer badge removal...');
    const safeCSS = [
        '<style id="priyanshu-safe-patch">',
        'a[href*="framer.link"],',
        'a[href*="framer.com/edit"],',
        'a[href*="framer.com/badge"],',
        '#framer-badge,',
        '[class*="framer-badge"],',
        '[data-framer-badge] {',
        '  display: none !important;',
        '}',
        '.framer-DvMIA .framer-phxu8k-container {',
        '  display: none !important;',
        '}',
        '</style>'
    ].join('\n');

    html = html.replace('</head>', safeCSS + '\n</head>');
    fs.writeFileSync(path.join(__dirname, 'index.html'), html);
    console.log('  index.html saved.');

    console.log('Step 4: Downloading all JS chunks from Framer CDN...');
    if (!fs.existsSync(JS_DIR)) fs.mkdirSync(JS_DIR);

    const JS_URLS = [
        'https://framerusercontent.com/sites/6K4HlZhe7KgNnkaNiaAUUG/rolldown-runtime.Dh6celcD.mjs',
        'https://framerusercontent.com/sites/6K4HlZhe7KgNnkaNiaAUUG/react.DwDJOhmk.mjs',
        'https://framerusercontent.com/sites/6K4HlZhe7KgNnkaNiaAUUG/motion.Bmeq54nQ.mjs',
        'https://framerusercontent.com/sites/6K4HlZhe7KgNnkaNiaAUUG/framer.D2WIVMiA.mjs',
        'https://framerusercontent.com/sites/6K4HlZhe7KgNnkaNiaAUUG/shared-lib.9k2vNqPN.mjs',
        'https://framerusercontent.com/sites/6K4HlZhe7KgNnkaNiaAUUG/l31sonSvPM96iEFWqw0Ab0nmHNOercM7iLhki8PGTPg.6BnxHPM7.mjs',
        'https://framerusercontent.com/sites/6K4HlZhe7KgNnkaNiaAUUG/Aq5hZ7CfEN2npDSr-dhEXwwUw-WM17N-nE12dNyPMF4.Bb-NVMPS.mjs',
        'https://framerusercontent.com/sites/6K4HlZhe7KgNnkaNiaAUUG/PX9hIOIVM.Ig339C9v.mjs',
        'https://framerusercontent.com/sites/6K4HlZhe7KgNnkaNiaAUUG/script_main.xNRutfmy.mjs'
    ];

    for (const url of JS_URLS) {
        const filename = url.split('/').pop();
        const localPath = path.join(JS_DIR, filename);
        if (fs.existsSync(localPath)) {
            console.log('  Skipping (already exists):', filename);
            continue;
        }
        const r = await fetch(url);
        let content = await r.text();
        // Rewrite internal CDN imports to relative paths
        content = content.replace(
            /https:\/\/framerusercontent\.com\/sites\/[a-zA-Z0-9]+\/([a-zA-Z0-9._-]+\.mjs)/g,
            './$1'
        );
        fs.writeFileSync(localPath, content);
        console.log('  Downloaded:', filename);
    }

    console.log('\nAll done! Site is clean, safe, and ready to deploy.');
}

main().catch(e => { console.error('FAILED:', e); process.exit(1); });
