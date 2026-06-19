'use client';

import { motion } from 'framer-motion';
import { ArrowRight, MessageCircle, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';

const GUARANTEES = [
  'Sin costos ocultos',
  'Total transparencia',
  'Soporte presencial y digital',
  'Regulado por INCOOP',
] as const;

export default function CTA() {
  return (
    <section
      id="contacto"
      className="py-24 px-6 bg-[#004C47]"
    >
      <div className="max-w-4xl mx-auto text-center">
        
        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-[40px] font-bold text-white leading-tight tracking-tight mb-6"
        >
          Únete a una comunidad financiera sólida.
        </motion.h2>

        {/* Sub */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="text-[18px] text-white/90 max-w-2xl mx-auto leading-relaxed"
        >
          Gestiona tu economía con la plataforma y el respaldo que mereces.
          Asóciate hoy mismo y comienza a disfrutar de beneficios reales.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button href="#registro" size="lg" className="w-full sm:w-auto bg-[#006059] hover:bg-[#004c47] border-transparent">
            Hazte socio ahora
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Button>
          <Button href="#contacto-asesor" size="lg" className="w-full sm:w-auto bg-transparent border border-white text-white hover:bg-white/10">
            <MessageCircle size={16} />
            Hablar con un asesor
          </Button>
        </motion.div>

        {/* Guarantees */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-12 pt-10 border-t border-white/10 flex flex-wrap items-center justify-center gap-x-8 gap-y-4"
        >
          {GUARANTEES.map((g) => (
            <div key={g} className="flex items-center gap-2 text-white/80 text-[14px]">
              <CheckCircle2 size={16} className="text-white/60 flex-shrink-0" />
              {g}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
