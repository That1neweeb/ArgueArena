import express from 'express';
import { Register, Login } from './auth.service.js';
import { verifyToken } from './auth.middleware.js';

const router = express.Router();

router.post('/register', Register);
router.post('/login', Login);
router.get('/me',verifyToken,(req,res) => {
    res.status(200).json({
        user:req.user
    })
});

export default router;