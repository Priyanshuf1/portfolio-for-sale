import re
import json

with open('index.html', encoding='utf-8') as f:
    html = f.read()

# Let's find Richards Johnson
idx = html.find('Richards Johnson')

# Find the start of his card by finding data-framer-name="Desktop" or similar before it
# Looking backwards for <div class="framer-[a-z0-9]+" data-framer-name="Desktop">
# or the actual parent that repeats
matches = list(re.finditer(r'<div class="framer-[a-z0-9]+" data-framer-name="Desktop">', html[:idx]))
if matches:
    card_start = matches[-1].start()
    
    # We want to find the matching closing div for this card, or just take everything up to the next card
    next_card = html.find('data-framer-name="Desktop"', idx)
    if next_card == -1:
        next_card = idx + 2000
    else:
        # back up to its opening div
        next_card = html.rfind('<div', 0, next_card)
        
    card_html = html[card_start:next_card]
    with open('card_template.html', 'w', encoding='utf-8') as out:
        out.write(card_html)
    print(f"Extracted card HTML of length {len(card_html)}")
else:
    print("Could not find start of card")
