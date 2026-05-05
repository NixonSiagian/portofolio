import { useEffect, useRef } from 'react'
import Navbar from './components/Navbar'
import Hero from './sections/Hero'
import About from './sections/About'
import Skills from './sections/Skills'
import Work from './sections/Work'
import Contact from './sections/Contact'

function CustomCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    let raf
    const mouse = { x: -100, y: -100 }
    const ring = { x: -100, y: -100 }

    const onMove = (e) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
    }

    const tick = () => {
      if (dotRef.current) {
        dotRef.current.style.left = mouse.x + 'px'
        dotRef.current.style.top = mouse.y + 'px'
      }
      if (ringRef.current) {
        ring.x += (mouse.x - ring.x) * 0.11
        ring.y += (mouse.y - ring.y) * 0.11
        ringRef.current.style.left = ring.x + 'px'
        ringRef.current.style.top = ring.y + 'px'
      }
      raf = requestAnimationFrame(tick)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    raf = requestAnimationFrame(tick)
    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <>
      <div ref={dotRef} className="cursor hidden md:block" />
      <div ref={ringRef} className="cursor-ring hidden md:block" />
    </>
  )
}

export default function App() {
  return (
    <div className="relative min-h-screen overflow-x-hidden" style={{ background: 'var(--bg)' }}>
      <div className="noise-overlay" />
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Work />
        <Contact />
      </main>
    </div>
  )
}
