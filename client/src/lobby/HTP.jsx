// ── HTP MODAL ─────────────────────────────────────
export default function HTPModal({ onClose }) {
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
