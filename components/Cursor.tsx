'use client';

import { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

export default function Cursor() {
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const scaleVal = useMotionValue(1);

  const springX = useSpring(mouseX, { stiffness: 600, damping: 32 });
  const springY = useSpring(mouseY, { stiffness: 600, damping: 32 });
  const springScale = useSpring(scaleVal, { stiffness: 400, damping: 28 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX - 18);
      mouseY.set(e.clientY - 18);
    };
    const grow = () => scaleVal.set(1.8);
    const shrink = () => scaleVal.set(1);

    window.addEventListener('mousemove', move);

    const interactives = document.querySelectorAll('a, button, [data-cursor-grow]');
    interactives.forEach((el) => {
      el.addEventListener('mouseenter', grow);
      el.addEventListener('mouseleave', shrink);
    });

    const obs = new MutationObserver(() => {
      document.querySelectorAll('a, button, [data-cursor-grow]').forEach((el) => {
        el.addEventListener('mouseenter', grow);
        el.addEventListener('mouseleave', shrink);
      });
    });
    obs.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', move);
      obs.disconnect();
    };
  }, [mouseX, mouseY, scaleVal]);

  return (
    <motion.div
      className="fixed z-[9999] pointer-events-none rounded-full bg-text"
      style={{
        x: springX,
        y: springY,
        scale: springScale,
        width: 36,
        height: 36,
        mixBlendMode: 'difference',
      }}
    />
  );
}
