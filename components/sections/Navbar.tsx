'use client';

import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { navItems } from '@/lib/design-system/content';
import { motion } from '@/components/ui/Motion';
import { Logo } from '@/components/ui/Logo';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 py-4 sm:px-6">
      <nav
        className={`mx-auto flex max-w-7xl items-center justify-between rounded-full px-4 py-3 transition-all duration-500 sm:px-5 ${
          scrolled ? 'border border-white/70 bg-white/75 shadow-soft backdrop-blur-2xl' : 'bg-white/10'
        }`}
      >
        <Logo />
        <div className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="rounded-full px-4 py-2 text-sm font-semibold text-dark/70 transition hover:bg-primary/10 hover:text-primary">
              {item}
            </a>
          ))}
        </div>
        <div className="hidden items-center gap-3 lg:flex">
          <a href="#portal" className="text-sm font-semibold text-dark/70 hover:text-primary">Portal digital</a>
          <a href="#contacto" className="rounded-full bg-dark px-5 py-3 text-sm font-bold text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-primary">
            Hazte Socio
          </a>
        </div>
        <button onClick={() => setOpen(!open)} className="grid h-11 w-11 place-items-center rounded-full bg-white/70 lg:hidden" aria-label="Abrir menú">
          {open ? <X /> : <Menu />}
        </button>
      </nav>
      {open && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mx-auto mt-3 max-w-7xl rounded-3xl border border-white/70 bg-white/90 p-4 shadow-soft backdrop-blur-2xl lg:hidden">
          {navItems.map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setOpen(false)} className="block rounded-2xl px-4 py-3 font-semibold text-dark/75 hover:bg-primary/10">
              {item}
            </a>
          ))}
          <a href="#contacto" className="mt-2 block rounded-2xl bg-dark px-4 py-3 text-center font-bold text-white">Hazte Socio</a>
        </motion.div>
      )}
    </header>
  );
}
