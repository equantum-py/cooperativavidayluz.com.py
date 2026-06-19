'use client';

import { motion } from 'framer-motion';
import { ShieldCheck, MapPin, Phone, Mail, Facebook, Instagram, Twitter } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { LOGO } from '@/lib/images';

const LINKS = {
  Servicios: [
    { label: 'Personas', href: '#servicios' },
    { label: 'Empresas', href: '#servicios-empresas' },
    { label: 'Beneficios', href: '#servicios' },
    { label: 'Portal Digital', href: '/login' },
  ],
  Institucional: [
    { label: 'Nuestra historia', href: '#nosotros' },
    { label: 'Autoridades', href: '#nosotros' },
    { label: 'Responsabilidad social', href: '#nosotros' },
    { label: 'Trabaja con nosotros', href: '#contacto' },
  ],
  Transparencia: [
    { label: 'Estatuto Social', href: '/documentos' },
    { label: 'Reglamentos', href: '/documentos' },
    { label: 'Balances y EEFF', href: '/documentos' },
    { label: 'Memorias anuales', href: '/documentos' },
  ],
  Soporte: [
    { label: 'Atención al socio', href: '#contacto' },
    { label: 'Preguntas frecuentes', href: '#contacto' },
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
    <footer className="bg-[#003B37] border-t border-[#002244]">
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Top grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 pb-12 border-b border-white/10">
          {/* Brand column */}
          <div className="lg:col-span-2">
            {/* Logo o Título institucional */}
            <div className="flex items-center gap-3 mb-6">
              <ShieldCheck size={32} className="text-[#00B0A6]" strokeWidth={1.5} />
              <div className="flex flex-col leading-none gap-1">
                <span className="font-bold text-[20px] text-white tracking-tight">
                  Vida &amp; Luz
                </span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-white/70 font-semibold">
                  Banca Cooperativa
                </span>
              </div>
            </div>

            <p className="text-white/80 text-[14px] leading-relaxed max-w-sm mb-8">
              Institución financiera cooperativa regulada por el INCOOP, impulsando a las
              familias y empresas de Paraguay desde 1994.
            </p>

            {/* Contact info */}
            <div className="space-y-3">
              {[
                { Icon: MapPin, text: 'Av. Mariscal López 1234, Asunción' },
                { Icon: Phone, text: '(021) 600-7000' },
                { Icon: Mail, text: 'info@vidaluz.com.py' },
              ].map(({ Icon, text }) => (
                <div key={text} className="flex items-center gap-3 text-white/90 text-[14px]">
                  <Icon size={16} className="text-[#00B0A6] flex-shrink-0" />
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
              <p className="text-white text-[15px] font-bold mb-5">{category}</p>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-white/70 hover:text-white text-[14px] transition-colors duration-200"
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
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-center sm:text-left">
            <p className="text-white/70 text-[13px] mb-1">
              © {new Date().getFullYear()} Cooperativa Vida &amp; Luz. Todos los derechos reservados.
            </p>
            <p className="text-white/50 text-[12px]">
              Entidad Regulada por INCOOP · RUC: 80001234-5 · Resolución N° 3456/94
            </p>
          </div>

          {/* Social + legal */}
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="flex items-center gap-4">
              {SOCIAL.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/5 hover:bg-[#00B0A6] flex items-center justify-center text-white transition-colors duration-200"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
            <div className="hidden sm:block w-px h-6 bg-white/20" />
            <div className="flex items-center gap-4">
              <Link href="/documentos" className="text-white/70 hover:text-white text-[13px] transition-colors">
                Privacidad
              </Link>
              <Link href="/documentos" className="text-white/70 hover:text-white text-[13px] transition-colors">
                Términos y Condiciones
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
