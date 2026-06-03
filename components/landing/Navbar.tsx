'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { href: '#servicios', label: 'Servicios' },
  { href: '#como-funciona', label: 'Cómo funciona' },
  { href: '#portal', label: 'Portal' },
  { href: '#nosotros', label: 'Nosotros' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', handler, { passive: true });
    handler();
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-white/85 backdrop-blur-xl shadow-elevation-1 border-b border-black/[0.06]'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <a href="#inicio" className="flex items-center shrink-0">
          {/*
            The logo PNG has a white background.
            When the navbar is transparent (over the dark hero) we wrap it in a
            white pill so it stays legible. Once the user scrolls and the navbar
            turns white, the pill becomes invisible (bg-transparent / no padding)
            and the logo blends naturally into the page.
          */}
          <div
            className={`transition-all duration-500 ${
              scrolled
                ? 'bg-transparent rounded-xl px-0 py-0'
                : 'bg-white/95 rounded-xl px-3 py-1.5 shadow-sm'
            }`}
          >
            <Image
              src="/images/logo.png"
              alt="Cooperativa Vida & Luz"
              width={120}
              height={36}
              priority
              className="h-9 w-auto object-contain"
            />
          </div>
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-0.5">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`px-4 py-2 rounded-xl text-[13.5px] font-medium transition-all duration-200 ${
                scrolled
                  ? 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/80'
                  : 'text-white/65 hover:text-white hover:bg-white/10'
              }`}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Desktop CTAs */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="#portal"
            className={`text-[13.5px] font-medium transition-colors duration-200 ${
              scrolled ? 'text-gray-600 hover:text-gray-900' : 'text-white/60 hover:text-white'
            }`}
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
          className={`md:hidden p-2.5 rounded-xl transition-all ${
            scrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/10'
          }`}
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

      {/* Mobile dropdown */}
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
                  href="#portal"
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
