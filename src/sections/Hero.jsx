import { lazy, Suspense } from 'react'
import { motion } from 'framer-motion'

const LanguageScene = lazy(() => import('../three/LanguageScene'))

const FADE_UP = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] },
})

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen overflow-hidden">
      {/* Grid overlay */}
      <div className="grid-overlay opacity-40" />

      {/* Ambient lighting orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-0 left-1/4 w-[600px] h-[400px] rounded-full opacity-30"
          style={{ background: 'radial-gradient(ellipse, rgba(213,185,138,0.18) 0%, transparent 65%)', filter: 'blur(40px)' }}
        />
        <div
          className="absolute top-10 right-0 w-[500px] h-[500px] rounded-full opacity-30"
          style={{ background: 'radial-gradient(ellipse, rgba(123,182,255,0.22) 0%, transparent 65%)', filter: 'blur(50px)' }}
        />
        <div
          className="absolute bottom-0 left-0 w-[400px] h-[300px] rounded-full opacity-20"
          style={{ background: 'radial-gradient(ellipse, rgba(167,139,250,0.18) 0%, transparent 65%)', filter: 'blur(60px)' }}
        />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-10 pt-32 pb-20 md:pt-40 md:pb-24">
        <div className="grid lg:grid-cols-[1.05fr_0.95fr] items-center gap-12 lg:gap-20">

          {/* Left: text content */}
          <div className="max-w-2xl">
            {/* Availability badge */}
            <motion.div {...FADE_UP(0)} className="inline-flex items-center gap-3 glass px-4 py-2 rounded-full mb-8">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping" style={{ background: '#4ade80' }} />
                <span className="relative inline-flex h-2 w-2 rounded-full" style={{ background: '#4ade80' }} />
              </span>
              <span className="font-body text-[11px] tracking-[0.2em] uppercase" style={{ color: 'var(--text-2)' }}>
                Available for opportunities
              </span>
            </motion.div>

            {/* Main heading */}
            <motion.div {...FADE_UP(0.1)}>
              <h1
                className="font-display font-bold leading-[0.95] mb-3"
                style={{ fontSize: 'clamp(3.2rem, 8vw, 6.5rem)' }}
              >
                <span className="text-hero-gradient">NIXON</span>
                <br />
                <span className="text-hero-gradient">SIAGIAN</span>
              </h1>
            </motion.div>

            {/* Subtitle */}
            <motion.p
              {...FADE_UP(0.28)}
              className="font-body text-base md:text-lg leading-relaxed max-w-xl mb-10"
              style={{ color: 'var(--text-2)' }}
            >
              Software Engineer crafting immersive digital experiences and futuristic applications{' '}
              <span style={{ color: 'var(--accent)' }}>since 2022.</span> Specializing in web, iOS,
              and systems-level development.
            </motion.p>

            {/* CTA buttons */}
            <motion.div {...FADE_UP(0.4)} className="flex flex-wrap gap-3 mb-10">
              <button
                onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-primary font-body font-semibold text-sm px-7 py-3.5 rounded-2xl"
              >
                View Projects
              </button>
              <button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-secondary font-body font-semibold text-sm px-7 py-3.5 rounded-2xl"
              >
                Contact Me
              </button>
            </motion.div>

            {/* Stat pills */}
            <motion.div {...FADE_UP(0.52)} className="flex flex-wrap gap-3">
              {[
                { label: 'Projects Shipped', value: '10+' },
                { label: 'Languages', value: '7' },
                { label: 'Based in', value: 'Indonesia' },
              ].map(({ label, value }) => (
                <div key={label} className="glass flex items-center gap-2 px-4 py-2 rounded-xl">
                  <span className="font-display font-bold text-sm" style={{ color: 'var(--accent)' }}>{value}</span>
                  <span className="font-body text-xs" style={{ color: 'var(--text-3)' }}>{label}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: 3D scene */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative h-[48vh] sm:h-[58vh] lg:h-[74vh] w-full"
          >
            <div
              className="absolute -inset-8 rounded-[50px] pointer-events-none"
              style={{ background: 'radial-gradient(ellipse at center, rgba(213,185,138,0.16), transparent 70%)' }}
            />
            <div className="glass-card w-full h-full">
              <Suspense fallback={null}>
                <LanguageScene className="absolute inset-0" />
              </Suspense>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1.2 }}
        className="absolute bottom-10 left-8 z-10 hidden md:flex flex-col items-start gap-2"
      >
        <span className="font-body text-[10px] tracking-[0.2em] uppercase" style={{ color: 'var(--text-3)' }}>Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2.1, ease: 'easeInOut' }}
          className="w-px h-10"
          style={{ background: 'linear-gradient(to bottom, var(--text-3), transparent)' }}
        />
      </motion.div>
    </section>
  )
}
