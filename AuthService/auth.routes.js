import express from 'express';
import { Register, Login, verifyEmail } from './auth.service.js';

const router = express.Router();

// POST /api/auth/register
router.post('/register', Register);

// POST /api/auth/login
router.post('/login', Login);

// GET /api/auth/verify/:token
router.get('/verify/:token', verifyEmail);

export default router;
