'use client';

import { motion, useScroll, useSpring } from 'motion/react';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-[99998] pointer-events-none"
      style={{
        height: 2,
        background: 'oklch(62% 0.23 28)',
        scaleX,
        transformOrigin: 'left',
      }}
    />
  );
}
