import jwt from "jsonwebtoken"
import { catchAsyncError } from "./catchAsyncError.js"
import ErrorHandler from "../utils/errorHandler.js";
import { User } from "../models/User.js";

export const isAuthenticated = catchAsyncError(async (req,res,next) => {
    
    console.log("Requesting cookies")
    const {token} = req.cookies;

    if (!token) return next(new ErrorHandler("Log in to continue",401))

    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    req.user = await User.findById(decoded._id);
    console.log("User Authentication successful")
    next();
})

export const authorizedAdmin =  (req,res,next) => {

    if (req.user.role != "admin")
    return next(
        new ErrorHandler(
            `${req.user.role} is not allowed to access this resource`,403
        )
    )

    next();
}

export const authorizedSubscription =  (req,res,next) => {

    if (req.user.subscription.status !== "active" && req.user.role !== "admin")
    return next(
        new ErrorHandler(
            `${req.user.role} is not allowed to access this resource`,403
        )
    )
    
    next();
}