'use client';

import { timelineItems } from '@/lib/design-system/content';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { motion } from '@/components/ui/Motion';

export function Timeline() {
  return (
    <section id="nosotros" className="bg-dark px-6 py-28 text-white lg:px-8">
      <SectionHeader eyebrow="Nuestra historia" title="Tres décadas evolucionando sin perder la cercanía." text="Una línea de tiempo que combina tradición, transparencia y una ambición moderna: elevar el estándar cooperativo nacional." inverse />
      <div className="mx-auto max-w-5xl">
        {timelineItems.map(({ year, title, text }, index) => (
          <motion.div key={year} initial={{ opacity: 0, x: index % 2 ? 40 : -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: '-140px' }} transition={{ duration: 0.65 }} className="relative grid gap-6 border-l border-white/10 pb-12 pl-8 md:grid-cols-[180px_1fr]">
            <div className="absolute -left-3 top-0 h-6 w-6 rounded-full border-4 border-dark bg-accent shadow-glow" />
            <p className="font-display text-5xl font-bold tracking-[-0.05em] text-accent">{year}</p>
            <div className="dark-glass rounded-[2rem] p-7"><h3 className="font-display text-2xl font-bold">{title}</h3><p className="mt-3 leading-8 text-white/70">{text}</p></div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
