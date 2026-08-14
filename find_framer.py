import re

with open('index.html', encoding='utf-8') as f:
    html = f.read()

idx = html.find('Richards Johnson')
if idx != -1:
    snippet = html[max(0, idx-5000):idx]
    matches = re.findall(r'data-framer-name="([^"]+)"', snippet)
    print("Found framer names before Richards Johnson:")
    print(matches[-15:])
