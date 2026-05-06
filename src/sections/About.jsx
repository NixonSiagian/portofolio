import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const TIMELINE = [
  { year: '2022', label: 'Started Software Engineering', note: 'Began building real-world applications across web and mobile.' },
  { year: '2023', label: 'iOS Development', note: 'Shipped native iOS apps with Swift, UIKit & SwiftUI.' },
  { year: '2024', label: 'Systems & Tooling', note: 'Extended into C++ tooling, scripting, and backend automation.' },
  { year: '2025+', label: 'Building the Future', note: 'Focused on immersive frontend experiences and futuristic digital products.' },
]

const stats = [
  { value: '3+', label: 'Years building' },
  { value: '7', label: 'Languages' },
  { value: '10+', label: 'Projects shipped' },
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
            <span className="font-body text-[11px] tracking-[0.18em] uppercase block mb-3" style={{ color: 'var(--accent)' }}>
              01 — About
            </span>
            <div className="w-7 h-px mb-5" style={{ background: 'var(--border)' }} />
            <p className="font-body text-sm leading-relaxed max-w-[180px]" style={{ color: 'var(--text-3)' }}>
              Building immersive apps and futuristic products.
            </p>
          </motion.div>

          {/* Right */}
          <div className="flex-1 max-w-3xl space-y-8">
            {/* Main card */}
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.85, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="glass-card relative overflow-hidden p-8 md:p-10"
            >
              <div className="absolute -top-10 -right-10 w-48 h-48 pointer-events-none"
                style={{ background: 'radial-gradient(circle, rgba(213,185,138,0.1), transparent 70%)', borderRadius: '50%' }} />
              <div className="absolute -bottom-10 -left-6 w-36 h-36 pointer-events-none"
                style={{ background: 'radial-gradient(circle, rgba(123,182,255,0.08), transparent 70%)', borderRadius: '50%' }} />

              <h2 className="font-display font-semibold mb-5" style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2rem)', color: 'var(--text-1)' }}>
                Design-led development,{' '}
                <span className="text-accent-gradient">engineered with intent.</span>
              </h2>
              <p className="font-body text-base md:text-lg leading-relaxed mb-5" style={{ color: 'var(--text-2)' }}>
                I&apos;m Nixon — a software engineer focused on{' '}
                <em style={{ color: 'var(--accent)', fontStyle: 'normal' }}>immersive applications</em>,
                modern frontend experiences, iOS development, and futuristic digital products since 2022.
              </p>
              <p className="font-body leading-relaxed mb-9" style={{ color: 'var(--text-3)' }}>
                I obsess over the details — animation timing, layout precision, code rhythm. Software
                should leave an impression, not just solve a problem.
              </p>

              {/* Stats */}
              <div className="flex flex-wrap gap-8 pt-7" style={{ borderTop: '1px solid var(--border)' }}>
                {stats.map(({ value, label }) => (
                  <div key={label}>
                    <p className="font-display font-bold text-[1.7rem] leading-none" style={{ color: 'var(--accent)' }}>{value}</p>
                    <p className="font-body text-[11px] tracking-wide mt-1.5 uppercase" style={{ color: 'var(--text-3)' }}>{label}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Timeline */}
            <div className="space-y-3">
              {TIMELINE.map(({ year, label, note }, i) => (
                <motion.div
                  key={year}
                  initial={{ opacity: 0, x: 20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  className="glass flex items-start gap-5 px-6 py-4 group hover:border-[rgba(213,185,138,0.2)] transition-all duration-300"
                  style={{ borderRadius: '14px' }}
                >
                  <span className="font-display font-bold text-sm flex-shrink-0 mt-0.5" style={{ color: 'var(--accent)', minWidth: '3rem' }}>{year}</span>
                  <div>
                    <p className="font-body font-medium text-sm" style={{ color: 'var(--text-1)' }}>{label}</p>
                    <p className="font-body text-xs mt-0.5" style={{ color: 'var(--text-3)' }}>{note}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
