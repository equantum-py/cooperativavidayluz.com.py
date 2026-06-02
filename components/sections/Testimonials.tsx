'use client';

import { useEffect, useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { testimonials } from '@/lib/design-system/content';
import { motion } from '@/components/ui/Motion';
import { SectionHeader } from '@/components/ui/SectionHeader';

export function Testimonials() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setIndex((value) => (value + 1) % testimonials.length), 4200);
    return () => clearInterval(timer);
  }, []);

  const active = testimonials[index];

  return (
    <section className="px-6 py-28 lg:px-8">
      <SectionHeader eyebrow="Testimonios" title="Historias de socios, no métricas vacías." text="La confianza se construye en cada conversación, cada proyecto y cada solución concreta." />
      <div className="mx-auto max-w-4xl overflow-hidden rounded-[2.5rem] bg-dark p-8 text-white shadow-glow md:p-12">
        <motion.div key={active.name} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
          <MessageCircle className="mb-8 h-10 w-10 text-accent" />
          <p className="font-display text-3xl font-semibold leading-tight tracking-[-0.04em] md:text-5xl">{active.quote}</p>
          <div className="mt-10 flex items-center gap-4"><div className="grid h-14 w-14 place-items-center rounded-full bg-gradient-to-br from-primary to-accent font-bold">{active.name.slice(0,1)}</div><div><p className="font-bold">{active.name}</p><p className="text-white/55">{active.role}</p></div></div>
        </motion.div>
      </div>
    </section>
  );
}
