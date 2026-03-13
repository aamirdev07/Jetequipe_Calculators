'use client';

import React, { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Grid, Environment } from '@react-three/drei';
import * as THREE from 'three';

interface TankView3DProps {
  cylinderHeight: number; // in display units
  coneHeight: number;
  diameter: number;
  totalHeight: number;
}

function TankMesh({ cylinderHeight, coneHeight, diameter, totalHeight }: TankView3DProps) {
  const groupRef = useRef<THREE.Group>(null);

  // Normalize dimensions (scale so max dimension = 2)
  const maxDim = Math.max(diameter, totalHeight);
  const scale = maxDim > 0 ? 2 / maxDim : 1;

  const r = (diameter * scale) / 2;
  const cylH = cylinderHeight * scale;
  const coneH = coneHeight * scale;

  // Position so bottom of cone is at y=0
  const coneY = coneH / 2;
  const cylY = coneH + cylH / 2;

  return (
    <group ref={groupRef}>
      {/* Cylinder body */}
      {cylH > 0.001 && (
        <mesh position={[0, cylY, 0]}>
          <cylinderGeometry args={[r, r, cylH, 64, 1, true]} />
          <meshStandardMaterial
            color="#B0C4DE"
            metalness={0.3}
            roughness={0.6}
            transparent
            opacity={0.7}
            side={THREE.DoubleSide}
          />
        </mesh>
      )}

      {/* Flat lid (top cap) */}
      <mesh position={[0, coneH + cylH, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[r, 64]} />
        <meshStandardMaterial
          color="#B0C4DE"
          metalness={0.3}
          roughness={0.6}
          transparent
          opacity={0.6}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Cone bottom */}
      {coneH > 0.001 && (
        <mesh position={[0, coneY, 0]}>
          <coneGeometry args={[r, coneH, 64, 1, true]} />
          <meshStandardMaterial
            color="#B0C4DE"
            metalness={0.3}
            roughness={0.6}
            transparent
            opacity={0.7}
            side={THREE.DoubleSide}
          />
        </mesh>
      )}
    </group>
  );
}

export default function TankView3D(props: TankView3DProps) {
  if (props.totalHeight === 0 || props.diameter === 0) {
    return null;
  }

  return (
    <Canvas
      camera={{ position: [3, 2, 3], fov: 50 }}
      style={{ width: '100%', height: 400, borderRadius: 12, background: '#F0F4F8' }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <directionalLight position={[-3, 3, -3]} intensity={0.3} />
      <TankMesh {...props} />
      <Grid
        args={[10, 10]}
        position={[0, -0.01, 0]}
        cellSize={0.5}
        cellThickness={0.5}
        cellColor="#C0C0C0"
        sectionSize={2}
        sectionThickness={1}
        sectionColor="#808080"
        fadeDistance={10}
        fadeStrength={1}
        infiniteGrid
      />
      <OrbitControls
        enablePan={false}
        minDistance={2}
        maxDistance={8}
        autoRotate
        autoRotateSpeed={1}
      />
      <Environment preset="studio" />
    </Canvas>
  );
}
