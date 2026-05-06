import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

/* ─── SVG Tech Logos ────────────────────────────────── */
function HTML5Logo() {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 4L11.2 40L24 44L36.8 40L40 4H8Z" fill="#E44D26"/>
      <path d="M24 41.3L34.4 38.4L37.2 8H24V41.3Z" fill="#F16529"/>
      <path d="M24 20H18.8L18.4 15.6H24V11.2H13.6L14.8 24.4H24V20ZM24 30.4L23.96 30.4L19.6 29.2L19.32 26H14.88L15.4 32.4L24 34.8V30.4Z" fill="#EBEBEB"/>
      <path d="M24 20V24.4H28.8L28.36 29.2L24 30.4V34.8L32.6 32.4L32.72 31L33.8 19.2L34.4 15.6H24V20Z" fill="white"/>
    </svg>
  )
}

function CSS3Logo() {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 4L11.2 40L24 44L36.8 40L40 4H8Z" fill="#1572B6"/>
      <path d="M24 41.3L34.4 38.4L37.2 8H24V41.3Z" fill="#33A9DC"/>
      <path d="M24 20.4H18.56L18.2 16.4H24V12H13.6L14.72 25.2H24V20.4ZM24 30.8L23.96 30.8L19.52 29.6L19.2 26H14.76L15.4 33.2L24 35.6V30.8Z" fill="#EBEBEB"/>
      <path d="M24 20.4V25.2H29.08L28.56 30.8L24 31.96V36.2L32.84 33.6L33.6 24.8L34.4 16.4H24V20.4Z" fill="white"/>
    </svg>
  )
}

function JavaScriptLogo() {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="48" height="48" rx="4" fill="#F7DF1E"/>
      <path d="M13.4 37.2L16.8 35.16C17.44 36.28 18.04 37.24 19.4 37.24C20.7 37.24 21.56 36.72 21.56 34.88V21.48H25.68V34.96C25.68 39.04 23.28 41 19.6 41C16.28 41 14.36 39.2 13.4 37.2Z" fill="#323330"/>
      <path d="M28.16 36.76L31.56 34.64C32.44 36.08 33.64 37.12 35.64 37.12C37.32 37.12 38.4 36.28 38.4 35.12C38.4 33.72 37.28 33.24 35.44 32.44L34.44 32.02C31.44 30.74 29.48 29.12 29.48 25.96C29.48 23.08 31.72 20.88 35.28 20.88C37.76 20.88 39.56 21.72 40.84 23.92L37.6 26.12C36.92 24.88 36.2 24.36 35.28 24.36C34.32 24.36 33.72 24.96 33.72 26.12C33.72 27.56 34.32 28.04 36.04 28.8L37.04 29.22C40.52 30.72 42.48 32.28 42.48 35.56C42.48 39.12 39.68 41 35.92 41C32.24 41 29.84 39.28 28.16 36.76Z" fill="#323330"/>
    </svg>
  )
}

function PythonLogo() {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M23.9 4C13.7 4 14.4 8.4 14.4 8.4L14.41 12.9H24.06V14.2H10.04C10.04 14.2 4 13.5 4 23.8C4 34.1 9.28 33.8 9.28 33.8H12.3V29.1C12.3 29.1 12.14 23.8 17.5 23.8H27.2C27.2 23.8 32.3 23.9 32.3 18.9V9.4C32.3 9.4 33.1 4 23.9 4ZM18.8 7.4C19.74 7.4 20.5 8.16 20.5 9.1C20.5 10.04 19.74 10.8 18.8 10.8C17.86 10.8 17.1 10.04 17.1 9.1C17.1 8.16 17.86 7.4 18.8 7.4Z" fill="url(#py1)"/>
      <path d="M24.1 44C34.3 44 33.6 39.6 33.6 39.6L33.59 35.1H23.94V33.8H37.96C37.96 33.8 44 34.5 44 24.2C44 13.9 38.72 14.2 38.72 14.2H35.7V18.9C35.7 18.9 35.86 24.2 30.5 24.2H20.8C20.8 24.2 15.7 24.1 15.7 29.1V38.6C15.7 38.6 14.9 44 24.1 44ZM29.2 40.6C28.26 40.6 27.5 39.84 27.5 38.9C27.5 37.96 28.26 37.2 29.2 37.2C30.14 37.2 30.9 37.96 30.9 38.9C30.9 39.84 30.14 40.6 29.2 40.6Z" fill="url(#py2)"/>
      <defs>
        <linearGradient id="py1" x1="4" y1="4" x2="32.3" y2="23.8" gradientUnits="userSpaceOnUse">
          <stop stopColor="#387EB8"/>
          <stop offset="1" stopColor="#366994"/>
        </linearGradient>
        <linearGradient id="py2" x1="15.7" y1="24.2" x2="44" y2="44" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFE052"/>
          <stop offset="1" stopColor="#FFC331"/>
        </linearGradient>
      </defs>
    </svg>
  )
}

function SwiftLogo() {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="48" height="48" rx="10" fill="url(#swift-bg)"/>
      <path d="M37.54 29.83C37.54 29.83 39.9 24.88 37.67 20.56C36.14 17.58 32.97 15.95 32.97 15.95C32.97 15.95 35.89 20.18 34.35 24.18C33.8 25.6 32.8 26.9 31.56 27.88L20.68 18.68C20.68 18.68 27.28 24.9 27.7 25.32C25.22 26.94 21.96 27.54 18.82 26.56C15.64 25.56 13.1 23.18 11.86 20.08C11.86 20.08 10.16 25.32 14.02 30.12C16.18 32.78 19.52 34.4 22.96 34.48C19.82 36.62 14.76 37.08 10.12 34.02C10.12 34.02 13.3 40.18 20.52 40.84C24.26 41.18 28.32 40.24 31.5 37.96C34.56 35.78 36.76 32.22 37.54 29.83Z" fill="white"/>
      <defs>
        <linearGradient id="swift-bg" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FD8136"/>
          <stop offset="1" stopColor="#E84040"/>
        </linearGradient>
      </defs>
    </svg>
  )
}

function CppLogo() {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M24 4L42 14.5V33.5L24 44L6 33.5V14.5L24 4Z" fill="#00599C"/>
      <path d="M24 4L42 14.5V33.5L24 44V4Z" fill="#004482"/>
      <path d="M24 12C18.48 12 14 16.48 14 22C14 27.52 18.48 32 24 32C27.14 32 30 30.58 31.88 28.34L28.88 26.62C27.74 28.12 26 29 24 29C20.14 29 17 25.86 17 22C17 18.14 20.14 15 24 15C26 15 27.74 15.88 28.88 17.38L31.88 15.66C30 13.42 27.14 12 24 12Z" fill="white"/>
      <path d="M33 19.5H31.5V21H30V19.5H28.5V18H30V16.5H31.5V18H33V19.5ZM38 19.5H36.5V21H35V19.5H33.5V18H35V16.5H36.5V18H38V19.5Z" fill="white"/>
    </svg>
  )
}

function PawnLogo() {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="48" height="48" rx="10" fill="rgba(127,226,180,0.1)" stroke="rgba(127,226,180,0.25)" strokeWidth="1"/>
      <circle cx="24" cy="14" r="6" fill="#7FE2B4"/>
      <path d="M18 22H30L32 42H16L18 22Z" fill="#7FE2B4" fillOpacity="0.8"/>
      <rect x="14" y="40" width="20" height="4" rx="2" fill="#7FE2B4"/>
    </svg>
  )
}

const TECHS = [
  {
    name: 'HTML5',
    category: 'Markup',
    years: 3,
    level: 'Expert',
    color: '#E44D26',
    colorDim: 'rgba(228,77,38,0.14)',
    Logo: HTML5Logo,
  },
  {
    name: 'CSS3',
    category: 'Styling',
    years: 3,
    level: 'Expert',
    color: '#1572B6',
    colorDim: 'rgba(21,114,182,0.14)',
    Logo: CSS3Logo,
  },
  {
    name: 'JavaScript',
    category: 'Language',
    years: 3,
    level: 'Advanced',
    color: '#F7DF1E',
    colorDim: 'rgba(247,223,30,0.1)',
    Logo: JavaScriptLogo,
  },
  {
    name: 'Python',
    category: 'Language',
    years: 2,
    level: 'Intermediate',
    color: '#3776AB',
    colorDim: 'rgba(55,118,171,0.14)',
    Logo: PythonLogo,
  },
  {
    name: 'Swift',
    category: 'iOS / Apple',
    years: 2,
    level: 'Advanced',
    color: '#F05138',
    colorDim: 'rgba(240,81,56,0.14)',
    Logo: SwiftLogo,
  },
  {
    name: 'C++',
    category: 'Systems',
    years: 2,
    level: 'Intermediate',
    color: '#00599C',
    colorDim: 'rgba(0,89,156,0.14)',
    Logo: CppLogo,
  },
  {
    name: 'Pawn',
    category: 'Scripting',
    years: 3,
    level: 'Advanced',
    color: '#7FE2B4',
    colorDim: 'rgba(127,226,180,0.1)',
    Logo: PawnLogo,
  },
]

const LEVEL_WIDTH = { Expert: '90%', Advanced: '72%', Intermediate: '52%' }

function TechCard({ tech, index, inView }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const dx = (e.clientX - cx) / (rect.width / 2)
    const dy = (e.clientY - cy) / (rect.height / 2)
    setTilt({ x: dy * -8, y: dx * 8 })
  }

  const resetTilt = () => setTilt({ x: 0, y: 0 })

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: 0.1 + index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={handleMouseMove}
      onMouseLeave={resetTilt}
      style={{
        transform: `perspective(600px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: tilt.x === 0 ? 'transform 0.5s ease' : 'transform 0.1s ease',
      }}
    >
      <div className="tech-card p-5 h-full group relative">
        {/* Ambient glow on hover */}
        <div
          className="absolute inset-0 rounded-[20px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{ background: `radial-gradient(ellipse at 30% 30%, ${tech.colorDim}, transparent 65%)` }}
        />
        {/* Neon top edge on hover */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-3/4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{ background: `linear-gradient(90deg, transparent, ${tech.color}80, transparent)` }}
        />

        <div className="relative z-10">
          <div className="w-12 h-12 mb-4">
            <tech.Logo />
          </div>

          <h3 className="font-display font-bold text-base mb-0.5" style={{ color: 'var(--text-1)' }}>
            {tech.name}
          </h3>
          <p className="font-body text-[11px] uppercase tracking-wide mb-4" style={{ color: 'var(--text-3)' }}>
            {tech.category}
          </p>

          <div className="mb-3">
            <div className="flex justify-between items-center mb-1.5">
              <span className="font-body text-[11px]" style={{ color: 'var(--text-3)' }}>{tech.level}</span>
              <span className="font-body text-[11px]" style={{ color: 'var(--text-3)' }}>{tech.years}yr{tech.years > 1 ? 's' : ''}</span>
            </div>
            <div className="h-1 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.07)' }}>
              <motion.div
                className="h-full rounded-full"
                initial={{ width: 0 }}
                animate={inView ? { width: LEVEL_WIDTH[tech.level] } : { width: 0 }}
                transition={{ duration: 1, delay: 0.4 + index * 0.07, ease: [0.22, 1, 0.36, 1] }}
                style={{ background: `linear-gradient(90deg, ${tech.color}88, ${tech.color})` }}
              />
            </div>
          </div>

          <div className="flex items-center gap-2 mt-3">
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: tech.color, boxShadow: `0 0 8px ${tech.color}` }}
            />
            <span className="font-body text-[10px] tracking-[0.12em] uppercase" style={{ color: 'var(--text-3)' }}>
              Proficient
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function TechStack() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-90px' })

  return (
    <section id="stack" className="section-pad-tight section-pad-offset" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-14 lg:gap-20 items-start">

          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="lg:w-56 flex-shrink-0"
          >
            <span className="font-body text-[11px] tracking-[0.18em] uppercase block mb-3" style={{ color: 'var(--accent)' }}>
              02 — Tech Stack
            </span>
            <div className="w-7 h-px mb-5" style={{ background: 'var(--border)' }} />
            <p className="font-body text-sm leading-relaxed max-w-[180px]" style={{ color: 'var(--text-3)' }}>
              Languages and tools I rely on to build premium applications.
            </p>
          </motion.div>

          <div className="flex-1">
            <motion.h2
              initial={{ opacity: 0, y: 18 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="font-display font-semibold mb-10"
              style={{ fontSize: 'clamp(2rem, 3.9vw, 3rem)', color: 'var(--text-1)' }}
            >
              Core Capabilities
            </motion.h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {TECHS.map((tech, index) => (
                <TechCard key={tech.name} tech={tech} index={index} inView={inView} />
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
