'use client';

import { useRef } from 'react';
import { motion, useInView } from 'motion/react';

const LINES = [
  "The best campaigns",
  "don't chase culture.",
  "They create it.",
];

export default function Manifesto() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-120px' });

  return (
    <section
      ref={ref}
      className="bg-surface"
      style={{ paddingTop: '9rem', paddingBottom: '9rem', overflow: 'hidden' }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '3rem' }} className="lg:grid-cols-[1fr_2fr]">
          {/* Left: meta */}
          <div style={{ paddingTop: '0.5rem' }}>
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
            >
              <div style={{ width: 1, height: 60, background: 'oklch(62% 0.23 28)', marginBottom: '1.5rem' }} />
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 200,
                  fontSize: 10,
                  letterSpacing: '0.3em',
                  textTransform: 'uppercase',
                  color: 'oklch(52% 0.008 255)',
                  display: 'block',
                  marginBottom: '1rem',
                }}
              >
                Our Manifesto
              </span>
              <p
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 300,
                  fontSize: 13,
                  lineHeight: 1.9,
                  color: 'oklch(52% 0.008 255)',
                  maxWidth: 220,
                }}
              >
                Founded in London, 2017. Seven years of campaigns that moved audiences before they knew they were being moved.
              </p>
            </motion.div>
          </div>

          {/* Right: huge manifesto text */}
          <div>
            {LINES.map((line, i) => (
              <div key={i} style={{ overflow: 'hidden' }}>
                <motion.p
                  initial={{ y: '110%', opacity: 0 }}
                  animate={inView ? { y: '0%', opacity: 1 } : {}}
                  transition={{
                    duration: 1.0,
                    ease: [0.23, 1, 0.32, 1],
                    delay: 0.15 + i * 0.1,
                  }}
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: i === 2 ? 900 : 300,
                    fontSize: 'clamp(36px, 5.5vw, 80px)',
                    lineHeight: 1.05,
                    color: i === 2 ? 'oklch(62% 0.23 28)' : 'oklch(94% 0.005 80)',
                    margin: 0,
                    letterSpacing: '-0.02em',
                  }}
                >
                  {line}
                </motion.p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
