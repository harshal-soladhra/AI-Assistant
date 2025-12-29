

import express from "express"
import {contactSchema } from "../validators/contact-validator.js"
import contactcontrollers from "../controllers/contact-controller.js"
import validate from '../middlewares/validate-middleware.js'; 
const router = express.Router()

router.route('/contact').post(validate(contactSchema),contactcontrollers.contact)

export default router;