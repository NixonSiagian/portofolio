import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

const SOCIALS = [
  { label: 'GitHub',     href: 'https://github.com' },
  { label: 'LinkedIn',   href: 'https://linkedin.com' },
  { label: 'Twitter',    href: 'https://twitter.com' },
  { label: 'Email',      href: 'mailto:nixonsiagian@example.com' },
]

function ExternalIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 11 11" fill="none" className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
      <path
        d="M1 10L10 1M10 1H4M10 1V7"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function Contact() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-90px' })
  const [copied, setCopied] = useState(false)

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText('nixonsiagian@example.com')
      setCopied(true)
      setTimeout(() => setCopied(false), 2200)
    } catch (_) {}
  }

  return (
    <section id="contact" className="section-pad-tight" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-14 lg:gap-20 items-start">

          {/* Label */}
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
              04 — Contact
            </span>
            <div className="w-7 h-px" style={{ background: 'var(--border)' }} />
          </motion.div>

          {/* Main content */}
          <div className="flex-1 max-w-2xl lg:ml-6">

            {/* Large heading */}
            <motion.h2
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.85, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="font-display font-bold leading-[1.0] mb-7"
              style={{ fontSize: 'clamp(2.8rem, 7vw, 5.5rem)', color: 'var(--text-1)' }}
            >
              Let's make{' '}
              <br />
              <span className="text-accent-gradient">something</span>
              <br />
              together.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.22 }}
              className="font-body leading-relaxed mb-9"
              style={{ color: 'var(--text-2)' }}
            >
              Open to freelance projects, collaborations, and full-time roles.
              If you have an idea worth building, I'm all ears.
            </motion.p>

            {/* Email copy pill */}
            <motion.button
              initial={{ opacity: 0, y: 18 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              onClick={copyEmail}
              className="glass flex items-center gap-4 px-6 py-4 rounded-2xl mb-10 w-full max-w-sm text-left group transition-all duration-200 hover:scale-[1.01] active:scale-[0.99]"
              style={{
                borderColor: copied ? 'rgba(192,164,124,0.3)' : 'var(--border)',
              }}
            >
              <span className="font-body text-sm flex-1" style={{ color: 'var(--text-2)' }}>
                nixonsiagian@example.com
              </span>
              <AnimatePresence mode="wait">
                <motion.span
                  key={copied ? 'copied' : 'copy'}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2 }}
                  className="font-body text-xs font-medium flex-shrink-0"
                  style={{ color: copied ? 'var(--accent)' : 'var(--text-3)' }}
                >
                  {copied ? '✓ Copied' : 'Copy'}
                </motion.span>
              </AnimatePresence>
            </motion.button>

            {/* Social links */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.38 }}
              className="flex flex-wrap gap-2.5"
            >
              {SOCIALS.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass group flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-body text-sm transition-all duration-200 hover:scale-[1.03] active:scale-[0.98]"
                  style={{ color: 'var(--text-2)' }}
                  onMouseEnter={e => e.currentTarget.style.color = 'var(--text-1)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'var(--text-2)'}
                >
                  {label}
                  <ExternalIcon />
                </a>
              ))}
            </motion.div>

            {/* Divider + footer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 1.2, delay: 0.7 }}
              className="mt-16 pt-8"
              style={{ borderTop: '1px solid var(--border)' }}
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <p
                  className="font-body text-xs tracking-wide"
                  style={{ color: 'var(--text-3)' }}
                >
                  © 2024 Nixon Siagian
                </p>
                <p
                  className="font-body text-xs"
                  style={{ color: 'var(--text-3)' }}
                >
                  Designed &amp; built with care
                </p>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  )
}
