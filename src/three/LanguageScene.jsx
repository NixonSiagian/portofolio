import { useRef, useMemo, useEffect, useState, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, RoundedBox, Text } from '@react-three/drei'
import { MathUtils } from 'three'

// Central focus object that the badges orbit around
function CenterCore() {
  const coreRef = useRef(null)
  const auraRef = useRef(null)
  const ringRef = useRef(null)

  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    if (coreRef.current) {
      coreRef.current.rotation.y = t * 0.22
      coreRef.current.rotation.x = Math.sin(t * 0.17) * 0.14
    }
    if (auraRef.current) {
      auraRef.current.scale.setScalar(1 + Math.sin(t * 0.85) * 0.04)
    }
    if (ringRef.current) {
      ringRef.current.rotation.z = t * 0.12
    }
  })

  return (
    <group>
      {/* Soft outer aura */}
      <mesh ref={auraRef}>
        <sphereGeometry args={[0.58, 32, 32]} />
        <meshBasicMaterial color="#C0A47C" transparent opacity={0.022} />
      </mesh>

      {/* Glossy icosahedron core */}
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[0.33, 1]} />
        <meshPhysicalMaterial
          color="#12172A"
          roughness={0.06}
          metalness={0.72}
          clearcoat={1.0}
          clearcoatRoughness={0.07}
          envMapIntensity={1.5}
        />
      </mesh>

      {/* Subtle accent ring */}
      <mesh ref={ringRef} rotation={[Math.PI * 0.1, 0, 0]}>
        <torusGeometry args={[0.54, 0.011, 16, 90]} />
        <meshBasicMaterial color="#C0A47C" transparent opacity={0.5} />
      </mesh>
    </group>
  )
}

// Badge that smoothly orbits around center with real 3D depth
const DEPTH_SCALE_MIN = 0.87
const DEPTH_SCALE_NEAR = 0.85
const DEPTH_SCALE_FAR = 1.02

function OrbitalBadge({ label, color, orbitRadius, orbitElevation, initialAngle, speed, badgeScale = 1 }) {
  const groupRef = useRef(null)

  useFrame(({ clock }) => {
    if (!groupRef.current) return
    const t = clock.elapsedTime
    const theta = initialAngle + t * speed

    // Orbital path: tilted around x-axis by orbitElevation
    const x = orbitRadius * Math.cos(theta)
    const y = orbitRadius * Math.sin(theta) * Math.sin(orbitElevation)
    const z = orbitRadius * Math.sin(theta) * Math.cos(orbitElevation)

    groupRef.current.position.set(x, y, z)

    // Depth-based scale: badges closer to camera appear slightly larger
    const depthFactor = MathUtils.mapLinear(z, -orbitRadius, orbitRadius, DEPTH_SCALE_MIN, 1.0)
    groupRef.current.scale.setScalar(badgeScale * MathUtils.clamp(depthFactor, DEPTH_SCALE_NEAR, DEPTH_SCALE_FAR))

    // Gentle billboard-like tilt following the orbit
    groupRef.current.rotation.y = -theta * 0.2
    groupRef.current.rotation.z = Math.sin(t * 0.38 + initialAngle) * 0.055
  })

  return (
    <group ref={groupRef}>
      <RoundedBox args={[1.9, 0.82, 0.16]} radius={0.16} smoothness={4}>
        <meshPhysicalMaterial
          color="#0C1020"
          roughness={0.14}
          metalness={0.06}
          transmission={0.52}
          thickness={0.26}
          clearcoat={0.88}
          clearcoatRoughness={0.11}
          ior={1.38}
          envMapIntensity={0.95}
        />
      </RoundedBox>

      {/* Left accent stripe */}
      <mesh position={[-0.8, 0, 0.1]}>
        <planeGeometry args={[0.04, 0.44]} />
        <meshBasicMaterial color={color} transparent opacity={0.95} />
      </mesh>

      {/* Label */}
      <Text
        fontSize={0.265}
        position={[0.06, 0, 0.1]}
        color={color}
        anchorX="center"
        anchorY="middle"
      >
        {label}
      </Text>

      {/* Subtle color tint */}
      <mesh position={[0, 0, 0.09]}>
        <planeGeometry args={[1.72, 0.66]} />
        <meshBasicMaterial color={color} transparent opacity={0.045} />
      </mesh>
    </group>
  )
}

function CameraRig({ mouse }) {
  useFrame(({ camera }) => {
    const tx = mouse.current.x * 0.38
    const ty = -mouse.current.y * 0.22
    camera.position.x += (tx - camera.position.x) * 0.038
    camera.position.y += (ty - camera.position.y) * 0.038
    camera.lookAt(0, 0, 0)
  })
  return null
}

function Scene({ mouse, isMobile }) {
  const badges = useMemo(() => {
    const TAU = Math.PI * 2
    const INNER_RADIUS = 2.1
    const INNER_ELEVATION = Math.PI * 0.15
    const INNER_SPEED = 0.20
    const OUTER_RADIUS = 3.05
    const OUTER_ELEVATION = Math.PI * 0.38
    const OUTER_SPEED = 0.14
    const all = [
      // Inner ring — 3 badges evenly spaced, low elevation (mostly horizontal orbit)
      { label: 'JavaScript', color: '#F2C45B', orbitRadius: INNER_RADIUS, orbitElevation: INNER_ELEVATION, initialAngle: 0,           speed: INNER_SPEED },
      { label: 'CSS',        color: '#58A8E0', orbitRadius: INNER_RADIUS, orbitElevation: INNER_ELEVATION, initialAngle: TAU / 3,     speed: INNER_SPEED },
      { label: 'HTML',       color: '#EF7B55', orbitRadius: INNER_RADIUS, orbitElevation: INNER_ELEVATION, initialAngle: TAU * 2 / 3, speed: INNER_SPEED },
      // Outer ring — 3 badges, offset 60°, higher elevation (more vertical orbit plane)
      { label: 'Swift',      color: '#F59E5B', orbitRadius: OUTER_RADIUS, orbitElevation: OUTER_ELEVATION, initialAngle: TAU / 6,               speed: OUTER_SPEED, badgeScale: 0.92 },
      { label: 'C++',        color: '#B18BEA', orbitRadius: OUTER_RADIUS, orbitElevation: OUTER_ELEVATION, initialAngle: TAU / 6 + TAU / 3,     speed: OUTER_SPEED, badgeScale: 0.92 },
      { label: 'Pawn',       color: '#7FD6A5', orbitRadius: OUTER_RADIUS, orbitElevation: OUTER_ELEVATION, initialAngle: TAU / 6 + TAU * 2 / 3, speed: OUTER_SPEED, badgeScale: 0.92 },
    ]
    if (isMobile) {
      return all.slice(0, 4).map(b => ({ ...b, orbitRadius: b.orbitRadius * 0.78, badgeScale: (b.badgeScale || 1) * 0.78 }))
    }
    return all
  }, [isMobile])

  return (
    <>
      <ambientLight intensity={0.65} />
      <directionalLight position={[5, 8, 6]} intensity={1.0} color="#F5F0EA" />
      <directionalLight position={[-3, -1, 4]} intensity={0.28} color="#8BAFC9" />
      <pointLight position={[0, 0, 3]} intensity={0.45} color="#C0A47C" distance={7} decay={2} />
      {!isMobile && <Environment preset="city" />}

      <CenterCore />

      {badges.map((b) => (
        <OrbitalBadge key={b.label} {...b} />
      ))}

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
    const handler = (e) => {
      mouse.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      }
    }
    window.addEventListener('mousemove', handler, { passive: true })
    return () => window.removeEventListener('mousemove', handler)
  }, [])

  return (
    <Canvas
      className={className}
      camera={{ position: [0, 0, 7], fov: 44 }}
      dpr={[1, isMobile ? 1 : 1.5]}
      gl={{
        antialias: !isMobile,
        alpha: true,
        powerPreference: 'high-performance',
        depth: true,
      }}
      style={{ width: '100%', height: '100%', background: 'transparent' }}
    >
      <Suspense fallback={null}>
        <Scene mouse={mouse} isMobile={isMobile} />
      </Suspense>
    </Canvas>
  )
}
