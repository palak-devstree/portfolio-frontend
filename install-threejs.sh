#!/bin/bash

echo "🚀 Installing Three.js and React Three Fiber dependencies..."
echo ""

# Check if npm or pnpm is available
if command -v pnpm &> /dev/null; then
    echo "📦 Using pnpm..."
    pnpm add three @react-three/fiber @react-three/drei
    pnpm add -D @types/three
elif command -v npm &> /dev/null; then
    echo "📦 Using npm..."
    npm install three @react-three/fiber @react-three/drei
    npm install --save-dev @types/three
else
    echo "❌ Neither npm nor pnpm found. Please install Node.js first."
    exit 1
fi

echo ""
echo "✅ Installation complete!"
echo ""
echo "📝 Next steps:"
echo "1. Replace your Spline avatar import with: import Avatar3DThree from './components/Avatar3DThree'"
echo "2. Customize colors and features in: src/app/components/three/CuteGirlAvatar.tsx"
echo "3. Read THREEJS_AVATAR_SETUP.md for detailed customization guide"
echo ""
echo "🎨 Happy coding!"
