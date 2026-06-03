'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Shield, TrendingUp, Users, ChevronDown } from 'lucide-react';

/* ─── Floating banking card ────────────────────────────────────── */
function BankingCard() {
  const bars = [38, 52, 44, 68, 58, 76, 63, 84, 72, 90, 80, 95];

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.65, duration: 1, type: 'spring', stiffness: 55, damping: 14 }}
      className="relative mx-auto max-w-[368px] animate-float"
    >
      {/* Card glow */}
      <div className="absolute inset-0 rounded-3xl bg-emerald-500/10 blur-2xl scale-105 pointer-events-none" />

      {/* Main card */}
      <div className="relative glass-dark rounded-3xl p-6 shadow-elevation-3">
        {/* Header */}
        <div className="flex items-start justify-between mb-5">
          <div>
            <p className="text-white/40 text-[10px] uppercase tracking-[0.16em] font-medium mb-1">
              Saldo disponible
            </p>
            <p className="text-white text-[2rem] font-bold tracking-tight leading-none">
              Gs. 12.450.000
            </p>
            <div className="flex items-center gap-1 mt-1.5">
              <TrendingUp size={11} className="text-emerald-400" />
              <p className="text-emerald-400 text-[12px] font-medium">+8.4% este mes</p>
            </div>
          </div>
          <div className="w-11 h-11 rounded-2xl bg-emerald-500/12 border border-emerald-400/20 flex items-center justify-center flex-shrink-0">
            <div className="w-5 h-5 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600" />
          </div>
        </div>

        {/* Mini bar chart */}
        <div className="flex items-end gap-[3px] h-12 mb-5">
          {bars.map((h, i) => (
            <motion.div
              key={i}
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ delay: 0.9 + i * 0.045, duration: 0.35, ease: 'easeOut' }}
              className="flex-1 rounded-[2px] bg-emerald-500/28 origin-bottom"
              style={{ height: `${h}%` }}
            />
          ))}
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: 'Aportes', value: 'Gs. 2.1M', highlight: false },
            { label: 'Crédito', value: 'Disponible', highlight: true },
            { label: 'Estado', value: 'Activo', positive: true },
          ].map((stat) => (
            <div key={stat.label} className="bg-white/[0.05] rounded-xl p-2.5">
              <p className="text-white/35 text-[9px] uppercase tracking-[0.12em] mb-1">
                {stat.label}
              </p>
              <p
                className={`text-[11.5px] font-semibold leading-tight ${
                  stat.highlight ? 'text-emerald-400' : 'text-white/85'
                }`}
              >
                {stat.value}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Floating notification — right */}
      <motion.div
        initial={{ opacity: 0, x: 20, scale: 0.88 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        transition={{ delay: 1.35, duration: 0.5, type: 'spring' }}
        className="absolute -right-5 top-7 glass-dark rounded-2xl px-3.5 py-2.5 flex items-center gap-2.5 shadow-elevation-2 border-emerald-500/15"
      >
        <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0 text-white text-sm font-bold">
          ✓
        </div>
        <div>
          <p className="text-white text-[12px] font-medium leading-tight">Cuota acreditada</p>
          <p className="text-white/38 text-[10px] mt-0.5">Hace 2 minutos</p>
        </div>
      </motion.div>

      {/* Floating social proof — left */}
      <motion.div
        initial={{ opacity: 0, x: -20, scale: 0.88 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        transition={{ delay: 1.65, duration: 0.5, type: 'spring' }}
        className="absolute -left-5 bottom-10 glass-dark rounded-2xl px-3.5 py-2.5 shadow-elevation-2"
      >
        <div className="flex items-center gap-2">
          <div className="flex -space-x-2">
            {['#007f5f', '#2b9348', '#55a630', '#80b918'].map((c, i) => (
              <div
                key={i}
                className="w-6 h-6 rounded-full border-2 border-[#0C1C17]"
                style={{ backgroundColor: c }}
              />
            ))}
          </div>
          <p className="text-white text-[11px] font-medium">+15.000 socios</p>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── Hero section ─────────────────────────────────────────────── */
export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  const TRUST = [
    { Icon: Shield, text: 'Regulada por INCOOP' },
    { Icon: Users, text: '+15.000 socios' },
    { Icon: TrendingUp, text: '30 años de trayectoria' },
  ] as const;

  return (
    <section
      ref={ref}
      id="inicio"
      className="relative min-h-screen flex flex-col items-center justify-start overflow-hidden bg-void noise-overlay"
    >
      {/* Aurora blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute -top-[10%] left-[8%] w-[640px] h-[540px] rounded-full bg-emerald-600/18 blur-[130px] animate-aurora-move" />
        <div
          className="absolute top-[8%] right-[3%] w-[440px] h-[380px] rounded-full bg-emerald-800/14 blur-[110px] animate-aurora-move-2"
          style={{ animationDelay: '-5s' }}
        />
        <div
          className="absolute bottom-[8%] left-[28%] w-[500px] h-[320px] rounded-full bg-emerald-800/8 blur-[90px] animate-aurora-move"
          style={{ animationDelay: '-9s' }}
        />
      </div>

      {/* Grid pattern */}
      <div className="absolute inset-0 dot-grid pointer-events-none" aria-hidden="true" />

      {/* Content wrapper with parallax */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 flex flex-col items-center text-center px-6 pt-36 pb-10 max-w-5xl mx-auto w-full"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.88, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="inline-flex items-center gap-2.5 glass-dark px-4 py-2 rounded-full text-[13px] font-medium text-emerald-400 mb-9"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Paraguay · Regulada por INCOOP · Desde 1994
        </motion.div>

        {/* H1 */}
        <motion.h1
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12, duration: 0.75, type: 'spring', stiffness: 75, damping: 16 }}
          className="heading-xl text-white text-balance"
        >
          Tu economía,{' '}
          <span className="gradient-text-bright">en manos</span>
          <br className="hidden sm:block" />
          {' '}
          <span className="gradient-text-bright">de tu comunidad</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.28, duration: 0.7 }}
          className="mt-6 text-[17px] md:text-[18.5px] text-white/52 max-w-[600px] leading-relaxed text-balance"
        >
          Cooperativa Vida &amp; Luz ofrece servicios financieros transparentes, créditos accesibles
          y rendimientos reales — con 30 años respaldando a familias y emprendedores del Paraguay.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.42, duration: 0.65 }}
          className="mt-10 flex flex-col sm:flex-row items-center gap-3"
        >
          <a
            href="#contacto"
            className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-7 py-3.5 rounded-2xl text-[15px] font-semibold transition-all shadow-lg shadow-emerald-950/50 hover:shadow-glow hover:-translate-y-0.5 active:translate-y-0 group"
          >
            Hazte socio — es gratis
            <ArrowRight
              size={15}
              className="transition-transform duration-200 group-hover:translate-x-0.5"
            />
          </a>
          <a
            href="#servicios"
            className="inline-flex items-center gap-2 glass-dark px-7 py-3.5 rounded-2xl text-[15px] font-semibold text-white/70 hover:text-white transition-all hover:-translate-y-0.5"
          >
            Ver servicios
          </a>
        </motion.div>

        {/* Trust bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.62, duration: 0.9 }}
          className="mt-14 flex items-center justify-center gap-8 flex-wrap"
        >
          {TRUST.map(({ Icon, text }) => (
            <div key={text} className="flex items-center gap-1.5 text-white/38 text-[13px]">
              <Icon size={13} className="text-emerald-500/70 flex-shrink-0" />
              {text}
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Banking card */}
      <div className="relative z-10 w-full px-6 pb-20 mt-2">
        <BankingCard />
      </div>

      {/* Scroll cue */}
      <motion.a
        href="#stats"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/22 hover:text-white/50 transition-colors cursor-pointer"
        aria-label="Desplázate hacia abajo"
      >
        <span className="text-[10px] uppercase tracking-[0.2em]">Desplázate</span>
        <ChevronDown size={15} className="animate-bounce" />
      </motion.a>
    </section>
  );
}
