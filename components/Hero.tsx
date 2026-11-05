'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { profile, glance } from '@/lib/data/profile';
import Scramble from './Scramble';
import Magnetic from './Magnetic';
import s from './Hero.module.scss';

export default function Hero() {
  const title = useRef<HTMLHeadingElement>(null);
  const read = useRef<HTMLSpanElement>(null);
  const pos = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    gsap.registerPlugin(SplitText);
    let raf = 0, mx = 0, my = 0;
    const paint = () => {
      raf = 0;
      const p = Math.min(1, scrollY / (innerHeight * 0.6));
      if (read.current) read.current.textContent = `cell ${Math.max(2, Math.round(8 - 6 * p))}px · noise ${Math.round((1 - p) * 100)}%`;
      if (pos.current) pos.current.textContent = `x ${String(mx).padStart(4, '0')} y ${String(my).padStart(4, '0')}`;
    };
    const queue = () => { if (!raf) raf = requestAnimationFrame(paint); };
    const onMove = (e: PointerEvent) => { mx = e.clientX; my = e.clientY; queue(); };
    addEventListener('scroll', queue, { passive: true }); addEventListener('pointermove', onMove, { passive: true });

    let split: SplitText | undefined;
    let rise: (() => void) | undefined;
    const ctx = gsap.context(() => {
      if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      split = SplitText.create(title.current!, { type: 'lines', mask: 'lines' });
      gsap.set(split.lines, { yPercent: 110 });
      rise = () => { gsap.to(split!.lines, { yPercent: 0, duration: 1.2, ease: 'expo.out', stagger: 0.12 }); };
      if (sessionStorage.getItem('booted')) rise(); else addEventListener('boot:go', rise, { once: true });
    });
    return () => {
      cancelAnimationFrame(raf); removeEventListener('scroll', queue); removeEventListener('pointermove', onMove);
      if (rise) removeEventListener('boot:go', rise);
      ctx.revert(); split?.revert();
    };
  }, []);

  return (
    <section className={s.hero} data-chapter="1" aria-labelledby="hero-title">
      <p className={s.hud}>
        <span>Fig. 01 · noise → signal</span><span ref={read}>cell 8px · noise 100%</span>
        <span ref={pos}>x 0000 y 0000</span><span>G · grid</span>
      </p>
      {['tl', 'tr', 'bl', 'br'].map((c) => <i key={c} className={`${s.corner} ${s[c]}`} aria-hidden="true" />)}
      <div className={s.main}>
        <p className={s.who}><b><Scramble text={profile.name} auto /></b><small>Full-stack developer</small></p>
        <h1 id="hero-title" ref={title} className={s.title}>I turn <span className={s.noisy}>noisy</span> problems into software that ships.</h1>
        <p className={s.pitch}>{profile.pitch}</p>
        <div className={s.ctas}>
          <Magnetic><a className={s.primary} href="#work"><Scramble text="View work" /></a></Magnetic>
          <Magnetic><a href={profile.links.resume} download><Scramble text="Download résumé" /></a></Magnetic>
          <Magnetic><a href={`mailto:${profile.email}`}><Scramble text="Say hello" /></a></Magnetic>
        </div>
      </div>
      <aside className={s.panel} aria-label="At a glance">
        <p className={s.pill}><i aria-hidden /> {profile.availability}</p>
        <dl>{glance.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl>
      </aside>
      <p className={s.scroll} aria-hidden="true">Scroll</p>
    </section>
  );
}
