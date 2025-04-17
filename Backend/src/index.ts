import "dotenv/config";
import express from "express";
import session from "express-session";
import Signup from "./Controller/Signup";
import middleware from "./middleware";
import Signin from "./Controller/Signin";
import cookieparser from "cookie-parser";
import AddUser from "./Controller/AddUser";
import http from "http";
import { WebSocketServer } from "ws";
import { handleChat } from "./Ws/handlechat";
import wsMiddleware from "./wsMiddleware";
const app = express();
const server = http.createServer(app);
export const wss = new WebSocketServer({ server });
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
