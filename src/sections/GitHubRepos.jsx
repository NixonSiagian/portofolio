import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const GITHUB_USER = 'nixonsiagian'

function StarIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <path d="M6 1L7.34 4.26L11 4.64L8.4 7.06L9.18 10.64L6 8.82L2.82 10.64L3.6 7.06L1 4.64L4.66 4.26L6 1Z"
        fill="currentColor" stroke="currentColor" strokeWidth="0.5" strokeLinejoin="round"/>
    </svg>
  )
}

function ForkIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <circle cx="3" cy="2.5" r="1.5" stroke="currentColor" strokeWidth="1.2"/>
      <circle cx="9" cy="2.5" r="1.5" stroke="currentColor" strokeWidth="1.2"/>
      <circle cx="6" cy="9.5" r="1.5" stroke="currentColor" strokeWidth="1.2"/>
      <path d="M3 4v1a3 3 0 003 3M9 4v1a3 3 0 01-3 3" stroke="currentColor" strokeWidth="1.2"/>
    </svg>
  )
}

function ExternalIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <path d="M1.5 10.5L10.5 1.5M10.5 1.5H4.5M10.5 1.5V7.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

const LANG_COLORS = {
  JavaScript: '#F7DF1E',
  TypeScript: '#3178C6',
  Python: '#3776AB',
  Swift: '#F05138',
  'C++': '#00599C',
  HTML: '#E44D26',
  CSS: '#1572B6',
  Pawn: '#7FE2B4',
  Shell: '#89E051',
  Ruby: '#CC342D',
  Go: '#00ADD8',
  Rust: '#CE412B',
  Java: '#B07219',
  Kotlin: '#A97BFF',
  Dart: '#00B4AB',
  PHP: '#777BB4',
}

function RepoCard({ repo, index, inView }) {
  const updatedAt = new Date(repo.updated_at)
  const timeAgo = (() => {
    const diff = Date.now() - updatedAt.getTime()
    const days = Math.floor(diff / 86400000)
    if (days < 1) return 'Today'
    if (days < 7) return `${days}d ago`
    if (days < 30) return `${Math.floor(days / 7)}w ago`
    if (days < 365) return `${Math.floor(days / 30)}mo ago`
    return `${Math.floor(days / 365)}y ago`
  })()

  const langColor = LANG_COLORS[repo.language] || 'var(--text-3)'

  return (
    <motion.a
      href={repo.html_url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: 0.1 + index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
      className="glass-card group block p-6 transition-all duration-300 hover:border-[rgba(255,255,255,0.16)]"
    >
      {/* Hover glow */}
      <div className="absolute inset-0 rounded-[22px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 20% 20%, rgba(123,182,255,0.06), transparent 65%)' }} />

      {/* Top edge glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(123,182,255,0.5), transparent)' }} />

      <div className="relative z-10 flex flex-col h-full">
        {/* Repo name + external link */}
        <div className="flex items-start justify-between gap-3 mb-2">
          <div className="flex items-center gap-2 min-w-0">
            <svg className="flex-shrink-0" width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M7 1.167A5.833 5.833 0 1 0 12.833 7 5.84 5.84 0 0 0 7 1.167ZM7 11.083A4.083 4.083 0 1 1 11.083 7 4.087 4.087 0 0 1 7 11.083ZM7 4.083a.875.875 0 1 0 .875.875A.876.876 0 0 0 7 4.083Zm.583 2.334H6.417V9.625h1.166V6.417Z"
                fill="currentColor" style={{ color: 'var(--text-3)' }}/>
            </svg>
            <h3 className="font-display font-semibold text-sm truncate transition-colors duration-200 group-hover:text-[color:var(--accent-2)]"
              style={{ color: 'var(--text-1)' }}>
              {repo.name}
            </h3>
          </div>
          <span className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-1 group-hover:translate-x-0"
            style={{ color: 'var(--accent-2)' }}>
            <ExternalIcon />
          </span>
        </div>

        {/* Description */}
        <p className="font-body text-xs leading-relaxed mb-4 flex-1"
          style={{ color: 'var(--text-3)', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {repo.description || 'No description provided.'}
        </p>

        {/* Footer */}
        <div className="flex items-center gap-4 flex-wrap">
          {repo.language && (
            <span className="flex items-center gap-1.5 font-body text-[11px]" style={{ color: 'var(--text-3)' }}>
              <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: langColor, boxShadow: `0 0 6px ${langColor}` }} />
              {repo.language}
            </span>
          )}
          <span className="flex items-center gap-1 font-body text-[11px]" style={{ color: 'var(--text-3)' }}>
            <StarIcon />{repo.stargazers_count}
          </span>
          <span className="flex items-center gap-1 font-body text-[11px]" style={{ color: 'var(--text-3)' }}>
            <ForkIcon />{repo.forks_count}
          </span>
          <span className="font-body text-[10px] ml-auto" style={{ color: 'var(--text-3)' }}>
            {timeAgo}
          </span>
        </div>
      </div>
    </motion.a>
  )
}

function SkeletonCard({ index }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: index * 0.05 }}
      className="glass-card p-6"
    >
      <div className="skeleton h-4 w-2/3 rounded mb-3" />
      <div className="skeleton h-3 w-full rounded mb-1.5" />
      <div className="skeleton h-3 w-4/5 rounded mb-6" />
      <div className="flex gap-4">
        <div className="skeleton h-3 w-16 rounded" />
        <div className="skeleton h-3 w-10 rounded" />
        <div className="skeleton h-3 w-10 rounded" />
      </div>
    </motion.div>
  )
}

export default function GitHubRepos() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-90px' })
  const [repos, setRepos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch(`https://api.github.com/users/${GITHUB_USER}/repos?sort=updated&per_page=6&type=public`)
      .then((r) => {
        if (!r.ok) throw new Error('Failed to fetch')
        return r.json()
      })
      .then((data) => {
        setRepos(data.filter((r) => !r.fork).slice(0, 6))
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  return (
    <section id="github" className="section-pad" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-14 lg:gap-20 items-start">

          {/* Left label */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="lg:w-56 flex-shrink-0"
          >
            <span className="font-body text-[11px] tracking-[0.18em] uppercase block mb-3" style={{ color: 'var(--accent)' }}>
              04 — GitHub
            </span>
            <div className="w-7 h-px mb-5" style={{ background: 'var(--border)' }} />
            <p className="font-body text-sm leading-relaxed max-w-[180px]" style={{ color: 'var(--text-3)' }}>
              Live data from{' '}
              <a
                href={`https://github.com/${GITHUB_USER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline"
                style={{ color: 'var(--accent-2)' }}
              >
                @{GITHUB_USER}
              </a>
            </p>
          </motion.div>

          {/* Right */}
          <div className="flex-1">
            <div className="flex items-end justify-between mb-10 gap-4 flex-wrap">
              <motion.h2
                initial={{ opacity: 0, y: 18 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="font-display font-semibold"
                style={{ fontSize: 'clamp(2rem, 3.9vw, 3rem)', color: 'var(--text-1)' }}
              >
                Open Source
              </motion.h2>
              <motion.a
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: 0.3 }}
                href={`https://github.com/${GITHUB_USER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 font-body text-sm transition-colors duration-200 hover:text-[color:var(--accent-2)]"
                style={{ color: 'var(--text-3)' }}
              >
                View all repos <ExternalIcon />
              </motion.a>
            </div>

            {error ? (
              <div className="glass p-6 rounded-2xl text-center">
                <p className="font-body text-sm" style={{ color: 'var(--text-3)' }}>
                  Could not load repositories.{' '}
                  <a href={`https://github.com/${GITHUB_USER}`} target="_blank" rel="noopener noreferrer"
                    className="link-underline" style={{ color: 'var(--accent-2)' }}>
                    View on GitHub →
                  </a>
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {loading
                  ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} index={i} />)
                  : repos.map((repo, i) => (
                      <RepoCard key={repo.id} repo={repo} index={i} inView={inView} />
                    ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  )
}
