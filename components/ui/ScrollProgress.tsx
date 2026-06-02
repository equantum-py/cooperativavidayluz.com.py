'use client';

import { motion, useScroll, useSpring } from '@/components/ui/Motion';

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return <motion.div style={{ scaleX }} className="fixed left-0 top-0 z-[60] h-1 w-full origin-left bg-gradient-to-r from-primary to-accent" />;
}
