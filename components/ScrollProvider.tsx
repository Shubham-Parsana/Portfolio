'use client';
import { useEffect } from 'react';
import LocomotiveScroll from 'locomotive-scroll';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/** Locomotive Scroll v5 (Lenis inside) is the only scroll engine; GSAP's ticker drives it. */
export default function ScrollProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const loco = new LocomotiveScroll({
      lenisOptions: { lerp: 0.09 },
      scrollCallback: () => ScrollTrigger.update(),
      initCustomTicker: (render) => gsap.ticker.add(render),
      destroyCustomTicker: (render) => gsap.ticker.remove(render),
    });
    gsap.ticker.lagSmoothing(0);
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href*="#"]');
      if (!a || !a.hash || a.pathname !== location.pathname) return;
      e.preventDefault();
      loco.scrollTo(a.hash);
    };
    document.addEventListener('click', onClick);
    return () => { document.removeEventListener('click', onClick); loco.destroy(); };
  }, []);
  return <>{children}</>;
}
