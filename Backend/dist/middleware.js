"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const middleware = (req, res, next) => {
    var _a;
    const token = req.cookies.token;
    if (!token) {
        return new Error("unauthorised");
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY);
        req.session.user = (_a = req.session.user) !== null && _a !== void 0 ? _a : decoded;
        next();
    }
    catch (err) {
        console.error("JWT verification failed:", err);
        return res.status(403).json({ message: "Invalid token" });
    }
};
exports.default = middleware;
