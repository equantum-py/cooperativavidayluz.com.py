'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Clock, ArrowRight } from 'lucide-react';

/* ─── Tipos ─────────────────────────────────────────────────────────── */

type FeaturedArticle = {
  category: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  href: string;
};

type NewsItem = {
  id: string;
  category: string;
  title: string;
  date: string;
  href: string;
};

/* ─── Datos mock ─────────────────────────────────────────────────────── */

const FEATURED: FeaturedArticle = {
  category: 'Institucional',
  title:
    'Asamblea General Ordinaria 2025: socios aprueban plan estratégico y eligen nuevas autoridades',
  excerpt:
    'Con la participación de más de 1.200 socios delegados, la cooperativa celebró su asamblea anual donde se aprobaron los estados financieros del ejercicio 2024, el presupuesto para el nuevo período y se renovaron parcialmente las autoridades del Consejo de Administración.',
  date: '15 de mayo de 2025',
  readTime: '5 min',
  href: '#',
};

const NEWS_ITEMS: NewsItem[] = [
  {
    id: '1',
    category: 'Finanzas',
    title: 'Tasa especial del 9% TNA para ahorro a plazo fijo durante junio y julio',
    date: '10 may 2025',
    href: '#',
  },
  {
    id: '2',
    category: 'Convenios',
    title: 'Nuevo convenio con Clínica Central: descuentos en consultas y estudios para socios',
    date: '3 may 2025',
    href: '#',
  },
  {
    id: '3',
    category: 'Educación',
    title: 'Programa de educación financiera alcanza a 500 familias del Gran Asunción',
    date: '25 abr 2025',
    href: '#',
  },
  {
    id: '4',
    category: 'Infraestructura',
    title: 'Apertura de nueva oficina de atención al socio en el distrito de San Lorenzo',
    date: '18 abr 2025',
    href: '#',
  },
  {
    id: '5',
    category: 'Regulatorio',
    title: 'INCOOP certifica a Vida & Luz entre las cooperativas financieras más sólidas del país',
    date: '7 abr 2025',
    href: '#',
  },
];

/* ─── Imagen de la noticia destacada ─────────────────────────────────── */

function FeaturedImage({ category, title }: { category: string; title: string }) {
  return (
    <div className="relative w-full aspect-video rounded-xl overflow-hidden">
      {/* Fotografía real */}
      <Image
        src="/images/news/news-1.jpeg"
        alt={title}
        fill
        priority
        sizes="(max-width: 1024px) 100vw, 60vw"
        className="object-cover object-center"
      />

      {/* Overlay — degradado suave de abajo hacia arriba */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent"
        aria-hidden="true"
      />

      {/* Category badge — bottom-left, encima del overlay */}
      <div className="absolute bottom-4 left-4 z-10">
        <span className="inline-block bg-white/90 backdrop-blur-sm text-emerald-700 text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md shadow-sm">
          {category}
        </span>
      </div>
    </div>
  );
}

/* ─── Componente ─────────────────────────────────────────────────────── */

export default function News() {
  return (
    <section id="noticias" className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">

        {/* ── Encabezado de sección ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12 pb-6 border-b border-gray-100"
        >
          <div>
            <p className="text-[12px] font-bold text-emerald-600 uppercase tracking-[0.2em] mb-2">
              Noticias
            </p>
            <h2 className="heading-lg text-gray-900 leading-tight">
              Novedades institucionales
            </h2>
          </div>
          <a
            href="#"
            className="inline-flex items-center gap-1.5 text-[14px] font-medium text-emerald-600 hover:text-emerald-700 transition-colors whitespace-nowrap group"
          >
            Ver todas las noticias
            <ArrowRight
              size={14}
              className="transition-transform duration-200 group-hover:translate-x-0.5"
            />
          </a>
        </motion.div>

        {/* ── Grid: destacada + lista ── */}
        <div className="grid lg:grid-cols-[1fr_400px] gap-10 xl:gap-14">

          {/* Noticia destacada */}
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <a href={FEATURED.href} className="group block">
              {/* Imagen */}
              <FeaturedImage category={FEATURED.category} title={FEATURED.title} />

              {/* Meta */}
              <div className="flex items-center gap-3 mt-5 mb-3">
                <span className="text-[11px] font-bold text-emerald-600 uppercase tracking-wider">
                  {FEATURED.category}
                </span>
                <span className="w-1 h-1 rounded-full bg-gray-300" />
                <span className="text-[13px] text-gray-400">{FEATURED.date}</span>
                <span className="w-1 h-1 rounded-full bg-gray-300" />
                <span className="inline-flex items-center gap-1 text-[13px] text-gray-400">
                  <Clock size={11} />
                  {FEATURED.readTime} lectura
                </span>
              </div>

              {/* Título */}
              <h3 className="text-[22px] md:text-[24px] font-bold text-gray-900 leading-snug group-hover:text-emerald-700 transition-colors duration-200 text-balance">
                {FEATURED.title}
              </h3>

              {/* Excerpt */}
              <p className="mt-3 text-[15px] text-gray-500 leading-relaxed line-clamp-3">
                {FEATURED.excerpt}
              </p>

              {/* Leer más */}
              <span className="inline-flex items-center gap-1.5 mt-4 text-[13.5px] font-semibold text-emerald-600 group-hover:text-emerald-700 transition-colors">
                Leer nota completa
                <ArrowRight
                  size={13}
                  className="transition-transform duration-200 group-hover:translate-x-0.5"
                />
              </span>
            </a>
          </motion.article>

          {/* Lista de noticias recientes */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="flex flex-col divide-y divide-gray-100"
          >
            {NEWS_ITEMS.map((item, i) => (
              <motion.article
                key={item.id}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 + i * 0.06, duration: 0.4 }}
                className="py-5 first:pt-0 last:pb-0 group"
              >
                <a href={item.href} className="block">
                  {/* Categoría + fecha */}
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[11px] font-bold text-emerald-600 uppercase tracking-wider">
                      {item.category}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-gray-300 flex-shrink-0" />
                    <span className="text-[12px] text-gray-400">{item.date}</span>
                  </div>

                  {/* Título compacto */}
                  <h3 className="text-[14.5px] font-medium text-gray-800 leading-snug group-hover:text-emerald-700 transition-colors duration-150 line-clamp-2">
                    {item.title}
                  </h3>
                </a>
              </motion.article>
            ))}

            {/* Footer de la lista */}
            <div className="pt-5">
              <a
                href="#"
                className="inline-flex items-center gap-1.5 text-[13px] font-medium text-gray-400 hover:text-emerald-600 transition-colors group"
              >
                Ver archivo de noticias
                <ArrowRight
                  size={12}
                  className="transition-transform duration-200 group-hover:translate-x-0.5"
                />
              </a>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
