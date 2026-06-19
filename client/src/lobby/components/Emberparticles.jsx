import {
  Grid,
  Text,
  Ring,
  Float,
  Points,
  PointMaterial,
} from "@react-three/drei";
import { useMemo } from "react";

export function EmberParticles() {
  const positions = useMemo(() => {
    const arr = new Float32Array(280 * 3);
    for (let i = 0; i < 280; i++) {
      arr[i * 3]     = (Math.random() - 0.5) * 30;
      arr[i * 3 + 1] = Math.random() * 10;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 30;
    }
    return arr;
  }, []);

  return (
    <Points positions={positions}>
      <PointMaterial
        color={0xff9a3c}
        size={0.07}
        transparent
        opacity={0.45}
        sizeAttenuation
      />
    </Points>
  );
}