import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import useAuthCanvas from '../hooks/useAuthCanvas';
import '../styles/auth-arcade.css';

export default function Verified() {
  const canvasRef = useAuthCanvas('0,240,255');

  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.href = '/login';
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <canvas ref={canvasRef} className="auth-canvas" />

      <div className="auth-page">
        <div className="auth-inner">

          <div className="glitch-title">ARGUEARENA</div>
          <div className="game-tagline">[ identity confirmed ]</div>

          <div className="auth-card" style={{ textAlign: 'center' }}>
            <div className="scan-bar" />
            <div className="success-state" style={{ padding: '8px 0 12px' }}>
              <div className="success-icon">⚔️</div>
              <div className="success-title">IDENTITY CONFIRMED</div>
              <p className="success-msg">
                Your account is now active.<br />
                Welcome to the arena, Challenger.<br /><br />
                <span style={{ color:'rgba(0,240,255,0.45)', fontSize:'0.68rem' }}>
                  RANK: CITIZEN &nbsp;|&nbsp; XP: 0 &nbsp;|&nbsp; STREAK: 0
                </span>
              </p>
              <Link
                to="/login"
                className="submit-btn"
                style={{ display:'inline-block', textAlign:'center', textDecoration:'none', padding:'12px 28px' }}
              >
                ▶ &nbsp; ENTER ARENA
              </Link>
              <p style={{ marginTop:'14px', fontFamily:'Share Tech Mono,monospace', fontSize:'0.58rem', color:'rgba(255,255,255,0.2)', letterSpacing:'0.15em' }}>
                auto-redirecting in 4s...
              </p>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
