/* =====================================================================
   MODUL 4: Terrain dan DEM (Hillshade, Kontur, Lereng, Terrarium / Fallback)
   ===================================================================== */

import { fbm, clamp, lerp, rgbVar, fmt } from '../utils.js';
import { check, group } from '../ui.js';

export function dem({ map, ui, st }) {
  st.hs ??= true;
  st.ct ??= true;
  st.sl ??= false;

  const TURL = 'https://s3.amazonaws.com/elevation-tiles-prod/terrarium/{z}/{x}/{y}.png';
  let synth = !!st.synth;
  let fails = 0;
  let okc = 0;
  let layer;

  const cache = new Map();
  const remember = (k, v) => {
    cache.set(k, v);
    if (cache.size > 80) cache.delete(cache.keys().next().value);
    return v;
  };

  const synthElev = (z, x, y) => {
    const e = new Float32Array(65536);
    const n = 2 ** z;
    for (let py = 0; py < 256; py++) {
      for (let px = 0; px < 256; px++) {
        const q = fbm((x + px / 256) / n * 6000, (y + py / 256) / n * 6000, 77, 5);
        e[py * 256 + px] = 20 + 2000 * Math.pow(clamp((q - 0.32) / 0.45), 1.4);
      }
    }
    return e;
  };

  const loadReal = (z, x, y) =>
    new Promise((res, rej) => {
      const im = new Image();
      im.crossOrigin = 'anonymous';
      const to = setTimeout(() => {
        im.src = '';
        rej(new Error('timeout'));
      }, 12000);

      im.onload = () => {
        clearTimeout(to);
        try {
          const cv = document.createElement('canvas');
          cv.width = cv.height = 256;
          const cx = cv.getContext('2d', { willReadFrequently: true });
          cx.drawImage(im, 0, 0);
          const d = cx.getImageData(0, 0, 256, 256).data;
          const e = new Float32Array(65536);
          for (let i = 0; i < 65536; i++) {
            // dekode Terrarium: (R * 256 + G + B / 256) - 32768
            e[i] = d[i * 4] * 256 + d[i * 4 + 1] + d[i * 4 + 2] / 256 - 32768;
          }
          res(e);
        } catch (err) {
          rej(err);
        }
      };

      im.onerror = () => {
        clearTimeout(to);
        rej(new Error('load'));
      };

      im.src = TURL.replace('{z}', z).replace('{x}', x).replace('{y}', y);
    });

  function switchSynth() {
    if (synth) return;
    synth = true;
    st.synth = true;
    cache.clear();
    ui.sum('Tile Terrarium tidak dapat dimuat. Memakai terrain sintetis berbasis noise (data contoh).');
    if (layer) layer.redraw();
  }

  async function getElev(z, x, y) {
    const n = 2 ** z;
    x = ((x % n) + n) % n;
    if (synth) {
      const k = 's' + z + '/' + x + '/' + y;
      return cache.get(k) || remember(k, synthElev(z, x, y));
    }
    const k = 'r' + z + '/' + x + '/' + y;
    if (cache.has(k)) return cache.get(k);

    try {
      const e = await loadReal(z, x, y);
      okc++;
      return remember(k, e);
    } catch (err) {
      fails++;
      if (okc === 0 && fails >= 2) {
        switchSynth();
        return getElev(z, x, y);
      }
      return new Float32Array(65536);
    }
  }

  const tileLat = (z, yf) => {
    const n = Math.PI - (2 * Math.PI * yf) / 2 ** z;
    return (180 / Math.PI) * Math.atan(0.5 * (Math.exp(n) - Math.exp(-n)));
  };

  function paint(cv, e, z, y) {
    const ctx = cv.getContext('2d');
    const img = ctx.createImageData(256, 256);
    const d = img.data;
    const res = (156543.03392 * Math.cos((tileLat(z, y + 0.5) * Math.PI) / 180)) / 2 ** z;
    const zf = 1.8;
    const alt = Math.PI / 4;
    const lx = -Math.cos(alt) / Math.SQRT2;
    const lz = Math.sin(alt);

    const stops = [
      [0, rgbVar('--c1')],
      [500, rgbVar('--c2')],
      [1100, rgbVar('--c3')],
      [1800, rgbVar('--c4')],
      [2600, [233, 228, 220]]
    ];

    const hyps = v => {
      if (v <= 0) return stops[0][1];
      for (let i = 1; i < stops.length; i++) {
        if (v <= stops[i][0]) {
          const [a, ca] = stops[i - 1];
          const [c, cb] = stops[i];
          const t = (v - a) / (c - a);
          return [lerp(ca[0], cb[0], t), lerp(ca[1], cb[1], t), lerp(ca[2], cb[2], t)];
        }
      }
      return stops[4][1];
    };

    const sl = [
      [0, rgbVar('--c1')],
      [12, rgbVar('--c3')],
      [25, rgbVar('--c4')],
      [40, rgbVar('--c5')]
    ];

    const slopeCol = v => {
      for (let i = 1; i < sl.length; i++) {
        if (v <= sl[i][0]) {
          const [a, ca] = sl[i - 1];
          const [c, cb] = sl[i];
          const t = (v - a) / (c - a);
          return [lerp(ca[0], cb[0], t), lerp(ca[1], cb[1], t), lerp(ca[2], cb[2], t)];
        }
      }
      return sl[3][1];
    };

    const zm = map.getZoom();
    const ci = zm <= 10 ? 200 : zm < 12 ? 100 : 50;

    for (let py = 0; py < 256; py++) {
      const y0 = py > 0 ? py - 1 : 0;
      const y1 = py < 255 ? py + 1 : 255;
      for (let px = 0; px < 256; px++) {
        const x0 = px > 0 ? px - 1 : 0;
        const x1 = px < 255 ? px + 1 : 255;
        const o = (py * 256 + px) * 4;
        const ee = e[py * 256 + px];
        if (ee <= 0.5) {
          d[o + 3] = 0;
          continue;
        }

        const a = e[y0 * 256 + x0];
        const bb = e[y0 * 256 + px];
        const c = e[y0 * 256 + x1];
        const dd = e[py * 256 + x0];
        const f = e[py * 256 + x1];
        const g = e[y1 * 256 + x0];
        const h = e[y1 * 256 + px];
        const i2 = e[y1 * 256 + x1];

        const gx = (c + 2 * f + i2 - (a + 2 * dd + g)) / (4 * (x1 - x0) * res);
        const gy = (g + 2 * h + i2 - (a + 2 * bb + c)) / (4 * (y1 - y0) * res);

        let rgb = st.sl ? slopeCol(Math.atan(Math.hypot(gx, gy)) * 57.2958) : hyps(ee);
        let m = 1;

        if (st.hs) {
          const fx = gx * zf;
          const fy = gy * zf;
          const shade = clamp((-fx * lx - fy * lx + lz) / Math.sqrt(fx * fx + fy * fy + 1));
          m = 0.35 + 0.9 * shade;
        }

        let r = rgb[0] * m;
        let gg = rgb[1] * m;
        let bl = rgb[2] * m;

        if (st.ct && px < 255 && py < 255) {
          const q = Math.floor(ee / ci);
          const qr = Math.floor(e[py * 256 + px + 1] / ci);
          const qd = Math.floor(e[(py + 1) * 256 + px] / ci);
          if (qr !== q || qd !== q) {
            const hi = Math.max(q, qr, qd);
            const k = hi % 5 === 0 ? 0.42 : 0.68;
            r *= k;
            gg *= k;
            bl *= k;
          }
        }

        d[o] = clamp(r, 0, 255);
        d[o + 1] = clamp(gg, 0, 255);
        d[o + 2] = clamp(bl, 0, 255);
        d[o + 3] = 235;
      }
    }
    ctx.putImageData(img, 0, 0);
  }

  const Layer = L.GridLayer.extend({
    createTile(co, done) {
      const cv = document.createElement('canvas');
      cv.width = cv.height = 256;
      cv.className = 'leaflet-tile';
      getElev(co.z, co.x, co.y)
        .then(e => {
          paint(cv, e, co.z, co.y);
          done(null, cv);
        })
        .catch(err => done(err, cv));
      return cv;
    }
  });

  layer = new Layer({ tileSize: 256, maxNativeZoom: 12, opacity: 0.85 }).addTo(map);

  const pick = L.circleMarker([0, 0], { radius: 5, className: 'pick', weight: 2, fillOpacity: 1, interactive: false });

  const legend = () =>
    ui.legend([
      ...(st.sl
        ? [
            { color: 'var(--c1)', label: 'landai' },
            { color: 'var(--c5)', label: 'curam' }
          ]
        : [
            { color: 'var(--c2)', label: 'rendah' },
            { color: 'var(--c4)', label: 'tinggi' }
          ]),
      ...(st.ct ? [{ color: 'var(--ink)', label: 'kontur' }] : [])
    ]);

  const g = group(ui.ctl);
  check(g, {
    label: 'Hillshade',
    checked: st.hs,
    onChange: v => {
      st.hs = v;
      layer.redraw();
    }
  });
  check(g, {
    label: 'Kontur',
    checked: st.ct,
    onChange: v => {
      st.ct = v;
      legend();
      layer.redraw();
    }
  });
  check(g, {
    label: 'Lereng',
    checked: st.sl,
    onChange: v => {
      st.sl = v;
      legend();
      layer.redraw();
    }
  });

  map.on('click', ev => {
    const z = Math.min(Math.round(map.getZoom()), 12);
    const p = map.project(ev.latlng, z);
    const tx = Math.floor(p.x / 256);
    const ty = Math.floor(p.y / 256);
    const e = cache.get((synth ? 's' : 'r') + z + '/' + tx + '/' + ty);
    if (!e) {
      ui.say('Elevasi belum selesai dimuat, coba lagi sebentar.');
      return;
    }
    const v = e[Math.floor(p.y % 256) * 256 + Math.floor(p.x % 256)];
    pick.setLatLng(ev.latlng).addTo(map);
    ui.say(
      `Elevasi ${Math.round(v)} m di ${fmt(ev.latlng.lat, 4)}, ${fmt(ev.latlng.lng, 4)}${synth ? ' (terrain sintetis)' : ''}`
    );
  });

  legend();
  ui.say('Klik atau ketuk peta untuk membaca elevasi titik.');
  ui.sum(
    synth
      ? 'Memakai terrain sintetis berbasis noise (data contoh).'
      : 'Sumber: tile Terrarium (AWS/Mapzen), didekode di kanvas menjadi hillshade.'
  );

  return {
    destroy() {
      cache.clear();
    }
  };
}
