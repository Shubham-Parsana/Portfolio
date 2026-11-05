'use client';
import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projects, more } from '@/lib/data/projects';
import { profile } from '@/lib/data/profile';
import s from './WorkGallery.module.scss';

// noisy-to-clean sine for IntelliWave's card (deterministic, so server and client match)
const wave = (() => {
  let d = 'M0 40';
  for (let x = 4; x <= 200; x += 4) d += ` L${x} ${(40 + Math.sin(x / 11) * 20 + (Math.abs(Math.sin(x * 12.9898) * 43758.5453) % 1 - 0.5) * 44 * (1 - x / 200)).toFixed(1)}`;
  return d;
})();
const ART: Record<string, string> = {
  'cardiovascular-disease-prediction': 'M0 40 H48 L56 40 L63 10 L72 68 L80 40 H118 L126 40 L133 22 L141 56 L149 40 H200',
  nexushealth: 'M26 40h24M38 28v24M88 40h24M100 28v24M150 40h24M162 28v24',
  'airbnb-clone': 'M8 70 L48 30 L88 70 M58 70 L98 30 L138 70 M108 70 L148 30 L188 70',
  intelliwave: wave,
};

export default function WorkGallery() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLOListElement>(null);
  const router = useRouter();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();
    mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
      const dist = () => track.current!.scrollWidth - window.innerWidth;
      gsap.to(track.current, { x: () => -dist(), ease: 'none',
        scrollTrigger: { trigger: root.current, pin: true, scrub: true, end: () => '+=' + dist(), invalidateOnRefresh: true } }); // Lenis already smooths: no extra scrub lag
    });
    return () => mm.revert();
  }, []);

  return (
    <section id="work" ref={root} className={s.work} data-chapter="3" aria-labelledby="work-t">
      <ol ref={track} className={s.track} data-cursor="scroll">
        <li className={`${s.panel} ${s.intro}`}>
          <h2 id="work-t" className={s.h2}>Selected work</h2>
          <p className={s.mono}>Four projects, scroll sideways on desktop.</p>
        </li>
        {projects.map((p) => (
          <li key={p.slug} className={`${s.panel} ${s.card}`} data-cursor="view"
            onClick={(e) => { if (!(e.target as HTMLElement).closest('a')) router.push(p.links.caseStudy); }}>
            <div className={s.top}><span>Fig. {p.index}</span><span>{p.kicker}</span></div>
            {/* TODO: swap this generated artwork for a project screenshot (public/images/<slug>.webp) */}
            <div className={s.fig} aria-hidden>
              <svg viewBox="0 0 200 80" preserveAspectRatio="none"><path d={ART[p.slug]} /></svg>
              <span className={s.num}>{p.index}</span>
            </div>
            <h3><Link href={p.links.caseStudy}>{p.title}</Link></h3>
            <p>{p.summary}</p>
            <ul className={s.tags}>{p.stack.map((t) => <li key={t}>{t}</li>)}</ul>
            <p className={s.links}>
              {p.links.live && <a href={p.links.live}>Live demo</a>}
              {p.links.github && <a href={p.links.github}>GitHub</a>}
              <Link href={p.links.caseStudy}>Case study</Link>
            </p>
            {['tl', 'tr', 'bl', 'br'].map((c) => <i key={c} className={`${s.mark} ${s[c]}`} aria-hidden />)}
          </li>
        ))}
        <li className={`${s.panel} ${s.more}`}>
          <p className={s.mono}>More on GitHub</p>
          <ul>{more.map((m) => <li key={m.name}><a href={m.href}>{m.name}</a>{m.note && <span>{m.note}</span>}</li>)}</ul>
          <a href={profile.links.github} className={s.links}>github.com/Shubham-Parsana</a>
        </li>
      </ol>
    </section>
  );
}
