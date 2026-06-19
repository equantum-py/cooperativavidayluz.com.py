import React from 'react';
import Link from 'next/link';

type Variant = 'default' | 'outline' | 'ghost' | 'secondary';
type Size = 'default' | 'sm' | 'lg' | 'icon';

const variantClasses: Record<Variant, string> = {
  default: 'bg-[#004C47] hover:bg-[#003B37] text-white border border-transparent', // We use a deep blue or emerald if keeping identity, user said "Mantener paleta verde institucional". Let's stick to deep emerald.
  outline: 'border border-[#006059] text-[#006059] hover:bg-emerald-50/50',
  ghost: 'text-[#006059] hover:bg-emerald-50/50',
  secondary: 'bg-[#F4F4F4] hover:bg-[#EBEBEB] text-[#121212]',
};

// Override default to use the "verde institucional"
const greenVariantClasses: Record<Variant, string> = {
  default: 'bg-[#006059] hover:bg-[#004c47] text-white border border-transparent', 
  outline: 'border border-[#006059] text-[#006059] hover:bg-[#F4F8F8]',
  ghost: 'text-[#006059] hover:bg-[#F4F8F8]',
  secondary: 'bg-[#F4F4F4] hover:bg-[#EBEBEB] text-[#121212]',
};

const sizeClasses: Record<Size, string> = {
  default: 'px-6 py-3',
  sm: 'px-4 py-2 text-[14px]',
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
    // Menos redondeado, sin hover translateY exagerado
    const baseClass = 'inline-flex items-center justify-center gap-2 rounded text-[15px] font-semibold transition-colors disabled:opacity-50 disabled:pointer-events-none';
    const computedClass = `${baseClass} ${greenVariantClasses[variant]} ${sizeClasses[size]} ${className}`.trim();

    if (href) {
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

