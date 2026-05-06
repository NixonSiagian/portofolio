import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const stats = [
  { value: '5+', label: 'Years building' },
  { value: '6',  label: 'Languages' },
  { value: '∞',  label: 'Curiosity' },
]

export default function About() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-90px' })

  return (
    <section id="about" className="section-pad" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-14 lg:gap-20 items-start">

          {/* Left label */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="lg:w-56 flex-shrink-0"
          >
            <span
              className="font-body text-[11px] tracking-[0.18em] uppercase block mb-3"
              style={{ color: 'var(--accent)' }}
            >
              01 — About
            </span>
            <div
              className="w-7 h-px"
              style={{ background: 'var(--border)' }}
            />
          </motion.div>

          {/* Right: card */}
          <div className="flex-1 max-w-2xl lg:ml-6">
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.85, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="glass-card relative overflow-hidden p-8 md:p-10"
            >
              {/* Accent corner glow */}
              <div
                className="absolute -top-8 -right-8 w-36 h-36 pointer-events-none"
                style={{
                  background: 'radial-gradient(circle, rgba(192,164,124,0.12), transparent 70%)',
                  borderRadius: '50%',
                }}
              />
              <div
                className="absolute -bottom-10 -left-6 w-28 h-28 pointer-events-none"
                style={{
                  background: 'radial-gradient(circle, rgba(139,175,201,0.08), transparent 70%)',
                  borderRadius: '50%',
                }}
              />

              <h2
                className="font-display font-semibold mb-5"
                style={{ fontSize: 'clamp(1.6rem, 2.6vw, 2.2rem)', color: 'var(--text-1)' }}
              >
                Design-led development, engineered with intent.
              </h2>
              <p
                className="font-body text-base md:text-lg leading-relaxed mb-5"
                style={{ color: 'var(--text-2)' }}
              >
                I&apos;m Nixon — a developer who cares as much about{' '}
                <em style={{ color: 'var(--accent)', fontStyle: 'normal' }}>how things feel</em>{' '}
                as how they work. Since 2020 I&apos;ve built across the full stack: 
                polished frontends, native iOS apps, C++ utilities, and everything in between.
              </p>
              <p
                className="font-body leading-relaxed mb-9"
                style={{ color: 'var(--text-3)' }}
              >
                I'm obsessive about the small details — the timing of an animation, the 
                precision of a layout, the rhythm of a codebase. I believe software should 
                leave an impression. Not just solve a problem.
              </p>

              {/* Stats */}
              <div
                className="flex flex-wrap gap-8 pt-7"
                style={{ borderTop: '1px solid var(--border)' }}
              >
                {stats.map(({ value, label }) => (
                  <div key={label}>
                    <p
                      className="font-display font-bold text-[1.7rem] leading-none"
                      style={{ color: 'var(--accent)' }}
                    >
                      {value}
                    </p>
                    <p
                      className="font-body text-[11px] tracking-wide mt-1.5 uppercase"
                      style={{ color: 'var(--text-3)' }}
                    >
                      {label}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  )
}
