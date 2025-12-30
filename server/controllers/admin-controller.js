import User from "../models/user-model.js"
import Contact from "../models/contact-model.js";

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

export const getAllContacts= async(req,res)=>{
  try {
    const contacts = await Contact.find();
    res.status(200).json({
      success: true,
      message: "All contacts retrieved successfully",
      data: contacts
    });
  } catch (error) {
    next(error);
  }
}


export const deleteUserById = async (req, res, next) => {
  try {
    const userId = req.params.id;

    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const updateUserById = async (req, res, next) => {
  try {
    const userId = req.params.id;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      req.body,
      { new: true, runValidators: true }
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    next(error);
  }
};




export default { getAllUsers,getAllContacts,deleteUserById,updateUserById };