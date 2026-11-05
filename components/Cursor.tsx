'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import s from './Cursor.module.scss';

const LABEL: Record<string, string> = { view: 'View', scroll: 'Scroll' };

/** Orange dot + trailing ring. Ring grows over links, reads "View" over project cards and "Scroll" over the gallery. Fine pointers only. */
export default function Cursor() {
  const root = useRef<HTMLDivElement>(null);
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);
  const ping = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    const r = root.current!, html = document.documentElement;
    html.classList.add('has-cursor');
    gsap.set([dot.current, ring.current, ping.current], { xPercent: -50, yPercent: -50 });
    const dx = gsap.quickTo(dot.current, 'x', { duration: 0.1 }), dy = gsap.quickTo(dot.current, 'y', { duration: 0.1 });
    const rx = gsap.quickTo(ring.current, 'x', { duration: 0.55, ease: 'power3' }), ry = gsap.quickTo(ring.current, 'y', { duration: 0.55, ease: 'power3' });

    const move = (e: PointerEvent) => {
      if (r.dataset.ready !== 'true') { gsap.set([dot.current, ring.current], { x: e.clientX, y: e.clientY }); r.dataset.ready = 'true'; }
      dx(e.clientX); dy(e.clientY); rx(e.clientX); ry(e.clientY);
      const t = (e.target as HTMLElement).closest<HTMLElement>('[data-cursor], a, button');
      const kind = t ? t.dataset.cursor ?? 'link' : '';
      if (r.dataset.state !== kind) { r.dataset.state = kind; label.current!.textContent = LABEL[kind] ?? ''; }
    };
    const down = (e: PointerEvent) => {
      r.dataset.down = 'true';
      gsap.fromTo(ping.current, { x: e.clientX, y: e.clientY, scale: 0.3, opacity: 0.9 }, { scale: 1.3, opacity: 0, duration: 0.6, ease: 'expo.out' });
    };
    const up = () => { r.dataset.down = 'false'; };
    const leave = () => { r.dataset.ready = 'false'; };
    addEventListener('pointermove', move); addEventListener('pointerdown', down); addEventListener('pointerup', up);
    html.addEventListener('mouseleave', leave);
    return () => {
      removeEventListener('pointermove', move); removeEventListener('pointerdown', down); removeEventListener('pointerup', up);
      html.removeEventListener('mouseleave', leave); html.classList.remove('has-cursor');
    };
  }, []);

  return (
    <div ref={root} className={s.root} aria-hidden="true">
      <div ref={ping} className={s.ping} />
      <div ref={ring} className={s.ring}><span ref={label} className={s.label} /></div>
      <div ref={dot} className={s.dot} />
    </div>
  );
}
