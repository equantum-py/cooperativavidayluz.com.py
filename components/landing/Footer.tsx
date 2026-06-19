'use client';

import { motion } from 'framer-motion';
import { Sparkles, MapPin, Phone, Mail, Facebook, Instagram, Twitter } from 'lucide-react';
import Link from 'next/link';

const LINKS = {
  Servicios: [
    { label: 'Ahorro', href: '#servicios' },
    { label: 'Créditos', href: '#servicios' },
    { label: 'Beneficios', href: '#servicios' },
    { label: 'Seguros', href: '#servicios' },
    { label: 'Portal Digital', href: '/login' },
  ],
  Empresa: [
    { label: 'Nuestra historia', href: '#nosotros' },
    { label: 'Cómo funciona', href: '#como-funciona' },
    { label: 'Asamblea anual', href: '/documentos' },
    { label: 'Responsabilidad social', href: '#nosotros' },
    { label: 'Trabaja con nosotros', href: '#contacto' },
  ],
  Documentos: [
    { label: 'Estatutos', href: '/documentos' },
    { label: 'Reglamentos', href: '/documentos' },
    { label: 'Balances y EEFF', href: '/documentos' },
    { label: 'Memorias anuales', href: '/documentos' },
    { label: 'Ver todos', href: '/documentos' },
  ],
  Soporte: [
    { label: 'Centro de ayuda', href: '#contacto' },
    { label: 'Preguntas frecuentes', href: '#contacto' },
    { label: 'Contacto', href: '#contacto' },
    { label: 'Sucursales', href: '#contacto' },
    { label: 'Simulador de crédito', href: '/credito/solicitud' },
  ],
} as const;

const SOCIAL = [
  { Icon: Facebook, href: 'https://facebook.com/coopvidayluz', label: 'Facebook' },
  { Icon: Instagram, href: 'https://instagram.com/coopvidayluz', label: 'Instagram' },
  { Icon: Twitter, href: 'https://twitter.com/coopvidayluz', label: 'Twitter/X' },
] as const;

export default function Footer() {
  return (
    <footer className="bg-void-2 border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Top grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 pb-12 border-b border-white/[0.07]">
          {/* Brand column */}
          <div className="lg:col-span-2">
            {/* Logo */}
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center shadow-glow-sm">
                <Sparkles size={15} className="text-white" strokeWidth={2} />
              </div>
              <div className="flex flex-col leading-none gap-0.5">
                <span className="font-bold text-[15px] text-white tracking-tight">
                  Vida &amp; Luz
                </span>
                <span className="text-[9px] uppercase tracking-[0.18em] text-emerald-400 font-bold">
                  Banca Cooperativa
                </span>
              </div>
            </div>

            <p className="text-white/68 text-[14px] leading-relaxed max-w-xs mb-7">
              Institución financiera cooperativa regulada por INCOOP, al servicio de las
              familias y emprendedores de Paraguay desde 1994.
            </p>

            {/* Contact info */}
            <div className="space-y-2.5">
              {[
                { Icon: MapPin, text: 'Av. Mariscal López 1234, Asunción' },
                { Icon: Phone, text: '(021) 600-7000' },
                { Icon: Mail, text: 'info@vidaluz.com.py' },
              ].map(({ Icon, text }) => (
                <div key={text} className="flex items-center gap-2.5 text-white/65 text-[13px]">
                  <Icon size={13} className="text-emerald-500/70 flex-shrink-0" />
                  {text}
                </div>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(LINKS).map(([category, links], colIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: colIndex * 0.1, duration: 0.45 }}
            >
              <p className="text-white text-[13px] font-bold mb-4 tracking-wide">{category}</p>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-white/60 hover:text-white/95 text-[13px] transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-7 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <p className="text-white/55 text-[12px]">
              © {new Date().getFullYear()} Cooperativa Vida &amp; Luz. Todos los derechos reservados.
            </p>
            <p className="text-white/42 text-[11px] mt-1">
              Regulada por INCOOP · RUC: 80001234-5 · Resolución INCOOP N° 3456/94
            </p>
          </div>

          {/* Social + legal */}
          <div className="flex items-center gap-4">
            {SOCIAL.map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-white/[0.07] hover:bg-white/[0.14] flex items-center justify-center text-white/40 hover:text-white transition-all duration-200"
              >
                <Icon size={14} />
              </a>
            ))}
            <div className="w-px h-5 bg-white/[0.1]" />
            <Link href="/documentos" className="text-white/52 hover:text-white/80 text-[12px] transition-colors">
              Privacidad
            </Link>
            <Link href="/documentos" className="text-white/52 hover:text-white/80 text-[12px] transition-colors">
              Términos
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
