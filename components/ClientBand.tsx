'use client';

import { useRef, useEffect } from 'react';
import { motion, useAnimationControls } from 'motion/react';

const CLIENTS = [
  'Vessel Records',
  'Periphery Sound',
  'The Melt',
  'Coda Spirits',
  'Bureau Textiles',
  'Drift Audio',
];

export default function ClientBand() {
  const controls = useAnimationControls();
  const isPaused = useRef(false);

  useEffect(() => {
    controls.start({
      x: [0, -50 * (CLIENTS.length)],
      transition: {
        duration: CLIENTS.length * 4,
        ease: 'linear',
        repeat: Infinity,
      },
    });
  }, [controls]);

  const pause = () => {
    isPaused.current = true;
    controls.stop();
  };
  const resume = () => {
    if (!isPaused.current) return;
    isPaused.current = false;
    controls.start({
      x: [null, -50 * CLIENTS.length],
      transition: { duration: CLIENTS.length * 2, ease: 'linear', repeat: Infinity },
    });
  };

  return (
    <section
      className="bg-surface overflow-hidden"
      style={{ paddingTop: '3rem', paddingBottom: '3rem', borderTop: '1px solid oklch(22% 0.01 255)', borderBottom: '1px solid oklch(22% 0.01 255)' }}
      onMouseEnter={pause}
      onMouseLeave={resume}
    >
      <div style={{ display: 'flex', overflow: 'hidden', userSelect: 'none' }}>
        {[...Array(3)].map((_, rep) => (
          <motion.div
            key={rep}
            animate={controls}
            style={{ display: 'flex', flexShrink: 0, alignItems: 'center' }}
          >
            {CLIENTS.map((client, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '3rem',
                  padding: '0 3rem',
                  whiteSpace: 'nowrap',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 700,
                    fontSize: 'clamp(18px, 2vw, 26px)',
                    letterSpacing: '-0.01em',
                    color: 'oklch(74% 0.006 255)',
                    transition: 'color 0.2s',
                  }}
                >
                  {client}
                </span>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'oklch(62% 0.23 28)', flexShrink: 0, display: 'block' }} />
              </div>
            ))}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
