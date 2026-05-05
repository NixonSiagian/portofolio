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
            'radial-gradient(ellipse 65% 60% at 50% 40%, rgba(255,255,255,0.04) 0%, transparent 60%)',
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 55% 65% at 80% 40%, rgba(139,175,201,0.18), transparent 70%)',
          opacity: 0.35,
        }}
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-10 pt-28 pb-20">
        <div className="grid lg:grid-cols-[1.08fr_0.92fr] items-center gap-12 lg:gap-16">
          <div className="max-w-xl">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex items-center gap-3 glass px-4 py-2 rounded-full mb-7"
            >
              <span
                className="w-1.5 h-1.5 rounded-full animate-pulse"
                style={{ background: 'var(--accent)' }}
              />
              <span
                className="font-body text-[11px] tracking-[0.2em] uppercase"
                style={{ color: 'var(--text-2)' }}
              >
                Nixon Siagian — Developer / Programmer
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="font-display font-semibold leading-[1.02] mb-6"
              style={{
                fontSize: 'clamp(2.8rem, 6.8vw, 5.6rem)',
                color: 'var(--text-1)',
              }}
            >
              Crafting modern digital experiences
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="font-body text-sm tracking-[0.2em] uppercase mb-10"
              style={{ color: 'var(--text-3)' }}
            >
              Developer since 2020
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
                Contact
              </button>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative h-[50vh] sm:h-[58vh] lg:h-[70vh] w-full"
          >
            <div
              className="absolute -inset-6 rounded-[36px] opacity-60 pointer-events-none"
              style={{
                background:
                  'radial-gradient(ellipse at center, rgba(192,164,124,0.18), transparent 70%)',
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
        className="absolute bottom-10 left-10 z-10 hidden md:flex flex-col items-start gap-2"
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
