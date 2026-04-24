# 🎨 Avatar Customization Examples

## Ready-to-Use Character Presets

Copy and paste these color combinations into `CuteGirlAvatar.tsx` to instantly change your avatar's appearance!

---

## 🌟 Preset 1: Classic Professional

**Perfect for**: Corporate portfolios, professional sites

```tsx
// Skin
<meshStandardMaterial color="#ffd4a3" />

// Hair
<meshStandardMaterial color="#8b4513" /> // Brown

// Eyes
<meshStandardMaterial color="#4a4a4a" /> // Dark gray

// Glasses
<meshStandardMaterial color="#000000" /> // Black

// Clothing
<meshStandardMaterial color="#2c3e50" /> // Navy blue

// Accent (heart)
<meshStandardMaterial color="#3498db" /> // Professional blue
```

---

## 🌸 Preset 2: Kawaii Pink (Current Default)

**Perfect for**: Creative portfolios, fun brands

```tsx
// Skin
<meshStandardMaterial color="#ffd4a3" />

// Hair
<meshStandardMaterial color="#ff6b35" /> // Orange

// Eyes
<meshStandardMaterial color="#ff1493" /> // Hot pink

// Glasses
<meshStandardMaterial color="#ff1493" /> // Hot pink

// Clothing
<meshStandardMaterial color="#f4e4c1" /> // Beige

// Accent (heart)
<meshStandardMaterial color="#ff1493" /> // Hot pink
```

---

## 💜 Preset 3: Purple Dream

**Perfect for**: Tech startups, modern brands

```tsx
// Skin
<meshStandardMaterial color="#ffe0bd" />

// Hair
<meshStandardMaterial color="#9b59b6" /> // Purple

// Eyes
<meshStandardMaterial color="#8e44ad" /> // Dark purple

// Glasses
<meshStandardMaterial color="#8e44ad" /> // Dark purple

// Clothing
<meshStandardMaterial color="#ecf0f1" /> // Light gray

// Accent (heart)
<meshStandardMaterial color="#e74c3c" /> // Red
```

---

## 🌊 Preset 4: Ocean Blue

**Perfect for**: Tech companies, clean designs

```tsx
// Skin
<meshStandardMaterial color="#ffd4a3" />

// Hair
<meshStandardMaterial color="#2c3e50" /> // Dark blue-gray

// Eyes
<meshStandardMaterial color="#3498db" /> // Bright blue

// Glasses
<meshStandardMaterial color="#2980b9" /> // Ocean blue

// Clothing
<meshStandardMaterial color="#ecf0f1" /> // White

// Accent (heart)
<meshStandardMaterial color="#e74c3c" /> // Red
```

---

## 🌿 Preset 5: Nature Green

**Perfect for**: Eco-friendly brands, wellness sites

```tsx
// Skin
<meshStandardMaterial color="#c68642" />

// Hair
<meshStandardMaterial color="#27ae60" /> // Green

// Eyes
<meshStandardMaterial color="#16a085" /> // Teal

// Glasses
<meshStandardMaterial color="#2ecc71" /> // Light green

// Clothing
<meshStandardMaterial color="#f39c12" /> // Orange

// Accent (heart)
<meshStandardMaterial color="#e74c3c" /> // Red
```

---

## 🔥 Preset 6: Fiery Red

**Perfect for**: Bold brands, gaming sites

```tsx
// Skin
<meshStandardMaterial color="#ffd4a3" />

// Hair
<meshStandardMaterial color="#e74c3c" /> // Red

// Eyes
<meshStandardMaterial color="#c0392b" /> // Dark red

// Glasses
<meshStandardMaterial color="#000000" /> // Black

// Clothing
<meshStandardMaterial color="#2c3e50" /> // Dark gray

// Accent (heart)
<meshStandardMaterial color="#e74c3c" /> // Red
```

---

## ⭐ Preset 7: Golden Blonde

**Perfect for**: Luxury brands, elegant sites

```tsx
// Skin
<meshStandardMaterial color="#ffe0bd" />

// Hair
<meshStandardMaterial color="#f39c12" /> // Golden blonde

// Eyes
<meshStandardMaterial color="#3498db" /> // Blue

// Glasses
<meshStandardMaterial color="#d4af37" /> // Gold

// Clothing
<meshStandardMaterial color="#ffffff" /> // White

// Accent (heart)
<meshStandardMaterial color="#e74c3c" /> // Red
```

---

## 🖤 Preset 8: Goth Style

**Perfect for**: Alternative brands, dark themes

```tsx
// Skin
<meshStandardMaterial color="#f5e6d3" />

// Hair
<meshStandardMaterial color="#000000" /> // Black

// Eyes
<meshStandardMaterial color="#8e44ad" /> // Purple

// Glasses
<meshStandardMaterial color="#000000" /> // Black

// Clothing
<meshStandardMaterial color="#2c3e50" /> // Dark navy

// Accent (heart)
<meshStandardMaterial color="#9b59b6" /> // Purple
```

---

## 🌈 Preset 9: Rainbow Unicorn

**Perfect for**: Kids' sites, playful brands

```tsx
// Skin
<meshStandardMaterial color="#ffd4a3" />

// Hair
<meshStandardMaterial color="#ff69b4" /> // Hot pink

// Eyes
<meshStandardMaterial color="#00ffff" /> // Cyan

// Glasses
<meshStandardMaterial color="#ff1493" /> // Deep pink

// Clothing
<meshStandardMaterial color="#9370db" /> // Medium purple

// Accent (heart)
<meshStandardMaterial color="#ffd700" /> // Gold
```

---

## 🤎 Preset 10: Chocolate Brown

**Perfect for**: Warm, friendly brands

```tsx
// Skin
<meshStandardMaterial color="#c68642" />

// Hair
<meshStandardMaterial color="#654321" /> // Dark brown

// Eyes
<meshStandardMaterial color="#8b4513" /> // Saddle brown

// Glasses
<meshStandardMaterial color="#a0522d" /> // Sienna

// Clothing
<meshStandardMaterial color="#deb887" /> // Burlywood

// Accent (heart)
<meshStandardMaterial color="#d2691e" /> // Chocolate
```

---

## 🎯 How to Apply a Preset

1. Open `src/app/components/three/CuteGirlAvatar.tsx`
2. Find the section you want to change (search for "Face", "Hair", "Eyes", etc.)
3. Replace the `color` value with the preset color
4. Save and refresh your browser

### Example: Changing Hair Color

**Find this (around line 50):**
```tsx
{/* Hair - Top bun */}
<mesh position={[0, 1.2, 0]}>
  <sphereGeometry args={[0.5, 32, 32]} />
  <meshStandardMaterial color="#ff6b35" />  ← Change this line
</mesh>
```

**Replace with:**
```tsx
<meshStandardMaterial color="#9b59b6" />  ← Purple hair!
```

---

## 🎨 Custom Color Picker

Don't like these presets? Create your own!

### Tools to Find Colors:
- [Coolors.co](https://coolors.co/) - Color palette generator
- [Adobe Color](https://color.adobe.com/) - Professional color wheel
- [HTML Color Codes](https://htmlcolorcodes.com/) - Color picker

### Color Format:
Always use hex format: `#RRGGBB`

Examples:
- `#ff0000` = Red
- `#00ff00` = Green
- `#0000ff` = Blue
- `#ffffff` = White
- `#000000` = Black

---

## 🔧 Advanced Customizations

### Make Eyes Bigger
```tsx
// Find the eye geometry (around line 75)
<sphereGeometry args={[0.15, 16, 16]} />
// Change to
<sphereGeometry args={[0.20, 16, 16]} /> // Bigger eyes
```

### Remove Glasses
```tsx
// Find the glasses section (around line 120)
// Comment out or delete these lines:
{/* Glasses Frame - Left */}
{/* Glasses Frame - Right */}
{/* Glasses Bridge */}
```

### Change Hair Style to Ponytail
```tsx
// Replace the hair bun with:
<mesh position={[0, 0.8, -0.6]} rotation={[0.5, 0, 0]}>
  <cylinderGeometry args={[0.15, 0.1, 1.2, 16]} />
  <meshStandardMaterial color="#ff6b35" />
</mesh>
```

### Add Freckles
```tsx
{/* Freckles */}
<mesh position={[-0.3, 0.45, 0.75]}>
  <sphereGeometry args={[0.02, 8, 8]} />
  <meshStandardMaterial color="#d2691e" />
</mesh>
<mesh position={[-0.35, 0.4, 0.73]}>
  <sphereGeometry args={[0.02, 8, 8]} />
  <meshStandardMaterial color="#d2691e" />
</mesh>
// Repeat for right side
```

### Add Earrings
```tsx
{/* Left Earring */}
<mesh position={[-0.85, 0.5, 0]}>
  <sphereGeometry args={[0.08, 16, 16]} />
  <meshStandardMaterial color="#ffd700" metalness={0.9} roughness={0.1} />
</mesh>

{/* Right Earring */}
<mesh position={[0.85, 0.5, 0]}>
  <sphereGeometry args={[0.08, 16, 16]} />
  <meshStandardMaterial color="#ffd700" metalness={0.9} roughness={0.1} />
</mesh>
```

---

## 🎭 Emotion Variations

### Happy (Default)
```tsx
<mesh position={[0, 0.2, 0.7]} rotation={[0, 0, 0]}>
  <torusGeometry args={[0.15, 0.03, 16, 32, Math.PI]} />
  <meshStandardMaterial color="#ff6b9d" />
</mesh>
```

### Surprised
```tsx
<mesh position={[0, 0.2, 0.7]}>
  <sphereGeometry args={[0.08, 16, 16]} />
  <meshStandardMaterial color="#ff6b9d" />
</mesh>
```

### Neutral
```tsx
<mesh position={[0, 0.2, 0.7]}>
  <boxGeometry args={[0.2, 0.03, 0.05]} />
  <meshStandardMaterial color="#ff6b9d" />
</mesh>
```

---

## 📊 Color Psychology Guide

Choose colors based on your brand message:

| Color | Emotion | Best For |
|-------|---------|----------|
| 🔴 Red | Energy, Passion | Bold brands, gaming |
| 🔵 Blue | Trust, Professional | Corporate, tech |
| 💚 Green | Growth, Nature | Eco, wellness |
| 💜 Purple | Creative, Luxury | Art, premium |
| 🧡 Orange | Friendly, Fun | Creative, youth |
| 💛 Yellow | Happy, Optimistic | Kids, cheerful |
| 🖤 Black | Elegant, Powerful | Luxury, modern |
| 🤍 White | Clean, Simple | Minimal, medical |
| 💗 Pink | Playful, Feminine | Beauty, creative |
| 🤎 Brown | Warm, Reliable | Traditional, food |

---

## 🚀 Quick Tips

1. **Start with a preset** - Don't start from scratch
2. **Change one thing at a time** - See what works
3. **Test on mobile** - Colors look different on phones
4. **Match your brand** - Use your existing color palette
5. **Keep contrast** - Ensure features are visible
6. **Save your changes** - Document your custom colors

---

## 💾 Save Your Custom Preset

Once you create a combination you like, save it:

```tsx
// My Custom Preset - [Your Name]
// Created: [Date]
// Theme: [Description]

const MY_COLORS = {
  skin: "#ffd4a3",
  hair: "#ff6b35",
  eyes: "#ff1493",
  glasses: "#ff1493",
  clothing: "#f4e4c1",
  accent: "#ff1493"
};

// Then use: color={MY_COLORS.hair}
```

---

**Happy Customizing! 🎨**

Remember: There are no wrong choices - experiment and have fun!
