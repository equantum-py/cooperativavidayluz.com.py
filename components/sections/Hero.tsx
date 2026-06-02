'use client';

import { ArrowRight, Leaf, ShieldCheck, TrendingUp } from 'lucide-react';
import { fadeUp, stagger } from '@/lib/design-system/motion';
import { motion, useScroll, useTransform } from '@/components/ui/Motion';
import { SectionEyebrow } from '@/components/ui/SectionHeader';

function HeroVisual() {
  return (
    <motion.div initial={{ opacity: 0, scale: 0.94, y: 30 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="perspective-1000 relative mx-auto mt-14 h-[560px] max-w-[620px] lg:mt-0">
      <motion.div animate={{ y: [0, -14, 0], rotateX: [0, 2, 0], rotateY: [0, -3, 0] }} transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }} className="glass absolute left-4 right-4 top-20 rounded-[2rem] p-5 sm:left-12 sm:right-0">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-gray">Dashboard Vida & Luz</p>
            <p className="font-display text-2xl font-bold">Resumen del socio</p>
          </div>
          <div className="rounded-full bg-accent/15 p-3 text-primary"><ShieldCheck /></div>
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          {['Aportes', 'Créditos', 'Beneficios'].map((label, index) => (
            <motion.div key={label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 + index * 0.08 }} className="rounded-3xl border border-white/70 bg-white/60 p-4">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-gray">{label}</p>
              <p className="mt-2 font-display text-xl font-bold">{index === 0 ? 'Gs. 8.4M' : index === 1 ? '2 activos' : '18'}</p>
            </motion.div>
          ))}
        </div>
        <div className="mt-5 rounded-3xl bg-dark p-5 text-white">
          <div className="flex items-center justify-between"><span className="text-sm text-white/70">Crecimiento anual</span><span className="text-accent">+18.6%</span></div>
          <div className="mt-5 flex h-28 items-end gap-2">
            {[42, 64, 52, 74, 66, 88, 96, 82, 104, 118].map((height, index) => (
              <motion.div key={index} initial={{ height: 10 }} whileInView={{ height }} viewport={{ once: true }} transition={{ delay: index * 0.04, duration: 0.7 }} className="flex-1 rounded-t-xl bg-gradient-to-t from-primary to-accent" />
            ))}
          </div>
        </div>
      </motion.div>
      <motion.div animate={{ y: [0, 18, 0], rotate: [-8, -5, -8] }} transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }} className="absolute left-0 top-0 w-72 rounded-[2rem] bg-gradient-to-br from-dark via-primary to-accent p-5 text-white shadow-glow">
        <div className="flex items-start justify-between"><Leaf /><span className="rounded-full bg-white/15 px-3 py-1 text-xs">Socio Plus</span></div>
        <p className="mt-16 text-sm text-white/65">COOPERATIVA VIDA & LUZ</p>
        <p className="mt-2 font-display text-2xl font-semibold">Marta Benítez</p>
        <div className="mt-6 flex justify-between text-xs text-white/70"><span>PY</span><span>**** 2046</span></div>
      </motion.div>
      <motion.div animate={{ y: [0, -18, 0] }} transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut' }} className="glass absolute bottom-16 right-0 w-64 rounded-[2rem] p-5">
        <div className="flex items-center gap-3"><div className="rounded-2xl bg-accent/15 p-3 text-primary"><TrendingUp /></div><div><p className="text-sm text-gray">Confianza</p><p className="font-display text-3xl font-bold">98%</p></div></div>
        <p className="mt-4 text-sm leading-6 text-gray">Satisfacción promedio de socios en atención y soluciones.</p>
      </motion.div>
      <div className="absolute -right-8 top-8 h-32 w-32 rounded-full bg-accent/30 blur-3xl" />
      <div className="absolute bottom-0 left-10 h-44 w-44 rounded-full bg-primary/25 blur-3xl" />
    </motion.div>
  );
}

export function Hero() {
  const { scrollY } = useScroll();
  const heroParallax = useTransform(scrollY, [0, 900], [0, 120]);

  return (
    <section id="inicio" className="noise relative min-h-screen overflow-hidden bg-aurora pt-32">
      <motion.div style={{ y: heroParallax }} className="absolute inset-x-0 top-0 h-[540px] bg-[radial-gradient(circle_at_50%_0%,rgba(34,197,94,.30),transparent_55%)]" />
      <div className="absolute left-1/2 top-24 h-72 w-72 -translate-x-1/2 rounded-full bg-accent/20 blur-3xl" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-6 pb-24 pt-14 lg:grid-cols-[1.02fr_.98fr] lg:px-8">
        <motion.div initial="hidden" animate="visible" variants={stagger}>
          <SectionEyebrow>La nueva generación cooperativa en Paraguay</SectionEyebrow>
          <motion.h1 variants={fadeUp} className="font-display text-5xl font-bold leading-[0.95] tracking-[-0.06em] text-dark sm:text-7xl lg:text-8xl">
            Crecemos contigo, construimos futuro juntos
          </motion.h1>
          <motion.p variants={fadeUp} className="mt-7 max-w-2xl text-xl leading-9 text-gray">
            Una cooperativa moderna, humana y transparente que combina cercanía institucional, tecnología financiera y oportunidades reales para cada socio.
          </motion.p>
          <motion.div variants={fadeUp} className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a href="#contacto" className="group inline-flex items-center justify-center gap-2 rounded-full bg-dark px-7 py-4 font-bold text-white shadow-glow transition hover:-translate-y-1 hover:bg-primary">
              Hazte Socio <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
            </a>
            <a href="#servicios" className="inline-flex items-center justify-center gap-2 rounded-full border border-dark/10 bg-white/75 px-7 py-4 font-bold text-dark shadow-soft backdrop-blur transition hover:-translate-y-1 hover:border-primary/20 hover:text-primary">
              Conocer Servicios
            </a>
          </motion.div>
          <motion.div variants={fadeUp} className="mt-10 grid max-w-xl grid-cols-3 gap-3">
            {['Segura', 'Digital', 'Cercana'].map((item) => <div key={item} className="glass rounded-2xl px-4 py-3 text-center text-sm font-bold text-dark/75">{item}</div>)}
          </motion.div>
        </motion.div>
        <HeroVisual />
      </div>
    </section>
  );
}
