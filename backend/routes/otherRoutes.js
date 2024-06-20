import express from "express"
import { contact, courseRequest, getDashboardStats } from "../controllers/otherControllers.js"
import { authorizedAdmin, isAuthenticated } from "../middlewares/auth.js"

const router = express.Router()

// Contact Form
router.route("/contact").post(contact)

// Request Form
router.route("/courserequest").post(courseRequest)

// Get Admi Dashboard Stats
router.route("/admin/stats").get(isAuthenticated, authorizedAdmin, getDashboardStats)

export default router