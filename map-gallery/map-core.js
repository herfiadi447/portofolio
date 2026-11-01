/* =====================================================================
   CORE PETA LEAFLET, KONTROL UTARA, DAN INTEGRASI TEMA
   ===================================================================== */

import { bnds, mqReduce, mqCoarse, mqDark, $ } from './utils.js';

export const TILE = {
  light: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
  dark: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
};

export const ATTR = '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a> &middot; &copy; <a href="https://carto.com/attributions" target="_blank" rel="noopener">CARTO</a>';

/* Deteksi Tema Terpadu:
   Mendukung data-theme / class .dark / .light di <html>,
   class .light-mode / .dark di <body>,
   dan prefers-color-scheme sebagai fallback */
export const isDark = () => {
  const root = document.documentElement;
  const body = document.body;
  if (root.dataset.theme === 'dark' || root.classList.contains('dark') || (body && body.classList.contains('dark'))) return true;
  if (root.dataset.theme === 'light' || root.classList.contains('light') || (body && body.classList.contains('light-mode'))) return false;
  return mqDark.matches;
};

export const themeCbs = new Set();
export const fireTheme = () => {
  themeCbs.forEach(f => {
    try { f(); } catch (e) { console.error(e); }
  });
};

/* Observer untuk memantau perubahan tema secara real-time tanpa reload */
if (typeof window !== 'undefined') {
  const root = document.documentElement;
  const themeObserver = new MutationObserver(fireTheme);
  themeObserver.observe(root, { attributes: true, attributeFilter: ['data-theme', 'class'] });
  if (document.body) {
    themeObserver.observe(document.body, { attributes: true, attributeFilter: ['class'] });
  } else {
    document.addEventListener('DOMContentLoaded', () => {
      themeObserver.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    });
  }
  if (mqDark.addEventListener) {
    mqDark.addEventListener('change', fireTheme);
  } else if (mqDark.addListener) {
    mqDark.addListener(fireTheme);
  }
}

/* Kontrol Kompas / Panah Utara */
export const getNorthControl = () => {
  if (typeof L === 'undefined') return null;
  return L.Control.extend({
    options: { position: 'topright' },
    onAdd() {
      const d = L.DomUtil.create('div', 'north');
      d.setAttribute('role', 'img');
      d.setAttribute('aria-label', 'Arah utara ke atas peta');
      d.innerHTML = '<svg viewBox="0 0 16 20" width="14" height="18" aria-hidden="true"><path d="M8 1l6 17-6-4-6 4z" fill="currentColor"/></svg><span>U</span>';
      return d;
    }
  });
};

/* Pembuat Peta Leaflet Mandiri */
export function mkMap(host, view, opt = {}) {
  if (typeof L === 'undefined') {
    throw new Error('Leaflet belum dimuat.');
  }

  const calm = mqReduce.matches;
  const map = L.map(host, {
    center: view.c,
    zoom: view.z || 12,
    minZoom: 3,
    maxZoom: 19,
    scrollWheelZoom: false,
    dragging: !mqCoarse.matches,
    zoomAnimation: !calm,
    fadeAnimation: !calm,
    markerZoomAnimation: !calm
  });

  if (!view.z) {
    map.fitBounds(bnds(view.c, view.w, view.h), { animate: false });
    const z = map.getZoom();
    map.setMinZoom(z - 1);
    map.setMaxZoom(view.max || z + 4);
  } else {
    map.setMinZoom(view.min ?? view.z - 2);
    map.setMaxZoom(view.max ?? view.z + 3);
  }

  map.attributionControl.setPrefix('<a href="https://leafletjs.com" target="_blank" rel="noopener">Leaflet</a>');
  L.control.scale({ imperial: false, position: 'bottomleft', maxWidth: 80 }).addTo(map);

  const NorthCtlClass = getNorthControl();
  if (NorthCtlClass) {
    new NorthCtlClass().addTo(map);
  }

  const wrap = host.parentNode;
  const msg = $('.mapmsg', wrap);
  const hint = $('.hint', wrap);

  let tl;
  let loaded = 0;
  let errs = 0;

  const addBase = () => {
    if (tl) map.removeLayer(tl);
    loaded = 0;
    errs = 0;
    tl = L.tileLayer(TILE[isDark() ? 'dark' : 'light'], {
      subdomains: 'abcd',
      maxZoom: 20,
      attribution: ATTR + (opt.attr || '')
    });
    tl.on('tileload', () => {
      loaded++;
      host.classList.remove('tiles-failed');
      if (msg) msg.hidden = true;
    });
    tl.on('tileerror', () => {
      errs++;
      if (!loaded && errs >= 3) {
        host.classList.add('tiles-failed');
        if (msg) {
          msg.textContent = 'Tile peta tidak dapat dimuat. Menampilkan latar sederhana.';
          msg.hidden = false;
        }
      }
    });
    tl.addTo(map);
    tl.bringToBack();
  };

  addBase();
  const th = () => { addBase(); };
  themeCbs.add(th);

  /* Gestur Mobile: jangan jebak scroll halaman */
  const ac = new AbortController();
  if (mqCoarse.matches && hint) {
    hint.hidden = false;
    map.once('click', () => {
      map.dragging.enable();
      hint.hidden = true;
    });
  }
  map.on('click focus', () => map.scrollWheelZoom.enable());
  host.addEventListener('mouseleave', () => map.scrollWheelZoom.disable(), { signal: ac.signal });

  return {
    map,
    destroy() {
      themeCbs.delete(th);
      ac.abort();
      map.remove();
      host.classList.remove('tiles-failed');
      if (msg) msg.hidden = true;
      if (hint) hint.hidden = true;
    }
  };
}
