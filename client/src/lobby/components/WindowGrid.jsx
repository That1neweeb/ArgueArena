function WindowGrid({
  rows,
  cols,
  start,
  step,
  rotation = [0, 0, 0],
}) {
  return (
    <group rotation={rotation}>
      {Array.from({ length: rows }).map((_, row) =>
        Array.from({ length: cols }).map((_, col) => (
          <mesh
            key={`${row}-${col}`}
            position={[
              start[0] + col * step[0],
              start[1] + row * step[1],
              start[2],
            ]}
          >
            <boxGeometry args={[0.45, 0.45, 0.05]} />
            <meshStandardMaterial
              color="#99ddff"
              emissive="#99ddff"
              emissiveIntensity={0.35}
            />
          </mesh>
        ))
      )}
    </group>
  );
}

export default WindowGrid;