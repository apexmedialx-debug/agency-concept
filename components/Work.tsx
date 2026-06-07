'use client';

import { useRef } from 'react';
import { motion, useInView, useMotionValue, useTransform, useSpring } from 'motion/react';
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
    desc: 'A multi-platform campaign built around a fictional transmission. Vinyl, AR, editorial, and a listening event in a disused radio tower.',
    img: 'https://picsum.photos/seed/ghost-signal-oblique/1200/800',
    year: '2024',
    large: true,
  },
  {
    id: 2,
    slug: 'melt-again',
    title: 'Melt Again',
    client: 'The Melt Festival',
    category: 'Brand Refresh',
    result: '6 days',
    resultLabel: 'to sell out',
    desc: 'Complete brand refresh and campaign for a 14-year-old festival that had grown invisible. New identity, new story, same field.',
    img: 'https://picsum.photos/seed/melt-festival-refresh-2024/1200/800',
    year: '2023',
    large: false,
  },
  {
    id: 3,
    slug: 'ear-first',
    title: 'Ear First',
    client: 'Drift Audio',
    category: 'Product Launch',
    result: '4.2M',
    resultLabel: 'earned impressions, week one',
    desc: 'Three-city immersive listening experience celebrating the art of focus. Each city, one room, twenty listeners at a time.',
    img: 'https://picsum.photos/seed/drift-audio-ear-first-launch/1200/800',
    year: '2023',
    large: true,
  },
];

function TiltCard({ project }: { project: (typeof PROJECTS)[0] }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-80, 80], [6, -6]);
  const rotateY = useTransform(x, [-80, 80], [-6, 6]);
  const springRotX = useSpring(rotateX, { stiffness: 200, damping: 20 });
  const springRotY = useSpring(rotateY, { stiffness: 200, damping: 20 });

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  };
  const handleLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, clipPath: 'inset(100% 0 0 0)' }}
      animate={inView ? { opacity: 1, clipPath: 'inset(0% 0 0 0)' } : {}}
      transition={{ duration: 1.0, ease: [0.23, 1, 0.32, 1] }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{
        perspective: 800,
        cursor: 'pointer',
        gridColumn: project.large ? '1 / -1' : undefined,
      }}
    >
      <motion.div
        style={{
          rotateX: springRotX,
          rotateY: springRotY,
          position: 'relative',
          overflow: 'hidden',
          aspectRatio: project.large ? '16/7' : '4/3',
        }}
        className="group"
      >
        <Image
          src={project.img}
          alt={project.title}
          fill
          sizes="(max-width: 1024px) 100vw, 70vw"
          style={{ objectFit: 'cover', transition: 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)' }}
          className="group-hover:scale-[1.04]"
        />
        {/* Dark overlay */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, oklch(5% 0.01 255 / 0.88) 0%, oklch(5% 0.01 255 / 0.2) 50%, transparent 100%)' }} />

        {/* Content overlay */}
        <div style={{ position: 'absolute', inset: 0, padding: '2.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          {/* Top */}
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

          {/* Bottom */}
          <div>
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <p style={{ fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: 12, color: 'oklch(62% 0.23 28)', margin: '0 0 4px', letterSpacing: '0.05em' }}>
                  {project.client}
                </p>
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 900,
                    fontSize: 'clamp(28px, 4vw, 52px)',
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
                <p style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 'clamp(28px, 4vw, 52px)', color: 'oklch(62% 0.23 28)', margin: 0, letterSpacing: '-0.02em', lineHeight: 1 }}>
                  {project.result}
                </p>
                <p style={{ fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: 11, color: 'oklch(65% 0.006 255)', margin: '4px 0 0', letterSpacing: '0.05em' }}>
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
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem' }}>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 900,
              fontSize: 'clamp(36px, 6vw, 88px)',
              color: 'oklch(94% 0.005 80)',
              margin: 0,
              letterSpacing: '-0.03em',
              lineHeight: 1,
            }}
          >
            Selected<br />
            <span style={{ color: 'oklch(62% 0.23 28)' }}>Work</span>
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

        {/* Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
          {PROJECTS.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1], delay: i * 0.1 }}
              style={{ gridColumn: p.large ? '1 / -1' : undefined }}
            >
              <TiltCard project={p} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
