import { useRef, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Html, Stars, Float } from '@react-three/drei'
import * as THREE from 'three'

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

/* ── Tech node data ────────────────────────────────────────────── */

const TECH_NODES = [
  { name: 'HTML5',      color: '#E44D26', Logo: HTML5Icon,  pos: [ 2.3,  0.8,  0.2] },
  { name: 'CSS3',       color: '#1572B6', Logo: CSS3Icon,   pos: [-2.1,  0.9, -0.4] },
  { name: 'JavaScript', color: '#F7DF1E', Logo: JSIcon,     pos: [ 0.6,  2.1,  1.5] },
  { name: 'Swift',      color: '#F05138', Logo: SwiftIcon,  pos: [ 1.9, -1.1,  1.0] },
  { name: 'Python',     color: '#3776AB', Logo: PythonIcon, pos: [-1.7, -1.3,  1.4] },
  { name: 'C++',        color: '#00599C', Logo: CppIcon,    pos: [ 0.2, -1.9, -1.6] },
]

/* ── Holographic core sphere ──────────────────────────────────── */

// Frequency (rad/s) of the glow-shell pulsing animation
const PULSE_FREQ = 0.85

function HoloSphere() {
  const coreRef  = useRef()
  const glowRef  = useRef()
  const wireRef  = useRef()

  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    if (coreRef.current) {
      coreRef.current.rotation.y =  t * 0.09
      coreRef.current.rotation.x =  Math.sin(t * 0.07) * 0.12
    }
    if (glowRef.current) {
      const pulse = 1 + Math.sin(t * PULSE_FREQ) * 0.025
      glowRef.current.scale.setScalar(pulse)
      glowRef.current.material.opacity = 0.045 + Math.sin(t * PULSE_FREQ) * 0.015
    }
    if (wireRef.current) {
      wireRef.current.rotation.y = -t * 0.055
      wireRef.current.rotation.z =  t * 0.032
    }
  })

  return (
    <group>
      {/* Bright inner core */}
      <mesh>
        <sphereGeometry args={[0.22, 16, 16]} />
        <meshBasicMaterial color="#a8d4ff" />
      </mesh>

      {/* Main sphere */}
      <mesh ref={coreRef}>
        <sphereGeometry args={[1, 48, 48]} />
        <meshStandardMaterial
          color="#030710"
          emissive="#1a3a6e"
          emissiveIntensity={1.4}
          roughness={0.08}
          metalness={0.92}
        />
      </mesh>

      {/* Outer glow shell */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[1.38, 24, 24]} />
        <meshBasicMaterial
          color="#4a9fff"
          transparent
          opacity={0.05}
          side={THREE.BackSide}
          depthWrite={false}
        />
      </mesh>

      {/* Holographic wireframe grid */}
      <mesh ref={wireRef}>
        <sphereGeometry args={[1.025, 18, 18]} />
        <meshBasicMaterial
          color="#5aadff"
          wireframe
          transparent
          opacity={0.1}
        />
      </mesh>
    </group>
  )
}

/* ── Orbital ring ─────────────────────────────────────────────── */

function OrbitalRing({ radius, tiltX, tiltZ, color, opacity, rotSpeed }) {
  const meshRef = useRef()

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.z = clock.elapsedTime * rotSpeed
    }
  })

  return (
    <group rotation={[tiltX, 0, tiltZ]}>
      <mesh ref={meshRef}>
        <torusGeometry args={[radius, 0.007, 8, 120]} />
        <meshBasicMaterial color={color} transparent opacity={opacity} depthWrite={false} />
      </mesh>
    </group>
  )
}

/* ── Floating tech logo node ──────────────────────────────────── */

function TechNode({ name, color, Logo, pos, floatSpeed }) {
  return (
    <Float
      position={pos}
      speed={floatSpeed}
      rotationIntensity={0}
      floatIntensity={0.35}
    >
      <Html
        center
        distanceFactor={8}
        zIndexRange={[1, 10]}
        style={{ pointerEvents: 'none', userSelect: 'none' }}
      >
        <div
          style={{
            width: '50px',
            height: '50px',
            borderRadius: '13px',
            background: 'rgba(6, 10, 20, 0.9)',
            border: `1px solid ${color}55`,
            boxShadow: `0 0 16px ${color}35, 0 8px 24px rgba(0,0,0,0.65), inset 0 1px 0 rgba(255,255,255,0.08)`,
            backdropFilter: 'blur(14px)',
            WebkitBackdropFilter: 'blur(14px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '11px',
          }}
          aria-label={name}
        >
          <Logo />
        </div>
      </Html>
    </Float>
  )
}

/* ── Main scene content ───────────────────────────────────────── */

function Scene({ mouse }) {
  const groupRef = useRef()
  const tiltX    = useRef(0)
  const tiltY    = useRef(0)

  useFrame(({ clock }) => {
    if (!groupRef.current) return
    const mx = mouse.current.x
    const my = mouse.current.y

    // Lerp mouse tilt
    tiltX.current += (my * 0.22 - tiltX.current) * 0.04
    tiltY.current += (mx * 0.28 - tiltY.current) * 0.04

    // Apply: auto-rotate on Y + mouse tilt
    groupRef.current.rotation.y = clock.elapsedTime * 0.16 + tiltY.current
    groupRef.current.rotation.x = tiltX.current
  })

  return (
    <group ref={groupRef}>
      {/* Lighting */}
      <ambientLight intensity={0.18} color="#ffffff" />
      <pointLight position={[0, 0, 0]}  intensity={3.5} color="#4a9fff" distance={7}  decay={2} />
      <pointLight position={[4, 3, 2]}  intensity={1.8} color="#a78bfa" distance={12} decay={2} />
      <pointLight position={[-3, -2, 3]} intensity={1.2} color="#d5b98a" distance={9}  decay={2} />

      {/* Core */}
      <HoloSphere />

      {/* Orbital rings */}
      <OrbitalRing radius={2.05} tiltX={0.42} tiltZ={0.30} color="#7bb6ff" opacity={0.22} rotSpeed={ 0.06} />
      <OrbitalRing radius={2.42} tiltX={1.25} tiltZ={0.08} color="#a78bfa" opacity={0.17} rotSpeed={-0.04} />
      <OrbitalRing radius={2.72} tiltX={0.18} tiltZ={1.08} color="#d5b98a" opacity={0.14} rotSpeed={ 0.05} />

      {/* Floating tech logos */}
      {TECH_NODES.map((tech, i) => (
        <TechNode
          key={tech.name}
          {...tech}
          floatSpeed={1.15 + i * 0.14}
        />
      ))}
    </group>
  )
}

/* ── Export ───────────────────────────────────────────────────── */

export default function HeroScene() {
  const mouse        = useRef({ x: 0, y: 0 })
  const containerRef = useRef()

  const handlePointerMove = (e) => {
    if (!containerRef.current) return
    const r = containerRef.current.getBoundingClientRect()
    mouse.current.x =  ((e.clientX - r.left) / r.width  - 0.5) * 2
    mouse.current.y = -((e.clientY - r.top)  / r.height - 0.5) * 2
  }

  const handleTouchMove = (e) => {
    const t = e.touches[0]
    if (!t || !containerRef.current) return
    const r = containerRef.current.getBoundingClientRect()
    mouse.current.x =  ((t.clientX - r.left) / r.width  - 0.5) * 2
    mouse.current.y = -((t.clientY - r.top)  / r.height - 0.5) * 2
  }

  const handleLeave = () => {
    mouse.current.x = 0
    mouse.current.y = 0
  }

  return (
    <div
      ref={containerRef}
      onMouseMove={handlePointerMove}
      onMouseLeave={handleLeave}
      onTouchMove={handleTouchMove}
      style={{
        width: '100%',
        height: '100%',
        borderRadius: '28px',
        background: 'linear-gradient(145deg, rgba(5,8,20,0.96) 0%, rgba(8,12,28,0.98) 100%)',
        border: '1px solid rgba(123,182,255,0.18)',
        boxShadow:
          '0 0 0 1px rgba(123,182,255,0.06), ' +
          '0 0 60px rgba(74,159,255,0.08), ' +
          '0 40px 120px rgba(0,0,0,0.65)',
        overflow: 'hidden',
        position: 'relative',
        isolation: 'isolate',
      }}
    >
      {/* Radial ambient glow behind scene */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse 80% 70% at 50% 50%, rgba(30,65,130,0.22) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <Canvas
        camera={{ position: [0, 0, 7.5], fov: 50 }}
        // Cap pixel ratio at 1.5 to balance sharpness vs GPU cost on mobile
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ width: '100%', height: '100%', display: 'block' }}
      >
        <Suspense fallback={null}>
          <Stars
            radius={45}
            depth={45}
            count={700}
            factor={2.5}
            saturation={0}
            fade
            speed={0.25}
          />
          <Scene mouse={mouse} />
        </Suspense>
      </Canvas>
    </div>
  )
}
