import { lazy, Suspense } from 'react'
import { motion } from 'framer-motion'

const BubbleScene = lazy(() => import('../three/BubbleScene'))

const NAME = 'Nixon Siagian'

/* Character-by-character animated heading */
function AnimatedName() {
  return (
    <h1
      className="font-display font-extrabold leading-none mb-5 overflow-hidden"
      aria-label={NAME}
    >
      <span
        className="block"
        style={{ fontSize: 'clamp(3.2rem, 9.5vw, 8.8rem)', color: 'var(--text-1)' }}
      >
        {NAME.split('').map((char, i) => (
          <motion.span
            key={i}
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 0.75,
              delay: 0.45 + i * 0.028,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="inline-block"
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        ))}
      </span>
    </h1>
  )
}

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* ── 3D Canvas background ── */}
      <div className="absolute inset-0 z-0">
        <Suspense fallback={null}>
          <BubbleScene />
        </Suspense>
      </div>

      {/* ── Radial vignette: darkens edges so text is readable ── */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 75% 65% at 52% 50%, transparent 35%, #07070D 90%)',
        }}
      />

      {/* ── Bottom fade to next section ── */}
      <div
        className="absolute bottom-0 inset-x-0 h-56 z-0 pointer-events-none"
        style={{ background: 'linear-gradient(to top, #07070D 0%, transparent 100%)' }}
      />

      {/* ── Ambient left gradient (colour accent) ── */}
      <div
        className="absolute left-0 top-0 bottom-0 w-1/3 z-0 pointer-events-none opacity-20"
        style={{
          background:
            'radial-gradient(ellipse at left center, rgba(192,164,124,0.18) 0%, transparent 70%)',
        }}
      />

      {/* ── Text content ── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-10 pt-24 pb-16">
        <div className="max-w-3xl">

          {/* Status badge */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2.5 glass px-4 py-2 rounded-full mb-8"
          >
            <span
              className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ background: 'var(--accent)' }}
            />
            <span
              className="font-body text-[11px] tracking-[0.16em] uppercase"
              style={{ color: 'var(--text-2)' }}
            >
              Available for work
            </span>
          </motion.div>

          {/* Name */}
          <AnimatedName />

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.92, ease: [0.22, 1, 0.36, 1] }}
            className="font-body font-light mb-3"
            style={{
              fontSize: 'clamp(1.05rem, 2.4vw, 1.55rem)',
              color: 'var(--text-2)',
              maxWidth: '500px',
            }}
          >
            Crafting modern digital experiences
          </motion.p>

          {/* Since year */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.05, ease: [0.22, 1, 0.36, 1] }}
            className="font-body text-xs tracking-[0.18em] uppercase mb-11"
            style={{ color: 'var(--text-3)' }}
          >
            Developer since 2020
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.18, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-wrap gap-3"
          >
            <button
              onClick={() =>
                document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })
              }
              className="font-body font-medium text-sm px-7 py-3.5 rounded-2xl transition-all duration-200 hover:scale-[1.03] active:scale-[0.97]"
              style={{ background: 'var(--accent)', color: 'var(--bg)' }}
            >
              View Work
            </button>
            <button
              onClick={() =>
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
              }
              className="glass font-body font-medium text-sm px-7 py-3.5 rounded-2xl transition-all duration-200 hover:scale-[1.03] active:scale-[0.97]"
              style={{ color: 'var(--text-1)' }}
              onMouseEnter={e =>
                (e.currentTarget.style.background = 'rgba(255,255,255,0.06)')
              }
              onMouseLeave={e =>
                (e.currentTarget.style.background = '')
              }
            >
              Get in Touch
            </button>
          </motion.div>

        </div>
      </div>

      {/* ── Scroll cue ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 1.2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span
          className="font-body text-[10px] tracking-[0.2em] uppercase"
          style={{ color: 'var(--text-3)' }}
        >
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ repeat: Infinity, duration: 1.9, ease: 'easeInOut' }}
          className="w-px h-8"
          style={{
            background: 'linear-gradient(to bottom, var(--text-3), transparent)',
          }}
        />
      </motion.div>
    </section>
  )
}
