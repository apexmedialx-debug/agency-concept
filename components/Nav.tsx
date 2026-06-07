'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { List, X } from '@phosphor-icons/react';

const LINKS = [
  { label: 'Work', href: '#work' },
  { label: 'Services', href: '#services' },
  { label: 'Team', href: '#team' },
  { label: 'Contact', href: '#contact' },
];

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

function ScrambleLink({ label, href, onClick }: { label: string; href: string; onClick?: () => void }) {
  const [display, setDisplay] = useState(label);
  const timerRef = useRef<ReturnType<typeof setInterval>>();

  const scramble = useCallback(() => {
    clearInterval(timerRef.current);
    let iter = 0;
    timerRef.current = setInterval(() => {
      setDisplay(
        label.split('').map((_, i) => {
          if (i < iter) return label[i];
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        }).join('')
      );
      iter += 0.55;
      if (iter >= label.length) {
        clearInterval(timerRef.current);
        setDisplay(label);
      }
    }, 28);
  }, [label]);

  useEffect(() => () => clearInterval(timerRef.current), []);

  return (
    <a
      href={href}
      onClick={onClick}
      onMouseEnter={scramble}
      style={{
        fontFamily: 'var(--font-display)',
        fontWeight: 400,
        fontSize: 12,
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        color: 'oklch(52% 0.008 255)',
        textDecoration: 'none',
        transition: 'color 0.25s',
        fontVariantNumeric: 'tabular-nums',
      }}
      onFocus={() => scramble()}
    >
      {display}
    </a>
  );
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const close = () => setMenuOpen(false);

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
        className="fixed top-0 left-0 right-0 z-50 transition-colors duration-500"
        style={{
          backgroundColor: scrolled || menuOpen ? 'oklch(9% 0.012 255 / 0.96)' : 'transparent',
          backdropFilter: scrolled || menuOpen ? 'blur(12px)' : 'none',
          borderBottom: scrolled ? '1px solid oklch(22% 0.01 255)' : '1px solid transparent',
        }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between" style={{ height: 68 }}>
            <a
              href="#"
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 900,
                fontSize: 16,
                letterSpacing: '-0.02em',
                color: 'oklch(94% 0.005 80)',
                textDecoration: 'none',
              }}
            >
              OBLIQUE
            </a>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-10">
              {LINKS.map((link) => (
                <ScrambleLink key={link.href} label={link.label} href={link.href} />
              ))}
            </nav>

            <div className="flex items-center gap-4">
              <a
                href="#contact"
                className="hidden md:inline-block"
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
                  transition: 'background 0.2s, transform 0.1s',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'oklch(72% 0.23 28)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'oklch(62% 0.23 28)'; }}
                onMouseDown={(e) => { e.currentTarget.style.transform = 'scale(0.97)'; }}
                onMouseUp={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
              >
                Start a project
              </a>

              {/* Hamburger (mobile only) */}
              <button
                className="md:hidden"
                onClick={() => setMenuOpen((v) => !v)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'oklch(94% 0.005 80)',
                  padding: 4,
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                {menuOpen ? <X size={22} weight="regular" /> : <List size={22} weight="regular" />}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-2"
            style={{ background: 'oklch(9% 0.012 255 / 0.97)', backdropFilter: 'blur(12px)' }}
          >
            {LINKS.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 16 }}
                transition={{ delay: i * 0.06, ease: [0.23, 1, 0.32, 1], duration: 0.5 }}
              >
                <a
                  href={link.href}
                  onClick={close}
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 900,
                    fontSize: 'clamp(36px, 8vw, 60px)',
                    letterSpacing: '-0.02em',
                    color: 'oklch(94% 0.005 80)',
                    textDecoration: 'none',
                    display: 'block',
                    padding: '0.5rem 2rem',
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = 'oklch(62% 0.23 28)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = 'oklch(94% 0.005 80)'; }}
                >
                  {link.label}
                </a>
              </motion.div>
            ))}
            <motion.a
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35 }}
              href="#contact"
              onClick={close}
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: 12,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: 'oklch(9% 0.012 255)',
                background: 'oklch(62% 0.23 28)',
                padding: '14px 36px',
                textDecoration: 'none',
                marginTop: '1.5rem',
              }}
            >
              Start a project
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
