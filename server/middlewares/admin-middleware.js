const adminMiddleware = async(req,res,next)=>{
    try {
        const adminRole = req.user.isAdmin;
        if(!adminRole){
            return res.status(403).json({message:"Forbidden: Admins only"});
        }
        next();
    } catch (error) {
        next(error);
    }
}

export default adminMiddleware; 