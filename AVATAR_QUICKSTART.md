# 🎨 3D Avatar Quick Start Guide

## What You Get

A cute, interactive 3D girl avatar that:
- 👀 Follows your cursor smoothly
- 😊 Has animated blinking eyes
- 🎈 Floats gently up and down
- 👓 Wears pink glasses
- 💖 Has a heart on her shirt
- 🧡 Features orange hair in a bun

## Installation (Choose One Method)

### Method 1: Windows (Double-click)
```bash
# Just double-click this file:
install-threejs.bat
```

### Method 2: Command Line
```bash
cd frontend/portfolio-frontend

# Using npm
npm install three @react-three/fiber @react-three/drei
npm install --save-dev @types/three

# OR using pnpm
pnpm add three @react-three/fiber @react-three/drei
pnpm add -D @types/three
```

## Usage

### Replace Your Current Avatar

**Before (Spline):**
```tsx
import Spline from '@splinetool/react-spline';

<Spline 
  scene="https://prod.spline.design/47G-sHHwpZlB68OX/scene.splinecode"
  onLoad={() => setLoading(false)}
/>
```

**After (Three.js):**
```tsx
import Avatar3DThree from './components/Avatar3DThree';

<Avatar3DThree />
```

That's it! 🎉

## Quick Customization

### Change Hair Color
Open: `src/app/components/three/CuteGirlAvatar.tsx`

Find line ~50:
```tsx
<meshStandardMaterial color="#ff6b35" /> // Orange hair
```

Change to:
```tsx
<meshStandardMaterial color="#8b4513" /> // Brown hair
<meshStandardMaterial color="#000000" /> // Black hair
<meshStandardMaterial color="#ffd700" /> // Blonde hair
<meshStandardMaterial color="#ff69b4" /> // Pink hair
```

### Change Eye Color
Find line ~90:
```tsx
<meshStandardMaterial color="#ff1493" /> // Pink eyes
```

Change to:
```tsx
<meshStandardMaterial color="#0000ff" /> // Blue eyes
<meshStandardMaterial color="#008000" /> // Green eyes
<meshStandardMaterial color="#8b4513" /> // Brown eyes
```

### Change Skin Tone
Find line ~40:
```tsx
<meshStandardMaterial color="#ffd4a3" /> // Light skin
```

Change to:
```tsx
<meshStandardMaterial color="#c68642" /> // Medium skin
<meshStandardMaterial color="#8d5524" /> // Dark skin
<meshStandardMaterial color="#ffe0bd" /> // Fair skin
```

### Adjust Size
Open: `src/app/components/Avatar3DThree.tsx`

Find line ~10:
```tsx
<div className="absolute size-[400px] max-xl:size-[280px]">
```

Change to:
```tsx
<div className="absolute size-[500px] max-xl:size-[350px]"> // Bigger
<div className="absolute size-[300px] max-xl:size-[200px]"> // Smaller
```

## File Structure

```
src/app/components/
├── Avatar3DThree.tsx              ← Main component (use this)
├── AvatarComparison.tsx           ← Demo/comparison page
└── three/
    └── CuteGirlAvatar.tsx         ← 3D model (customize here)
```

## Testing

### Option 1: Use in Your Existing Page
```tsx
import Avatar3DThree from './components/Avatar3DThree';

function HeroSection() {
  return (
    <div className="relative h-screen">
      <Avatar3DThree />
      <h1>Your Content Here</h1>
    </div>
  );
}
```

### Option 2: Test with Comparison Page
```tsx
import AvatarComparison from './components/AvatarComparison';

// This shows the avatar with toggle and info
<AvatarComparison />
```

## Common Issues

### ❌ Avatar Not Showing
**Solution:** Make sure you installed dependencies:
```bash
npm install three @react-three/fiber @react-three/drei
```

### ❌ TypeScript Errors
**Solution:** Install type definitions:
```bash
npm install --save-dev @types/three
```

### ❌ Performance Issues
**Solution:** Reduce geometry detail in `CuteGirlAvatar.tsx`:
```tsx
// Change from 32 to 16
<sphereGeometry args={[0.8, 16, 16]} />
```

### ❌ Avatar Not Following Mouse
**Solution:** Check if the component is mounted and visible in the viewport.

## Performance Comparison

| Metric | Spline | Three.js |
|--------|--------|----------|
| Initial Load | ~2-3s | ~0.5-1s |
| Bundle Size | ~100KB + scene (2-5MB) | ~150KB total |
| FPS | 30-60 | 60 |
| Customization | Limited | Unlimited |
| Learning Curve | Easy | Medium |

## Next Steps

1. ✅ Install dependencies
2. ✅ Import `Avatar3DThree` component
3. 🎨 Customize colors (optional)
4. 🚀 Test in your app
5. 📱 Check mobile responsiveness
6. 🎉 Deploy!

## Need Help?

- 📖 Read full guide: `THREEJS_AVATAR_SETUP.md`
- 🔧 Check the code: `src/app/components/three/CuteGirlAvatar.tsx`
- 🎨 Try comparison: `src/app/components/AvatarComparison.tsx`

## Color Palette Reference

```tsx
// Skin Tones
"#ffd4a3"  // Light
"#c68642"  // Medium
"#8d5524"  // Dark
"#ffe0bd"  // Fair

// Hair Colors
"#ff6b35"  // Orange
"#8b4513"  // Brown
"#000000"  // Black
"#ffd700"  // Blonde
"#ff69b4"  // Pink

// Eye Colors
"#ff1493"  // Pink
"#0000ff"  // Blue
"#008000"  // Green
"#8b4513"  // Brown

// Clothing
"#f4e4c1"  // Beige
"#ffffff"  // White
"#ff1493"  // Pink accent
```

---

**Made with ❤️ using Three.js**

Enjoy your new 3D avatar! 🎉
