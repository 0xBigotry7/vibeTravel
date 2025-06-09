import { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const PARTICLE_COUNT = 2000;
const COLORS = [
  '#14b8a6', // teal
  '#38bdf8', // blue
  '#f472b6', // pink
  '#facc15', // yellow
  '#a3e635', // lime
];

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export default function ParticleLoveEffect() {
  const mesh = useRef<THREE.Points>(null);
  const mouse = useRef({ x: 0, y: 0 });

  // Particle positions, colors, and swirl data
  const { positions, colors, angles, radii, speeds } = useMemo(() => {
    const pos = new Float32Array(PARTICLE_COUNT * 3);
    const col = new Float32Array(PARTICLE_COUNT * 3);
    const ang = new Float32Array(PARTICLE_COUNT);
    const rad = new Float32Array(PARTICLE_COUNT);
    const spd = new Float32Array(PARTICLE_COUNT);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 2 + Math.random() * 2;
      const y = (Math.random() - 0.5) * 2;
      pos[i * 3] = Math.cos(angle) * radius;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = Math.sin(angle) * radius;
      ang[i] = angle;
      rad[i] = radius;
      spd[i] = 0.002 + Math.random() * 0.004;
      // Color gradient
      const color = new THREE.Color(COLORS[i % COLORS.length]);
      col[i * 3] = color.r;
      col[i * 3 + 1] = color.g;
      col[i * 3 + 2] = color.b;
    }
    return { positions: pos, colors: col, angles: ang, radii: rad, speeds: spd };
  }, []);

  // Mouse attraction
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame(() => {
    if (!mesh.current) return;
    const positionsAttr = mesh.current.geometry.getAttribute('position');
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      // Swirl around center
      angles[i] += speeds[i];
      const radius = radii[i] + Math.sin(performance.now() * 0.0002 + i) * 0.1;
      let x = Math.cos(angles[i]) * radius;
      let z = Math.sin(angles[i]) * radius;
      let y = positionsAttr.getY(i);

      // Mouse attraction (gentle, only if mouse is near)
      const mx = mouse.current.x * 3;
      const mz = mouse.current.y * 3;
      const dist = Math.sqrt((x - mx) ** 2 + (z - mz) ** 2);
      if (dist < 1.5) {
        x = lerp(x, mx, 0.02);
        z = lerp(z, mz, 0.02);
      }

      // Gentle vertical oscillation
      y = Math.sin(performance.now() * 0.0005 + i) * 1.2;

      positionsAttr.setXYZ(i, x, y, z);
    }
    positionsAttr.needsUpdate = true;
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        vertexColors
        opacity={0.7}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  );
} 