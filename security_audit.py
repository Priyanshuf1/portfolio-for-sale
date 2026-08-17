import os
import re

def fix_external_links(filename):
    try:
        with open(filename, 'r', encoding='utf-8', errors='ignore') as f:
            content = f.read()
        
        orig = content
        
        def repl(m):
            tag = m.group(0)
            if 'rel=' not in tag:
                return tag[:-1] + ' rel="noopener noreferrer">'
            elif 'noopener' not in tag:
                return re.sub(r'rel=["\'][^"\']*["\']', 'rel="noopener noreferrer"', tag)
            return tag
        
        content = re.sub(r'<a\s+[^>]*target=["\']_blank["\'][^>]*>', repl, content, flags=re.IGNORECASE)
        
        if content != orig:
            with open(filename, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f'Hardened external links in {filename}')
        else:
            print(f'External links already secure in {filename}')
    except Exception as e:
        print(f'Error auditing {filename}: {e}')

fix_external_links('index.html')

for root, dirs, files in os.walk('.'):
    if '.git' in root or 'node_modules' in root or 'scratch' in root: continue
    for file in files:
        if file.endswith('.js') or file.endswith('.html'):
            fix_external_links(os.path.join(root, file))

print('External link audit complete!')
