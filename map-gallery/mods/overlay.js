/* =====================================================================
   MODUL 6: Overlay dan Buffer (Geoprocessing Berbasis Turf.js)
   ===================================================================== */

import { fbm, fmt } from '../utils.js';
import { slider, select, group } from '../ui.js';

export function overlay({ map, ui, st, view }) {
  if (typeof turf === 'undefined') {
    ui.say('Turf.js tidak dapat dimuat dari CDN, jadi operasi geoprocessing tidak tersedia.');
    return {};
  }

  st.op ??= 'intersect';
  st.d ??= 1;

  const blob = (c, rx, ry, seed) => {
    const ring = [];
    for (let k = 0; k < 28; k++) {
      const a = (k / 28) * Math.PI * 2;
      const r = 0.75 + 0.5 * fbm(Math.cos(a) * 1.3 + 5, Math.sin(a) * 1.3 + 5, seed, 3);
      ring.push([c[1] + Math.cos(a) * rx * r, c[0] + Math.sin(a) * ry * r]);
    }
    ring.push(ring[0]);
    return turf.polygon([ring]);
  };

  const [cy, cx] = view.c;
  const A = blob([cy, cx - 0.012], 0.02, 0.014, 3);
  const B = blob([cy - 0.004, cx + 0.012], 0.019, 0.013, 8);

  L.geoJSON(A, { style: { className: 'ov-a', weight: 2, fillOpacity: 0.35 } }).addTo(map);
  L.geoJSON(B, { style: { className: 'ov-b', weight: 2, fillOpacity: 0.35 } }).addTo(map);

  const res = L.layerGroup().addTo(map);
  const km2 = f => (f ? turf.area(f) / 1e6 : 0);
  let slideIn = null;

  function run() {
    res.clearLayers();
    if (slideIn) slideIn.disabled = st.op !== 'buffer';

    const fc = turf.featureCollection([A, B]);
    let out = null;
    let note = '';

    try {
      if (st.op === 'intersect') {
        out = turf.intersect(fc);
      } else if (st.op === 'clip') {
        const bb = turf.bbox(B);
        L.rectangle(
          [
            [bb[1], bb[0]],
            [bb[3], bb[2]]
          ],
          { className: 'ov-bb', weight: 1.5, interactive: false }
        ).addTo(res);
        out = turf.bboxClip(A, bb);
        note = 'A dipotong ke ekstensi (kotak batas) B';
      } else if (st.op === 'union') {
        out = turf.union(fc);
      } else {
        out = turf.buffer(A, st.d, { units: 'kilometers', steps: 24 });
      }
    } catch (e) {
      console.error(e);
    }

    if (out) {
      L.geoJSON(out, { style: { className: 'ov-r', weight: 2, fillOpacity: 0.5 }, interactive: false }).addTo(res);
    }

    const a = km2(A);
    const b = km2(B);
    const r = km2(out);

    ui.say(
      out
        ? `Luas A ${fmt(a, 1)} km² · B ${fmt(b, 1)} km² · hasil ${fmt(r, 1)} km²${note ? '. ' + note : ''}`
        : 'Tidak ada irisan antara layer A dan B.'
    );
    ui.sum(st.op === 'buffer' ? `Buffer layer A sejauh ${fmt(st.d, 1)} km` : '');
  }

  const g = group(ui.ctl);
  select(g, {
    label: 'Operasi',
    value: st.op,
    options: [
      ['intersect', 'Intersect (A ∩ B)'],
      ['clip', 'Clip (A ke ekstensi B)'],
      ['union', 'Union (A ∪ B)'],
      ['buffer', 'Buffer layer A']
    ],
    onChange: v => {
      st.op = v;
      run();
    }
  });

  slideIn = slider(ui.ctl, {
    label: 'Jarak buffer',
    min: 0.2,
    max: 3,
    step: 0.1,
    value: st.d,
    f: v => fmt(v, 1) + ' km',
    onInput: v => {
      st.d = v;
      run();
    }
  });

  ui.legend([
    { color: 'var(--blue)', label: 'layer A' },
    { color: 'var(--acc)', label: 'layer B' },
    { color: 'var(--c5)', label: 'hasil operasi' }
  ]);

  run();
  return {};
}
