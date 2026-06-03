'use client';

import { ImageIcon } from 'lucide-react';

// ─── Tipos ────────────────────────────────────────────────────────────────────

type AspectRatio = 'square' | 'video' | 'hero' | 'card' | 'portrait';

interface ImagePlaceholderProps {
  /** Etiqueta descriptiva mostrada dentro del placeholder */
  label?: string;
  /** Relación de aspecto del contenedor */
  aspectRatio?: AspectRatio;
  /** Clases Tailwind adicionales sobre el contenedor exterior */
  className?: string;
}

// ─── Mapa de aspect ratios ────────────────────────────────────────────────────

const ASPECT: Record<AspectRatio, string> = {
  square:   'aspect-square',
  video:    'aspect-video',
  hero:     'aspect-[16/7]',
  card:     'aspect-[4/3]',
  portrait: 'aspect-[4/5]',
};

// ─── Componente ───────────────────────────────────────────────────────────────

/**
 * Placeholder elegante para imágenes institucionales aún no disponibles.
 * Reutilizable en Hero, galería de sucursales, sección de socios, etc.
 *
 * USO:
 *   <ImagePlaceholder
 *     label="Sede central · Asunción"
 *     aspectRatio="card"
 *   />
 *
 * Cuando la fotografía real esté disponible, reemplazar por:
 *   <Image src={foto.src} alt={foto.alt} fill className="object-cover rounded-2xl" />
 */
export default function ImagePlaceholder({
  label = 'Fotografía institucional',
  aspectRatio = 'card',
  className = '',
}: ImagePlaceholderProps) {
  return (
    <div
      className={`
        relative overflow-hidden rounded-2xl
        bg-emerald-50 border border-emerald-100
        flex flex-col items-center justify-center
        ${ASPECT[aspectRatio]} ${className}
      `}
    >
      {/* Dot pattern de fondo — usa la clase global de globals.css */}
      <div className="absolute inset-0 dot-grid-light pointer-events-none" aria-hidden="true" />

      {/* Contenido central */}
      <div className="relative z-10 flex flex-col items-center gap-3 text-center px-6">
        <div className="w-12 h-12 rounded-xl bg-white border border-emerald-100 shadow-elevation-1 flex items-center justify-center">
          <ImageIcon size={20} className="text-emerald-600" strokeWidth={1.5} />
        </div>
        <p className="text-emerald-700 text-[13px] font-medium leading-snug max-w-[160px]">
          {label}
        </p>
        <span className="text-emerald-500/60 text-[11px] font-medium px-2.5 py-1 rounded-full border border-emerald-200/60 bg-white/70">
          Próximamente
        </span>
      </div>
    </div>
  );
}
