'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { Float, MeshDistortMaterial, Sphere } from '@react-three/drei';

function FloatingShape({ position, color, speed, size }) {
    const mesh = useRef();

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        mesh.current.position.y = position[1] + Math.sin(t * speed) * 0.5;
        mesh.current.rotation.x += 0.005;
        mesh.current.rotation.y += 0.005;
    });

    return (
        <mesh position={position} ref={mesh}>
            <octahedronGeometry args={[size, 0]} />
            <meshStandardMaterial color={color} wireframe />
        </mesh>
    );
}

function Rig() {
    useFrame((state) => {
        state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, state.mouse.x * 2, 0.1);
        state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, state.mouse.y * 2, 0.1);
        state.camera.lookAt(0, 0, 0);
    });
    return null;
}

export default function ThreeBackground() {
    return (
        <div className="fixed inset-0 z-0 bg-white">
            <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} />
                <pointLight position={[-10, -10, -10]} color="indigo" intensity={0.5} />

                <FloatingShape position={[-4, 2, -2]} color="#6366f1" speed={0.5} size={1} />
                <FloatingShape position={[4, -3, -1]} color="#06b6d4" speed={0.8} size={1.5} />
                <FloatingShape position={[-2, -4, 1]} color="#8b5cf6" speed={0.3} size={0.8} />
                <FloatingShape position={[3, 4, -3]} color="#f43f5e" speed={0.6} size={1.2} />

                <Float speed={2} rotationIntensity={1} floatIntensity={2}>
                    <Sphere args={[2, 64, 64]} position={[0, 0, -5]}>
                        <MeshDistortMaterial
                            color="#f8fafc"
                            speed={3}
                            distort={0.4}
                            radius={1}
                            transparent
                            opacity={0.3}
                        />
                    </Sphere>
                </Float>

                <Rig />
            </Canvas>
        </div>
    );
}
