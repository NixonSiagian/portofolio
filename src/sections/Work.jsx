import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const PROJECTS = [
  {
    id: '01',
    title: 'FinTrack Dashboard',
    desc:
      'A real-time financial analytics platform featuring interactive charts, multi-currency budgeting, and export tooling — built with vanilla JS and a custom CSS architecture from scratch.',
    tags: ['JavaScript', 'CSS', 'HTML', 'REST API'],
    year: '2024',
    featured: true,
  },
  {
    id: '02',
    title: 'Persona UI System',
    desc:
      'A modular design system and component library for rapid prototyping. Fully documented, accessible, and themeable.',
    tags: ['CSS', 'JavaScript', 'Design'],
    year: '2023',
    featured: false,
  },
  {
    id: '03',
    title: 'Swift Commerce',
    desc:
      'Native iOS shopping app with gesture navigation, live search, and a seamless Swift-native checkout experience.',
    tags: ['Swift', 'iOS', 'UIKit'],
    year: '2023',
    featured: false,
  },
  {
    id: '04',
    title: 'DevKit CLI',
    desc:
      'A developer toolchain in C++ for automating project scaffolding, linting, and deployment pipelines.',
    tags: ['C++', 'CLI', 'Automation'],
    year: '2022',
    featured: false,
  },
]

function ArrowIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
      <path
        d="M1.5 11.5L11.5 1.5M11.5 1.5H4.5M11.5 1.5V8.5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function ProjectCard({ project, index, className = '' }) {
  const ref   = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-70px' })

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.09, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{
        y: -8,
        scale: 1.02,
        boxShadow: '0 28px 70px rgba(0,0,0,0.45)',
        borderColor: 'rgba(192,164,124,0.25)',
        transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] },
      }}
      className={`glass-card relative overflow-hidden group ${className}`}
      style={{ padding: project.featured ? '2.35rem 2.6rem' : '1.85rem 2.1rem' }}
    >
      {/* Hover blur + glow */}
      <motion.div
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'rgba(10, 12, 20, 0.2)',
          backdropFilter: 'blur(14px) saturate(140%)',
        }}
      />
      <motion.div
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="absolute inset-0 pointer-events-none rounded-[18px]"
        style={{
          background:
            'radial-gradient(500px circle at 50% 30%, rgba(192,164,124,0.06), transparent 60%)',
          boxShadow: 'inset 0 0 0 1px rgba(192,164,124,0.1)',
        }}
      />

      {/* Number */}
      <span
        className="font-body text-[11px] tracking-[0.16em] uppercase block mb-4"
        style={{ color: 'var(--text-3)' }}
      >
        {project.id}
      </span>

      {/* Title + arrow */}
      <div className="flex items-start justify-between gap-4 mb-3">
        <h3
          className="font-display font-bold transition-colors duration-300 group-hover:text-[color:var(--accent)]"
          style={{
            fontSize: project.featured ? 'clamp(1.3rem, 2vw, 1.6rem)' : '1.15rem',
            color: 'var(--text-1)',
          }}
        >
          {project.title}
        </h3>
        <span
          className="flex-shrink-0 mt-1 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-1 group-hover:translate-x-0"
          style={{ color: 'var(--accent)' }}
        >
          <ArrowIcon />
        </span>
      </div>

      {/* Desc */}
      <p
        className="font-body text-sm leading-relaxed mb-6"
        style={{ color: 'var(--text-2)', maxWidth: project.featured ? '520px' : '100%' }}
      >
        {project.desc}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="font-body text-[11px] px-2.5 py-1 rounded-full"
              style={{
                color: 'var(--text-3)',
                border: '1px solid var(--border)',
              }}
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-4">
          <span
            className="font-body text-xs flex-shrink-0"
            style={{ color: 'var(--text-3)' }}
          >
            {project.year}
          </span>
          <span
            className="font-body text-xs flex items-center gap-2 text-[color:var(--accent)] opacity-0 group-hover:opacity-100 transition-all duration-300"
          >
            View Project <ArrowIcon />
          </span>
        </div>
      </div>
    </motion.article>
  )
}

export default function Work() {
  const ref   = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-90px' })

  return (
    <section id="work" className="section-pad-roomy" ref={ref}>
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex flex-col lg:flex-row gap-14 lg:gap-20 items-start mb-16">
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="lg:w-56 flex-shrink-0"
          >
            <span
              className="font-body text-[11px] tracking-[0.18em] uppercase block mb-3"
              style={{ color: 'var(--accent)' }}
            >
              03 — Selected Work
            </span>
            <div className="w-7 h-px" style={{ background: 'var(--border)' }} />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-display font-bold flex-1"
            style={{
              fontSize: 'clamp(1.9rem, 3.8vw, 2.8rem)',
              color: 'var(--text-1)',
            }}
          >
            Selected Work
          </motion.h2>
        </div>

        <div className="space-y-10">
          <div className="lg:flex lg:items-start gap-6">
            <div className="lg:w-[58%]">
              <ProjectCard project={PROJECTS[0]} index={0} />
            </div>
            <div className="lg:w-[38%] lg:mt-10">
              <ProjectCard project={PROJECTS[1]} index={1} />
            </div>
          </div>

          <div className="lg:flex lg:items-start gap-6">
            <div className="lg:w-[40%] lg:ml-[8%]">
              <ProjectCard project={PROJECTS[2]} index={2} />
            </div>
            <div className="lg:w-[48%] lg:mt-[-18px]">
              <ProjectCard project={PROJECTS[3]} index={3} />
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
