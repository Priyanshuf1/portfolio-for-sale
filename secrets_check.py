import os
import re

patterns = [
    (re.compile(r'BEGIN\s+PRIVATE\s+KEY', re.IGNORECASE), 'Private Key'),
    (re.compile(r'AWS_SECRET', re.IGNORECASE), 'AWS Secret'),
    (re.compile(r'STRIPE_SECRET', re.IGNORECASE), 'Stripe Secret'),
    (re.compile(r'FIREBASE_ADMIN', re.IGNORECASE), 'Firebase Admin Key'),
    (re.compile(r'password\s*=\s*["\'][^"\']{8,}["\']', re.IGNORECASE), 'Hardcoded Password')
]

secrets_found = []

for root, dirs, files in os.walk('.'):
    if '.git' in root or 'node_modules' in root or 'scratch' in root: continue
    for file in files:
        if file.endswith(('.js', '.html', '.json', '.env')):
            path = os.path.join(root, file)
            try:
                txt = open(path, encoding='utf-8', errors='ignore').read()
                for pat, label in patterns:
                    if pat.search(txt):
                        secrets_found.append((path, label))
            except Exception:
                pass

print(f'Secrets Check Completed. Found: {len(secrets_found)}')
for path, label in secrets_found:
    print(f'  [!] {label} in {path}')
