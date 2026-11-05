import type { Metadata } from 'next';
import { Unbounded, Instrument_Serif, JetBrains_Mono, Inter_Tight } from 'next/font/google';
import '../styles/globals.scss';
import Preloader from '@/components/Preloader';
import Chrome from '@/components/Chrome';
import Cursor from '@/components/Cursor';
import Easter from '@/components/Easter';
import ScrollProvider from '@/components/ScrollProvider';

const display = Unbounded({ subsets: ['latin'], variable: '--font-display', display: 'swap' });
const serif = Instrument_Serif({ subsets: ['latin'], weight: '400', style: 'italic', variable: '--font-serif', display: 'swap' });
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono', display: 'swap' });
const body = Inter_Tight({ subsets: ['latin'], variable: '--font-body', display: 'swap' });

export const metadata: Metadata = {
  title: 'Shubham Parsana — Full-stack developer',
  description: 'Third-year CSE student building full-stack products. Open to internships and entry-level roles.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${serif.variable} ${mono.variable} ${body.variable}`}>
      <body>
        <a className="skip" href="#main">Skip to content</a>
        <Preloader />
        <Chrome />
        <Cursor />
        <Easter />
        <ScrollProvider>{children}</ScrollProvider>
      </body>
    </html>
  );
}
