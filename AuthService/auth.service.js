import bcrypt from 'bcrypt';
import crypto from 'crypto';
import pkg from 'pg';
const { Pool } = pkg;
import { generateToken } from './jwt.utils.js';
import { sendVerificationEmail } from './email.service.js';

// ── DB POOL ────────────────────────────────────────────
// Uses same postgres config as config/db.js but via pg Pool
// (Sequelize is kept in db.js for other models — this uses raw pg)
const pool = new Pool({
    host:     process.env.PG_HOST     || 'localhost',
    user:     process.env.PG_USER     || 'postgres',
    password: process.env.PG_PASSWORD || '1234',
    database: process.env.PG_DATABASE || 'ArgueArena',
    port:     process.env.PG_PORT     || 5432,
});

// ── HASH PASSWORD ──────────────────────────────────────
const passwordHash = async (password) => {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
};

// ══════════════════════════════════════════════════════
//  REGISTER
// ══════════════════════════════════════════════════════
export async function Register(req, res) {
    const { username, email, password, c_password } = req.body;

    // ── Field checks ──
    if (!username)
        return res.status(400).json({ message: 'Username field is empty' });
    if (!email)
        return res.status(400).json({ message: 'Email field is empty' });

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email))
        return res.status(400).json({ message: 'Invalid email format' });

    if (!password || password.trim() === '')
        return res.status(400).json({ message: 'Password is required' });
    if (!c_password || c_password.trim() === '')
        return res.status(400).json({ message: 'Confirm Password is required' });

    if (password !== c_password)
        return res.status(400).json({ message: 'Password does not match' });

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
    if (!passwordRegex.test(password))
        return res.status(400).json({
            message: 'Password must be 8+ chars, include uppercase, lowercase, number & special char'
        });

    try {
        // ── Check existing user ──
        const existing = await pool.query(
            'SELECT id FROM players WHERE email = $1', [email]
        );
        if (existing.rows.length > 0)
            return res.status(400).json({ message: 'User already exists' });

        // ── Hash password ──
        const hash_password = await passwordHash(password);

        // ── Verification token ──
        const verifyToken  = crypto.randomBytes(32).toString('hex');
        const tokenExpiry  = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24h

        // ── Insert player ──
        const result = await pool.query(
            `INSERT INTO players 
             (username, email, password, xp, rank, influence, streak, is_verified, verify_token, verify_token_expiry)
             VALUES ($1, $2, $3, 0, 'Citizen', 100, 0, false, $4, $5)
             RETURNING id, username, email`,
            [username, email, hash_password, verifyToken, tokenExpiry]
        );

        const newUser = result.rows[0];

        // ── Send verification email ──
        await sendVerificationEmail(email, username, verifyToken);

        return res.status(200).json({
            message: 'Registration successful. Check your email to verify your account.',
            user: { id: newUser.id }
            // No token yet — only after email verification
        });

    } catch (error) {
        console.error('Register error:', error);
        return res.status(500).json({ message: 'Server error during registration' });
    }
}

// ══════════════════════════════════════════════════════
//  VERIFY EMAIL
// ══════════════════════════════════════════════════════
export async function verifyEmail(req, res) {
    const { token } = req.params;

    try {
        const result = await pool.query(
            'SELECT * FROM players WHERE verify_token = $1', [token]
        );

        if (result.rows.length === 0)
            return res.status(400).json({ message: 'Invalid or expired verification link' });

        const user = result.rows[0];

        if (new Date() > new Date(user.verify_token_expiry))
            return res.status(400).json({ message: 'Token expired. Please register again.' });

        await pool.query(
            `UPDATE players 
             SET is_verified = true, verify_token = null, verify_token_expiry = null 
             WHERE id = $1`,
            [user.id]
        );

        // Redirect to frontend verified page
        return res.redirect(`${process.env.CLIENT_URL}/verified.html`);

    } catch (error) {
        console.error('Verify error:', error);
        return res.status(500).json({ message: 'Server error during verification' });
    }
}

// ══════════════════════════════════════════════════════
//  LOGIN
// ══════════════════════════════════════════════════════
export async function Login(req, res) {
    const { email, password } = req.body;

    if (!email)    return res.status(400).json({ message: 'Email is required' });
    if (!password) return res.status(400).json({ message: 'Password is required' });

    try {
        const result = await pool.query(
            'SELECT * FROM players WHERE email = $1', [email]
        );

        if (result.rows.length === 0)
            return res.status(400).json({ message: 'No account found with this email' });

        const user = result.rows[0];

        // ── Check verified ──
        if (!user.is_verified)
            return res.status(403).json({
                message: 'Please verify your email before logging in'
            });

        // ── Check password ──
        const match = await bcrypt.compare(password, user.password);
        if (!match)
            return res.status(400).json({ message: 'Incorrect password' });

        // ── Generate token ──
        const token = generateToken(user);

        return res.status(200).json({
            message: 'Login successful',
            token,
            user: {
                id:       user.id,
                username: user.username,
                email:    user.email,
                rank:     user.rank,
                xp:       user.xp,
                streak:   user.streak
            }
        });

    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({ message: 'Server error during login' });
    }
}
