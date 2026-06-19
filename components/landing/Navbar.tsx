'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Lock } from 'lucide-react';
import { LOGO } from '@/lib/images';
import { Button } from '@/components/ui/Button';

const NAV_LINKS = [
  { href: '#servicios', label: 'Personas' },
  { href: '#servicios-empresas', label: 'Empresas' },
  { href: '#nosotros', label: 'Nuestra Institución' },
  { href: '/documentos', label: 'Transparencia' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-white border-b border-[#E9E9E9] shadow-sm">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

        {/* Logo */}
        <Link href="/" className="flex items-center shrink-0">
          <Image
            src={LOGO.src}
            alt={LOGO.alt}
            width={200}
            height={60}
            priority
            className="h-10 w-auto object-contain"
          />
        </Link>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-1 ml-8 mr-auto">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-4 py-2 text-[15px] font-medium text-[#121212] hover:text-[#006059] transition-colors duration-200 border-b-2 border-transparent hover:border-[#006059]"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop CTAs */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            href="/login"
            className="flex items-center gap-2 text-[15px] font-semibold text-[#006059] hover:text-[#004c47] transition-colors duration-200 px-2"
          >
            <Lock size={16} />
            Acceso Socios
          </Link>
          <Button href="/hazte-socio" size="sm" variant="default">
            Hazte socio
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 text-[#121212] hover:bg-[#F4F4F4] transition-colors rounded"
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
                <X size={24} />
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
                <Menu size={24} />
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
            className="md:hidden overflow-hidden bg-white border-b border-[#E9E9E9]"
          >
            <div className="px-5 py-6 flex flex-col gap-2">
              {NAV_LINKS.map((link, i) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="py-3 px-2 text-[16px] font-medium text-[#121212] hover:text-[#006059] transition-colors block border-b border-[#F4F4F4] last:border-0"
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
              <div className="mt-6 pt-6 border-t border-[#E9E9E9] flex flex-col gap-4">
                <Button href="/login" variant="outline" className="w-full">
                  <Lock size={16} className="mr-2" />
                  Acceso Socios
                </Button>
                <Button href="/hazte-socio" className="w-full">
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
