import os
import glob

html_files = glob.glob('*.html')

for file_path in html_files:
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
        
    # Replace logo image
    content = content.replace('assets/logo.png', 'othe photos/furat2.png')
    
    # Replace text
    content = content.replace('FURAT', 'FURAAT')
    content = content.replace('Furat', 'Furaat')
    
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)

print(f"Updated {len(html_files)} files.")
