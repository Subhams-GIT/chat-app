"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.wss = void 0;
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const Signup_1 = __importDefault(require("./Routes/Signup"));
const middleware_1 = __importDefault(require("./middleware"));
const Sigin_1 = __importDefault(require("./Routes/Sigin"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const AddUser_1 = __importDefault(require("./Routes/AddUser"));
const http_1 = __importDefault(require("http"));
const ws_1 = require("ws");
const cors_1 = __importDefault(require("cors"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
exports.wss = new ws_1.WebSocketServer({ server });
const limiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
app.use((0, cors_1.default)({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use((0, cookie_parser_1.default)());
app.use((0, express_session_1.default)({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
}));
const PORT = 3000;
app.use(express_1.default.json());
app.use("/user/v1/signup", limiter);
app.use("/user/v1/signin", limiter);
app.use("/user/v1", Signup_1.default);
app.use("/user/v1", Sigin_1.default);
app.use(middleware_1.default);
app.use("/user/v1", AddUser_1.default);
app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});
