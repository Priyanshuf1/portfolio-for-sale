const fs = require('fs');

const path = 'patch.js';
if (fs.existsSync(path)) {
  let content = fs.readFileSync(path, 'utf8');

  // Normalize newlines to match reliably
  content = content.replace(/\r\n/g, '\n');

  // 1. Replace the plain style tag inside hideStyle
  const targetStyleTag = '</script>\n<style>';
  const replacementStyleTag = '</script>\n<style id="glb-main-custom-styles">';

  if (content.includes(targetStyleTag)) {
    content = content.replace(targetStyleTag, replacementStyleTag);
    console.log('✅ Updated style tag in patch.js');
  } else {
    console.log('Warn: Could not locate targetStyleTag in patch.js');
  }

  // 2. Replace the injection block
  const targetInjection = `if (html.includes('kill-service-workers')) {
    const mainScriptMatch = hideStyle.match(/<script id="kill-service-workers">[\\s\\S]*?<\\/script>/gi);
    if (mainScriptMatch) {
        html = html.replace(/<script id="kill-service-workers">[\\s\\S]*?<\\/script>/gi, mainScriptMatch[0]);
    }
} else {
    html = html.replace('<head>', '<head>\\n' + hideStyle);
}`;

  const replacementInjection = `// Extract the parts of hideStyle dynamically
const mainScriptMatch = hideStyle.match(/<script id="kill-service-workers">[\\s\\S]*?<\\/script>/gi);
const mainStyleMatch = hideStyle.match(/<style id="glb-main-custom-styles">[\\s\\S]*?<\\/style>/gi);

// Inject meta tags if not already present
if (!html.includes('http-equiv="Cache-Control"')) {
    const metaMatch = hideStyle.match(/<!--[\\s\\S]*?-->\\n<meta[\\s\\S]*?<meta http-equiv="Expires" content="0">/gi);
    if (metaMatch) {
        html = html.replace('<head>', '<head>\\n' + metaMatch[0]);
    } else {
        const lines = hideStyle.trim().split('\\n');
        const metaBlock = lines.slice(0, 4).join('\\n');
        html = html.replace('<head>', '<head>\\n' + metaBlock);
    }
}

// Inject/update script
if (html.includes('id="kill-service-workers"')) {
    if (mainScriptMatch) {
        html = html.replace(/<script id="kill-service-workers">[\\s\\S]*?<\\/script>/gi, mainScriptMatch[0]);
    }
} else {
    if (mainScriptMatch) {
        html = html.replace('<head>', '<head>\\n' + mainScriptMatch[0]);
    }
}

// Inject/update style
if (html.includes('id="glb-main-custom-styles"')) {
    if (mainStyleMatch) {
        html = html.replace(/<style id="glb-main-custom-styles">[\\s\\S]*?<\\/style>/gi, mainStyleMatch[0]);
    }
} else {
    if (mainStyleMatch) {
        html = html.replace('<head>', '<head>\\n' + mainStyleMatch[0]);
    }
}`;

  if (content.includes(targetInjection)) {
    content = content.replace(targetInjection, replacementInjection);
    console.log('✅ Successfully patched injection block in patch.js');
  } else {
    // Try relaxed search for replacement
    console.log('Warn: Could not find exact injection block. Attempting regex match.');
    const regex = /if\s*\(\s*html\.includes\(\s*['"]kill-service-workers['"]\s*\)\s*\)\s*\{[\s\S]*?\}[\s\S]*?else\s*\{[\s\S]*?\}/gi;
    if (regex.test(content)) {
      content = content.replace(regex, replacementInjection);
      console.log('✅ Successfully patched injection block via regex in patch.js');
    } else {
      console.log('Error: Failed to find injection block in patch.js');
    }
  }

  fs.writeFileSync(path, content);
} else {
  console.log('Error: patch.js not found.');
}
