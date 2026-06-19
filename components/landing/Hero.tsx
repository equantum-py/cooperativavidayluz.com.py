'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { ShieldCheck, ArrowRight, Lock } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden px-6 pt-20">

      {/* Fondo */}
      <div className="absolute inset-0">
        <Image
          src="/images/cooperativa/hero/hero-principal.jpeg"
          alt="Cooperativa Vida & Luz"
          fill
          priority
          className="object-cover object-center"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-void/85 bg-gradient-to-t from-void via-void/80 to-transparent" />
      </div>

      {/* Contenido */}
      <div className="relative max-w-5xl w-full mx-auto flex items-center z-10">

        <div className="text-left">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.88, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="inline-flex items-center gap-2.5 glass-dark px-4 py-2 rounded-full text-[13px] font-medium text-emerald-400 mb-6 border border-emerald-500/20 shadow-glow-sm"
          >
            <ShieldCheck size={16} />
            Evolución Digital Cooperativa
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
            className="text-4xl md:text-6xl font-bold text-white leading-tight max-w-3xl tracking-tight"
          >
            Tu bienestar financiero, <br />
            <span className="gradient-text-bright">
              simple y transparente.
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.28 }}
            className="mt-6 text-[16px] md:text-[18px] text-white/80 max-w-[580px] leading-relaxed font-light"
          >
            La cooperativa moderna diseñada para potenciar tu economía. 
            Cuentas, créditos y beneficios 100% digitales, con el respaldo de siempre.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.42, duration: 0.6 }}
            className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-4"
          >
            <Button href="/credito/solicitud" size="lg" className="w-full sm:w-auto">
              Solicitar crédito ahora
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Button>
            <Button href="#registro" variant="glass" size="lg" className="w-full sm:w-auto">
              Abre tu cuenta gratis
            </Button>
          </motion.div>
          
          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mt-12 flex items-center gap-6 text-sm text-white/50"
          >
             <div className="flex items-center gap-2">
                <Lock size={16} className="text-emerald-500" />
                <span>Seguridad bancaria 256-bit</span>
             </div>
             <div className="hidden sm:flex items-center gap-2">
                <ShieldCheck size={16} className="text-emerald-500" />
                <span>Regulado por INCOOP</span>
             </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}