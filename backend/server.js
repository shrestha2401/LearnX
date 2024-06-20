import app from "./app.js";
import { connectDB } from "./config/database.js";
import coludinary from "cloudinary"
import RazorPay from "razorpay"
import nodeCron from "node-cron"
import { Stats } from "./models/Stats.js";
connectDB();
coludinary.v2.config({
    cloud_name: 'Shre', 
    api_key: process.env.COLUDINARY_KEY,
    api_secret: process.env.COLUDINARY_SECRET,
})

export const instance = new RazorPay({
    key_id: process.env.Razorpay_API_Key,
    key_secret: process.env.Razorpay_API_secret,
  });

nodeCron.schedule("0 0 0 1 * *",async ()=>{
    try{
        await Stats.create({});
    } catch(error){
        console.log(error)
    }
})

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", process.env.FRONTEND_URL); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.listen(process.env.PORT,() =>{
    console.log(`Server is working on port: ${process.env.PORT}`)

});
