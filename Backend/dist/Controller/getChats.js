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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../db"));
exports.default = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userid = (_a = req.session.user) === null || _a === void 0 ? void 0 : _a.id;
    try {
        const conversations = yield db_1.default.conversation.findMany({
            where: {
                participants: {
                    some: { userId: Number(userid) },
                },
            },
            include: {
                participants: {
                    include: {
                        user: true
                    }
                },
                messages: {
                    orderBy: { sentAt: 'desc' }
                }
            },
        });
        const chats = conversations.map(convo => {
            var _a;
            const friend = (_a = convo.participants.find(p => p.userId !== Number(userid))) === null || _a === void 0 ? void 0 : _a.user;
            const messages = convo.messages.map(msg => {
                var _a;
                const sender = (_a = convo.participants.find(p => p.userId === msg.senderId)) === null || _a === void 0 ? void 0 : _a.user;
                return {
                    content: msg.content,
                    sentAt: msg.sentAt,
                    senderId: msg.senderId,
                    senderName: (sender === null || sender === void 0 ? void 0 : sender.displayName) || 'Unknown',
                };
            });
            return {
                friend,
                messages,
            };
        });
        res.json({
            chats
        });
    }
    catch (error) {
        console.log(error);
        res.json({
            success: false,
            msg: "error occured "
        });
    }
});
