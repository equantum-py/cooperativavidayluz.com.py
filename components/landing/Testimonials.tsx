'use client';

import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  city: string;
  initials: string;
  color: string;
  years: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      'Gracias a Vida & Luz pude abrir mi pequeño negocio de confecciones. El proceso fue rápido, sin trabas y con tasas que pude pagar. Hoy tengo tres empleados.',
    name: 'María García',
    role: 'Emprendedora textil',
    city: 'Asunción',
    initials: 'MG',
    color: 'from-emerald-600 to-emerald-800',
    years: 'Socia desde 2018',
  },
  {
    quote:
      'Los rendimientos de mi ahorro son los mejores que encontré en el mercado paraguayo. Pero más que eso, siento que mi plata trabaja dentro de mi propia comunidad.',
    name: 'Carlos Mendoza',
    role: 'Docente universitario',
    city: 'Lambaré',
    initials: 'CM',
    color: 'from-emerald-700 to-emerald-900',
    years: 'Socio desde 2015',
  },
  {
    quote:
      'El portal digital cambió todo. Antes tenía que ir a la oficina para cualquier trámite. Ahora hago todo desde el teléfono y recibo notificaciones al instante.',
    name: 'Ana Flores',
    role: 'Contadora',
    city: 'Fernando de la Mora',
    initials: 'AF',
    color: 'from-emerald-500 to-emerald-700',
    years: 'Socia desde 2020',
  },
];

function Stars({ count = 5 }: { count?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} size={13} className="text-[#bfd200] fill-[#bfd200]" />
      ))}
    </div>
  );
}

function TestimonialCard({
  testimonial,
  index,
}: {
  testimonial: Testimonial;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.12, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4, transition: { type: 'spring', stiffness: 280, damping: 22 } }}
      className="group flex flex-col bg-white rounded-3xl p-7 border border-gray-100 shadow-card hover:shadow-card-hover transition-all duration-300"
    >
      {/* Quote icon */}
      <div className="mb-5 flex items-center justify-between">
        <Stars />
        <div className="w-8 h-8 rounded-xl bg-emerald-50 flex items-center justify-center">
          <Quote size={14} className="text-emerald-500" strokeWidth={2} />
        </div>
      </div>

      {/* Quote text */}
      <p className="text-[15px] text-gray-600 leading-relaxed flex-1 mb-6">
        &ldquo;{testimonial.quote}&rdquo;
      </p>

      {/* Author */}
      <div className="flex items-center gap-3 pt-5 border-t border-gray-100">
        <div
          className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${testimonial.color} flex items-center justify-center text-white text-[13px] font-bold flex-shrink-0 shadow-sm`}
        >
          {testimonial.initials}
        </div>
        <div className="min-w-0">
          <p className="font-semibold text-gray-900 text-[14px] leading-tight">
            {testimonial.name}
          </p>
          <p className="text-gray-400 text-[12px] mt-0.5 truncate">
            {testimonial.role} · {testimonial.city}
          </p>
        </div>
        <span className="ml-auto flex-shrink-0 text-[11px] font-medium text-emerald-600 bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded-full">
          {testimonial.years}
        </span>
      </div>
    </motion.div>
  );
}

export default function Testimonials() {
  return (
    <section className="py-24 px-6 bg-gray-50/50">
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
            Testimonios
          </p>
          <h2 className="heading-lg text-gray-900 text-balance">
            Lo que dicen nuestros socios
          </h2>
          <p className="mt-4 text-[17px] text-gray-500 max-w-lg mx-auto leading-relaxed">
            Más de 15.000 historias reales de crecimiento económico y confianza.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5">
          {TESTIMONIALS.map((t, i) => (
            <TestimonialCard key={t.name} testimonial={t} index={i} />
          ))}
        </div>

        {/* Social proof aggregate */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          {/* Avatars */}
          <div className="flex -space-x-2.5">
            {[
              'from-emerald-600 to-emerald-800',
              'from-emerald-700 to-emerald-900',
              'from-emerald-500 to-emerald-700',
              'from-emerald-600 to-emerald-800',
              'from-emerald-500 to-emerald-700',
            ].map((gradient, i) => (
              <div
                key={i}
                className={`w-9 h-9 rounded-full bg-gradient-to-br ${gradient} border-2 border-white shadow-sm`}
              />
            ))}
          </div>
          <div className="text-center sm:text-left">
            <div className="flex items-center gap-1.5 justify-center sm:justify-start mb-1">
              <Stars />
              <span className="text-[13px] font-semibold text-gray-900">4.9/5</span>
            </div>
            <p className="text-[13px] text-gray-500">
              Basado en más de <strong className="text-gray-700">2.400 opiniones</strong> verificadas
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
