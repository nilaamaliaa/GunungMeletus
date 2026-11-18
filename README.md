# VOLCANO — cara menjalankan
Double-click `index.html` (tanpa server, tanpa internet). Tidak ada library eksternal; semua grafik dan peta dibuat lokal.
- Struktur: index.html, css/style.css, js/main.js, data/{volcanoes,status,bencana,content,letusan_tahunan}.js, images/ (74 asli + thumbs/ + medium/ + ilustrasi/), fonts/ (termasuk Bootstrap Icons lokal), tools/make_thumbs.py
- Thumbnail: `python tools/make_thumbs.py` (sekali saja, butuh pillow). Tanpa folder thumbs/medium situs tetap jalan memakai gambar asli.
- Mode Ringan: tombol ⚡ di navbar (tersimpan), atau `index.html?lite=1`. Debug FPS: `index.html?debug=1`.
- Status gunung: data/status.js. Data bencana/korban: data/bencana.js.
- Grafik per tahun (2000–2026): data/letusan_tahunan.js (sumber Smithsonian GVP; 2024–2026 masih angka minimum, perbarui bagian `sementara` bila data lengkap tersedia).
- Latar gradasi & gaya kotak transparan: bagian "v8" di akhir css/style.css.
- Ikon: Bootstrap Icons v1.11.3 (lokal: css/bootstrap-icons.min.css + fonts/bootstrap-icons.woff2). Pakai `<i class="bi bi-nama-ikon"></i>`; daftar nama di icons.getbootstrap.com.
