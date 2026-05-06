import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

const EMAIL = 'nixonsiagian49@gmail.com'
const GITHUB = 'https://github.com/nixonsiagian'

function CopyIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <rect x="4" y="4" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.2"/>
      <path d="M2 10V2.5A.5.5 0 0 1 2.5 2H10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M2.5 7.5L5.5 10.5L11.5 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function GitHubIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/>
    </svg>
  )
}

function EmailIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="2" y="4" width="20" height="16" rx="2"/>
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
    </svg>
  )
}

function InputField({ label, name, type = 'text', placeholder, value, onChange, required }) {
  const [focused, setFocused] = useState(false)
  return (
    <div className="relative">
      <label className="block font-body text-xs uppercase tracking-[0.12em] mb-2" style={{ color: 'var(--text-3)' }}>
        {label}
      </label>
      <div
        className="relative rounded-xl transition-all duration-300"
        style={{
          border: `1px solid ${focused ? 'rgba(213,185,138,0.35)' : 'rgba(255,255,255,0.09)'}`,
          boxShadow: focused ? '0 0 20px rgba(213,185,138,0.1)' : 'none',
        }}
      >
        {type === 'textarea' ? (
          <textarea
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            required={required}
            rows={4}
            className="w-full bg-transparent px-4 py-3 font-body text-sm resize-none outline-none rounded-xl"
            style={{ color: 'var(--text-1)', caretColor: 'var(--accent)' }}
          />
        ) : (
          <input
            type={type}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            required={required}
            className="w-full bg-transparent px-4 py-3 font-body text-sm outline-none rounded-xl"
            style={{ color: 'var(--text-1)', caretColor: 'var(--accent)' }}
          />
        )}
        {/* Gradient bottom border on focus */}
        <div
          className="absolute bottom-0 left-0 right-0 h-px rounded-b-xl transition-opacity duration-300"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(213,185,138,0.5), transparent)',
            opacity: focused ? 1 : 0,
          }}
        />
      </div>
    </div>
  )
}

export default function Contact() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-90px' })
  const [copied, setCopied] = useState(false)
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL)
      setCopied(true)
      setTimeout(() => setCopied(false), 2200)
    } catch (_) {}
  }

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSending(true)
    // Simulate async send (replace with real backend/Formspree integration)
    await new Promise((r) => setTimeout(r, 1200))
    setSending(false)
    setSent(true)
    setForm({ name: '', email: '', message: '' })
    setTimeout(() => setSent(false), 4000)
  }

  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 24 },
    animate: inView ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] },
  })

  return (
    <section id="contact" className="section-pad" ref={ref}>
      <div className="max-w-7xl mx-auto">
        {/* Section label */}
        <motion.div {...fadeUp(0)} className="mb-14">
          <span className="font-body text-[11px] tracking-[0.18em] uppercase block mb-3" style={{ color: 'var(--accent)' }}>
            07 — Contact
          </span>
          <div className="w-7 h-px" style={{ background: 'var(--border)' }} />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* LEFT: Heading + Info */}
          <div>
            <motion.h2
              {...fadeUp(0.1)}
              className="font-display font-bold leading-[1.0] mb-6"
              style={{ fontSize: 'clamp(2.4rem, 6vw, 4.8rem)', color: 'var(--text-1)' }}
            >
              Let&apos;s Build{' '}
              <br />
              <span className="text-accent-gradient">Something</span>
              <br />
              Amazing.
            </motion.h2>

            <motion.p {...fadeUp(0.2)} className="font-body leading-relaxed mb-10 max-w-md" style={{ color: 'var(--text-2)' }}>
              Currently available for freelance projects, startup collaborations, and software engineering opportunities.
              If you have a product worth building, I&apos;m all ears.
            </motion.p>

            {/* Contact info */}
            <motion.div {...fadeUp(0.28)} className="space-y-3 mb-10">
              {/* Email */}
              <button
                onClick={copyEmail}
                className="glass w-full flex items-center gap-4 px-4 py-3.5 sm:px-5 sm:py-4 rounded-2xl group transition-all duration-200 hover:border-[rgba(213,185,138,0.25)] text-left"
                style={{ borderColor: copied ? 'rgba(213,185,138,0.3)' : '' }}
              >
                <span style={{ color: 'var(--accent)' }}><EmailIcon /></span>
                <div className="flex-1 min-w-0">
                  <p className="font-body text-[11px] uppercase tracking-wide mb-0.5" style={{ color: 'var(--text-3)' }}>Email</p>
                  <p className="font-body text-sm truncate" style={{ color: 'var(--text-1)' }}>{EMAIL}</p>
                </div>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={copied ? 'check' : 'copy'}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.15 }}
                    style={{ color: copied ? '#4ade80' : 'var(--text-3)' }}
                  >
                    {copied ? <CheckIcon /> : <CopyIcon />}
                  </motion.span>
                </AnimatePresence>
              </button>

              {/* GitHub */}
              <a
                href={GITHUB}
                target="_blank"
                rel="noopener noreferrer"
                className="glass w-full flex items-center gap-4 px-4 py-3.5 sm:px-5 sm:py-4 rounded-2xl group transition-all duration-200 hover:border-[rgba(123,182,255,0.25)]"
              >
                <span style={{ color: 'var(--accent-2)' }}><GitHubIcon /></span>
                <div className="flex-1 min-w-0">
                  <p className="font-body text-[11px] uppercase tracking-wide mb-0.5" style={{ color: 'var(--text-3)' }}>GitHub</p>
                  <p className="font-body text-sm" style={{ color: 'var(--text-1)' }}>@nixonsiagian</p>
                </div>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <path d="M1 11L11 1M11 1H4M11 1V8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--accent-2)' }}/>
                </svg>
              </a>
            </motion.div>
          </div>

          {/* RIGHT: Contact form */}
          <motion.div {...fadeUp(0.18)}>
            <div className="glass-card p-6 sm:p-8 relative overflow-hidden">
              {/* Glow */}
              <div className="absolute -top-10 -right-10 w-40 h-40 pointer-events-none"
                style={{ background: 'radial-gradient(circle, rgba(213,185,138,0.08), transparent 70%)', borderRadius: '50%' }} />

              <h3 className="font-display font-semibold text-xl mb-6" style={{ color: 'var(--text-1)' }}>
                Send a Message
              </h3>

              <AnimatePresence mode="wait">
                {sent ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -16 }}
                    className="py-12 text-center"
                  >
                    <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
                      style={{ background: 'rgba(74,222,128,0.12)', border: '1px solid rgba(74,222,128,0.3)' }}>
                      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                        <path d="M4 11L9 16L18 7" stroke="#4ade80" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <p className="font-display font-semibold text-lg mb-2" style={{ color: 'var(--text-1)' }}>Message sent!</p>
                    <p className="font-body text-sm" style={{ color: 'var(--text-3)' }}>I&apos;ll get back to you soon.</p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    className="space-y-5"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <InputField
                      label="Full Name"
                      name="name"
                      placeholder="Your name"
                      value={form.name}
                      onChange={handleChange}
                      required
                    />
                    <InputField
                      label="Email Address"
                      name="email"
                      type="email"
                      placeholder="your@email.com"
                      value={form.email}
                      onChange={handleChange}
                      required
                    />
                    <InputField
                      label="Project Details"
                      name="message"
                      type="textarea"
                      placeholder="Tell me about your project..."
                      value={form.message}
                      onChange={handleChange}
                      required
                    />

                    <button
                      type="submit"
                      disabled={sending}
                      className="btn-primary w-full font-display font-semibold text-sm px-6 py-4 rounded-xl relative overflow-hidden disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {sending ? (
                        <span className="flex items-center justify-center gap-2">
                          <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"/>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                          </svg>
                          Sending…
                        </span>
                      ) : (
                        'SEND MESSAGE'
                      )}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}

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
