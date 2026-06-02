'use client';

import { useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  CircleDollarSign,
  FileText,
  Globe2,
  GraduationCap,
  HandHeart,
  Leaf,
  Menu,
  MessageCircle,
  PieChart,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Users,
  WalletCards,
  X,
} from 'lucide-react';

import { motion, useScroll, useSpring, useTransform } from '@/components/Motion';

const navItems = ['Inicio', 'Nosotros', 'Servicios', 'Beneficios', 'Noticias', 'Contacto'];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

function SectionEyebrow({ children }: { children: ReactNode }) {
  return (
    <motion.div
      variants={fadeUp}
      className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/15 bg-white/70 px-4 py-2 text-sm font-semibold text-primary shadow-soft backdrop-blur"
    >
      <Sparkles className="h-4 w-4" /> {children}
    </motion.div>
  );
}

function SectionHeader({
  eyebrow,
  title,
  text,
  inverse = false,
}: {
  eyebrow: string;
  title: string;
  text: string;
  inverse?: boolean;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={stagger}
      className="mx-auto mb-14 max-w-3xl text-center"
    >
      <SectionEyebrow>{eyebrow}</SectionEyebrow>

      <motion.h2
        variants={fadeUp}
        className={`font-display text-4xl font-bold tracking-[-0.04em] sm:text-5xl ${
          inverse ? 'text-white' : 'text-dark'
        }`}
      >
        {title}
      </motion.h2>

      <motion.p
        variants={fadeUp}
        className={`mt-5 text-lg leading-8 ${
          inverse ? 'text-white/60' : 'text-gray'
        }`}
      >
        {text}
      </motion.p>
    </motion.div>
  );
}

function Navbar() {
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
          scrolled
            ? 'border border-white/70 bg-white/75 shadow-soft backdrop-blur-2xl'
            : 'bg-white/10'
        }`}
      >
        <a href="#inicio" className="flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-primary to-accent text-white">
            <Leaf className="h-5 w-5" />
          </div>
          <div>
            <p className="font-display font-bold">Vida & Luz</p>
            <p className="text-xs uppercase tracking-[0.2em] text-gray">
              Cooperativa
            </p>
          </div>
        </a>

        <div className="hidden gap-6 lg:flex">
          {navItems.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-sm font-semibold text-dark/70 hover:text-primary"
            >
              {item}
            </a>
          ))}
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden"
        >
          {open ? <X /> : <Menu />}
        </button>
      </nav>
    </header>
  );
}

function Hero() {
  const { scrollY } = useScroll();
  const heroParallax = useTransform(scrollY, [0, 900], [0, 120]);

  return (
    <section className="relative min-h-screen bg-aurora pt-32">
      <motion.div
        style={{ y: heroParallax }}
        className="absolute inset-x-0 top-0 h-[500px] bg-gradient-to-b from-primary/20 to-transparent"
      />

      <div className="relative mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-2">
        <div>
          <SectionEyebrow>Cooperativa moderna</SectionEyebrow>

          <motion.h1
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="text-5xl font-bold leading-tight"
          >
            Crecemos contigo, construimos futuro juntos
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-6 text-gray"
          >
            Una cooperativa moderna, transparente y cercana.
          </motion.p>

          <div className="mt-8 flex gap-4">
            <a className="rounded-full bg-dark px-6 py-3 text-white">
              Hazte socio
            </a>
            <a className="rounded-full border px-6 py-3">
              Servicios
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stats() {
  const stats = [
    ['+15.000', 'Socios'],
    ['30', 'Años'],
    ['98%', 'Satisfacción'],
    ['Gs. +', 'Fondos'],
  ];

  return (
    <section className="px-6 py-20">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map(([value, label]) => (
          <div key={label} className="rounded-2xl bg-white p-6 shadow">
            <p className="text-3xl font-bold text-primary">{value}</p>
            <p className="text-sm text-gray">{label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Services() {
  return (
    <section className="px-6 py-20">
      <SectionHeader
        eyebrow="Servicios"
        title="Soluciones cooperativas"
        text="Ahorro, crédito y comunidad"
      />
    </section>
  );
}

function Timeline() {
  return <section className="px-6 py-20" />;
}

function Benefits() {
  return <section className="px-6 py-20" />;
}

function Portal() {
  return <section className="px-6 py-20" />;
}

function Testimonials() {
  return <section className="px-6 py-20" />;
}

function News() {
  return <section className="px-6 py-20" />;
}

function FinalCta() {
  return <section className="px-6 py-20 bg-dark text-white" />;
}

function Footer() {
  return (
    <footer className="bg-dark py-10 text-center text-white/60">
      © 2026 Cooperativa Vida & Luz
    </footer>
  );
}

export default function LandingPage() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
  });

  return (
    <main>
      <motion.div
        style={{ scaleX }}
        className="fixed left-0 top-0 z-[60] h-1 w-full origin-left bg-gradient-to-r from-primary to-accent"
      />

      <Navbar />
      <Hero />
      <Stats />
      <Services />
      <Timeline />
      <Benefits />
      <Portal />
      <Testimonials />
      <News />
      <FinalCta />
      <Footer />
    </main>
  );
}