import { catchAsyncError } from "../middlewares/catchAsyncError.js ";
import { User } from "../models/User.js";
import ErrorHandler from "../utils/errorHandler.js";
import {instance} from "../server.js"
import crypto from "crypto"
import Razorpay from "razorpay";
import { Payment } from "../models/Payment.js";

export const buySubscription = catchAsyncError(async(req,res,next) =>{
    const user = await User.findById(req.user._id)

    if (user.role === "admin")
    return next(new ErrorHandler("Admin can't buy subscription",400))

    const plan_id = process.env.plan_id || "plan_M9Iys9ZMfGlasL"

    const subscription = await instance.subscriptions.create({
        plan_id: plan_id,
        customer_notify: 1,
        total_count: 12
    })

    user.subscription.id = subscription.id;
    user.subscription.status = subscription.status

    await user.save()

    res.status(201).json({
        success: true,
        subscriptionId: subscription.id,
    })
})

export const paymentVerification = catchAsyncError(async(req,res,next) =>{

    const {rayzorpay_signature, rayzorpay_payment_id, rayzorpay_subscription_id} = req.body
    const user = await User.findById(req.user._id)

    const subscription_id = user.subscription.id

    const generated_signature = crypto.createHmac("sha256",process.env.Razorpay_API_secret).update(rayzorpay_payment_id+"|"+subscription_id,"UTF-8").digest("hex")

    const isAuthentic = generated_signature === rayzorpay_signature

    if(!isAuthentic) return res.redirect(`${process.env.FRONTENDURL}/paymentfail`)

    //database comes here

    await Payment.create({
        rayzorpay_signature,
        rayzorpay_payment_id,
        rayzorpay_subscription_id
    })

    user.subscription.status = "active"

    await user.save()

    res.redirect(`${process.env.FRONTENDURL}/paymentsuccess?reference=${rayzorpay_payment_id}`)
})

export const getRazorPayKey = catchAsyncError(async(req,res,next) => {
    res.status(200).json({
        success : true,
        key: process.env.Razorpay_API_Key
    })
})

export const cancelSubscription = catchAsyncError(async(req,res,next) => {
    
    const user = await User.findById(req.user._id)
    const subscription_id = user.subscription.id

    let refund = false

    await instance.subscriptions.cancel(subscription_id)

    const payment = await Payment.findOne({
        razorpay_subscription_id: subscription_id
    });

    const gap = Date.now() - payment.createdAt;
    const refundTime = process.env.REFUND_DAYS * 24 * 60 * 60 * 1000

    if(refundTime > gap){
        //await instance.payments.refund(payment.razorpay_payment_id)
        refund = true
    }

    await payment.remove();
     
    user.subscription.id = undefined
    user.subscription.status = undefined
    await user.save()

    res.status(200).json({
        success : true,
        message: 
        refund? "Refund processed successfully" : "No refund initiated as subscription canceled after 7 days"
    })

    
})
