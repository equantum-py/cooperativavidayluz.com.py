'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Users, Clock, Banknote, Star } from 'lucide-react';

interface Stat {
  icon: React.ElementType;
  prefix: string;
  value: number;
  suffix: string;
  label: string;
  sub: string;
  color: string;
}

const STATS: Stat[] = [
  {
    icon: Users,
    prefix: '+',
    value: 15000,
    suffix: '',
    label: 'Socios activos',
    sub: 'En todo el Paraguay',
    color: 'text-emerald-600',
  },
  {
    icon: Clock,
    prefix: '',
    value: 30,
    suffix: '+',
    label: 'Años de trayectoria',
    sub: 'Fundada en 1994',
    color: 'text-emerald-600',
  },
  {
    icon: Banknote,
    prefix: 'Gs. ',
    value: 150,
    suffix: 'B+',
    label: 'En activos gestionados',
    sub: 'Guaraníes',
    color: 'text-emerald-600',
  },
  {
    icon: Star,
    prefix: '',
    value: 98,
    suffix: '%',
    label: 'Satisfacción de socios',
    sub: 'Encuesta 2024',
    color: 'text-emerald-600',
  },
];

function useCounter(target: number, inView: boolean, duration = 1900): number {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let startTime: number | null = null;
    let raf: number;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) raf = requestAnimationFrame(step);
      else setCount(target);
    };

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, target, duration]);

  return count;
}

function StatCard({ stat, index }: { stat: Stat; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-8%' });
  const count = useCounter(stat.value, inView, 1800 + index * 100);

  const Icon = stat.icon;

  const formatted =
    stat.value >= 10000
      ? count.toLocaleString('es-PY')
      : String(count);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="group relative p-8 rounded-3xl bg-white border border-gray-100 shadow-card hover:shadow-card-hover hover:-translate-y-1.5 transition-all duration-300 overflow-hidden"
    >
      {/* Top accent line on hover */}
      <div className="absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-emerald-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Icon */}
      <div className="mb-5 inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100/80">
        <Icon size={22} className="text-emerald-600" strokeWidth={1.75} />
      </div>

      {/* Number */}
      <p className="text-[2.6rem] font-bold tracking-tight text-gray-900 leading-none tabular-nums">
        {stat.prefix}
        {inView ? formatted : '0'}
        {stat.suffix}
      </p>

      {/* Label */}
      <p className="mt-2.5 text-[15px] font-medium text-gray-700">{stat.label}</p>

      {/* Sub */}
      <p className="mt-1 text-[12.5px] text-gray-400">{stat.sub}</p>

      {/* Background watermark */}
      <div className="absolute -bottom-4 -right-4 opacity-[0.03] pointer-events-none">
        <Icon size={96} strokeWidth={1} />
      </div>
    </motion.div>
  );
}

export default function Stats() {
  return (
    <section id="stats" className="py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="text-center mb-14"
        >
          <p className="text-[12px] font-bold text-emerald-600 uppercase tracking-[0.2em] mb-3">
            Números que importan
          </p>
          <h2 className="heading-lg text-gray-900 text-balance">
            30 años de confianza colectiva
          </h2>
          <p className="mt-4 text-[17px] text-gray-500 max-w-xl mx-auto leading-relaxed">
            Resultados reales construidos por miles de familias paraguayas que confían en nosotros.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {STATS.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
