import { useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/**
 * CuteGirlAvatar
 * A super-chibi girl with an oversized head, tiny body and round glasses.
 * Designed to sit inside a compact ProfileCard — the character is framed
 * so the head fills most of the viewport with just shoulders peeking in
 * at the bottom.
 *
 * Palette (locked to the site's dark-purple/teal theme):
 *   Hair:     #8b6df5 / #5d3fd1 / #b8a0ff (highlight)
 *   Eyes:     #2dd4bf teal iris
 *   Skin:     #ffd8b5
 *   Hoodie:   #15151f with #6b51e0 trim
 *   Glasses:  #8b6df5 (thin purple frame)
 *
 * Animations:
 *   - Idle float + breathing scale
 *   - Head tracks cursor (damped)
 *   - Blinking with randomized cadence
 *   - Ponytail sway that lags behind head rotation
 *   - Occasional friendly wave
 *   - Glasses shine that drifts across the lens
 */

const PALETTE = {
  skin: '#ffd8b5',
  skinShadow: '#e8b894',
  hair: '#8b6df5',
  hairDark: '#5d3fd1',
  hairHighlight: '#b8a0ff',
  eyeWhite: '#ffffff',
  iris: '#2dd4bf',
  pupil: '#0b0b0f',
  lips: '#ff6b9d',
  blush: '#ff8fb3',
  hoodie: '#15151f',
  hoodieTrim: '#6b51e0',
  hoodieAccent: '#8b6df5',
  headphone: '#1a1a26',
  headphoneCushion: '#2a2a36',
  led: '#2dd4bf',
  brow: '#3d2a7a',
  glasses: '#8b6df5',
}

export default function CuteGirlAvatar() {
  const rootRef = useRef<THREE.Group>(null)
  const bodyRef = useRef<THREE.Group>(null)
  const headRef = useRef<THREE.Group>(null)
  const eyesRef = useRef<THREE.Group>(null)
  const leftTailRef = useRef<THREE.Group>(null)
  const rightTailRef = useRef<THREE.Group>(null)
  const rightArmRef = useRef<THREE.Group>(null)
  const leftArmRef = useRef<THREE.Group>(null)
  const ledLeftRef = useRef<THREE.MeshStandardMaterial>(null)
  const ledRightRef = useRef<THREE.MeshStandardMaterial>(null)
  const mouthRef = useRef<THREE.Mesh>(null)
  const glassShineLeftRef = useRef<THREE.Mesh>(null)
  const glassShineRightRef = useRef<THREE.Mesh>(null)

  // Pointer position in [-1, 1] normalized space.
  const pointer = useRef({ x: 0, y: 0 })

  // Blink & wave state.
  const nextBlinkRef = useRef(2 + Math.random() * 2)
  const blinkingUntilRef = useRef(0)
  const nextWaveRef = useRef(5 + Math.random() * 3)
  const wavingUntilRef = useRef(0)

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1
      pointer.current.y = -((e.clientY / window.innerHeight) * 2 - 1)
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime

    // Idle float + slow sway
    if (rootRef.current) {
      rootRef.current.position.y = -0.9 + Math.sin(t * 1.2) * 0.05
      rootRef.current.rotation.z = Math.sin(t * 0.6) * 0.02
    }
    // Breathing
    if (bodyRef.current) {
      const breath = 1 + Math.sin(t * 1.8) * 0.015
      bodyRef.current.scale.set(breath, breath, breath)
    }

    // Head tracks cursor (damped)
    if (headRef.current) {
      const targetY = pointer.current.x * 0.45
      const targetX = -pointer.current.y * 0.22 + Math.sin(t * 0.9) * 0.03
      headRef.current.rotation.y = THREE.MathUtils.damp(
        headRef.current.rotation.y,
        targetY,
        4,
        delta,
      )
      headRef.current.rotation.x = THREE.MathUtils.damp(
        headRef.current.rotation.x,
        targetX,
        4,
        delta,
      )
    }

    // Blinking
    if (eyesRef.current) {
      if (t > nextBlinkRef.current && blinkingUntilRef.current === 0) {
        blinkingUntilRef.current = t + 0.13
        nextBlinkRef.current = t + 2.5 + Math.random() * 3.5
      }
      if (blinkingUntilRef.current > 0) {
        if (t < blinkingUntilRef.current) {
          eyesRef.current.scale.y = 0.08
        } else {
          eyesRef.current.scale.y = 1
          blinkingUntilRef.current = 0
        }
      }
    }

    // Ponytails sway with lag behind head rotation
    const headY = headRef.current?.rotation.y ?? 0
    const tailSway = Math.sin(t * 2.2) * 0.18 - headY * 0.6
    if (leftTailRef.current) {
      leftTailRef.current.rotation.z = THREE.MathUtils.damp(
        leftTailRef.current.rotation.z,
        0.35 + tailSway * 0.5,
        3,
        delta,
      )
      leftTailRef.current.rotation.x = Math.sin(t * 1.6) * 0.08
    }
    if (rightTailRef.current) {
      rightTailRef.current.rotation.z = THREE.MathUtils.damp(
        rightTailRef.current.rotation.z,
        -0.35 + tailSway * 0.5,
        3,
        delta,
      )
      rightTailRef.current.rotation.x = Math.sin(t * 1.6 + 0.5) * 0.08
    }

    // Periodic wave
    if (rightArmRef.current) {
      if (t > nextWaveRef.current && wavingUntilRef.current === 0) {
        wavingUntilRef.current = t + 2.4
        nextWaveRef.current = t + 8 + Math.random() * 4
      }
      if (wavingUntilRef.current > 0 && t < wavingUntilRef.current) {
        const progress = 1 - (wavingUntilRef.current - t) / 2.4
        const lift =
          THREE.MathUtils.smoothstep(progress, 0, 0.2) *
          (1 - THREE.MathUtils.smoothstep(progress, 0.8, 1))
        rightArmRef.current.rotation.z = THREE.MathUtils.damp(
          rightArmRef.current.rotation.z,
          -0.3 - lift * 1.9,
          6,
          delta,
        )
        rightArmRef.current.rotation.x = Math.sin(t * 12) * 0.25 * lift
      } else {
        rightArmRef.current.rotation.z = THREE.MathUtils.damp(
          rightArmRef.current.rotation.z,
          -0.3,
          3,
          delta,
        )
        rightArmRef.current.rotation.x = THREE.MathUtils.damp(
          rightArmRef.current.rotation.x,
          0,
          3,
          delta,
        )
        if (t >= wavingUntilRef.current) wavingUntilRef.current = 0
      }
    }
    if (leftArmRef.current) {
      leftArmRef.current.rotation.z = 0.3 + Math.sin(t * 1.4) * 0.04
    }

    // Headphone LED pulse
    const pulse = (Math.sin(t * 4) + 1) / 2
    const intensity = 0.8 + pulse * 2.2
    if (ledLeftRef.current) ledLeftRef.current.emissiveIntensity = intensity
    if (ledRightRef.current) ledRightRef.current.emissiveIntensity = intensity

    // Mouth smile breath
    if (mouthRef.current) {
      mouthRef.current.scale.x = 1 + Math.sin(t * 1.8) * 0.05
    }

    // Glasses shine drifts across the lens
    const shineX = Math.sin(t * 1.4) * 0.04
    if (glassShineLeftRef.current) {
      glassShineLeftRef.current.position.x = -0.28 + shineX
    }
    if (glassShineRightRef.current) {
      glassShineRightRef.current.position.x = 0.32 + shineX
    }
  })

  return (
    <group ref={rootRef}>
      {/* Lights */}
      <ambientLight intensity={0.6} color="#e9e4ff" />
      <directionalLight position={[3, 4, 4]} intensity={1.15} color="#ffffff" />
      <pointLight position={[-4, 2, -3]} intensity={1.6} color="#2dd4bf" />
      <pointLight position={[0, -3, 2]} intensity={0.45} color="#8b6df5" />

      {/* Head group — scaled up for super-chibi feel */}
      <group ref={headRef} position={[0, 0.85, 0]} scale={1.15}>
        {/* Head sphere */}
        <mesh castShadow scale={[1, 1.05, 0.98]}>
          <sphereGeometry args={[0.78, 48, 48]} />
          <meshStandardMaterial
            color={PALETTE.skin}
            roughness={0.55}
            metalness={0.05}
          />
        </mesh>

        {/* Back hair cap */}
        <mesh position={[0, 0.05, -0.05]} scale={[1.08, 1.1, 1.08]}>
          <sphereGeometry
            args={[0.78, 48, 48, 0, Math.PI * 2, 0, Math.PI * 0.75]}
          />
          <meshStandardMaterial
            color={PALETTE.hair}
            roughness={0.4}
            metalness={0.15}
          />
        </mesh>

        {/* Top hair overhang */}
        <mesh position={[0, 0.18, 0.02]} scale={[1.12, 0.9, 1.14]}>
          <sphereGeometry
            args={[0.78, 48, 48, 0, Math.PI * 2, 0, Math.PI * 0.55]}
          />
          <meshStandardMaterial
            color={PALETTE.hair}
            roughness={0.35}
            metalness={0.2}
          />
        </mesh>

        {/* Hair highlight */}
        <mesh position={[0.15, 0.32, 0.55]} rotation={[0.3, 0, -0.2]}>
          <sphereGeometry args={[0.14, 24, 24]} />
          <meshStandardMaterial
            color={PALETTE.hairHighlight}
            roughness={0.25}
            metalness={0.35}
            emissive={PALETTE.hair}
            emissiveIntensity={0.15}
          />
        </mesh>

        {/* Front bangs */}
        <mesh position={[-0.25, 0.42, 0.55]} rotation={[0.5, 0, 0.3]}>
          <coneGeometry args={[0.22, 0.45, 12]} />
          <meshStandardMaterial color={PALETTE.hair} roughness={0.4} />
        </mesh>
        <mesh position={[0.25, 0.42, 0.55]} rotation={[0.5, 0, -0.3]}>
          <coneGeometry args={[0.22, 0.45, 12]} />
          <meshStandardMaterial color={PALETTE.hair} roughness={0.4} />
        </mesh>
        <mesh position={[0, 0.48, 0.6]} rotation={[0.4, 0, 0]}>
          <coneGeometry args={[0.18, 0.35, 12]} />
          <meshStandardMaterial color={PALETTE.hairDark} roughness={0.45} />
        </mesh>

        {/* Twin ponytails */}
        <group ref={leftTailRef} position={[-0.6, 0.2, -0.1]}>
          <mesh position={[-0.15, -0.35, 0]} rotation={[0, 0, 0.2]}>
            <capsuleGeometry args={[0.17, 0.55, 12, 20]} />
            <meshStandardMaterial color={PALETTE.hair} roughness={0.4} />
          </mesh>
          <mesh position={[-0.25, -0.75, 0]} rotation={[0, 0, 0.15]}>
            <coneGeometry args={[0.14, 0.4, 16]} />
            <meshStandardMaterial color={PALETTE.hairDark} roughness={0.45} />
          </mesh>
          <mesh position={[-0.05, -0.1, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.14, 0.04, 12, 24]} />
            <meshStandardMaterial
              color={PALETTE.hoodieTrim}
              emissive={PALETTE.hoodieTrim}
              emissiveIntensity={0.5}
              roughness={0.3}
            />
          </mesh>
        </group>

        <group ref={rightTailRef} position={[0.6, 0.2, -0.1]}>
          <mesh position={[0.15, -0.35, 0]} rotation={[0, 0, -0.2]}>
            <capsuleGeometry args={[0.17, 0.55, 12, 20]} />
            <meshStandardMaterial color={PALETTE.hair} roughness={0.4} />
          </mesh>
          <mesh position={[0.25, -0.75, 0]} rotation={[0, 0, -0.15]}>
            <coneGeometry args={[0.14, 0.4, 16]} />
            <meshStandardMaterial color={PALETTE.hairDark} roughness={0.45} />
          </mesh>
          <mesh position={[0.05, -0.1, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.14, 0.04, 12, 24]} />
            <meshStandardMaterial
              color={PALETTE.hoodieTrim}
              emissive={PALETTE.hoodieTrim}
              emissiveIntensity={0.5}
              roughness={0.3}
            />
          </mesh>
        </group>

        {/* Headphones */}
        <mesh position={[0, 0.55, 0]}>
          <torusGeometry args={[0.78, 0.045, 16, 48, Math.PI]} />
          <meshStandardMaterial
            color={PALETTE.headphone}
            roughness={0.35}
            metalness={0.7}
          />
        </mesh>
        <group position={[-0.78, 0.1, 0]}>
          <mesh>
            <cylinderGeometry args={[0.2, 0.2, 0.12, 32]} />
            <meshStandardMaterial
              color={PALETTE.headphone}
              roughness={0.3}
              metalness={0.6}
            />
          </mesh>
          <mesh position={[0.06, 0, 0]}>
            <cylinderGeometry args={[0.17, 0.17, 0.04, 32]} />
            <meshStandardMaterial
              color={PALETTE.headphoneCushion}
              roughness={0.9}
            />
          </mesh>
          <mesh position={[-0.065, 0, 0]}>
            <sphereGeometry args={[0.025, 16, 16]} />
            <meshStandardMaterial
              ref={ledLeftRef}
              color={PALETTE.led}
              emissive={PALETTE.led}
              emissiveIntensity={1.8}
              toneMapped={false}
            />
          </mesh>
        </group>
        <group position={[0.78, 0.1, 0]}>
          <mesh>
            <cylinderGeometry args={[0.2, 0.2, 0.12, 32]} />
            <meshStandardMaterial
              color={PALETTE.headphone}
              roughness={0.3}
              metalness={0.6}
            />
          </mesh>
          <mesh position={[-0.06, 0, 0]}>
            <cylinderGeometry args={[0.17, 0.17, 0.04, 32]} />
            <meshStandardMaterial
              color={PALETTE.headphoneCushion}
              roughness={0.9}
            />
          </mesh>
          <mesh position={[0.065, 0, 0]}>
            <sphereGeometry args={[0.025, 16, 16]} />
            <meshStandardMaterial
              ref={ledRightRef}
              color={PALETTE.led}
              emissive={PALETTE.led}
              emissiveIntensity={1.8}
              toneMapped={false}
            />
          </mesh>
        </group>

        {/* Eyebrows */}
        <mesh position={[-0.25, 0.22, 0.72]} rotation={[0, 0, -0.08]}>
          <boxGeometry args={[0.16, 0.035, 0.02]} />
          <meshStandardMaterial color={PALETTE.brow} />
        </mesh>
        <mesh position={[0.25, 0.22, 0.72]} rotation={[0, 0, 0.08]}>
          <boxGeometry args={[0.16, 0.035, 0.02]} />
          <meshStandardMaterial color={PALETTE.brow} />
        </mesh>

        {/* Eyes */}
        <group ref={eyesRef}>
          <group position={[-0.26, 0.03, 0.7]}>
            <mesh>
              <sphereGeometry args={[0.13, 32, 32]} />
              <meshStandardMaterial color={PALETTE.eyeWhite} roughness={0.2} />
            </mesh>
            <mesh position={[0, -0.01, 0.08]}>
              <sphereGeometry args={[0.09, 32, 32]} />
              <meshStandardMaterial
                color={PALETTE.iris}
                emissive={PALETTE.iris}
                emissiveIntensity={0.4}
                roughness={0.3}
              />
            </mesh>
            <mesh position={[0, -0.01, 0.14]}>
              <sphereGeometry args={[0.045, 24, 24]} />
              <meshStandardMaterial color={PALETTE.pupil} />
            </mesh>
            <mesh position={[0.03, 0.035, 0.175]}>
              <sphereGeometry args={[0.022, 16, 16]} />
              <meshStandardMaterial
                color="#ffffff"
                emissive="#ffffff"
                emissiveIntensity={1}
                toneMapped={false}
              />
            </mesh>
            <mesh position={[-0.025, -0.02, 0.175]}>
              <sphereGeometry args={[0.012, 16, 16]} />
              <meshStandardMaterial
                color="#ffffff"
                emissive="#ffffff"
                emissiveIntensity={0.9}
                toneMapped={false}
              />
            </mesh>
          </group>

          <group position={[0.26, 0.03, 0.7]}>
            <mesh>
              <sphereGeometry args={[0.13, 32, 32]} />
              <meshStandardMaterial color={PALETTE.eyeWhite} roughness={0.2} />
            </mesh>
            <mesh position={[0, -0.01, 0.08]}>
              <sphereGeometry args={[0.09, 32, 32]} />
              <meshStandardMaterial
                color={PALETTE.iris}
                emissive={PALETTE.iris}
                emissiveIntensity={0.4}
                roughness={0.3}
              />
            </mesh>
            <mesh position={[0, -0.01, 0.14]}>
              <sphereGeometry args={[0.045, 24, 24]} />
              <meshStandardMaterial color={PALETTE.pupil} />
            </mesh>
            <mesh position={[0.03, 0.035, 0.175]}>
              <sphereGeometry args={[0.022, 16, 16]} />
              <meshStandardMaterial
                color="#ffffff"
                emissive="#ffffff"
                emissiveIntensity={1}
                toneMapped={false}
              />
            </mesh>
            <mesh position={[-0.025, -0.02, 0.175]}>
              <sphereGeometry args={[0.012, 16, 16]} />
              <meshStandardMaterial
                color="#ffffff"
                emissive="#ffffff"
                emissiveIntensity={0.9}
                toneMapped={false}
              />
            </mesh>
          </group>
        </group>

        {/* Round glasses frames */}
        <mesh position={[-0.26, 0.03, 0.82]} rotation={[0, 0, 0]}>
          <torusGeometry args={[0.18, 0.018, 16, 40]} />
          <meshStandardMaterial
            color={PALETTE.glasses}
            emissive={PALETTE.glasses}
            emissiveIntensity={0.45}
            metalness={0.6}
            roughness={0.25}
            toneMapped={false}
          />
        </mesh>
        <mesh position={[0.26, 0.03, 0.82]} rotation={[0, 0, 0]}>
          <torusGeometry args={[0.18, 0.018, 16, 40]} />
          <meshStandardMaterial
            color={PALETTE.glasses}
            emissive={PALETTE.glasses}
            emissiveIntensity={0.45}
            metalness={0.6}
            roughness={0.25}
            toneMapped={false}
          />
        </mesh>
        {/* Glasses bridge */}
        <mesh position={[0, 0.03, 0.82]}>
          <boxGeometry args={[0.18, 0.02, 0.02]} />
          <meshStandardMaterial
            color={PALETTE.glasses}
            emissive={PALETTE.glasses}
            emissiveIntensity={0.4}
            metalness={0.6}
            roughness={0.25}
            toneMapped={false}
          />
        </mesh>
        {/* Glasses side arms */}
        <mesh position={[-0.44, 0.03, 0.72]} rotation={[0, 0.5, 0]}>
          <boxGeometry args={[0.14, 0.02, 0.02]} />
          <meshStandardMaterial
            color={PALETTE.glasses}
            metalness={0.5}
            roughness={0.3}
          />
        </mesh>
        <mesh position={[0.44, 0.03, 0.72]} rotation={[0, -0.5, 0]}>
          <boxGeometry args={[0.14, 0.02, 0.02]} />
          <meshStandardMaterial
            color={PALETTE.glasses}
            metalness={0.5}
            roughness={0.3}
          />
        </mesh>
        {/* Drifting shine on each lens (flat discs slightly in front) */}
        <mesh ref={glassShineLeftRef} position={[-0.28, 0.07, 0.84]}>
          <circleGeometry args={[0.055, 20]} />
          <meshBasicMaterial
            color="#ffffff"
            transparent
            opacity={0.28}
            toneMapped={false}
          />
        </mesh>
        <mesh ref={glassShineRightRef} position={[0.32, 0.07, 0.84]}>
          <circleGeometry args={[0.055, 20]} />
          <meshBasicMaterial
            color="#ffffff"
            transparent
            opacity={0.28}
            toneMapped={false}
          />
        </mesh>

        {/* Nose */}
        <mesh position={[0, -0.1, 0.78]}>
          <sphereGeometry args={[0.035, 16, 16]} />
          <meshStandardMaterial color={PALETTE.skinShadow} roughness={0.8} />
        </mesh>

        {/* Mouth */}
        <mesh
          ref={mouthRef}
          position={[0, -0.28, 0.73]}
          rotation={[Math.PI, 0, 0]}
        >
          <torusGeometry args={[0.08, 0.018, 12, 24, Math.PI]} />
          <meshStandardMaterial color={PALETTE.lips} roughness={0.5} />
        </mesh>

        {/* Blush */}
        <mesh position={[-0.45, -0.15, 0.62]}>
          <sphereGeometry args={[0.1, 20, 20]} />
          <meshStandardMaterial
            color={PALETTE.blush}
            transparent
            opacity={0.55}
            roughness={0.9}
          />
        </mesh>
        <mesh position={[0.45, -0.15, 0.62]}>
          <sphereGeometry args={[0.1, 20, 20]} />
          <meshStandardMaterial
            color={PALETTE.blush}
            transparent
            opacity={0.55}
            roughness={0.9}
          />
        </mesh>
      </group>

      {/* Neck */}
      <mesh position={[0, 0.12, 0]}>
        <cylinderGeometry args={[0.15, 0.2, 0.14, 24]} />
        <meshStandardMaterial color={PALETTE.skin} roughness={0.6} />
      </mesh>

      {/* Body (hoodie) — smaller chibi proportion */}
      <group ref={bodyRef}>
        <mesh position={[0, -0.35, 0]}>
          <cylinderGeometry args={[0.45, 0.58, 0.9, 32]} />
          <meshStandardMaterial
            color={PALETTE.hoodie}
            roughness={0.75}
            metalness={0.05}
          />
        </mesh>
        {/* Hood ring */}
        <mesh position={[0, 0.02, -0.1]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.32, 0.1, 16, 32]} />
          <meshStandardMaterial color={PALETTE.hoodie} roughness={0.8} />
        </mesh>
        {/* Zipper */}
        <mesh position={[0, -0.35, 0.45]}>
          <boxGeometry args={[0.02, 0.85, 0.02]} />
          <meshStandardMaterial
            color={PALETTE.hoodieTrim}
            emissive={PALETTE.hoodieTrim}
            emissiveIntensity={0.3}
            metalness={0.6}
            roughness={0.25}
          />
        </mesh>
        {/* Chest emblem */}
        <mesh position={[-0.14, -0.18, 0.46]}>
          <boxGeometry args={[0.11, 0.11, 0.01]} />
          <meshStandardMaterial
            color={PALETTE.hoodieAccent}
            emissive={PALETTE.hoodieAccent}
            emissiveIntensity={0.5}
            toneMapped={false}
          />
        </mesh>
        {/* Bottom trim */}
        <mesh position={[0, -0.82, 0]}>
          <cylinderGeometry args={[0.59, 0.59, 0.06, 32]} />
          <meshStandardMaterial
            color={PALETTE.hoodieTrim}
            emissive={PALETTE.hoodieTrim}
            emissiveIntensity={0.25}
            roughness={0.4}
          />
        </mesh>
      </group>

      {/* Arms — small stubby chibi arms */}
      <group ref={leftArmRef} position={[-0.52, -0.02, 0]}>
        <mesh position={[-0.04, -0.38, 0]} rotation={[0, 0, 0.25]}>
          <capsuleGeometry args={[0.11, 0.5, 12, 20]} />
          <meshStandardMaterial color={PALETTE.hoodie} roughness={0.75} />
        </mesh>
        <mesh position={[-0.2, -0.66, 0]} rotation={[0, 0, 0.25]}>
          <cylinderGeometry args={[0.12, 0.12, 0.07, 24]} />
          <meshStandardMaterial
            color={PALETTE.hoodieTrim}
            emissive={PALETTE.hoodieTrim}
            emissiveIntensity={0.3}
          />
        </mesh>
        <mesh position={[-0.25, -0.77, 0]}>
          <sphereGeometry args={[0.1, 20, 20]} />
          <meshStandardMaterial color={PALETTE.skin} roughness={0.6} />
        </mesh>
      </group>

      <group ref={rightArmRef} position={[0.52, -0.02, 0]}>
        <mesh position={[0.04, -0.38, 0]} rotation={[0, 0, -0.25]}>
          <capsuleGeometry args={[0.11, 0.5, 12, 20]} />
          <meshStandardMaterial color={PALETTE.hoodie} roughness={0.75} />
        </mesh>
        <mesh position={[0.2, -0.66, 0]} rotation={[0, 0, -0.25]}>
          <cylinderGeometry args={[0.12, 0.12, 0.07, 24]} />
          <meshStandardMaterial
            color={PALETTE.hoodieTrim}
            emissive={PALETTE.hoodieTrim}
            emissiveIntensity={0.3}
          />
        </mesh>
        <mesh position={[0.25, -0.77, 0]}>
          <sphereGeometry args={[0.1, 20, 20]} />
          <meshStandardMaterial color={PALETTE.skin} roughness={0.6} />
        </mesh>
      </group>

      {/* Soft contact shadow */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.3, 0]}>
        <circleGeometry args={[0.75, 48]} />
        <meshBasicMaterial color="#000000" transparent opacity={0.35} />
      </mesh>
    </group>
  )
}
