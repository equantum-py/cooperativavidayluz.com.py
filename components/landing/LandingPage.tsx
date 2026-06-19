'use client';

import Navbar from './Navbar';
import Hero from './Hero';
import ValueProp from './ValueProp';
import Services from './Services';
import HowItWorks from './HowItWorks';
import Portal from './Portal';
import Testimonials from './Testimonials';
import CTA from './CTA';
import Footer from './Footer';

export default function LandingPage() {
  return (
    <main className="bg-white text-gray-900 overflow-x-hidden">
      <Navbar />

      {/* 1. HERO */}
      <Hero />

      {/* 2. BENEFICIOS PRINCIPALES */}
      <ValueProp />

      {/* 3. PRODUCTOS FINANCIEROS */}
      <Services />

      {/* 4. CÓMO ASOCIARSE */}
      <HowItWorks />

      {/* 5. PORTAL DIGITAL */}
      <Portal />

      {/* 6. TESTIMONIOS */}
      <Testimonials />

      {/* 8. CTA FINAL */}
      <CTA />

      {/* 9. FOOTER */}
      <Footer />
    </main>
  );
}