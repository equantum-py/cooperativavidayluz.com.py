'use client';

import { motion } from 'framer-motion';
import {
  PiggyBank,
  CreditCard,
  BookOpen,
  Gift,
  Smartphone,
  HeartHandshake,
  ArrowRight,
} from 'lucide-react';

interface Service {
  id: string;
  icon: React.ElementType;
  title: string;
  description: string;
  badge: string;
  dark?: boolean;
  accent?: boolean;
  span?: 'wide' | 'normal' | 'full';
}

const SERVICES: Service[] = [
  {
    id: 'ahorro',
    icon: PiggyBank,
    title: 'Ahorro',
    description:
      'Haz crecer tu dinero con tasas competitivas y total seguridad. Planes desde Gs. 200.000 con rendimientos garantizados.',
    badge: 'Hasta 8% TNA',
    dark: false,
    accent: true,
    span: 'wide',
  },
  {
    id: 'creditos',
    icon: CreditCard,
    title: 'Créditos',
    description:
      'Préstamos con aprobación rápida, sin trámites complicados. Para proyectos personales, estudios o tu negocio.',
    badge: 'Desde 1.5% mensual',
    dark: true,
  },
  {
    id: 'educacion',
    icon: BookOpen,
    title: 'Educación Financiera',
    description:
      'Talleres y cursos gratuitos para que tomes mejores decisiones con tu dinero.',
    badge: 'Gratis para socios',
  },
  {
    id: 'beneficios',
    icon: Gift,
    title: 'Beneficios & Convenios',
    description:
      'Descuentos exclusivos con más de 80 comercios aliados en salud, educación y gastronomía.',
    badge: '+80 aliados',
    span: 'wide',
  },
  {
    id: 'portal',
    icon: Smartphone,
    title: 'Portal Digital',
    description:
      'Gestiona aportes, créditos y extractos desde tu teléfono, en cualquier momento.',
    badge: 'App 24/7',
    dark: true,
  },
  {
    id: 'seguros',
    icon: HeartHandshake,
    title: 'Seguros de Vida',
    description:
      'Protección familiar accesible y flexible. Cobertura desde Gs. 25.000 por mes.',
    badge: 'Cobertura familiar',
  },
];

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const Icon = service.icon;

  const cardClasses = service.dark
    ? 'bg-void-2 text-white border-white/[0.07] hover:border-emerald-500/30'
    : 'bg-white text-gray-900 border-gray-100/80 hover:border-emerald-200';

  const iconBgClasses = service.dark
    ? 'bg-emerald-500/12 border border-emerald-500/20'
    : service.accent
    ? 'bg-emerald-50 border border-emerald-100'
    : 'bg-gray-50 border border-gray-100';

  const iconClasses = service.dark ? 'text-emerald-400' : 'text-emerald-600';

  const badgeClasses = service.dark
    ? 'bg-white/[0.06] text-emerald-400 border-white/[0.08]'
    : 'bg-emerald-50 text-emerald-700 border-emerald-100';

  const descClasses = service.dark ? 'text-white/52' : 'text-gray-500';

  const arrowClasses = service.dark
    ? 'text-emerald-400 group-hover:text-emerald-300'
    : 'text-emerald-600 group-hover:text-emerald-700';

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -5, transition: { type: 'spring', stiffness: 320, damping: 22 } }}
      className={`group relative flex flex-col p-7 rounded-3xl border shadow-card hover:shadow-card-hover transition-all duration-300 cursor-pointer overflow-hidden ${cardClasses} ${
        service.span === 'wide' ? 'md:col-span-2' : ''
      } ${service.span === 'full' ? 'md:col-span-3' : ''}`}
    >
      {/* Glow on hover for dark cards */}
      {service.dark && (
        <div className="absolute inset-0 rounded-3xl bg-emerald-500/0 group-hover:bg-emerald-500/[0.04] transition-colors duration-300 pointer-events-none" />
      )}

      {/* Top row */}
      <div className="flex items-start justify-between mb-5">
        <div
          className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 ${iconBgClasses}`}
        >
          <Icon size={22} className={iconClasses} strokeWidth={1.75} />
        </div>
        <span
          className={`text-[11px] font-semibold px-3 py-1 rounded-full border ${badgeClasses}`}
        >
          {service.badge}
        </span>
      </div>

      {/* Content */}
      <div className="flex-1">
        <h3
          className={`text-[18px] font-bold mb-2.5 ${
            service.dark ? 'text-white' : 'text-gray-900'
          }`}
        >
          {service.title}
        </h3>
        <p className={`text-[14.5px] leading-relaxed ${descClasses}`}>{service.description}</p>
      </div>

      {/* CTA row */}
      <div className={`mt-5 flex items-center gap-1.5 text-[13.5px] font-semibold ${arrowClasses}`}>
        Conocer más
        <ArrowRight
          size={13}
          className="transition-transform duration-200 group-hover:translate-x-1"
        />
      </div>
    </motion.div>
  );
}

export default function Services() {
  return (
    <section id="servicios" className="py-24 px-6 bg-gray-50/60">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="text-center mb-14"
        >
          <p className="text-[12px] font-bold text-emerald-600 uppercase tracking-[0.2em] mb-3">
            Nuestros servicios
          </p>
          <h2 className="heading-lg text-gray-900 text-balance">
            Todo lo que necesitas,
            <br className="hidden sm:block" /> en un solo lugar
          </h2>
          <p className="mt-4 text-[17px] text-gray-500 max-w-xl mx-auto leading-relaxed">
            Servicios financieros diseñados para el bienestar real de las familias y
            emprendedores paraguayos.
          </p>
        </motion.div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {SERVICES.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
