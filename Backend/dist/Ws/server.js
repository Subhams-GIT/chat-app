"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleChat = handleChat;
const db_1 = require("../db");
const url_1 = require("url");
const conversationClients = new Map();
function handleChat(ws, request) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c;
        yield (0, db_1.DbConnect)();
        const { query } = (0, url_1.parse)(request.url, true);
        const conversationId = query.conversationId;
        const userId = Number.parseInt((_a = request.user) === null || _a === void 0 ? void 0 : _a.id);
        const user = yield (prisma === null || prisma === void 0 ? void 0 : prisma.user.findUnique({
            where: {
                id: Number.parseInt((_b = request.user) === null || _b === void 0 ? void 0 : _b.id),
            },
        }));
        console.log(user);
        const conversation = yield (prisma === null || prisma === void 0 ? void 0 : prisma.conversation.findUnique({
            where: {
                id: Number(conversationId),
            },
        }));
        if (!conversation || !user) {
            ws.close();
            return;
        }
        if (!conversationClients.has(conversation.id)) {
            conversationClients.set(conversation.id, new Set());
        }
        (_c = conversationClients.get(conversation.id)) === null || _c === void 0 ? void 0 : _c.add({ userId, ws });
        ws.on("message", (msg) => {
            if (msg instanceof Buffer)
                msg.toString();
            broadcastToRoom(msg);
        });
        const broadcastToRoom = (msg) => {
            console.log(conversationClients);
            const clients = conversationClients.get(conversation.id);
            if (!clients)
                return;
            clients.forEach(element => {
                element.ws.send(msg.toString());
            });
        };
    });
}
