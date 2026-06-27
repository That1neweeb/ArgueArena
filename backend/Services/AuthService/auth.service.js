import { User } from "../../Models/user.model.js";
import bcrypt from 'bcrypt';
import { generateToken } from "./jwt.utils.js";

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
    });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    const hash_password = await passwordHash(password);

    const newUser = await User.create({
        email,
        Username: username,
        password: hash_password,
    });
    const token = generateToken(newUser);

    return res.status(200).json({
        message: 'User registration successful',
        user: { id: newUser.id, username: newUser.Username },
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

    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const storedPassword = user.password;
    const isMatch = await bcrypt.compare(password, storedPassword);
    if (!isMatch) return res.status(400).json({ message: 'Invalid password' });

    const access_token = generateToken(user);
    return res.status(200).json({
        access_token,
        user: { id: user.id, username: user.Username },
        message: 'Login Successful',
    });
}


    
// hashpassword function
const passwordHash = async (password) => {
    const saltRounds = 10;
    const hashed_password = await bcrypt.hash(password, saltRounds);
    return hashed_password
}