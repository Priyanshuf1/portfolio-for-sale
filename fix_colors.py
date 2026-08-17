import re

def convert_blue_to_gold(filename):
    try:
        with open(filename, 'r', encoding='utf-8', errors='ignore') as f:
            content = f.read()
        
        orig = content
        
        # Replace cyan/blue tokens back to Gold
        content = re.sub(r'#06B6D4', '#D4AF37', content, flags=re.IGNORECASE)
        content = re.sub(r'#38BDF8', '#F0D060', content, flags=re.IGNORECASE)
        content = re.sub(r'#2563EB', '#D4AF37', content, flags=re.IGNORECASE)
        content = re.sub(r'rgb\(6,\s*182,\s*212\)', 'rgb(255, 215, 0)', content)
        content = re.sub(r'rgba\(6,\s*182,\s*212', 'rgba(212, 175, 55', content)
        content = re.sub(r'rgba\(79,\s*70,\s*229', 'rgba(139, 92, 246', content)
        
        content = content.replace('--cyan:', '--gold:')
        content = content.replace('--cyan-light:', '--gold-light:')
        content = content.replace('var(--cyan-light)', '#F0D060')
        content = content.replace('var(--cyan)', '#D4AF37')
        content = content.replace('color: #06B6D4', 'color: #D4AF37')
        content = content.replace('color:#06B6D4', 'color:#D4AF37')
        
        # Make sure Primary CTA Buttons use Liquid Platinum Silver Gradient
        silver_gradient = 'linear-gradient(135deg, #FFFFFF 0%, #E2E8F0 45%, #94A3B8 100%)'
        content = re.sub(r'linear-gradient\(135deg,\s*#D4AF37,\s*#F0D060\)', silver_gradient, content)
        content = re.sub(r'linear-gradient\(135deg,\s*var\(--gold\),\s*var\(--gold-light\)\)', silver_gradient, content)
        
        if content != orig:
            with open(filename, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f'Converted blue back to gold in {filename}')
        else:
            print(f'No blue changes needed in {filename}')
    except Exception as e:
        print(f'Error processing {filename}: {e}')

files_to_fix = [
    'index.html',
    'bg-enhancer.js',
    'ambient-particles.js',
    'three-bg.js',
    'custom-cursor.js',
    'customize.js',
    'skills-section.js',
    'add-review-modal.js',
    'admin-panel.js',
    'native-sections.js'
]

for f in files_to_fix:
    convert_blue_to_gold(f)

print('Done fixing colors!')
