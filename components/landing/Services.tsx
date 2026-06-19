'use client';

import { motion } from 'framer-motion';
import {
  PiggyBank,
  CreditCard,
  Smartphone,
  HeartHandshake,
  Gift,
  ShieldCheck,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

/* ─── Data ─────────────────────────────────────────────────────────── */

const SERVICES = [
  {
    id: 'creditos',
    icon: CreditCard,
    title: 'Créditos Personales y Mipymes',
    description: 'Aprobación en 24h. Tasas desde 12% anual. Financiación flexible para consolidar deudas o impulsar tu negocio.',
  },
  {
    id: 'ahorro',
    icon: PiggyBank,
    title: 'Cajas de Ahorro Premium',
    description: 'Rendimientos de hasta 8.4% anual. Sin costos de mantenimiento. Tu dinero crece mientras está disponible 24/7.',
  },
  {
    id: 'portal',
    icon: Smartphone,
    title: 'Portal Digital 24/7',
    description: 'Nuestra App en tu navegador. Transfiere, paga cuotas y revisa tus extractos sin pisar una sucursal.',
  },
  {
    id: 'beneficios',
    icon: Gift,
    title: 'Club de Beneficios',
    description: 'Descuentos exclusivos de hasta 30% en supermercados, farmacias y comercios adheridos de todo el país.',
  },
  {
    id: 'solidaridad',
    icon: HeartHandshake,
    title: 'Subsidios y Solidaridad',
    description: 'Cobertura por nacimiento, casamiento y asistencia médica. Cuidamos a nuestra comunidad cuando más lo necesita.',
  },
  {
    id: 'seguridad',
    icon: ShieldCheck,
    title: 'Respaldo Institucional',
    description: 'Entidad auditada y regulada por el INCOOP. Fondo de garantía de depósitos para tu total tranquilidad.',
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
      whileHover={{ y: -4, transition: { type: 'spring', stiffness: 340, damping: 26 } }}
      className="flex flex-col gap-4 bg-white border border-gray-100 rounded-2xl p-7 shadow-elevation-1 hover:shadow-card-hover transition-all duration-300"
    >
      {/* Icono */}
      <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center flex-shrink-0">
        <Icon size={22} className="text-emerald-700" strokeWidth={1.75} />
      </div>

      {/* Texto */}
      <div className="flex-1">
        <h3 className="font-bold text-[17px] text-gray-900 mb-2 leading-snug">
          {service.title}
        </h3>
        <p className="text-[14.5px] text-gray-500 leading-relaxed">
          {service.description}
        </p>
      </div>
      
      {/* Action link */}
      <div className="pt-2">
        <span className="text-[13px] font-semibold text-emerald-600 hover:text-emerald-700 cursor-pointer flex items-center gap-1 group">
          Saber más <span className="transition-transform group-hover:translate-x-1">→</span>
        </span>
      </div>
    </motion.div>
  );
}

/* ─── Sección ───────────────────────────────────────────────────────── */

export default function Services() {
  return (
    <section id="servicios" className="py-24 px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">

        {/* Encabezado */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <p className="text-[12px] font-bold text-emerald-600 uppercase tracking-[0.2em] mb-3">
            Portafolio Financiero
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight mb-5">
            Soluciones para tu día a día
          </h2>
          <p className="mt-4 text-[17px] text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Productos diseñados sin letra chica. Obtén liquidez, haz crecer tus ahorros y gestiona tu dinero 100% online.
          </p>
        </motion.div>

        {/* Grid uniforme */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}
        </div>
        
        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-14 flex justify-center"
        >
           <Button href="/credito/solicitud" size="lg">
             Simular Crédito Ahora
           </Button>
        </motion.div>

      </div>
    </section>
  );
}
