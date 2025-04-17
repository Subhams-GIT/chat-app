"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.wss = void 0;
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const Signup_1 = __importDefault(require("./Controller/Signup"));
const middleware_1 = __importDefault(require("./middleware"));
const Signin_1 = __importDefault(require("./Controller/Signin"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const AddUser_1 = __importDefault(require("./Controller/AddUser"));
const http_1 = __importDefault(require("http"));
const ws_1 = require("ws");
const handlechat_1 = require("./Ws/handlechat");
const wsMiddleware_1 = __importDefault(require("./wsMiddleware"));
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
exports.wss = new ws_1.WebSocketServer({ server });
app.use((0, cookie_parser_1.default)());
app.use((0, express_session_1.default)({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
}));
const PORT = 3000;
app.use(express_1.default.json());
app.use("/user/v1", Signup_1.default);
app.use("/user/v1", Signin_1.default);
app.use(middleware_1.default);
app.use("/user/v1", AddUser_1.default);
exports.wss.on("connection", (ws, request) => {
    (0, wsMiddleware_1.default)(ws, request, () => {
        (0, handlechat_1.handleChat)(ws, request);
    });
});
server.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});
