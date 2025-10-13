'use client';

import { forwardRef } from 'react';
import { Group } from 'three';
import { useGLTF } from '@react-three/drei';

type PomegranateModelProps = {
  exploded?: boolean;
};

const PomegranateModel = forwardRef<Group, PomegranateModelProps>(({ exploded = false }, ref) => {
  const { scene } = useGLTF('/3d/pomegranate.glb');

  return (
    <group ref={ref} scale={1.4} position={[0, -0.3, 0]}>
      <primitive object={scene} />
      {exploded ? <group /> : null}
    </group>
  );
});

PomegranateModel.displayName = 'PomegranateModel';

useGLTF.preload('/3d/pomegranate.glb');

export default PomegranateModel;
