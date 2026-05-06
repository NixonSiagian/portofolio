import { motion } from 'framer-motion'

const FADE_UP = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] },
})

const DASHBOARD_STATS = [
  { label: 'Deploy success', value: '99.8%', width: '92%', color: '#7BB6FF' },
  { label: 'Latency', value: '12ms', width: '78%', color: '#D5B98A' },
  { label: 'Pipeline health', value: 'Stable', width: '86%', color: '#A78BFA' },
]

function HeroDashboard() {
  return (
    <div className="premium-mesh relative w-full h-full">
      <div className="grid-overlay opacity-20 z-0" />
      <div className="absolute inset-0 z-10 flex flex-col justify-between p-5 sm:p-7">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="font-body text-[10px] sm:text-[11px] uppercase tracking-[0.28em]" style={{ color: 'var(--text-3)' }}>
              Developer Console
            </p>
            <p className="font-display font-semibold text-lg sm:text-xl mt-1" style={{ color: 'var(--text-1)' }}>
              Realtime Systems
            </p>
          </div>
          <span
            className="font-body text-[10px] uppercase tracking-[0.2em] px-3 py-1 rounded-full"
            style={{ color: '#4ade80', border: '1px solid rgba(74,222,128,0.35)', background: 'rgba(74,222,128,0.08)' }}
          >
            Live
          </span>
        </div>

        <div className="space-y-3.5">
          {DASHBOARD_STATS.map((stat, index) => (
            <div key={stat.label}>
              <div className="flex items-center justify-between text-[11px] sm:text-xs mb-1.5">
                <span className="font-body" style={{ color: 'var(--text-2)' }}>{stat.label}</span>
                <span className="font-display font-semibold" style={{ color: stat.color }}>{stat.value}</span>
              </div>
              <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.08)' }}>
                <motion.div
                  className="h-full rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: stat.width }}
                  transition={{ duration: 1.2, delay: 0.2 + index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  style={{ background: `linear-gradient(90deg, ${stat.color}88, ${stat.color})` }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="glass px-4 py-3 rounded-2xl">
          <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.2em]" style={{ color: 'var(--text-3)' }}>
            <span>Active Build</span>
            <span style={{ color: 'var(--accent)' }}>v2.6</span>
          </div>
          <div className="mt-2 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full" style={{ background: '#7FE2B4', boxShadow: '0 0 10px rgba(127,226,180,0.6)' }} />
            <span className="font-mono text-xs" style={{ color: 'var(--text-1)' }}>
              deploy@main
            </span>
          </div>
          <p className="font-body text-[11px] mt-1" style={{ color: 'var(--text-3)' }}>
            Release pipeline synced · 2m ago
          </p>
        </div>
      </div>
    </div>
  )
}

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen overflow-hidden">
      {/* Grid overlay */}
      <div className="grid-overlay opacity-25" />

      {/* Ambient lighting orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute -top-12 left-[8%] rounded-full opacity-25"
          style={{
            width: 'clamp(240px, 60vw, 520px)',
            height: 'clamp(200px, 50vw, 420px)',
            background: 'radial-gradient(ellipse, rgba(213,185,138,0.16) 0%, transparent 65%)',
            filter: 'blur(42px)',
          }}
        />
        <div
          className="absolute top-10 right-[-10%] rounded-full opacity-25"
          style={{
            width: 'clamp(240px, 55vw, 480px)',
            height: 'clamp(240px, 55vw, 480px)',
            background: 'radial-gradient(ellipse, rgba(123,182,255,0.2) 0%, transparent 65%)',
            filter: 'blur(50px)',
          }}
        />
        <div
          className="absolute bottom-[-8%] left-[-6%] rounded-full opacity-20"
          style={{
            width: 'clamp(220px, 50vw, 420px)',
            height: 'clamp(180px, 45vw, 340px)',
            background: 'radial-gradient(ellipse, rgba(167,139,250,0.16) 0%, transparent 65%)',
            filter: 'blur(60px)',
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-6 md:px-10 pt-28 pb-16 md:pt-36 md:pb-24">
        <div className="grid lg:grid-cols-[1.05fr_0.95fr] items-center gap-10 lg:gap-20">

          {/* Left: text content */}
          <div className="max-w-2xl">
            {/* Availability badge */}
            <motion.div {...FADE_UP(0)} className="inline-flex items-center gap-3 glass px-3.5 py-2 rounded-full mb-7">
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
                style={{ fontSize: 'clamp(2.6rem, 10vw, 6.2rem)' }}
              >
                <span className="text-hero-gradient">NIXON</span>
                <br />
                <span className="text-hero-gradient">SIAGIAN</span>
              </h1>
            </motion.div>

            {/* Subtitle */}
            <motion.p
              {...FADE_UP(0.28)}
              className="font-body text-[0.98rem] sm:text-base md:text-lg leading-relaxed max-w-xl mb-9"
              style={{ color: 'var(--text-2)' }}
            >
              Software Engineer crafting immersive digital experiences and futuristic applications{' '}
              <span style={{ color: 'var(--accent)' }}>since 2022.</span> Specializing in web, iOS,
              and systems-level development.
            </motion.p>

            {/* CTA buttons */}
            <motion.div {...FADE_UP(0.4)} className="flex flex-wrap gap-3 mb-9">
              <button
                onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-primary font-body font-semibold text-sm px-6 py-3 rounded-2xl"
              >
                View Projects
              </button>
              <button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-secondary font-body font-semibold text-sm px-6 py-3 rounded-2xl"
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
            className="relative h-[38vh] sm:h-[50vh] lg:h-[72vh] w-full max-w-full"
          >
            <HeroDashboard />
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
