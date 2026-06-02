import { Benefits } from '@/components/sections/Benefits';
import { FinalCta } from '@/components/sections/FinalCta';
import { Footer } from '@/components/sections/Footer';
import { Hero } from '@/components/sections/Hero';
import { Navbar } from '@/components/sections/Navbar';
import { News } from '@/components/sections/News';
import { Portal } from '@/components/sections/Portal';
import { Services } from '@/components/sections/Services';
import { Stats } from '@/components/sections/Stats';
import { Testimonials } from '@/components/sections/Testimonials';
import { Timeline } from '@/components/sections/Timeline';
import { ScrollProgress } from '@/components/ui/ScrollProgress';

export default function LandingPage() {
  return (
    <main>
      <ScrollProgress />
      <Navbar />
      <Hero />
      <Stats />
      <Services />
      <Timeline />
      <Benefits />
      <Portal />
      <Testimonials />
      <News />
      <FinalCta />
      <Footer />
    </main>
  );
}
