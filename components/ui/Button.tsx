import React from 'react';
import Link from 'next/link';

type Variant = 'default' | 'outline' | 'ghost' | 'glass';
type Size = 'default' | 'sm' | 'lg' | 'icon';

const variantClasses: Record<Variant, string> = {
  default: 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-900/40 hover:shadow-glow hover:-translate-y-0.5',
  outline: 'border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50 hover:-translate-y-0.5',
  ghost: 'text-gray-600 hover:text-emerald-600 hover:bg-emerald-50',
  glass: 'glass-dark text-white/90 hover:text-white hover:-translate-y-0.5',
};

const sizeClasses: Record<Size, string> = {
  default: 'px-7 py-3.5',
  sm: 'px-4 py-2 text-[13.5px]',
  lg: 'px-8 py-4 text-[16px]',
  icon: 'p-3',
};

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  href?: string;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant = 'default', size = 'default', href, children, ...props }, ref) => {
    const baseClass = 'inline-flex items-center justify-center gap-2 rounded-2xl text-[15px] font-semibold transition-all active:translate-y-0 disabled:opacity-50 disabled:pointer-events-none';
    const computedClass = `${baseClass} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`.trim();

    if (href) {
      // Si es un hash link interno, mejor usar anchor o Scroll? Next Link maneja hashes bien.
      return (
        <Link href={href} className={computedClass}>
          {children}
        </Link>
      );
    }
    return (
      <button ref={ref} className={computedClass} {...props}>
        {children}
      </button>
    );
  }
);
Button.displayName = 'Button';

