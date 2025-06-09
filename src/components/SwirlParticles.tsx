import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const PARTICLE_COUNT = 600;

export default function SwirlParticles() {
  const mesh = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(PARTICLE_COUNT * 3);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 1.5 + Math.random() * 1.5;
      const y = (Math.random() - 0.5) * 2;
      arr[i * 3] = Math.cos(angle) * radius;
      arr[i * 3 + 1] = y;
      arr[i * 3 + 2] = Math.sin(angle) * radius;
    }
    return arr;
  }, []);

  useFrame(({ clock, mouse }) => {
    if (mesh.current) {
      mesh.current.rotation.y = clock.getElapsedTime() * 0.1 + mouse.x * 1.5;
      mesh.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.1) * 0.2 + mouse.y * 1.5;
    }
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.07}
        color="#14b8a6"
        opacity={0.7}
        transparent
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  );
} 