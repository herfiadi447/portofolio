/* =====================================================================
   MODUL 2: Kerentanan Longsor (Scoring & Potongan Jalur SUTT)
   ===================================================================== */

import { bnds, makeGrid, contrast, cellAt, uv2ll, lerp, rgbVar, makeRaster, fmt } from '../utils.js';
import { check, group } from '../ui.js';

export function slide({ map, ui, st, view }) {
  const W = 30;
  const H = 20;
  const b = bnds(view.c, view.w, view.h);
  const P = ['Lereng', 'Geologi', 'Tutupan lahan', 'Curah hujan'];
  const BW = [0.35, 0.25, 0.2, 0.2];
  st.on = st.on || [true, true, true, true];

  const F = P.map((_, k) => makeGrid(W, H, 21 + k * 5, [6, 8, 5, 10][k]).map(contrast)); // tinggi = lebih rentan
  const score = n => {
    let a = 0;
    let t = 0;
    for (let k = 0; k < 4; k++) {
      if (st.on[k]) {
        a += BW[k] * F[k][n];
        t += BW[k];
      }
    }
    return t ? a / t : 0;
  };

  const cls = s => (s >= 0.58 ? 5 : s >= 0.42 ? 3 : 1);
  const NMC = { 1: 'rendah', 3: 'sedang', 5: 'tinggi' };
  const rs = makeRaster(map, b, W, H, { cls: 'raster', opacity: 0.55 });
  map.setMaxBounds(b.pad(0.8));

  const lg = L.layerGroup().addTo(map);

  /* Jalur SUTT sintetis (koordinat relatif terhadap area) */
  const V = [
    [0.03, 0.8],
    [0.2, 0.62],
    [0.4, 0.68],
    [0.58, 0.4],
    [0.78, 0.5],
    [0.97, 0.22]
  ].map(([u, v]) => uv2ll(b, u, v));

  const pts = [];
  for (let s = 0; s < V.length - 1; s++) {
    const d = V[s].distanceTo(V[s + 1]);
    const n = Math.max(1, Math.ceil(d / 100));
    for (let k = s ? 1 : 0; k <= n; k++) {
      pts.push(L.latLng(lerp(V[s].lat, V[s + 1].lat, k / n), lerp(V[s].lng, V[s + 1].lng, k / n)));
    }
  }

  const clsAt = ll => {
    const p = cellAt(b, W, H, ll);
    return p ? cls(score(p.j * W + p.i)) : 1;
  };

  function draw() {
    const col = { 1: rgbVar('--c1'), 3: rgbVar('--c3'), 5: rgbVar('--c5') };
    rs.paint(d => {
      for (let n = 0; n < W * H; n++) {
        const c = col[cls(score(n))];
        d[n * 4] = c[0];
        d[n * 4 + 1] = c[1];
        d[n * 4 + 2] = c[2];
        d[n * 4 + 3] = 255;
      }
    });

    lg.clearLayers();
    L.polyline(pts, { className: 'casing', weight: 7, interactive: false }).addTo(lg);

    const len = { 1: 0, 3: 0, 5: 0 };
    const tw = { 1: 0, 3: 0, 5: 0 };
    let run = [pts[0]];
    let rc = null;
    let cum = 0;
    let nextT = 0;

    const flush = () => {
      if (run.length > 1) {
        L.polyline(run, { className: 'sl s' + rc, weight: 4, interactive: false }).addTo(lg);
      }
    };

    for (let i = 0; i < pts.length - 1; i++) {
      const seg = pts[i].distanceTo(pts[i + 1]);
      const k = clsAt(L.latLng((pts[i].lat + pts[i + 1].lat) / 2, (pts[i].lng + pts[i + 1].lng) / 2));
      if (rc === null) rc = k;
      if (k !== rc) {
        flush();
        run = [pts[i]];
        rc = k;
      }
      run.push(pts[i + 1]);
      len[k] += seg;

      if (cum >= nextT) {
        tw[k]++;
        nextT += 900;
        L.circleMarker(pts[i], {
          radius: 3,
          className: 'f' + (k === 1 ? 1 : k === 3 ? 3 : 5) + ' sk',
          weight: 1,
          fillOpacity: 1,
          interactive: false
        }).addTo(lg);
      }
      cum += seg;
    }
    flush();

    ui.legend([1, 3, 5].map(k => ({ color: `var(--c${k})`, label: `${NMC[k]} ${fmt(len[k] / 1000, 1)} km` })));
    ui.sum(
      [1, 3, 5].map(k => `${NMC[k]}: ${fmt(len[k] / 1000, 1)} km, ${tw[k]} tower`).join(' | ') +
        ` (total ${fmt((len[1] + len[3] + len[5]) / 1000, 1)} km)`
    );
  }

  const g = group(ui.ctl);
  P.forEach((n, k) =>
    check(g, {
      label: n,
      checked: st.on[k],
      onChange: v => {
        st.on[k] = v;
        draw();
      }
    })
  );

  const probe = e => {
    const p = cellAt(b, W, H, e.latlng);
    if (!p) return;
    const n = p.j * W + p.i;
    const s = score(n);
    ui.say(`Sel baris ${p.j + 1}, kolom ${p.i + 1}: skor ${fmt(s, 2)}, kerentanan ${NMC[cls(s)]}.`);
  };

  map.on('mousemove click', probe);
  ui.say('Nyalakan atau matikan parameter, lalu lihat jalur SUTT berubah warna per kelas.');
  draw();

  return {};
}
