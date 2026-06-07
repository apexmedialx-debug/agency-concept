'use client';

import { useRef } from 'react';
import { motion } from 'motion/react';

const LETTERS = ['O', 'B', 'L', 'I', 'Q', 'U', 'E'];

function Letter({ char, index }: { char: string; index: number }) {
  return (
    <span style={{ display: 'inline-block', overflow: 'hidden', lineHeight: 0.9 }}>
      <motion.span
        display="inline-block"
        initial={{ y: '110%', opacity: 0 }}
        animate={{ y: '0%', opacity: 1 }}
        transition={{
          duration: 0.9,
          ease: [0.23, 1, 0.32, 1],
          delay: 0.1 + index * 0.06,
        }}
        style={{ display: 'inline-block' }}
      >
        {char}
      </motion.span>
    </span>
  );
}

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden bg-void"
      style={{ minHeight: '100dvh', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}
    >
      {/* Top-right meta label */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.0 }}
        style={{
          position: 'absolute',
          top: 96,
          right: 32,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          gap: 8,
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 200,
            fontSize: 10,
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color: 'oklch(52% 0.008 255)',
          }}
        >
          Cultural Marketing
        </span>
        <span
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 200,
            fontSize: 10,
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color: 'oklch(52% 0.008 255)',
          }}
        >
          London, Est. 2017
        </span>
        <div style={{ width: 1, height: 48, background: 'oklch(22% 0.01 255)', marginTop: 8 }} />
      </motion.div>

      {/* Vertical accent line left */}
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1], delay: 0.2 }}
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
      <div className="max-w-7xl mx-auto px-6 w-full" style={{ paddingBottom: '5rem' }}>
        {/* Massive headline */}
        <div
          aria-label="OBLIQUE"
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 900,
            fontSize: 'clamp(72px, 14vw, 220px)',
            letterSpacing: '-0.03em',
            lineHeight: 0.88,
            color: 'oklch(94% 0.005 80)',
            marginBottom: '2.5rem',
            userSelect: 'none',
          }}
        >
          {LETTERS.map((char, i) => (
            <Letter key={i} char={char} index={i} />
          ))}
        </div>

        {/* Bottom row: tagline left, CTA right */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '2rem' }}>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1], delay: 0.85 }}
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 300,
              fontSize: 'clamp(18px, 2.5vw, 28px)',
              color: 'oklch(52% 0.008 255)',
              maxWidth: 480,
              lineHeight: 1.35,
              margin: 0,
            }}
          >
            We make culture move.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1], delay: 1.0 }}
            style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}
          >
            <a
              href="#work"
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: 11,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: 'oklch(9% 0.012 255)',
                background: 'oklch(62% 0.23 28)',
                padding: '16px 36px',
                textDecoration: 'none',
                transition: 'background 0.2s, transform 0.1s',
                display: 'inline-block',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'oklch(72% 0.23 28)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'oklch(62% 0.23 28)'; }}
              onMouseDown={(e) => { e.currentTarget.style.transform = 'scale(0.97)'; }}
              onMouseUp={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
            >
              See our work
            </a>
            <a
              href="#services"
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 400,
                fontSize: 11,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: 'oklch(52% 0.008 255)',
                textDecoration: 'none',
                borderBottom: '1px solid oklch(22% 0.01 255)',
                paddingBottom: 2,
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = 'oklch(94% 0.005 80)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = 'oklch(52% 0.008 255)'; }}
            >
              Our services
            </a>
          </motion.div>
        </div>
      </div>

      {/* Animated vermillion accent bottom bar */}
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
