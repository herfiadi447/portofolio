/* =====================================================================
   MODUL GENERIK: Penanda lokasi default untuk jenis peta baru
   ===================================================================== */

export function generic({ map, ui, view }) {
  L.circleMarker(view.c, { radius: 6, className: 'pick', weight: 2, fillOpacity: 1 })
    .addTo(map)
    .bindTooltip('Lokasi contoh');
  ui.say('Kartu ini belum memiliki layer interaktif. Tambahkan modul khusus di folder mods.');
  return {};
}
