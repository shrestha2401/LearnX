import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import { User } from "../models/User.js";
import ErrorHandler from "../utils/errorHandler.js";
import { sendEmail } from "../utils/sendEmail.js";
import { sendToken } from "../utils/sendToken.js";
import crypto from "crypto"
import { Course } from "../models/Course.js";
import cloudinary from "cloudinary"
import getDatauri from "../middlewares/dataUri.js";
import { Stats } from "../models/Stats.js";

export const register = catchAsyncError(async(req,res,next) => {

    const {name, email, password} = req.body;
    const file = req.file;

    if (!name || !email || !password || !file) return next(new ErrorHandler("Please enter all fields", 400))

    let user = await User.findOne({email})

    if (user) return next(new ErrorHandler("User Already Exsists", 409))

    const fileUri = getDatauri(file)
    const mycloud = await cloudinary.v2.uploader.upload(fileUri.content)


    user = await User.create({
        name,email,password,
        avatar:{
            public_id: mycloud.public_id,
            url : mycloud.secure_url
        }
    })

    sendToken(res, user, "Register Successfully", 201)
})

export const login = catchAsyncError(async(req,res,next) => {

    
    const { email, password} = req.body;

    // const file = req.file; 

    if ( !email || !password) return next(new ErrorHandler("Please enter all fields", 400))

    let user = await User.findOne({email}).select("+password")

    if ( ! user) return next(new ErrorHandler("User Doesn't Exsist", 401))

    // Upload file on cloudinary;

    
    const isMatch = await user.comparePassword(password);

    if ( ! isMatch) return next(new ErrorHandler("Incorrect Email or Password", 401)) 


    sendToken(res, user, `Welcome Back, ${user.name}`, 201)
})

export const logout = catchAsyncError(async(req,res,next) => {

    res.status(200).cookie("token",null,{
        expires: new Date(Date.now()),
        httpOnly: true,
        secure: true,
        sameSite: "none"
    }).json({
        success: true,
        message: "Logged out successfully"
    })
})

export const getMyProfile = catchAsyncError(async(req,res,next) => {
    
    const user = await User.findById(req.user._id);


    res.status(200).json({
        success: true,
        user

    })
})

export const changePassword = catchAsyncError(async(req,res,next) => {
    
    const {oldPassword, newPassword} = req.body;

    if ( !oldPassword || !newPassword) return next(new ErrorHandler("Please enter all fields", 400))

    const user = await User.findById(req.user._id).select("+password")
    const isMatch = await user.comparePassword(oldPassword);

    if(! isMatch) return next(new ErrorHandler("Incorrect Old Password",400))

    user.password = newPassword


    await user.save();

    res.status(200).json({
        success: true,
        message: "Password Changed Sucessfully"

    })
})


export const updateProfile = catchAsyncError(async(req,res,next) => {
    
    const {name, email} = req.body;
    
    const user = await User.findById(req.user._id).select("+password")

    if(name) user.name = name;
    if(email) user.email = email;

    await user.save();

    res.status(200).json({
        success: true,
        message: "Profie Updated Successfully"

    })
})

export const updateProfilePicture = catchAsyncError(async(req,res,next) => {

    const file = req.file;
    const fileUri = getDatauri(file)
    const mycloud = await cloudinary.v2.uploader.upload(fileUri.content)

    const user = await User.findById(req.user._id)
    await cloudinary.v2.uploader.destroy(user.avatar.public_id)
    
    user.avatar = {
        public_id: mycloud.public_id,
        url : mycloud.secure_url
    }
    await user.save()

    res.status(200).json({
        success : true,
        message : "Profile Picture Updated Successfully",
    })
})

export const forgetPassword = catchAsyncError(async(req, res, next) => {
    const {email} = req.body;
    const user = await User.findOne({email})
    
    if (!user) return next(new ErrorHandler("User doesn't exsist", 400))

    
    const resetToken = await user.getResetToken()
    
    await user.save();

    const url = `${process.env.FRONTEND_URL}/resetpassword/${resetToken}`

    const message = `Click on the link to reset your password ${url}. Ignore if you haven't requested` 

    // Send email
    sendEmail(user.email, "Skolar Reset Password",message)

    res.status(200).json({
        success: true,
        message : `Reset Token has been sent to ${user.email}`
    })
})

export const resetPassword = catchAsyncError(async(req, res, next) => {

    const {token} = req.params;

    const resetPasswordToken = crypto.createHash("sha256").update(token).digest("hex");

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: {
            $gt : Date.now()
        },

    })

    if (!user) return next(new ErrorHandler("Reset Token "))

    user.password = req.body.password;
    user.resetPasswordToken = undefined
    user.resetPasswordExpire = undefined

    await user.save()

    res.status(200).json({
        success : true,
        message: "Password Updated Successfully",
        token
    })

})

export const addToPlaylist = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.user._id);

    const course = await Course.findById(req.body.id)

    if (!course) return next(new ErrorHandler("Invalid Course Link"))

    const itemExist = user.playlist.find((item) => {
        if (item.course.toString() === course._id.toString()) return true
    })

    if (itemExist) return next(new ErrorHandler("Item Already Exsists",409))
    user.playlist.push({
        course: course._id,
        poster: course.poster.url,
    })

    await user.save()

    res.status(200).json({
        success : true,
        message: "Course added to playlist",
    })
})

export const removeFromPlaylist = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.user._id);

    const course = await Course.findById(req.query.id)

    if (!course) return next(new ErrorHandler("Invalid Course Link"))

    const newPlaylist = user.playlist.filter((item) => {
        if (item.course.toString() !== course._id.toString()) return item
    }); 
    
    user.playlist = newPlaylist;

    await user.save()

    res.status(200).json({
        success : true,
        message: "Playlist updated successfully",
    })
})

// Admin Controller

export const getAllUsers = catchAsyncError(async (req, res, next) => {
    
    const users = await User.find({})

    res.status(200).json({
        success : true,
        users: users,
    })
})

export const updateUserRole = catchAsyncError(async (req, res, next) => {
    
    const user = await User.findById(req.params.id);

    if (!user) return next(new ErrorHandler("User not found",404))

    if(user.role === "user") user.role="admin"
    else user.role = "user"

    await user.save()

    res.status(200).json({
        success : true,
        message: "Role updated successfully",
    })
})

export const deleteUser = catchAsyncError(async (req, res, next) => {
    
    const user = await User.findById(req.user._id);

    await cloudinary.v2.uploader.destroy(user.avatar.public_id)

    //Cancel subscription
    
    console.log(user)

    await User.deleteOne(user)

    

    res.status(200).cookie("token",null,{
        expies: new Date(Date.now())
    }).json({
        success : true,
        message: "User deleted successfully",
    })
})

User.watch().on("change",async() =>{
    console.log("executed")
    const stats = await Stats.find({}).sort({createdAt: "desc"}).limit(1)

    console.log(stats)
    const subscription = await User.find({"subscription.status" : "active"})
    stats[0].users = await User.countDocuments();
    stats[0].subscription = subscription.length
    stats[0].createdAt = new Date(Date.now())

    await stats[0].save()
})