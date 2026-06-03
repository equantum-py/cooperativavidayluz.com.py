/**
 * Configuración centralizada de imágenes institucionales
 * Cooperativa Vida & Luz
 *
 * CÓMO AGREGAR IMÁGENES REALES
 * ─────────────────────────────
 * 1. Subir el archivo a la carpeta correspondiente dentro de
 *    /public/images/cooperativa/<categoria>/
 *
 * 2. Agregar la entrada al array de esa categoría:
 *
 *    cooperativeImages.hero.push({
 *      src: '/images/cooperativa/hero/sede-central.jpg',
 *      alt: 'Sede central Cooperativa Vida & Luz',
 *      caption: 'Nuestra sede en Asunción',
 *    });
 *
 *    O directamente en el arreglo abajo.
 *
 * CONVENCIÓN DE NOMBRES DE ARCHIVO
 * ──────────────────────────────────
 * Usar kebab-case: foto-sede-asuncion.jpg
 * Formatos recomendados: .webp (preferido), .jpg, .png
 * Tamaños recomendados por categoría:
 *   hero/       → 1920×1080 px mínimo
 *   historia/   → 1200×800 px
 *   socios/     → 800×800 px (cuadrado)
 *   sucursales/ → 1200×900 px
 *   eventos/    → 1200×800 px
 */

// ─── Tipos ────────────────────────────────────────────────────────────────────

export type CooperativeImage = {
  /** Ruta relativa desde /public — ej: '/images/cooperativa/hero/foto.jpg' */
  src: string;
  /** Texto alternativo para accesibilidad y SEO */
  alt: string;
  /** Leyenda opcional mostrada en galerías */
  caption?: string;
};

// ─── Imágenes del logo (ya disponible) ───────────────────────────────────────

export const LOGO = {
  src: '/images/logo.png',
  alt: 'Cooperativa Vida & Luz',
  width: 1000,
  height: 300,
} as const;

// ─── Dimensiones estándar por contexto ───────────────────────────────────────

export const IMAGE_SIZES = {
  hero:      { width: 1920, height: 1080 },
  card:      { width: 800,  height: 600  },
  thumbnail: { width: 400,  height: 300  },
  portrait:  { width: 400,  height: 500  },
  square:    { width: 600,  height: 600  },
} as const;

// ─── Catálogo de imágenes institucionales ────────────────────────────────────
// Agregar entradas aquí cuando la cooperativa provea las fotografías reales.

export const cooperativeImages = {
  /**
   * Fotografías para el Hero principal de la landing.
   * Recomendado: 1–3 imágenes. Mínimo 1920×1080 px.
   */
  hero: [] as CooperativeImage[],

  /**
   * Fotografías históricas de la cooperativa (uso en /historia y Timeline).
   * Pueden ser blanco y negro o color. Orden cronológico sugerido.
   */
  historia: [] as CooperativeImage[],

  /**
   * Testimonios y rostros de socios (con consentimiento).
   * Formato cuadrado recomendado para avatares.
   */
  socios: [] as CooperativeImage[],

  /**
   * Fotografías de sucursales y locales de atención.
   * Una imagen por sucursal mínimo.
   */
  sucursales: [] as CooperativeImage[],

  /**
   * Fotografías de eventos, asambleas y actividades comunitarias.
   * Orden cronológico inverso (más recientes primero).
   */
  eventos: [] as CooperativeImage[],
};

// ─── Helper: verificar si una categoría tiene imágenes ───────────────────────

export function hasImages(category: keyof typeof cooperativeImages): boolean {
  return cooperativeImages[category].length > 0;
}

// ─── Helper: obtener la primera imagen de una categoría ──────────────────────

export function getFirstImage(
  category: keyof typeof cooperativeImages,
): CooperativeImage | null {
  return cooperativeImages[category][0] ?? null;
}
