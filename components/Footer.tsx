'use client';
import { useEffect, useRef } from 'react';
import { profile } from '@/lib/data/profile';
import s from './Footer.module.scss';

const LINES: [string, string][] = [
  ['> denoising signal ...', 'done'], ['> noise ...', '0%'],
  ['> status ...', 'open to internships & entry-level roles'], ['> exit', '0'],
];
const C = 2 * Math.PI * 28;

/** End-of-transmission footer: terminal sign-off, scroll-progress back-to-top ring, and a 12-column resolution ramp. */
export default function Footer() {
  const root = useRef<HTMLElement>(null);
  const ring = useRef<SVGCircleElement>(null);

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) root.current?.classList.add(s.in); }, { threshold: 0.3 });
    io.observe(root.current!);
    const onScroll = () => {
      const p = scrollY / Math.max(1, document.documentElement.scrollHeight - innerHeight);
      if (ring.current) ring.current.style.strokeDashoffset = String(C * (1 - Math.min(1, p)));
    };
    onScroll(); addEventListener('scroll', onScroll, { passive: true });
    return () => { io.disconnect(); removeEventListener('scroll', onScroll); };
  }, []);

  return (
    <footer ref={root} className={s.footer}>
      <div className={s.row}>
        <p className={s.term}>
          {LINES.map(([k, v], i) => <span key={k} className={s.line} style={{ '--i': i } as React.CSSProperties}>{k} <b>{v}</b></span>)}
          <span className={s.caret} aria-hidden="true" />
        </p>
        <a href="#main" className={s.top} aria-label="Back to top">
          <svg viewBox="0 0 64 64" fill="none" aria-hidden="true">
            <circle cx="32" cy="32" r="28" stroke="var(--line)" strokeWidth="1.5" />
            <circle ref={ring} cx="32" cy="32" r="28" stroke="var(--signal)" strokeWidth="1.5" strokeDasharray={C} strokeDashoffset={C} transform="rotate(-90 32 32)" />
          </svg>
          <span>Top</span>
        </a>
      </div>
      <div className={s.ramp} aria-hidden="true">
        {Array.from({ length: 12 }, (_, i) => {
          const cell = Math.max(3, Math.round(26 - i * 2.1));
          return <i key={i} style={{ backgroundImage: `radial-gradient(circle, var(--bone) ${cell * 0.28}px, transparent ${cell * 0.28 + 0.6}px)`, backgroundSize: `${cell}px ${cell}px` }} />;
        })}
      </div>
      <p className={s.meta}>
        <span>Resolution: 26px → 3px</span><span>© 2026 {profile.name}</span>
        <span>Built with Next.js, GSAP, Three.js</span><a href={profile.links.github}>github.com/Shubham-Parsana</a>
      </p>
    </footer>
  );
}
