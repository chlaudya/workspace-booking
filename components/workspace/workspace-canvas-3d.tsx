'use client';

import { Suspense, useLayoutEffect, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrthographicCamera } from '@react-three/drei';
import * as THREE from 'three';
import { PlacedItem } from '@/lib/workspace-store';
import { getPositionFor } from '@/lib/workspace-layout';
import { Furniture3D } from './furniture-3d';

function CameraRig() {
  const camera = useThree((s) => s.camera);
  useLayoutEffect(() => {
    camera.position.set(6, 5, 6);
    camera.lookAt(0, 0.45, 0);
    camera.updateProjectionMatrix();
  }, [camera]);
  return null;
}

function Platform() {
  return (
    <group position={[0, 0, 0]}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <circleGeometry args={[3.0, 64]} />
        <meshStandardMaterial color="#efe9dc" roughness={0.95} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.003, 0]}>
        <ringGeometry args={[2.93, 3.0, 64]} />
        <meshStandardMaterial color="#c9bfa9" roughness={0.95} />
      </mesh>
    </group>
  );
}

function PlacedFurniture({
  item,
  indexInCategory,
}: {
  item: PlacedItem;
  indexInCategory: number;
}) {
  const position = getPositionFor(item.product.category, indexInCategory);
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, dt) => {
    if (!groupRef.current) return;
    groupRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), dt * 10);
  });

  return (
    <group ref={groupRef} position={position} scale={[0.001, 0.001, 0.001]}>
      <Furniture3D product={item.product} />
    </group>
  );
}

function SceneContent({ items }: { items: PlacedItem[] }) {
  return (
    <>
      <color attach="background" args={['#f4f1ea']} />
      <CameraRig />

      <ambientLight intensity={0.85} />
      <hemisphereLight args={['#fff8e8', '#a89e85', 0.5]} />
      <directionalLight
        position={[5, 8, 4]}
        intensity={0.9}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-left={-5}
        shadow-camera-right={5}
        shadow-camera-top={5}
        shadow-camera-bottom={-5}
        shadow-camera-near={0.1}
        shadow-camera-far={20}
      />
      <directionalLight position={[-4, 3, -3]} intensity={0.3} />

      <Platform />

      <Suspense fallback={null}>
        {(() => {
          const counters: Record<string, number> = {};
          return items.map((item) => {
            const cat = item.product.category;
            const idx = counters[cat] ?? 0;
            counters[cat] = idx + 1;
            return (
              <PlacedFurniture
                key={item.id}
                item={item}
                indexInCategory={idx}
              />
            );
          });
        })()}
      </Suspense>
    </>
  );
}

export function WorkspaceCanvas3D({ items }: { items: PlacedItem[] }) {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        shadows="percentage"
        style={{ width: '100%', height: '100%', display: 'block' }}
        gl={{ antialias: true, alpha: false }}
        dpr={[1, 2]}
      >
        <OrthographicCamera makeDefault zoom={75} near={-50} far={100} />
        <SceneContent items={items} />
      </Canvas>
    </div>
  );
}
