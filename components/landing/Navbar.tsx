'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ShieldCheck } from 'lucide-react';
import { LOGO } from '@/lib/images';
import { Button } from '@/components/ui/Button';

const NAV_LINKS = [
  { href: '#servicios', label: 'Servicios' },
  { href: '#como-funciona', label: 'Cómo funciona' },
  { href: '#nosotros', label: 'Nosotros' },
  { href: '/documentos', label: 'Documentos' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

        {/* Logo */}
        <Link href="/" className="flex items-center shrink-0">
          <Image
            src={LOGO.src}
            alt={LOGO.alt}
            width={200}
            height={60}
            priority
            className="h-14 w-auto object-contain"
          />
        </Link>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-0.5 ml-8 mr-auto">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-4 py-2 rounded-xl text-[14px] font-medium text-gray-600 hover:text-emerald-700 hover:bg-emerald-50/50 transition-all duration-200"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop CTAs */}
        <div className="hidden md:flex items-center gap-4">
          <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-xs font-semibold mr-2 border border-emerald-100">
            <ShieldCheck size={14} className="text-emerald-600" />
            <span>Portal Seguro</span>
          </div>
          <Link
            href="/login"
            className="text-[14px] font-semibold text-emerald-700 hover:text-emerald-800 transition-colors duration-200"
          >
            Acceso Socios
          </Link>
          <Button href="#registro" size="sm" variant="default">
            Hazte socio
          </Button>
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
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="py-2.5 px-3 rounded-xl text-[15px] font-medium text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 transition-all block"
                >
                  <motion.div
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.2 }}
                  >
                    {link.label}
                  </motion.div>
                </Link>
              ))}
              <div className="mt-4 pt-4 border-t border-gray-100 flex flex-col gap-3">
                <Button href="/login" variant="outline" className="w-full">
                  Acceso Socios
                </Button>
                <Button href="#registro" className="w-full">
                  Hazte socio
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
