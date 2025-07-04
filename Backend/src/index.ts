import "dotenv/config";
import express from "express";
import session from "express-session";
import Signup from "./Routes/Signup";
import middleware from "./middleware";
import Signin from "./Routes/Signin";
import cookieparser from "cookie-parser";
import AddUser from "./Routes/AddUser";
import http from "http";
import { WebSocketServer } from "ws";
import cors from 'cors'
import rateLimit from "express-rate-limit";
import cloudinary from 'cloudinary'
import fileupload from 'express-fileupload'
import upload from "./Routes/upload";
import Verify from "./Routes/Verify";
import getChats from "./Routes/getChats";
import GetUser from "./Routes/GetUser";

cloudinary.v2.config({
    cloud_name: process.env.NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
});

const app = express();
const server = http.createServer(app);
export const wss = new WebSocketServer({ server });
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

app.use(cors({
  origin:'http://localhost:5173',
  credentials:true
}))
app.use(cookieparser());
app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
  })
);
const PORT = 3000;
app.use(express.json());


app.use("/user/v1/signup",limiter)
app.use("/user/v1/signin",limiter)
app.use("/user/v1/verify", limiter);
app.use("/user/v1/session", limiter);
app.use("/user/v1", Signup);
app.use("/user/v1", Signin);
app.use(middleware);
app.use('/user/v1',GetUser)
app.use("/user/v1", AddUser);
app.use("/user/v1", upload);
app.use("/user/v1", Verify);
app.use('/user/v1',getChats)

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
