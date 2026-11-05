'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import c from './Chapters.module.scss';

/** IntelliWave · feature extraction: noisy sum-of-sines resolves into one clean sine as the section scrolls in; scroll velocity adds noise back. */
export default function Waveform() {
  const cv = useRef<HTMLCanvasElement>(null);
  const out = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = cv.current!, g = el.getContext('2d')!;
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    let w = 0, h = 0, last = scrollY, vel = 0;
    const fit = () => {
      const d = Math.min(devicePixelRatio, 1.5);
      w = el.clientWidth; h = el.clientHeight; el.width = w * d; el.height = h * d; g.setTransform(d, 0, 0, d, 0, 0);
    };
    fit();
    addEventListener('resize', fit);
    let vis = false;
    const io = new IntersectionObserver(([e]) => { vis = e.isIntersecting; }, { rootMargin: '10% 0px' });
    io.observe(el);
    const tick = (time: number) => {
      if (document.hidden || !vis) return;
      const t = reduce ? 0 : time;
      const clean = reduce ? 1 : Math.min(1, Math.max(0, (innerHeight - el.getBoundingClientRect().top) / (innerHeight * 0.9)));
      vel = vel * 0.92 + Math.abs(scrollY - last) * 0.02; last = scrollY;
      const noise = (1 - clean) * (1 + Math.min(vel, 3)) + Math.min(vel, 3) * 0.15;
      g.clearRect(0, 0, w, h); g.beginPath();
      for (let x = 0; x <= w; x += 3) {
        const u = (x / w) * Math.PI * 6;
        const mess = 0.5 * Math.sin(u * 3.1 + t * 4) + 0.35 * Math.sin(u * 7.3 - t * 6) + (reduce ? 0 : (Math.random() - 0.5) * 1.4);
        const y = h / 2 + (Math.sin(u + t * 1.5) + mess * noise) * h * 0.22;
        x ? g.lineTo(x, y) : g.moveTo(x, y);
      }
      g.strokeStyle = gsap.utils.interpolate('#E9E6DF', '#FF6B2C', clean) as string;
      g.lineWidth = 1.5; g.stroke();
      if (out.current) out.current.textContent = `noise ${Math.round(Math.min(noise, 1) * 100)}%`;
    };
    gsap.ticker.add(tick);
    return () => { gsap.ticker.remove(tick); removeEventListener('resize', fit); io.disconnect(); };
  }, []);

  return (
    <>
      <canvas ref={cv} className={c.wave} aria-hidden="true" />
      <p className={c.read}><span>IntelliWave · feature extraction</span><span ref={out}>noise 100%</span></p>
    </>
  );
}
