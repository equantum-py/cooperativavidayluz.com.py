'use client';

import type { ReactNode } from 'react';
import { Sparkles } from 'lucide-react';
import { fadeUp, stagger, viewportOnce } from '@/lib/design-system/motion';
import { motion } from '@/components/ui/Motion';

export function SectionEyebrow({ children }: { children: ReactNode }) {
  return (
    <motion.div
      variants={fadeUp}
      className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/15 bg-white/70 px-4 py-2 text-sm font-semibold text-primary shadow-soft backdrop-blur"
    >
      <Sparkles className="h-4 w-4" /> {children}
    </motion.div>
  );
}

export function SectionHeader({ eyebrow, title, text, inverse = false }: { eyebrow: string; title: string; text: string; inverse?: boolean }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
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
