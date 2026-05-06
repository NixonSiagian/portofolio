import { motion } from 'framer-motion'

const LINKS = [
  { label: 'GitHub', href: 'https://github.com/nixonsiagian' },
  { label: 'LinkedIn', href: 'https://linkedin.com' },
  { label: 'Email', href: 'mailto:nixonsiagian49@gmail.com' },
]

export default function Footer() {
  return (
    <footer className="relative overflow-hidden" style={{ borderTop: '1px solid var(--border)' }}>
      {/* Subtle ambient light */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-px pointer-events-none"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(213,185,138,0.3), transparent)' }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-10 xl:px-16 py-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">

          {/* Logo mark */}
          <div className="flex items-center gap-3">
            <span className="font-display font-bold text-xl tracking-tighter" style={{ color: 'var(--text-1)' }}>
              NIXON<span style={{ color: 'var(--accent)' }}>.</span>
            </span>
          </div>

          {/* Copyright */}
          <p className="font-body text-xs text-center" style={{ color: 'var(--text-3)' }}>
            © 2026 Nixon Siagian — Developed With Precision
          </p>

          {/* Social links */}
          <div className="flex items-center gap-4">
            {LINKS.map(({ label, href }) => (
              <motion.a
                key={label}
                href={href}
                target={href.startsWith('mailto') ? undefined : '_blank'}
                rel="noopener noreferrer"
                whileHover={{ y: -2 }}
                className="font-body text-xs tracking-wide link-underline transition-colors duration-200"
                style={{ color: 'var(--text-3)' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-1)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-3)')}
              >
                {label}
              </motion.a>
            ))}
          </div>

        </div>
      </div>
    </footer>
  )
}
