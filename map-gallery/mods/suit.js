/* =====================================================================
   MODUL 1: Kesesuaian Lahan (Weighted Overlay & Interaksi Sel)
   ===================================================================== */

import { bnds, makeGrid, contrast, cellAt, cellRect, rgbVar, makeRaster, fmt } from '../utils.js';
import { slider } from '../ui.js';

export function suit({ map, ui, st, view }) {
  const W = 32;
  const H = 20;
  const b = bnds(view.c, view.w, view.h);
  st.w = st.w || [40, 35, 25];

  const NM = ['Lereng', 'Tanah', 'Curah hujan'];
  const F = [0, 1, 2].map(k => makeGrid(W, H, 11 + k * 7, [7, 5, 9][k]).map(contrast)); // nilai 0..1, tinggi = lebih sesuai
  const CL = [
    [1, 'sangat sesuai'],
    [2, 'sesuai'],
    [3, 'cukup'],
    [4, 'kurang'],
    [5, 'tidak sesuai']
  ];

  const cls = s => (s >= 0.8 ? 1 : s >= 0.6 ? 2 : s >= 0.4 ? 3 : s >= 0.2 ? 4 : 5);
  const score = n => {
    const t = st.w[0] + st.w[1] + st.w[2];
    return t ? (st.w[0] * F[0][n] + st.w[1] * F[1][n] + st.w[2] * F[2][n]) / t : 0;
  };

  const rs = makeRaster(map, b, W, H, { cls: 'raster', opacity: 0.78 });
  map.setMaxBounds(b.pad(0.8));

  function draw() {
    const col = [1, 2, 3, 4, 5].map(k => rgbVar('--c' + k));
    const cnt = [0, 0, 0, 0, 0];

    rs.paint(d => {
      for (let n = 0; n < W * H; n++) {
        const k = cls(score(n));
        cnt[k - 1]++;
        const c = col[k - 1];
        d[n * 4] = c[0];
        d[n * 4 + 1] = c[1];
        d[n * 4 + 2] = c[2];
        d[n * 4 + 3] = 255;
      }
    });

    ui.legend(
      CL.map(([k, l], i) => ({
        color: `var(--c${k})`,
        label: `${l} ${Math.round((cnt[i] / (W * H)) * 100)}%`
      }))
    );

    const t = st.w[0] + st.w[1] + st.w[2];
    ui.sum(
      t
        ? `Bobot ternormalisasi: ${NM.map((n, i) => `${n} ${Math.round((st.w[i] / t) * 100)}%`).join(' · ')}`
        : 'Semua bobot 0: skor tidak dapat dihitung.'
    );
  }

  NM.forEach((n, i) =>
    slider(ui.ctl, {
      label: 'Bobot ' + n.toLowerCase(),
      min: 0,
      max: 100,
      step: 5,
      value: st.w[i],
      f: v => v,
      onInput: v => {
        st.w[i] = v;
        draw();
      }
    })
  );

  const hl = L.rectangle(cellRect(b, W, H, 0, 0), {
    className: 'hl-cell',
    interactive: false,
    weight: 2,
    opacity: 0
  }).addTo(map);

  const probe = e => {
    const p = cellAt(b, W, H, e.latlng);
    if (!p) return;
    const n = p.j * W + p.i;
    const s = score(n);
    const k = cls(s);
    hl.setBounds(cellRect(b, W, H, p.i, p.j));
    hl.setStyle({ opacity: 1 });
    ui.say(
      `Sel baris ${p.j + 1}, kolom ${p.i + 1}: skor ${fmt(s, 2)} (${CL[k - 1][1]}). Lereng ${fmt(F[0][n], 2)}, tanah ${fmt(F[1][n], 2)}, hujan ${fmt(F[2][n], 2)}.`
    );
  };

  map.on('mousemove click', probe);
  map.on('moveend', () => {
    if (document.activeElement === map.getContainer()) probe({ latlng: map.getCenter() });
  });

  ui.say('Arahkan kursor atau ketuk sel untuk melihat skor dan kelasnya.');
  draw();

  return {};
}
