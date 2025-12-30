import express from "express";
import adminController from "../controllers/admin-controller.js";
import authMiddleware from "../middlewares/auth-middleware.js";
import adminMiddleware from "../middlewares/admin-middleware.js";

const router = express.Router();

// USERS
router.get(
  "/users",
  authMiddleware,
  adminMiddleware,
  adminController.getAllUsers
);

router.patch(
  "/users/:id",
  authMiddleware,
  adminMiddleware,
  adminController.updateUserById
);

router.delete(
  "/users/:id",
  authMiddleware,
  adminMiddleware,
  adminController.deleteUserById
);

// CONTACTS
router.get(
  "/contacts",
  authMiddleware,
  adminMiddleware,
  adminController.getAllContacts
);

export default router;
