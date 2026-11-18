# VOLCANO — cara menjalankan
Double-click `index.html` (tanpa server, tanpa internet). Tidak ada library eksternal; semua grafik dan peta dibuat lokal.
- Struktur: index.html, css/style.css, js/main.js, data/{volcanoes,status,bencana,content}.js, images/ (74 asli + thumbs/ + medium/ + ilustrasi/), tools/make_thumbs.py
- Thumbnail: `python tools/make_thumbs.py` (sekali saja, butuh pillow). Tanpa folder thumbs/medium situs tetap jalan memakai gambar asli.
- Mode Ringan: tombol ⚡ di navbar (tersimpan), atau `index.html?lite=1`. Debug FPS: `index.html?debug=1`.
- Status gunung: data/status.js. Data bencana/korban: data/bencana.js.
