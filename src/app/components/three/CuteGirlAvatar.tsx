import { useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/**
 * CuteGirlAvatar
 * A stylized chibi girl rendered entirely from primitive geometry so it
 * stays lightweight (no external GLB). Palette is locked to the site theme:
 *   - Purple primary:   #6b51e0 / #8b6df5
 *   - Teal accent:      #2dd4bf
 *   - Pink blush:       #ff8fb3
 *   - Warm skin tone:   #ffd8b5
 *   - Dark hoodie:      #15151f / trim #6b51e0
 *
 * Animations:
 *   - Floating (idle bob)
 *   - Subtle breathing scale
 *   - Head tracks the cursor (with damping)
 *   - Natural eye blinks with randomized cadence
 *   - Twin ponytails sway with a delayed follow (pseudo-physics)
 *   - Periodic friendly wave from the right arm
 *   - Headphone LEDs pulse to a hidden "beat"
 */

// --- Shared palette (kept as THREE.Color for fewer allocations) ----------
const PALETTE = {
  skin: '#ffd8b5',
  skinShadow: '#e8b894',
  hair: '#8b6df5',
  hairDark: '#5d3fd1',
  hairHighlight: '#b8a0ff',
  eyeWhite: '#ffffff',
  iris: '#2dd4bf',
  irisDark: '#0f766e',
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

  // Pointer position in [-1, 1] normalized space (relative to viewport).
  const pointer = useRef({ x: 0, y: 0 })

  // Blink state machine: next blink timestamp (in seconds).
  const nextBlinkRef = useRef(2 + Math.random() * 2)
  const blinkingUntilRef = useRef(0)

  // Wave state: periodically trigger a 2.5s wave animation.
  const nextWaveRef = useRef(4 + Math.random() * 3)
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

    // ----- Idle float + breathing ----------------------------------------
    if (rootRef.current) {
      rootRef.current.position.y = -0.15 + Math.sin(t * 1.2) * 0.06
      // Very subtle sway so the character never feels dead
      rootRef.current.rotation.z = Math.sin(t * 0.6) * 0.02
    }
    if (bodyRef.current) {
      const breath = 1 + Math.sin(t * 1.8) * 0.015
      bodyRef.current.scale.set(breath, breath, breath)
    }

    // ----- Head tracking --------------------------------------------------
    if (headRef.current) {
      const targetY = pointer.current.x * 0.5
      const targetX = -pointer.current.y * 0.25 + Math.sin(t * 0.9) * 0.03
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

    // ----- Blinking -------------------------------------------------------
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

    // ----- Pony tail sway (delayed follow of head rotation) --------------
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

    // ----- Periodic wave --------------------------------------------------
    if (rightArmRef.current) {
      if (t > nextWaveRef.current && wavingUntilRef.current === 0) {
        wavingUntilRef.current = t + 2.4
        nextWaveRef.current = t + 7 + Math.random() * 4
      }
      if (wavingUntilRef.current > 0 && t < wavingUntilRef.current) {
        // Raise arm and wiggle
        const progress = 1 - (wavingUntilRef.current - t) / 2.4
        const lift = THREE.MathUtils.smoothstep(progress, 0, 0.2) *
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

    // ----- Headphone LEDs pulsing ----------------------------------------
    const pulse = (Math.sin(t * 4) + 1) / 2
    const intensity = 0.8 + pulse * 2.2
    if (ledLeftRef.current) ledLeftRef.current.emissiveIntensity = intensity
    if (ledRightRef.current) ledRightRef.current.emissiveIntensity = intensity

    // ----- Tiny mouth "smile breath" -------------------------------------
    if (mouthRef.current) {
      mouthRef.current.scale.x = 1 + Math.sin(t * 1.8) * 0.05
    }
  })

  return (
    <group ref={rootRef} position={[0, -0.15, 0]}>
      {/* --- Lights ------------------------------------------------------- */}
      <ambientLight intensity={0.55} color="#e9e4ff" />
      {/* Key (purple tint) */}
      <directionalLight
        position={[3, 4, 4]}
        intensity={1.15}
        color="#ffffff"
      />
      {/* Rim light (teal) for the theme */}
      <pointLight position={[-4, 2, -3]} intensity={1.6} color="#2dd4bf" />
      {/* Fill from below */}
      <pointLight position={[0, -3, 2]} intensity={0.45} color="#8b6df5" />

      {/* --- Head group (everything above shoulders) --------------------- */}
      <group ref={headRef} position={[0, 0.85, 0]}>
        {/* Head — slightly squashed sphere for chibi look */}
        <mesh castShadow scale={[1, 1.05, 0.98]}>
          <sphereGeometry args={[0.78, 48, 48]} />
          <meshStandardMaterial
            color={PALETTE.skin}
            roughness={0.55}
            metalness={0.05}
          />
        </mesh>

        {/* Back hair cap — covers the back half of the skull */}
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

        {/* Top/front hair — shorter cap that overhangs the forehead */}
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

        {/* Hair highlight streak */}
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

        {/* Front bangs — two soft tufts over the forehead */}
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

        {/* --- Twin ponytails (anchored to back of head, sway from top) - */}
        <group ref={leftTailRef} position={[-0.6, 0.2, -0.1]}>
          <mesh position={[-0.15, -0.35, 0]} rotation={[0, 0, 0.2]}>
            <capsuleGeometry args={[0.17, 0.55, 12, 20]} />
            <meshStandardMaterial color={PALETTE.hair} roughness={0.4} />
          </mesh>
          <mesh position={[-0.25, -0.75, 0]} rotation={[0, 0, 0.15]}>
            <coneGeometry args={[0.14, 0.4, 16]} />
            <meshStandardMaterial color={PALETTE.hairDark} roughness={0.45} />
          </mesh>
          {/* Hair tie */}
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

        {/* --- Headphones over the ears ------------------------------- */}
        {/* Headband */}
        <mesh position={[0, 0.55, 0]} rotation={[0, 0, 0]}>
          <torusGeometry
            args={[0.78, 0.045, 16, 48, Math.PI]}
          />
          <meshStandardMaterial
            color={PALETTE.headphone}
            roughness={0.35}
            metalness={0.7}
          />
        </mesh>
        {/* Left ear cup */}
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
          {/* LED */}
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
        {/* Right ear cup */}
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

        {/* --- Eyebrows ------------------------------------------------ */}
        <mesh position={[-0.25, 0.22, 0.72]} rotation={[0, 0, -0.08]}>
          <boxGeometry args={[0.16, 0.035, 0.02]} />
          <meshStandardMaterial color={PALETTE.brow} />
        </mesh>
        <mesh position={[0.25, 0.22, 0.72]} rotation={[0, 0, 0.08]}>
          <boxGeometry args={[0.16, 0.035, 0.02]} />
          <meshStandardMaterial color={PALETTE.brow} />
        </mesh>

        {/* --- Eyes (big anime style, teal iris) ----------------------- */}
        <group ref={eyesRef}>
          {/* Left */}
          <group position={[-0.26, 0.03, 0.7]}>
            {/* white */}
            <mesh>
              <sphereGeometry args={[0.13, 32, 32]} />
              <meshStandardMaterial color={PALETTE.eyeWhite} roughness={0.2} />
            </mesh>
            {/* iris */}
            <mesh position={[0, -0.01, 0.08]}>
              <sphereGeometry args={[0.09, 32, 32]} />
              <meshStandardMaterial
                color={PALETTE.iris}
                emissive={PALETTE.iris}
                emissiveIntensity={0.4}
                roughness={0.3}
              />
            </mesh>
            {/* pupil */}
            <mesh position={[0, -0.01, 0.14]}>
              <sphereGeometry args={[0.045, 24, 24]} />
              <meshStandardMaterial color={PALETTE.pupil} />
            </mesh>
            {/* highlight */}
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

          {/* Right */}
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

        {/* Nose — tiny shadow bump */}
        <mesh position={[0, -0.1, 0.78]}>
          <sphereGeometry args={[0.035, 16, 16]} />
          <meshStandardMaterial color={PALETTE.skinShadow} roughness={0.8} />
        </mesh>

        {/* Mouth — small smile using torus */}
        <mesh
          ref={mouthRef}
          position={[0, -0.28, 0.73]}
          rotation={[Math.PI, 0, 0]}
        >
          <torusGeometry
            args={[0.08, 0.018, 12, 24, Math.PI]}
          />
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

      {/* --- Neck --------------------------------------------------------- */}
      <mesh position={[0, 0.18, 0]}>
        <cylinderGeometry args={[0.18, 0.22, 0.18, 24]} />
        <meshStandardMaterial color={PALETTE.skin} roughness={0.6} />
      </mesh>

      {/* --- Body (hoodie) ----------------------------------------------- */}
      <group ref={bodyRef}>
        {/* Torso */}
        <mesh position={[0, -0.45, 0]}>
          <cylinderGeometry args={[0.55, 0.7, 1.15, 32]} />
          <meshStandardMaterial
            color={PALETTE.hoodie}
            roughness={0.75}
            metalness={0.05}
          />
        </mesh>
        {/* Hood ring behind the neck */}
        <mesh position={[0, 0.08, -0.1]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.38, 0.12, 16, 32]} />
          <meshStandardMaterial color={PALETTE.hoodie} roughness={0.8} />
        </mesh>
        {/* Zipper */}
        <mesh position={[0, -0.45, 0.55]}>
          <boxGeometry args={[0.02, 1.1, 0.02]} />
          <meshStandardMaterial
            color={PALETTE.hoodieTrim}
            emissive={PALETTE.hoodieTrim}
            emissiveIntensity={0.3}
            metalness={0.6}
            roughness={0.25}
          />
        </mesh>
        {/* Chest emblem — small glowing square (nod to the dev theme) */}
        <mesh position={[-0.18, -0.2, 0.56]}>
          <boxGeometry args={[0.14, 0.14, 0.01]} />
          <meshStandardMaterial
            color={PALETTE.hoodieAccent}
            emissive={PALETTE.hoodieAccent}
            emissiveIntensity={0.5}
            toneMapped={false}
          />
        </mesh>
        {/* Bottom trim */}
        <mesh position={[0, -1.02, 0]}>
          <cylinderGeometry args={[0.71, 0.71, 0.06, 32]} />
          <meshStandardMaterial
            color={PALETTE.hoodieTrim}
            emissive={PALETTE.hoodieTrim}
            emissiveIntensity={0.25}
            roughness={0.4}
          />
        </mesh>
      </group>

      {/* --- Arms --------------------------------------------------------- */}
      {/* Left arm (character's left = screen right of body, but we keep
          the character-relative naming) */}
      <group ref={leftArmRef} position={[-0.65, 0.02, 0]}>
        <mesh position={[-0.05, -0.5, 0]} rotation={[0, 0, 0.25]}>
          <capsuleGeometry args={[0.13, 0.65, 12, 20]} />
          <meshStandardMaterial color={PALETTE.hoodie} roughness={0.75} />
        </mesh>
        {/* Sleeve cuff */}
        <mesh position={[-0.24, -0.85, 0]} rotation={[0, 0, 0.25]}>
          <cylinderGeometry args={[0.14, 0.14, 0.08, 24]} />
          <meshStandardMaterial
            color={PALETTE.hoodieTrim}
            emissive={PALETTE.hoodieTrim}
            emissiveIntensity={0.3}
          />
        </mesh>
        {/* Hand */}
        <mesh position={[-0.3, -0.98, 0]}>
          <sphereGeometry args={[0.12, 20, 20]} />
          <meshStandardMaterial color={PALETTE.skin} roughness={0.6} />
        </mesh>
      </group>

      {/* Right arm — this one does the wave */}
      <group ref={rightArmRef} position={[0.65, 0.02, 0]}>
        <mesh position={[0.05, -0.5, 0]} rotation={[0, 0, -0.25]}>
          <capsuleGeometry args={[0.13, 0.65, 12, 20]} />
          <meshStandardMaterial color={PALETTE.hoodie} roughness={0.75} />
        </mesh>
        <mesh position={[0.24, -0.85, 0]} rotation={[0, 0, -0.25]}>
          <cylinderGeometry args={[0.14, 0.14, 0.08, 24]} />
          <meshStandardMaterial
            color={PALETTE.hoodieTrim}
            emissive={PALETTE.hoodieTrim}
            emissiveIntensity={0.3}
          />
        </mesh>
        <mesh position={[0.3, -0.98, 0]}>
          <sphereGeometry args={[0.12, 20, 20]} />
          <meshStandardMaterial color={PALETTE.skin} roughness={0.6} />
        </mesh>
      </group>

      {/* Soft contact-style shadow (a dark disc below the character) */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -1.55, 0]}
      >
        <circleGeometry args={[0.9, 48]} />
        <meshBasicMaterial
          color="#000000"
          transparent
          opacity={0.35}
        />
      </mesh>
    </group>
  )
}
