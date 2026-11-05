'use client';
import { useEffect, useRef, useState } from 'react';
import { Experience } from '@/webgl/Experience';

export default function DitherCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);
  const [off, setOff] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const hasGL2 = !!document.createElement('canvas').getContext('webgl2');
    if (reduce || !hasGL2 || !ref.current) { setOff(true); return; } // static layout fallback
    const exp = new Experience(ref.current);
    return () => exp.dispose();
  }, []);

  return <canvas ref={ref} className="webgl-canvas" data-off={off} aria-hidden="true" />;
}
