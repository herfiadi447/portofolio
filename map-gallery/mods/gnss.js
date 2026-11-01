/* =====================================================================
   MODUL 5: Titik Survei GNSS dan Drone (Animasi Jalur Lawnmower)
   ===================================================================== */

import { clamp, lerp, mqReduce, fmt, el } from '../utils.js';
import { slider, check, group } from '../ui.js';

export function gnss({ map, ui, st, view }) {
  st.p ??= 0;
  st.layers ??= { ctl: true, path: true, area: true };

  const hw = 0.0034;
  const hh = 0.0022;
  const [cy, cx] = view.c;
  const S = cy - hh;
  const N = cy + hh;
  const Wd = cx - hw;
  const E = cx + hw;

  const area = L.polygon(
    [
      [N, Wd],
      [N, E],
      [S, E],
      [S, Wd]
    ],
    { className: 'area', weight: 2, fillOpacity: 0.12 }
  );

  const rows = 11;
  const m = 0.00018;
  const pts = [];

  for (let r = 0; r < rows; r++) {
    const lat = S + m + ((N - S - 2 * m) * r) / (rows - 1);
    const a = [lat, Wd + m];
    const bb = [lat, E - m];
    (r % 2 ? [bb, a] : [a, bb]).forEach(p => pts.push(L.latLng(p)));
  }

  const cum = [0];
  for (let i = 1; i < pts.length; i++) cum.push(cum[i - 1] + pts[i - 1].distanceTo(pts[i]));
  const total = cum[cum.length - 1];

  const icon = (cls, s = 14) => L.divIcon({ className: 'ic', html: `<i class="${cls}"></i>`, iconSize: [s, s] });

  const gCtl = L.layerGroup();
  [
    [N - 0.0002, Wd + 0.0002, 'GCP-1'],
    [N - 0.0002, E - 0.0002, 'GCP-2'],
    [S + 0.0002, E - 0.0002, 'GCP-3'],
    [S + 0.0002, Wd + 0.0002, 'GCP-4'],
    [cy, cx, 'GCP-5']
  ].forEach(([la, ln, t]) =>
    L.marker([la, ln], { icon: icon('ctlp'), title: 'Titik kontrol ' + t, alt: 'Titik kontrol ' + t })
      .bindTooltip('Titik kontrol ' + t)
      .addTo(gCtl)
  );

  L.marker([cy - 0.0004, Wd + 0.0006], { icon: icon('base'), title: 'Base GNSS', alt: 'Base GNSS' })
    .bindTooltip('Base GNSS')
    .addTo(gCtl);

  [
    [cy + 0.0008, cx - 0.0012],
    [cy - 0.0006, cx + 0.0010],
    [cy + 0.0012, cx + 0.0016]
  ].forEach((p, i) =>
    L.marker(p, { icon: icon('rov', 14), title: 'Rover ' + (i + 1), alt: 'Rover ' + (i + 1) })
      .bindTooltip('Rover ' + (i + 1))
      .addTo(gCtl)
  );

  const gPath = L.layerGroup();
  L.polyline(pts, { className: 'path-full', weight: 2, dashArray: '4 4', interactive: false }).addTo(gPath);
  const done = L.polyline([pts[0]], { className: 'path-done', weight: 3, interactive: false }).addTo(gPath);

  const droneIcon = L.divIcon({
    className: 'ic',
    iconSize: [24, 24],
    html: '<svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" style="position:absolute;left:0;top:0"><g style="stroke:var(--ink);fill:var(--blue)"><circle cx="5" cy="5" r="3.5"/><circle cx="19" cy="5" r="3.5"/><circle cx="5" cy="19" r="3.5"/><circle cx="19" cy="19" r="3.5"/><rect x="8" y="8" width="8" height="8" rx="2" style="fill:var(--acc)"/></g></svg>'
  });

  const drone = L.marker(pts[0], { icon: droneIcon, interactive: false, keyboard: false }).addTo(gPath);

  const G = { ctl: gCtl, path: gPath, area };
  Object.keys(G).forEach(k => {
    if (st.layers[k]) G[k].addTo(map);
  });

  const posAt = p => {
    const d = p * total;
    let i = 1;
    while (i < cum.length - 1 && cum[i] < d) i++;
    const t = cum[i] === cum[i - 1] ? 0 : (d - cum[i - 1]) / (cum[i] - cum[i - 1]);
    const a = pts[i - 1];
    const bb = pts[i];
    const ll = L.latLng(lerp(a.lat, bb.lat, t), lerp(a.lng, bb.lng, t));
    return { ll, trail: [...pts.slice(0, i), ll] };
  };

  let raf = 0;
  let last = 0;
  let playing = false;
  let btn = null;
  let prog = null;
  const DUR = 24000;

  function setP(p) {
    st.p = clamp(p);
    const q = posAt(st.p);
    drone.setLatLng(q.ll);
    done.setLatLngs(q.trail);
    if (prog) prog.value = Math.round(st.p * 1000);
    ui.sum(
      `Progres ${Math.round(st.p * 100)}% · ${fmt((st.p * total) / 1000, 2)} dari ${fmt(total / 1000, 2)} km (${rows} lajur)`
    );
  }

  function pause() {
    cancelAnimationFrame(raf);
    playing = false;
    if (btn) {
      btn.textContent = 'Putar';
      btn.setAttribute('aria-label', 'Putar animasi drone');
    }
  }

  function tick(t) {
    setP(st.p + (t - last) / DUR);
    last = t;
    if (st.p >= 1) {
      pause();
      return;
    }
    raf = requestAnimationFrame(tick);
  }

  function play() {
    if (st.p >= 1) st.p = 0;
    playing = true;
    last = performance.now();
    btn.textContent = 'Jeda';
    btn.setAttribute('aria-label', 'Jeda animasi drone');
    raf = requestAnimationFrame(tick);
  }

  const g1 = group(ui.ctl);
  if (!mqReduce.matches) {
    btn = el('button', { type: 'button', class: 'ctl-btn', 'aria-label': 'Putar animasi drone' }, 'Putar');
    btn.addEventListener('click', () => (playing ? pause() : play()));
    g1.append(btn);
  } else {
    g1.append(
      el(
        'p',
        { class: 'ctl-note' },
        'Animasi otomatis dimatikan (preferensi gerak dikurangi). Geser slider untuk menggerakkan drone.'
      )
    );
  }

  prog = slider(ui.ctl, {
    label: 'Progres',
    min: 0,
    max: 1000,
    step: 1,
    value: Math.round(st.p * 1000),
    f: v => Math.round(v / 10) + '%',
    onInput: v => {
      pause();
      setP(v / 1000);
    }
  });

  const g2 = group(ui.ctl);
  [
    ['ctl', 'Titik kontrol'],
    ['path', 'Jalur terbang'],
    ['area', 'Area survei']
  ].forEach(([k, n]) =>
    check(g2, {
      label: n,
      checked: st.layers[k],
      onChange: v => {
        st.layers[k] = v;
        v ? G[k].addTo(map) : map.removeLayer(G[k]);
      }
    })
  );

  ui.legend([
    { color: 'var(--c5)', label: 'titik kontrol' },
    { color: 'var(--ink)', label: 'base' },
    { color: 'var(--acc)', label: 'rover / area survei' },
    { color: 'var(--blue)', label: 'jalur terbang' }
  ]);

  ui.say('Arahkan kursor ke penanda untuk melihat nama titik.');
  setP(st.p);

  return {
    pause,
    destroy() {
      cancelAnimationFrame(raf);
    }
  };
}
