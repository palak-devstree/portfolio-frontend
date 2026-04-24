import { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function CuteGirlAvatar() {
  const groupRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Group>(null);
  const eyesRef = useRef<THREE.Group>(null);
  
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const targetRotation = useRef({ x: 0, y: 0 });

  // Track mouse movement
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = -(event.clientY / window.innerHeight) * 2 + 1;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Smooth animation following cursor
  useFrame((state) => {
    if (groupRef.current && headRef.current) {
      // Calculate target rotation based on mouse position
      targetRotation.current.y = mousePosition.x * 0.3;
      targetRotation.current.x = mousePosition.y * 0.2;

      // Smooth lerp to target rotation
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        targetRotation.current.y,
        0.1
      );

      headRef.current.rotation.x = THREE.MathUtils.lerp(
        headRef.current.rotation.x,
        targetRotation.current.x,
        0.1
      );

      // Gentle floating animation
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }

    // Blinking animation
    if (eyesRef.current) {
      const blinkTime = state.clock.elapsedTime % 4;
      if (blinkTime > 3.8 && blinkTime < 3.95) {
        eyesRef.current.scale.y = 0.1;
      } else {
        eyesRef.current.scale.y = 1;
      }
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      <ambientLight intensity={0.8} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} />

      {/* Head Group */}
      <group ref={headRef}>
        {/* Face */}
        <mesh position={[0, 0.5, 0]}>
          <sphereGeometry args={[0.8, 32, 32]} />
          <meshStandardMaterial color="#ffd4a3" />
        </mesh>

        {/* Hair - Top bun */}
        <mesh position={[0, 1.2, 0]}>
          <sphereGeometry args={[0.5, 32, 32]} />
          <meshStandardMaterial color="#ff6b35" />
        </mesh>

        {/* Hair - Side bangs left */}
        <mesh position={[-0.6, 0.8, 0.2]} rotation={[0, 0, 0.3]}>
          <sphereGeometry args={[0.35, 32, 32]} />
          <meshStandardMaterial color="#ff6b35" />
        </mesh>

        {/* Hair - Side bangs right */}
        <mesh position={[0.6, 0.8, 0.2]} rotation={[0, 0, -0.3]}>
          <sphereGeometry args={[0.35, 32, 32]} />
          <meshStandardMaterial color="#ff6b35" />
        </mesh>

        {/* Eyes Group */}
        <group ref={eyesRef}>
          {/* Left Eye */}
          <group position={[-0.25, 0.6, 0.6]}>
            <mesh>
              <sphereGeometry args={[0.15, 16, 16]} />
              <meshStandardMaterial color="#ffffff" />
            </mesh>
            <mesh position={[0, 0, 0.1]}>
              <sphereGeometry args={[0.08, 16, 16]} />
              <meshStandardMaterial color="#ff1493" />
            </mesh>
            <mesh position={[0.02, 0.02, 0.15]}>
              <sphereGeometry args={[0.04, 16, 16]} />
              <meshStandardMaterial color="#000000" />
            </mesh>
          </group>

          {/* Right Eye */}
          <group position={[0.25, 0.6, 0.6]}>
            <mesh>
              <sphereGeometry args={[0.15, 16, 16]} />
              <meshStandardMaterial color="#ffffff" />
            </mesh>
            <mesh position={[0, 0, 0.1]}>
              <sphereGeometry args={[0.08, 16, 16]} />
              <meshStandardMaterial color="#ff1493" />
            </mesh>
            <mesh position={[0.02, 0.02, 0.15]}>
              <sphereGeometry args={[0.04, 16, 16]} />
              <meshStandardMaterial color="#000000" />
            </mesh>
          </group>
        </group>

        {/* Nose */}
        <mesh position={[0, 0.4, 0.75]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial color="#ffb380" />
        </mesh>

        {/* Mouth - Smile */}
        <mesh position={[0, 0.2, 0.7]} rotation={[0, 0, 0]}>
          <torusGeometry args={[0.15, 0.03, 16, 32, Math.PI]} />
          <meshStandardMaterial color="#ff6b9d" />
        </mesh>

        {/* Blush - Left */}
        <mesh position={[-0.5, 0.35, 0.6]}>
          <sphereGeometry args={[0.12, 16, 16]} />
          <meshStandardMaterial color="#ffb3c1" transparent opacity={0.6} />
        </mesh>

        {/* Blush - Right */}
        <mesh position={[0.5, 0.35, 0.6]}>
          <sphereGeometry args={[0.12, 16, 16]} />
          <meshStandardMaterial color="#ffb3c1" transparent opacity={0.6} />
        </mesh>

        {/* Glasses Frame - Left */}
        <mesh position={[-0.25, 0.6, 0.7]}>
          <torusGeometry args={[0.18, 0.02, 16, 32]} />
          <meshStandardMaterial color="#ff1493" />
        </mesh>

        {/* Glasses Frame - Right */}
        <mesh position={[0.25, 0.6, 0.7]}>
          <torusGeometry args={[0.18, 0.02, 16, 32]} />
          <meshStandardMaterial color="#ff1493" />
        </mesh>

        {/* Glasses Bridge */}
        <mesh position={[0, 0.6, 0.7]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.02, 0.02, 0.15, 8]} />
          <meshStandardMaterial color="#ff1493" />
        </mesh>
      </group>

      {/* Body */}
      <mesh position={[0, -0.8, 0]}>
        <cylinderGeometry args={[0.5, 0.7, 1.2, 32]} />
        <meshStandardMaterial color="#f4e4c1" />
      </mesh>

      {/* Collar */}
      <mesh position={[0, -0.2, 0]}>
        <cylinderGeometry args={[0.52, 0.52, 0.1, 32]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>

      {/* Arms - Left */}
      <group position={[-0.7, -0.5, 0]} rotation={[0, 0, 0.3]}>
        <mesh>
          <cylinderGeometry args={[0.15, 0.12, 0.8, 16]} />
          <meshStandardMaterial color="#ffd4a3" />
        </mesh>
        {/* Hand */}
        <mesh position={[0, -0.5, 0]}>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshStandardMaterial color="#ffd4a3" />
        </mesh>
      </group>

      {/* Arms - Right */}
      <group position={[0.7, -0.5, 0]} rotation={[0, 0, -0.3]}>
        <mesh>
          <cylinderGeometry args={[0.15, 0.12, 0.8, 16]} />
          <meshStandardMaterial color="#ffd4a3" />
        </mesh>
        {/* Hand */}
        <mesh position={[0, -0.5, 0]}>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshStandardMaterial color="#ffd4a3" />
        </mesh>
      </group>

      {/* Accessory - Heart on shirt */}
      <mesh position={[0, -0.6, 0.7]} rotation={[0, 0, Math.PI / 4]}>
        <boxGeometry args={[0.15, 0.15, 0.05]} />
        <meshStandardMaterial color="#ff1493" />
      </mesh>
      <mesh position={[0.1, -0.5, 0.7]} rotation={[0, 0, -Math.PI / 4]}>
        <boxGeometry args={[0.15, 0.15, 0.05]} />
        <meshStandardMaterial color="#ff1493" />
      </mesh>
      <mesh position={[0.05, -0.75, 0.7]}>
        <coneGeometry args={[0.15, 0.25, 4]} />
        <meshStandardMaterial color="#ff1493" />
      </mesh>
    </group>
  );
}
