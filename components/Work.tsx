'use client';

import { useRef, useState } from 'react';
import { motion, useInView, useMotionValue, useTransform, useSpring, animate } from 'motion/react';
import Image from 'next/image';

const PROJECTS = [
  {
    id: 1,
    slug: 'ghost-signal',
    title: 'Ghost Signal',
    client: 'Vessel Records x Periphery Sound',
    category: 'Album Campaign',
    result: '+340%',
    resultLabel: 'streaming in 90 days',
    img: 'https://picsum.photos/seed/ghost-signal-oblique/1400/800',
    year: '2024',
    span: 'full',
  },
  {
    id: 2,
    slug: 'melt-again',
    title: 'Melt Again',
    client: 'The Melt Festival',
    category: 'Brand Refresh',
    result: '6 days',
    resultLabel: 'to sell out',
    img: 'https://picsum.photos/seed/melt-festival-refresh-2024/800/700',
    year: '2023',
    span: 'half',
  },
  {
    id: 3,
    slug: 'ear-first',
    title: 'Ear First',
    client: 'Drift Audio',
    category: 'Product Launch',
    result: '4.2M',
    resultLabel: 'earned impressions',
    img: 'https://picsum.photos/seed/drift-audio-ear-first-launch/800/700',
    year: '2023',
    span: 'full',
  },
];

const STATS = [
  { value: 47, suffix: '', label: 'campaigns' },
  { value: 120, suffix: '+', label: 'artists & labels' },
  { value: 7, suffix: '', label: 'years active' },
  { value: 18, suffix: '', label: 'industry awards' },
];

function StatItem({ stat, delay, parentInView }: { stat: typeof STATS[0]; delay: number; parentInView: boolean }) {
  const triggered = useRef(false);
  const [display, setDisplay] = useState('0');

  if (parentInView && !triggered.current) {
    triggered.current = true;
    setTimeout(() => {
      animate(0, stat.value, {
        duration: 1.8,
        ease: [0.23, 1, 0.32, 1],
        onUpdate: (v) => setDisplay(Math.round(v).toString()),
        onComplete: () => setDisplay(stat.value.toString()),
      });
    }, delay * 1000);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={parentInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1], delay }}
    >
      <div
        style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 900,
          fontSize: 'clamp(28px, 3.5vw, 52px)',
          letterSpacing: '-0.02em',
          lineHeight: 1,
          color: 'oklch(62% 0.23 28)',
          marginBottom: 6,
        }}
      >
        {display}{stat.suffix}
      </div>
      <span
        style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 300,
          fontSize: 11,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: 'oklch(52% 0.008 255)',
        }}
      >
        {stat.label}
      </span>
    </motion.div>
  );
}

function StatPanel() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <div
      ref={ref}
      style={{
        background: 'oklch(13% 0.01 255)',
        padding: 'clamp(1.5rem, 4vw, 3rem)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        minHeight: 280,
        height: '100%',
        gap: '2rem',
      }}
    >
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 200,
          fontSize: 10,
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
          color: 'oklch(62% 0.23 28)',
          margin: 0,
        }}
      >
        By the numbers
      </motion.p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem 1.5rem' }}>
        {STATS.map((s, i) => (
          <StatItem key={s.label} stat={s} delay={0.15 + i * 0.08} parentInView={inView} />
        ))}
      </div>

      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1], delay: 0.5 }}
        style={{ height: 1, background: 'oklch(22% 0.01 255)', transformOrigin: 'left' }}
      />
    </div>
  );
}

function TiltCard({ project }: { project: typeof PROJECTS[0] }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [hovered, setHovered] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-80, 80], [5, -5]);
  const rotateY = useTransform(x, [-80, 80], [-5, 5]);
  const springRotX = useSpring(rotateX, { stiffness: 200, damping: 22 });
  const springRotY = useSpring(rotateY, { stiffness: 200, damping: 22 });

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  };
  const handleLeave = () => { x.set(0); y.set(0); setHovered(false); };

  const isLarge = project.span === 'full';

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, clipPath: 'inset(100% 0 0 0)' }}
      animate={inView ? { opacity: 1, clipPath: 'inset(0% 0 0 0)' } : {}}
      transition={{ duration: 1.0, ease: [0.23, 1, 0.32, 1] }}
      onMouseMove={handleMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleLeave}
      style={{ perspective: 800, cursor: 'pointer', height: '100%' }}
    >
      <motion.div
        style={{
          rotateX: springRotX,
          rotateY: springRotY,
          position: 'relative',
          overflow: 'hidden',
          aspectRatio: isLarge ? '16/7' : '4/3',
          height: isLarge ? undefined : '100%',
        }}
      >
        <Image
          src={project.img}
          alt={project.title}
          fill
          sizes={isLarge ? '100vw' : '(max-width: 768px) 100vw, 50vw'}
          style={{
            objectFit: 'cover',
            filter: 'grayscale(25%)',
            transition: 'transform 0.7s cubic-bezier(0.23, 1, 0.32, 1), filter 0.4s',
            transform: hovered ? 'scale(1.05)' : 'scale(1)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, oklch(5% 0.01 255 / 0.9) 0%, oklch(5% 0.01 255 / 0.25) 50%, transparent 100%)',
          }}
        />

        <div
          style={{
            position: 'absolute',
            inset: 0,
            padding: 'clamp(1.25rem, 3vw, 2.5rem)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div
              style={{
                background: 'oklch(62% 0.23 28)',
                padding: '5px 12px',
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: 9,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'oklch(9% 0.012 255)',
              }}
            >
              {project.category}
            </div>
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 200,
                fontSize: 11,
                color: 'oklch(65% 0.006 255)',
                letterSpacing: '0.1em',
              }}
            >
              {project.year}
            </span>
          </div>

          <div>
            <div
              style={{
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '1rem',
              }}
            >
              <div>
                <p
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 300,
                    fontSize: 11,
                    color: 'oklch(62% 0.23 28)',
                    margin: '0 0 4px',
                    letterSpacing: '0.05em',
                  }}
                >
                  {project.client}
                </p>
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 900,
                    fontSize: isLarge ? 'clamp(22px, 3.5vw, 48px)' : 'clamp(18px, 2.5vw, 36px)',
                    color: 'oklch(94% 0.005 80)',
                    margin: 0,
                    letterSpacing: '-0.02em',
                    lineHeight: 1,
                  }}
                >
                  {project.title}
                </h3>
              </div>
              <div style={{ textAlign: 'right' }}>
                <motion.p
                  animate={{ color: hovered ? 'oklch(80% 0.28 28)' : 'oklch(62% 0.23 28)' }}
                  transition={{ duration: 0.25 }}
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 900,
                    fontSize: isLarge ? 'clamp(22px, 3.5vw, 48px)' : 'clamp(18px, 2.5vw, 36px)',
                    margin: 0,
                    letterSpacing: '-0.02em',
                    lineHeight: 1,
                  }}
                >
                  {project.result}
                </motion.p>
                <p
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 300,
                    fontSize: 10,
                    color: 'oklch(65% 0.006 255)',
                    margin: '4px 0 0',
                    letterSpacing: '0.05em',
                  }}
                >
                  {project.resultLabel}
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Work() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section id="work" ref={ref} className="bg-void" style={{ paddingTop: '8rem', paddingBottom: '8rem' }}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            marginBottom: '3rem',
          }}
        >
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 900,
              fontSize: 'clamp(32px, 5.5vw, 88px)',
              color: 'oklch(94% 0.005 80)',
              margin: 0,
              letterSpacing: '-0.03em',
              lineHeight: 1,
            }}
          >
            Selected<br /><span style={{ color: 'oklch(62% 0.23 28)' }}>Work</span>
          </motion.h2>

          <motion.a
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            href="#contact"
            className="hidden md:block"
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
            Start a project
          </motion.a>
        </div>

        {/* Row 1: Ghost Signal — full width */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          style={{ marginBottom: '1rem' }}
        >
          <TiltCard project={PROJECTS[0]} />
        </motion.div>

        {/* Row 2: Melt Again (left) + Stats panel (right — fills the empty space) */}
        <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: '1rem', marginBottom: '1rem' }}>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1], delay: 0.1 }}
          >
            <TiltCard project={PROJECTS[1]} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1], delay: 0.18 }}
          >
            <StatPanel />
          </motion.div>
        </div>

        {/* Row 3: Ear First — full width */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1], delay: 0.2 }}
        >
          <TiltCard project={PROJECTS[2]} />
        </motion.div>
      </div>
    </section>
  );
}
