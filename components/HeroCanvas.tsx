'use client';
import dynamic from 'next/dynamic';
// three.js + shaders are lazy-loaded and never rendered on the server.
const DitherCanvas = dynamic(() => import('./DitherCanvas'), { ssr: false });
export default function HeroCanvas() { return <DitherCanvas />; }
