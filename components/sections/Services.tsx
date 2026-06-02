'use client';

import type { LucideIcon } from 'lucide-react';
import { BadgeCheck, CircleDollarSign, GraduationCap, PieChart, Users, WalletCards } from 'lucide-react';
import { cardHover, fadeUp, stagger, viewportOnce } from '@/lib/design-system/motion';
import { motion } from '@/components/ui/Motion';
import { SectionHeader } from '@/components/ui/SectionHeader';

const services: Array<{ title: string; text: string; Icon: LucideIcon; span: string }> = [
  { title: 'Ahorro', text: 'Planes flexibles para construir tranquilidad con metas claras.', Icon: WalletCards, span: 'lg:col-span-2' },
  { title: 'Créditos', text: 'Financiación cercana para vivienda, educación, salud y emprendimientos.', Icon: CircleDollarSign, span: '' },
  { title: 'Beneficios', text: 'Convenios, descuentos y ventajas diseñadas para socios.', Icon: BadgeCheck, span: '' },
  { title: 'Educación', text: 'Programas de formación financiera para tomar mejores decisiones.', Icon: GraduationCap, span: '' },
  { title: 'Inversión', text: 'Herramientas responsables para hacer crecer el patrimonio común.', Icon: PieChart, span: '' },
  { title: 'Comunidad', text: 'Una red solidaria que impulsa proyectos con impacto local.', Icon: Users, span: 'lg:col-span-2' },
];

export function Services() {
  return (
    <section id="servicios" className="px-6 py-28 lg:px-8">
      <SectionHeader eyebrow="Servicios cooperativos" title="Soluciones con diseño fintech y corazón cooperativo." text="Un ecosistema integrado de ahorro, crédito y educación pensado para acompañar la vida real de nuestros socios." />
      <motion.div initial="hidden" whileInView="visible" viewport={viewportOnce} variants={stagger} className="mx-auto grid max-w-7xl auto-rows-[250px] gap-5 lg:grid-cols-4">
        {services.map(({ title, text, Icon, span }) => (
          <motion.article variants={fadeUp} whileHover={cardHover} key={title} className={`group perspective-1000 relative overflow-hidden rounded-[2rem] border border-dark/5 bg-white p-7 shadow-soft ${span}`}>
            <div className="absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100 bg-[radial-gradient(circle_at_30%_20%,rgba(34,197,94,.25),transparent_38%),linear-gradient(135deg,rgba(15,143,79,.08),transparent)]" />
            <div className="relative z-10 flex h-full flex-col justify-between">
              <div className="grid h-14 w-14 place-items-center rounded-2xl bg-primary/10 text-primary transition group-hover:scale-110 group-hover:bg-primary group-hover:text-white"><Icon className="h-6 w-6" /></div>
              <div><h3 className="font-display text-2xl font-bold tracking-[-0.03em]">{title}</h3><p className="mt-3 max-w-md leading-7 text-gray">{text}</p></div>
            </div>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
}
