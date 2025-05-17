"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = wsMiddleware;
const cookie_1 = require("cookie");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function wsMiddleware(ws, request, next) {
    const cookies = (0, cookie_1.parse)(request.headers.cookie || '');
    const authToken = cookies.token || cookies.Authorization;
    const sessionId = cookies['connect.sid'] || cookies.Authorization;
    console.log(cookies);
    if (!cookies || !authToken) {
        ws.close();
        return;
    }
    ;
    try {
        jsonwebtoken_1.default.verify(authToken, process.env.SECRET_KEY, (err, decoded) => {
            if (err) {
                ws.close();
                return;
            }
            ;
            request.user = decoded;
            next();
        });
    }
    catch (error) {
        console.log(error);
    }
}
