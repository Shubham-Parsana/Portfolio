'use client';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { profile } from '@/lib/data/profile';
import s from './Chrome.module.scss';

const NAV = [['Work', '/#work'], ['About', '/#about'], ['Signal', '/#signal'], ['Contact', '/#contact']] as const;

export default function Chrome() {
  const home = usePathname() === '/';
  const [open, setOpen] = useState(false);
  const [ch, setCh] = useState(0);
  const [time, setTime] = useState('--:--');

  useEffect(() => {
    const tick = () => setTime(new Date().toLocaleTimeString('en-GB', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit' }));
    tick();
    const t = setInterval(tick, 10000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    if (!home) return;
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setCh(Number((e.target as HTMLElement).dataset.chapter))),
      { rootMargin: '-50% 0px -50% 0px' });
    document.querySelectorAll('[data-chapter]').forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [home]);

  return (
    <>
      <header className={s.bar} data-light={ch === 2 && !open}>
        <a href="/#main" className={s.logo} aria-label="Shubham Parsana, back to top">SP*</a>
        <nav className={s.nav} aria-label="Primary">{NAV.map(([l, h]) => <a key={h} href={h}>{l}</a>)}</nav>
        <button className={s.menuBtn} aria-expanded={open} onClick={() => setOpen((o) => !o)}>{open ? 'Close' : 'Menu'}</button>
      </header>
      <AnimatePresence>
        {open && (
          <motion.div className={s.menu} initial={{ clipPath: 'inset(0 0 100% 0)' }} animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }} transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}>
            {NAV.map(([l, h], i) => (
              <motion.a key={h} href={h} onClick={() => setOpen(false)} initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1, transition: { delay: 0.25 + i * 0.07 } }}>{l}</motion.a>
            ))}
            <a className={s.mail} href={`mailto:${profile.email}`}>{profile.email}</a>
          </motion.div>
        )}
      </AnimatePresence>
      {home && <p className={s.counter} data-light={ch === 2 && !open}>{String(ch).padStart(2, '0')}/06</p>}
      <p className={s.clock} data-light={ch === 2 && !open}>Gujarat, IN · {time} IST</p>
    </>
  );
}
