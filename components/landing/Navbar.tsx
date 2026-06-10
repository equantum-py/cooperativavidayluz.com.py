'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { LOGO } from '@/lib/images';

const NAV_LINKS = [
  { href: '#servicios', label: 'Servicios' },
  { href: '#como-funciona', label: 'Cómo funciona' },
  { href: '/login', label: 'Portal' },
  { href: '#nosotros', label: 'Nosotros' },
  { href: '/documentos', label: 'Documentos' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

        {/* Logo — sits directly on the white navbar, no extra wrapper needed */}
        <a href="#inicio" className="flex items-center shrink-0">
          <Image
            src={LOGO.src}
            alt={LOGO.alt}
            width={200}
            height={60}
            priority
            className="h-14 w-auto object-contain"
          />
        </a>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-0.5">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-4 py-2 rounded-xl text-[13.5px] font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100/80 transition-all duration-200"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Desktop CTAs */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="/login"
            className="text-[13.5px] font-medium text-gray-600 hover:text-gray-900 transition-colors duration-200"
          >
            Iniciar sesión
          </a>
          <a
            href="#contacto"
            className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-2.5 rounded-xl text-[13.5px] font-semibold transition-all shadow-sm hover:shadow-glow-sm hover:-translate-y-px active:translate-y-0"
          >
            Hazte socio
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2.5 rounded-xl text-gray-700 hover:bg-gray-100 transition-all"
          onClick={() => setOpen((v) => !v)}
          aria-label="Abrir menú"
        >
          <AnimatePresence mode="wait" initial={false}>
            {open ? (
              <motion.span
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="block"
              >
                <X size={20} />
              </motion.span>
            ) : (
              <motion.span
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="block"
              >
                <Menu size={20} />
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </nav>

      {/* Mobile dropdown — structure and animations unchanged */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden overflow-hidden bg-white border-b border-gray-100"
          >
            <div className="px-5 py-4 flex flex-col gap-1">
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.2 }}
                  onClick={() => setOpen(false)}
                  className="py-2.5 px-3 rounded-xl text-[15px] font-medium text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 transition-all"
                >
                  {link.label}
                </motion.a>
              ))}
              <div className="mt-3 pt-3 border-t border-gray-100 flex flex-col gap-2.5">
                <a
                  href="/login"
                  className="py-2.5 text-center text-[15px] font-medium text-gray-600"
                >
                  Iniciar sesión
                </a>
                <a
                  href="#contacto"
                  className="py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-[15px] font-semibold text-center transition-colors"
                >
                  Hazte socio
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
