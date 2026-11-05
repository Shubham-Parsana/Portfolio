'use client';
import { useEffect, useState } from 'react';
import s from './Easter.module.scss';

const KONAMI = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

/** "G" toggles the 12-column grid; the Konami code gives 5s of pink-phosphor CRT mode; console hello. */
export default function Easter() {
  const [grid, setGrid] = useState(false);
  useEffect(() => {
    console.log('%c SP* %c hello, curious one. Code & notes: https://github.com/Shubham-Parsana',
      'background:#FF6B2C;color:#0A0A0B;padding:2px 6px;font-weight:700', 'color:#FF6B2C');
    let i = 0, timer: ReturnType<typeof setTimeout>;
    const key = (e: KeyboardEvent) => {
      if ((e.target as HTMLElement).closest('input,textarea')) return;
      const k = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      if (k === 'g') setGrid((g) => !g);
      i = k === KONAMI[i] ? i + 1 : k === KONAMI[0] ? 1 : 0;
      if (i === KONAMI.length) {
        i = 0;
        const h = document.documentElement; h.dataset.crt = '1';
        clearTimeout(timer); timer = setTimeout(() => delete h.dataset.crt, 5000);
      }
    };
    addEventListener('keydown', key);
    return () => { removeEventListener('keydown', key); clearTimeout(timer); };
  }, []);
  return grid ? <div className={s.grid} aria-hidden="true">{Array.from({ length: 12 }, (_, i) => <i key={i} />)}</div> : null;
}
