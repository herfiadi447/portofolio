/* =====================================================================
   MODUL 7: Tutupan Lahan (Mesh Poligon & Legenda Interaktif)
   ===================================================================== */

import { bnds, mesh, ringAreaHa, fbm, fmt } from '../utils.js';

export function cover({ map, ui, st, view }) {
  st.off ??= {};
  const b = bnds(view.c, view.w, view.h);
  const cols = 14;
  const rows = 9;

  const LC = [
    ['hutan', 1, 'f1'],
    ['sawah', 2, 'f2'],
    ['terbuka', 3, 'f3'],
    ['permukiman', 4, 'f4'],
    ['air', 'b', 'fb']
  ];

  const over = {
    '10,2': 'permukiman',
    '11,2': 'permukiman',
    '10,3': 'permukiman',
    '3,6': 'sawah',
    '4,6': 'sawah',
    '3,7': 'sawah'
  };

  const pick = ({ i, j }) => {
    if (over[i + ',' + j]) return over[i + ',' + j];
    if (Math.abs(j - (4 + 2.2 * Math.sin(i / 2.3))) < 0.7) return 'air';
    const v = fbm(i / 4.5, j / 4.5, 41);
    const h = fbm(i / 3, j / 3, 43);
    return v > 0.56 ? 'hutan' : v > 0.44 ? (h > 0.5 ? 'sawah' : 'terbuka') : (h > 0.55 ? 'permukiman' : 'terbuka');
  };

  const cells = mesh(b, cols, rows, 0.55, 7).map(c => ({
    ...c,
    k: pick(c),
    ha: ringAreaHa(c.ring)
  }));

  const tot = {};
  cells.forEach(c => {
    tot[c.k] = (tot[c.k] || 0) + c.ha;
  });

  const groups = {};
  LC.forEach(([k]) => {
    groups[k] = L.layerGroup();
  });

  cells.forEach(c => {
    const f = LC.find(x => x[0] === c.k)[2];
    const poly = L.polygon(c.ring, { className: 'lc ' + f, weight: 1, fillOpacity: 0.78 });
    poly.bindTooltip(() => `${c.k[0].toUpperCase() + c.k.slice(1)} · ${fmt(c.ha, 1)} ha (total kelas ${fmt(tot[c.k], 0)} ha)`, {
      sticky: true
    });
    poly.on('mouseover', () => {
      if (poly.getElement()) poly.getElement().classList.add('hv');
      ui.say(`${c.k[0].toUpperCase() + c.k.slice(1)}: poligon ini ${fmt(c.ha, 1)} ha, total kelas ${fmt(tot[c.k], 0)} ha (luas contoh).`);
    });
    poly.on('mouseout', () => {
      if (poly.getElement()) poly.getElement().classList.remove('hv');
    });
    poly.addTo(groups[c.k]);
  });

  LC.forEach(([k]) => {
    if (!st.off[k]) groups[k].addTo(map);
  });

  ui.legend(
    LC.map(([k, col]) => ({
      color: typeof col === 'number' ? `var(--c${col})` : 'var(--blue)',
      label: `${k} ${fmt(tot[k] || 0, 0)} ha`,
      on: !st.off[k],
      onClick() {
        st.off[k] = !st.off[k];
        st.off[k] ? map.removeLayer(groups[k]) : groups[k].addTo(map);
        return !st.off[k];
      }
    }))
  );

  ui.sum('Klik kelas di legenda untuk menampilkan atau menyembunyikannya. Luas dihitung dari poligon contoh.');
  ui.say('Arahkan kursor atau ketuk poligon untuk melihat kelas dan luasnya.');

  return {};
}
