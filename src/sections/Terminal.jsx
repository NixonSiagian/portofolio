import { useRef, useState, useEffect } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

const COMMANDS = {
  whois: {
    output: [
      { type: 'key', text: 'Name:        ', value: 'Nixon Siagian' },
      { type: 'key', text: 'Role:        ', value: 'Software Engineer' },
      { type: 'key', text: 'Speciality:  ', value: 'iOS Development & Frontend Engineering' },
      { type: 'key', text: 'Building:    ', value: 'Immersive apps since 2022' },
      { type: 'key', text: 'Location:    ', value: 'Indonesia' },
      { type: 'key', text: 'Status:      ', value: '✦ Available for opportunities', accent: true },
    ],
  },
  skills: {
    output: [
      { type: 'plain', text: 'Languages:   HTML5 · CSS3 · JavaScript · Python · Swift · C++ · Pawn' },
      { type: 'plain', text: 'Tools:       Git · VS Code · Figma · Node.js · REST APIs · CLI' },
      { type: 'plain', text: 'Mobile:      Swift · UIKit · SwiftUI · iOS SDK' },
      { type: 'plain', text: 'Systems:     C++ · Bash · Scripting · Automation' },
    ],
  },
  contact: {
    output: [
      { type: 'key', text: 'Email:   ', value: 'nixonsiagian49@gmail.com' },
      { type: 'key', text: 'GitHub:  ', value: 'github.com/nixonsiagian' },
      { type: 'key', text: 'Location:', value: 'Indonesia 🇮🇩' },
    ],
  },
  clear: { output: [] },
  help: {
    output: [
      { type: 'plain', text: 'Available commands:' },
      { type: 'plain', text: '' },
      { type: 'key', text: '  whois    ', value: '— Who is Nixon Siagian?' },
      { type: 'key', text: '  skills   ', value: '— Technical skills overview' },
      { type: 'key', text: '  contact  ', value: '— Get in touch' },
      { type: 'key', text: '  clear    ', value: '— Clear terminal' },
      { type: 'key', text: '  help     ', value: '— Show this menu' },
    ],
  },
}

const INITIAL_LINES = [
  { type: 'system', text: 'Nixon Siagian Portfolio v2.0 — Interactive Terminal' },
  { type: 'system', text: 'Type "help" to see available commands.' },
  { type: 'divider' },
]

const DEMO_SEQUENCE = [
  { action: 'type', text: 'whois nixon', delay: 800 },
  { action: 'run', cmd: 'whois', delay: 400 },
  { action: 'wait', delay: 1600 },
  { action: 'clear', delay: 300 },
  { action: 'type', text: 'skills', delay: 600 },
  { action: 'run', cmd: 'skills', delay: 400 },
]

function useTypewriter(target, active) {
  const [text, setText] = useState('')
  useEffect(() => {
    if (!active) { setText(''); return }
    let i = 0
    const interval = setInterval(() => {
      i++
      setText(target.slice(0, i))
      if (i >= target.length) clearInterval(interval)
    }, 55)
    return () => clearInterval(interval)
  }, [target, active])
  return text
}

export default function Terminal() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-90px' })
  const inputRef = useRef(null)
  const bodyRef = useRef(null)

  const [lines, setLines] = useState(INITIAL_LINES)
  const [inputVal, setInputVal] = useState('')
  const [demoInput, setDemoInput] = useState('')
  const [demoRunning, setDemoRunning] = useState(false)
  const demoStarted = useRef(false)

  const runCommand = (cmd, fromInput = false) => {
    const trimmed = cmd.trim().toLowerCase().split(' ')[0]
    if (trimmed === 'clear') {
      setLines(INITIAL_LINES)
      return
    }
    const prompt = { type: 'prompt', text: cmd }
    const result = COMMANDS[trimmed]
    const outputLines = result
      ? result.output
      : [{ type: 'plain', text: `command not found: ${trimmed}. Try "help"` }]
    setLines((prev) => [...prev, prompt, ...outputLines, { type: 'spacer' }])
  }

  const handleKey = (e) => {
    if (e.key === 'Enter') {
      if (inputVal.trim()) runCommand(inputVal)
      setInputVal('')
    }
  }

  // Auto-scroll to bottom
  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight
    }
  }, [lines])

  // Demo autoplay when section enters view
  useEffect(() => {
    if (!inView || demoStarted.current) return
    demoStarted.current = true
    setDemoRunning(true)

    let timer
    const steps = [...DEMO_SEQUENCE]
    let i = 0
    let accumulated = 0

    const schedule = () => {
      if (i >= steps.length) { setDemoRunning(false); setDemoInput(''); return }
      const step = steps[i++]
      accumulated += step.delay

      timer = setTimeout(() => {
        if (step.action === 'type') {
          let j = 0
          const typeInterval = setInterval(() => {
            j++
            setDemoInput(step.text.slice(0, j))
            if (j >= step.text.length) clearInterval(typeInterval)
          }, 55)
        } else if (step.action === 'run') {
          setDemoInput('')
          runCommand(step.cmd)
        } else if (step.action === 'clear') {
          setLines(INITIAL_LINES)
          setDemoInput('')
        }
        schedule()
      }, step.delay)
    }

    timer = setTimeout(schedule, 600)
    return () => clearTimeout(timer)
  }, [inView])

  const displayInput = demoRunning ? demoInput : inputVal

  return (
    <section id="terminal" className="section-pad-tight" ref={ref}>
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
              06 — Terminal
            </span>
            <div className="w-7 h-px mb-5" style={{ background: 'var(--border)' }} />
            <p className="font-body text-sm leading-relaxed max-w-[180px]" style={{ color: 'var(--text-3)' }}>
              Interactive developer terminal. Try <code style={{ color: 'var(--accent-2)' }}>help</code> to start.
            </p>
          </motion.div>

          {/* Terminal window */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.85, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="flex-1 max-w-2xl relative overflow-hidden"
          >
            {/* Ambient glow */}
            <div className="absolute -inset-4 sm:-inset-6 pointer-events-none opacity-40"
              style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(123,182,255,0.1), transparent 65%)' }} />

            <div className="terminal-window relative" onClick={() => !demoRunning && inputRef.current?.focus()}>
              {/* Title bar */}
              <div className="flex items-center gap-2 px-5 py-3.5 border-b" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
                <div className="w-3 h-3 rounded-full" style={{ background: '#FF5F57' }} />
                <div className="w-3 h-3 rounded-full" style={{ background: '#FFBD2E' }} />
                <div className="w-3 h-3 rounded-full" style={{ background: '#28C840' }} />
                <span className="ml-3 font-body text-[11px] tracking-wide" style={{ color: 'var(--text-3)' }}>
                  nixon@portfolio ~ zsh
                </span>
              </div>

              {/* Body */}
              <div
                ref={bodyRef}
                className="terminal-body overflow-y-auto"
                style={{ minHeight: 'clamp(220px, 45vh, 320px)', maxHeight: 'clamp(320px, 55vh, 380px)' }}
              >
                {lines.map((line, i) => {
                  if (line.type === 'divider') {
                    return <div key={i} className="my-2" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }} />
                  }
                  if (line.type === 'spacer') {
                    return <div key={i} className="h-2" />
                  }
                  if (line.type === 'system') {
                    return (
                      <p key={i} className="mb-0.5" style={{ color: 'var(--text-3)' }}>
                        {line.text}
                      </p>
                    )
                  }
                  if (line.type === 'prompt') {
                    return (
                      <p key={i} className="mb-0.5">
                        <span style={{ color: '#7FE2B4' }}>❯ </span>
                        <span style={{ color: 'var(--text-1)' }}>{line.text}</span>
                      </p>
                    )
                  }
                  if (line.type === 'key') {
                    return (
                      <p key={i} className="mb-0.5">
                        <span style={{ color: 'var(--accent)' }}>{line.text}</span>
                        <span style={{ color: line.accent ? '#4ade80' : 'var(--accent-2)' }}>{line.value}</span>
                      </p>
                    )
                  }
                  return (
                    <p key={i} className="mb-0.5" style={{ color: 'var(--text-2)' }}>
                      {line.text}
                    </p>
                  )
                })}

                {/* Input line */}
                <div className="flex items-center mt-1">
                  <span style={{ color: '#7FE2B4' }}>❯ </span>
                  <span className="ml-1" style={{ color: 'var(--text-1)' }}>{displayInput}</span>
                  <span className="cursor-blink ml-0.5" />
                  {!demoRunning && (
                    <input
                      ref={inputRef}
                      value={inputVal}
                      onChange={(e) => setInputVal(e.target.value)}
                      onKeyDown={handleKey}
                      className="absolute opacity-0 w-0 h-0"
                      aria-label="Terminal input"
                      autoComplete="off"
                      spellCheck="false"
                    />
                  )}
                </div>
              </div>
            </div>

            {/* Quick commands */}
            <div className="flex flex-wrap gap-2 mt-4">
              {Object.keys(COMMANDS).filter(c => c !== 'clear').map((cmd) => (
                <button
                  key={cmd}
                  onClick={() => { if (!demoRunning) runCommand(cmd) }}
                  className="glass font-body text-xs px-3 py-1.5 rounded-lg transition-all duration-200 hover:border-[rgba(123,182,255,0.3)]"
                  style={{ color: 'var(--text-3)' }}
                  onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent-2)'}
                  onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-3)'}
                >
                  {cmd}
                </button>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
