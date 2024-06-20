import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../utils/errorHandler.js";
import { sendEmail } from "../utils/sendEmail.js";
import { Stats } from "../models/Stats.js";

export const contact = catchAsyncError(async(req, res, next) => {

    const {name, email, message} = req.body

    if (!name || !email || !message) return next(new ErrorHandler("All fieds are mandatory",400))

    const to = process.env.MY_MAIL
    const subject = "Contact from LearnX"
    const text = `I am ${name} and my email is ${email}. \n ${message}`

    await sendEmail(to,subject,text)

    res.status(200).json({
        sucess : true,
        message: "Your message has been sent"
    })
})

export const courseRequest = catchAsyncError(async(req, res, next) => {

    const {name, email, course} = req.body

    if (!name || !email || !course) return next(new ErrorHandler("All fieds are mandatory",400))

    const to = process.env.MY_MAIL
    const subject = `Requesting course from LearnX`
    const text = `I am ${name} and my email is ${email}. \n ${course}`

    await sendEmail(to,subject,text)

    res.status(200).json({
        sucess : true,
        message: "Your request has been sent"
    })
})

export const getDashboardStats = catchAsyncError(async(req, res, next) => {
    console.log("Hey")
    const stats = await Stats.find({}).sort({createdAt: "desc"}).limit(12);

    const statsData = []

    
    const requiredSize = 12 - stats.length;

    for(let i=0;i< stats.length; i++){
        statsData.push(stats[i])
    }

    for(let i=0; i< requiredSize;i++){
        statsData.unshift({
            users: 0,
            subscription: 0,
            views: 0
        })
    }

    const usersCount = statsData[11].users;
    const subscriptionCount = statsData[11].subscription;
    const viewsCount = statsData[11].views;

    let usersProfit = true, viewsProfit = true, subscriptionProfit = true
    let usersPercent = true, viewsPercent = true, subscriptionPercent = true

    if (statsData[10].users === 0) usersPercent = usersCount*100;
    if (statsData[10].views === 0) viewsPercent = viewsCount*100;
    if (statsData[10].subscription === 0) subscriptionPercent = subscriptionCount*100;
    else{
        const difference = {
            users: statsData[11].users - statsData[10].users,
            views: statsData[11].views - statsData[10].views,
            subscription: statsData[11].subscription - statsData[10].subscription
        }

        usersPercent = (difference.users / statsData[10].users) * 100
        viewsPercent = (difference.views / statsData[10].views) * 100
        subscriptionPercent = (difference.users / statsData[10].subscription) * 100

        if (usersPercent < 0) usersProfit = false
        if (viewsPercent < 0) viewsProfit = false
        if (subscriptionPercent < 0) subscriptionProfit = false
    }
    res.status(200).json({
        sucess : true,
        stats: statsData,
        usersCount,
        subscriptionCount,
        viewsCount,
        usersPercent,viewsPercent,subscriptionPercent,
        usersProfit,viewsProfit, subscriptionProfit
    })
})