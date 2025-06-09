"use client";

import { Canvas } from '@react-three/fiber';
import { Stars } from '@react-three/drei';

export default function Hero3D() {
  return (
    <div className="absolute inset-0 w-full h-full z-0">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <Stars
          radius={100} // Radius of the inner sphere (default=100)
          depth={50}   // Depth of area where stars should fit (default=50)
          count={5000} // Amount of stars (default=5000)
          factor={4}   // Size factor (default=4)
          saturation={0}
          fade
          speed={1}
        />
        <ambientLight intensity={0.5} />
      </Canvas>
    </div>
  );
} 