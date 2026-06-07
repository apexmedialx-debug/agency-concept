'use client';

import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'motion/react';
import { ArrowUpRight } from '@phosphor-icons/react';

const SERVICES = [
  {
    num: '01',
    title: 'Campaign Architecture',
    short: 'Structure that makes creative work matter.',
    description:
      'From brief to launch, we build campaign frameworks that give creative work its backbone. Strategy, sequencing, platform logic, and measurement. We define the skeleton; your creative teams put the flesh on.',
  },
  {
    num: '02',
    title: 'Artist & Label Strategy',
    short: 'Long-form brand building for music makers.',
    description:
      'We work with artists, labels, and management companies on the kind of brand work that takes years to get right. Career arc planning, identity systems, release strategy, and audience development. Catalog to current.',
  },
  {
    num: '03',
    title: 'Live Experience',
    short: 'Presence where streaming ends.',
    description:
      'Stages, pop-ups, and immersive activations that give a brand physical weight. We design experiences that earn press, generate content, and leave memory traces in the people who attend them.',
  },
  {
    num: '04',
    title: 'Media & Placement',
    short: 'The right story in front of the right people.',
    description:
      'Editorial strategy, tastemaker targeting, and a network built over a decade of cultural journalism. We know which journalists write what, which platforms create momentum, and how to make a story travel.',
  },
];

export default function Services() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="services" ref={ref} className="bg-void" style={{ paddingTop: '8rem', paddingBottom: '8rem' }}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '4rem', borderBottom: '1px solid oklch(22% 0.01 255)', paddingBottom: '2rem' }}>
          <motion.span
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 200,
              fontSize: 10,
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: 'oklch(62% 0.23 28)',
            }}
          >
            Services
          </motion.span>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="hidden md:block"
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 300,
              fontSize: 13,
              color: 'oklch(52% 0.008 255)',
              maxWidth: 280,
              textAlign: 'right',
              margin: 0,
              lineHeight: 1.7,
            }}
          >
            Four disciplines. One obsessive focus on cultural relevance.
          </motion.p>
        </div>

        {/* Accordion list */}
        <div>
          {SERVICES.map((s, i) => {
            const isOpen = open === i;
            return (
              <motion.div
                key={s.num}
                initial={{ opacity: 0, y: 32 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1], delay: 0.1 + i * 0.08 }}
                style={{ borderBottom: '1px solid oklch(22% 0.01 255)' }}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  style={{
                    width: '100%',
                    background: 'none',
                    border: 'none',
                    padding: '2rem 0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '2rem',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'transform 0.1s',
                  }}
                  onMouseDown={(e) => { e.currentTarget.style.transform = 'scale(0.99)'; }}
                  onMouseUp={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', flex: 1 }}>
                    <span
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontWeight: 200,
                        fontSize: 11,
                        color: 'oklch(62% 0.23 28)',
                        letterSpacing: '0.1em',
                        minWidth: 28,
                      }}
                    >
                      {s.num}
                    </span>
                    <div>
                      <span
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontWeight: isOpen ? 700 : 500,
                          fontSize: 'clamp(20px, 3vw, 36px)',
                          color: isOpen ? 'oklch(94% 0.005 80)' : 'oklch(74% 0.006 255)',
                          display: 'block',
                          letterSpacing: '-0.02em',
                          transition: 'color 0.3s, font-weight 0.3s',
                          lineHeight: 1.1,
                        }}
                      >
                        {s.title}
                      </span>
                      {!isOpen && (
                        <span
                          className="hidden md:block"
                          style={{
                            fontFamily: 'var(--font-display)',
                            fontWeight: 300,
                            fontSize: 13,
                            color: 'oklch(42% 0.008 255)',
                            marginTop: 4,
                          }}
                        >
                          {s.short}
                        </span>
                      )}
                    </div>
                  </div>

                  <motion.div
                    animate={{ rotate: isOpen ? 135 : 0 }}
                    transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                    style={{ flexShrink: 0 }}
                  >
                    <ArrowUpRight size={24} color="oklch(62% 0.23 28)" weight="regular" />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.45, ease: [0.23, 1, 0.32, 1] }}
                      style={{ overflow: 'hidden' }}
                    >
                      <div style={{ paddingBottom: '2.5rem', paddingLeft: 56 }}>
                        <p
                          style={{
                            fontFamily: 'var(--font-display)',
                            fontWeight: 300,
                            fontSize: 15,
                            lineHeight: 1.85,
                            color: 'oklch(65% 0.008 255)',
                            maxWidth: 560,
                            margin: 0,
                          }}
                        >
                          {s.description}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
