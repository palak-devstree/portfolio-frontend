'use client';

import { useState } from 'react';
import Avatar3DThree from './Avatar3DThree';

/**
 * Avatar Comparison Component
 * 
 * This component demonstrates the Three.js implementation.
 * 
 * To switch between Spline and Three.js:
 * 
 * SPLINE VERSION (Original):
 * import Spline from '@splinetool/react-spline';
 * <Spline scene="https://prod.spline.design/47G-sHHwpZlB68OX/scene.splinecode" />
 * 
 * THREE.JS VERSION (New):
 * import Avatar3DThree from './Avatar3DThree';
 * <Avatar3DThree />
 */

export default function AvatarComparison() {
  const [showThreeJS, setShowThreeJS] = useState(true);

  return (
    <div className="relative w-full h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-100 to-pink-100">
      {/* Toggle Button */}
      <div className="absolute top-8 right-8 z-50">
        <button
          onClick={() => setShowThreeJS(!showThreeJS)}
          className="px-6 py-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 font-semibold text-gray-800 hover:scale-105"
        >
          {showThreeJS ? '🎨 Using Three.js' : '🌀 Using Spline'}
        </button>
      </div>

      {/* Info Panel */}
      <div className="absolute top-8 left-8 z-50 bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          {showThreeJS ? '⚡ Three.js Avatar' : '🎨 Spline Avatar'}
        </h2>
        <div className="space-y-2 text-sm text-gray-600">
          {showThreeJS ? (
            <>
              <p>✅ Full code control</p>
              <p>✅ Better performance</p>
              <p>✅ Smaller bundle size</p>
              <p>✅ Custom animations</p>
              <p>✅ Easy to modify</p>
              <p>⚠️ Requires coding</p>
            </>
          ) : (
            <>
              <p>✅ Visual editor</p>
              <p>✅ Quick setup</p>
              <p>✅ No coding needed</p>
              <p>✅ Professional look</p>
              <p>⚠️ Limited customization</p>
              <p>⚠️ Larger file size</p>
            </>
          )}
        </div>
      </div>

      {/* Avatar Display */}
      <div className="relative flex items-center justify-center">
        {showThreeJS ? (
          <Avatar3DThree />
        ) : (
          <div className="text-center p-8 bg-white/50 rounded-2xl">
            <p className="text-gray-600 mb-4">
              To use Spline, import and use:
            </p>
            <code className="block bg-gray-800 text-green-400 p-4 rounded-lg text-sm">
              {`import Spline from '@splinetool/react-spline';

<Spline 
  scene="your-scene-url.splinecode"
  onLoad={() => setLoading(false)}
/>`}
            </code>
          </div>
        )}
      </div>

      {/* Instructions */}
      <div className="absolute bottom-8 text-center text-gray-600">
        <p className="text-lg font-medium">👆 Move your cursor to interact!</p>
        <p className="text-sm mt-2">The avatar will follow your mouse movement</p>
      </div>
    </div>
  );
}
