"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const handlechat_1 = require("./handlechat");
const wsMiddleware_1 = __importDefault(require("../wsMiddleware"));
const http_1 = __importDefault(require("http"));
const PORT = 8080;
const server = http_1.default.createServer();
const wss = new ws_1.WebSocketServer({ server });
wss.on("connection", (ws, request) => {
    (0, wsMiddleware_1.default)(ws, request, () => {
        (0, handlechat_1.handleChat)(ws, request);
    });
});
server.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});
