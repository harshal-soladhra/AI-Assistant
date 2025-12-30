import User from "../models/user-model.js"
import Contact from "../models/contact-model.js";
import Service from "../models/service-model.js";

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

export const deleteContactById = async(req,res,next)=>{
  try {
    const id = req.params.id;
    const deletedContact = await Contact.findByIdAndDelete(id);

    if (!deletedContact) {
      return res.status(404).json({ message: "Contact not found" });
    }
    res.status(200).json({
      success: true,
      message: "Contact deleted successfully",
    });
    
  } catch (error) {
    next(error);
  }
}

export const getAllServices = async(req,res,next) =>{
  try {
    const services = await Service.find();
    res.status(200).json({
      success: true,
      message: "All services retrieved successfully",
      data: services
    });
  } catch (error) {
    next(error)
  }

}

// ADD service
export const createService = async (req, res, next) => {
  try {
    const service = await Service.create(req.body);
    res.status(201).json({
      success: true,
      message: "Service created successfully",
      data: service,
    });
  } catch (error) {
    next(error);
  }
};

// DELETE service
export const deleteService = async (req, res, next) => {
  try {
    const { id } = req.params;
    const service = await Service.findByIdAndDelete(id);

    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    res.status(200).json({ message: "Service deleted successfully" });
  } catch (error) {
    next(error);
  }
};

// UPDATE service
export const updateService = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedService = await Service.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    res.status(200).json({
      success: true,
      message: "Service updated successfully",
      data: updatedService,
    });
  } catch (error) {
    next(error);
  }
};



export default { getAllUsers,getAllContacts,deleteUserById,updateUserById ,deleteContactById,getAllServices,createService,deleteService,updateService};