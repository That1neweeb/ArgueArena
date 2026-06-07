import { User } from "../Models/user.model";
import bcrypt from 'bcrypt';
import { generateToken } from "./jwt.utils";

export default async function Register(req,res){
    const { username, email, password, cpassword} = req.body;

    if (!username) return res.status(400).json({message:'Username field is empty'})
    if (!email) return res.status(400).json({message:'email field is empty'})

// email format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
        return res.status(400).json({ message: "Invalid email format" });
        }

        if (!password || password.trim() === "") return res.status(400).json({message:"Password is required"});
        if(!c_password || c_password.trim() === "") return res.status(400).json({message: "Confirm Password is required"});
    

        // password and confirm password matching validation
        if (password !== c_password) {
            return res.status(400).json({ message: "Password does not match" });
        }

        //password length and contains upper lower special character and number validation 
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
        if (!passwordRegex.test(password)) {
            console.log(password);
            return res.status(400).json({ 
                message: "Password must be 8+ chars, include uppercase, lowercase, number & special char" 
            });
        }
        
        const existingUser = await User.findOne({
            where:{email}
        })
        if(existingUser) return res.status(400).json({message:'User already exists'});

        // hash password
        const hash_password = await password(password);
        
        const newUser = await User.create({
            email,
            username,
            password:hash_password
        });
        const token = generateToken(newUser)
        return res.status(200).json({
            message:'user registration successful',
            user: {id:user.id},
            token
        })

}

// hashpassword function
const passwordHash = async (password) => {
    const saltRounds = 10;
    const hashed_password = await bcrypt.hash(password, saltRounds);
    return hashed_password
}