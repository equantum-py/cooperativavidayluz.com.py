'use client';

import Navbar from './Navbar';
import Hero from './Hero';
import Stats from './Stats';
import Services from './Services';
import HowItWorks from './HowItWorks';
import Benefits from './Benefits';
import Portal from './Portal';
import Testimonials from './Testimonials';
import Timeline from './Timeline';
import CTA from './CTA';
import Footer from './Footer';

export default function LandingPage() {
  return (
    <main className="bg-white text-gray-900 overflow-x-hidden">
      <Navbar />
      <Hero />
      <Stats />
      <Services />
      <HowItWorks />
      <Benefits />
      <Portal />
      <Testimonials />
      <Timeline />
      <CTA />
      <Footer />
    </main>
  );
}
