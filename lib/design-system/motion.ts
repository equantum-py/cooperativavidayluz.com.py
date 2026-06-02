import type { Variants } from 'framer-motion';

export const viewportOnce = { once: true, margin: '-80px' } as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

export const stagger: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.04 },
  },
};

export const cardHover = {
  y: -10,
  rotateX: 3,
  rotateY: -3,
  transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
} as const;
