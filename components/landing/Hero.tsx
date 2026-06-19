'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, Users } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function Hero() {
  return (
    <section className="relative pt-24 pb-12 md:pt-32 md:pb-24 lg:pt-40 lg:pb-32 bg-[#F4F8F8] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* Contenido (Izquierda) */}
          <div className="max-w-xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-[40px] md:text-[52px] font-extrabold text-[#004C47] leading-[1.1] tracking-tight mb-6">
                Construimos tu futuro con confianza cooperativa.
              </h1>
              <p className="text-[18px] text-[#121212] leading-relaxed mb-8 opacity-90">
                Soluciones financieras diseñadas para ti y tu familia. Cuentas, créditos y ahorros con el respaldo de más de 20 años de trayectoria.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-10">
                <Button href="/credito/solicitud" size="lg" className="w-full sm:w-auto shadow-md">
                  Simular crédito
                  <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                </Button>
                <Button href="#registro" variant="outline" size="lg" className="w-full sm:w-auto bg-white">
                  Hazte socio
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 text-[14px] text-[#004C47] font-medium border-t border-[#006059]/10 pt-6">
                 <div className="flex items-center gap-2">
                    <ShieldCheck size={20} className="text-[#006059]" />
                    <span>Regulado por INCOOP</span>
                 </div>
                 <div className="flex items-center gap-2">
                    <Users size={20} className="text-[#006059]" />
                    <span>Más de 15.000 socios</span>
                 </div>
              </div>
            </motion.div>
          </div>

          {/* Imagen (Derecha) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative lg:h-[600px] h-[400px] rounded-2xl overflow-hidden shadow-2xl"
          >
            <Image
              src="/images/cooperativa/hero/hero-principal.jpeg"
              alt="Familia feliz apoyada por Cooperativa Vida & Luz"
              fill
              priority
              className="object-cover object-center"
            />
          </motion.div>

        </div>
      </div>
    </section>
  );
}