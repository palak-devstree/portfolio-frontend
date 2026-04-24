'use client'

import { Canvas } from '@react-three/fiber'
import { Suspense, useState } from 'react'
import { Skeleton } from './ui/skeleton'
import CuteGirlAvatar from './three/CuteGirlAvatar'

/**
 * Avatar3DThree
 * Canvas wrapper for the chibi avatar. Adds a themed backdrop (purple
 * radial glow + subtle dotted ring) so the 3D character feels "placed"
 * inside the dark hero instead of floating in a void.
 */
export default function Avatar3DThree() {
  const [loading, setLoading] = useState(true)

  return (
    <div className="relative w-full h-[420px] sm:h-[480px] lg:h-[540px] select-none">
      {/* Purple radial glow behind the avatar */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 50% 55%, rgba(139,109,245,0.28), transparent 60%)',
        }}
      />
      {/* Decorative rotating ring */}
      <div
        aria-hidden
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          width: '78%',
          aspectRatio: '1 / 1',
          border: '1px dashed rgba(139,109,245,0.22)',
          animation: 'v0-avatar-spin 40s linear infinite',
        }}
      />
      <div
        aria-hidden
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          width: '56%',
          aspectRatio: '1 / 1',
          border: '1px solid rgba(45,212,191,0.15)',
          animation: 'v0-avatar-spin-rev 28s linear infinite',
        }}
      />

      <style>{`
        @keyframes v0-avatar-spin {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to   { transform: translate(-50%, -50%) rotate(360deg); }
        }
        @keyframes v0-avatar-spin-rev {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to   { transform: translate(-50%, -50%) rotate(-360deg); }
        }
        @keyframes v0-avatar-fade-in {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
      `}</style>

      {loading && <Loading />}

      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 0.2, 4.2], fov: 38 }}
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
      <Skeleton className="size-32 rounded-full" />
    </div>
  )
}
