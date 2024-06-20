import express from "express";
import { addToPlaylist, changePassword, deleteUser, forgetPassword, getAllUsers, getMyProfile, login, logout, register, removeFromPlaylist, resetPassword, updateProfile, updateProfilePicture, updateUserRole } from "../controllers/userConroller.js";
import { authorizedAdmin, isAuthenticated } from "../middlewares/auth.js";
import singleUpload from "../middlewares/multer.js";

const router = express.Router();

// To register a new user
router.route("/register").post(singleUpload, register)

// Login
router.route("/login").post(login)

// Logout
router.route("/logout").get(logout)

// Get my Profile
router.route("/me").get(isAuthenticated, getMyProfile)

// changePassword
router.route("/changepassword").put(isAuthenticated, changePassword)

// updateProfile
router.route("/updateProfile").put(isAuthenticated, updateProfile)

// UpdateProfilePicture
router.route("/updateProfilePicture").put(isAuthenticated,singleUpload, updateProfilePicture)

// Forget Password
router.route("/forgetpassword").post(forgetPassword)

//Reset Password
router.route("/resetpassword/:token").put(resetPassword)

//Add to Playlist
router.route('/addtoplaylist').post(isAuthenticated,addToPlaylist)

//Remove Playlist
router.route('/removefromplaylist').delete(isAuthenticated,removeFromPlaylist)

// Admin Routes
router.route("/admin/users").get(isAuthenticated, authorizedAdmin, getAllUsers)

// Update role
router.route("/admin/user/:id").put(isAuthenticated, authorizedAdmin, updateUserRole)

//Delete User
router.route("/me").delete(isAuthenticated, authorizedAdmin, deleteUser)


export default router;