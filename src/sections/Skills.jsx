import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const SKILLS = [
  { name: 'CSS', note: 'Layout & motion', color: '#58A8E0', size: 'lg', shift: -18 },
  { name: 'JavaScript', note: 'Interaction logic', color: '#F2C45B', size: 'lg', shift: 10 },
  { name: 'C++', note: 'Systems tooling', color: '#B18BEA', size: 'md', shift: 24 },
  { name: 'Swift', note: 'iOS craft', color: '#F59E5B', size: 'md', shift: -6 },
  { name: 'Pawn', note: 'Game scripting', color: '#7FD6A5', size: 'sm', shift: 16 },
  { name: 'HTML', note: 'Semantic structure', color: '#EF7B55', size: 'sm', shift: -10 },
]

const TOOLS = ['Git', 'VS Code', 'Node.js', 'REST APIs', 'Figma', 'CLI', 'Bash', 'JSON']

const SIZE_MAP = {
  sm: { fontSize: '0.8rem', padding: '0.7rem 1.2rem' },
  md: { fontSize: '0.9rem', padding: '0.85rem 1.5rem' },
  lg: { fontSize: '1rem', padding: '1rem 1.65rem' },
}

function SkillChip({ skill, index, inView }) {
  const sizeStyle = SIZE_MAP[skill.size]
  const floatDistance = 6 + (index % 3) * 2
  const floatDuration = 6.5 + index * 0.4

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={
        inView
          ? { opacity: 1, y: [0, -floatDistance, 0] }
          : {}
      }
      transition={{
        opacity: { duration: 0.6, delay: 0.2 + index * 0.08 },
        y: {
          duration: floatDuration,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 0.6 + index * 0.12,
        },
      }}
      whileHover={{ y: -8, scale: 1.04 }}
      className="glass-chip"
      style={{
        marginLeft: `${skill.shift}px`,
        borderColor: `${skill.color}30`,
        boxShadow: `0 20px 45px rgba(0,0,0,0.32), 0 0 0 1px ${skill.color}25`,
        ...sizeStyle,
      }}
    >
      <div className="flex items-center gap-2">
        <span
          className="w-2 h-2 rounded-full"
          style={{ background: skill.color, boxShadow: `0 0 12px ${skill.color}` }}
        />
        <span className="font-display font-semibold" style={{ color: 'var(--text-1)' }}>
          {skill.name}
        </span>
      </div>
      <span
        className="font-body text-[11px] tracking-wide uppercase block mt-1"
        style={{ color: 'var(--text-3)' }}
      >
        {skill.note}
      </span>
    </motion.div>
  )
}

export default function Skills() {
  const ref   = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-90px' })

  return (
    <section id="skills" className="section-pad-tight section-pad-offset" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-14 lg:gap-20 items-start">
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
              Core programming languages and daily tools, shown as floating glass badges.
            </p>
          </motion.div>

          <div className="flex-1 max-w-2xl">
            <motion.h2
              initial={{ opacity: 0, y: 18 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="font-display font-semibold mb-10"
              style={{
                fontSize: 'clamp(2rem, 3.9vw, 3rem)',
                color: 'var(--text-1)',
              }}
            >
              Skillset in motion
            </motion.h2>

            <div className="flex flex-wrap gap-4">
              {SKILLS.map((skill, index) => (
                <SkillChip key={skill.name} skill={skill} index={index} inView={inView} />
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-wrap gap-2.5 mt-12"
            >
              {TOOLS.map((tag, index) => (
                <motion.span
                  key={tag}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.55 + index * 0.04, duration: 0.4 }}
                  className="glass font-body text-[11px] uppercase tracking-[0.16em] px-4 py-2 rounded-full"
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
