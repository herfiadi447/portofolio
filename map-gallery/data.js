/* =====================================================================
   DATA KARTU JENIS PETA (urutan = tingkat kerumitan: rank 1 paling rumit)
   Semua layer analisis adalah DATA SINTETIS buatan kode.
   ===================================================================== */

export const L5 = [
  [1, 'sangat sesuai'],
  [2, 'sesuai'],
  [3, 'cukup'],
  [4, 'kurang'],
  [5, 'tidak sesuai']
];

/* view: c = pusat [lat,lng], w/h = lebar/tinggi area dalam derajat (peta dipasang agar area muat)
   atau z/min/max untuk zoom tetap. mod = nama modul interaktif. */
export const cards = [
  {
    id: 'suit',
    rank: 1,
    c: 'analisis',
    t: 'Kesesuaian lahan',
    d: 'Zonasi lahan dari sangat sesuai sampai tidak sesuai untuk komoditas tertentu.',
    mod: 'suit',
    view: { c: [-4.43, 119.63], w: 0.16, h: 0.10 },
    leg: L5,
    steps: [
      'Kumpulkan layer tanah, lereng, curah hujan',
      'Reklasifikasi dan beri bobot',
      'Weighted overlay',
      'Klasifikasi kelas kesesuaian'
    ],
    tools: ['QGIS', 'Python', 'GeoPandas', 'Flask'],
    p: 'WebGIS Kab. Barru'
  },
  {
    id: 'slide',
    rank: 2,
    c: 'analisis',
    t: 'Kerentanan longsor',
    d: 'Peta tingkat kerentanan tanah longsor untuk menilai risiko di sekitar aset.',
    mod: 'slide',
    view: { c: [-5.26, 119.86], w: 0.14, h: 0.09 },
    leg: [[1, 'rendah'], [3, 'sedang'], [5, 'tinggi']],
    steps: [
      'Siapkan lereng, geologi, tata guna lahan',
      'Skoring tiap parameter',
      'Overlay berbobot',
      'Potong per lokasi SUTT'
    ],
    tools: ['ArcGIS', 'QGIS', 'Raster'],
    p: 'Magang UPT PLN Makassar'
  },
  {
    id: 'ndvi',
    rank: 3,
    c: 'analisis',
    t: 'NDVI (indeks vegetasi)',
    d: 'Indeks kehijauan vegetasi dari citra satelit, dengan ambang vegetasi dan perbandingan antar tanggal.',
    mod: 'ndvi',
    view: { c: [-3.92, 119.80], w: 0.12, h: 0.08 },
    leg: [[1, 'vegetasi rapat'], [3, 'vegetasi jarang'], ['blue', 'air']],
    steps: [
      'Komposit band NIR dan Red',
      'Hitung NDVI = (NIR − Red) / (NIR + Red)',
      'Reklasifikasi menurut ambang vegetasi',
      'Tampilkan dan bandingkan antar tanggal'
    ],
    tools: ['QGIS', 'Python', 'Rasterio'],
    p: null // Catatan: Sengaja kosong hingga pemilik portofolio mengisinya
  },
  {
    id: 'dem',
    rank: 4,
    c: 'analisis',
    t: 'Terrain dan DEM',
    d: 'Kontur, hillshade, dan analisis lereng dari data ketinggian.',
    mod: 'dem',
    view: { c: [-5.30, 119.88], z: 11, min: 9, max: 13 },
    leg: [[2, 'rendah'], [4, 'tinggi'], ['ink', 'kontur']],
    attr: ' &middot; Terrain: Mapzen/AWS Terrain Tiles',
    steps: [
      'Ambil DEM',
      'Buat hillshade dan kontur',
      'Hitung lereng dan aspek',
      'Visualisasi'
    ],
    tools: ['GDAL', 'Rasterio', 'PyGMT'],
    p: 'Analisis terrain'
  },
  {
    id: 'gnss',
    rank: 5,
    c: 'survei',
    t: 'Titik survei GNSS dan drone',
    d: 'Titik kontrol, rute terbang, dan lokasi base serta rover.',
    mod: 'gnss',
    view: { c: [-0.862, 134.062], w: 0.0100, h: 0.0066 },
    leg: [[5, 'titik kontrol'], ['acc', 'area survei'], ['blue', 'jalur terbang']],
    steps: [
      'Pasang base di titik kontrol',
      'Rencanakan jalur terbang',
      'Ukur dengan rover',
      'Olah dan cek hasil'
    ],
    tools: ['GNSS RTK', 'UAV', 'QGIS'],
    p: 'Survei HPL Papua Barat'
  },
  {
    id: 'overlay',
    rank: 6,
    c: 'analisis',
    t: 'Overlay dan buffer',
    d: 'Operasi geoprocessing: tumpang tindih layer dan area penyangga.',
    mod: 'overlay',
    view: { c: [-5.145, 119.412], w: 0.08, h: 0.05 },
    leg: [['blue', 'layer A'], ['acc', 'layer B'], [5, 'buffer']],
    steps: [
      'Unggah GeoJSON atau Shapefile',
      'Pilih operasi: clip, union, merge, buffer',
      'Atur symbology',
      'Unduh hasil'
    ],
    tools: ['Leaflet', 'GeoJSON', 'Turf'],
    p: 'GeoToolbox WebGIS'
  },
  {
    id: 'cover',
    rank: 7,
    c: 'survei',
    t: 'Tutupan lahan',
    d: 'Pembaruan poligon tutupan lahan hasil survei dan interpretasi citra.',
    mod: 'cover',
    view: { c: [-0.88, 134.10], w: 0.10, h: 0.07 },
    leg: [[1, 'hutan'], [2, 'sawah'], [3, 'terbuka'], [4, 'permukiman']],
    steps: [
      'Potong dan gabung poligon',
      'Perbarui atribut kelas',
      'Cek overlap dan gap dengan skrip',
      'Ekspor shapefile'
    ],
    tools: ['QGIS', 'Python', 'Topologi'],
    p: 'Survei HPL Papua Barat'
  },
  {
    id: 'choro',
    rank: 8,
    c: 'tematik',
    t: 'Peta tematik pertanian',
    d: 'Choropleth per wilayah untuk memantau produksi dan ketahanan pangan.',
    mod: 'choro',
    view: { c: [-3.95, 119.82], w: 0.14, h: 0.10 },
    leg: [['blue', 'rendah ke tinggi']],
    steps: [
      'Gabungkan data statistik ke batas wilayah',
      'Tentukan kelas (natural breaks)',
      'Pilih skema warna',
      'Tampilkan di WebGIS'
    ],
    tools: ['PostGIS', 'Leaflet', 'Folium'],
    p: 'Geopangansidrap dan Sijagung'
  },
  {
    id: 'sutt',
    rank: 9,
    c: 'infrastruktur',
    t: 'Jaringan transmisi',
    d: 'Distribusi spasial saluran udara tegangan tinggi, tower, dan gardu.',
    mod: 'sutt',
    view: { c: [-5.12, 119.48], w: 0.16, h: 0.10 },
    leg: [[5, 'gardu'], ['acc', 'saluran'], ['ink', 'tower']],
    steps: [
      'Digitasi tower dan jalur',
      'Validasi atribut',
      'Hubungkan titik ke garis',
      'Layout peta dan legenda'
    ],
    tools: ['ArcGIS', 'QGIS'],
    p: 'Magang UPT PLN Makassar'
  }

  /* TODO: tambah jenis peta lain di sini.
     Contoh template penambahan kartu baru:
  ,{
    id: 'contoh',
    rank: 10,
    c: 'analisis',                                   // c: analisis | infrastruktur | survei | tematik
    lvl: 'Dasar',                                   // opsional: default rank 1-3 Lanjut, 4-6 Menengah, 7+ Dasar
    t: 'Judul Peta Baru',
    d: 'Deskripsi singkat analisis peta.',
    mod: 'generic',                                 // 'generic' untuk basemap+marker, atau nama modul di mods/
    view: { c: [-5.14, 119.41], w: 0.08, h: 0.05 }, // pusat [lat,lng] + lebar/tinggi derajat
    leg: [[1, 'Kelas A'], [2, 'Kelas B']],          // nomor warna 1-5 | 'blue' | 'acc' | 'ink'
    steps: ['Langkah 1', 'Langkah 2'],
    tools: ['QGIS'],
    p: 'Nama Proyek'
  }
  */
];

export const levelOf = d => d.lvl || (d.rank <= 3 ? 'Lanjut' : d.rank <= 6 ? 'Menengah' : 'Dasar');
