'use client';

import { useEffect, useState } from 'react';
import { motion } from 'motion/react';

const LINKS = [
  { label: 'Work', href: '#work' },
  { label: 'Services', href: '#services' },
  { label: 'Team', href: '#team' },
  { label: 'Contact', href: '#contact' },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
      className="fixed top-0 left-0 right-0 z-50 transition-colors duration-500"
      style={{
        backgroundColor: scrolled ? 'oklch(9% 0.012 255 / 0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid oklch(22% 0.01 255)' : '1px solid transparent',
      }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between" style={{ height: 72 }}>
          <a
            href="#"
            style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 18, letterSpacing: '-0.02em', color: 'oklch(94% 0.005 80)', textDecoration: 'none' }}
          >
            OBLIQUE
          </a>

          <nav className="hidden md:flex items-center gap-10">
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="group relative overflow-hidden"
                style={{ fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'oklch(52% 0.008 255)', textDecoration: 'none', transition: 'color 0.25s' }}
                onMouseEnter={(e) => { e.currentTarget.style.color = 'oklch(94% 0.005 80)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = 'oklch(52% 0.008 255)'; }}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <a
            href="#contact"
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: 11,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'oklch(9% 0.012 255)',
              background: 'oklch(62% 0.23 28)',
              padding: '10px 22px',
              textDecoration: 'none',
              transition: 'background 0.2s',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'oklch(72% 0.23 28)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'oklch(62% 0.23 28)'; }}
            onMouseDown={(e) => { e.currentTarget.style.transform = 'scale(0.97)'; }}
            onMouseUp={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
          >
            Start a project
          </a>
        </div>
      </div>
    </motion.header>
  );
}
