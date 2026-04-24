'use client'

import { Canvas } from '@react-three/fiber'
import { Suspense, useState } from 'react'
import { Skeleton } from './ui/skeleton'
import CuteGirlAvatar from './three/CuteGirlAvatar'

/**
 * Avatar3DThree
 * Compact canvas wrapper for the chibi avatar designed to sit
 * inside a ProfileCard. The card itself provides the framing
 * (rounded corners, glow, dark-purple backdrop), so this component
 * only renders the 3D scene — no decorative rings here.
 */
export default function Avatar3DThree() {
  const [loading, setLoading] = useState(true)

  return (
    <div className="relative w-full aspect-square select-none">
      {/* soft purple glow under the character */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 40% at 50% 85%, rgba(139,109,245,0.38), transparent 70%)',
        }}
      />

      <style>{`
        @keyframes v0-avatar-fade-in {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
      `}</style>

      {loading && <Loading />}

      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 0.35, 3.2], fov: 34 }}
        style={{
          width: '100%',
          height: '100%',
          animation: 'v0-avatar-fade-in 0.8s ease-out',
          userSelect: 'none',
        }}
        gl={{ antialias: true, alpha: true }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0)
          setLoading(false)
        }}
      >
        <Suspense fallback={null}>
          <CuteGirlAvatar />
        </Suspense>
      </Canvas>
    </div>
  )
}

function Loading() {
  return (
    <div className="absolute inset-0 flex justify-center items-center">
      <Skeleton className="size-24 rounded-full" />
    </div>
  )
}
