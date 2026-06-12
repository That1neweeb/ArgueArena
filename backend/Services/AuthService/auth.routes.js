import express from 'express';
import {Register,Login} from './auth.service.js'

const router = express.Router();

router.post('/post',Register);
router.post('/post',Login);

export default router;