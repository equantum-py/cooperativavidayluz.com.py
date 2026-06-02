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

function SectionHeader({ eyebrow, title, text, inverse = false }: { eyebrow: string; title: string; text: string; inverse?: boolean }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={stagger}
      className="mx-auto mb-14 max-w-3xl text-center"
    >
      <SectionEyebrow>{eyebrow}</SectionEyebrow>
      <motion.h2 variants={fadeUp} className={`font-display text-4xl font-bold tracking-[-0.04em] sm:text-5xl ${inverse ? 'text-white' : 'text-dark'}`}>
        {title}
      </motion.h2>
      <motion.p variants={fadeUp} className={`mt-5 text-lg leading-8 ${inverse ? 'text-white/60' : 'text-gray'}`}>
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
          scrolled ? 'border border-white/70 bg-white/75 shadow-soft backdrop-blur-2xl' : 'bg-white/10'
        }`}
      >
        <a href="#inicio" className="flex items-center gap-3" aria-label="Cooperativa Vida & Luz">
          <div className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-primary to-accent text-white shadow-glow">
            <Leaf className="h-5 w-5" />
          </div>
          <div className="leading-tight">
            <p className="font-display text-base font-bold tracking-[-0.02em]">Vida & Luz</p>
            <p className="text-xs font-medium uppercase tracking-[0.24em] text-gray">Cooperativa</p>
          </div>
        </a>
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

function HeroVisual() {
  return (
    <motion.div initial={{ opacity: 0, scale: 0.94, y: 30 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="perspective-1000 relative mx-auto mt-14 h-[560px] max-w-[620px] lg:mt-0">
      <motion.div animate={{ y: [0, -14, 0], rotateX: [0, 2, 0], rotateY: [0, -3, 0] }} transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }} className="glass absolute left-4 right-4 top-20 rounded-[2rem] p-5 sm:left-12 sm:right-0">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-gray">Dashboard Vida & Luz</p>
            <p className="font-display text-2xl font-bold">Resumen del socio</p>
          </div>
          <div className="rounded-full bg-accent/15 p-3 text-primary"><ShieldCheck /></div>
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          {['Aportes', 'Créditos', 'Beneficios'].map((label, i) => (
            <div key={label} className="rounded-3xl border border-white/70 bg-white/60 p-4">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-gray">{label}</p>
              <p className="mt-2 font-display text-xl font-bold">{i === 0 ? 'Gs. 8.4M' : i === 1 ? '2 activos' : '18'}</p>
            </div>
          ))}
        </div>
        <div className="mt-5 rounded-3xl bg-dark p-5 text-white">
          <div className="flex items-center justify-between"><span className="text-sm text-white/70">Crecimiento anual</span><span className="text-accent">+18.6%</span></div>
          <div className="mt-5 flex h-28 items-end gap-2">
            {[42, 64, 52, 74, 66, 88, 96, 82, 104, 118].map((h, i) => (
              <motion.div key={i} initial={{ height: 10 }} whileInView={{ height: h }} viewport={{ once: true }} transition={{ delay: i * 0.04, duration: 0.7 }} className="flex-1 rounded-t-xl bg-gradient-to-t from-primary to-accent" />
            ))}
          </div>
        </div>
      </motion.div>
      <motion.div animate={{ y: [0, 18, 0], rotate: [-8, -5, -8] }} transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }} className="absolute left-0 top-0 w-72 rounded-[2rem] bg-gradient-to-br from-dark via-primary to-accent p-5 text-white shadow-glow">
        <div className="flex items-start justify-between"><Leaf /><span className="rounded-full bg-white/15 px-3 py-1 text-xs">Socio Plus</span></div>
        <p className="mt-16 text-sm text-white/65">COOPERATIVA VIDA & LUZ</p>
        <p className="mt-2 font-display text-2xl font-semibold">Marta Benítez</p>
        <div className="mt-6 flex justify-between text-xs text-white/70"><span>PY</span><span>**** 2046</span></div>
      </motion.div>
      <motion.div animate={{ y: [0, -18, 0] }} transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut' }} className="glass absolute bottom-16 right-0 w-64 rounded-[2rem] p-5">
        <div className="flex items-center gap-3"><div className="rounded-2xl bg-accent/15 p-3 text-primary"><TrendingUp /></div><div><p className="text-sm text-gray">Confianza</p><p className="font-display text-3xl font-bold">98%</p></div></div>
        <p className="mt-4 text-sm leading-6 text-gray">Satisfacción promedio de socios en atención y soluciones.</p>
      </motion.div>
      <div className="absolute -right-8 top-8 h-32 w-32 rounded-full bg-accent/30 blur-3xl" />
      <div className="absolute bottom-0 left-10 h-44 w-44 rounded-full bg-primary/25 blur-3xl" />
    </motion.div>
  );
}

function Hero() {
  const { scrollY } = useScroll();
  const heroParallax = useTransform(scrollY, [0, 900], [0, 120]);

  return (
    <section id="inicio" className="noise relative min-h-screen overflow-hidden bg-aurora pt-32">
      <motion.div style={{ y: heroParallax }} className="absolute inset-x-0 top-0 h-[540px] bg-[radial-gradient(circle_at_50%_0%,rgba(34,197,94,.30),transparent_55%)]" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-6 pb-24 pt-14 lg:grid-cols-[1.02fr_.98fr] lg:px-8">
        <motion.div initial="hidden" animate="visible" variants={stagger}>
          <SectionEyebrow>La nueva generación cooperativa en Paraguay</SectionEyebrow>
          <motion.h1 variants={fadeUp} className="font-display text-5xl font-bold leading-[0.95] tracking-[-0.06em] text-dark sm:text-7xl lg:text-8xl">
            Crecemos contigo, construimos futuro juntos
          </motion.h1>
          <motion.p variants={fadeUp} className="mt-7 max-w-2xl text-xl leading-9 text-gray">
            Una cooperativa moderna, humana y transparente que combina cercanía institucional, tecnología financiera y oportunidades reales para cada socio.
          </motion.p>
          <motion.div variants={fadeUp} className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a href="#contacto" className="group inline-flex items-center justify-center gap-2 rounded-full bg-dark px-7 py-4 font-bold text-white shadow-glow transition hover:-translate-y-1 hover:bg-primary">
              Hazte Socio <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
            </a>
            <a href="#servicios" className="inline-flex items-center justify-center gap-2 rounded-full border border-dark/10 bg-white/75 px-7 py-4 font-bold text-dark shadow-soft backdrop-blur transition hover:-translate-y-1 hover:border-primary/20 hover:text-primary">
              Conocer Servicios
            </a>
          </motion.div>
          <motion.div variants={fadeUp} className="mt-10 grid max-w-xl grid-cols-3 gap-3">
            {['Segura', 'Digital', 'Cercana'].map((item) => <div key={item} className="glass rounded-2xl px-4 py-3 text-center text-sm font-bold text-dark/75">{item}</div>)}
          </motion.div>
        </motion.div>
        <HeroVisual />
      </div>
    </section>
  );
}

function Stats() {
  const stats = [
    ['+15.000', 'Socios activos'],
    ['30', 'Años de experiencia'],
    ['+Gs.', 'Administrados con transparencia'],
    ['98%', 'Satisfacción'],
  ];
  return (
    <section className="relative -mt-16 px-6">
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="glass mx-auto grid max-w-7xl gap-4 rounded-[2rem] p-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map(([value, label]) => (
          <motion.div variants={fadeUp} key={label} className="rounded-[1.5rem] bg-white/65 p-7 text-center">
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="font-display text-4xl font-bold tracking-[-0.04em] text-primary">{value}</motion.p>
            <p className="mt-2 font-medium text-gray">{label}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

function Services() {
  const services: Array<[string, string, LucideIcon, string]> = [
    ['Ahorro', 'Planes flexibles para construir tranquilidad con metas claras.', WalletCards, 'lg:col-span-2'],
    ['Créditos', 'Financiación cercana para vivienda, educación, salud y emprendimientos.', CircleDollarSign, ''],
    ['Beneficios', 'Convenios, descuentos y ventajas diseñadas para socios.', BadgeCheck, ''],
    ['Educación', 'Programas de formación financiera para tomar mejores decisiones.', GraduationCap, ''],
    ['Inversión', 'Herramientas responsables para hacer crecer el patrimonio común.', PieChart, ''],
    ['Comunidad', 'Una red solidaria que impulsa proyectos con impacto local.', Users, 'lg:col-span-2'],
  ];
  return (
    <section id="servicios" className="px-6 py-28 lg:px-8">
      <SectionHeader eyebrow="Servicios cooperativos" title="Soluciones con diseño fintech y corazón cooperativo." text="Un ecosistema integrado de ahorro, crédito y educación pensado para acompañar la vida real de nuestros socios." />
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={stagger} className="mx-auto grid max-w-7xl auto-rows-[250px] gap-5 lg:grid-cols-4">
        {services.map(([title, text, Icon, span]) => (
          <motion.article variants={fadeUp} whileHover={{ y: -10, rotateX: 3, rotateY: -3 }} key={title} className={`group perspective-1000 relative overflow-hidden rounded-[2rem] border border-dark/5 bg-white p-7 shadow-soft ${span}`}>
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

function Timeline() {
  const items = [
    ['1994', 'Fundación', 'Nace Vida & Luz con una visión solidaria: unir ahorro, confianza y progreso familiar.'],
    ['2002', 'Expansión', 'La cooperativa amplía su presencia y fortalece servicios para más comunidades.'],
    ['2015', 'Digitalización', 'Comienza una transformación tecnológica para simplificar gestiones de socios.'],
    ['2026', 'Cooperativa moderna', 'Una institución preparada para liderar la nueva era cooperativa del Paraguay.'],
  ];
  return (
    <section id="nosotros" className="bg-dark px-6 py-28 text-white lg:px-8">
      <SectionHeader eyebrow="Nuestra historia" title="Tres décadas evolucionando sin perder la cercanía." text="Una línea de tiempo que combina tradición, transparencia y una ambición moderna: elevar el estándar cooperativo nacional." inverse />
      <div className="mx-auto max-w-5xl">
        {items.map(([year, title, text], i) => (
          <motion.div key={year} initial={{ opacity: 0, x: i % 2 ? 40 : -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: '-140px' }} transition={{ duration: 0.65 }} className="relative grid gap-6 border-l border-white/10 pb-12 pl-8 md:grid-cols-[180px_1fr]">
            <div className="absolute -left-3 top-0 h-6 w-6 rounded-full border-4 border-dark bg-accent shadow-glow" />
            <p className="font-display text-5xl font-bold tracking-[-0.05em] text-accent">{year}</p>
            <div className="dark-glass rounded-[2rem] p-7"><h3 className="font-display text-2xl font-bold">{title}</h3><p className="mt-3 leading-8 text-white/70">{text}</p></div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function Benefits() {
  const benefits: Array<[string, LucideIcon]> = [
    ['Atención personalizada', HandHeart], ['Créditos accesibles', CircleDollarSign], ['Tasas competitivas', BarChart3], ['Educación financiera', BookOpen], ['Transparencia', ShieldCheck], ['Comunidad sólida', Users],
  ];
  return (
    <section id="beneficios" className="px-6 py-28 lg:px-8">
      <SectionHeader eyebrow="Beneficios" title="Ventajas que se sienten humanas, claras y medibles." text="Cada beneficio está diseñado para mejorar la vida financiera de los socios, no para complejizarla." />
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="mx-auto grid max-w-7xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {benefits.map(([title, Icon]) => <motion.div variants={fadeUp} key={title} className="group rounded-[2rem] border border-dark/5 bg-white p-7 shadow-soft transition hover:-translate-y-2 hover:shadow-glow"><div className="mb-8 grid h-12 w-12 place-items-center rounded-2xl bg-accent/15 text-primary"><Icon /></div><h3 className="font-display text-xl font-bold">{title}</h3><p className="mt-3 leading-7 text-gray">Procesos simples, acompañamiento experto y comunicación transparente en cada etapa.</p></motion.div>)}
      </motion.div>
    </section>
  );
}

function Portal() {
  const features = ['Consulta de aportes', 'Solicitud de créditos', 'Documentos digitales', 'Estado de cuenta'];
  return (
    <section id="portal" className="overflow-hidden bg-gradient-to-b from-white to-emerald-50 px-6 py-28 lg:px-8">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
          <SectionEyebrow>Portal digital</SectionEyebrow>
          <motion.h2 variants={fadeUp} className="font-display text-4xl font-bold tracking-[-0.04em] sm:text-5xl">Toda tu cooperativa en una experiencia clara y segura.</motion.h2>
          <motion.p variants={fadeUp} className="mt-5 text-lg leading-8 text-gray">Un sistema moderno para resolver gestiones esenciales sin filas, sin fricción y con la confianza de siempre.</motion.p>
          <motion.div variants={stagger} className="mt-8 grid gap-3 sm:grid-cols-2">
            {features.map((feature) => <motion.div variants={fadeUp} key={feature} className="flex items-center gap-3 rounded-2xl bg-white p-4 shadow-soft"><CheckCircle2 className="text-primary" /> <span className="font-semibold">{feature}</span></motion.div>)}
          </motion.div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass rounded-[2.5rem] p-4">
          <div className="rounded-[2rem] bg-dark p-5 text-white">
            <div className="flex items-center justify-between"><p className="font-display text-xl font-bold">Portal Vida & Luz</p><Globe2 className="text-accent" /></div>
            <div className="mt-6 grid gap-4 md:grid-cols-[1fr_.8fr]">
              <div className="rounded-3xl bg-white/10 p-5"><p className="text-white/55">Aportes acumulados</p><p className="mt-2 font-display text-4xl font-bold">Gs. 12.850.000</p><div className="mt-8 h-3 rounded-full bg-white/10"><div className="h-3 w-4/5 rounded-full bg-gradient-to-r from-primary to-accent" /></div></div>
              <div className="rounded-3xl bg-gradient-to-br from-primary to-accent p-5"><FileText /><p className="mt-10 font-display text-2xl font-bold">Preaprobado</p><p className="text-sm text-white/75">Crédito educación</p></div>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">{['Extractos', 'Pagos', 'Asesoría'].map((item) => <div key={item} className="rounded-2xl bg-white/10 p-4 text-sm font-semibold">{item}</div>)}</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Testimonials() {
  const testimonials = useMemo(() => [
    ['“Sentí que por primera vez una institución financiera me hablaba claro y me acompañaba de verdad.”', 'Rosa Martínez', 'Socia emprendedora'],
    ['“El crédito educativo de mi hija salió con una atención humana, rápida y transparente.”', 'Luis González', 'Socio desde 2008'],
    ['“El portal digital nos ahorra tiempo y mantiene todo ordenado. Es moderno sin perder calidez.”', 'Paola Cáceres', 'Docente'],
  ], []);
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => setIndex((v) => (v + 1) % testimonials.length), 4200);
    return () => clearInterval(timer);
  }, [testimonials.length]);
  return (
    <section className="px-6 py-28 lg:px-8">
      <SectionHeader eyebrow="Testimonios" title="Historias de socios, no métricas vacías." text="La confianza se construye en cada conversación, cada proyecto y cada solución concreta." />
      <div className="mx-auto max-w-4xl overflow-hidden rounded-[2.5rem] bg-dark p-8 text-white shadow-glow md:p-12">
        <motion.div key={index} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
          <MessageCircle className="mb-8 h-10 w-10 text-accent" />
          <p className="font-display text-3xl font-semibold leading-tight tracking-[-0.04em] md:text-5xl">{testimonials[index][0]}</p>
          <div className="mt-10 flex items-center gap-4"><div className="grid h-14 w-14 place-items-center rounded-full bg-gradient-to-br from-primary to-accent font-bold">{testimonials[index][1].slice(0,1)}</div><div><p className="font-bold">{testimonials[index][1]}</p><p className="text-white/55">{testimonials[index][2]}</p></div></div>
        </motion.div>
      </div>
    </section>
  );
}

function News() {
  const news = [
    ['Eventos', 'Jornada de integración para socios y familias', 'Encuentros que fortalecen comunidad y pertenencia.'],
    ['Asambleas', 'Transparencia anual y participación democrática', 'Reportes claros para decisiones colectivas responsables.'],
    ['Capacitaciones', 'Educación financiera para nuevos emprendedores', 'Herramientas prácticas para planificar, invertir y crecer.'],
  ];
  return (
    <section id="noticias" className="bg-white px-6 py-28 lg:px-8">
      <SectionHeader eyebrow="Noticias" title="La cooperativa también se comunica mejor." text="Actualidad institucional presentada con claridad editorial, diseño limpio y foco en la comunidad." />
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="mx-auto grid max-w-7xl gap-5 md:grid-cols-3">
        {news.map(([tag, title, text]) => <motion.article variants={fadeUp} key={tag} className="group overflow-hidden rounded-[2rem] border border-dark/5 bg-light shadow-soft transition hover:-translate-y-2"><div className="h-48 bg-[radial-gradient(circle_at_30%_30%,rgba(34,197,94,.45),transparent_35%),linear-gradient(135deg,#0B1A12,#0F8F4F)]" /><div className="p-7"><span className="rounded-full bg-accent/15 px-3 py-1 text-sm font-bold text-primary">{tag}</span><h3 className="mt-5 font-display text-2xl font-bold tracking-[-0.03em]">{title}</h3><p className="mt-3 leading-7 text-gray">{text}</p><a className="mt-6 inline-flex items-center gap-1 font-bold text-primary" href="#contacto">Leer más <ChevronRight className="h-4 w-4" /></a></div></motion.article>)}
      </motion.div>
    </section>
  );
}

function FinalCta() {
  return (
    <section id="contacto" className="relative overflow-hidden bg-dark px-6 py-28 text-white lg:px-8">
      <div className="absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-accent/25 blur-3xl" />
      <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="relative mx-auto max-w-4xl text-center">
        <p className="font-semibold uppercase tracking-[0.28em] text-accent">Hazte socio</p>
        <h2 className="mt-5 font-display text-5xl font-bold leading-none tracking-[-0.06em] md:text-7xl">Tu futuro crece cuando crecemos juntos</h2>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/70">Conversemos sobre ahorro, créditos y beneficios diseñados para tu próxima etapa.</p>
        <a href="mailto:contacto@cooperativavidayluz.com.py" className="mt-9 inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 font-bold text-dark shadow-glow transition hover:-translate-y-1 hover:bg-accent hover:text-white">Únete a Vida & Luz <ArrowRight /></a>
      </motion.div>
    </section>
  );
}

function Footer() {
  return <footer className="bg-dark px-6 pb-10 text-center text-sm text-white/45">© 2026 Cooperativa Vida & Luz · Paraguay · Confianza, innovación y comunidad.</footer>;
}

export default function LandingPage() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  return (
    <main>
      <motion.div style={{ scaleX }} className="fixed left-0 top-0 z-[60] h-1 w-full origin-left bg-gradient-to-r from-primary to-accent" />
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
