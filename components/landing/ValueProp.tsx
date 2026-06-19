'use client';

import { motion } from 'framer-motion';
import { CreditCard, PiggyBank, HeartHandshake } from 'lucide-react';
import { Button } from '@/components/ui/Button';

const CARDS = [
  {
    icon: CreditCard,
    title: 'Créditos a tu medida',
    text: 'Financiación ágil con aprobación rápida. Tasas altamente competitivas para potenciar tus proyectos personales y comerciales.',
  },
  {
    icon: PiggyBank,
    title: 'Ahorro inteligente',
    text: 'Haz crecer tu capital de forma segura. Cajas de ahorro y depósitos a plazo fijo con excelentes rendimientos anuales.',
  },
  {
    icon: HeartHandshake,
    title: 'Solidaridad Cooperativa',
    text: 'Servicios de protección y asistencia para ti y tu familia, respaldando tu tranquilidad en cada etapa de la vida.',
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
              Institución Sólida
            </motion.span>

            {/* Título */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08, duration: 0.55 }}
              className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight mb-6"
            >
              El respaldo financiero que necesitas, evolucionado.
            </motion.h2>

            {/* Texto institucional */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.16, duration: 0.55 }}
              className="space-y-4 text-[16px] text-gray-600 leading-relaxed"
            >
              <p>
                Olvídate de la burocracia tradicional. En Vida &amp; Luz combinamos 
                la solidez de más de 20 años de trayectoria con la agilidad de la banca digital.
              </p>
              <p>
                Como socio, accedes a un ecosistema de productos financieros diseñados
                para impulsar tu economía, con total transparencia y el apoyo de una comunidad real.
              </p>
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.28, duration: 0.5 }}
              className="mt-8 flex items-center gap-4"
            >
              <Button href="#registro" size="default">
                Asóciate ahora
              </Button>
              <Button href="#servicios" variant="ghost">
                Explorar productos
              </Button>
            </motion.div>
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
                className="group flex items-start gap-5 bg-white border border-gray-100 rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-all duration-300 hover:border-emerald-100"
              >
                {/* Icono */}
                <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-600 group-hover:border-emerald-600 transition-colors duration-300">
                  <Icon
                    size={24}
                    strokeWidth={1.75}
                    className="text-emerald-600 group-hover:text-white transition-colors duration-300"
                  />
                </div>

                {/* Texto */}
                <div className="min-w-0 flex-1">
                  <h3 className="font-bold text-[17px] text-gray-900 mb-1.5 leading-tight">
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
