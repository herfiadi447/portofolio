# Galeri Jenis Peta & Analisis Spasial

Fitur interaktif yang menampilkan berbagai jenis peta dan analisis spasial (Kesesuaian Lahan, Kerentanan Longsor, NDVI, DEM & Terrain, Titik Survei GNSS & Drone, Overlay & Buffer Turf.js, Tutupan Lahan, Peta Tematik Pertanian Choropleth, serta Jaringan Transmisi Listrik SUTT).

> **PENTING:** Seluruh layer analisis menggunakan **DATA SINTETIS** buatan kode untuk kebutuhan demonstrasi portofolio. Koordinat latar menggunakan wilayah nyata tanpa mengungkap aset rahasia atau data survei kepemilikan asli.

---

## 📁 Struktur Berkas

```
map-gallery/
├── data.js           # Basis data kartu peta (cards) dan level kesulitan
├── utils.js          # Generator noise sintetis (vnoise, fbm), geometri, kanvas, klasifikasi
├── map-core.js       # Pembuat peta Leaflet (mkMap), kontrol panah utara, sinkronisasi tema CARTO
├── ui.js             # Generator kontrol input native (slider, check, select), legenda & a11y readout
├── gallery.css       # Stylesheet terisolasi (.map-gallery) dengan token warna dan tema gelap/terang
├── gallery.js        # Logika inisialisasi, IntersectionObserver (lazy loading), filter & urutan
├── README.md         # Dokumentasi panduan teknis
└── mods/             # Modul analisis per jenis peta
    ├── suit.js       # 1. Kesesuaian Lahan (weighted overlay, slider bobot 3 faktor, hover sel)
    ├── slide.js      # 2. Kerentanan Longsor (raster 4 parameter + jalur SUTT terpotong per kelas)
    ├── ndvi.js       # 3. NDVI (ambang vegetasi slider + swipe perbandingan dua tanggal)
    ├── dem.js        # 4. Terrain & DEM (tile Terrarium AWS / fallback sintetis, hillshade & kontur)
    ├── gnss.js       # 5. GNSS & Drone (animasi rute lawnmower, GCP, base & rover)
    ├── overlay.js    # 6. Overlay & Buffer (operasi geoprocessing Turf.js: intersect/clip/union/buffer)
    ├── cover.js      # 7. Tutupan Lahan (mesh poligon, hitung luas ha, filter legenda)
    ├── choro.js      # 8. Peta Tematik Pertanian (choropleth: Natural Breaks Jenks/Quantile/Equal)
    ├── sutt.js       # 9. Jaringan Transmisi (saluran SUTT, gardu induk, tower interaktif)
    ├── generic.js    # Modul fallback default untuk kartu baru
    └── index.js      # Registri modul interaktif
```

---

## 🚀 Cara Menambah Kartu Jenis Peta Baru

Untuk menambahkan jenis peta baru ke dalam galeri:

### 1. Buka `map-gallery/data.js`
Tambahkan objek baru ke dalam array `cards`:

```javascript
// TODO: tambah jenis peta lain di sini
{
  id: 'hidrologi',                                // ID unik kartu (huruf kecil, tanpa spasi)
  rank: 10,                                       // Nomor urut tingkat kerumitan
  c: 'analisis',                                  // Kategori: 'analisis' | 'infrastruktur' | 'survei' | 'tematik'
  lvl: 'Menengah',                                // Tingkat kesulitan: 'Dasar' | 'Menengah' | 'Lanjut' (opsional)
  t: 'Analisis Daerah Aliran Sungai (DAS)',        // Judul kartu
  d: 'Delineasi batas DAS dan jaringan sungai berbasis arah aliran (flow direction).', // Deskripsi singkat
  mod: 'generic',                                 // Nama modul di mods/ (gunakan 'generic' untuk awalan)
  view: { c: [-5.14, 119.41], w: 0.12, h: 0.08 }, // Koordinat pusat [lat, lng] dan rentang area derajat
  leg: [[1, 'Hulu'], [3, 'Tengah'], ['blue', 'Hilir']], // Elemen warna legenda
  steps: [
    'Isi cekungan elevasi (Sink Fill)',
    'Hitung arah aliran (Flow Direction)',
    'Hitung akumulasi aliran (Flow Accumulation)',
    'Delineasi batas DAS (Watershed Delineation)'
  ],
  tools: ['QGIS', 'GRASS GIS', 'Python'],
  p: 'Analisis DAS Sulawesi'                      // Proyek terkait di portofolio (atau null)
}
```

### 2. (Opsional) Membuat Modul Interaktif Khusus
Jika kartu baru membutuhkan kontrol interaktif khusus di luar modul default `generic`:
1. Buat file baru di `map-gallery/mods/hidrologi.js`:
   ```javascript
   export function hidrologi({ map, ui, st, view }) {
     // Tambahkan layer Leaflet atau kalkulasi di sini
     ui.say('Pilih outlet sungai untuk menghitung luas tangkapan air.');
     return {
       destroy() {
         // Bersihkan layer/listener saat peta di-deactivate
       }
     };
   }
   ```
2. Daftarkan di `map-gallery/mods/index.js`:
   ```javascript
   import { hidrologi } from './hidrologi.js';
   export const MODS = { ..., hidrologi };
   ```
3. Ubah properti `mod: 'hidrologi'` pada kartu di `map-gallery/data.js`.
