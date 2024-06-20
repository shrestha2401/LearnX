import express from "express";
import { addLectures, createCourse, deleteCourse, deleteLecture, getAllCourses, getCourseLectures } from "../controllers/courseController.js";
import singleUpload from "../middlewares/multer.js";
import { authorizedAdmin, authorizedSubscription, isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

// Get All courses without Lectures
router.route("/courses").get(getAllCourses)

// create new course. only admin
router.route("/createcourse").post(isAuthenticated, authorizedAdmin, singleUpload, createCourse)

// Add lectures, Delete course, Get course details
router.route("/course/:id").get(isAuthenticated, authorizedSubscription, getCourseLectures)
.post(isAuthenticated, authorizedAdmin, singleUpload, addLectures)
.delete(isAuthenticated, authorizedAdmin, deleteCourse)

// Delete lecture
router.route("/lecture").delete(isAuthenticated, authorizedAdmin, deleteLecture)

export default router;