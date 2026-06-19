'use client';

import { motion } from 'framer-motion';
import { Bell, PiggyBank, CreditCard, FileText, ArrowUpRight, ArrowDownLeft, RotateCcw } from 'lucide-react';

const TRANSACTIONS = [
  {
    icon: ArrowDownLeft,
    label: 'Aporte mensual',
    date: 'Hoy, 09:14',
    amount: '+Gs. 250.000',
    positive: true,
  },
  {
    icon: ArrowUpRight,
    label: 'Cuota préstamo',
    date: 'Ayer, 14:30',
    amount: '-Gs. 180.000',
    positive: false,
  },
  {
    icon: RotateCcw,
    label: 'Rendimiento',
    date: 'Lun, 08:00',
    amount: '+Gs. 12.450',
    positive: true,
  },
] as const;

const QUICK_ACTIONS = [
  { icon: PiggyBank, label: 'Aportes' },
  { icon: CreditCard, label: 'Créditos' },
  { icon: FileText, label: 'Extractos' },
] as const;

const FEATURES = [
  {
    title: 'Consulta en tiempo real',
    description: 'Saldo, movimientos y estado de créditos al instante.',
  },
  {
    title: 'Pagos y transferencias',
    description: 'Realizá operaciones sin ir a la oficina, disponible 24/7.',
  },
  {
    title: 'Documentos digitales',
    description: 'Extractos, certificados y recibos disponibles para descargar.',
  },
  {
    title: 'Notificaciones inteligentes',
    description: 'Alertas de vencimientos, acreditaciones y ofertas exclusivas.',
  },
] as const;

/* ─── Phone mockup (CSS-only) ─────────────────────────────────── */
function PhoneMockup() {
  return (
    <div className="relative mx-auto w-[260px]">
      {/* Glow */}
      <div className="absolute inset-0 rounded-[42px] bg-emerald-500/15 blur-3xl scale-110 pointer-events-none" />

      {/* Frame */}
      <div className="relative w-[260px] rounded-[42px] border-[6px] border-emerald-900/60 bg-void-2 overflow-hidden shadow-elevation-3">
        {/* Dynamic island */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-24 h-[26px] bg-black rounded-full z-10" />

        {/* Screen */}
        <div className="pt-14 px-4 pb-5 min-h-[520px] relative">
          {/* App status bar */}
          <div className="flex items-center justify-between mb-5">
            <div>
              <p className="text-white/35 text-[9px] uppercase tracking-wider">Bienvenida</p>
              <p className="text-white text-[14px] font-bold leading-tight mt-0.5">
                María García
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Bell size={16} className="text-white/50" />
                <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-500" />
              </div>
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center text-white text-[10px] font-bold">
                MG
              </div>
            </div>
          </div>

          {/* Balance card */}
          <div className="relative bg-gradient-to-br from-emerald-600 to-emerald-800 rounded-2xl p-4 mb-4 overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-white/10 blur-2xl" />
            <p className="text-emerald-100 text-[9px] uppercase tracking-wider mb-1">Saldo total</p>
            <p className="text-white text-[22px] font-bold tracking-tight leading-tight">
              Gs. 12.450.000
            </p>
            <p className="text-emerald-200 text-[10px] mt-1">+Gs. 450.000 este mes · +3.8%</p>
          </div>

          {/* Quick actions */}
          <div className="grid grid-cols-3 gap-2 mb-4">
            {QUICK_ACTIONS.map((action) => {
              const Icon = action.icon;
              return (
                <div
                  key={action.label}
                  className="flex flex-col items-center gap-1.5 bg-white/[0.06] rounded-xl p-2.5"
                >
                  <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                    <Icon size={14} className="text-emerald-400" strokeWidth={1.75} />
                  </div>
                  <p className="text-white/55 text-[8px] font-medium">{action.label}</p>
                </div>
              );
            })}
          </div>

          {/* Transactions */}
          <p className="text-white/35 text-[8px] uppercase tracking-wider mb-2">
            Últimos movimientos
          </p>
          <div className="space-y-1">
            {TRANSACTIONS.map((tx) => {
              const Icon = tx.icon;
              return (
                <div
                  key={tx.label}
                  className="flex items-center justify-between py-1.5 border-b border-white/[0.05] last:border-0"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-white/[0.06] flex items-center justify-center flex-shrink-0">
                      <Icon
                        size={12}
                        className={tx.positive ? 'text-emerald-400' : 'text-white/50'}
                        strokeWidth={2}
                      />
                    </div>
                    <div>
                      <p className="text-white text-[10px] font-medium leading-tight">
                        {tx.label}
                      </p>
                      <p className="text-white/30 text-[8px]">{tx.date}</p>
                    </div>
                  </div>
                  <p
                    className={`text-[10px] font-semibold ${
                      tx.positive ? 'text-emerald-400' : 'text-white/55'
                    }`}
                  >
                    {tx.amount}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Portal section ───────────────────────────────────────────── */
export default function Portal() {
  return (
    <section id="portal" className="relative py-24 px-6 bg-void overflow-hidden noise-overlay">
      {/* Aurora */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/4 right-0 w-[500px] h-[400px] rounded-full bg-emerald-800/15 blur-[120px]" />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[300px] rounded-full bg-emerald-900/12 blur-[100px]" />
      </div>
      <div className="absolute inset-0 dot-grid pointer-events-none" aria-hidden="true" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left — phone */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="flex justify-center lg:justify-start"
          >
            <PhoneMockup />
          </motion.div>

          {/* Right — text */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-[12px] font-bold text-emerald-500 uppercase tracking-[0.2em] mb-3">
              Portal digital
            </p>
            <h2 className="heading-lg text-white text-balance mb-5">
              Tu cooperativa en
              <br />
              <span className="gradient-text-bright">tu bolsillo</span>
            </h2>
            <p className="text-[17px] text-white/50 leading-relaxed mb-10">
              Accedé a todos tus servicios desde cualquier dispositivo, sin filas ni
              horarios. Diseñado para que gestiones tu dinero con total confianza.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {FEATURES.map((feature, i) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.45 }}
                  className="glass-dark rounded-2xl p-4 hover:border-emerald-500/25 transition-colors"
                >
                  <p className="text-white font-semibold text-[14.5px] mb-1.5">
                    {feature.title}
                  </p>
                  <p className="text-white/45 text-[13px] leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="mt-10 flex items-center gap-4"
            >
              <a
                href="/login"
                className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-3 rounded-xl text-[14px] font-semibold transition-all hover:shadow-glow-sm hover:-translate-y-0.5"
              >
                Acceder al portal
              </a>
              <a
                href="/login"
                className="text-[14px] font-medium text-white/55 hover:text-white transition-colors"
              >
                Descargar app →
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
