import { useState } from 'react';
import { Link } from 'react-router-dom';
import useAuthCanvas from '../hooks/useAuthCanvas';
import useToast from '../hooks/useToast';
import '../styles/auth-arcade.css';

const STRENGTH_COLORS = ['#ff2244','#ff6a00','#00f0ff','#00ff88'];
const STRENGTH_LABELS = [
  'WEAK — add uppercase/numbers',
  'FAIR — add a special char',
  'GOOD — almost there',
  'STRONG ✓'
];

function getStrength(val) {
  let score = 0;
  if (val.length >= 8)        score++;
  if (/[A-Z]/.test(val))      score++;
  if (/[0-9]/.test(val))      score++;
  if (/[@$!%*?&#]/.test(val)) score++;
  return {
    score,
    color: val.length > 0 ? STRENGTH_COLORS[score - 1] || STRENGTH_COLORS[0] : null,
    label: val.length > 0 ? STRENGTH_LABELS[score - 1] || '' : '',
  };
}

export default function Register() {
  const canvasRef = useAuthCanvas('180,0,255');
  const { toast, showToast } = useToast();

  const [form, setForm] = useState({
    username: '', email: '', password: '', cpassword: '', terms: false,
  });
  const [errors, setErrors]   = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const strength = getStrength(form.password);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
    setErrors(err => ({ ...err, [name]: '' }));
  }

  function validate() {
    const errs = {};
    const pwRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;

    if (!form.username || form.username.length < 3)
      errs.username = 'Username must be at least 3 characters';
    if (!form.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      errs.email = 'Enter a valid email address';
    if (!pwRegex.test(form.password))
      errs.password = 'Must be 8+ chars with uppercase, number & special char';
    if (form.password !== form.cpassword)
      errs.cpassword = 'Passwords do not match';
    if (!form.terms)
      errs.terms = 'Accept the arena rules to continue';

    return errs;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }

    setLoading(true);
    try {
      const res = await fetch('/api/auth/register', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({
          username:  form.username,
          email:     form.email,
          password:  form.password,
          cpassword: form.cpassword,  // ✅ fixed
        }),
      });
      const data = await res.json();

      if (!res.ok) {
        showToast(data.message || 'Registration failed', 'error');
        if (data.message?.toLowerCase().includes('exists'))
          setErrors({ email: 'This email is already registered' });
      } else {
        setSuccess(true);
      }
    } catch (err) {
      showToast('CONNECTION ERROR — TRY AGAIN', 'error');
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <canvas ref={canvasRef} className="auth-canvas" />

      <div className="auth-page">
        <div className="auth-inner">

          <div className="glitch-title">ARGUEARENA</div>
          <div className="game-tagline">[ new challenger approaching ]</div>

          <div className="auth-card">
            <div className="scan-bar" />

            {!success ? (
              <>
                <div className="card-eyebrow">new challenger</div>
                <h2 className="card-title">JOIN THE ARENA</h2>
                <p className="card-sub">Start as CITIZEN. Rise to PRIME MINISTER.</p>

                <form onSubmit={handleSubmit} noValidate>

                  <div className="field">
                    <label className="field-label" htmlFor="username">username</label>
                    <div className="field-wrap">
                      <input
                        className={`field-input${errors.username ? ' has-error' : ''}`}
                        type="text" id="username" name="username"
                        placeholder="DebaterX_42"
                        autoComplete="username" maxLength={24}
                        value={form.username} onChange={handleChange}
                      />
                      <span className="field-icon">⚡</span>
                    </div>
                    <div className="field-error">{errors.username}</div>
                  </div>

                  <div className="field">
                    <label className="field-label" htmlFor="email">email</label>
                    <div className="field-wrap">
                      <input
                        className={`field-input${errors.email ? ' has-error' : ''}`}
                        type="email" id="email" name="email"
                        placeholder="player@arena.com"
                        autoComplete="email"
                        value={form.email} onChange={handleChange}
                      />
                      <span className="field-icon">✉</span>
                    </div>
                    <div className="field-error">{errors.email}</div>
                  </div>

                  <div className="field">
                    <label className="field-label" htmlFor="password">password</label>
                    <div className="field-wrap">
                      <input
                        className={`field-input${errors.password ? ' has-error' : ''}`}
                        type="password" id="password" name="password"
                        placeholder="min 8 chars"
                        autoComplete="new-password"
                        value={form.password} onChange={handleChange}
                      />
                      <span className="field-icon">🔒</span>
                    </div>
                    <div className="strength-bar">
                      {[1,2,3,4].map(i => (
                        <div
                          key={i}
                          className="strength-seg"
                          style={{
                            background: i <= strength.score && strength.color
                              ? strength.color
                              : 'rgba(255,255,255,0.07)'
                          }}
                        />
                      ))}
                    </div>
                    <div className="strength-label" style={{ color: strength.color || 'var(--muted)' }}>
                      {strength.label}
                    </div>
                    <div className="field-error">{errors.password}</div>
                  </div>

                  <div className="field">
                    <label className="field-label" htmlFor="cpassword">confirm password</label>
                    <div className="field-wrap">
                      <input
                        className={`field-input${errors.cpassword ? ' has-error' : ''}`}
                        type="password" id="cpassword" name="cpassword"
                        placeholder="repeat password"
                        autoComplete="new-password"
                        value={form.cpassword} onChange={handleChange}
                      />
                      <span className="field-icon">🔒</span>
                    </div>
                    <div className="field-error">{errors.cpassword}</div>
                  </div>

                  <div className="terms-row">
                    <input
                      type="checkbox" className="terms-check"
                      id="terms" name="terms"
                      checked={form.terms} onChange={handleChange}
                    />
                    <label className="terms-text" htmlFor="terms">
                      I accept the <a href="#">Arena Rules</a> and <a href="#">Privacy Policy</a>
                    </label>
                  </div>
                  <div className="field-error" style={{ marginBottom: '10px' }}>
                    {errors.terms}
                  </div>

                  <button type="submit" className="submit-btn magenta-btn" disabled={loading}>
                    {loading
                      ? <><span className="spinner" />CREATING ACCOUNT...</>
                      : '▶  CREATE ACCOUNT'}
                  </button>

                </form>

                <div className="divider">
                  <div className="divider-line" />
                  <div className="divider-text">ALREADY A DEBATER</div>
                  <div className="divider-line" />
                </div>

                <div style={{ textAlign: 'center' }}>
                  <Link to="/login" className="nav-link">LOGIN TO ACCOUNT →</Link>
                </div>
              </>
            ) : (
              <div className="success-state">
                <div className="success-icon">✉️</div>
                <div className="success-title">TRANSMISSION SENT</div>
                <p className="success-msg">
                  Verification link dispatched to<br />
                  <strong>{form.email}</strong><br /><br />
                  Click the link in your inbox to activate your account.
                </p>
                <Link to="/login" className="submit-btn" style={{ display:'inline-block',textAlign:'center',textDecoration:'none',padding:'12px 28px' }}>
                  GO TO LOGIN →
                </Link>
              </div>
            )}

          </div>
        </div>
      </div>

      <div className={`toast${toast.show ? ' show' : ''} ${toast.type}`}>
        {toast.msg}
      </div>
    </>
  );
}