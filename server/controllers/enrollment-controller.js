// controllers/enrollment-controller.js
import Enrollment from "../models/enrollment-model.js";

export const enrollCourse = async (req, res, next) => {
  try {
    const { serviceId } = req.body;
    const userId = req.userID;

    const alreadyEnrolled = await Enrollment.findOne({
      user: userId,
      service: serviceId,
    });

    if (alreadyEnrolled) {
      return res.status(400).json({ message: "Already enrolled" });
    }

    const enrollment = await Enrollment.create({
      user: userId,
      service: serviceId,
    });

    res.status(201).json({
      success: true,
      message: "Course enrolled successfully",
      data: enrollment,
    });
  } catch (error) {
    next(error);
  }
};

export const getMyCourses = async (req, res, next) => {
  try {
    const userId = req.userID;

    const enrollments = await Enrollment.find({ user: userId })
      .populate("service");

    res.status(200).json({
      success: true,
      data: enrollments,
    });
  } catch (error) {
    next(error);
  }
};
