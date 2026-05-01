import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, MeshDistortMaterial, Float, Ring, Torus } from "@react-three/drei";
import * as THREE from "three";

function AnimatedSphere() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(clock.elapsedTime * 0.3) * 0.2;
      meshRef.current.rotation.y = clock.elapsedTime * 0.2;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1.5}>
      <Sphere ref={meshRef} args={[1.4, 64, 64]}>
        <MeshDistortMaterial
          color="#00d4ff"
          attach="material"
          distort={0.35}
          speed={2}
          roughness={0}
          metalness={0.8}
          transparent
          opacity={0.15}
          wireframe={false}
        />
      </Sphere>
      {/* Inner sphere */}
      <Sphere args={[1.1, 32, 32]}>
        <MeshDistortMaterial
          color="#0066ff"
          attach="material"
          distort={0.25}
          speed={3}
          roughness={0.1}
          metalness={0.9}
          transparent
          opacity={0.08}
        />
      </Sphere>
    </Float>
  );
}

function OrbitRing({ radius, color, speed, tilt }: { radius: number; color: string; speed: number; tilt: number }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.z = clock.elapsedTime * speed;
    }
  });
  return (
    <Ring
      ref={ref}
      args={[radius - 0.015, radius + 0.015, 64]}
      rotation={[tilt, 0, 0]}
    >
      <meshBasicMaterial color={color} transparent opacity={0.4} side={THREE.DoubleSide} />
    </Ring>
  );
}

function FloatingParticles() {
  const points = useRef<THREE.Points>(null);
  const count = 80;
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    const r = 2.5 + Math.random() * 1.5;
    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = r * Math.cos(phi);
  }

  useFrame(({ clock }) => {
    if (points.current) {
      points.current.rotation.y = clock.elapsedTime * 0.05;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial color="#00d4ff" size={0.04} transparent opacity={0.7} />
    </points>
  );
}

function RotatingTorus() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.x = clock.elapsedTime * 0.4;
      ref.current.rotation.y = clock.elapsedTime * 0.2;
    }
  });
  return (
    <Torus ref={ref} args={[1.8, 0.02, 16, 100]}>
      <meshBasicMaterial color="#7b2fff" transparent opacity={0.35} />
    </Torus>
  );
}

export default function HeroSphere() {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 4.5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[5, 5, 5]} intensity={2} color="#00d4ff" />
        <pointLight position={[-5, -3, 2]} intensity={1.5} color="#7b2fff" />
        <pointLight position={[0, 0, 3]} intensity={1} color="#0066ff" />

        <AnimatedSphere />
        <OrbitRing radius={2.0} color="#00d4ff" speed={0.4} tilt={0.3} />
        <OrbitRing radius={2.4} color="#7b2fff" speed={-0.3} tilt={1.0} />
        <OrbitRing radius={1.7} color="#00ff88" speed={0.6} tilt={-0.5} />
        <RotatingTorus />
        <FloatingParticles />
      </Canvas>
    </div>
  );
}
