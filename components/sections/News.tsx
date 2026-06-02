'use client';

import { ChevronRight } from 'lucide-react';
import { newsItems } from '@/lib/design-system/content';
import { fadeUp, stagger } from '@/lib/design-system/motion';
import { motion } from '@/components/ui/Motion';
import { SectionHeader } from '@/components/ui/SectionHeader';

export function News() {
  return (
    <section id="noticias" className="bg-white px-6 py-28 lg:px-8">
      <SectionHeader eyebrow="Noticias" title="La cooperativa también se comunica mejor." text="Actualidad institucional presentada con claridad editorial, diseño limpio y foco en la comunidad." />
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="mx-auto grid max-w-7xl gap-5 md:grid-cols-3">
        {newsItems.map(({ tag, title, text }) => <motion.article variants={fadeUp} key={tag} className="group overflow-hidden rounded-[2rem] border border-dark/5 bg-light shadow-soft transition hover:-translate-y-2"><div className="h-48 bg-[radial-gradient(circle_at_30%_30%,rgba(34,197,94,.45),transparent_35%),linear-gradient(135deg,#0B1A12,#0F8F4F)]" /><div className="p-7"><span className="rounded-full bg-accent/15 px-3 py-1 text-sm font-bold text-primary">{tag}</span><h3 className="mt-5 font-display text-2xl font-bold tracking-[-0.03em]">{title}</h3><p className="mt-3 leading-7 text-gray">{text}</p><a className="mt-6 inline-flex items-center gap-1 font-bold text-primary" href="#contacto">Leer más <ChevronRight className="h-4 w-4" /></a></div></motion.article>)}
      </motion.div>
    </section>
  );
}
