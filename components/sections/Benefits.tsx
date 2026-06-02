'use client';

import type { LucideIcon } from 'lucide-react';
import { BarChart3, BookOpen, CircleDollarSign, HandHeart, ShieldCheck, Users } from 'lucide-react';
import { fadeUp, stagger } from '@/lib/design-system/motion';
import { motion } from '@/components/ui/Motion';
import { SectionHeader } from '@/components/ui/SectionHeader';

const benefits: Array<{ title: string; Icon: LucideIcon }> = [
  { title: 'Atención personalizada', Icon: HandHeart },
  { title: 'Créditos accesibles', Icon: CircleDollarSign },
  { title: 'Tasas competitivas', Icon: BarChart3 },
  { title: 'Educación financiera', Icon: BookOpen },
  { title: 'Transparencia', Icon: ShieldCheck },
  { title: 'Comunidad sólida', Icon: Users },
];

export function Benefits() {
  return (
    <section id="beneficios" className="px-6 py-28 lg:px-8">
      <SectionHeader eyebrow="Beneficios" title="Ventajas que se sienten humanas, claras y medibles." text="Cada beneficio está diseñado para mejorar la vida financiera de los socios, no para complejizarla." />
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="mx-auto grid max-w-7xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {benefits.map(({ title, Icon }) => (
          <motion.div variants={fadeUp} key={title} className="group rounded-[2rem] border border-dark/5 bg-white p-7 shadow-soft transition hover:-translate-y-2 hover:shadow-glow">
            <div className="mb-8 grid h-12 w-12 place-items-center rounded-2xl bg-accent/15 text-primary"><Icon /></div>
            <h3 className="font-display text-xl font-bold">{title}</h3>
            <p className="mt-3 leading-7 text-gray">Procesos simples, acompañamiento experto y comunicación transparente en cada etapa.</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
