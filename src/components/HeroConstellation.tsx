"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return reduced;
}

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return isMobile;
}

const LINE_UPDATE_INTERVAL = 5;
const CONNECT_DISTANCE = 2.8;
const MAX_SEGMENTS = 280;
const BOUNDS = { x: 13, y: 7 };

function ConstellationScene({ count, drawLines }: { count: number; drawLines: boolean }) {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const frameCount = useRef(0);

  const { positions, velocities } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * BOUNDS.x * 2;
      positions[i * 3 + 1] = (Math.random() - 0.5) * BOUNDS.y * 2;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 6 - 2;
      velocities[i * 3] = (Math.random() - 0.5) * 0.004;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.004;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.002;
    }
    return { positions, velocities };
  }, [count]);

  const lineGeometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const linePositions = new Float32Array(MAX_SEGMENTS * 2 * 3);
    geo.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));
    geo.setDrawRange(0, 0);
    return geo;
  }, []);

  useEffect(() => lineGeometry.dispose, [lineGeometry]);

  useFrame((state) => {
    const posAttr = pointsRef.current?.geometry.attributes.position as
      | THREE.BufferAttribute
      | undefined;
    if (!posAttr) return;
    const arr = posAttr.array as Float32Array;

    for (let i = 0; i < count; i++) {
      const ix = i * 3;
      arr[ix] += velocities[ix];
      arr[ix + 1] += velocities[ix + 1];
      arr[ix + 2] += velocities[ix + 2];
      if (arr[ix] > BOUNDS.x) arr[ix] = -BOUNDS.x;
      if (arr[ix] < -BOUNDS.x) arr[ix] = BOUNDS.x;
      if (arr[ix + 1] > BOUNDS.y) arr[ix + 1] = -BOUNDS.y;
      if (arr[ix + 1] < -BOUNDS.y) arr[ix + 1] = BOUNDS.y;
    }
    posAttr.needsUpdate = true;

    const { pointer, camera } = state;
    camera.position.x += (pointer.x * 0.6 - camera.position.x) * 0.03;
    camera.position.y += (pointer.y * 0.4 - camera.position.y) * 0.03;
    camera.lookAt(0, 0, 0);

    if (drawLines && linesRef.current) {
      frameCount.current++;
      if (frameCount.current % LINE_UPDATE_INTERVAL === 0) {
        const lineAttr = lineGeometry.attributes.position as THREE.BufferAttribute;
        const lineArr = lineAttr.array as Float32Array;
        let segIndex = 0;
        for (let i = 0; i < count && segIndex < MAX_SEGMENTS; i++) {
          const ix = i * 3;
          for (let j = i + 1; j < count && segIndex < MAX_SEGMENTS; j++) {
            const jx = j * 3;
            const dx = arr[ix] - arr[jx];
            const dy = arr[ix + 1] - arr[jx + 1];
            const dz = arr[ix + 2] - arr[jx + 2];
            const distSq = dx * dx + dy * dy + dz * dz;
            if (distSq < CONNECT_DISTANCE * CONNECT_DISTANCE) {
              const base = segIndex * 6;
              lineArr[base] = arr[ix];
              lineArr[base + 1] = arr[ix + 1];
              lineArr[base + 2] = arr[ix + 2];
              lineArr[base + 3] = arr[jx];
              lineArr[base + 4] = arr[jx + 1];
              lineArr[base + 5] = arr[jx + 2];
              segIndex++;
            }
          }
        }
        lineGeometry.setDrawRange(0, segIndex * 2);
        lineAttr.needsUpdate = true;
      }
    }
  });

  return (
    <>
      <Points ref={pointsRef} positions={positions} stride={3}>
        <PointMaterial
          color="#18181b"
          size={0.09}
          sizeAttenuation
          transparent
          opacity={0.75}
          depthWrite={false}
        />
      </Points>
      {drawLines && (
        <lineSegments ref={linesRef} geometry={lineGeometry}>
          <lineBasicMaterial color="#52525b" transparent opacity={0.34} depthWrite={false} />
        </lineSegments>
      )}
    </>
  );
}

export default function HeroConstellation() {
  const reducedMotion = usePrefersReducedMotion();
  const isMobile = useIsMobile();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted || reducedMotion) return null;

  const count = isMobile ? 55 : 170;

  return (
    <div className="absolute inset-0">
      <Canvas
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: true }}
        camera={{ position: [0, 0, 6], fov: 50 }}
      >
        <ConstellationScene count={count} drawLines={!isMobile} />
      </Canvas>
    </div>
  );
}
