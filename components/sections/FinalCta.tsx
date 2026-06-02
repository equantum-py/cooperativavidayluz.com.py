'use client';

import { ArrowRight } from 'lucide-react';
import { motion } from '@/components/ui/Motion';

export function FinalCta() {
  return (
    <section id="contacto" className="relative overflow-hidden bg-dark px-6 py-28 text-white lg:px-8">
      <div className="absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-accent/25 blur-3xl" />
      <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="relative mx-auto max-w-4xl text-center">
        <p className="font-semibold uppercase tracking-[0.28em] text-accent">Hazte socio</p>
        <h2 className="mt-5 font-display text-5xl font-bold leading-none tracking-[-0.06em] md:text-7xl">Tu futuro crece cuando crecemos juntos</h2>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/70">Conversemos sobre ahorro, créditos y beneficios diseñados para tu próxima etapa.</p>
        <a href="mailto:contacto@cooperativavidayluz.com.py" className="mt-9 inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 font-bold text-dark shadow-glow transition hover:-translate-y-1 hover:bg-accent hover:text-white">Únete a Vida & Luz <ArrowRight /></a>
      </motion.div>
    </section>
  );
}
