const fs = require('fs');

const path = 'js/script_main.xNRutfmy.mjs';
if (fs.existsSync(path)) {
  let content = fs.readFileSync(path, 'utf8');

  const oldImport = 'import(`./PX9hIOIVM.Ig339C9v.mjs`)';
  const newImport = 'Promise.resolve({default: function(){return null;}})';

  if (content.includes(oldImport)) {
    content = content.replace(oldImport, newImport);
    fs.writeFileSync(path, content);
    console.log('✅ Successfully patched script_main.xNRutfmy.mjs to resolve badge to dummy null component');
  } else {
    console.log('Error: Could not locate old import in script_main.xNRutfmy.mjs');
  }
} else {
  console.log('Error: script_main.xNRutfmy.mjs not found.');
}
