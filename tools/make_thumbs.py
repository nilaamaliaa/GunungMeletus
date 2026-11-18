# Skrip SATU KALI (bukan dependensi website). Butuh: pip install pillow
# Membuat images/thumbs (lebar maks 600 px, q75) dan images/medium (lebar maks 1400 px, q80) dari file asli di images/.
import os
from PIL import Image, ImageOps
os.chdir(os.path.join(os.path.dirname(__file__), '..'))
os.makedirs('images/thumbs', exist_ok=True); os.makedirs('images/medium', exist_ok=True)
def save(im, path, w, q):
    if im.width > w: im = im.resize((w, round(im.height * w / im.width)), Image.LANCZOS)
    im.save(path, 'JPEG', quality=q, optimize=True, progressive=True)
for f in sorted(os.listdir('images')):
    p = 'images/' + f
    if os.path.isdir(p): continue
    im = ImageOps.exif_transpose(Image.open(p)).convert('RGB'); stem = f.rsplit('.', 1)[0]
    save(im, f'images/thumbs/{stem}.jpg', 600, 75); save(im, f'images/medium/{stem}.jpg', 1400, 80)
print('selesai')
