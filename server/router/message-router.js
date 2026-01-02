import express from "express";
const router = express.Router();
import * as messageController from "../controllers/message-controller.js";
import authMiddleware from "../middlewares/auth-middleware.js";

router.use(authMiddleware);

router.get('/:conversationId', messageController.getMessages);
router.post('/', messageController.sendMessage);
router.post('/chat', messageController.aiChat);

export default router;
