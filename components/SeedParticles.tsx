'use client';

import { useEffect, useMemo, useRef } from 'react';
import type { InstancedMesh } from 'three';
import { Object3D } from 'three';

const tempObject = new Object3D();

type SeedParticlesProps = {
  count?: number;
};

export default function SeedParticles({ count = 120 }: SeedParticlesProps) {
  const mesh = useRef<InstancedMesh>(null);

  const seeds = useMemo(
    () =>
      new Array(count).fill(null).map(() => ({
        x: (Math.random() - 0.5) * 1.6,
        y: (Math.random() - 0.4) * 1.6,
        z: (Math.random() - 0.5) * 1.6,
        scale: Math.random() * 0.08 + 0.04,
      })),
    [count]
  );

  useEffect(() => {
    if (!mesh.current) return;

    seeds.forEach((seed, index) => {
      tempObject.position.set(seed.x, seed.y, seed.z);
      tempObject.scale.set(seed.scale, seed.scale, seed.scale);
      tempObject.updateMatrix();
      mesh.current!.setMatrixAt(index, tempObject.matrix);
    });

    mesh.current.instanceMatrix.needsUpdate = true;
  }, [seeds]);

  return (
    <instancedMesh ref={mesh} args={[undefined as any, undefined as any, count]}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshStandardMaterial color="#ae1230" roughness={0.5} metalness={0.1} />
    </instancedMesh>
  );
}
