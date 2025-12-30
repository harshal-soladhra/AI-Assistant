import express from "express";
import authMiddleware from "../middlewares/auth-middleware.js";
import {
  enrollCourse,
  getMyCourses
} from "../controllers/enrollment-controller.js";

const router = express.Router();

/* Enroll in a course */
router.post("/enroll", authMiddleware, enrollCourse);

/* Get logged-in user's courses */
router.get("/my-courses", authMiddleware, getMyCourses);

export default router;
