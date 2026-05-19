'use client';

import { useMemo } from 'react';
import * as THREE from 'three';
import type { Product } from '@/lib/workspace-data';

/**
 * Per-product visual config. Falls back to category defaults.
 * All meshes sit on their own local origin (y=0 at floor or mounting surface).
 */

const DESK_TOP_HEIGHT = 0.72;

// ---------------- Desks ----------------

function Desk({ product }: { product: Product }) {
  const palette = useMemo(() => {
    switch (product.id) {
      case 'desk-modern':
        return { top: '#2c2c2c', legs: '#6b7280' };
      case 'desk-bamboo':
        return { top: '#d9b88c', legs: '#a78461' };
      case 'desk-compact':
        return { top: '#f5f1ea', legs: '#bfb8aa' };
      default:
        return { top: '#c4a882', legs: '#8b7355' };
    }
  }, [product.id]);

  const isCompact = product.id === 'desk-compact';
  const w = isCompact ? 2.4 : 3.0;
  const d = isCompact ? 1.2 : 1.4;

  return (
    <group>
      {/* top */}
      <mesh position={[0, DESK_TOP_HEIGHT, 0]} castShadow receiveShadow>
        <boxGeometry args={[w, 0.06, d]} />
        <meshStandardMaterial color={palette.top} roughness={0.55} />
      </mesh>
      {/* legs */}
      {(
        [
          [-w / 2 + 0.08, DESK_TOP_HEIGHT / 2, d / 2 - 0.08],
          [w / 2 - 0.08, DESK_TOP_HEIGHT / 2, d / 2 - 0.08],
          [-w / 2 + 0.08, DESK_TOP_HEIGHT / 2, -d / 2 + 0.08],
          [w / 2 - 0.08, DESK_TOP_HEIGHT / 2, -d / 2 + 0.08],
        ] as [number, number, number][]
      ).map((p, i) => (
        <mesh key={i} position={p} castShadow>
          <boxGeometry args={[0.08, DESK_TOP_HEIGHT - 0.03, 0.08]} />
          <meshStandardMaterial color={palette.legs} roughness={0.5} />
        </mesh>
      ))}
    </group>
  );
}

// ---------------- Chairs ----------------

function Chair({ product }: { product: Product }) {
  const palette = useMemo(() => {
    switch (product.id) {
      case 'chair-ergonomic':
        return { body: '#1f2937', mesh: '#374151', accent: '#111827' };
      case 'chair-minimal':
        return { body: '#f5f1ea', mesh: '#e5e0d3', accent: '#6b7280' };
      case 'chair-lounge':
        return { body: '#d97757', mesh: '#c66a4a', accent: '#a85a3f' };
      default:
        return { body: '#374151', mesh: '#4b5563', accent: '#1f2937' };
    }
  }, [product.id]);

  if (product.id === 'chair-lounge') {
    // bean bag
    return (
      <group>
        <mesh position={[0, 0.35, 0]} castShadow>
          <sphereGeometry args={[0.55, 24, 16]} />
          <meshStandardMaterial color={palette.body} roughness={0.95} />
        </mesh>
        <mesh position={[0, 0.18, 0]} castShadow>
          <cylinderGeometry args={[0.6, 0.65, 0.18, 24]} />
          <meshStandardMaterial color={palette.accent} roughness={0.95} />
        </mesh>
      </group>
    );
  }

  return (
    <group>
      {/* 5-star base */}
      {Array.from({ length: 5 }).map((_, i) => {
        const a = (i / 5) * Math.PI * 2;
        return (
          <mesh
            key={i}
            position={[Math.cos(a) * 0.25, 0.03, Math.sin(a) * 0.25]}
            rotation={[0, -a, 0]}
            castShadow
          >
            <boxGeometry args={[0.5, 0.06, 0.08]} />
            <meshStandardMaterial color={palette.accent} roughness={0.4} metalness={0.3} />
          </mesh>
        );
      })}
      {/* column */}
      <mesh position={[0, 0.35, 0]} castShadow>
        <cylinderGeometry args={[0.05, 0.05, 0.6, 12]} />
        <meshStandardMaterial color={palette.accent} metalness={0.5} roughness={0.3} />
      </mesh>
      {/* seat */}
      <mesh position={[0, 0.7, 0]} castShadow>
        <boxGeometry args={[0.6, 0.1, 0.55]} />
        <meshStandardMaterial color={palette.body} roughness={0.7} />
      </mesh>
      {/* backrest */}
      <mesh position={[0, 1.05, -0.25]} castShadow>
        <boxGeometry args={[0.6, 0.7, 0.08]} />
        <meshStandardMaterial color={palette.mesh} roughness={0.8} />
      </mesh>
      {/* headrest for ergonomic */}
      {product.id === 'chair-ergonomic' && (
        <mesh position={[0, 1.5, -0.22]} castShadow>
          <boxGeometry args={[0.35, 0.2, 0.08]} />
          <meshStandardMaterial color={palette.mesh} roughness={0.8} />
        </mesh>
      )}
    </group>
  );
}

// ---------------- Monitor ----------------

function Monitor({ product }: { product: Product }) {
  const isUltrawide = product.id === 'monitor-ultrawide';
  const screenW = isUltrawide ? 1.7 : 1.1;
  const screenH = 0.65;

  return (
    <group>
      {/* base */}
      <mesh position={[0, 0.02, 0]} castShadow>
        <boxGeometry args={[0.5, 0.04, 0.18]} />
        <meshStandardMaterial color="#1f2937" roughness={0.4} />
      </mesh>
      {/* stand */}
      <mesh position={[0, 0.22, -0.02]} castShadow>
        <boxGeometry args={[0.08, 0.4, 0.08]} />
        <meshStandardMaterial color="#1f2937" roughness={0.4} />
      </mesh>
      {/* screen body */}
      <mesh position={[0, 0.5 + screenH / 2, 0]} castShadow>
        <boxGeometry args={[screenW, screenH, 0.06]} />
        <meshStandardMaterial color="#0f172a" roughness={0.5} />
      </mesh>
      {/* display surface */}
      <mesh position={[0, 0.5 + screenH / 2, 0.031]}>
        <planeGeometry args={[screenW - 0.06, screenH - 0.06]} />
        <meshStandardMaterial
          color="#60a5fa"
          emissive="#3b82f6"
          emissiveIntensity={0.4}
          roughness={0.2}
        />
      </mesh>
    </group>
  );
}

// ---------------- Lamp ----------------

function Lamp() {
  return (
    <group>
      <mesh position={[0, 0.03, 0]} castShadow>
        <cylinderGeometry args={[0.18, 0.2, 0.06, 24]} />
        <meshStandardMaterial color="#2c2c2c" roughness={0.5} />
      </mesh>
      <mesh position={[0, 0.4, 0]} castShadow>
        <cylinderGeometry args={[0.025, 0.025, 0.7, 12]} />
        <meshStandardMaterial color="#2c2c2c" />
      </mesh>
      <mesh position={[0.12, 0.78, 0]} rotation={[0, 0, -Math.PI / 6]} castShadow>
        <cylinderGeometry args={[0.025, 0.025, 0.35, 12]} />
        <meshStandardMaterial color="#2c2c2c" />
      </mesh>
      <mesh position={[0.28, 0.84, 0]} castShadow>
        <coneGeometry args={[0.15, 0.22, 24, 1, true]} />
        <meshStandardMaterial color="#f3f4f6" side={THREE.DoubleSide} roughness={0.6} />
      </mesh>
      <pointLight position={[0.28, 0.78, 0]} intensity={0.6} distance={2} color="#fde68a" />
    </group>
  );
}

// ---------------- Plant ----------------

function Plant({ product }: { product: Product }) {
  const isSnake = product.id === 'plant-snake';

  return (
    <group>
      {/* pot */}
      <mesh position={[0, 0.18, 0]} castShadow>
        <cylinderGeometry args={[0.22, 0.18, 0.36, 24]} />
        <meshStandardMaterial color={isSnake ? '#b45309' : '#e7e5e4'} roughness={0.9} />
      </mesh>
      {/* foliage */}
      {isSnake ? (
        // Snake plant — tall spike leaves
        Array.from({ length: 6 }).map((_, i) => {
          const a = (i / 6) * Math.PI * 2;
          const r = 0.06;
          return (
            <mesh
              key={i}
              position={[Math.cos(a) * r, 0.7, Math.sin(a) * r]}
              rotation={[0, -a, (i % 2 ? 1 : -1) * 0.1]}
              castShadow
            >
              <boxGeometry args={[0.08, 0.7, 0.02]} />
              <meshStandardMaterial color="#15803d" roughness={0.8} />
            </mesh>
          );
        })
      ) : (
        // Monstera — leaf cluster
        <>
          {Array.from({ length: 8 }).map((_, i) => {
            const a = (i / 8) * Math.PI * 2;
            return (
              <mesh
                key={i}
                position={[Math.cos(a) * 0.18, 0.55 + Math.sin(i) * 0.05, Math.sin(a) * 0.18]}
                rotation={[0.4, -a, 0]}
                castShadow
              >
                <sphereGeometry args={[0.2, 12, 8]} />
                <meshStandardMaterial color="#15803d" roughness={0.85} />
              </mesh>
            );
          })}
          <mesh position={[0, 0.7, 0]} castShadow>
            <sphereGeometry args={[0.22, 16, 12]} />
            <meshStandardMaterial color="#16a34a" roughness={0.85} />
          </mesh>
        </>
      )}
    </group>
  );
}

// ---------------- Coffee ----------------

function Coffee() {
  return (
    <group>
      {/* body */}
      <mesh position={[0, 0.3, 0]} castShadow>
        <boxGeometry args={[0.4, 0.6, 0.4]} />
        <meshStandardMaterial color="#1f2937" roughness={0.4} />
      </mesh>
      {/* top */}
      <mesh position={[0, 0.62, 0]} castShadow>
        <boxGeometry args={[0.34, 0.04, 0.34]} />
        <meshStandardMaterial color="#9ca3af" metalness={0.6} roughness={0.3} />
      </mesh>
      {/* spout */}
      <mesh position={[0, 0.4, 0.22]} castShadow>
        <boxGeometry args={[0.15, 0.08, 0.06]} />
        <meshStandardMaterial color="#374151" roughness={0.4} />
      </mesh>
      {/* cup */}
      <mesh position={[0, 0.18, 0.32]} castShadow>
        <cylinderGeometry args={[0.07, 0.06, 0.1, 18]} />
        <meshStandardMaterial color="#f9fafb" roughness={0.5} />
      </mesh>
    </group>
  );
}

// ---------------- Accessories ----------------

function Keyboard() {
  return (
    <mesh position={[0, 0.025, 0]} castShadow>
      <boxGeometry args={[0.9, 0.05, 0.28]} />
      <meshStandardMaterial color="#1f2937" roughness={0.5} />
    </mesh>
  );
}

function Mouse() {
  return (
    <mesh position={[0, 0.025, 0]} castShadow>
      <sphereGeometry args={[0.09, 16, 12]} />
      <meshStandardMaterial color="#1f2937" roughness={0.5} />
    </mesh>
  );
}

function LaptopStand() {
  return (
    <group>
      <mesh position={[0, 0.04, 0]} castShadow>
        <boxGeometry args={[0.7, 0.04, 0.5]} />
        <meshStandardMaterial color="#9ca3af" metalness={0.5} roughness={0.4} />
      </mesh>
      <mesh position={[0, 0.18, -0.05]} rotation={[Math.PI / 12, 0, 0]} castShadow>
        <boxGeometry args={[0.7, 0.04, 0.5]} />
        <meshStandardMaterial color="#9ca3af" metalness={0.5} roughness={0.4} />
      </mesh>
    </group>
  );
}

function Webcam() {
  return (
    <group>
      <mesh position={[0, 0.06, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <cylinderGeometry args={[0.06, 0.06, 0.1, 18]} />
        <meshStandardMaterial color="#1f2937" roughness={0.4} />
      </mesh>
      <mesh position={[0, 0.06, 0.06]}>
        <circleGeometry args={[0.03, 18]} />
        <meshStandardMaterial color="#0ea5e9" emissive="#0ea5e9" emissiveIntensity={0.5} />
      </mesh>
    </group>
  );
}

function Headphones() {
  return (
    <group>
      <mesh position={[0, 0.15, 0]} rotation={[0, 0, 0]} castShadow>
        <torusGeometry args={[0.16, 0.025, 12, 24, Math.PI]} />
        <meshStandardMaterial color="#111827" roughness={0.5} />
      </mesh>
      <mesh position={[-0.16, 0.05, 0]} castShadow>
        <sphereGeometry args={[0.06, 16, 12]} />
        <meshStandardMaterial color="#111827" roughness={0.5} />
      </mesh>
      <mesh position={[0.16, 0.05, 0]} castShadow>
        <sphereGeometry args={[0.06, 16, 12]} />
        <meshStandardMaterial color="#111827" roughness={0.5} />
      </mesh>
    </group>
  );
}


function Accessory({ product }: { product: Product }) {
  switch (product.id) {
    case 'keyboard':
      return <Keyboard />;
    case 'mouse':
      return <Mouse />;
    case 'laptop-stand':
      return <LaptopStand />;
    case 'webcam':
      return <Webcam />;
    case 'headphones':
      return <Headphones />;
    default:
      return <Keyboard />;
  }
}

// ---------------- Dispatcher ----------------

export function Furniture3D({ product }: { product: Product }) {
  switch (product.category) {
    case 'desk':
      return <Desk product={product} />;
    case 'chair':
      return <Chair product={product} />;
    case 'monitor':
      return <Monitor product={product} />;
    case 'lighting':
      return <Lamp />;
    case 'plant':
      return <Plant product={product} />;
    case 'coffee':
      return <Coffee />;
    case 'accessory':
      return <Accessory product={product} />;
    default:
      return null;
  }
}
