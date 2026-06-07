'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'motion/react';
import Image from 'next/image';

const MEMBERS = [
  {
    name: 'Sasha Okonkwo',
    role: 'Co-Founder, Creative Director',
    bio: 'Former creative lead at XL Recordings. Previously on the Mercury Prize selection committee. Obsessed with the space between a brief and an idea.',
    img: 'https://picsum.photos/seed/sasha-okonkwo-oblique/600/700',
  },
  {
    name: 'Renata Voss',
    role: 'Co-Founder, Strategy',
    bio: 'Head of Brand Strategy at Atlantic Records for six years. Goldsmiths lecturer in cultural marketing. Believes every campaign starts with a sociology question.',
    img: 'https://picsum.photos/seed/renata-voss-oblique/600/700',
  },
  {
    name: 'Jonah Park',
    role: 'Head of Campaign Architecture',
    bio: 'A decade at AKQA before joining Oblique in 2019. Builds the systems that allow creative ideas to scale without breaking.',
    img: 'https://picsum.photos/seed/jonah-park-oblique/600/700',
  },
  {
    name: 'Marta de Sousa',
    role: 'Head of Live Experience',
    bio: 'Theatre designer turned brand activator. Creates physical spaces that feel like they could only have existed once, in one place.',
    img: 'https://picsum.photos/seed/marta-de-sousa-oblique/600/700',
  },
  {
    name: 'Theo Acheampong',
    role: 'Media Director',
    bio: 'Former editor at Clash Magazine and music editor at The Guardian. The most well-read person in any room.',
    img: 'https://picsum.photos/seed/theo-acheampong-oblique/600/700',
  },
];

function MemberCard({ member, delay }: { member: (typeof MEMBERS)[0]; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, ease: [0.23, 1, 0.32, 1], delay }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      data-cursor-grow
      style={{ cursor: 'pointer' }}
    >
      <div style={{ position: 'relative', overflow: 'hidden', aspectRatio: '3/4' }}>
        <Image
          src={member.img}
          alt={member.name}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          style={{
            objectFit: 'cover',
            transition: 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)',
            transform: hovered ? 'scale(1.06)' : 'scale(1)',
            filter: hovered ? 'grayscale(0%)' : 'grayscale(30%)',
          }}
        />
        {/* Hover overlay with bio */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          style={{
            position: 'absolute',
            inset: 0,
            background: 'oklch(9% 0.012 255 / 0.88)',
            display: 'flex',
            alignItems: 'flex-end',
            padding: '1.5rem',
          }}
        >
          <motion.p
            initial={{ y: 16, opacity: 0 }}
            animate={{ y: hovered ? 0 : 16, opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 300,
              fontSize: 13,
              lineHeight: 1.75,
              color: 'oklch(74% 0.006 255)',
              margin: 0,
            }}
          >
            {member.bio}
          </motion.p>
        </motion.div>
      </div>

      <div style={{ paddingTop: '1rem' }}>
        <p
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: 15,
            color: hovered ? 'oklch(62% 0.23 28)' : 'oklch(94% 0.005 80)',
            margin: '0 0 3px',
            letterSpacing: '-0.01em',
            transition: 'color 0.25s',
          }}
        >
          {member.name}
        </p>
        <p
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 300,
            fontSize: 11,
            color: 'oklch(52% 0.008 255)',
            margin: 0,
            letterSpacing: '0.05em',
          }}
        >
          {member.role}
        </p>
      </div>
    </motion.div>
  );
}

export default function Team() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section id="team" ref={ref} className="bg-surface" style={{ paddingTop: '8rem', paddingBottom: '8rem' }}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '4rem' }}>
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
            The Team
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
              maxWidth: 300,
              textAlign: 'right',
              margin: 0,
              lineHeight: 1.7,
            }}
          >
            Five people with strong opinions and the restraint to not always say them.
          </motion.p>
        </div>

        {/* Asymmetric grid: 2 + 3 */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '2rem' }} className="md:grid-cols-[1.2fr_1fr_1fr]">
          {/* First two larger */}
          {MEMBERS.slice(0, 2).map((m, i) => (
            <MemberCard key={m.name} member={m} delay={i * 0.08} />
          ))}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem', marginTop: '2rem' }}>
          {MEMBERS.slice(2).map((m, i) => (
            <MemberCard key={m.name} member={m} delay={0.2 + i * 0.08} />
          ))}
        </div>
      </div>
    </section>
  );
}
