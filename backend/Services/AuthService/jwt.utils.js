import jwt from "jsonwebtoken";

export function generateToken(user) {
    // console.log("User recieved from parameter",user);
    return jwt.sign(
        {
            id: user.id,
            email: user.email,
            username: user.Username, 
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "7d"
        }
)
}