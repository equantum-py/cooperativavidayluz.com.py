'use client';

import { motion } from 'framer-motion';
import { ArrowRight, MessageCircle, CheckCircle2 } from 'lucide-react';

const GUARANTEES = [
  'Sin costo de apertura',
  'Sin letra chica',
  'Asesoría gratuita',
  'Cancelás cuando quieras',
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
          Más de 15.000 socios ya confían en nosotros
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.7, type: 'spring', stiffness: 75 }}
          className="heading-xl text-white text-balance"
        >
          ¿Listo para unirte a la
          <br />
          <span className="gradient-text-bright">cooperativa del futuro?</span>
        </motion.h2>

        {/* Sub */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25, duration: 0.6 }}
          className="mt-6 text-[18px] text-white/52 max-w-xl mx-auto leading-relaxed"
        >
          Construí tu bienestar financiero junto a una comunidad que creció por 30 años
          gracias a la confianza mutua. Empezá hoy, es gratis.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.38, duration: 0.6 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#registro"
            className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-4 rounded-2xl text-[16px] font-bold transition-all shadow-lg shadow-emerald-900/50 hover:shadow-glow hover:-translate-y-0.5 group"
          >
            Hazte socio — es gratis
            <ArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-1"
            />
          </a>
          <a
            href="#contacto-asesor"
            className="inline-flex items-center gap-2 glass-dark px-8 py-4 rounded-2xl text-[16px] font-semibold text-white/70 hover:text-white transition-all hover:-translate-y-0.5"
          >
            <MessageCircle size={16} />
            Hablar con un asesor
          </a>
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
