import User from "../models/user-model.js";
import Contact from "../models/contact-model.js";
import Service from "../models/service-model.js";

export const getAdminDashboardStats = async (req, res, next) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalContacts = await Contact.countDocuments();
    const totalServices = await Service.countDocuments();

    const recentUsers = await User.find()
      .select("-password")
      .sort({ createdAt: -1 })
      .limit(5);

    const recentContacts = await Contact.find()
      .sort({ createdAt: -1 })
      .limit(5);

    res.status(200).json({
      success: true,
      data: {
        counts: {
          users: totalUsers,
          contacts: totalContacts,
          services: totalServices,
        },
        recentUsers,
        recentContacts,
      },
    });
  } catch (error) {
    next(error);
  }
};
