import express from "express"
import authcontrollers from "../controllers/auth-controller.js"

import validate from '../middlewares/validate-middleware.js';
import { signupSchema ,loginSchema} from "../validators/auth-validator.js";

import authMiddleware from '../middlewares/auth-middleware.js';

const router = express.Router()

router.route("/").get(authcontrollers.home)
router.route('/register').post(validate(signupSchema), authcontrollers.register)
router.route('/login').post(validate(loginSchema), authcontrollers.login)

router.route('/user').get(authMiddleware,authcontrollers.user)



export default router;