'use client';

import Navbar from './Navbar';
import Hero from './Hero';
import ValueProp from './ValueProp';
import Services from './Services';
import Stats from './Stats';
import HowItWorks from './HowItWorks';
import Benefits from './Benefits';
import Portal from './Portal';
import Testimonials from './Testimonials';
import Timeline from './Timeline';
import News from './News';
import CTA from './CTA';
import Footer from './Footer';

export default function LandingPage() {
  return (
    <main className="bg-white text-gray-900 overflow-x-hidden">
      <Navbar />

      {/* 1. HERO */}
      <Hero />

      {/* 2. VALUE PROP */}
      <ValueProp />

      {/* 3. SERVICES */}
      <Services />

      {/* 4. STATS */}
      <Stats />

      {/* RESTO */}
      <HowItWorks />
      <Benefits />
      <Portal />
      <Testimonials />
      <Timeline />
      <News />
      <CTA />
      <Footer />
    </main>
  );
}