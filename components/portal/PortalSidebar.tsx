'use client';

interface NavItem {
  icon: React.ReactNode;
  label: string;
  href: string;
  active?: boolean;
  badge?: string;
}

function HomeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <polyline points="9 22 9 12 15 12 15 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function CreditIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <rect x="2" y="5" width="20" height="14" rx="3" stroke="currentColor" strokeWidth="2"/>
      <path d="M2 10h20" stroke="currentColor" strokeWidth="2"/>
    </svg>
  );
}

function SavingsIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" stroke="currentColor" strokeWidth="2"/>
      <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}

function DocumentIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <polyline points="14 2 14 8 20 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <line x1="8" y1="13" x2="16" y2="13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <line x1="8" y1="17" x2="12" y2="17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}

function HelpIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
      <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12 17h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}

interface SidebarProps {
  activeSection: string;
  onNavigate: (section: string) => void;
}

export default function PortalSidebar({ activeSection, onNavigate }: SidebarProps) {
  const navItems: NavItem[] = [
    { icon: <HomeIcon />, label: 'Inicio', href: 'dashboard' },
    { icon: <CreditIcon />, label: 'Créditos', href: 'creditos' },
    { icon: <SavingsIcon />, label: 'Ahorros', href: 'ahorros' },
    { icon: <DocumentIcon />, label: 'Documentos', href: 'documentos' },
    { icon: <HelpIcon />, label: 'Soporte', href: 'soporte' },
  ];

  return (
    <aside
      className="hidden lg:flex flex-col w-64 min-h-screen shrink-0"
      style={{ background: '#0C1C17', borderRight: '1px solid rgba(0,127,95,0.15)' }}
    >
      {/* Brand */}
      <div className="px-6 py-6 border-b" style={{ borderColor: 'rgba(0,127,95,0.15)' }}>
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
            style={{ background: 'linear-gradient(135deg, #2b9348, #007f5f)' }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L3 7v5c0 5.25 3.75 10.15 9 11.35C17.25 22.15 21 17.25 21 12V7L12 2z" fill="white" fillOpacity="0.9"/>
              <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div>
            <p className="text-white font-bold text-sm leading-none">Vida &amp; Luz</p>
            <p className="text-xs font-medium tracking-widest uppercase mt-0.5" style={{ color: '#80b918' }}>
              Cooperativa
            </p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map((item) => {
          const isActive = activeSection === item.href;
          return (
            <button
              key={item.href}
              onClick={() => onNavigate(item.href)}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all text-left"
              style={{
                color: isActive ? '#fff' : 'rgba(255,255,255,0.45)',
                background: isActive ? 'rgba(43,147,72,0.20)' : 'transparent',
                borderLeft: isActive ? '3px solid #2b9348' : '3px solid transparent',
              }}
            >
              <span style={{ color: isActive ? '#2b9348' : 'rgba(255,255,255,0.35)' }}>
                {item.icon}
              </span>
              {item.label}
              {item.badge && (
                <span className="ml-auto text-xs font-bold rounded-full px-2 py-0.5" style={{ background: '#2b9348', color: '#fff' }}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Bottom promo */}
      <div className="px-3 pb-6">
        <div
          className="rounded-2xl p-4"
          style={{ background: 'linear-gradient(135deg, rgba(43,147,72,0.22), rgba(0,127,95,0.12))', border: '1px solid rgba(43,147,72,0.2)' }}
        >
          <p className="text-white font-semibold text-xs mb-1">¿Necesitás un crédito?</p>
          <p className="text-white/40 text-xs leading-snug mb-3">Tasas preferenciales para socios activos.</p>
          <a
            href="/credito/solicitud"
            className="block text-center text-xs font-semibold py-2 rounded-xl transition-all"
            style={{ background: 'linear-gradient(135deg, #2b9348, #007f5f)', color: '#fff' }}
          >
            Solicitar ahora
          </a>
        </div>
      </div>
    </aside>
  );
}
