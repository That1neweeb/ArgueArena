

/**
 * Dependencies (add to your project):
 *   npm install three @react-three/fiber @react-three/drei
 */
import { Physics,RigidBody } from "@react-three/rapier";
import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { useNavigate } from 'react-router-dom'
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Grid,
  Text,
  Ring,
  Float,
  Points,
  PointMaterial,
} from "@react-three/drei";
import * as THREE from "three";
import "./Lobby.css";
import HTPModal from "./HTP";
import StoryModeModal from "../features/StoryMode/StoryModeModal";
import Scene from "./Scene";
import { useAuth } from '../context/authContext.jsx';

export const PLATE_DATA = [
  { label: "STORY MODE",   color: 0xe85d04, pos: [-5, 1.2, -3], page: "story" },
  { label: "DAILY DEBATE", color: 0xff9a3c, pos: [5,  1.2, -3],  page: "dailyFeed" },
  { label: "ACHIEVEMENTS", color: 0xffcb77, pos: [-5,  1.2, 4],  page: "achievements" },
  { label: "HOW TO PLAY",  color: 0xcc6600, pos: [5,  1.2,  4],  page: "htp" },
];

// ── PARTICLES ─────────────────────────────────────
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

// ── ZONE PLATE ────────────────────────────────────
export function ZonePlate({ label, color, pos, onEnter }) {
  const meshRef  = useRef();
  const ringRef  = useRef();
  const glowRef  = useRef(); // emissive intensity ref

  // Build label canvas texture once
  const texture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width  = 512;
    canvas.height = 128;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, 512, 128);
    ctx.font         = "bold 38px Orbitron, monospace";
    ctx.textAlign    = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle    = "#fff3e0";
    ctx.fillText(label, 256, 64);
    return new THREE.CanvasTexture(canvas);
  }, [label]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const idx = PLATE_DATA.findIndex((p) => p.label === label);
    
    if (meshRef.current) {
      meshRef.current.position.y = pos[1] + Math.sin(t * 0.8 + idx * 1.2) * 0.18;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z += 0.01;
    }
  });

  const colorHex = "#" + color.toString(16).padStart(6, "0");

  return (
    <group>
      {/* Plate */}
      <mesh ref={meshRef} position={pos} castShadow>
        <boxGeometry args={[2.8, 1.0, 0.12]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.35}
          transparent
          opacity={0.9}
          roughness={0.25}
          metalness={0.5}
        />
      </mesh>

      {/* Label plane */}
      <mesh position={[pos[0], pos[1], pos[2] + 0.07]}>
        <planeGeometry args={[2.8, 1.0]} />
        <meshBasicMaterial map={texture} transparent />
      </mesh>

      {/* Glow ring on floor */}
      <mesh
        ref={ringRef}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[pos[0], 0.02, pos[2]]}
      >
        <ringGeometry args={[1.3, 1.7, 32]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.7}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

// ── PLAYER ────────────────────────────────────────
export function Player({ onProximityChange }) {
  const body = useRef(null);
  const { camera } = useThree();
  const keys = useRef({});

  // Animation refs
  const leftLegRef = useRef(null);
  const rightLegRef = useRef(null);
  const leftArmRef = useRef(null);
  const rightArmRef = useRef(null);
  const bodyMeshRef = useRef(null);

  // Proximity tracking
  const currentProximity = useRef(null);
  const proximityTimer = useRef(null);

  useEffect(() => {
    const down = (e) => { keys.current[e.key] = true; };
    const up = (e) => { keys.current[e.key] = false; };
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
    };
  }, []);

  useFrame(({ clock, delta }) => {
    const bodyApi = body.current;
    if (!bodyApi) return;

    const t = clock.getElapsedTime();
    const input = { x: 0, z: 0 };
    const k = keys.current;

    if (k["ArrowLeft"] || k["a"] || k["A"]) input.x -= 1;
    if (k["ArrowRight"] || k["d"] || k["D"]) input.x += 1;
    if (k["ArrowUp"] || k["w"] || k["W"]) input.z -= 1;
    if (k["ArrowDown"] || k["s"] || k["S"]) input.z += 1;

    const currentVel = bodyApi.linvel();
    const moveSpeed = 4;
    const targetVel = {
      x: input.x * moveSpeed,
      y: currentVel.y,
      z: input.z * moveSpeed,
    };

    bodyApi.setLinvel(targetVel, true);

    const translation = bodyApi.translation();
    const playerX = Math.max(-12, Math.min(12, translation.x));
    const playerZ = Math.max(-12, Math.min(12, translation.z));

    if (playerX !== translation.x || playerZ !== translation.z) {
      bodyApi.setTranslation({ x: playerX, y: translation.y, z: playerZ }, true);
    }

    camera.position.x += (playerX * 0.6 - camera.position.x) * 0.08;
    camera.position.z += (playerZ * 0.6 + 10 - camera.position.z) * 0.08;
    camera.lookAt(playerX, 0, playerZ);

    // --- Walk animation ---
    const isMoving = input.x !== 0 || input.z !== 0;
    const walkSpeed = 8;
    const swing = 0.5;

    if (leftLegRef.current && rightLegRef.current && leftArmRef.current && rightArmRef.current && bodyMeshRef.current) {
      if (isMoving) {
        leftLegRef.current.rotation.x = Math.sin(t * walkSpeed) * swing;
        rightLegRef.current.rotation.x = -Math.sin(t * walkSpeed) * swing;

        leftArmRef.current.rotation.x = -Math.sin(t * walkSpeed) * swing * 0.7;
        rightArmRef.current.rotation.x = Math.sin(t * walkSpeed) * swing * 0.7;

        bodyMeshRef.current.position.y = 0.55 + Math.abs(Math.sin(t * walkSpeed)) * 0.04;
      } else {
        leftLegRef.current.rotation.x = 0;
        rightLegRef.current.rotation.x = 0;
        leftArmRef.current.rotation.x = Math.sin(t * 1.5) * 0.05;
        rightArmRef.current.rotation.x = -Math.sin(t * 1.5) * 0.05;
        bodyMeshRef.current.position.y = 0.55 + Math.sin(t * 1.5) * 0.01;
      }
    }

    let nearest = null;
    let nearestDist = Infinity;

    PLATE_DATA.forEach((pd) => {
      const dx = playerX - pd.pos[0];
      const dz = playerZ - pd.pos[2];
      const dist = Math.sqrt(dx * dx + dz * dz);
      if (dist < nearestDist) { nearestDist = dist; nearest = { pd, dist }; }
    });

    const labelEl = document.getElementById("proximity-label");
    if (labelEl) {
      if (nearest && nearest.dist < 3.2) {
        labelEl.textContent = ` ${nearest.pd.label}`;
        labelEl.style.opacity = "1";

        if (nearest.dist < 1.8 && currentProximity.current !== nearest.pd.page) {
          currentProximity.current = nearest.pd.page;
          clearTimeout(proximityTimer.current);
          const page = nearest.pd.page;
          proximityTimer.current = setTimeout(() => onProximityChange(page), 300);
        }
      } else {
        labelEl.style.opacity = "0";
        if (nearest && nearest.dist >= 1.8) {
          currentProximity.current = null;
          clearTimeout(proximityTimer.current);
        }
      }
    }
  });

  return (
    <RigidBody
      ref={body}
      colliders="ball"
      position={[0, 0.5, 2]}
      restitution={0.2}
      friction={1}
      linearDamping={4}
      angularDamping={1}
      lockRotations
    >
      <group rotation={[0, Math.PI, 0]}>
        {/* Head */}
        <mesh position={[0, 0.95, 0]} castShadow>
          <boxGeometry args={[0.42, 0.42, 0.4]} />
          <meshStandardMaterial color={0xd9a066} roughness={0.6} metalness={0.05} />
        </mesh>

        {/* Hair - back/top cap */}
        <mesh position={[0, 1.12, -0.02]} castShadow>
          <boxGeometry args={[0.46, 0.22, 0.44]} />
          <meshStandardMaterial color={0x0d0d0d} roughness={0.7} metalness={0.05} />
        </mesh>

        {/* Hair - spiky tufts */}
        <mesh position={[-0.1, 1.28, 0.02]} rotation={[0.2, 0, 0.3]} castShadow>
          <coneGeometry args={[0.07, 0.22, 4]} />
          <meshStandardMaterial color={0x0d0d0d} roughness={0.7} />
        </mesh>
        <mesh position={[0.08, 1.3, -0.05]} rotation={[-0.1, 0, -0.25]} castShadow>
          <coneGeometry args={[0.07, 0.24, 4]} />
          <meshStandardMaterial color={0x0d0d0d} roughness={0.7} />
        </mesh>
        <mesh position={[0.2, 1.22, 0.08]} rotation={[0.3, 0.2, -0.4]} castShadow>
          <coneGeometry args={[0.06, 0.18, 4]} />
          <meshStandardMaterial color={0x0d0d0d} roughness={0.7} />
        </mesh>

        {/* Eyebrow accent */}
        <mesh position={[0.1, 0.98, 0.21]}>
          <boxGeometry args={[0.08, 0.03, 0.02]} />
          <meshStandardMaterial color={0x4a2e1e} />
        </mesh>

        {/* Torso / Jacket - wrapped in bodyMeshRef for bob animation */}
        <group ref={bodyMeshRef} position={[0, 0.55, 0]}>
          <mesh castShadow>
            <boxGeometry args={[0.5, 0.55, 0.32]} />
            <meshStandardMaterial color={0x2255aa} roughness={0.45} metalness={0.15} />
          </mesh>
          {/* Collar */}
          <mesh position={[0, 0.27, 0]} castShadow>
            <boxGeometry args={[0.46, 0.08, 0.34]} />
            <meshStandardMaterial color={0x1c468c} roughness={0.45} />
          </mesh>
        </group>

        {/* Left arm group - pivot at shoulder */}
        <group ref={leftArmRef} position={[-0.32, 0.78, 0]}>
          <mesh position={[0, -0.23, 0]} castShadow>
            <boxGeometry args={[0.16, 0.5, 0.18]} />
            <meshStandardMaterial color={0x2255aa} roughness={0.45} metalness={0.15} />
          </mesh>
          <mesh position={[0, -0.46, 0]} castShadow>
            <boxGeometry args={[0.18, 0.08, 0.2]} />
            <meshStandardMaterial color={0x111111} roughness={0.5} />
          </mesh>
          <mesh position={[0, -0.56, 0]} castShadow>
            <boxGeometry args={[0.14, 0.12, 0.14]} />
            <meshStandardMaterial color={0xd9a066} roughness={0.6} />
          </mesh>
        </group>

        {/* Right arm group - pivot at shoulder */}
        <group ref={rightArmRef} position={[0.32, 0.78, 0]}>
          <mesh position={[0, -0.23, 0]} castShadow>
            <boxGeometry args={[0.16, 0.5, 0.18]} />
            <meshStandardMaterial color={0x2255aa} roughness={0.45} metalness={0.15} />
          </mesh>
          <mesh position={[0, -0.46, 0]} castShadow>
            <boxGeometry args={[0.18, 0.08, 0.2]} />
            <meshStandardMaterial color={0x111111} roughness={0.5} />
          </mesh>
          <mesh position={[0, -0.56, 0]} castShadow>
            <boxGeometry args={[0.14, 0.12, 0.14]} />
            <meshStandardMaterial color={0xd9a066} roughness={0.6} />
          </mesh>
        </group>

        {/* Left leg group - pivot at hip */}
        <group ref={leftLegRef} position={[-0.13, 0.28, 0]}>
          <mesh position={[0, -0.28, 0]} castShadow>
            <boxGeometry args={[0.2, 0.55, 0.22]} />
            <meshStandardMaterial color={0x0d0d0d} roughness={0.6} />
          </mesh>
          <mesh position={[0, -0.58, 0.04]} castShadow>
            <boxGeometry args={[0.22, 0.14, 0.3]} />
            <meshStandardMaterial color={0x3a2a1a} roughness={0.6} />
          </mesh>
        </group>

        {/* Right leg group - pivot at hip */}
        <group ref={rightLegRef} position={[0.13, 0.28, 0]}>
          <mesh position={[0, -0.28, 0]} castShadow>
            <boxGeometry args={[0.2, 0.55, 0.22]} />
            <meshStandardMaterial color={0x0d0d0d} roughness={0.6} />
          </mesh>
          <mesh position={[0, -0.58, 0.04]} castShadow>
            <boxGeometry args={[0.22, 0.14, 0.3]} />
            <meshStandardMaterial color={0x3a2a1a} roughness={0.6} />
          </mesh>
        </group>
      </group>
    </RigidBody>
  );
}

// ── LOBBY ─────────────────────────────────────────
function Lobby({ onEnterZone }) {
  return (
    <Canvas
      id="lobby"
      shadows
      style={{ width: "100%", height: "100vh", display: "block" }}
      camera={{ fov: 60, near: 0.1, far: 100, position: [0, 6, 10] }}
      gl={{ antialias: true, alpha: true }}
      onCreated={({ gl }) => {
        gl.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        gl.shadowMap.enabled = true;
      }}
    >
      <Physics>
      <Scene onEnterZone={onEnterZone} />
      </Physics>
    </Canvas>
  );
}

// Need to import a toast remove this later
// ── TOAST ─────────────────────────────────────────
function Toast({ message }) {
  return (
    <div id="response-toast" style={{ opacity: message ? 1 : 0 }}>
      {message}
    </div>
  );
}

// ── ROOT ──────────────────────────────────────────
export default function DebateVerse() {
  const { user } = useAuth();
  const [activePage,  setActivePage]  = useState(null);
  const [toast,       setToast]       = useState("");
  const toastTimer = useRef(null);
  const navigate = useNavigate();
  const { logout } = useAuth();

  const showToast = useCallback((msg) => {
    setToast(msg);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(""), 3000);
  }, []);

  const handleEnterZone = (page) => {
    if (page === "htp") { setActivePage("htp"); return;}
    navigate('/'+ page);  
  };

  const handleBack = () => {
    setActivePage(null);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <>
      {/* R3F Canvas replaces the old imperative <div ref={mountRef}> */}
      <Lobby onEnterZone={handleEnterZone} />

      <div id="lobby-ui">
        <div id="game-title">Argue Arena</div>
        <div id="hint">MOVE TO ENTER A ZONE</div>
        <button
          type="button"
          className="lobby-action-btn"
          onClick={handleLogout}
          style={{ position: 'absolute', top: '1rem', right: '1rem', zIndex: 10 }}
        >
          Logout
        </button>
      </div>
      <div id="proximity-label" />
      <div id="move-hint">WASD / ARROW KEYS TO MOVE</div>

      {/* {activePage === "achievements" && <AchievementsPage onBack={handleBack} />} */}
      {activePage === "htp"          && <HTPModal onClose={handleBack} />}
      {activePage === "story"        && <StoryModeModal onClose={handleBack} />}

      <Toast message={toast} />
    </>
  );
}