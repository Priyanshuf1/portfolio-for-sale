import re

def make_gold_sharp(filename):
    try:
        with open(filename, 'r', encoding='utf-8', errors='ignore') as f:
            content = f.read()
        
        orig = content
        
        # Replace pale/blurry gold colors with rich, sharp, vibrant gold (#FFC72C / #FFE066 / #D48806)
        content = re.sub(r'#D4AF37', '#FFC72C', content, flags=re.IGNORECASE)
        content = re.sub(r'#F0D060', '#FFE066', content, flags=re.IGNORECASE)
        content = re.sub(r'#FFD700', '#FFC72C', content, flags=re.IGNORECASE)
        content = re.sub(r'rgba\(212,\s*175,\s*55', 'rgba(255, 199, 44', content)
        content = re.sub(r'rgb\(212,\s*175,\s*55\)', 'rgb(255, 199, 44)', content)
        content = re.sub(r'rgb\(255,\s*215,\s*0\)', 'rgb(255, 199, 44)', content)
        
        # Sharpen headings gradient in custom CSS
        content = content.replace(
            'linear-gradient(135deg, #D4AF37 0%, #F0D060 50%, #D4AF37 100%)',
            'linear-gradient(180deg, #FFF2A3 0%, #FFC72C 50%, #D48806 100%)'
        )
        content = content.replace(
            'linear-gradient(135deg, #FFC72C 0%, #FFE066 50%, #FFC72C 100%)',
            'linear-gradient(180deg, #FFF2A3 0%, #FFC72C 50%, #D48806 100%)'
        )
        
        if content != orig:
            with open(filename, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f'Sharpened gold in {filename}')
        else:
            print(f'No gold changes in {filename}')
    except Exception as e:
        print(f'Error sharpening gold in {filename}: {e}')

files_to_update = [
    'index.html',
    'customize.js',
    'bg-enhancer.js',
    'skills-section.js',
    'ambient-particles.js',
    'add-review-modal.js',
    'admin-panel.js',
    'native-sections.js',
    'final-polish.js'
]

for f in files_to_update:
    make_gold_sharp(f)

print('Gold sharpening script execution complete!')
