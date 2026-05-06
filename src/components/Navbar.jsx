import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

function NSLogo({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="0.5" y="0.5" width="35" height="35" rx="9.5"
        fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.1)" />
      <path d="M9.5 26V10L17 23V10" stroke="#D5B98A" strokeWidth="1.6"
        strokeLinecap="round" strokeLinejoin="round" />
      <path d="M21 14.5C21 12.84 22.34 11.5 24 11.5H25C26.66 11.5 28 12.84 28 14.5C28 16.16 26.66 17.5 25 17.5H23C21.34 17.5 20 18.84 20 20.5V21.5C20 23.16 21.34 24.5 23 24.5H25C26.66 24.5 28 23.16 28 21.5"
        stroke="#7BB6FF" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="32" cy="4" r="5" fill="rgba(213,185,138,0.18)" />
    </svg>
  )
}

const NAV_LINKS = [
  { label: 'About', id: 'about' },
  { label: 'Stack', id: 'stack' },
  { label: 'Work', id: 'work' },
  { label: 'GitHub', id: 'github' },
  { label: 'Contact', id: 'contact' },
]

function useActiveSection(ids) {
  const [active, setActive] = useState('')

  useEffect(() => {
    const observers = ids.map((id) => {
      const el = document.getElementById(id)
      if (!el) return null
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id)
        },
        { rootMargin: '-40% 0px -50% 0px' },
      )
      obs.observe(el)
      return obs
    })
    return () => observers.forEach((o) => o?.disconnect())
  }, [ids])

  return active
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const active = useActiveSection(NAV_LINKS.map((l) => l.id))

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <>
      <motion.header
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-3 md:pt-5"
      >
        {/* Floating capsule */}
        <div
          className="w-full max-w-4xl flex items-center justify-between rounded-xl sm:rounded-2xl px-4 sm:px-5 py-2.5 sm:py-3 transition-all duration-500"
          style={scrolled ? {
            background: 'rgba(5,6,11,0.82)',
            backdropFilter: 'blur(28px)',
            WebkitBackdropFilter: 'blur(28px)',
            border: '1px solid rgba(255,255,255,0.09)',
            boxShadow: '0 4px 40px rgba(0,0,0,0.4)',
          } : {
            background: 'rgba(5,6,11,0.45)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            border: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2"
          >
            <NSLogo className="w-8 h-8 sm:w-9 sm:h-9" />
            <span
              className="hidden sm:block font-display font-semibold text-xs tracking-[0.12em] uppercase"
              style={{ color: 'var(--text-2)' }}
            >
              Nixon
            </span>
          </button>

          {/* Desktop nav — centered pills */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(({ label, id }) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className="relative font-body text-sm tracking-wide px-3.5 py-1.5 rounded-xl transition-colors duration-200"
                style={{ color: active === id ? 'var(--text-1)' : 'var(--text-3)' }}
              >
                {active === id && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 rounded-xl"
                    style={{ background: 'rgba(255,255,255,0.07)' }}
                    transition={{ type: 'spring', bounce: 0.18, duration: 0.4 }}
                  />
                )}
                <span className="relative z-10">{label}</span>
              </button>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => scrollTo('contact')}
              className="btn-primary font-body text-sm px-5 py-2.5 rounded-xl"
            >
              Let&apos;s Talk
            </button>
          </div>

          {/* Hamburger */}
          <button
            className="md:hidden flex flex-col justify-center items-end gap-1.5 w-7 h-7"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="block h-px transition-all duration-300 origin-center"
                style={{
                  background: 'var(--text-1)',
                  width: i === 1 ? (menuOpen ? '20px' : '14px') : '20px',
                  transform: menuOpen
                    ? i === 0 ? 'translateY(6px) rotate(45deg)' : i === 2 ? 'translateY(-6px) rotate(-45deg)' : 'scaleX(0)'
                    : 'none',
                  opacity: menuOpen && i === 1 ? 0 : 1,
                }}
              />
            ))}
          </button>
        </div>
      </motion.header>

      {/* Mobile fullscreen menu */}
      <AnimatePresence>
        {menuOpen && (
            <motion.div
              initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
              animate={{ opacity: 1, backdropFilter: 'blur(40px)' }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-6 px-6 text-center"
              style={{ background: 'rgba(5,6,11,0.92)' }}
            >
              {NAV_LINKS.map(({ label, id }, i) => (
                <motion.button
                  key={id}
                initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 16 }}
                  transition={{ delay: i * 0.06, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  onClick={() => scrollTo(id)}
                  className="font-display font-semibold text-3xl sm:text-4xl transition-colors duration-200"
                  style={{ color: active === id ? 'var(--accent)' : 'var(--text-1)' }}
                >
                  {label}
                </motion.button>
              ))}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.32 }}
                onClick={() => scrollTo('contact')}
                className="btn-primary mt-4 font-body text-xs font-semibold px-7 py-3 rounded-xl"
              >
                Let&apos;s Talk
              </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
