import { useRef, useEffect, useState, useCallback } from 'react'
import { motion, useInView } from 'framer-motion'

const GITHUB_USER = 'nixonsiagian'
const CONTRIB_API = `https://github-contributions-api.jogruber.de/v4/${GITHUB_USER}?y=last`

const LEVEL_COLORS = [
  'rgba(255,255,255,0.05)',   // 0 — empty
  'rgba(213,185,138,0.25)',   // 1 — light
  'rgba(213,185,138,0.50)',   // 2 — medium
  'rgba(213,185,138,0.75)',   // 3 — high
  'rgba(213,185,138,1.00)',   // 4 — max
]

const DAY_LABELS = ['Mon', '', 'Wed', '', 'Fri', '', '']
const MONTH_LABELS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

function buildWeeks(contributions) {
  if (!contributions?.length) return []
  const sorted = [...contributions].sort((a, b) => new Date(a.date) - new Date(b.date))
  const weeks = []
  let week = []
  const firstDay = new Date(sorted[0].date).getDay()
  // Pad start of first week
  for (let i = 0; i < firstDay; i++) week.push(null)
  for (const c of sorted) {
    week.push(c)
    if (week.length === 7) {
      weeks.push(week)
      week = []
    }
  }
  if (week.length > 0) weeks.push(week)
  return weeks
}

function getMonthPositions(weeks) {
  const positions = []
  let lastMonth = -1
  weeks.forEach((week, wi) => {
    const firstValid = week.find(Boolean)
    if (firstValid) {
      const month = new Date(firstValid.date).getMonth()
      if (month !== lastMonth) {
        positions.push({ month, wi })
        lastMonth = month
      }
    }
  })
  return positions
}

export default function GitHubContributions() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-90px' })
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [tooltip, setTooltip] = useState(null)
  const [cellSize, setCellSize] = useState(13)

  useEffect(() => {
    fetch(CONTRIB_API)
      .then((r) => r.ok ? r.json() : Promise.reject())
      .then((json) => { setData(json); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  useEffect(() => {
    const updateSize = () => {
      setCellSize(window.innerWidth < 640 ? 10 : 13)
    }
    updateSize()
    window.addEventListener('resize', updateSize, { passive: true })
    return () => window.removeEventListener('resize', updateSize)
  }, [])

  const showTooltip = useCallback((e, cell) => {
    if (!cell) return
    const rect = e.currentTarget.getBoundingClientRect()
    setTooltip({
      x: rect.left + rect.width / 2,
      y: rect.top - 8,
      date: cell.date,
      count: cell.count,
    })
  }, [])

  const hideTooltip = useCallback(() => setTooltip(null), [])

  const contributions = data?.contributions || []
  const totalYear = contributions.reduce((s, c) => s + c.count, 0)
  const maxStreak = (() => {
    let best = 0, cur = 0
    for (const c of contributions) {
      if (c.count > 0) { cur++; best = Math.max(best, cur) } else cur = 0
    }
    return best
  })()
  const activeDays = contributions.filter((c) => c.count > 0).length

  const weeks = buildWeeks(contributions)
  const monthPositions = getMonthPositions(weeks)

  const CELL = cellSize
  const GAP = cellSize < 12 ? 2 : 3

  return (
    <section id="contributions" className="section-pad-tight" ref={ref}>
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
              05 — Activity
            </span>
            <div className="w-7 h-px mb-5" style={{ background: 'var(--border)' }} />
            <p className="font-body text-sm leading-relaxed max-w-[180px]" style={{ color: 'var(--text-3)' }}>
              GitHub contribution activity over the last year.
            </p>
          </motion.div>

          {/* Right */}
          <div className="flex-1 min-w-0">
            <motion.h2
              initial={{ opacity: 0, y: 18 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="font-display font-semibold mb-8"
              style={{ fontSize: 'clamp(2rem, 3.9vw, 3rem)', color: 'var(--text-1)' }}
            >
              Contribution Graph
            </motion.h2>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="flex flex-wrap gap-4 mb-8"
            >
              {[
                { label: 'Contributions (yr)', value: loading ? '—' : totalYear },
                { label: 'Longest streak', value: loading ? '—' : `${maxStreak}d` },
                { label: 'Active days', value: loading ? '—' : activeDays },
              ].map(({ label, value }) => (
                <div key={label} className="glass px-4 py-2.5 sm:px-5 sm:py-3 rounded-xl">
                  <p className="font-display font-bold text-xl" style={{ color: 'var(--accent)' }}>{value}</p>
                  <p className="font-body text-[11px] uppercase tracking-wide mt-0.5" style={{ color: 'var(--text-3)' }}>{label}</p>
                </div>
              ))}
            </motion.div>

            {/* Heatmap */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.25 }}
              className="glass-card p-5 sm:p-6 relative overflow-hidden"
            >
              {/* Background glow */}
              <div className="absolute top-0 right-0 w-64 h-64 pointer-events-none"
                style={{ background: 'radial-gradient(circle, rgba(213,185,138,0.06), transparent 70%)' }} />

              {loading ? (
                <div className="flex flex-wrap gap-1">
                  {Array.from({ length: 52 * 7 }).map((_, i) => (
                    <div key={i} className="skeleton rounded-sm" style={{ width: CELL, height: CELL }} />
                  ))}
                </div>
              ) : !contributions.length ? (
                <p className="font-body text-sm text-center py-8" style={{ color: 'var(--text-3)' }}>
                  Could not load contribution data.
                </p>
              ) : (
                <div className="overflow-x-auto">
                  <div style={{ display: 'inline-block', minWidth: 'max-content' }}>
                    {/* Month labels */}
                    <div className="flex mb-1 relative" style={{ paddingLeft: 24 }}>
                      {monthPositions.map(({ month, wi }) => (
                        <div
                          key={`${month}-${wi}`}
                          className="absolute font-body text-[10px]"
                          style={{
                            color: 'var(--text-3)',
                            left: 24 + wi * (CELL + GAP),
                          }}
                        >
                          {MONTH_LABELS[month]}
                        </div>
                      ))}
                      <div style={{ height: 16 }} />
                    </div>

                    <div className="flex gap-[3px]">
                      {/* Day labels */}
                      <div className="flex flex-col gap-[3px] mr-1">
                        {DAY_LABELS.map((d, i) => (
                          <div
                            key={i}
                            className="font-body text-[10px] flex items-center justify-end"
                            style={{ color: 'var(--text-3)', width: 20, height: CELL }}
                          >
                            {d}
                          </div>
                        ))}
                      </div>

                      {/* Cells */}
                      {weeks.map((week, wi) => (
                        <div key={wi} className="flex flex-col gap-[3px]">
                          {week.map((cell, di) => (
                            <div
                              key={di}
                              className="contrib-cell"
                              style={{
                                width: CELL,
                                height: CELL,
                                background: cell ? LEVEL_COLORS[cell.level ?? 0] : 'rgba(255,255,255,0.03)',
                                boxShadow: cell && cell.count > 0 ? `0 0 ${cell.level * 3}px rgba(213,185,138,${cell.level * 0.12})` : 'none',
                              }}
                              onMouseEnter={(e) => showTooltip(e, cell)}
                              onMouseLeave={hideTooltip}
                            />
                          ))}
                        </div>
                      ))}
                    </div>

                    {/* Legend */}
                    <div className="flex items-center gap-2 mt-3 justify-end">
                      <span className="font-body text-[10px]" style={{ color: 'var(--text-3)' }}>Less</span>
                      {LEVEL_COLORS.map((c, i) => (
                        <div key={i} className="contrib-cell" style={{ width: CELL, height: CELL, background: c }} />
                      ))}
                      <span className="font-body text-[10px]" style={{ color: 'var(--text-3)' }}>More</span>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </div>

        </div>
      </div>

      {/* Tooltip */}
      {tooltip && (
        <div
          className="fixed z-50 pointer-events-none glass px-3 py-1.5 rounded-lg"
          style={{
            left: tooltip.x,
            top: tooltip.y,
            transform: 'translate(-50%, -100%)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
          }}
        >
          <p className="font-body text-xs whitespace-nowrap" style={{ color: 'var(--text-1)' }}>
            <span style={{ color: 'var(--accent)' }}>{tooltip.count}</span>{' '}
            contribution{tooltip.count !== 1 ? 's' : ''} on{' '}
            {new Date(tooltip.date + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          </p>
        </div>
      )}
    </section>
  )
}
