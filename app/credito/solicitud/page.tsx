import type { Metadata } from 'next';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';
import SolicitudForm from '@/components/credito/SolicitudForm';

export const metadata: Metadata = {
  title: 'Solicitar crédito | Cooperativa Vida & Luz',
  description:
    'Completá tu solicitud de crédito online. Proceso 100% digital, respuesta en 24–48 horas hábiles.',
};

export default function SolicitudPage() {
  return (
    <>
      <Navbar />

      {/* Hero de página */}
      <div className="bg-emerald-700 pt-28 pb-12 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-emerald-200 text-[12px] font-bold uppercase tracking-[0.2em] mb-3">
            Créditos
          </p>
          <h1 className="text-[28px] md:text-[36px] font-bold text-white leading-tight mb-3">
            Solicitud de crédito online
          </h1>
          <p className="text-emerald-100/80 text-[16px] leading-relaxed">
            Completá el formulario y recibirás una respuesta en 24 a 48 horas hábiles.
            Sin costo de solicitud.
          </p>
        </div>
      </div>

      {/* Formulario */}
      <main className="bg-gray-50 min-h-screen py-10 px-6">
        <div className="max-w-2xl mx-auto">
          <SolicitudForm />
        </div>
      </main>

      <Footer />
    </>
  );
}
