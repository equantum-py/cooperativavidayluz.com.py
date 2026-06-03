'use client';

import { motion } from 'framer-motion';
import { CreditCard, PiggyBank, HeartHandshake } from 'lucide-react';

const CARDS = [
  {
    icon: CreditCard,
    title: 'Créditos y financiamiento',
    text: 'Soluciones para proyectos personales, familiares y profesionales con tasas accesibles y aprobación ágil.',
  },
  {
    icon: PiggyBank,
    title: 'Ahorro y crecimiento',
    text: 'Herramientas financieras para construir tu futuro con seguridad y rendimientos competitivos.',
  },
  {
    icon: HeartHandshake,
    title: 'Solidaridad y comunidad',
    text: 'Actividades sociales, educativas y culturales que fomentan el bienestar de los socios y la comunidad.',
  },
] as const;

export default function ValueProp() {
  return (
    <section className="bg-white py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-14 xl:gap-20 items-center">

          {/* ── Columna izquierda ── */}
          <div>
            {/* Badge */}
            <motion.span
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 text-[12px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-100 px-3.5 py-1.5 rounded-full uppercase tracking-[0.16em] mb-5"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Beneficios para socios
            </motion.span>

            {/* Título */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08, duration: 0.55 }}
              className="heading-lg text-gray-900 text-balance mb-6"
            >
              Por qué te conviene ser socio de Cooperativa Vida &amp; Luz
            </motion.h2>

            {/* Texto institucional */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.16, duration: 0.55 }}
              className="space-y-4 text-[16.5px] text-gray-500 leading-relaxed"
            >
              <p>
                Podés acceder a innumerables beneficios. Como cooperativa, nuestro objetivo
                principal es acompañar a nuestros socios en cada etapa de su vida.
              </p>
              <p>
                Diseñamos productos financieros como créditos, ahorros y tarjetas de crédito,
                que te ayudarán a cumplir objetivos personales y profesionales.
              </p>
              <p>
                Basados en nuestros principios y valores cooperativos, también brindamos
                servicios de solidaridad y desarrollamos actividades sociales, culturales y
                educativas que fomentan el bienestar socioeconómico de los socios y la
                comunidad.
              </p>
            </motion.div>

            {/* CTA secundario */}
            <motion.a
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.28, duration: 0.5 }}
              href="#servicios"
              className="mt-8 inline-flex items-center gap-2 text-emerald-700 hover:text-emerald-600 font-semibold text-[15px] group"
            >
              Ver todos los servicios
              <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
            </motion.a>
          </div>

          {/* ── Columna derecha: tarjetas ── */}
          <div className="flex flex-col gap-4">
            {CARDS.map(({ icon: Icon, title, text }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                whileHover={{ y: -3, transition: { type: 'spring', stiffness: 300, damping: 22 } }}
                className="group flex items-start gap-5 bg-white border border-gray-100 rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-shadow duration-300"
              >
                {/* Icono */}
                <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-600 group-hover:border-emerald-600 transition-colors duration-300">
                  <Icon
                    size={22}
                    strokeWidth={1.75}
                    className="text-emerald-600 group-hover:text-white transition-colors duration-300"
                  />
                </div>

                {/* Texto */}
                <div className="min-w-0">
                  <h3 className="font-bold text-[16px] text-gray-900 mb-1.5 leading-tight">
                    {title}
                  </h3>
                  <p className="text-[14px] text-gray-500 leading-relaxed">{text}</p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
