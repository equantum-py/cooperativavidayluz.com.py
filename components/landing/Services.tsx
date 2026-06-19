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
    title: 'Créditos Personales',
    description: 'Aprobación rápida. Tasas altamente competitivas. Financiación flexible para consolidar deudas o impulsar tu negocio.',
  },
  {
    id: 'ahorro',
    icon: PiggyBank,
    title: 'Cajas de Ahorro',
    description: 'Rendimientos de hasta 8.4% anual. Sin costos de mantenimiento. Tu dinero crece mientras está disponible 24/7.',
  },
  {
    id: 'portal',
    icon: Smartphone,
    title: 'Portal Digital 24/7',
    description: 'Nuestra plataforma en tu navegador. Transfiere, paga cuotas y revisa tus extractos sin pisar una sucursal.',
  },
  {
    id: 'beneficios',
    icon: Gift,
    title: 'Beneficios Exclusivos',
    description: 'Descuentos de hasta 30% en supermercados, farmacias y comercios adheridos de todo el país.',
  },
  {
    id: 'solidaridad',
    icon: HeartHandshake,
    title: 'Subsidios Solidarios',
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
      transition={{ delay: index * 0.05, duration: 0.5 }}
      className="flex flex-col bg-white border border-[#E9E9E9] p-8 hover:border-[#006059] transition-colors duration-300"
    >
      {/* Icono */}
      <div className="mb-6">
        <Icon size={32} className="text-[#006059]" strokeWidth={1.5} />
      </div>

      {/* Texto */}
      <div className="flex-1">
        <h3 className="font-bold text-[20px] text-[#004C47] mb-3 leading-tight">
          {service.title}
        </h3>
        <p className="text-[15px] text-[#121212] opacity-80 leading-relaxed">
          {service.description}
        </p>
      </div>
      
      {/* Action link */}
      <div className="pt-6 mt-auto border-t border-transparent">
        <span className="text-[14px] font-bold text-[#006059] hover:text-[#004c47] cursor-pointer inline-flex items-center gap-1 group">
          Saber más <span className="transition-transform group-hover:translate-x-1">→</span>
        </span>
      </div>
    </motion.div>
  );
}

/* ─── Sección ───────────────────────────────────────────────────────── */

export default function Services() {
  return (
    <section id="servicios" className="py-24 px-6 bg-[#F9F9F9]">
      <div className="max-w-7xl mx-auto">

        {/* Encabezado */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <h2 className="text-[32px] md:text-[40px] font-bold text-[#004C47] tracking-tight leading-tight mb-4">
            Soluciones financieras para tu día a día
          </h2>
          <p className="text-[18px] text-[#121212] opacity-90 max-w-3xl leading-relaxed">
            Productos diseñados para tu bienestar. Obtén liquidez, haz crecer tus ahorros y gestiona tu dinero 100% online con total seguridad.
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
          className="mt-16 text-center"
        >
           <Button href="/credito/simulador" size="lg">
             Simular Crédito Ahora
           </Button>
        </motion.div>

      </div>
    </section>
  );
}
