/* =====================================================================
   MODUL 3: NDVI (Ambang Vegetasi & Perbandingan Swipe Dua Tanggal)
   ===================================================================== */

import { bnds, makeGrid, clamp, lerp, cellAt, rgbVar, makeRaster, fmt, el } from '../utils.js';
import { slider, check, select, group } from '../ui.js';

export function ndvi({ map, host, ui, st, view }) {
  const W = 120;
  const H = 80;
  const b = bnds(view.c, view.w, view.h);
  st.thr ??= 0.35;
  st.mode ??= 'cont';
  st.cmp ??= false;
  st.swipe ??= 50;
  map.setMaxBounds(b.pad(0.6));

  const A = new Float32Array(W * H);
  const B = new Float32Array(W * H);
  const v1 = makeGrid(W, H, 31, 18);
  const v2 = makeGrid(W, H, 32, 8);
  const v3 = makeGrid(W, H, 33, 14);

  for (let j = 0; j < H; j++) {
    for (let i = 0; i < W; i++) {
      const n = j * W + i;
      const x = i / W;
      const y = j / H;
      const river = Math.abs(y - (0.55 + 0.17 * Math.sin(x * 6) + 0.06 * (v3[n] - 0.5))) < 0.028;
      const built = (x - 0.72) ** 2 + ((y - 0.3) * 1.3) ** 2 < 0.012;
      A[n] = river ? -0.35 : built ? 0.1 + 0.1 * v2[n] : clamp(0.3 + 0.6 * v1[n] + 0.1 * (v2[n] - 0.5), 0, 0.92);
      B[n] = river ? -0.3 : built ? 0.07 + 0.08 * v2[n] : clamp(A[n] * (0.5 + 0.55 * v3[n]) - 0.04, -0.2, 0.9);
    }
  }

  const ovA = makeRaster(map, b, W, H, { cls: 'smooth', opacity: 0.9 });
  const ovB = makeRaster(map, b, W, H, { cls: 'smooth', opacity: 0.9 });

  const stops = () => [
    [-1, [111, 78, 46]],
    [-0.1, [176, 141, 87]],
    [0.1, [217, 201, 160]],
    [0.3, rgbVar('--c3')],
    [0.5, rgbVar('--c2')],
    [0.8, rgbVar('--c1')],
    [1, [24, 100, 58]]
  ];

  const at = (S, v) => {
    if (v <= S[0][0]) return S[0][1];
    for (let i = 1; i < S.length; i++) {
      if (v <= S[i][0]) {
        const [a, ca] = S[i - 1];
        const [c, cb] = S[i];
        const t = (v - a) / (c - a);
        return [lerp(ca[0], cb[0], t), lerp(ca[1], cb[1], t), lerp(ca[2], cb[2], t)];
      }
    }
    return S[S.length - 1][1];
  };

  const pct = F => {
    let c = 0;
    for (let n = 0; n < F.length; n++) if (F[n] >= st.thr) c++;
    return Math.round((c / F.length) * 100);
  };

  function paint(rs, F) {
    const S = stops();
    const veg = rgbVar('--c1');
    const wat = rgbVar('--blue');
    const tan = [217, 201, 160];

    rs.paint(d => {
      for (let n = 0; n < F.length; n++) {
        const v = F[n];
        let c;
        let a = 235;
        if (st.mode === 'cont') c = at(S, v);
        else if (v < 0) c = wat;
        else if (v >= st.thr) c = veg;
        else {
          c = tan;
          a = 190;
        }
        d[n * 4] = c[0];
        d[n * 4 + 1] = c[1];
        d[n * 4 + 2] = c[2];
        d[n * 4 + 3] = a;
      }
    });
  }

  const line = el('div', { class: 'swipe-line' });
  const tagA = el('div', { class: 'swipe-tag', style: 'left:8px' }, 'A · musim hujan');
  const tagB = el('div', { class: 'swipe-tag', style: 'right:8px' }, 'B · musim kemarau');
  host.append(line, tagA, tagB);

  function clip() {
    const img = ovB.ov.getElement();
    if (!img) return;
    const c = host.getBoundingClientRect();
    const r = img.getBoundingClientRect();
    if (!r.width) return;
    const x = c.left + (c.width * st.swipe) / 100;
    const p = clamp(((x - r.left) / r.width) * 100, 0, 100);
    img.style.clipPath = st.cmp ? `inset(0 0 0 ${p}%)` : 'inset(0 0 0 100%)';
    line.style.left = st.swipe + '%';
  }

  function legend() {
    if (st.mode === 'cont') {
      const S = stops();
      const g = S.map(([v, c]) => `rgb(${c.map(Math.round)}) ${((v + 1) / 2) * 100}%`).join(',');
      ui.legend([
        {
          raw: `<span class="ramp-wrap"><span class="ramp" style="background:linear-gradient(90deg,${g})"></span><span>−1</span><span>0</span><span>1</span></span>`
        }
      ]);
    } else {
      ui.legend([
        { color: 'var(--c1)', label: `vegetasi (NDVI ≥ ${fmt(st.thr, 2)})` },
        { color: 'rgb(217,201,160)', label: 'non-vegetasi' },
        { color: 'var(--blue)', label: 'air' }
      ]);
    }
  }

  function redraw() {
    paint(ovA, A);
    paint(ovB, B);
    legend();
    clip();
    ui.sum(`Area vegetasi (NDVI ≥ ${fmt(st.thr, 2)}): A ${pct(A)}% · B ${pct(B)}%`);
  }

  let raf = 0;
  const later = () => {
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(redraw);
  };

  slider(ui.ctl, {
    label: 'Ambang',
    min: 0,
    max: 0.8,
    step: 0.05,
    value: st.thr,
    f: v => fmt(v, 2),
    onInput: v => {
      st.thr = v;
      later();
    }
  });

  const g = group(ui.ctl);
  select(g, {
    label: 'Tampilan',
    value: st.mode,
    options: [
      ['cont', 'NDVI kontinu'],
      ['thr', 'Vegetasi (ambang)']
    ],
    onChange: v => {
      st.mode = v;
      later();
    }
  });

  const sw = slider(ui.ctl, {
    label: 'Swipe A | B',
    min: 0,
    max: 100,
    step: 1,
    value: st.swipe,
    f: v => v + '%',
    onInput: v => {
      st.swipe = v;
      clip();
    }
  });

  const swRow = sw.closest('label');
  const setCmp = on => {
    st.cmp = on;
    swRow.hidden = !on;
    line.hidden = !on;
    tagA.hidden = !on;
    tagB.hidden = !on;
    clip();
  };

  check(g, { label: 'Bandingkan dua tanggal', checked: st.cmp, onChange: setCmp });
  setCmp(st.cmp);

  map.on('move zoom moveend zoomend resize', clip);
  const probe = e => {
    const p = cellAt(b, W, H, e.latlng);
    if (!p) return;
    const n = p.j * W + p.i;
    ui.say(`NDVI A ${fmt(A[n], 2)} · B ${fmt(B[n], 2)}${A[n] < 0 ? ' (air)' : ''}`);
  };

  map.on('mousemove click', probe);
  ui.say('Arahkan kursor untuk membaca nilai NDVI piksel.');
  map.whenReady(redraw);

  return {
    destroy() {
      cancelAnimationFrame(raf);
      line.remove();
      tagA.remove();
      tagB.remove();
    }
  };
}
