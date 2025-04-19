import "dotenv/config";
import express from "express";
import session from "express-session";
import Signup from "./Routes/Signup";
import middleware from "./middleware";
import Signin from "./Routes/Sigin";
import cookieparser from "cookie-parser";
import AddUser from "./Routes/AddUser";
import http from "http";
import { WebSocketServer } from "ws";
import { handleChat } from "./Ws/handlechat";
import wsMiddleware from "./wsMiddleware";
import rateLimit from "express-rate-limit";
const app = express();
const server = http.createServer(app);
export const wss = new WebSocketServer({ server });
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})
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
app.use("/user/v1", Signup);
app.use("/user/v1", Signin);
app.use(middleware);
app.use("/user/v1", AddUser);

wss.on("connection", (ws, request) => {
  wsMiddleware(ws, request, () => {
    handleChat(ws, request);
  });
});

server.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
