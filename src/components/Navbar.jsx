import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

function NSLogo() {
  return (
    <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Outer glass rect */}
      <rect
        x="0.5" y="0.5" width="37" height="37" rx="9.5"
        fill="rgba(255,255,255,0.04)"
        stroke="rgba(255,255,255,0.1)"
      />
      {/* N letter */}
      <path
        d="M10 27V11L18 24V11"
        stroke="#D5B98A"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* S letter */}
      <path
        d="M22 15C22 13.3431 23.3431 12 25 12H26C27.6569 12 29 13.3431 29 15C29 16.6569 27.6569 18 26 18H24C22.3431 18 21 19.3431 21 21V22C21 23.6569 22.3431 25 24 25H26C27.6569 25 29 23.6569 29 22"
        stroke="#7BB6FF"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      {/* Subtle corner glow */}
       <circle cx="34" cy="4" r="6" fill="rgba(213,185,138,0.16)" />
    </svg>
  )
}

const NAV_LINKS = [
  { label: 'About', id: 'about' },
  { label: 'Skills', id: 'skills' },
  { label: 'Work', id: 'work' },
  { label: 'Contact', id: 'contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

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
        className="fixed top-0 left-0 right-0 z-50 px-5 pt-4 md:px-8 md:pt-5"
      >
        <div
          className="max-w-7xl mx-auto flex items-center justify-between rounded-2xl px-5 py-3 transition-all duration-500"
          style={scrolled ? {
            background: 'rgba(5,6,11,0.76)',
            backdropFilter: 'blur(22px)',
            WebkitBackdropFilter: 'blur(22px)',
            border: '1px solid rgba(255,255,255,0.08)',
          } : {}}
        >
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-3"
          >
            <NSLogo />
            <span
              className="hidden sm:block font-display font-medium text-xs tracking-[0.15em] uppercase"
              style={{ color: 'var(--text-2)' }}
            >
              Nixon Siagian
            </span>
          </button>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-7">
            {NAV_LINKS.map(({ label, id }) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className="font-body text-sm tracking-wide link-underline transition-colors duration-200"
                style={{ color: 'var(--text-2)' }}
                onMouseEnter={e => e.target.style.color = 'var(--text-1)'}
                onMouseLeave={e => e.target.style.color = 'var(--text-2)'}
              >
                {label}
              </button>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => scrollTo('contact')}
              className="font-body text-sm font-medium px-5 py-2.5 rounded-xl transition-all duration-200"
              style={{
                background: 'var(--accent)',
                color: 'var(--bg)',
              }}
              onMouseEnter={e => e.currentTarget.style.opacity = '0.88'}
              onMouseLeave={e => e.currentTarget.style.opacity = '1'}
            >
                Let&apos;s Talk
            </button>
          </div>

          {/* Hamburger */}
          <button
            className="md:hidden flex flex-col justify-center items-end gap-[5px] w-8 h-8"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="block h-px transition-all duration-300 origin-center"
                style={{
                  background: 'var(--text-1)',
                  width: i === 1 ? (menuOpen ? '24px' : '16px') : '24px',
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 glass-strong flex flex-col items-center justify-center gap-10"
          >
            {NAV_LINKS.map(({ label, id }, i) => (
              <motion.button
                key={id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 16 }}
                transition={{ delay: i * 0.06, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                onClick={() => scrollTo(id)}
                className="font-display font-bold text-5xl"
                style={{ color: 'var(--text-1)' }}
              >
                {label}
              </motion.button>
            ))}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.28 }}
              onClick={() => scrollTo('contact')}
              className="mt-4 font-body text-sm font-medium px-7 py-3 rounded-xl"
              style={{ background: 'var(--accent)', color: 'var(--bg)' }}
            >
                Let&apos;s Talk
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
