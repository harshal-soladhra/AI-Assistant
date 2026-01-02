import express from "express";
const router = express.Router();
import * as conversationController from "../controllers/conversation-controller.js";
import authMiddleware from "../middlewares/auth-middleware.js";

router.use(authMiddleware);

router.get('/', conversationController.getConversations);
router.post('/', conversationController.createConversation);
router.delete('/:id', conversationController.deleteConversation);
router.put('/:id', conversationController.updateConversation);

export default router;
