import HeroCanvas from '@/components/HeroCanvas';
import Hero from '@/components/Hero';
import WorkGallery from '@/components/WorkGallery';
import Footer from '@/components/Footer';
import { About, Stack, Log, Contact } from '@/components/Chapters';

export default function Home() {
  return (
    <main id="main">
      <HeroCanvas />
      <Hero />
      <About />
      <WorkGallery />
      <Stack />
      <Log />
      <Contact />
      <Footer />
    </main>
  );
}
