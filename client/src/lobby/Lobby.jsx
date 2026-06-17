/**
 * DebateVerse — React Three Fiber conversion
 *
 * Dependencies (add to your project):
 *   npm install three @react-three/fiber @react-three/drei
 *
 * The original used vanilla Three.js imperative style inside a useEffect.
 * This version replaces all of that with declarative R3F JSX while keeping
 * every piece of game / UI logic identical.
 */

import { useEffect, useRef, useState, useCallback, useMemo } from "react";
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

const PLATE_DATA = [
  { label: "STORY MODE",   color: 0xe85d04, pos: [-5, 1.2, -3], page: "story" },
  { label: "DAILY DEBATE", color: 0xff9a3c, pos: [5,  1.2, -3],  page: "daily" },
  { label: "ACHIEVEMENTS", color: 0xffcb77, pos: [-5,  1.2, 4],  page: "achievements" },
  { label: "HOW TO PLAY",  color: 0xcc6600, pos: [5,  1.2,  4],  page: "htp" },
];

// ── PARTICLES ─────────────────────────────────────
function EmberParticles() {
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
function ZonePlate({ label, color, pos, onEnter }) {
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
        <ringGeometry args={[0.5, 0.7, 32]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.28}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

// ── PLAYER ────────────────────────────────────────
function Player({ onProximityChange }) {
  const meshRef = useRef();
  const { camera } = useThree();

  const vel   = useRef({ x: 0, z: 0 });
  const pos   = useRef({ x: 0, z: 2 });
  const keys  = useRef({});

  // Proximity tracking
  const currentProximity = useRef(null);
  const proximityTimer   = useRef(null);

  useEffect(() => {
    const down = (e) => { keys.current[e.key] = true; };
    const up   = (e) => { keys.current[e.key] = false; };
    window.addEventListener("keydown", down);
    window.addEventListener("keyup",   up);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup",   up);
    };
  }, []);

  useFrame(({ clock }) => {
    const t     = clock.getElapsedTime();
    const speed = 0.05;
    const k     = keys.current;

    if (k["ArrowLeft"]  || k["a"] || k["A"]) vel.current.x -= speed;
    if (k["ArrowRight"] || k["d"] || k["D"]) vel.current.x += speed;
    if (k["ArrowUp"]    || k["w"] || k["W"]) vel.current.z -= speed;
    if (k["ArrowDown"]  || k["s"] || k["S"]) vel.current.z += speed;

    vel.current.x *= 0.4;
    vel.current.z *= 0.4;

    pos.current.x = Math.max(-12, Math.min(12, pos.current.x + vel.current.x));
    pos.current.z = Math.max(-12, Math.min(12, pos.current.z + vel.current.z));

    if (meshRef.current) {
      meshRef.current.position.x  = pos.current.x;
      meshRef.current.position.z  = pos.current.z;
      meshRef.current.position.y  = 0.5 + Math.sin(t * 1.5) * 0.05;
      meshRef.current.rotation.y += 0.015;
    }

    // Smooth camera follow
    camera.position.x += (pos.current.x * 0.6 - camera.position.x) * 0.08;
    camera.position.z += (pos.current.z * 0.6 + 10 - camera.position.z) * 0.08;
    camera.lookAt(pos.current.x, 0, pos.current.z);

    // Proximity detection
    let nearest = null;
    let nearestDist = Infinity;

    PLATE_DATA.forEach((pd) => {
      const dx   = pos.current.x - pd.pos[0];
      const dz   = pos.current.z - pd.pos[2];
      const dist = Math.sqrt(dx * dx + dz * dz);
      if (dist < nearestDist) { nearestDist = dist; nearest = { pd, dist }; }
    });

    const labelEl = document.getElementById("proximity-label");
    if (labelEl) {
      if (nearest && nearest.dist < 3.2) {
        labelEl.textContent   = `ENTER: ${nearest.pd.label}`;
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
    <mesh ref={meshRef} position={[0, 0.5, 2]} castShadow>
      <boxGeometry args={[0.7, 0.7, 0.7]} />
      <meshStandardMaterial
        color={0xfff3e0}
        emissive={0xe85d04}
        emissiveIntensity={0.7}
        roughness={0.25}
        metalness={0.7}
      />
    </mesh>
  );
}

// ── SCENE ─────────────────────────────────────────
function Scene({ onEnterZone }) {
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
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[30, 30]} />
        <meshStandardMaterial color={0x10AD08} roughness={0.95} metalness={0.05} />
      </mesh>

      {/* Grid */}
      <gridHelper args={[30, 30, 0xe85d0422, 0xff9a3c11]} />

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

      {/* Particles */}
      <EmberParticles />

      {/* Player (handles its own movement + camera + proximity) */}
      <Player onProximityChange={onEnterZone} />
    </>
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
      <Scene onEnterZone={onEnterZone} />
    </Canvas>
  );
}


// ── HTP MODAL ─────────────────────────────────────
function HTPModal({ onClose }) {
  return (
    <div id="htp-modal" className="active">
      <div className="htp-card">
        <button className="modal-close" onClick={onClose}>✕</button>
        <div className="htp-title">HOW TO PLAY</div>
        <div className="htp-section">
          <h3>Getting Started</h3>
          <p>Use WASD or Arrow Keys to move your glowing cube around the lobby. Walk toward any zone plate to automatically enter that area. Back out at any time with the Back button.</p>
        </div>
        <div className="htp-divider" />
        <div className="htp-section">
          <h3>Story Mode</h3>
          <p>Face off against AI opponents across escalating debate stages. Each stage presents a topic and three argument options — choose wisely. Your opponent responds dynamically to challenge your position.</p>
        </div>
        <div className="htp-divider" />
        <div className="htp-section">
          <h3>Daily Debate</h3>
          <p>A new debate topic is generated every day. Pick a side — For or Against — and practice constructing your argument. Every day is a fresh chance to sharpen your reasoning.</p>
        </div>
        <div className="htp-divider" />
        <div className="htp-section">
          <h3>Scoring & Winning</h3>
          <p>Strong arguments earn crowd favor. Consecutive good picks unlock streak bonuses and push you toward achievements. Unlock later stages by clearing earlier ones.</p>
        </div>
        <div className="htp-divider" />
        <div className="htp-section">
          <h3>Controls</h3>
          <p>
            <strong style={{ color: "var(--amber)" }}>WASD / Arrow Keys</strong> — Move your cube in the lobby<br />
            <strong style={{ color: "var(--amber)" }}>Approach a zone</strong> — Automatically enter when close enough<br />
            <strong style={{ color: "var(--amber)" }}>Back button</strong> — Return to lobby
          </p>
        </div>
      </div>
    </div>
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
  const [activePage,  setActivePage]  = useState(null);
  const [toast,       setToast]       = useState("");
  const toastTimer = useRef(null);

  const showToast = useCallback((msg) => {
    setToast(msg);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(""), 3000);
  }, []);

  const handleEnterZone = useCallback((page) => setActivePage(page), []);

  const handleBack = () => {
    setActivePage(null);
  };

  return (
    <>
      {/* R3F Canvas replaces the old imperative <div ref={mountRef}> */}
      <Lobby onEnterZone={handleEnterZone} />

      <div id="lobby-ui">
        <div id="game-title">Argue Arena</div>
        <div id="hint">MOVE TO ENTER A ZONE</div>
      </div>
      <div id="proximity-label" />
      <div id="move-hint">WASD / ARROW KEYS TO MOVE</div>

      {/* {activePage === "achievements" && <AchievementsPage onBack={handleBack} />} */}
      {activePage === "htp"          && <HTPModal onClose={handleBack} />}

      <Toast message={toast} />
    </>
  );
}