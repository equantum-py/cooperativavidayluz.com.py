'use client';

import { motion } from 'framer-motion';
import {
  PiggyBank,
  CreditCard,
  BookOpen,
  Gift,
  Smartphone,
  HeartHandshake,
} from 'lucide-react';

/* ─── Data ─────────────────────────────────────────────────────────── */

const SERVICES = [
  {
    id: 'ahorro',
    icon: PiggyBank,
    title: 'Ahorro',
    description: 'Hacé crecer tu dinero con tasas competitivas y total seguridad.',
  },
  {
    id: 'creditos',
    icon: CreditCard,
    title: 'Créditos',
    description: 'Préstamos con aprobación rápida para proyectos personales y profesionales.',
  },
  {
    id: 'educacion',
    icon: BookOpen,
    title: 'Educación Financiera',
    description: 'Talleres y cursos gratuitos para mejorar tus finanzas personales.',
  },
  {
    id: 'beneficios',
    icon: Gift,
    title: 'Beneficios & Convenios',
    description: 'Descuentos en más de 80 comercios aliados en salud y gastronomía.',
  },
  {
    id: 'portal',
    icon: Smartphone,
    title: 'Portal Digital',
    description: 'Gestioná aportes, créditos y extractos desde tu teléfono, 24/7.',
  },
  {
    id: 'seguros',
    icon: HeartHandshake,
    title: 'Seguros de Vida',
    description: 'Protección familiar accesible y flexible desde Gs. 25.000 por mes.',
  },
] as const;

/* ─── Card ──────────────────────────────────────────────────────────── */

function ServiceCard({
  service,
  index,
}: {
  service: (typeof SERVICES)[number];
  index: number;
}) {
  const Icon = service.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.07, duration: 0.45 }}
      whileHover={{ y: -2, transition: { type: 'spring', stiffness: 340, damping: 26 } }}
      className="flex flex-col gap-4 bg-white border border-gray-100 rounded-2xl p-6 shadow-elevation-1 hover:shadow-card-hover transition-shadow duration-200"
    >
      {/* Icono */}
      <div className="w-11 h-11 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center flex-shrink-0">
        <Icon size={20} className="text-emerald-700" strokeWidth={1.75} />
      </div>

      {/* Texto */}
      <div>
        <h3 className="font-semibold text-[15.5px] text-gray-900 mb-1.5 leading-snug">
          {service.title}
        </h3>
        <p className="text-[13.5px] text-gray-500 leading-relaxed">
          {service.description}
        </p>
      </div>
    </motion.div>
  );
}

/* ─── Sección ───────────────────────────────────────────────────────── */

export default function Services() {
  return (
    <section id="servicios" className="py-24 px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">

        {/* Encabezado */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <p className="text-[12px] font-bold text-emerald-600 uppercase tracking-[0.2em] mb-3">
            Nuestros servicios
          </p>
          <h2 className="heading-lg text-gray-900 text-balance">
            Todo lo que necesitás,
            <br className="hidden sm:block" /> en un solo lugar
          </h2>
          <p className="mt-4 text-[17px] text-gray-500 max-w-xl mx-auto leading-relaxed">
            Servicios financieros diseñados para el bienestar real de las familias y
            emprendedores paraguayos.
          </p>
        </motion.div>

        {/* Grid uniforme */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          {SERVICES.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}
        </div>

      </div>
    </section>
  );
}
