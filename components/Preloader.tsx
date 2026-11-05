'use client';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import s from './Preloader.module.scss';

const LINES = ['> booting shubham.os', '> loading react, next, node, asp.net core, fastapi...', '> denoising signal...'];

export default function Preloader() {
  const root = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);
  const [done, setDone] = useState(false);
  const [n, setN] = useState(0);

  useEffect(() => {
    if (sessionStorage.getItem('booted') || matchMedia('(prefers-reduced-motion: reduce)').matches) { setDone(true); return; }
    const c = { v: 0 };
    const t = gsap.timeline({ onComplete: () => { sessionStorage.setItem('booted', '1'); setDone(true); } });
    t.from(`.${s.line}`, { opacity: 0, x: -8, stagger: 0.45, duration: 0.25 })
      .to(c, { v: 100, duration: 1.8, ease: 'power2.inOut', onUpdate: () => setN(Math.round(c.v)) }, 0)
      .add('wipe', '+=0.1')
      .to(root.current, { clipPath: 'inset(0 0 100% 0)', duration: 0.9, ease: 'steps(14)' }, 'wipe') // dither-style stepped wipe
      .call(() => window.dispatchEvent(new Event('boot:go')), [], 'wipe+=0.25');
    tl.current = t;
    return () => { t.kill(); };
  }, []);

  if (done) return null;
  return (
    <div ref={root} className={s.root} onClick={() => tl.current?.progress(1, false)} role="status" aria-label="Loading">
      <div className={s.log}>{LINES.map((l) => <p key={l} className={s.line}>{l}</p>)}</div>
      <p className={s.count}>{String(n).padStart(3, '0')}</p>
      <p className={s.hint}>Click to skip</p>
    </div>
  );
}
