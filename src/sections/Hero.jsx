import { lazy, Suspense } from 'react'
import { motion } from 'framer-motion'

const LanguageScene = lazy(() => import('../three/LanguageScene'))

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 45% 35%, rgba(255,255,255,0.06) 0%, transparent 62%)',
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 60% at 80% 38%, rgba(123,182,255,0.22), transparent 68%)',
          opacity: 0.4,
        }}
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-10 pt-32 pb-20 md:pt-40 md:pb-24">
        <div className="grid lg:grid-cols-[1.05fr_0.95fr] items-center gap-12 lg:gap-20">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex items-center gap-3 glass px-4 py-2 rounded-full mb-8"
            >
              <span
                className="w-1.5 h-1.5 rounded-full animate-pulse"
                style={{ background: 'var(--accent)' }}
              />
              <span
                className="font-body text-[11px] tracking-[0.2em] uppercase"
                style={{ color: 'var(--text-2)' }}
              >
                Nixon Siagian — Creative Developer
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="font-display font-semibold leading-[1.02] mb-6"
              style={{
                fontSize: 'clamp(2.9rem, 7vw, 6.1rem)',
                color: 'var(--text-1)',
              }}
            >
              Cinematic digital products, engineered to feel effortless.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="font-body text-base md:text-lg leading-relaxed max-w-xl mb-10"
              style={{ color: 'var(--text-2)' }}
            >
              I craft premium interfaces across web, iOS, and tooling — blending surgical typography,
              smooth motion, and systems-level precision.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.42, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-wrap gap-3"
            >
              <button
                onClick={() =>
                  document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })
                }
                className="font-body font-medium text-sm px-7 py-3.5 rounded-2xl transition-all duration-200 hover:scale-[1.03] active:scale-[0.97]"
                style={{ background: 'var(--accent)', color: 'var(--bg)' }}
              >
                View Selected Work
              </button>
              <button
                onClick={() =>
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
                }
                className="glass font-body font-medium text-sm px-7 py-3.5 rounded-2xl transition-all duration-200 hover:scale-[1.03] active:scale-[0.97]"
                style={{ color: 'var(--text-1)' }}
                onMouseEnter={e =>
                  (e.currentTarget.style.background = 'rgba(255,255,255,0.08)')
                }
                onMouseLeave={e =>
                  (e.currentTarget.style.background = '')
                }
              >
                Let&apos;s Talk
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="mt-10 flex flex-wrap gap-6 text-xs uppercase tracking-[0.22em]"
              style={{ color: 'var(--text-3)' }}
            >
              <span>Available for select collaborations</span>
              <span className="hidden sm:inline">Based in Indonesia</span>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative h-[52vh] sm:h-[62vh] lg:h-[74vh] w-full"
          >
            <div
              className="absolute -inset-6 rounded-[40px] opacity-70 pointer-events-none"
              style={{
                background:
                  'radial-gradient(ellipse at center, rgba(213,185,138,0.22), transparent 70%)',
              }}
            />
            <div className="glass-card w-full h-full">
              <Suspense fallback={null}>
                <LanguageScene className="absolute inset-0" />
              </Suspense>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1.2 }}
        className="absolute bottom-10 left-8 z-10 hidden md:flex flex-col items-start gap-2"
      >
        <span
          className="font-body text-[10px] tracking-[0.2em] uppercase"
          style={{ color: 'var(--text-3)' }}
        >
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2.1, ease: 'easeInOut' }}
          className="w-px h-10"
          style={{
            background: 'linear-gradient(to bottom, var(--text-3), transparent)',
          }}
        />
      </motion.div>
    </section>
  )
}
