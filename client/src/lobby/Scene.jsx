import { useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ZonePlate, Player, PLATE_DATA } from "./Lobby";
import {
  Grid,
  Text,
  Ring,
  Float,
  Points,
  PointMaterial,
} from "@react-three/drei";
import * as THREE from "three"
import { EmberParticles } from "./components/Emberparticles";
import { RigidBody } from "@react-three/rapier";
import { LargeBuilding } from "./components/LargeBuilding";


// ── SCENE ─────────────────────────────────────────
export default function Scene({ onEnterZone }) {
  const PLATE_DATA = [
  { label: "STORY MODE",   color: 0xe85d04, pos: [-5, 1.2, -3], page: "story" },
  { label: "DAILY DEBATE", color: 0xff9a3c, pos: [5,  1.2, -3],  page: "dailyFeed" },
  { label: "ACHIEVEMENTS", color: 0xffcb77, pos: [-5,  1.2, 4],  page: "achievements" },
  { label: "HOW TO PLAY",  color: 0xcc6600, pos: [5,  1.2,  4],  page: "htp" },
];

  return (
    <>
      {/* Fog */}
      <fogExp2 attach="fog" color={0x120a00} density={0.055} />

      {/* Lights */}
      <ambientLight color={0xfff4e0} intensity={0.4} />  {/* soft warm skylight */}
      
      {/* warm sunlight */}
      <directionalLight
        color={0xfff5e0}                                  
        intensity={1.2}
        position={[0, 20, 20]}
        castShadow
      />
      <pointLight color={0xffe4b5}  intensity={0.6} distance={30} position={[-5, 4, -5]} /> {/* soft fill */}

      {/* Floor */}
      <RigidBody type="fixed">
        <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <planeGeometry args={[30, 30]} />
          <meshStandardMaterial color={0x10AD08} roughness={0.95} metalness={0.05} />
        </mesh>
      </RigidBody>
      

      {/* Grid */}
      {/* <gridHelper args={[30, 30, 0xe85d0422, 0xff9a3c11]} /> */}

      {/* Zone plates */}
      {PLATE_DATA.map((pd) => (
        <ZonePlate
          key={pd.page}
          label={pd.label}
          color={pd.color}
          pos={pd.pos}
          onEnter={onEnterZone}
        />
      ))}
      <LargeBuilding position={[0, 0, -10]} />
      <LargeBuilding position={[12, 0, 0]} />
      <LargeBuilding position={[7, 0, -7]} />
      <LargeBuilding position={[-9, 0, 0]} />
      <LargeBuilding position={[-10, 0, -8]} />
      <LargeBuilding position={[10, 0, 12]} />


      {/* Particles */}
      <EmberParticles />

      {/* Player (handles its own movement + camera + proximity) */}
      <Player onProximityChange={onEnterZone} />
    </>
  );
}