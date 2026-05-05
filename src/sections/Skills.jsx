import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const SKILLS = [
  { name: 'HTML',       pct: 94, color: '#E07248' },
  { name: 'CSS',        pct: 92, color: '#4DA6D8' },
  { name: 'JavaScript', pct: 87, color: '#EFC357' },
  { name: 'C++',        pct: 74, color: '#A97BD0' },
  { name: 'Pawn',       pct: 80, color: '#6EC99E' },
  { name: 'Swift',      pct: 70, color: '#F4914B' },
]

const TAGS = ['Git', 'VS Code', 'Node.js', 'REST APIs', 'Figma', 'CLI', 'Bash', 'JSON']

function SkillRow({ name, pct, color, index }) {
  const ref  = useRef(null)
  const inV  = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -18 }}
      animate={inV ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.65, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="flex justify-between items-end mb-2.5">
        <span
          className="font-display font-semibold text-sm tracking-wide"
          style={{ color: 'var(--text-1)' }}
        >
          {name}
        </span>
        <span
          className="font-body text-xs tabular-nums"
          style={{ color: 'var(--text-3)' }}
        >
          {pct}%
        </span>
      </div>

      {/* Track */}
      <div className="relative h-px" style={{ background: 'var(--border)' }}>
        {/* Fill */}
        <motion.div
          initial={{ width: 0 }}
          animate={inV ? { width: `${pct}%` } : {}}
          transition={{ duration: 1.3, delay: index * 0.07 + 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-y-0 left-0"
          style={{ background: color, opacity: 0.7 }}
        />

        {/* Glow dot at end */}
        <motion.div
          initial={{ left: 0, opacity: 0 }}
          animate={inV ? { left: `${pct}%`, opacity: 1 } : {}}
          transition={{ duration: 1.3, delay: index * 0.07 + 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full"
          style={{
            background: color,
            boxShadow: `0 0 10px 2px ${color}80`,
          }}
        />
      </div>
    </motion.div>
  )
}

export default function Skills() {
  const ref   = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-90px' })

  return (
    <section id="skills" className="section-pad" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-14 lg:gap-20 items-start">

          {/* Label */}
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
              02 — Skills
            </span>
            <div className="w-7 h-px mb-5" style={{ background: 'var(--border)' }} />
            <p
              className="font-body text-sm leading-relaxed max-w-[180px]"
              style={{ color: 'var(--text-3)' }}
            >
              Tools I use to turn ideas into working software.
            </p>
          </motion.div>

          {/* Content */}
          <div className="flex-1 max-w-xl">
            <motion.h2
              initial={{ opacity: 0, y: 18 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="font-display font-bold mb-10"
              style={{
                fontSize: 'clamp(1.9rem, 3.8vw, 2.8rem)',
                color: 'var(--text-1)',
              }}
            >
              What I work with
            </motion.h2>

            <div className="space-y-7">
              {SKILLS.map((s, i) => (
                <SkillRow key={s.name} {...s} index={i} />
              ))}
            </div>

            {/* Tag pills */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-wrap gap-2 mt-11"
            >
              {TAGS.map((tag, i) => (
                <motion.span
                  key={tag}
                  initial={{ opacity: 0, scale: 0.88 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.7 + i * 0.04, duration: 0.4 }}
                  className="font-body text-xs px-3.5 py-1.5 rounded-full glass"
                  style={{ color: 'var(--text-2)' }}
                >
                  {tag}
                </motion.span>
              ))}
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  )
}
