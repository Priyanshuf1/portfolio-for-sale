const fs = require('fs');

const path = 'index.html';
if (fs.existsSync(path)) {
  let content = fs.readFileSync(path, 'utf8');

  const oldScript = 'src="./js/script_main.xNRutfmy.mjs"';
  const newScript = 'src="./js/script_main.xNRutfmy.mjs?v=' + Date.now() + '"';

  // We should also support matching if it already has a query parameter
  const regex = /src="\.\/js\/script_main\.xNRutfmy\.mjs(\?v=\d+)?"/gi;

  if (content.match(regex)) {
    content = content.replace(regex, newScript);
    fs.writeFileSync(path, content);
    console.log('✅ Successfully cache-busted script_main.xNRutfmy.mjs in index.html to:', newScript);
  } else {
    console.log('Error: Could not locate script_main.xNRutfmy.mjs reference in index.html');
  }
} else {
  console.log('Error: index.html not found.');
}
