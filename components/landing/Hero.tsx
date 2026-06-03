'use client';

import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden px-6">

      {/* Fondo */}
      <div className="absolute inset-0">
        <img
          src="/images/cooperativa/hero/hero-principal.jpeg"
          alt="Cooperativa Vida & Luz"
          className="w-full h-full object-contain md:object-cover object-center"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-void/70" />
      </div>

      {/* Contenido */}
      <div className="relative max-w-5xl w-full mx-auto flex items-center">

        <div className="text-left">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.88, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="inline-flex items-center gap-2.5 glass-dark px-4 py-2 rounded-full text-[13px] font-medium text-emerald-400 mb-7"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Desde 1997
          </motion.div>

          {/* H1 */}
          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.12,
              duration: 0.75,
              type: 'spring',
              stiffness: 75,
              damping: 16,
            }}
            className="text-4xl md:text-5xl font-bold text-white leading-tight max-w-3xl"
          >
            Una idea nacida del corazón.
            <br />
            <span className="gradient-text-bright">
              Una cooperativa construida por su gente.
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.28 }}
            className="mt-5 text-[15px] md:text-[16.5px] text-white/75 max-w-[620px] leading-relaxed"
          >
            Desde 1997 trabajamos con honestidad, ayuda mutua y compromiso para generar
            oportunidades, bienestar y crecimiento para las familias, trabajadores y
            emprendedores de nuestra comunidad.
          </motion.p>

        </div>

      </div>
    </section>
  );
}