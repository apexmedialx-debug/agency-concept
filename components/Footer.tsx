'use client';

import { motion } from 'motion/react';

export default function Footer() {
  return (
    <footer
      className="bg-void"
      style={{ borderTop: '1px solid oklch(22% 0.01 255)', paddingTop: '2rem', paddingBottom: '2rem' }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 16, letterSpacing: '-0.02em', color: 'oklch(94% 0.005 80)' }}>
            OBLIQUE
          </span>

          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: 11, color: 'oklch(35% 0.008 255)', letterSpacing: '0.05em' }}>
            Cultural Marketing Agency, London. Est. 2017
          </span>

          <div style={{ display: 'flex', gap: '2rem' }}>
            {['Instagram', 'LinkedIn', 'Spotify'].map((s) => (
              <a
                key={s}
                href="#"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 400,
                  fontSize: 10,
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: 'oklch(42% 0.008 255)',
                  textDecoration: 'none',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.color = 'oklch(62% 0.23 28)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = 'oklch(42% 0.008 255)'; }}
              >
                {s}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
