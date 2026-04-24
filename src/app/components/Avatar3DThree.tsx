'use client';

import { Canvas } from '@react-three/fiber';
import { Suspense, useState } from 'react';
import { Skeleton } from './ui/skeleton';
import CuteGirlAvatar from './three/CuteGirlAvatar';

export default function Avatar3DThree() {
  const [loading, setLoading] = useState(true);

  return (
    <div className="relative w-full h-[450px] sm:h-[500px] lg:h-[550px] overflow-hidden select-none">
      {loading && <Loading />}
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        style={{
          width: '100%',
          height: '100%',
          animation: 'fade-in 1s ease-in-out',
          userSelect: 'none',
        }}
        onCreated={() => setLoading(false)}
      >
        <Suspense fallback={null}>
          <CuteGirlAvatar />
        </Suspense>
      </Canvas>
    </div>
  );
}

function Loading() {
  return (
    <div className="absolute inset-0 flex justify-center items-center">
      <Skeleton className="size-32 rounded-full" />
    </div>
  );
}
