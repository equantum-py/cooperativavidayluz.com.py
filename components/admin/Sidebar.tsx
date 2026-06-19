'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, Users, FileText, Banknote, 
  Wallet, TrendingDown, BarChart3, ShieldCheck, 
  Settings, Menu, X, Leaf
} from 'lucide-react';
import { useState } from 'react';

const MENU_ITEMS = [
  { name: 'Dashboard', icon: LayoutDashboard, href: '/admin' },
  { name: 'Socios', icon: Users, href: '/admin/socios' },
  { name: 'Solicitudes', icon: FileText, href: '/admin/solicitudes' },
  { name: 'Créditos', icon: Banknote, href: '/admin/creditos' },
  { name: 'Aportes', icon: Wallet, href: '/admin/aportes' },
  { name: 'Morosidad', icon: TrendingDown, href: '/admin/morosidad' },
  { name: 'Reportes', icon: BarChart3, href: '/admin/reportes' },
  { name: 'Auditoría', icon: ShieldCheck, href: '/admin/auditoria' },
  { name: 'Configuración', icon: Settings, href: '/admin/configuracion' },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Toggle */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-sm border border-gray-200"
      >
        {isOpen ? <X size={20} className="text-gray-600" /> : <Menu size={20} className="text-gray-600" />}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Content */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-40
        w-64 bg-[#002D2A] text-emerald-50
        transition-transform duration-300 ease-in-out
        flex flex-col
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Brand */}
        <div className="h-16 flex items-center px-6 border-b border-emerald-900/50">
          <Link href="/admin" className="flex items-center gap-2 text-white font-bold text-lg">
            <Leaf className="text-emerald-400" size={24} />
            Vida & Luz <span className="text-[10px] bg-emerald-600 px-1.5 py-0.5 rounded uppercase tracking-widest font-semibold ml-1">ERP</span>
          </Link>
        </div>

        {/* Menu */}
        <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1 scrollbar-hide">
          {MENU_ITEMS.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive 
                    ? 'bg-emerald-800/60 text-white' 
                    : 'text-emerald-100/70 hover:bg-emerald-900/40 hover:text-white'
                }`}
              >
                <item.icon size={18} className={isActive ? 'text-emerald-400' : 'text-emerald-100/50'} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Footer info (Version etc) */}
        <div className="p-4 border-t border-emerald-900/50 text-xs text-emerald-100/40 text-center">
          V & L Core v2.0.1
        </div>
      </aside>
    </>
  );
}
