import * as THREE from 'three';
import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';

export default function BlobEffect() {
  const mesh = useRef<THREE.Mesh>(null);
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColor: { value: new THREE.Color('#14b8a6') },
    }),
    []
  );

  useFrame((state, delta) => {
    uniforms.uTime.value += delta;
    if (mesh.current) {
      mesh.current.rotation.y += delta * 0.2;
      mesh.current.rotation.x = Math.sin(uniforms.uTime.value * 0.3) * 0.2;
    }
  });

  return (
    <mesh ref={mesh} position={[0, 0, -1]} scale={[2.5, 2.5, 2.5]}>
      <icosahedronGeometry args={[1, 6]} />
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={`
          uniform float uTime;
          varying vec3 vNormal;
          varying vec3 vPosition;
          void main() {
            vNormal = normal;
            vPosition = position;
            float displacement = 0.2 * sin(5.0 * position.x + uTime) * cos(5.0 * position.y + uTime) * sin(5.0 * position.z + uTime);
            vec3 newPosition = position + normal * displacement;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
          }
        `}
        fragmentShader={`
          uniform vec3 uColor;
          varying vec3 vNormal;
          varying vec3 vPosition;
          void main() {
            float intensity = 0.5 + 0.5 * dot(normalize(vNormal), vec3(0.0, 0.0, 1.0));
            vec3 color = mix(uColor, vec3(1.0, 1.0, 1.0), 1.0 - intensity);
            gl_FragColor = vec4(color, 0.85);
          }
        `}
        transparent
        depthWrite={false}
      />
    </mesh>
  );
} 