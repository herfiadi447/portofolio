/* =====================================================================
   MODUL 8: Peta Tematik Pertanian (Choropleth & Metode Klasifikasi)
   ===================================================================== */

import { bnds, mesh, fbm, clamp, lerp, jenks, fmt } from '../utils.js';
import { select } from '../ui.js';

export function choro({ map, ui, st, view }) {
  st.method ??= 'jenks';
  const b = bnds(view.c, view.w, view.h);
  const K = 5;

  const cells = mesh(b, 4, 3, 0.6, 9).map((c, n) => ({
    ...c,
    name: 'Wilayah ' + String.fromCharCode(65 + n),
    v: Math.round((38 + 32 * clamp((fbm(c.i / 2 + 0.3, c.j / 2 + 0.3, 51) - 0.3) / 0.45)) * 10) / 10
  }));

  const vals = cells.map(c => c.v);
  const mn = Math.min(...vals);
  const mx = Math.max(...vals);

  const breaks = () => {
    if (st.method === 'jenks') {
      const br = jenks(vals, K);
      const s = [...vals].sort((a, b) => a - b);
      return br.map((x, i) => (i === 0 ? s[0] : i === K ? s[s.length - 1] : Math.max(...s.filter(v => v < x))));
    }
    if (st.method === 'quantile') {
      const s = [...vals].sort((a, b) => a - b);
      const q = p => {
        const x = p * (s.length - 1);
        const i = Math.floor(x);
        return lerp(s[i], s[Math.min(i + 1, s.length - 1)], x - i);
      };
      return Array.from({ length: K + 1 }, (_, i) => q(i / K));
    }
    return Array.from({ length: K + 1 }, (_, i) => mn + ((mx - mn) * i) / K);
  };

  const classOf = (v, br) => {
    for (let i = 0; i < K; i++) if (v <= br[i + 1]) return i;
    return K - 1;
  };

  const OP = [0.18, 0.38, 0.58, 0.78, 0.98];
  const layers = [];

  cells.forEach(c => {
    const poly = L.polygon(c.ring, { className: 'ch', weight: 1.5 }).addTo(map);
    poly.bindTooltip(() => `${c.name} · ${fmt(c.v, 1)} kw/ha · kelas ${classOf(c.v, cur) + 1}`, { sticky: true });
    poly.on('mouseover', () => {
      if (poly.getElement()) poly.getElement().classList.add('hv');
      ui.say(`${c.name}: produktivitas contoh ${fmt(c.v, 1)} kw/ha, kelas ${classOf(c.v, cur) + 1} dari ${K}.`);
    });
    poly.on('mouseout', () => {
      if (poly.getElement()) poly.getElement().classList.remove('hv');
    });
    layers.push([poly, c]);
  });

  let cur = breaks();

  function apply() {
    cur = breaks();
    layers.forEach(([p, c]) => p.setStyle({ fillOpacity: OP[classOf(c.v, cur)] }));
    ui.legend(
      Array.from({ length: K }, (_, i) => ({
        color: 'var(--blue)',
        op: OP[i],
        label: `${fmt(cur[i], 1)}–${fmt(cur[i + 1], 1)}`
      }))
    );
    ui.sum('Produktivitas padi contoh (kw/ha), nilai sintetis.');
  }

  select(ui.ctl, {
    label: 'Klasifikasi',
    value: st.method,
    options: [
      ['jenks', 'Natural breaks (Jenks)'],
      ['quantile', 'Quantile'],
      ['equal', 'Equal interval']
    ],
    onChange: v => {
      st.method = v;
      apply();
    }
  });

  ui.say('Arahkan kursor atau ketuk wilayah untuk melihat nilainya.');
  apply();

  return {};
}
