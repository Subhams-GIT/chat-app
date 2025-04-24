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
const db_1 = require("../db");
const db_2 = __importDefault(require("../db"));
exports.default = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    yield (0, db_1.DbConnect)();
    if (!req.session.user) {
        res.json({
            success: false,
            message: "user not found"
        });
    }
    const username = req.body.name;
    try {
        const userToBeAdded = yield db_2.default.user.findFirst({
            where: {
                displayName: username
            }
        });
        if (!userToBeAdded) {
            res.json({
                success: false,
                message: "user not found"
            });
        }
        const existingConversation = yield db_2.default.conversation.findFirst({
            where: {
                isGroup: false,
                participants: {
                    every: {
                        OR: [
                            { userId: userToBeAdded === null || userToBeAdded === void 0 ? void 0 : userToBeAdded.id },
                            { userId: Number.parseInt((_a = req.session.user) === null || _a === void 0 ? void 0 : _a.id) }
                        ]
                    }
                },
            },
            include: {
                participants: true,
            }
        });
        if (existingConversation) {
            res.status(200).json({
                success: true,
                message: "Conversation already exists",
                conversation: existingConversation,
            });
        }
        else {
            const conversation = yield db_2.default.conversation.create({
                data: {
                    isGroup: false,
                    participants: {
                        create: [
                            { user: { connect: { id: userToBeAdded === null || userToBeAdded === void 0 ? void 0 : userToBeAdded.id } } },
                            { user: { connect: { id: Number.parseInt(((_b = req.session.user) === null || _b === void 0 ? void 0 : _b.id) || "") } } }
                        ]
                    }
                },
            });
            const participant = yield db_2.default.participant.create({
                data: {
                    user: {
                        connect: { id: userToBeAdded === null || userToBeAdded === void 0 ? void 0 : userToBeAdded.id },
                    },
                    conversation: {
                        connect: { id: conversation.id },
                    },
                },
            });
            res.status(200).json({
                success: true,
                message: "Participant added to conversation",
                participant,
            });
        }
    }
    catch (error) {
        console.log(error);
        res.status(409).json({
            success: false,
            message: "error occured",
        });
    }
    return;
});
