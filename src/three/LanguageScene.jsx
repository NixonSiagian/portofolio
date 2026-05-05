import { useRef, useMemo, useEffect, useState, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, Float, RoundedBox, Text } from '@react-three/drei'
import { MathUtils } from 'three'

function LanguageBadge({ label, color, position, scale, speed, isMobile }) {
  const group = useRef(null)

  useFrame(({ clock }) => {
    if (!group.current) return
    const t = clock.elapsedTime
    group.current.rotation.z = Math.sin(t * speed * 0.35) * 0.12
    group.current.rotation.y = Math.cos(t * speed * 0.28) * 0.18
  })

  return (
    <Float speed={speed * 0.55} rotationIntensity={0.22} floatIntensity={0.5}>
      <group ref={group} position={position} scale={scale}>
        <RoundedBox args={[1.9, 0.95, 0.22]} radius={0.2} smoothness={4}>
          {isMobile ? (
            <meshStandardMaterial color="#0e111c" roughness={0.45} metalness={0.1} />
          ) : (
            <meshPhysicalMaterial
              color="#121726"
              roughness={0.22}
              metalness={0.1}
              transmission={0.65}
              thickness={0.45}
              clearcoat={0.7}
              clearcoatRoughness={0.25}
              ior={1.4}
              envMapIntensity={0.85}
            />
          )}
        </RoundedBox>
        <Text
          fontSize={0.34}
          position={[0, 0, 0.18]}
          color={color}
          anchorX="center"
          anchorY="middle"
        >
          {label}
        </Text>
        <mesh position={[0, 0, 0.2]}>
          <planeGeometry args={[1.7, 0.8]} />
          <meshBasicMaterial color={color} transparent opacity={0.08} />
        </mesh>
      </group>
    </Float>
  )
}

function CameraRig({ mouse }) {
  useFrame(({ camera }) => {
    const targetX = mouse.current.x * 0.35
    const targetY = -mouse.current.y * 0.22
    camera.position.x += (targetX - camera.position.x) * 0.04
    camera.position.y += (targetY - camera.position.y) * 0.04
    camera.lookAt(0, 0, 0)
  })
  return null
}

function Scene({ mouse, isMobile }) {
  const group = useRef(null)
  const badges = useMemo(() => {
    const all = [
      { label: 'CSS', color: '#58A8E0', position: [-1.9, 1.05, -1.2], scale: 1.05, speed: 0.85 },
      { label: 'JavaScript', color: '#F2C45B', position: [1.6, 0.35, -1.8], scale: 1.1, speed: 0.7 },
      { label: 'C++', color: '#B18BEA', position: [-0.2, -1.2, -0.7], scale: 0.95, speed: 0.95 },
      { label: 'Swift', color: '#F59E5B', position: [2.1, -1.1, -2.6], scale: 0.9, speed: 0.78 },
      { label: 'Pawn', color: '#7FD6A5', position: [-2.5, -0.4, -2.8], scale: 0.85, speed: 1.05 },
      { label: 'HTML', color: '#EF7B55', position: [0.5, 1.7, -3.2], scale: 0.9, speed: 0.6 },
    ]
    if (isMobile) return all.slice(0, 4).map(item => ({ ...item, scale: item.scale * 0.85 }))
    return all
  }, [isMobile])

  useFrame(() => {
    if (!group.current) return
    group.current.rotation.y = MathUtils.lerp(
      group.current.rotation.y,
      mouse.current.x * 0.22,
      0.06,
    )
    group.current.rotation.x = MathUtils.lerp(
      group.current.rotation.x,
      -mouse.current.y * 0.12,
      0.06,
    )
  })

  return (
    <>
      <ambientLight intensity={0.55} />
      <directionalLight position={[4, 6, 4]} intensity={0.5} color="#F4EFE6" />
      <pointLight position={[-4, 4, 3]} intensity={0.45} color="#9BBBD6" />
      <pointLight position={[3, -3, 4]} intensity={0.35} color="#C0A47C" />
      {!isMobile && <Environment preset="city" />}
      <group ref={group}>
        {badges.map((badge) => (
          <LanguageBadge key={badge.label} {...badge} isMobile={isMobile} />
        ))}
      </group>
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
    const handler = (event) => {
      mouse.current = {
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: (event.clientY / window.innerHeight) * 2 - 1,
      }
    }
    window.addEventListener('mousemove', handler, { passive: true })
    return () => window.removeEventListener('mousemove', handler)
  }, [])

  return (
    <Canvas
      className={className}
      camera={{ position: [0, 0, 6], fov: 45 }}
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
