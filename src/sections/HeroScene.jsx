import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

/* ── Inline SVG Logos ─────────────────────────────────────────── */

function HTML5Icon() {
  return (
    <svg viewBox="0 0 48 48" width="28" height="28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 4L11.2 40L24 44L36.8 40L40 4H8Z" fill="#E44D26" />
      <path d="M24 41.3L34.4 38.4L37.2 8H24V41.3Z" fill="#F16529" />
      <path d="M24 20H18.8L18.4 15.6H24V11.2H13.6L14.8 24.4H24V20ZM24 30.4L23.96 30.4L19.6 29.2L19.32 26H14.88L15.4 32.4L24 34.8V30.4Z" fill="#EBEBEB" />
      <path d="M24 20V24.4H28.8L28.36 29.2L24 30.4V34.8L32.6 32.4L32.72 31L33.8 19.2L34.4 15.6H24V20Z" fill="white" />
    </svg>
  )
}

function CSS3Icon() {
  return (
    <svg viewBox="0 0 48 48" width="28" height="28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 4L11.2 40L24 44L36.8 40L40 4H8Z" fill="#1572B6" />
      <path d="M24 41.3L34.4 38.4L37.2 8H24V41.3Z" fill="#33A9DC" />
      <path d="M24 20.4H18.56L18.2 16.4H24V12H13.6L14.72 25.2H24V20.4ZM24 30.8L23.96 30.8L19.52 29.6L19.2 26H14.76L15.4 33.2L24 35.6V30.8Z" fill="#EBEBEB" />
      <path d="M24 20.4V25.2H29.08L28.56 30.8L24 31.96V36.2L32.84 33.6L33.6 24.8L34.4 16.4H24V20.4Z" fill="white" />
    </svg>
  )
}

function JSIcon() {
  return (
    <svg viewBox="0 0 48 48" width="28" height="28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="48" height="48" rx="4" fill="#F7DF1E" />
      <path d="M13.4 37.2L16.8 35.16C17.44 36.28 18.04 37.24 19.4 37.24C20.7 37.24 21.56 36.72 21.56 34.88V21.48H25.68V34.96C25.68 39.04 23.28 41 19.6 41C16.28 41 14.36 39.2 13.4 37.2Z" fill="#323330" />
      <path d="M28.16 36.76L31.56 34.64C32.44 36.08 33.64 37.12 35.64 37.12C37.32 37.12 38.4 36.28 38.4 35.12C38.4 33.72 37.28 33.24 35.44 32.44L34.44 32.02C31.44 30.74 29.48 29.12 29.48 25.96C29.48 23.08 31.72 20.88 35.28 20.88C37.76 20.88 39.56 21.72 40.84 23.92L37.6 26.12C36.92 24.88 36.2 24.36 35.28 24.36C34.32 24.36 33.72 24.96 33.72 26.12C33.72 27.56 34.32 28.04 36.04 28.8L37.04 29.22C40.52 30.72 42.48 32.28 42.48 35.56C42.48 39.12 39.68 41 35.92 41C32.24 41 29.84 39.28 28.16 36.76Z" fill="#323330" />
    </svg>
  )
}

function SwiftIcon() {
  return (
    <svg viewBox="0 0 48 48" width="28" height="28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="48" height="48" rx="10" fill="url(#swift-bg-hs)" />
      <path d="M37.54 29.83C37.54 29.83 39.9 24.88 37.67 20.56C36.14 17.58 32.97 15.95 32.97 15.95C32.97 15.95 35.89 20.18 34.35 24.18C33.8 25.6 32.8 26.9 31.56 27.88L20.68 18.68C20.68 18.68 27.28 24.9 27.7 25.32C25.22 26.94 21.96 27.54 18.82 26.56C15.64 25.56 13.1 23.18 11.86 20.08C11.86 20.08 10.16 25.32 14.02 30.12C16.18 32.78 19.52 34.4 22.96 34.48C19.82 36.62 14.76 37.08 10.12 34.02C10.12 34.02 13.3 40.18 20.52 40.84C24.26 41.18 28.32 40.24 31.5 37.96C34.56 35.78 36.76 32.22 37.54 29.83Z" fill="white" />
      <defs>
        <linearGradient id="swift-bg-hs" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FD8136" />
          <stop offset="1" stopColor="#E84040" />
        </linearGradient>
      </defs>
    </svg>
  )
}

function PythonIcon() {
  return (
    <svg viewBox="0 0 48 48" width="28" height="28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M23.9 4C13.7 4 14.4 8.4 14.4 8.4L14.41 12.9H24.06V14.2H10.04C10.04 14.2 4 13.5 4 23.8C4 34.1 9.28 33.8 9.28 33.8H12.3V29.1C12.3 29.1 12.14 23.8 17.5 23.8H27.2C27.2 23.8 32.3 23.9 32.3 18.9V9.4C32.3 9.4 33.1 4 23.9 4ZM18.8 7.4C19.74 7.4 20.5 8.16 20.5 9.1C20.5 10.04 19.74 10.8 18.8 10.8C17.86 10.8 17.1 10.04 17.1 9.1C17.1 8.16 17.86 7.4 18.8 7.4Z" fill="url(#py1-hs)" />
      <path d="M24.1 44C34.3 44 33.6 39.6 33.6 39.6L33.59 35.1H23.94V33.8H37.96C37.96 33.8 44 34.5 44 24.2C44 13.9 38.72 14.2 38.72 14.2H35.7V18.9C35.7 18.9 35.86 24.2 30.5 24.2H20.8C20.8 24.2 15.7 24.1 15.7 29.1V38.6C15.7 38.6 14.9 44 24.1 44ZM29.2 40.6C28.26 40.6 27.5 39.84 27.5 38.9C27.5 37.96 28.26 37.2 29.2 37.2C30.14 37.2 30.9 37.96 30.9 38.9C30.9 39.84 30.14 40.6 29.2 40.6Z" fill="url(#py2-hs)" />
      <defs>
        <linearGradient id="py1-hs" x1="4" y1="4" x2="32.3" y2="23.8" gradientUnits="userSpaceOnUse">
          <stop stopColor="#387EB8" />
          <stop offset="1" stopColor="#366994" />
        </linearGradient>
        <linearGradient id="py2-hs" x1="15.7" y1="24.2" x2="44" y2="44" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFE052" />
          <stop offset="1" stopColor="#FFC331" />
        </linearGradient>
      </defs>
    </svg>
  )
}

function CppIcon() {
  return (
    <svg viewBox="0 0 48 48" width="28" height="28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M24 4L42 14.5V33.5L24 44L6 33.5V14.5L24 4Z" fill="#00599C" />
      <path d="M24 4L42 14.5V33.5L24 44V4Z" fill="#004482" />
      <path d="M24 12C18.48 12 14 16.48 14 22C14 27.52 18.48 32 24 32C27.14 32 30 30.58 31.88 28.34L28.88 26.62C27.74 28.12 26 29 24 29C20.14 29 17 25.86 17 22C17 18.14 20.14 15 24 15C26 15 27.74 15.88 28.88 17.38L31.88 15.66C30 13.42 27.14 12 24 12Z" fill="white" />
      <path d="M33 19.5H31.5V21H30V19.5H28.5V18H30V16.5H31.5V18H33V19.5ZM38 19.5H36.5V21H35V19.5H33.5V18H35V16.5H36.5V18H38V19.5Z" fill="white" />
    </svg>
  )
}

const TECH_NODES = [
  { name: 'HTML5', Logo: HTML5Icon, color: '#E44D26', left: '18%', top: '20%', z: 70, float: 6.8, delay: 0.1 },
  { name: 'CSS3', Logo: CSS3Icon, color: '#1572B6', left: '78%', top: '22%', z: 60, float: 7.4, delay: 0.3 },
  { name: 'JavaScript', Logo: JSIcon, color: '#F7DF1E', left: '72%', top: '72%', z: 85, float: 6.2, delay: 0.2 },
  { name: 'Swift', Logo: SwiftIcon, color: '#F05138', left: '30%', top: '78%', z: 80, float: 7.1, delay: 0.4 },
  { name: 'Python', Logo: PythonIcon, color: '#3776AB', left: '14%', top: '58%', z: 55, float: 6.6, delay: 0.15 },
  { name: 'C++', Logo: CppIcon, color: '#00599C', left: '84%', top: '54%', z: 65, float: 6.9, delay: 0.25 },
]

export default function HeroScene() {
  const pointerX = useMotionValue(0)
  const pointerY = useMotionValue(0)

  const smoothX = useSpring(pointerX, { stiffness: 120, damping: 22, mass: 0.6 })
  const smoothY = useSpring(pointerY, { stiffness: 120, damping: 22, mass: 0.6 })

  const rotateX = useTransform(smoothY, [-1, 1], [8, -8])
  const rotateY = useTransform(smoothX, [-1, 1], [-10, 10])
  const glowX = useTransform(smoothX, [-1, 1], [-16, 16])
  const glowY = useTransform(smoothY, [-1, 1], [-12, 12])
  const logoShiftX = useTransform(smoothX, [-1, 1], [-10, 10])
  const logoShiftY = useTransform(smoothY, [-1, 1], [-8, 8])

  const handlePointerMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2
    pointerX.set(x)
    pointerY.set(y)
  }

  const handleTouchMove = (event) => {
    const touch = event.touches[0]
    if (!touch) return
    const rect = event.currentTarget.getBoundingClientRect()
    const x = ((touch.clientX - rect.left) / rect.width - 0.5) * 2
    const y = ((touch.clientY - rect.top) / rect.height - 0.5) * 2
    pointerX.set(x)
    pointerY.set(y)
  }

  const handlePointerLeave = () => {
    pointerX.set(0)
    pointerY.set(0)
  }

  return (
    <div
      className="hero-3d-stage"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onTouchMove={handleTouchMove}
      onTouchEnd={handlePointerLeave}
    >
      <motion.div className="hero-ambient-glow" style={{ x: glowX, y: glowY }} />
      <motion.div className="hero-3d-core" style={{ rotateX, rotateY }}>
        <div className="hero-core-shadow" />
        <div className="hero-sphere-glow" />
        <div className="hero-sphere" />
        <motion.div
          className="hero-ring"
          animate={{ rotateZ: 360 }}
          transition={{ duration: 38, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div className="hero-logo-field" style={{ x: logoShiftX, y: logoShiftY }}>
          {TECH_NODES.map(({ name, Logo, color, left, top, z, float, delay }) => (
            <div key={name} className="hero-logo" style={{ left, top, '--z': `${z}px` }}>
              <motion.div
                className="hero-logo-chip"
                style={{ boxShadow: `0 12px 32px rgba(0,0,0,0.55), 0 0 18px ${color}30` }}
                animate={{ y: [0, -6, 0], rotateZ: [0, 3, 0] }}
                transition={{ duration: float, repeat: Infinity, ease: 'easeInOut', delay }}
                aria-label={name}
              >
                <Logo />
              </motion.div>
            </div>
          ))}
        </motion.div>
      </motion.div>
      <div className="hero-scanlines" />
    </div>
  )
}
