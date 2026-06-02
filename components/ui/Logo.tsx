import { Leaf } from 'lucide-react';

export function Logo() {
  return (
    <a href="#inicio" className="flex items-center gap-3" aria-label="Cooperativa Vida & Luz">
      <div className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-primary to-accent text-white shadow-glow">
        <Leaf className="h-5 w-5" />
      </div>
      <div className="leading-tight">
        <p className="font-display text-base font-bold tracking-[-0.02em]">Vida & Luz</p>
        <p className="text-xs font-medium uppercase tracking-[0.24em] text-gray">Cooperativa</p>
      </div>
    </a>
  );
}
