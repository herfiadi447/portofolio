/* =====================================================================
   UTILITAS MATEMATIKA, NOISE SINTETIS, DAN GEOMETRI LEAFLET
   ===================================================================== */

export const $ = (s, r = document) => r.querySelector(s);
export const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
export const lerp = (a, b, t) => a + (b - a) * t;
export const fmt = (v, d = 1) => v.toLocaleString('id-ID', { minimumFractionDigits: d, maximumFractionDigits: d });

export const el = (tag, attrs = {}, ...kids) => {
  const e = document.createElement(tag);
  for (const k in attrs) {
    if (k === 'class') e.className = attrs[k];
    else if (k === 'html') e.innerHTML = attrs[k];
    else e.setAttribute(k, attrs[k]);
  }
  kids.forEach(x => {
    if (typeof x === 'string') e.append(document.createTextNode(x));
    else if (x) e.append(x);
  });
  return e;
};

export const mqReduce = matchMedia('(prefers-reduced-motion: reduce)');
export const mqCoarse = matchMedia('(pointer: coarse)');
export const mqDark = matchMedia('(prefers-color-scheme: dark)');

/* Baca token warna CSS */
export const cssVar = (n, root = document.querySelector('.map-gallery') || document.documentElement) => {
  return getComputedStyle(root).getPropertyValue(n).trim();
};

export const hex2rgb = h => {
  h = h.replace('#', '');
  if (h.length === 3) h = h.split('').map(c => c + c).join('');
  const n = parseInt(h, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
};

export const rgbVar = (n, root) => hex2rgb(cssVar(n, root) || '#888888');

/* Noise deterministik (data sintetis) */
export const hash2 = (x, y, s) => {
  let h = Math.imul(x | 0, 374761393) + Math.imul(y | 0, 668265263) + Math.imul(s | 0, 2147483647);
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
};

export const sm = t => t * t * (3 - 2 * t);

export function vnoise(x, y, s) {
  const xi = Math.floor(x), yi = Math.floor(y), xf = x - xi, yf = y - yi;
  const a = hash2(xi, yi, s), b = hash2(xi + 1, yi, s), c = hash2(xi, yi + 1, s), d = hash2(xi + 1, yi + 1, s);
  const u = sm(xf), v = sm(yf);
  return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
}

export function fbm(x, y, s, o = 4) {
  let v = 0, a = 0.5, f = 1, n = 0;
  for (let i = 0; i < o; i++) {
    v += a * vnoise(x * f, y * f, s + i * 17);
    n += a;
    a *= 0.5;
    f *= 2;
  }
  return v / n;
}

export const makeGrid = (W, H, seed, scale) => {
  const a = new Float32Array(W * H);
  for (let j = 0; j < H; j++) {
    for (let i = 0; i < W; i++) {
      a[j * W + i] = clamp((fbm(i / scale, j / scale, seed) - 0.25) / 0.5);
    }
  }
  return a;
};

export const contrast = v => clamp((v - 0.5) * 1.7 + 0.5);

/* Geometri bantu Leaflet */
export const bnds = (c, w, h) => {
  if (typeof L === 'undefined') return null;
  return L.latLngBounds([c[0] - h / 2, c[1] - w / 2], [c[0] + h / 2, c[1] + w / 2]);
};

export const cellAt = (b, W, H, ll) => {
  const i = Math.floor((ll.lng - b.getWest()) / (b.getEast() - b.getWest()) * W);
  const j = Math.floor((b.getNorth() - ll.lat) / (b.getNorth() - b.getSouth()) * H);
  return (i < 0 || j < 0 || i >= W || j >= H) ? null : { i, j };
};

export const cellRect = (b, W, H, i, j) => {
  if (typeof L === 'undefined') return null;
  const dx = (b.getEast() - b.getWest()) / W, dy = (b.getNorth() - b.getSouth()) / H;
  const w0 = b.getWest() + i * dx, n0 = b.getNorth() - j * dy;
  return L.latLngBounds([n0 - dy, w0], [n0, w0 + dx]);
};

export const uv2ll = (b, u, v) => {
  if (typeof L === 'undefined') return null;
  return L.latLng(b.getNorth() - v * (b.getNorth() - b.getSouth()), b.getWest() + u * (b.getEast() - b.getWest()));
};

export const ringAreaHa = ring => {
  const lat0 = ring[0][0], k = Math.cos(lat0 * Math.PI / 180);
  const p = ring.map(([la, ln]) => [(ln - ring[0][1]) * 111320 * k, (la - lat0) * 110574]);
  let s = 0;
  for (let i = 0; i < p.length; i++) {
    const a = p[i], b = p[(i + 1) % p.length];
    s += a[0] * b[1] - b[0] * a[1];
  }
  return Math.abs(s) / 2 / 10000;
};

/* Mesh poligon berbagi simpul (tanpa celah/overlap), dipakai tutupan lahan & choropleth */
export function mesh(b, cols, rows, jit, seed) {
  const P = [];
  for (let j = 0; j <= rows; j++) {
    P[j] = [];
    for (let i = 0; i <= cols; i++) {
      const jx = (i > 0 && i < cols) ? (hash2(i, j, seed) - 0.5) * jit : 0;
      const jy = (j > 0 && j < rows) ? (hash2(i, j, seed + 5) - 0.5) * jit : 0;
      const ll = uv2ll(b, (i + jx) / cols, (j + jy) / rows);
      P[j][i] = [ll.lat, ll.lng];
    }
  }
  const cells = [];
  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      cells.push({ i, j, ring: [P[j][i], P[j][i + 1], P[j + 1][i + 1], P[j + 1][i]] });
    }
  }
  return cells;
}

/* Raster kanvas -> ImageOverlay (diwarnai ulang saat slider bergerak) */
export function makeRaster(map, bounds, W, H, o = {}) {
  const cv = document.createElement('canvas');
  cv.width = W;
  cv.height = H;
  const cx = cv.getContext('2d');
  const ov = L.imageOverlay(cv.toDataURL(), bounds, { opacity: o.opacity ?? 0.8, className: o.cls || '', interactive: false }).addTo(map);
  return {
    ov,
    paint(fn) {
      const id = cx.createImageData(W, H);
      fn(id.data);
      cx.putImageData(id, 0, 0);
      ov.setUrl(cv.toDataURL());
    }
  };
}

/* Klasifikasi Jenks Natural Breaks */
export function jenks(data, k) {
  data = [...data].sort((a, b) => a - b);
  const n = data.length, lo = [], vc = [];
  for (let i = 0; i <= n; i++) {
    lo.push(new Array(k + 1).fill(0));
    vc.push(new Array(k + 1).fill(0));
  }
  for (let i = 1; i <= k; i++) {
    lo[1][i] = 1;
    vc[1][i] = 0;
    for (let j = 2; j <= n; j++) vc[j][i] = Infinity;
  }
  let v = 0;
  for (let l = 2; l <= n; l++) {
    let s = 0, s2 = 0, w = 0;
    for (let m = 1; m <= l; m++) {
      const i3 = l - m + 1, val = data[i3 - 1];
      w++;
      s += val;
      s2 += val * val;
      v = s2 - s * s / w;
      const i4 = i3 - 1;
      if (i4 !== 0) {
        for (let j = 2; j <= k; j++) {
          if (vc[l][j] >= v + vc[i4][j - 1]) {
            lo[l][j] = i3;
            vc[l][j] = v + vc[i4][j - 1];
          }
        }
      }
    }
    lo[l][1] = 1;
    vc[l][1] = v;
  }
  const br = [];
  br[k] = data[n - 1];
  let kk = n - 1, c = k;
  while (c > 0) {
    br[c - 1] = data[lo[kk + 1][c] - 1];
    kk = lo[kk + 1][c] - 2;
    c--;
  }
  return br; // k+1 batas: min ... max
}
