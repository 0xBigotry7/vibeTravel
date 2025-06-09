import * as THREE from 'three';
import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';

export default function AuroraEffect() {
  const mesh = useRef<THREE.Mesh>(null);
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColorA: { value: new THREE.Color('#00cfff') },
      uColorB: { value: new THREE.Color('#ff00c8') },
    }),
    []
  );

  useFrame((state, delta) => {
    uniforms.uTime.value += delta;
  });

  return (
    <mesh ref={mesh} position={[0, 0, -2]}>
      <planeGeometry args={[8, 4, 128, 128]} />
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={`
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `}
        fragmentShader={`
          uniform float uTime;
          uniform vec3 uColorA;
          uniform vec3 uColorB;
          varying vec2 vUv;
          void main() {
            float y = vUv.y + (sin(vUv.x * 10.0 + uTime * 0.7) * 0.1) + (sin(vUv.x * 40.0 + uTime * 2.0) * 0.02);
            float strength = smoothstep(0.4, 0.6, y);
            vec3 color = mix(uColorA, uColorB, vUv.x + 0.2 * sin(uTime + vUv.y * 10.0));
            gl_FragColor = vec4(color, strength * 0.7);
          }
        `}
        transparent
        depthWrite={false}
      />
    </mesh>
  );
} 