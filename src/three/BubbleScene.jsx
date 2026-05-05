import { useRef, useMemo, useEffect, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Environment, MeshTransmissionMaterial } from '@react-three/drei'

/* ─── Individual Bubble ─────────────────────────────── */
function Bubble({ position, scale, speed, offset, color, attenColor }) {
  const meshRef = useRef()

  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    if (!meshRef.current) return
    meshRef.current.rotation.x = Math.sin(t * speed * 0.12 + offset) * 0.25
    meshRef.current.rotation.y = Math.cos(t * speed * 0.09 + offset) * 0.18
  })

  return (
    <Float
      speed={speed * 0.45}
      rotationIntensity={0.08}
      floatIntensity={0.55}
    >
      <mesh ref={meshRef} position={position} scale={scale}>
        <sphereGeometry args={[1, 64, 64]} />
        <MeshTransmissionMaterial
          backside
          backsideThickness={0.35}
          samples={6}
          resolution={256}
          transmission={0.97}
          roughness={0.0}
          metalness={0.0}
          thickness={0.55}
          ior={1.45}
          chromaticAberration={0.045}
          anisotropy={0.12}
          distortion={0.18}
          distortionScale={0.35}
          temporalDistortion={0.04}
          color={color}
          attenuationDistance={0.9}
          attenuationColor={attenColor}
          envMapIntensity={1.2}
        />
      </mesh>
    </Float>
  )
}

/* ─── Camera that follows mouse ─────────────────────── */
function CameraRig({ mousePos }) {
  useFrame(({ camera }) => {
    const tx = mousePos.current.x * 0.45
    const ty = -mousePos.current.y * 0.28
    camera.position.x += (tx - camera.position.x) * 0.035
    camera.position.y += (ty - camera.position.y) * 0.035
    camera.lookAt(0, 0, 0)
  })
  return null
}

/* ─── Scene contents ────────────────────────────────── */
function Scene({ mousePos, isMobile }) {
  const bubbles = useMemo(() => {
    const all = [
      { position: [-2.6, 1.3, -1.8],  scale: 1.15, speed: 0.78, offset: 0,   color: '#9BBAC9', attenColor: '#7FA9C0' },
      { position: [2.9,  -0.9, -2.2], scale: 0.72, speed: 1.25, offset: 1.6, color: '#ACC6D5', attenColor: '#8BBCCC' },
      { position: [0.4,  2.3, -3.8],  scale: 1.65, speed: 0.52, offset: 3.1, color: '#7CA9C0', attenColor: '#6498B0' },
      { position: [-3.6,-1.9, -2.6],  scale: 0.52, speed: 1.65, offset: 4.7, color: '#B8CED9', attenColor: '#9DC0D0' },
      { position: [1.9, -2.3, -1.7],  scale: 0.92, speed: 1.02, offset: 2.2, color: '#94BCC8', attenColor: '#7BAABB' },
      { position: [-0.7, 0.6, -5.2],  scale: 2.3,  speed: 0.32, offset: 5.8, color: '#6B9FB8', attenColor: '#5A8CA8' },
      { position: [3.9,  1.9, -3.7],  scale: 0.82, speed: 0.92, offset: 1.1, color: '#A5C2D2', attenColor: '#8BACBF' },
    ]
    if (isMobile) return all.slice(0, 4).map(b => ({ ...b, scale: b.scale * 0.65 }))
    return all
  }, [isMobile])

  return (
    <>
      <ambientLight intensity={0.35} />
      <directionalLight position={[5, 6, 4]}  intensity={0.55} color="#F0EDE7" />
      <pointLight       position={[-5, 4, 5]}  intensity={0.7}  color="#C0A47C" />
      <pointLight       position={[4, -4, 3]}  intensity={0.45} color="#7BAEC8" />
      <pointLight       position={[0,  0, 7]}  intensity={0.18} color="#ffffff" />
      <Environment preset="city" />
      {bubbles.map((b, i) => <Bubble key={i} {...b} />)}
      <CameraRig mousePos={mousePos} />
    </>
  )
}

/* ─── Export ─────────────────────────────────────────── */
export default function BubbleScene() {
  const mousePos = useRef({ x: 0, y: 0 })
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768

  useEffect(() => {
    const handler = (e) => {
      mousePos.current = {
        x: (e.clientX / window.innerWidth)  * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      }
    }
    window.addEventListener('mousemove', handler, { passive: true })
    return () => window.removeEventListener('mousemove', handler)
  }, [])

  return (
    <Canvas
      camera={{ position: [0, 0, 6.5], fov: 52 }}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
        stencil: false,
        depth: true,
      }}
      dpr={[1, isMobile ? 1 : 1.5]}
      style={{ background: 'transparent', position: 'absolute', inset: 0 }}
    >
      <Suspense fallback={null}>
        <Scene mousePos={mousePos} isMobile={isMobile} />
      </Suspense>
    </Canvas>
  )
}
