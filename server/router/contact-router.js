

import express from "express"
import contactcontrollers from "../controllers/contact-controller.js"
const router = express.Router()

router.route('/contact').post(contactcontrollers.contact)

export default router;