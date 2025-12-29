import jwt from 'jsonwebtoken';
import User from '../models/user-model.js';

const authMiddleware = async(req, res, next) => {
    const token =req.header('Authorization')

    if(!token){
        return res.status(401).json({message:"Unauthorized: No token provided"});
    }

    const jwtToken = token.replace('Bearer ', '').trim();
    
 
    try {
        const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET);
        console.log("JWT Token:", decoded);
        
        const userData = await User.findOne({ email: decoded.email }).select('-password');
        if(!userData){
            return res.status(401).json({message:"Unauthorized: User not found"});
        }
        req.user = userData;
        req.token=token;
        req.userID=userData._id;

        next();
    } catch (err) {
        return res.status(401).json({message:"Unauthorized: Invalid token"});
    }
}


export default authMiddleware;