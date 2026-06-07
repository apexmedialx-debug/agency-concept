'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'motion/react';
import { ArrowRight } from '@phosphor-icons/react';

const inputBase: React.CSSProperties = {
  fontFamily: 'var(--font-display)',
  fontWeight: 300,
  fontSize: 14,
  color: 'oklch(94% 0.005 80)',
  background: 'transparent',
  border: 'none',
  borderBottom: '1px solid oklch(22% 0.01 255)',
  padding: '14px 0',
  width: '100%',
  outline: 'none',
  transition: 'border-color 0.25s',
};

const labelBase: React.CSSProperties = {
  fontFamily: 'var(--font-display)',
  fontWeight: 200,
  fontSize: 10,
  letterSpacing: '0.25em',
  textTransform: 'uppercase',
  color: 'oklch(52% 0.008 255)',
  display: 'block',
  marginBottom: 4,
};

export default function Contact() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const focus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    e.target.style.borderColor = 'oklch(62% 0.23 28)';
  };
  const blur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    e.target.style.borderColor = 'oklch(22% 0.01 255)';
  };

  return (
    <section id="contact" ref={ref} className="bg-void" style={{ paddingTop: '9rem', paddingBottom: '9rem' }}>
      <div className="max-w-7xl mx-auto px-6">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '5rem' }} className="lg:grid-cols-[1fr_1.1fr]">

          {/* Left: heading + details */}
          <div>
            <div style={{ overflow: 'hidden' }}>
              <motion.h2
                initial={{ y: '110%' }}
                animate={inView ? { y: '0%' } : {}}
                transition={{ duration: 0.9, ease: [0.23, 1, 0.32, 1] }}
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 900,
                  fontSize: 'clamp(52px, 9vw, 120px)',
                  letterSpacing: '-0.03em',
                  lineHeight: 0.92,
                  color: 'oklch(94% 0.005 80)',
                  margin: '0 0 2rem',
                }}
              >
                Let's<br />
                <span style={{ color: 'oklch(62% 0.23 28)' }}>talk.</span>
              </motion.h2>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 300,
                fontSize: 15,
                lineHeight: 1.8,
                color: 'oklch(52% 0.008 255)',
                maxWidth: 380,
                margin: '0 0 3rem',
              }}
            >
              We work with labels, artists, brands, and festivals who believe culture is worth taking seriously. If that's you, we'd like to hear from you.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.35 }}
              style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}
            >
              {[
                { label: 'Email', val: 'hello@oblique.studio' },
                { label: 'Address', val: 'Bermondsey, London SE1' },
                { label: 'New business', val: 'new@oblique.studio' },
              ].map((item) => (
                <div key={item.label} style={{ display: 'flex', gap: '1.5rem', alignItems: 'baseline', borderBottom: '1px solid oklch(22% 0.01 255)', paddingBottom: '1.25rem' }}>
                  <span style={{ fontFamily: 'var(--font-display)', fontWeight: 200, fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'oklch(62% 0.23 28)', minWidth: 70 }}>
                    {item.label}
                  </span>
                  <span style={{ fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: 14, color: 'oklch(74% 0.006 255)' }}>
                    {item.val}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.23, 1, 0.32, 1], delay: 0.15 }}
          >
            {submitted ? (
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', minHeight: 400, gap: '1.5rem' }}>
                <div
                  style={{
                    width: 56,
                    height: 56,
                    border: '1px solid oklch(62% 0.23 28)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <ArrowRight size={24} color="oklch(62% 0.23 28)" />
                </div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 32, color: 'oklch(94% 0.005 80)', margin: 0, letterSpacing: '-0.02em' }}>
                  Message received.
                </h3>
                <p style={{ fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: 14, color: 'oklch(52% 0.008 255)', margin: 0, lineHeight: 1.7 }}>
                  We'll be in touch within 48 hours. If it's urgent, email us directly at hello@oblique.studio.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem 2rem' }}>
                  <div>
                    <label style={labelBase}>Name</label>
                    <input type="text" required style={inputBase} onFocus={focus} onBlur={blur} />
                  </div>
                  <div>
                    <label style={labelBase}>Email</label>
                    <input type="email" required style={inputBase} onFocus={focus} onBlur={blur} />
                  </div>
                </div>

                <div>
                  <label style={labelBase}>What are you working on?</label>
                  <select required style={{ ...inputBase, cursor: 'pointer' }} onFocus={focus} onBlur={blur}>
                    <option value="">Select...</option>
                    <option value="album">Album / EP campaign</option>
                    <option value="festival">Festival / live event</option>
                    <option value="brand">Brand launch</option>
                    <option value="strategy">Strategy retainer</option>
                    <option value="other">Something else</option>
                  </select>
                </div>

                <div>
                  <label style={labelBase}>Tell us more</label>
                  <textarea
                    required
                    rows={5}
                    style={{ ...inputBase, resize: 'none' }}
                    onFocus={focus}
                    onBlur={blur}
                  />
                </div>

                <button
                  type="submit"
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 700,
                    fontSize: 11,
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    color: 'oklch(9% 0.012 255)',
                    background: 'oklch(62% 0.23 28)',
                    border: 'none',
                    padding: '18px 40px',
                    cursor: 'pointer',
                    alignSelf: 'flex-start',
                    transition: 'background 0.2s, transform 0.1s',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = 'oklch(72% 0.23 28)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'oklch(62% 0.23 28)'; }}
                  onMouseDown={(e) => { e.currentTarget.style.transform = 'scale(0.97)'; }}
                  onMouseUp={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
                >
                  Send message
                  <ArrowRight size={16} />
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
