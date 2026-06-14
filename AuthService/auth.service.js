import User from '../models/user.model.js';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import { generateToken } from './jwt.utils.js';
import { sendVerificationEmail } from './email.service.js';



export async function Register(req,res){
    const { username, email, password, cpassword } = req.body;

    if (!username) return res.status(400).json({ message: 'Username field is empty' });
    if (!email) return res.status(400).json({ message: 'Email field is empty' });

    // email validation 
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: 'Invalid email format' });
    }

    if (!password || password.trim() === '') return res.status(400).json({ message: 'Password is required' });
    if (!cpassword || cpassword.trim() === '') return res.status(400).json({ message: 'Confirm Password is required' });

    if (password !== cpassword) {
        return res.status(400).json({ message: 'Password does not match' });
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
    if (!passwordRegex.test(password)) {
        return res.status(400).json({
            message: 'Password must be 8+ chars, include uppercase, lowercase, number & special char',
        });
    }

    const existingUser = await User.findOne({
        where: { email },
    }).catch(err => { console.error('DB error:', err.message); return null; });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    const hash_password = await passwordHash(password);

    const newUser = await User.create({
        email,
        username,
        password: hash_password,
        verify_token: crypto.randomBytes(32).toString('hex'),
        verify_token_expiry: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
    });

    await sendVerificationEmail(newUser.email, newUser.verify_token);
    const token = generateToken(newUser);

    return res.status(200).json({
        message: 'User registration successful',
        user: { id: newUser.id },
        token,
    });
}

export async function Login(req,res){
    const { email, password } = req.body;
    if (!email) return res.status(400).json({ message: 'Email field is empty' });

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: 'Invalid email format' });
    }

    if (!password || password.trim() === '') return res.status(400).json({ message: 'Password is required' });
    
     const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
        if (!passwordRegex.test(password)) {
            console.log(password);
            return res.status(400).json({ 
                message: "Password must be 8+ chars, include uppercase, lowercase, number & special char" 
            });
        }


    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: 'User not found' });
    if (!user.is_verified) return res.status(403).json({ message: 'Email not verified. Please check your inbox.' });
    const storedPassword = user.password;
    const isMatch = await bcrypt.compare(password, storedPassword);
    if (!isMatch) return res.status(400).json({ message: 'Invalid password' });

    const access_token = generateToken(user);

    return res.status(200).json({
        access_token,
        user: { id: user.id, username: user.username },
        message: 'Login Successful',
    });
}


    
// hashpassword function
const passwordHash = async (password) => {
    const saltRounds = 10;
    const hashed_password = await bcrypt.hash(password, saltRounds);
    return hashed_password
}
// VERIFY EMAIL
export async function verifyEmail(req, res) {
    const { token } = req.params;

    try {
        const user = await User.findOne({ where: { verify_token: token } });

        if (!user)
            return res.status(400).json({ message: 'Invalid or expired verification link' });

        if (new Date() > new Date(user.verify_token_expiry))
            return res.status(400).json({ message: 'Token expired. Please register again.' });

        await user.update({
            is_verified: true,
            verify_token: null,
            verify_token_expiry: null,
        });

        return res.redirect(`${process.env.CLIENT_URL}/verified.html`);

    } catch (error) {
        console.error('Verify error:', error);
        return res.status(500).json({ message: 'Server error during verification' });
    }
}