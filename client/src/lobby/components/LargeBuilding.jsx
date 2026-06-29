import { RigidBody } from '@react-three/rapier';
import WindowGrid from './WindowGrid';

export function LargeBuilding({ position }) {
  return (
    <RigidBody type="fixed" colliders="cuboid" position={position}>
    <group >
      <mesh position={[0, 5, 0]} castShadow receiveShadow>
        <boxGeometry args={[4, 10, 4]} />
        <meshStandardMaterial color="#bfbfbf" />
      </mesh>

      {/* Front */}
      <WindowGrid
        rows={10}
        cols={4}
        start={[-1.35, 0.8, 2.01]}
        step={[0.9, 0.85]}
      />

      {/* Back */}
      <WindowGrid
        rows={10}
        cols={4}
        start={[-1.35, 0.8, -2.01]}
        step={[0.9, 0.85]}
      />

      {/* Left */}
      <WindowGrid
        rows={10}
        cols={3}
        start={[-1.1, 0.8, 2.01]}
        step={[1.1, 0.85]}
        rotation={[0, Math.PI / 2, 0]}
      />

      {/* Right */}
      <WindowGrid
        rows={10}
        cols={3}
        start={[-1.1, 0.8, -2.01]}
        step={[1.1, 0.85]}
        rotation={[0, Math.PI / 2, 0]}
      />
    </group>
    </RigidBody>
  );
}