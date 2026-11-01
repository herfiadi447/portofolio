/* =====================================================================
   MODUL 9: Jaringan Transmisi (Saluran Udara Tegangan Tinggi & Tower)
   ===================================================================== */

import { bnds, uv2ll, hash2, lerp, fmt } from '../utils.js';
import { select } from '../ui.js';

export function sutt({ map, ui, st, view }) {
  st.sel ??= 'all';
  const b = bnds(view.c, view.w, view.h);

  const G = {
    A: uv2ll(b, 0.05, 0.7),
    B: uv2ll(b, 0.5, 0.3),
    C: uv2ll(b, 0.95, 0.62)
  };

  const LN = [
    {
      id: 'SUTT-1',
      from: 'A',
      to: 'B',
      v: [
        [0.05, 0.7],
        [0.2, 0.55],
        [0.33, 0.58],
        [0.5, 0.3]
      ]
    },
    {
      id: 'SUTT-2',
      from: 'B',
      to: 'C',
      v: [
        [0.5, 0.3],
        [0.7, 0.2],
        [0.82, 0.4],
        [0.95, 0.62]
      ]
    }
  ];

  const icon = cls => L.divIcon({ className: 'ic', html: `<i class="${cls}"></i>`, iconSize: [14, 14] });
  const lines = [];
  const towers = [];

  LN.forEach((ln, li) => {
    const V = ln.v.map(([u, v]) => uv2ll(b, u, v));
    const pts = [];
    const types = [];

    for (let s = 0; s < V.length - 1; s++) {
      const n = Math.max(1, Math.ceil(V[s].distanceTo(V[s + 1]) / 1500));
      for (let k = 0; k < n; k++) {
        pts.push(L.latLng(lerp(V[s].lat, V[s + 1].lat, k / n), lerp(V[s].lng, V[s + 1].lng, k / n)));
        types.push(k === 0 ? (s === 0 ? 'Dead-end' : 'Tension') : 'Suspension');
      }
    }
    pts.push(V[V.length - 1]);
    types.push('Dead-end');

    let len = 0;
    for (let i = 1; i < pts.length; i++) len += pts[i - 1].distanceTo(pts[i]);

    const poly = L.polyline(V.length ? pts : [], { className: 'sutt', weight: 3, opacity: 0.95 }).addTo(map);
    const rec = { ln, poly, len, n: pts.length, towers: [] };

    poly.on('click', () => choose(ln.id, true));
    poly.bindTooltip(`${ln.id}: Gardu ${ln.from} – Gardu ${ln.to}`, { sticky: true });
    lines.push(rec);

    pts.forEach((p, i) => {
      const id = `${ln.id}-T${String(i + 1).padStart(2, '0')}`;
      const h = 36 + Math.round(hash2(i, li, 5) * 18) + (types[i] === 'Suspension' ? 0 : 4);
      const mk = L.marker(p, { icon: icon('tw'), title: 'Tower ' + id, alt: 'Tower ' + id, riseOnHover: true }).addTo(map);
      mk.bindTooltip(id);
      mk.on('click', () => {
        towers.forEach(t => t.getElement() && t.getElement().classList.remove('sel'));
        if (mk.getElement()) mk.getElement().classList.add('sel');
        ui.say(`Tower ${id} · tipe ${types[i]} · tinggi ${h} m · saluran ${ln.id} (data contoh)`);
      });
      towers.push(mk);
      rec.towers.push(mk);
    });
  });

  Object.entries(G).forEach(([k, ll]) =>
    L.marker(ll, { icon: icon('sub'), title: 'Gardu ' + k, alt: 'Gardu ' + k })
      .bindTooltip('Gardu ' + k)
      .addTo(map)
      .on('click', () => ui.say(`Gardu ${k} · gardu induk contoh, 150/20 kV (data contoh)`))
  );

  function choose(v, fromMap) {
    st.sel = v;
    lines.forEach(r => {
      const on = v === r.ln.id;
      r.poly.setStyle({ weight: on ? 6 : 3 });
      const e = r.poly.getElement();
      if (e) e.classList.toggle('sel', on);
      if (on) r.poly.bringToFront();
    });

    if (v === 'all') {
      ui.say('Pilih saluran lewat menu, klik garis, atau klik tower dan gardu untuk atribut contoh.');
    } else {
      const r = lines.find(x => x.ln.id === v);
      ui.say(`${v} · Gardu ${r.ln.from} – Gardu ${r.ln.to} · 150 kV (contoh) · ${fmt(r.len / 1000, 1)} km · ${r.n} tower`);
    }
    if (fromMap && sel) sel.value = v;
  }

  const sel = select(ui.ctl, {
    label: 'Saluran',
    value: st.sel,
    options: [['all', 'Semua'], ...LN.map(l => [l.id, l.id])],
    onChange: v => choose(v)
  });

  ui.legend([
    { color: 'var(--c5)', label: 'gardu' },
    { color: 'var(--blue)', label: 'saluran' },
    { color: 'var(--acc)', label: 'saluran terpilih' },
    { color: 'var(--ink)', label: 'tower' }
  ]);
  ui.sum('Posisi tower, gardu, dan atribut dibangkitkan secara sintetis.');
  choose(st.sel);

  return {};
}
