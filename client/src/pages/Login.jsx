import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuthCanvas from '../hooks/useAuthCanvas';
import useToast from '../hooks/useToast';
import '../styles/auth-arcade.css';
import { login as loginAPI } from '../serviceLayer/authService';
import { useAuth } from '../context/authContext';


export default function Login() {
  const navigate = useNavigate();
  const canvasRef = useAuthCanvas('0,240,255');
  const { toast, showToast } = useToast();
  const { login } = useAuth();

  const [form, setForm]   = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
    setErrors(err => ({ ...err, [name]: '' }));
  }

  function validate() {
    const errs = {};
    if (!form.email)
      errs.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      errs.email = 'Invalid email format';
    if (!form.password)
      errs.password = 'Password is required';
    return errs;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }

    setLoading(true);
    try {
      const res  = await loginAPI(form);
      const data = res.data 
        login(data.access_token,data.user);
        showToast('ACCESS GRANTED — WELCOME BACK', 'success');
        setTimeout(() => navigate('/lobby'), 1300);

    } catch (err) {
      showToast(err.message || 'Login failed', 'error');
        if (err.message?.toLowerCase().includes('verify'))
          setErrors({ email: 'Verify your email first — check inbox' });
        else if (err.message?.toLowerCase().includes('password'))
          setErrors({ password: 'Invalid password' });
        else if (err.message?.toLowerCase().includes('not found'))
          setErrors({ email: 'No account found with this email' });
        console.log(err.message);
    } finally {
      setLoading(false);
    }
  }

  function handleForgot(e) {
    e.preventDefault();
    if (!form.email) { setErrors({ email: 'Enter your email first' }); return; }
    showToast('RESET LINK DISPATCHED TO ' + form.email.toUpperCase(), 'success');
  }

  return (
    <>
      <canvas ref={canvasRef} className="auth-canvas" />

      <div className="auth-page">
        <div className="auth-inner">

          <div className="glitch-title">ARGUEARENA</div>
          <div className="game-tagline">[ where arguments become battles ]</div>

          <div className="coin-insert">
            <div className="player-select">PLAYER LOGIN</div>
          </div>

          <div className="auth-card">
            <div className="scan-bar" />
            <h2 className="card-title">ENTER THE ARENA</h2>
            <p className="card-sub">Your rank awaits. Login to continue your streak.</p>

            <form onSubmit={handleSubmit} noValidate>

              <div className="field">
                <label className="field-label" htmlFor="email">email</label>
                <div className="field-wrap">
                  <input
                    className={`field-input${errors.email ? ' has-error' : ''}`}
                    type="email" id="email" name="email"
                    placeholder="player@arena.com"
                    autoComplete="email"
                    value={form.email}
                    onChange={handleChange}
                  />
                  <span className="field-icon">✉</span>
                </div>
                <div className="field-error">{errors.email}</div>
              </div>

              <div className="field">
                <label className="field-label" htmlFor="password">password</label>
                <div className="field-wrap password-field">
                  <input
                    className={`field-input${errors.password ? ' has-error' : ''}`}
                    type={showPassword ? 'text' : 'password'} id="password" name="password"
                    placeholder="••••••••"
                    autoComplete="current-password"
                    value={form.password}
                    onChange={handleChange}
                  />
                  <span className="field-icon">🔒</span>
                  <button
                    type="button"
                    className="password-toggle"
                    aria-label={showPassword ? 'Hide password' : 'View password'}
                    onClick={() => setShowPassword(value => !value)}
                  >
                    {showPassword ? 'HIDE' : 'VIEW'}
                  </button>
                </div>
                <div className="field-error">{errors.password}</div>
              </div>

              <div className="forgot-row">
                <button className="ghost-link" onClick={handleForgot}>
                  forgot password?
                </button>
              </div>

              <button type="submit" className="submit-btn" disabled={loading}>
                {loading ? <><span className="spinner" />ENTERING ARENA...</> : '▶  LOGIN TO ARENA'}
              </button>

            </form>

            <div className="divider">
              <div className="divider-line" />
              <div className="divider-text">NEW CHALLENGER</div>
              <div className="divider-line" />
            </div>

            <div style={{ textAlign: 'center' }}>
              <Link to="/register" className="nav-link">CREATE ACCOUNT →</Link>
            </div>
          </div>

        </div>
      </div>

      <div className={`toast${toast.show ? ' show' : ''} ${toast.type}`}>
        {toast.msg}
      </div>
    </>
  );
}