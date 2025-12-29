import User from "../models/user-model.js"

export const getAllUsers =async(req,res) =>{
    try {
        const users = await User.find().select("-password");
        if (!users || users.length === 0){
            return res.status(400).json({message:"No users found"})
        }
        res.status(200).json({
            success: true,
            message: "All users fetched successfully",
            data: users
        });
    } catch (error) {
        next(error)
        
    }

}
export default { getAllUsers };