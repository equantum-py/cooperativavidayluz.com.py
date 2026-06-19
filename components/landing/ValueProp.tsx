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
    <section id="nosotros" className="bg-white py-24 md:py-32 px-6 border-b border-[#E9E9E9]">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 xl:gap-24 items-start">

          {/* ── Columna izquierda ── */}
          <div className="sticky top-32">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-[32px] md:text-[40px] font-bold text-[#004C47] leading-[1.2] tracking-tight mb-6"
            >
              El respaldo financiero que necesitas, evolucionado.
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="space-y-5 text-[16px] text-[#121212] leading-relaxed opacity-90"
            >
              <p>
                Olvídate de la burocracia tradicional. En Vida &amp; Luz combinamos 
                la solidez de más de 20 años de trayectoria con la comodidad de la banca digital actual.
              </p>
              <p>
                Como socio, accedes a un ecosistema de productos financieros diseñados
                para impulsar tu economía, con total transparencia y el apoyo de una comunidad real y tangible.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="mt-10 flex flex-col sm:flex-row items-center gap-4"
            >
              <Button href="/login" size="default" className="w-full sm:w-auto">
                Hazte socio
              </Button>
              <Button href="#servicios" variant="outline" className="w-full sm:w-auto">
                Conoce más
              </Button>
            </motion.div>
          </div>

          {/* ── Columna derecha: tarjetas ── */}
          <div className="flex flex-col gap-6">
            {CARDS.map(({ icon: Icon, title, text }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="group flex flex-col sm:flex-row items-start sm:items-center gap-6 bg-white border border-[#E9E9E9] rounded-xl p-8 transition-colors duration-300 hover:border-[#006059]"
              >
                {/* Icono */}
                <div className="w-14 h-14 rounded-full bg-[#F4F8F8] flex items-center justify-center flex-shrink-0 group-hover:bg-[#006059] transition-colors duration-300">
                  <Icon
                    size={24}
                    strokeWidth={1.5}
                    className="text-[#006059] group-hover:text-white transition-colors duration-300"
                  />
                </div>

                {/* Texto */}
                <div className="min-w-0 flex-1">
                  <h3 className="font-bold text-[18px] text-[#004C47] mb-2 leading-tight">
                    {title}
                  </h3>
                  <p className="text-[15px] text-[#121212] opacity-80 leading-relaxed">{text}</p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
