'use client';

import { motion } from 'framer-motion';
import { UserPlus, LayoutDashboard, TrendingUp, ArrowRight } from 'lucide-react';

const STEPS = [
  {
    number: '01',
    icon: UserPlus,
    title: 'Regístrate gratis',
    description:
      'Completa el formulario en línea en menos de 5 minutos. Solo necesitas tu cédula de identidad y datos básicos.',
    detail: 'Sin costo de apertura',
  },
  {
    number: '02',
    icon: LayoutDashboard,
    title: 'Elige tu plan',
    description:
      'Selecciona los servicios que necesitás: ahorro, crédito o ambos. Nuestros asesores te guían sin compromiso.',
    detail: 'Asesoría personalizada',
  },
  {
    number: '03',
    icon: TrendingUp,
    title: 'Empieza a crecer',
    description:
      'Accedé inmediatamente a todos los beneficios: portal digital, descuentos, talleres y más. Tu futuro empieza hoy.',
    detail: 'Acceso inmediato',
  },
] as const;

export default function HowItWorks() {
  return (
    <section id="como-funciona" className="py-24 px-6 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="text-center mb-16"
        >
          <p className="text-[12px] font-bold text-emerald-600 uppercase tracking-[0.2em] mb-3">
            Cómo funciona
          </p>
          <h2 className="heading-lg text-gray-900 text-balance">
            Tres pasos para empezar
          </h2>
          <p className="mt-4 text-[17px] text-gray-500 max-w-lg mx-auto leading-relaxed">
            Sin burocracia, sin letra chica. Sumarte a Vida &amp; Luz es simple y gratuito.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-6 relative">
          {/* Connecting line (desktop) */}
          <div className="hidden md:block absolute top-[3.25rem] left-[calc(16.66%+2rem)] right-[calc(16.66%+2rem)] h-px">
            <div className="w-full h-full bg-gradient-to-r from-emerald-200 via-emerald-300 to-emerald-200" />
            {/* Dots on line */}
            <div className="absolute left-1/4 -top-1 w-2 h-2 rounded-full bg-emerald-400" />
            <div className="absolute right-1/4 -top-1 w-2 h-2 rounded-full bg-emerald-400" />
          </div>

          {STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.14, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="group relative flex flex-col items-center text-center"
              >
                {/* Step indicator */}
                <div className="relative mb-6">
                  {/* Outer ring */}
                  <div className="w-16 h-16 rounded-2xl bg-emerald-50 border-2 border-emerald-100 group-hover:border-emerald-400 group-hover:bg-emerald-500 transition-all duration-300 flex items-center justify-center shadow-sm group-hover:shadow-glow-sm">
                    <Icon
                      size={26}
                      strokeWidth={1.75}
                      className="text-emerald-600 group-hover:text-white transition-colors duration-300"
                    />
                  </div>
                  {/* Step number badge */}
                  <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-emerald-600 text-white text-[10px] font-bold flex items-center justify-center shadow-sm">
                    {i + 1}
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-[18px] font-bold text-gray-900 mb-2.5">{step.title}</h3>
                <p className="text-[14.5px] text-gray-500 leading-relaxed mb-4">
                  {step.description}
                </p>

                {/* Detail badge */}
                <span className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-100 px-3 py-1.5 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  {step.detail}
                </span>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-14 text-center"
        >
          <a
            href="/hazte-socio"
            className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-7 py-3.5 rounded-2xl text-[15px] font-semibold transition-all shadow-sm hover:shadow-glow-sm hover:-translate-y-0.5 group"
          >
            Comenzar ahora — gratis
            <ArrowRight
              size={15}
              className="transition-transform group-hover:translate-x-0.5"
            />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
