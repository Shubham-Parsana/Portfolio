'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const GLYPHS = '▒░#/<>_01';

/** Noise → signal text: random glyphs resolve into the real string on hover (and once after boot if `auto`). */
export default function Scramble({ text, auto = false }: { text: string; auto?: boolean }) {
  const el = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const node = el.current!, tn = node.firstChild as Text, host = node.closest<HTMLElement>('a,button') ?? node;
    const o = { p: 0 };
    const run = () => {
      gsap.killTweensOf(o); o.p = 0;
      gsap.to(o, { p: 1, duration: 0.7, ease: 'none',
        onUpdate: () => { tn.nodeValue = [...text].map((ch, i) => (ch === ' ' || i < o.p * text.length ? ch : GLYPHS[Math.floor(Math.random() * GLYPHS.length)])).join(''); },
        onComplete: () => { tn.nodeValue = text; } });
    };
    host.addEventListener('pointerenter', run);
    if (auto) { if (sessionStorage.getItem('booted')) run(); else window.addEventListener('boot:go', run, { once: true }); }
    return () => { host.removeEventListener('pointerenter', run); window.removeEventListener('boot:go', run); gsap.killTweensOf(o); tn.nodeValue = text; };
  }, [text, auto]);
  return <><span ref={el} aria-hidden="true">{text}</span><span className="sr">{text}</span></>;
}
