'use client';

import { motion } from 'framer-motion';
import { ArrowRight, MessageCircle, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';

const GUARANTEES = [
  'Apertura 100% digital',
  'Sin letras chicas',
  'Soporte 24/7',
  'Cancela cuando quieras',
] as const;

export default function CTA() {
  return (
    <section
      id="contacto"
      className="relative py-28 px-6 bg-void overflow-hidden noise-overlay"
    >
      {/* Aurora layers */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] rounded-full bg-emerald-700/18 blur-[140px]" />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[300px] rounded-full bg-emerald-800/10 blur-[100px]" />
        <div className="absolute top-0 right-1/4 w-[300px] h-[300px] rounded-full bg-emerald-500/10 blur-[90px]" />
      </div>

      {/* Dot grid */}
      <div className="absolute inset-0 dot-grid pointer-events-none" aria-hidden="true" />

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.88 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 glass-dark px-4 py-2 rounded-full text-[13px] font-medium text-emerald-400 mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Más de 50.000 socios ya confían en nosotros
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.7, type: 'spring', stiffness: 75 }}
          className="heading-xl text-white text-balance"
        >
          La banca cooperativa del futuro,
          <br />
          <span className="gradient-text-bright">en tu bolsillo.</span>
        </motion.h2>

        {/* Sub */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25, duration: 0.6 }}
          className="mt-6 text-[18px] text-white/52 max-w-xl mx-auto leading-relaxed"
        >
          Gestiona tu economía con la plataforma financiera más avanzada del país.
          Abre tu cuenta hoy mismo desde donde estés.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.38, duration: 0.6 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button href="#registro" size="lg" className="w-full sm:w-auto">
            Abrir mi cuenta gratis
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Button>
          <Button href="#contacto-asesor" variant="glass" size="lg" className="w-full sm:w-auto">
            <MessageCircle size={16} />
            Hablar con un asesor
          </Button>
        </motion.div>

        {/* Guarantees */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.55, duration: 0.7 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3"
        >
          {GUARANTEES.map((g) => (
            <div key={g} className="flex items-center gap-2 text-white/40 text-[13px]">
              <CheckCircle2 size={13} className="text-emerald-500/70 flex-shrink-0" />
              {g}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
