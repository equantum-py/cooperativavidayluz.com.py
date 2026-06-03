'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface Milestone {
  year: string;
  title: string;
  description: string;
  highlight?: string;
}

const MILESTONES: Milestone[] = [
  {
    year: '1994',
    title: 'Fundación',
    description:
      'Nacimos con 50 socios fundadores en Asunción, con la visión de crear una institución financiera honesta, al servicio de las familias paraguayas.',
    highlight: '50 socios fundadores',
  },
  {
    year: '2000',
    title: 'Primera expansión',
    description:
      'Abrimos nuestra primera sucursal en Lambaré, llevando los servicios cooperativos a más hogares del Gran Asunción.',
    highlight: 'Segunda sucursal',
  },
  {
    year: '2010',
    title: 'Crecimiento sólido',
    description:
      'Superamos los 5.000 socios activos y lanzamos el programa de Educación Financiera gratuita para la comunidad.',
    highlight: '+5.000 socios',
  },
  {
    year: '2018',
    title: 'Transformación digital',
    description:
      'Lanzamos el Portal Digital para Socios, permitiendo gestionar todos los servicios desde cualquier dispositivo, 24/7.',
    highlight: 'Portal digital',
  },
  {
    year: '2024',
    title: 'Líderes en cooperativismo',
    description:
      'Hoy somos una de las cooperativas financieras más confiables del Paraguay, con más de 15.000 socios activos y Gs. 150B en activos gestionados.',
    highlight: '+15.000 socios',
  },
] as const;

function MilestoneItem({
  milestone,
  index,
  isLeft,
}: {
  milestone: Milestone;
  index: number;
  isLeft: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-5%' });

  return (
    <div
      ref={ref}
      className={`relative flex items-start gap-0 md:gap-8 ${
        isLeft ? 'md:flex-row-reverse' : 'md:flex-row'
      }`}
    >
      {/* Content card */}
      <motion.div
        initial={{ opacity: 0, x: isLeft ? 24 : -24 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ delay: 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`w-full md:w-[calc(50%-2.5rem)] ${
          isLeft ? 'md:text-right md:pr-0' : 'md:text-left md:pl-0'
        } pl-12 md:pl-0`}
      >
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-card hover:shadow-card-hover transition-all duration-300 group">
          {/* Year badge */}
          <span className="inline-block text-[11px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded-full mb-3">
            {milestone.year}
          </span>
          <h3 className="text-[17px] font-bold text-gray-900 mb-1.5">{milestone.title}</h3>
          <p className="text-[14px] text-gray-500 leading-relaxed mb-3">
            {milestone.description}
          </p>
          {milestone.highlight && (
            <span className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-emerald-700">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              {milestone.highlight}
            </span>
          )}
        </div>
      </motion.div>

      {/* Center dot — hidden on mobile (shown via absolute on timeline) */}
      <div className="absolute left-0 top-6 md:static md:flex md:flex-col md:items-center flex-shrink-0 md:w-20">
        <motion.div
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ delay: 0.05, type: 'spring', stiffness: 260, damping: 18 }}
          className="w-5 h-5 rounded-full bg-emerald-600 border-4 border-white shadow-glow-sm relative z-10"
        />
      </div>

      {/* Spacer (opposite side) */}
      <div className="hidden md:block w-[calc(50%-2.5rem)]" />
    </div>
  );
}

export default function Timeline() {
  return (
    <section className="py-24 px-6 bg-white" id="historia">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="text-center mb-16"
        >
          <p className="text-[12px] font-bold text-emerald-600 uppercase tracking-[0.2em] mb-3">
            Nuestra historia
          </p>
          <h2 className="heading-lg text-gray-900 text-balance">
            30 años construyendo confianza
          </h2>
          <p className="mt-4 text-[17px] text-gray-500 max-w-lg mx-auto leading-relaxed">
            Un recorrido de crecimiento real, impulsado por las personas que creyeron en
            el modelo cooperativo.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-2 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-emerald-200 to-transparent md:-translate-x-1/2" />

          {/* Moving glow on line */}
          <motion.div
            initial={{ top: 0, opacity: 0 }}
            whileInView={{ top: '100%', opacity: [0, 1, 1, 0] }}
            viewport={{ once: true }}
            transition={{ duration: 2.5, ease: 'linear', delay: 0.2 }}
            className="absolute left-2 md:left-1/2 w-0.5 h-16 bg-gradient-to-b from-transparent via-emerald-500 to-transparent md:-translate-x-1/2 pointer-events-none"
          />

          {/* Milestones */}
          <div className="relative flex flex-col gap-8">
            {MILESTONES.map((milestone, i) => (
              <MilestoneItem
                key={milestone.year}
                milestone={milestone}
                index={i}
                isLeft={i % 2 === 0}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
