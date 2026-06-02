'use client';

import { CheckCircle2, FileText, Globe2 } from 'lucide-react';
import { portalFeatures } from '@/lib/design-system/content';
import { fadeUp, stagger } from '@/lib/design-system/motion';
import { motion } from '@/components/ui/Motion';
import { SectionEyebrow } from '@/components/ui/SectionHeader';

export function Portal() {
  return (
    <section id="portal" className="overflow-hidden bg-gradient-to-b from-white to-emerald-50 px-6 py-28 lg:px-8">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
          <SectionEyebrow>Portal digital</SectionEyebrow>
          <motion.h2 variants={fadeUp} className="font-display text-4xl font-bold tracking-[-0.04em] sm:text-5xl">Toda tu cooperativa en una experiencia clara y segura.</motion.h2>
          <motion.p variants={fadeUp} className="mt-5 text-lg leading-8 text-gray">Un sistema moderno para resolver gestiones esenciales sin filas, sin fricción y con la confianza de siempre.</motion.p>
          <motion.div variants={stagger} className="mt-8 grid gap-3 sm:grid-cols-2">
            {portalFeatures.map((feature) => <motion.div variants={fadeUp} key={feature} className="flex items-center gap-3 rounded-2xl bg-white p-4 shadow-soft"><CheckCircle2 className="text-primary" /> <span className="font-semibold">{feature}</span></motion.div>)}
          </motion.div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass rounded-[2.5rem] p-4">
          <div className="rounded-[2rem] bg-dark p-5 text-white">
            <div className="flex items-center justify-between"><p className="font-display text-xl font-bold">Portal Vida & Luz</p><Globe2 className="text-accent" /></div>
            <div className="mt-6 grid gap-4 md:grid-cols-[1fr_.8fr]">
              <div className="rounded-3xl bg-white/10 p-5"><p className="text-white/55">Aportes acumulados</p><p className="mt-2 font-display text-4xl font-bold">Gs. 12.850.000</p><div className="mt-8 h-3 rounded-full bg-white/10"><div className="h-3 w-4/5 rounded-full bg-gradient-to-r from-primary to-accent" /></div></div>
              <div className="rounded-3xl bg-gradient-to-br from-primary to-accent p-5"><FileText /><p className="mt-10 font-display text-2xl font-bold">Preaprobado</p><p className="text-sm text-white/75">Crédito educación</p></div>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">{['Extractos', 'Pagos', 'Asesoría'].map((item) => <div key={item} className="rounded-2xl bg-white/10 p-4 text-sm font-semibold">{item}</div>)}</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
