'use client';

import { motion } from 'framer-motion';
import {
  CheckCircle2,
  Lock,
  Zap,
  Users,
  GraduationCap,
  MessageCircle,
  TrendingUp,
  ArrowRight,
} from 'lucide-react';

const BENEFITS = [
  {
    icon: Lock,
    title: 'Transparencia total',
    description: 'Sin letra chica, sin costos ocultos. Toda la información clara desde el primer día.',
  },
  {
    icon: Zap,
    title: 'Respuesta rápida',
    description: 'Aprobación de créditos en 24 horas hábiles. Procesos 100% digitales.',
  },
  {
    icon: Users,
    title: 'Comunidad real',
    description: 'Más de 15.000 socios creciendo juntos. Sos dueño de la cooperativa.',
  },
  {
    icon: GraduationCap,
    title: 'Educación gratuita',
    description: 'Talleres de finanzas personales, ahorro e inversión para todos los socios.',
  },
  {
    icon: MessageCircle,
    title: 'Atención cercana',
    description: 'Asesoramiento personalizado, en persona o digital. Sin call centers.',
  },
] as const;

export default function Benefits() {
  return (
    <section className="py-24 px-6 bg-emerald-50/40 overflow-hidden" id="nosotros">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left — text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-[12px] font-bold text-emerald-600 uppercase tracking-[0.2em] mb-3">
              Por qué elegirnos
            </p>
            <h2 className="heading-lg text-gray-900 text-balance mb-5">
              Pensado para tu realidad,
              <br /> no para las estadísticas
            </h2>
            <p className="text-[17px] text-gray-500 leading-relaxed mb-10">
              No somos un banco. Somos una comunidad donde cada socio importa, cada decisión
              se toma en conjunto y cada beneficio vuelve a las personas.
            </p>

            <div className="space-y-5">
              {BENEFITS.map((benefit, i) => {
                const Icon = benefit.icon;
                return (
                  <motion.div
                    key={benefit.title}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.09, duration: 0.45 }}
                    className="flex items-start gap-4"
                  >
                    <div className="w-10 h-10 rounded-xl bg-white border border-emerald-100 flex items-center justify-center flex-shrink-0 shadow-elevation-1">
                      <Icon size={18} className="text-emerald-600" strokeWidth={1.75} />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 mb-0.5">{benefit.title}</p>
                      <p className="text-[14px] text-gray-500 leading-relaxed">
                        {benefit.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <motion.a
              href="#contacto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.55 }}
              className="mt-10 inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-semibold text-[15px] group"
            >
              Ver todos los beneficios
              <ArrowRight
                size={15}
                className="transition-transform group-hover:translate-x-1"
              />
            </motion.a>
          </motion.div>

          {/* Right — visual card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            {/* Main feature card */}
            <div className="relative bg-void-2 rounded-4xl p-8 shadow-elevation-3 overflow-hidden">
              {/* Aurora */}
              <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-emerald-500/10 blur-[80px] pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-emerald-700/8 blur-[60px] pointer-events-none" />

              <div className="relative z-10">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <p className="text-white/40 text-[11px] uppercase tracking-widest mb-1">
                      Tu rendimiento
                    </p>
                    <p className="text-white text-3xl font-bold tracking-tight">+8.4%</p>
                    <p className="text-emerald-400 text-[13px] font-medium mt-1">
                      Tasa anual promedio 2024
                    </p>
                  </div>
                  <div className="w-14 h-14 rounded-2xl bg-emerald-500/12 border border-emerald-500/20 flex items-center justify-center">
                    <TrendingUp size={24} className="text-emerald-400" strokeWidth={1.75} />
                  </div>
                </div>

                {/* Progress bars */}
                <div className="space-y-4 mb-8">
                  {[
                    { label: 'Rendimiento anual', pct: 84 },
                    { label: 'Satisfacción socios', pct: 98 },
                    { label: 'Créditos aprobados', pct: 91 },
                  ].map((item) => (
                    <div key={item.label}>
                      <div className="flex justify-between mb-1.5">
                        <span className="text-white/55 text-[12px]">{item.label}</span>
                        <span className="text-white/80 text-[12px] font-semibold">
                          {item.pct}%
                        </span>
                      </div>
                      <div className="h-1.5 bg-white/8 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${item.pct}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }}
                          className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-emerald-400"
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Check list */}
                <div className="space-y-2.5">
                  {[
                    'Regulada y auditada anualmente',
                    'Fondo de garantía de depósitos',
                    'Asambleas anuales con socios',
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-2.5">
                      <CheckCircle2 size={16} className="text-emerald-400 flex-shrink-0" />
                      <span className="text-white/65 text-[13px]">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, type: 'spring', stiffness: 180 }}
              className="absolute -bottom-4 -left-6 bg-white rounded-2xl p-4 shadow-card-hover border border-gray-100 flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center">
                <CheckCircle2 size={20} className="text-emerald-600" />
              </div>
              <div>
                <p className="text-gray-900 text-[13px] font-bold leading-tight">INCOOP Regulada</p>
                <p className="text-gray-400 text-[11px]">Institución verificada</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
