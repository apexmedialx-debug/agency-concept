## 2026-06-07 — OBLIQUE agency concept website — initial build

- Scaffolded Next.js 16 project at C:\Users\Dinis\agency-concept
- Stack: Tailwind v4 (with @theme OKLCH tokens), motion/react, @phosphor-icons/react
- Font: Unbounded (Google Fonts, variable weight 200-900) — single-family typographic voice
- Color palette: near-black void oklch(9% 0.012 255) + warm text oklch(94% 0.005 80) + vermillion accent oklch(62% 0.23 28)
- Dark theme throughout (scene: creative director on calibrated monitor, 9pm)

Components built:
- Cursor.tsx — custom spring-physics cursor with mix-blend-mode:difference inversion
- Nav.tsx — fixed nav, transparent until scroll, vermillion CTA button
- Hero.tsx — letter-by-letter stagger reveal with clip-path animation for OBLIQUE
- Manifesto.tsx — two-column asymmetric manifesto, line-by-line reveal
- Services.tsx — numbered horizontal accordion with AnimatePresence expand/collapse
- Work.tsx — editorial asymmetric case study tiles with 3D tilt (useMotionValue + useSpring)
- ClientBand.tsx — scrolling marquee with pause on hover (ONE marquee per Taste skill rule)
- Team.tsx — asymmetric 2+3 grid with bio hover reveal and color change on name
- Contact.tsx — two-column split with bottom-border form inputs, success state
- Footer.tsx — single-line minimal footer with social links

Agency details: OBLIQUE, London 2017, cultural/music/entertainment marketing
Tagline: "We make culture move."
Three fictional case studies: Ghost Signal (Vessel Records), Melt Again (The Melt), Ear First (Drift Audio)
Five team members: Sasha Okonkwo, Renata Voss, Jonah Park, Marta de Sousa, Theo Acheampong

Build passed clean. Tokens verified in compiled CSS.
Deployed to: https://agency-concept.vercel.app
GitHub: https://github.com/apexmedialx-debug/agency-concept
