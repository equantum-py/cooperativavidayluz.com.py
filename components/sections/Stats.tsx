'use client';

import { stats } from '@/lib/design-system/content';
import { fadeUp, stagger } from '@/lib/design-system/motion';
import { motion } from '@/components/ui/Motion';

export function Stats() {
  return (
    <section className="relative -mt-16 px-6">
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="glass mx-auto grid max-w-7xl gap-4 rounded-[2rem] p-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map(({ value, label }) => (
          <motion.div variants={fadeUp} key={label} className="rounded-[1.5rem] bg-white/65 p-7 text-center">
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="font-display text-4xl font-bold tracking-[-0.04em] text-primary">{value}</motion.p>
            <p className="mt-2 font-medium text-gray">{label}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
