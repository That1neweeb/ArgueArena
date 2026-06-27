import jwt from 'jsonwebtoken';
import { decode } from 'node:punycode';

export async function verifyToken(req, res, next) {
    try {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({
                error: 'Access denied'
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded);
        req.user = {
            ...decoded,
            username: decoded.username,
        };

        next();
    } catch (error) {
        return res.status(401).json({
            error: 'Invalid token'
        });
    }
}   

export async function isAuthenticated(req,res,next) {
   try
    { 
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startswith('Bearer')) {
        return res.status(401).json({message:'Not authorized'});
    }
    const token = authHeader.split(" ")[1]

    const decode = jwt.verify(token,process.env.JWT_SECRET) ;

     req.user = {
        id : decode.id,
        email: decode.email,
        username: decode.username
    }

    next();
}
catch(e){
    res.status(401).json('Invalid or expired token')
}

}