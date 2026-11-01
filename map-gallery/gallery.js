/* =====================================================================
   KOMPONEN GALERI PETA, LAZY INIT INTERSECTION OBSERVER, FILTER & URUTAN
   ===================================================================== */

import { cards, levelOf } from './data.js';
import { MODS } from './mods/index.js';
import { mkMap } from './map-core.js';
import { mkUI, legHTML } from './ui.js';
import { $, el } from './utils.js';

export function cardHTML(d) {
  const lv = levelOf(d);
  const pad = String(d.rank).padStart(2, '0');
  return `
<article class="card" data-c="${d.c}" data-id="${d.id}" aria-labelledby="t-${d.id}">
  <div class="vis">
    <div class="vhead">
      <span class="no">No. ${pad}</span>
      <span class="lvl lvl-${lv.toLowerCase()}">${lv}</span>
      <span class="badge">Contoh interaktif</span>
    </div>
    <div class="mapwrap">
      <div class="map" id="m-${d.id}" role="group" aria-label="Peta mini interaktif: ${d.t}. Data contoh."></div>
      <div class="mapmsg" hidden></div>
      <div class="hint" hidden>Ketuk peta untuk menggeser · dua jari untuk zoom</div>
    </div>
  </div>
  <div class="body">
    ${d.p ? `<p class="projline">Terkait: ${d.p}</p>` : ''}
    <h3 id="t-${d.id}">${d.t}</h3>
    <p>${d.d}</p>
    <div class="leg" aria-label="Legenda">${legHTML(d)}</div>
    <div class="ctl" role="group" aria-label="Kontrol peta ${d.t}"></div>
    <div class="readout" role="status" aria-live="polite"></div>
    <div class="summary"></div>
    <p class="note">Data contoh, bukan hasil kerja asli.</p>
    <button class="toggle" type="button" aria-expanded="false" aria-controls="x-${d.id}">Lihat metode</button>
    <div class="more" id="x-${d.id}">
      <ol>${d.steps.map(s => `<li>${s}</li>`).join('')}</ol>
      <div class="chips">${d.tools.map(t => `<span>${t}</span>`).join('')}</div>
      ${d.p ? `<div class="proj">Terkait: <b>${d.p}</b></div>` : ''}
    </div>
  </div>
</article>`;
}

export function initMapGallery(rootSelector = '#maps') {
  const container = typeof rootSelector === 'string' ? $(rootSelector) : rootSelector;
  if (!container) {
    console.warn('Galeri peta: container tidak ditemukan untuk selector', rootSelector);
    return;
  }

  const grid = $('#grid', container) || $('.grid', container);
  const fl = $('#filters', container) || $('.filters', container);
  const sl = $('#sorts', container) || $('.sorts', container);

  if (!grid) {
    console.warn('Galeri peta: elemen grid tidak ditemukan.');
    return;
  }

  const rts = cards.map(d => ({
    d,
    st: {},
    el: null,
    inst: null,
    visible: false,
    used: 0
  }));

  const PROJ = [...new Set(cards.map(d => d.p).filter(Boolean))];
  const projIdx = p => (p ? PROJ.indexOf(p) : 99);
  let cat = 'all';
  let sort = 'rank';
  const MAX_ACTIVE = 6;

  function plainFallback(rt, text) {
    const host = $('.map', rt.el);
    const msg = $('.mapmsg', rt.el);
    if (host) host.classList.add('tiles-failed');
    if (msg) {
      msg.textContent = text;
      msg.hidden = false;
    }
  }

  function build(rt) {
    const host = $('.map', rt.el);
    const ui = mkUI(rt);
    ui.reset();

    if (typeof L === 'undefined') {
      plainFallback(rt, 'Pustaka peta (Leaflet) gagal dimuat dari CDN.');
      return {
        destroy() {
          if (host) host.classList.remove('tiles-failed');
        }
      };
    }

    let inst = {};
    let M;
    try {
      M = mkMap(host, rt.d.view, { attr: rt.d.attr });
      const modFn = MODS[rt.d.mod] || MODS.generic;
      inst = modFn({ map: M.map, host, ui, st: rt.st, rt, view: rt.d.view }) || {};
    } catch (err) {
      console.error('Error saat membangun peta ' + rt.d.id, err);
      plainFallback(rt, 'Peta mini gagal dibuat.');
    }

    return {
      pause: inst.pause,
      destroy() {
        try { if (inst && inst.destroy) inst.destroy(); } catch (e) {}
        try { if (M && M.destroy) M.destroy(); } catch (e) {}
        ui.reset();
      }
    };
  }

  function activate(rt) {
    if (rt.inst || !rt.visible || (rt.el && rt.el.hidden)) return;
    rt.inst = build(rt);
    rt.used = Date.now();

    const act = rts.filter(r => r.inst);
    if (act.length > MAX_ACTIVE) {
      act
        .filter(r => !r.visible)
        .sort((a, b) => a.used - b.used)
        .slice(0, act.length - MAX_ACTIVE)
        .forEach(deactivate);
    }
  }

  function deactivate(rt) {
    if (rt.inst) {
      rt.inst.destroy();
      rt.inst = null;
    }
  }

  const io =
    typeof window !== 'undefined' && 'IntersectionObserver' in window
      ? new IntersectionObserver(
          es =>
            es.forEach(e => {
              const rt = rts.find(r => r.el === e.target);
              if (!rt) return;
              rt.visible = e.isIntersecting;
              if (e.isIntersecting) {
                activate(rt);
              } else if (rt.inst) {
                rt.used = Date.now();
                if (rt.inst.pause) rt.inst.pause();
              }
            }),
          { rootMargin: '150px' }
        )
      : null;

  function applyFilter(rt) {
    const hide = cat !== 'all' && rt.d.c !== cat;
    if (rt.el) rt.el.hidden = hide;
    if (hide) {
      rt.visible = false;
      deactivate(rt);
    }
  }

  function render() {
    rts.forEach(deactivate);
    if (io) io.disconnect();

    const ord = [...rts].sort(
      sort === 'rank'
        ? (a, b) => a.d.rank - b.d.rank
        : (a, b) => projIdx(a.d.p) - projIdx(b.d.p) || a.d.rank - b.d.rank
    );

    grid.dataset.sort = sort;
    grid.innerHTML = ord.map(r => cardHTML(r.d)).join('');

    rts.forEach(rt => {
      rt.el = grid.querySelector(`[data-id="${rt.d.id}"]`);
      rt.visible = false;
      applyFilter(rt);
      if (io) {
        io.observe(rt.el);
      } else {
        rt.visible = true;
        activate(rt);
      }
    });
  }

  // Accordion toggle lihat metode
  grid.addEventListener('click', e => {
    const b = e.target.closest('.toggle');
    if (!b) return;
    const c = b.closest('.card');
    const o = c.classList.toggle('open');
    b.setAttribute('aria-expanded', String(o));
    b.textContent = o ? 'Tutup' : 'Lihat metode';
  });

  // Filter Kategori
  if (fl) {
    const cats = [
      ['all', 'Semua'],
      ['analisis', 'Analisis'],
      ['infrastruktur', 'Infrastruktur'],
      ['survei', 'Survei'],
      ['tematik', 'Tematik']
    ];
    fl.innerHTML = cats
      .map(([k, n], i) => `<button type="button" data-k="${k}" aria-pressed="${i === 0}">${n}</button>`)
      .join('');
    fl.addEventListener('click', e => {
      const b = e.target.closest('button');
      if (!b) return;
      cat = b.dataset.k;
      fl.querySelectorAll('button').forEach(x => x.setAttribute('aria-pressed', String(x === b)));
      rts.forEach(applyFilter);
    });
  }

  // Sorts
  if (sl) {
    sl.innerHTML = '<span>Urutan:</span>';
    [
      ['rank', 'Rumit ke sederhana'],
      ['proj', 'Terkait proyek']
    ].forEach(([k, n]) =>
      sl.append(
        el(
          'button',
          {
            type: 'button',
            'data-s': k,
            'aria-pressed': String(k === 'rank')
          },
          n
        )
      )
    );
    sl.addEventListener('click', e => {
      const b = e.target.closest('button');
      if (!b || b.dataset.s === sort) return;
      sort = b.dataset.s;
      sl.querySelectorAll('button').forEach(x => x.setAttribute('aria-pressed', String(x === b)));
      render();
    });
  }

  render();

  return {
    destroy() {
      rts.forEach(deactivate);
      if (io) io.disconnect();
    }
  };
}

// Inisialisasi otomatis jika dokumen dimuat di browser
if (typeof window !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => initMapGallery());
  } else {
    initMapGallery();
  }
}
