import express from "express";
import cors from "cors"
import {config} from "dotenv"
import cookieParser from "cookie-parser";

config({
    path:"./config/config.env"
})

const app = express()

app.use(express.json())

app.use(
    express.urlencoded({
        extended: true,
    })
)

app.use(function(req, res, next) {
  const allowedOrigins = ['http://example.com', 'http://localhost:3000'];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); // Include PUT and DELETE
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
});


app.use(cookieParser())

import course from "./routes/courseRoutes.js"
import user from "./routes/userRoutes.js"
import ErrorMiddleware from "./middlewares/Error.js";
import payment from "./routes/paymentRoute.js"
import other from "./routes/otherRoutes.js"

app.use('/api/v1', course)
app.use('/api/v1', user)
app.use('/api/v1',payment)
app.use('/api/v1', other)

export default app;

app.use(ErrorMiddleware)
