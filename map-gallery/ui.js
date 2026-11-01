/* =====================================================================
   KONTROL FORM NATIVE, LEGENDA DINAMIS, DAN READOUT A11Y
   ===================================================================== */

import { $, el } from './utils.js';

export function legHTML(d) {
  const col = k => (typeof k === 'number' ? `var(--c${k})` : k === 'ink' ? 'var(--ink)' : k === 'acc' ? 'var(--acc)' : 'var(--blue)');
  return d.leg.map(l => `<span><i style="background:${col(l[0])}"></i>${l[1]}</span>`).join('');
}

export function mkUI(rt) {
  const card = rt.el;
  const ctl = $('.ctl', card);
  const leg = $('.leg', card);
  const ro = $('.readout', card);
  const sum = $('.summary', card);

  return {
    ctl,
    say: t => { if (ro) ro.textContent = t; },
    sum: t => { if (sum) sum.textContent = t; },
    legend(items) {
      if (!leg) return;
      leg.innerHTML = '';
      items.forEach(it => {
        if (it.raw) {
          leg.insertAdjacentHTML('beforeend', it.raw);
          return;
        }
        const sw = el('i');
        sw.style.background = it.color;
        if (it.op != null) sw.style.opacity = it.op;

        if (it.onClick) {
          const b = el('button', {
            type: 'button',
            class: 'leg-btn',
            'aria-pressed': String(it.on !== false)
          });
          b.append(sw, document.createTextNode(it.label));
          b.addEventListener('click', () => b.setAttribute('aria-pressed', String(it.onClick())));
          leg.append(b);
        } else {
          const s = el('span');
          s.append(sw, document.createTextNode(it.label));
          leg.append(s);
        }
      });
    },
    reset() {
      if (ctl) ctl.innerHTML = '';
      if (sum) sum.textContent = '';
      if (ro) ro.textContent = '';
      if (leg) leg.innerHTML = legHTML(rt.d);
    }
  };
}

export function slider(parent, { label, min, max, step, value, f = v => v, onInput }) {
  const w = el('label', { class: 'ctl-row' });
  const out = el('output', { class: 'ctl-o' }, f(value));
  const i = el('input', { type: 'range', min, max, step, value });
  i.addEventListener('input', () => {
    out.textContent = f(+i.value);
    onInput(+i.value);
  });
  w.append(el('span', {}, label), i, out);
  parent.append(w);
  return i;
}

export function check(parent, { label, checked, onChange }) {
  const w = el('label', { class: 'ctl-chk' });
  const i = el('input', { type: 'checkbox' });
  i.checked = checked;
  i.addEventListener('change', () => onChange(i.checked));
  w.append(i, document.createTextNode(label));
  parent.append(w);
  return i;
}

export function select(parent, { label, options, value, onChange }) {
  const w = el('label', { class: 'ctl-sel' });
  const s = el('select');
  options.forEach(([v, t]) => {
    const o = el('option', { value: v }, t);
    if (v === value) o.selected = true;
    s.append(o);
  });
  s.addEventListener('change', () => onChange(s.value));
  w.append(document.createTextNode(label), s);
  parent.append(w);
  return s;
}

export const group = parent => {
  const g = el('div', { class: 'ctl-grp' });
  parent.append(g);
  return g;
};
