import type { Metadata } from 'next';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';
import AsociateForm from '@/components/asociate/AsociateForm';

export const metadata: Metadata = {
  title: 'Hazte socio | Cooperativa Vida & Luz',
  description: 'Asóciate a la cooperativa de manera rápida y 100% digital.',
};

export default function HazteSocioPage() {
  return (
    <>
      <Navbar />
      <div className="bg-[#004C47] pt-28 pb-12 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-emerald-200 text-[12px] font-bold uppercase tracking-[0.2em] mb-3">
            Asociación
          </p>
          <h1 className="text-[28px] md:text-[36px] font-bold text-white leading-tight mb-3">
            Únete a nuestra comunidad
          </h1>
          <p className="text-emerald-100/80 text-[16px] leading-relaxed">
            Completa tus datos para iniciar el proceso de asociación. Un asesor se comunicará contigo para finalizar el trámite.
          </p>
        </div>
      </div>
      <main className="bg-gray-50 min-h-screen py-10 px-6">
        <div className="max-w-2xl mx-auto">
          <AsociateForm />
        </div>
      </main>
      <Footer />
    </>
  );
}
