import { useRef, useMemo, useEffect, useState, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { ContactShadows, Text } from '@react-three/drei'
import { MathUtils } from 'three'

const LOGOS = [
  { label: 'CSS', color: '#6bc2ff', radius: 3.1, speed: 0.4, height: 0.6, depth: -0.4 },
  { label: 'JavaScript', color: '#f6c767', radius: 2.7, speed: 0.52, height: -0.3, depth: 0.5 },
  { label: 'C++', color: '#b79bff', radius: 3.4, speed: 0.36, height: 0.1, depth: -0.9 },
  { label: 'Swift', color: '#f29a6e', radius: 2.9, speed: 0.48, height: -0.7, depth: 0.2 },
  { label: 'Pawn', color: '#7fe2b4', radius: 3.6, speed: 0.3, height: 0.9, depth: -0.2 },
  { label: 'HTML', color: '#ff8a6a', radius: 2.5, speed: 0.58, height: -0.1, depth: 0.8 },
]

function OrbitingLogo({ label, color, radius, speed, height, depth, offset, isMobile }) {
  const group = useRef(null)

  useFrame(({ clock }) => {
    if (!group.current) return
    const t = clock.elapsedTime * speed + offset
    const x = Math.cos(t) * radius
    const z = Math.sin(t) * radius * 0.6 + depth
    const y = Math.sin(t * 0.7) * 0.45 + height
    group.current.position.set(x, y, z)
    group.current.rotation.y = t + offset
  })

  return (
    <group ref={group}>
      <mesh>
        <circleGeometry args={[0.45, 48]} />
        <meshStandardMaterial
          color={color}
          roughness={0.28}
          metalness={0.25}
          emissive={color}
          emissiveIntensity={isMobile ? 0.18 : 0.35}
        />
      </mesh>
      <mesh position={[0, 0, -0.06]}>
        <circleGeometry args={[0.62, 40]} />
        <meshStandardMaterial color="#0b0f1a" roughness={0.6} metalness={0.1} />
      </mesh>
      <Text
        fontSize={0.24}
        position={[0, 0, 0.12]}
        color="#f4f6fb"
        anchorX="center"
        anchorY="middle"
      >
        {label}
      </Text>
    </group>
  )
}

function CentralOrb({ isMobile }) {
  return (
    <group>
      <mesh>
        <sphereGeometry args={[1.1, isMobile ? 48 : 72, isMobile ? 48 : 72]} />
        <meshPhysicalMaterial
          color="#0e1320"
          roughness={0.22}
          metalness={0.25}
          clearcoat={0.8}
          clearcoatRoughness={0.18}
          transmission={0.25}
          thickness={0.35}
          ior={1.35}
        />
      </mesh>
      <mesh scale={1.22}>
        <sphereGeometry args={[1.1, 32, 32]} />
        <meshStandardMaterial
          color="#7bb6ff"
          emissive="#7bb6ff"
          emissiveIntensity={0.3}
          transparent
          opacity={0.08}
        />
      </mesh>
      <Text
        fontSize={0.5}
        position={[0, 0, 1.15]}
        color="#f4f6fb"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.08}
      >
        NS
      </Text>
    </group>
  )
}

function CameraRig({ mouse }) {
  useFrame(({ camera }) => {
    const targetX = mouse.current.x * 0.35
    const targetY = -mouse.current.y * 0.2
    camera.position.x = MathUtils.lerp(camera.position.x, targetX, 0.05)
    camera.position.y = MathUtils.lerp(camera.position.y, targetY, 0.05)
    camera.lookAt(0, 0, 0)
  })
  return null
}

function Scene({ mouse, isMobile }) {
  const group = useRef(null)
  const logos = useMemo(
    () =>
      LOGOS.map((logo, index) => ({
        ...logo,
        offset: index * 0.9,
      })),
    [],
  )

  useFrame(() => {
    if (!group.current) return
    group.current.rotation.y = MathUtils.lerp(
      group.current.rotation.y,
      mouse.current.x * 0.18,
      0.04,
    )
  })

  return (
    <>
      <color attach="background" args={['#05060b']} />
      <fog attach="fog" args={['#05060b', 8, 16]} />
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 6, 4]} intensity={1.05} color="#f5f7ff" />
      <pointLight position={[-4, -2, 4]} intensity={0.55} color="#7bb6ff" />
      <pointLight position={[3, 2, -3]} intensity={0.45} color="#d5b98a" />
      <group ref={group}>
        <CentralOrb isMobile={isMobile} />
        {logos.map((logo) => (
          <OrbitingLogo key={logo.label} {...logo} isMobile={isMobile} />
        ))}
      </group>
      {!isMobile && (
        <ContactShadows
          position={[0, -2.2, 0]}
          opacity={0.35}
          scale={10}
          blur={2.4}
          far={6}
        />
      )}
      <CameraRig mouse={mouse} />
    </>
  )
}

export default function LanguageScene({ className = '' }) {
  const mouse = useRef({ x: 0, y: 0 })
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check, { passive: true })
    return () => window.removeEventListener('resize', check)
  }, [])

  useEffect(() => {
    if (isMobile) return
    const handler = (event) => {
      mouse.current = {
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: (event.clientY / window.innerHeight) * 2 - 1,
      }
    }
    window.addEventListener('mousemove', handler, { passive: true })
    return () => window.removeEventListener('mousemove', handler)
  }, [isMobile])

  return (
    <Canvas
      className={className}
      camera={{ position: [0, 0, 8], fov: 42 }}
      dpr={[1, isMobile ? 1 : 1.4]}
      shadows={!isMobile}
      gl={{
        antialias: !isMobile,
        alpha: true,
        powerPreference: 'high-performance',
      }}
      style={{ width: '100%', height: '100%', background: 'transparent' }}
    >
      <Suspense fallback={null}>
        <Scene mouse={mouse} isMobile={isMobile} />
      </Suspense>
    </Canvas>
  )
}
