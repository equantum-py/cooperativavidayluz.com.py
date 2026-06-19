import type { Metadata } from 'next';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';
import SimuladorForm from '@/components/credito/SimuladorForm';

export const metadata: Metadata = {
  title: 'Simulador de crédito | Cooperativa Vida & Luz',
  description: 'Simula tu crédito online sin compromiso.',
};

export default function SimuladorPage() {
  return (
    <>
      <Navbar />
      <div className="bg-emerald-700 pt-28 pb-12 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-emerald-200 text-[12px] font-bold uppercase tracking-[0.2em] mb-3">
            Simulador
          </p>
          <h1 className="text-[28px] md:text-[36px] font-bold text-white leading-tight mb-3">
            Calculá tu cuota
          </h1>
          <p className="text-emerald-100/80 text-[16px] leading-relaxed">
            Conocé el valor estimado de tu cuota mensual sin necesidad de ingresar tus datos personales.
          </p>
        </div>
      </div>
      <main className="bg-gray-50 min-h-screen py-10 px-6">
        <div className="max-w-2xl mx-auto">
          <SimuladorForm />
        </div>
      </main>
      <Footer />
    </>
  );
}
