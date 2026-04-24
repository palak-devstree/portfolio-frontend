# Three.js 3D Avatar Setup Guide

## Overview
This guide explains how to set up and use the cute 3D girl avatar built with Three.js and React Three Fiber.

## Features
✨ **Interactive**: Follows cursor movement smoothly
👀 **Animated**: Includes blinking, floating, and idle animations
🎨 **Customizable**: Easy to modify colors, shapes, and features
⚡ **Performant**: Optimized for smooth 60fps rendering
📱 **Responsive**: Adapts to different screen sizes

## Installation

### 1. Install Required Dependencies

```bash
npm install three @react-three/fiber @react-three/drei
```

Or with pnpm:
```bash
pnpm add three @react-three/fiber @react-three/drei
```

### 2. Install Type Definitions (if using TypeScript)

```bash
npm install --save-dev @types/three
```

## Usage

### Basic Implementation

Replace your existing Spline avatar with the Three.js version:

```tsx
import Avatar3DThree from './components/Avatar3DThree';

function HeroSection() {
  return (
    <div className="relative">
      <Avatar3DThree />
      {/* Your other content */}
    </div>
  );
}
```

## File Structure

```
src/app/components/
├── Avatar3DThree.tsx          # Main wrapper component
└── three/
    └── CuteGirlAvatar.tsx     # 3D character model
```

## Customization Guide

### Change Colors

Edit `CuteGirlAvatar.tsx`:

```tsx
// Skin tone
<meshStandardMaterial color="#ffd4a3" />  // Change to your preferred color

// Hair color
<meshStandardMaterial color="#ff6b35" />  // Orange hair

// Eye color
<meshStandardMaterial color="#ff1493" />  // Pink eyes

// Clothing
<meshStandardMaterial color="#f4e4c1" />  // Beige shirt
```

### Adjust Size

In `Avatar3DThree.tsx`:

```tsx
<div className="absolute size-[400px] max-xl:size-[280px]">
  {/* Change size-[400px] to your preferred size */}
</div>
```

### Modify Animations

In `CuteGirlAvatar.tsx`:

```tsx
// Floating speed
groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
//                                                                  ^^^   ^^^
//                                                                speed  amplitude

// Cursor follow sensitivity
targetRotation.current.y = mousePosition.x * 0.3;  // Horizontal sensitivity
targetRotation.current.x = mousePosition.y * 0.2;  // Vertical sensitivity

// Smoothness
THREE.MathUtils.lerp(current, target, 0.1);  // Lower = smoother, higher = snappier
```

### Add More Features

#### Add Earrings:
```tsx
{/* Left Earring */}
<mesh position={[-0.8, 0.5, 0]}>
  <sphereGeometry args={[0.08, 16, 16]} />
  <meshStandardMaterial color="#ffd700" metalness={0.8} />
</mesh>

{/* Right Earring */}
<mesh position={[0.8, 0.5, 0]}>
  <sphereGeometry args={[0.08, 16, 16]} />
  <meshStandardMaterial color="#ffd700" metalness={0.8} />
</mesh>
```

#### Add Hair Bow:
```tsx
{/* Bow */}
<mesh position={[0, 1.4, -0.3]}>
  <boxGeometry args={[0.4, 0.2, 0.1]} />
  <meshStandardMaterial color="#ff69b4" />
</mesh>
```

## Performance Optimization

### 1. Reduce Geometry Segments
Lower the segment count for better performance:

```tsx
// Before
<sphereGeometry args={[0.8, 32, 32]} />

// After (better performance)
<sphereGeometry args={[0.8, 16, 16]} />
```

### 2. Use Lower Quality on Mobile

```tsx
const isMobile = window.innerWidth < 768;
const segments = isMobile ? 8 : 16;

<sphereGeometry args={[0.8, segments, segments]} />
```

### 3. Implement LOD (Level of Detail)

```tsx
import { Lod } from '@react-three/drei';

<Lod distances={[0, 10, 20]}>
  <HighDetailModel />
  <MediumDetailModel />
  <LowDetailModel />
</Lod>
```

## Comparison: Spline vs Three.js

| Feature | Spline | Three.js + R3F |
|---------|--------|----------------|
| **Ease of Use** | ⭐⭐⭐⭐⭐ Visual editor | ⭐⭐⭐ Code-based |
| **Customization** | ⭐⭐⭐ Limited to editor | ⭐⭐⭐⭐⭐ Full control |
| **Performance** | ⭐⭐⭐ Good | ⭐⭐⭐⭐⭐ Excellent |
| **Bundle Size** | ~100KB + scene | ~150KB total |
| **Learning Curve** | Easy | Moderate |
| **Animation Control** | ⭐⭐⭐ Built-in | ⭐⭐⭐⭐⭐ Programmatic |
| **Interactivity** | ⭐⭐⭐⭐ Good | ⭐⭐⭐⭐⭐ Full control |

## Troubleshooting

### Avatar Not Showing
1. Check if dependencies are installed
2. Verify Canvas component is rendered
3. Check browser console for errors

### Poor Performance
1. Reduce geometry segments
2. Lower animation frame rate
3. Implement frustum culling
4. Use `useMemo` for static geometries

### Mouse Tracking Not Working
1. Ensure event listener is attached to window
2. Check if coordinates are normalized correctly
3. Verify refs are properly connected

## Advanced Features

### Add Physics
```bash
npm install @react-three/cannon
```

### Add Post-Processing Effects
```bash
npm install @react-three/postprocessing
```

### Add Environment Maps
```tsx
import { Environment } from '@react-three/drei';

<Environment preset="sunset" />
```

## Resources

- [Three.js Documentation](https://threejs.org/docs/)
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber/)
- [Drei Helpers](https://github.com/pmndrs/drei)
- [Three.js Examples](https://threejs.org/examples/)

## Next Steps

1. ✅ Install dependencies
2. ✅ Replace Spline component
3. 🎨 Customize colors and features
4. ⚡ Optimize for your use case
5. 🚀 Deploy and enjoy!

---

**Created with ❤️ using Three.js and React Three Fiber**
