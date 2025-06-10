"use client";

import { Canvas } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
// import ParticleLoveEffect from './ParticleLoveEffect';

export default function FullPage3DBackground() {
  return (
    <div className="fixed inset-0 w-full h-full z-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <Stars
          radius={100}
          depth={50}
          count={5000}
          factor={4}
          saturation={0}
          fade
          speed={1}
        />
        {/* <ParticleLoveEffect /> */}
        <ambientLight intensity={0.7} />
      </Canvas>
    </div>
  );
} 