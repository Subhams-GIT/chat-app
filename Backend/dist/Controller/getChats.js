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
    const userid = req.query.id;
    try {
        const user = yield db_1.default.user.findFirst({
            where: {
                id: Number(userid)
            }
        });
        const conversation = yield db_1.default.conversation.findMany({
            where: {
                participants: {
                    some: {
                        userId: Number(userid)
                    }
                }
            },
            include: {
                participants: true
            }
        });
        // const chats=await prisma.p
        res.json({
            conversation
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
