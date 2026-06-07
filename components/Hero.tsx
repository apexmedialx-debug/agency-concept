'use client';

import { useRef, useCallback } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

const LETTERS = ['O', 'B', 'L', 'I', 'Q', 'U', 'E'];

function Letter({ char, index }: { char: string; index: number }) {
  return (
    <span style={{ display: 'inline-block', overflow: 'hidden', lineHeight: 0.9 }}>
      <motion.span
        initial={{ y: '110%', opacity: 0 }}
        animate={{ y: '0%', opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.23, 1, 0.32, 1], delay: 0.1 + index * 0.06 }}
        style={{ display: 'inline-block' }}
      >
        {char}
      </motion.span>
    </span>
  );
}

function MagneticButton({
  href,
  primary,
  children,
}: {
  href: string;
  primary?: boolean;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 220, damping: 22 });
  const springY = useSpring(y, { stiffness: 220, damping: 22 });

  const onMove = useCallback(
    (e: React.MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      x.set((e.clientX - rect.left - rect.width / 2) * 0.28);
      y.set((e.clientY - rect.top - rect.height / 2) * 0.28);
    },
    [x, y]
  );
  const onLeave = useCallback(() => { x.set(0); y.set(0); }, [x, y]);

  return (
    <motion.a
      ref={ref}
      href={href}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{
        x: springX,
        y: springY,
        fontFamily: 'var(--font-display)',
        fontWeight: primary ? 700 : 400,
        fontSize: 11,
        letterSpacing: '0.15em',
        textTransform: 'uppercase' as const,
        color: primary ? 'oklch(9% 0.012 255)' : 'oklch(52% 0.008 255)',
        background: primary ? 'oklch(62% 0.23 28)' : 'transparent',
        padding: primary ? '16px 36px' : undefined,
        borderBottom: primary ? undefined : '1px solid oklch(22% 0.01 255)',
        paddingBottom: primary ? undefined : 2,
        textDecoration: 'none',
        display: 'inline-block',
        transition: 'background 0.2s, color 0.2s',
      }}
      onMouseEnter={(e) => {
        if (primary) e.currentTarget.style.background = 'oklch(72% 0.23 28)';
        else e.currentTarget.style.color = 'oklch(94% 0.005 80)';
      }}
      whileTap={{ scale: 0.97 }}
    >
      {children}
    </motion.a>
  );
}

export default function Hero() {
  return (
    <section
      className="relative overflow-hidden bg-void"
      style={{ minHeight: '100dvh', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}
    >
      {/* Top-right meta label — hidden on small mobile */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.0 }}
        className="hidden sm:flex"
        style={{
          position: 'absolute',
          top: 96,
          right: 32,
          flexDirection: 'column',
          alignItems: 'flex-end',
          gap: 8,
        }}
      >
        <span style={{ fontFamily: 'var(--font-display)', fontWeight: 200, fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'oklch(52% 0.008 255)' }}>
          Cultural Marketing
        </span>
        <span style={{ fontFamily: 'var(--font-display)', fontWeight: 200, fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'oklch(52% 0.008 255)' }}>
          London, Est. 2017
        </span>
        <div style={{ width: 1, height: 40, background: 'oklch(22% 0.01 255)', marginTop: 8 }} />
      </motion.div>

      {/* Vertical accent line — hidden on small mobile */}
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1], delay: 0.2 }}
        className="hidden sm:block"
        style={{
          position: 'absolute',
          left: 32,
          top: 0,
          bottom: 0,
          width: 1,
          background: 'oklch(22% 0.01 255)',
          transformOrigin: 'top',
        }}
      />

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-6 w-full" style={{ paddingBottom: 'clamp(3rem, 6vw, 5rem)' }}>
        {/* Massive headline — 10% smaller: 72→65 min, 14vw→12.6vw preferred, 220→198 max
            Further reduced min to ~42px so it never overflows on 375px mobile */}
        <div
          aria-label="OBLIQUE"
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 900,
            fontSize: 'clamp(42px, 12.6vw, 198px)',
            letterSpacing: '-0.03em',
            lineHeight: 0.88,
            color: 'oklch(94% 0.005 80)',
            marginBottom: 'clamp(1.5rem, 3vw, 2.5rem)',
            userSelect: 'none',
          }}
        >
          {LETTERS.map((char, i) => (
            <Letter key={i} char={char} index={i} />
          ))}
        </div>

        {/* Bottom row: tagline + CTAs */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1.5rem' }}>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1], delay: 0.85 }}
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 300,
              fontSize: 'clamp(16px, 2.2vw, 26px)',
              color: 'oklch(52% 0.008 255)',
              maxWidth: 460,
              lineHeight: 1.4,
              margin: 0,
            }}
          >
            We make culture move.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1], delay: 1.0 }}
            style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', flexWrap: 'wrap' }}
          >
            <MagneticButton href="#work" primary>See our work</MagneticButton>
            <MagneticButton href="#services">Our services</MagneticButton>
          </motion.div>
        </div>
      </div>

      {/* Vermillion bottom bar */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.4, ease: [0.23, 1, 0.32, 1], delay: 0.3 }}
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 3,
          background: 'oklch(62% 0.23 28)',
          transformOrigin: 'left',
        }}
      />
    </section>
  );
}
